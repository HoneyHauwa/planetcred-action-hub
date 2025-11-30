import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import logo from "@/assets/planetcred-logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center mb-3 sm:mb-4">
              <img src={logo} alt="PlanetCred Logo" className="h-8 sm:h-10 object-contain" />
            </div>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md">
              Empowering youth climate advocates worldwide by turning everyday environmental actions into certified credentials.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <Link to="/" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/missions" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors">
                  Missions
                </Link>
              </li>
              <li>
                <a href="#about" className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Get In Touch</h3>
            <a 
              href="mailto:planetcredinitiative@gmail.com" 
              className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors break-all"
            >
              <Mail className="h-4 w-4" />
              <span>planetcredinitiative@gmail.com</span>
            </a>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-border text-center text-muted-foreground">
          <p className="text-xs sm:text-sm">
            © 2025 PlanetCred
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
