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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Image Section */}
        <div className="max-w-5xl mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={communityImage} 
            alt="Young climate advocates celebrating their achievements with certificates and badges" 
            className="w-full h-[400px] object-cover"
          />
        </div>
        
        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-8 bg-card rounded-xl shadow-lg border border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 gradient-hero rounded-full flex items-center justify-center shadow-md">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
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
