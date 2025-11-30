import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/planetcred-logo.png";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
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
            <Button asChild variant="hero" size="default">
              <Link to="/missions">Get Started</Link>
            </Button>
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
