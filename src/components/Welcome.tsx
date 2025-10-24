import { Sprout, Award, Users } from "lucide-react";

const Welcome = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent px-2">
            Welcome to PlanetCred
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-2">
            PlanetCred is a youth-led initiative designed to make everyday climate actions visible, verified, and valuable. 
            We empower young changemakers by turning their environmental efforts from planting trees to organizing awareness campaigns into 
            certified credentials that open doors to scholarships, fellowships, and leadership opportunities.
          </p>
        </div>
        
        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50">
            <div className="w-12 h-12 sm:w-14 sm:h-14 gradient-green rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-md">
              <Sprout className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Gamified Missions</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Complete climate action missions and earn badges as you progress through engaging challenges designed for real-world impact.
            </p>
          </div>
          
          <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50">
            <div className="w-12 h-12 sm:w-14 sm:h-14 gradient-hero rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-md">
              <Award className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Verified Credentials</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Record your actions through video proof and receive official micro-certificates recognized by educational and professional institutions.
            </p>
          </div>
          
          <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50 sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 gradient-accent rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-md">
              <Users className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Community Network</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Join a global network of youth climate advocates, share experiences, and amplify your collective environmental impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
