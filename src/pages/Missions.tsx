import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, TreePine, Recycle, Megaphone, Droplet, Palette, Leaf, Video, Lightbulb } from "lucide-react";

const Missions = () => {
  const handleJoinMission = () => {
    window.open("https://chat.whatsapp.com/Db0lPdOMt8kHkAhpFUWDJu", "_blank");
  };

  const missions = [
    {
      id: 1,
      title: "Community Plastic Clean-Up Drive",
      description: "Help collect and properly dispose of plastic waste in your local neighborhood or school.",
      icon: Recycle,
      location: "Local Community Center, Abuja",
      timeframe: "April 5-12, 2025",
      participants: 50,
      badge: "Junior",
      category: "Waste Management"
    },
    {
      id: 2,
      title: "School Climate Awareness Talk",
      description: "Organize a short awareness session at your school about climate change and sustainable habits.",
      icon: Megaphone,
      location: "Nigerian Secondary Schools",
      timeframe: "April 20, 2025",
      participants: 30,
      badge: "Junior",
      category: "Education"
    },
    {
      id: 3,
      title: "Eco-Friendly Garden Project",
      description: "Create a small garden using native plants and composting techniques to support biodiversity.",
      icon: Leaf,
      location: "Wuse District, Abuja",
      timeframe: "May 1-15, 2025",
      participants: 25,
      badge: "Intermediate",
      category: "Urban Greening"
    },
    {
      id: 4,
      title: "Waste Segregation Challenge",
      description: "Set up separate bins for biodegradable and non-biodegradable waste in your community and demonstrate proper disposal.",
      icon: Recycle,
      location: "Garki Market, Abuja",
      timeframe: "May 10-20, 2025",
      participants: 10,
      badge: "Junior",
      category: "Waste Management"
    },
    {
      id: 5,
      title: "DIY Upcycling Workshop",
      description: "Collect old materials like bottles or cardboard and turn them into useful items (planters, organizers, etc.).",
      icon: Palette,
      location: "Abuja",
      timeframe: "May 25-30, 2025",
      participants: 30,
      badge: "Intermediate",
      category: "Upcycling"
    },
    {
      id: 6,
      title: "River or Stream Clean-Up Mission",
      description: "Collect trash and plastics from a nearby stream or drainage to prevent flooding and pollution.",
      icon: Droplet,
      location: "Lagos",
      timeframe: "June 1-10, 2025",
      participants: 35,
      badge: "Intermediate",
      category: "Conservation"
    },
    {
      id: 7,
      title: "Energy-Saving Campaign",
      description: "Record and share tips on reducing energy consumption at home or school (turning off lights, unplugging devices).",
      icon: Lightbulb,
      location: "Virtual / Home, Abuja",
      timeframe: "June 15-25, 2025",
      participants: 50,
      badge: "Junior",
      category: "Energy Conservation"
    },
    {
      id: 8,
      title: "Climate Art & Awareness Project",
      description: "Create a video or artwork showcasing climate issues in your community and ways to address them.",
      icon: Video,
      location: "Digital / Social Media",
      timeframe: "June 20-30, 2025",
      participants: 40,
      badge: "Intermediate",
      category: "Awareness"
    },
    {
      id: 9,
      title: "Community Tree Monitoring Mission",
      description: "Check and record the health of previously planted trees in your community; water and maintain them as needed.",
      icon: TreePine,
      location: "Jabi Park, Abuja",
      timeframe: "July 1-10, 2025",
      participants: 30,
      badge: "Junior",
      category: "Forestry"
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
                
                <Button 
                  className="w-full" 
                  variant="hero"
                  onClick={handleJoinMission}
                >
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
            <Button 
              variant="green" 
              size="lg"
              onClick={() => window.open("https://chat.whatsapp.com/Db0lPdOMt8kHkAhpFUWDJu", "_blank")}
            >
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
