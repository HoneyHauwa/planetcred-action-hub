import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle, XCircle, Video, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Submission {
  id: string;
  user_id: string;
  mission_title: string;
  mission_description: string;
  video_url: string;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
  profiles: {
    email: string;
    full_name: string | null;
  };
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const [reviewMessage, setReviewMessage] = useState("");
  const [reviewing, setReviewing] = useState(false);
  const [missionFilter, setMissionFilter] = useState<string>("all");
  const [uniqueMissions, setUniqueMissions] = useState<string[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      // Check if user is admin
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roleData) {
        toast({
          title: "Access denied",
          description: "You don't have admin permissions",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setUser(user);
      await fetchSubmissions();
      setLoading(false);
    };

    checkAuth();
  }, [navigate, toast]);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from("mission_submissions")
      .select(`
        *,
        profiles!mission_submissions_user_id_fkey (email, full_name)
      `)
      .order("submitted_at", { ascending: false });

    if (error) {
      console.error("Error fetching submissions:", error);
      return;
    }

    setSubmissions((data || []) as Submission[]);
    
    // Extract unique mission titles
    const missions = Array.from(new Set(data?.map(s => s.mission_title) || []));
    setUniqueMissions(missions);
  };

  const handleReview = async (submissionId: string, approved: boolean) => {
    if (!user) return;
    
    setReviewing(true);
    setSelectedSubmission(submissionId);

    try {
      const submission = submissions.find(s => s.id === submissionId);
      if (!submission) throw new Error("Submission not found");

      if (approved) {
        // Call edge function to generate certificate and approve
        const { error: functionError } = await supabase.functions.invoke('generate-certificate', {
          body: {
            submissionId,
            userName: submission.profiles.full_name || submission.profiles.email,
            missionTitle: submission.mission_title,
          },
        });

        if (functionError) throw functionError;
      } else {
        // Reject submission
        const { error: updateError } = await supabase
          .from('mission_submissions')
          .update({
            status: 'rejected',
            admin_message: reviewMessage || 'Sorry, you have not passed the mission.',
            reviewed_at: new Date().toISOString(),
            reviewed_by: user.id,
          })
          .eq('id', submissionId);

        if (updateError) throw updateError;
      }

      toast({
        title: approved ? "Mission approved" : "Mission rejected",
        description: approved 
          ? "Certificate has been generated and sent to the user" 
          : "User has been notified of the rejection",
      });

      setReviewMessage("");
      setSelectedSubmission(null);
      await fetchSubmissions();
    } catch (error: any) {
      console.error("Error reviewing submission:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to review submission",
        variant: "destructive",
      });
    } finally {
      setReviewing(false);
    }
  };

  const filteredSubmissions = missionFilter === "all" 
    ? submissions 
    : submissions.filter(s => s.mission_title === missionFilter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
              <p className="text-muted-foreground">Review mission submissions</p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <Select value={missionFilter} onValueChange={setMissionFilter}>
                <SelectTrigger className="w-[250px]">
                  <SelectValue placeholder="Filter by mission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Missions</SelectItem>
                  {uniqueMissions.map((mission) => (
                    <SelectItem key={mission} value={mission}>
                      {mission}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredSubmissions.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-lg">No submissions to review</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredSubmissions.map((submission) => (
                <Card key={submission.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{submission.mission_title}</CardTitle>
                        <CardDescription className="mt-2">
                          Submitted by: {submission.profiles.full_name || submission.profiles.email}
                        </CardDescription>
                        <CardDescription>
                          {new Date(submission.submitted_at).toLocaleString()}
                        </CardDescription>
                      </div>
                      <Badge variant={
                        submission.status === 'approved' ? 'default' : 
                        submission.status === 'rejected' ? 'destructive' : 
                        'secondary'
                      }>
                        {submission.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {submission.mission_description}
                      </p>
                    </div>

                    {submission.video_url && (
                      <div>
                        <Label className="mb-2 block">Video Evidence</Label>
                        <a
                          href={submission.video_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:underline"
                        >
                          <Video className="w-4 h-4" />
                          View Video
                        </a>
                      </div>
                    )}

                    {submission.status === 'pending' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor={`message-${submission.id}`}>
                            Rejection Message (optional)
                          </Label>
                          <Textarea
                            id={`message-${submission.id}`}
                            placeholder="Provide feedback for rejection..."
                            value={selectedSubmission === submission.id ? reviewMessage : ""}
                            onChange={(e) => {
                              setSelectedSubmission(submission.id);
                              setReviewMessage(e.target.value);
                            }}
                            disabled={reviewing}
                          />
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleReview(submission.id, true)}
                            disabled={reviewing}
                            variant="default"
                            className="flex-1"
                          >
                            {reviewing && selectedSubmission === submission.id ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <CheckCircle className="w-4 h-4 mr-2" />
                            )}
                            Approve & Generate Certificate
                          </Button>
                          <Button
                            onClick={() => handleReview(submission.id, false)}
                            disabled={reviewing}
                            variant="destructive"
                            className="flex-1"
                          >
                            {reviewing && selectedSubmission === submission.id ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <XCircle className="w-4 h-4 mr-2" />
                            )}
                            Reject
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;