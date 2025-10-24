import { Users, Globe, Target } from "lucide-react";
import communityImage from "@/assets/community-image.jpg";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      number: "15+",
      label: "Active Participants",
      color: "text-primary"
    },
    {
      icon: Globe,
      number: "2+",
      label: "Communities Reached",
      color: "text-secondary"
    },
    {
      icon: Target,
      number: "7+",
      label: "Missions Completed",
      color: "text-accent"
    }
  ];
  
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Image Section */}
        <div className="max-w-5xl mx-auto mb-10 sm:mb-12 md:mb-16 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={communityImage} 
            alt="Young climate advocates celebrating their achievements with certificates and badges" 
            className="w-full h-[250px] sm:h-[350px] md:h-[400px] object-cover"
          />
        </div>
        
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 sm:p-8 bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 gradient-hero rounded-full flex items-center justify-center shadow-md">
                  <stat.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>
              </div>
              <div className={`text-3xl sm:text-4xl font-bold mb-1 sm:mb-2 ${stat.color}`}>
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
