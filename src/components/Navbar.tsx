import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { User as UserIcon, LogOut } from "lucide-react";
import logo from "@/assets/planetcred-logo.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        checkAdminStatus(user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle();
    
    setIsAdmin(!!data && !error);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <img src={logo} alt="PlanetCred Logo" className="h-8 sm:h-10 object-contain" />
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/missions" 
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/missions") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Missions
            </Link>
            <Link 
              to="/#about" 
              className="font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              About
            </Link>
            {user && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`font-medium transition-colors hover:text-primary ${
                    isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className={`font-medium transition-colors hover:text-primary ${
                      isActive("/admin") ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    Admin Panel
                  </Link>
                )}
              </>
            )}
            {user ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
                  <UserIcon className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button asChild variant="hero" size="default">
                <Link to="/auth">Get Started</Link>
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button asChild variant="hero" size="sm">
              <Link to="/missions">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
