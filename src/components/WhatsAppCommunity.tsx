import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Heart, Zap } from "lucide-react";

const WhatsAppCommunity = () => {
  const benefits = [
    {
      icon: Users,
      text: "Connect with climate advocates worldwide"
    },
    {
      icon: Heart,
      text: "Get support and guidance for your missions"
    },
    {
      icon: Zap,
      text: "Share tips and celebrate achievements together"
    }
  ];
  
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-secondary rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl border border-border text-center">
            {/* WhatsApp Icon */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#25D366] rounded-2xl flex items-center justify-center shadow-lg">
                <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" fill="white" />
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent px-2">
              Join Our WhatsApp Community
            </h2>
            
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Connect with thousands of young climate advocates, share your journey, get mission support, 
              and stay updated with the latest opportunities and achievements.
            </p>
            
            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-hero rounded-full flex items-center justify-center shadow-md">
                    <benefit.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground text-center px-2">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <Button 
              asChild 
              variant="green" 
              size="xl" 
              className="shadow-xl w-full sm:w-auto"
            >
              <a 
                href="https://chat.whatsapp.com/Db0lPdOMt8kHkAhpFUWDJu?mode=wwt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                Join WhatsApp Community
              </a>
            </Button>
            
            <p className="text-sm text-muted-foreground mt-4">
              Free to join • 5,000+ active members
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppCommunity;
