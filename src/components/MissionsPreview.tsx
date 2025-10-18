import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, TreePine, Recycle, Megaphone } from "lucide-react";

const MissionsPreview = () => {
  const sampleMissions = [
    {
      icon: TreePine,
      title: "Plant & Document",
      description: "Plant trees in your community and record your impact",
      color: "gradient-green"
    },
    {
      icon: Recycle,
      title: "Waste Warriors",
      description: "Organize plastic collection drives and clean-up events",
      color: "gradient-hero"
    },
    {
      icon: Megaphone,
      title: "Climate Voices",
      description: "Host awareness sessions at your school or community",
      color: "gradient-accent"
    }
  ];
  
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Start Your Climate Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our curated missions and start earning your climate credentials today
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {sampleMissions.map((mission, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`w-12 h-12 ${mission.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <mission.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{mission.title}</h3>
              <p className="text-muted-foreground">{mission.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild variant="hero" size="xl">
            <Link to="/missions">
              View All Missions <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MissionsPreview;
