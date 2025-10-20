import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Video } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

const MissionSubmit = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const missionTitle = searchParams.get("title") || "";
  const missionDescription = searchParams.get("description") || "";

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please login to submit a mission",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }
      setUser(user);
      
      // Check active mission count
      const { data: activeMissions, error } = await supabase
        .from("mission_submissions")
        .select("id")
        .eq("user_id", user.id)
        .eq("status", "pending");

      if (error) {
        console.error("Error checking missions:", error);
      } else if (activeMissions && activeMissions.length >= 3) {
        toast({
          title: "Mission limit reached",
          description: "You can only have 3 active missions at a time. Please complete your current missions first.",
          variant: "destructive",
        });
        navigate("/dashboard");
        return;
      }
      
      setLoading(false);
    };

    checkAuth();
  }, [navigate, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file",
        description: "Please upload a video file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (300MB = 5 minutes of good quality video)
    const maxSize = 300 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Video must be under 300MB (approximately 5 minutes)",
        variant: "destructive",
      });
      return;
    }

    setVideoFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !videoFile) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      // Upload video to storage
      const fileExt = videoFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('mission-videos')
        .upload(fileName, videoFile);

      clearInterval(uploadInterval);
      setUploadProgress(100);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('mission-videos')
        .getPublicUrl(fileName);

      // Create submission
      const { error: submissionError } = await supabase
        .from('mission_submissions')
        .insert({
          user_id: user.id,
          mission_title: missionTitle,
          mission_description: missionDescription,
          video_url: publicUrl,
          status: 'pending',
        });

      if (submissionError) throw submissionError;

      toast({
        title: "Mission submitted!",
        description: "Your video evidence has been submitted for review",
      });
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error submitting mission:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit mission",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

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
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Submit Mission Evidence</CardTitle>
              <CardDescription>{missionTitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label>Mission Description</Label>
                  <p className="text-sm text-muted-foreground">{missionDescription}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="video">Upload Video Evidence</Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Please upload a video (max 5 minutes, preferably 2 minutes) showing your completed mission
                  </p>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <Input
                      id="video"
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={uploading}
                    />
                    <Label htmlFor="video" className="cursor-pointer">
                      <Button type="button" variant="outline" disabled={uploading} asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Video
                        </span>
                      </Button>
                    </Label>
                    {videoFile && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        Selected: {videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    )}
                  </div>
                </div>

                {uploading && (
                  <div className="space-y-2">
                    <Progress value={uploadProgress} />
                    <p className="text-sm text-center text-muted-foreground">
                      Uploading... {uploadProgress.toFixed(0)}%
                    </p>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/missions")}
                    disabled={uploading}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!videoFile || uploading}
                    variant="green"
                    className="flex-1"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Submit Mission"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MissionSubmit;