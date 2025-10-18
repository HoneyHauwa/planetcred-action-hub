import { CheckCircle2 } from "lucide-react";

const About = () => {
  const features = [
    "Complete climate action missions and upload video proof",
    "Earn verified micro-certificates for each completed mission",
    "Progress through certification levels from Junior to Major Advocate",
    "Access scholarships, fellowships, and leadership opportunities",
    "Join a global network of youth climate changemakers",
    "Build a portfolio of recognized environmental impact"
  ];
  
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About PlanetCred
          </h2>
          
          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-xl border border-border mb-12">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              Many young people and grassroots changemakers are already planting trees, collecting plastics, and raising awareness, 
              but their impact often goes unrecognized and unsupported. <span className="font-semibold text-primary">PlanetCred solves this</span> by 
              turning these actions into certified credentials through simple, gamified climate missions.
            </p>
            
            <p className="text-lg text-foreground leading-relaxed mb-8">
              Our program combines <span className="font-semibold text-secondary">gamification, verification, and recognition</span> in 
              a simple, low-cost system. It motivates participation through missions and badges, builds trust with video verification, 
              and provides young people with formal certificates they can use to access scholarships, fellowships, and leadership opportunities.
            </p>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-4">How It Works</h3>
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border shadow-md">
              <h3 className="text-xl font-bold mb-3 text-primary">Our Mission</h3>
              <p className="text-muted-foreground">
                To empower youth climate advocates by making their environmental actions visible, verified, and valuable 
                in their educational and professional journeys.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border shadow-md">
              <h3 className="text-xl font-bold mb-3 text-secondary">Our Vision</h3>
              <p className="text-muted-foreground">
                A world where every young person's climate action is recognized, rewarded, and contributes to building 
                a sustainable future for all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
