import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield } from "lucide-react";

const AdminSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [making, setMaking] = useState(false);
  const [hasAdmins, setHasAdmins] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Check if any admins exist
      const { data: adminData } = await supabase
        .from("user_roles")
        .select("id")
        .eq("role", "admin")
        .limit(1)
        .maybeSingle();

      if (adminData) {
        setHasAdmins(true);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleMakeAdmin = async () => {
    if (!user) return;

    setMaking(true);
    try {
      const { error } = await supabase.functions.invoke('make-admin', {
        body: { userId: user.id },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You are now an admin. Redirecting to admin panel...",
      });

      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } catch (error: any) {
      console.error("Error making admin:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to make admin",
        variant: "destructive",
      });
    } finally {
      setMaking(false);
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
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-8 h-8 text-primary" />
                <CardTitle className="text-3xl">Admin Setup</CardTitle>
              </div>
              <CardDescription>
                {hasAdmins 
                  ? "An admin already exists in the system" 
                  : "Create the first admin account for this system"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {hasAdmins ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    This system already has an admin. If you need admin access, please contact the existing administrator.
                  </p>
                  <Button onClick={() => navigate("/")}>
                    Return to Home
                  </Button>
                </div>
              ) : !user ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Please log in or sign up first to become an admin.
                  </p>
                  <Button onClick={() => navigate("/auth")}>
                    Go to Login
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Current User</h3>
                    <p className="text-sm text-muted-foreground">
                      Email: {user?.email}
                    </p>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Admin Permissions</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Review and approve mission submissions</li>
                      <li>Generate certificates for approved missions</li>
                      <li>View all user submissions</li>
                      <li>Manage mission feedback</li>
                    </ul>
                  </div>

                  <Button 
                    onClick={handleMakeAdmin} 
                    disabled={making}
                    className="w-full"
                    size="lg"
                  >
                    {making ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Admin...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Make Me Admin
                      </>
                    )}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminSetup;
