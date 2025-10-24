import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Young people working together on climate action projects" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-secondary/80" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in leading-tight">
            Turn Your Climate Actions Into Certified Impact
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto px-2">
            Join youth leaders worldwide making their environmental actions visible, verified, and valuable
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Button asChild variant="secondary" size="xl" className="shadow-2xl w-full sm:w-auto">
              <Link to="/missions">
                Explore Missions <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm w-full sm:w-auto">
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
