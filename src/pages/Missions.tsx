import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, TreePine, Recycle, Megaphone, Droplet, BookOpen, Heart } from "lucide-react";

const Missions = () => {
  const missions = [
    {
      id: 1,
      title: "Urban Tree Planting Initiative",
      description: "Join us in planting native trees across urban neighborhoods to combat climate change and improve air quality.",
      icon: TreePine,
      location: "Downtown Community Park, New York",
      timeframe: "March 15-30, 2025",
      participants: 45,
      badge: "Junior",
      category: "Forestry"
    },
    {
      id: 2,
      title: "Coastal Cleanup Challenge",
      description: "Collect plastic waste from beaches and coastal areas, documenting the impact through video evidence.",
      icon: Recycle,
      location: "Venice Beach, Los Angeles",
      timeframe: "April 5-12, 2025",
      participants: 67,
      badge: "Intermediate",
      category: "Waste Management"
    },
    {
      id: 3,
      title: "School Climate Awareness Campaign",
      description: "Organize and host climate education sessions at local schools to raise awareness among students.",
      icon: Megaphone,
      location: "Various Schools, Chicago",
      timeframe: "March 20 - April 15, 2025",
      participants: 32,
      badge: "Junior",
      category: "Education"
    },
    {
      id: 4,
      title: "River Restoration Project",
      description: "Help restore local river ecosystems by removing debris and planting native vegetation along riverbanks.",
      icon: Droplet,
      location: "Mississippi River Trail, Minnesota",
      timeframe: "April 18-25, 2025",
      participants: 28,
      badge: "Intermediate",
      category: "Conservation"
    },
    {
      id: 5,
      title: "Community Climate Workshop Series",
      description: "Lead interactive workshops teaching sustainable practices and climate action strategies to community members.",
      icon: BookOpen,
      location: "Community Center, Portland",
      timeframe: "Every Saturday in April",
      participants: 54,
      badge: "Major",
      category: "Education"
    },
    {
      id: 6,
      title: "Neighborhood Garden Network",
      description: "Create community gardens promoting local food production and green spaces in urban neighborhoods.",
      icon: Heart,
      location: "Multiple locations, Seattle",
      timeframe: "Ongoing - Join Anytime",
      participants: 89,
      badge: "Junior",
      category: "Urban Greening"
    }
  ];
  
  const getBadgeColor = (badge: string) => {
    switch(badge) {
      case "Junior":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "Intermediate":
        return "bg-primary/10 text-primary border-primary/20";
      case "Major":
        return "bg-accent/30 text-accent-foreground border-accent/40";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Climate Action Missions
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose a mission, complete the challenge, upload your video proof, and earn your PlanetCred certification
            </p>
          </div>
          
          {/* Missions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {missions.map((mission) => (
              <Card key={mission.id} className="p-6 hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50 group">
                {/* Icon and Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 gradient-hero rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <mission.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge className={getBadgeColor(mission.badge)}>
                    {mission.badge}
                  </Badge>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {mission.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {mission.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="line-clamp-1">{mission.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span>{mission.timeframe}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4 text-accent flex-shrink-0" />
                    <span>{mission.participants} participants</span>
                  </div>
                </div>
                
                <Button className="w-full" variant="hero">
                  Join Mission
                </Button>
              </Card>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="mt-16 text-center max-w-2xl mx-auto bg-card rounded-2xl p-8 border border-border shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Ready to Make an Impact?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find a mission near you? Start your own climate action project and earn certification for your initiative!
            </p>
            <Button variant="green" size="lg">
              Propose a Mission
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Missions;
