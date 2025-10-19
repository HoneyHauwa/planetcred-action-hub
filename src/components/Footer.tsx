import { Link } from "react-router-dom";
import { Mail, Heart } from "lucide-react";
import logo from "@/assets/planetcred-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-1 mb-4">
              <img src={logo} alt="PlanetCred Logo" className="h-10 w-10 object-contain" />
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                PlanetCred
              </span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Empowering youth climate advocates worldwide by turning everyday environmental actions into certified credentials.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/missions" className="text-muted-foreground hover:text-primary transition-colors">
                  Missions
                </Link>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Get In Touch</h3>
            <a 
              href="mailto:contact@planetcred.org" 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>contact@planetcred.org</span>
            </a>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-accent fill-accent" /> by PlanetCred Team © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
