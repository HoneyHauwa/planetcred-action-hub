import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import MissionsPreview from "@/components/MissionsPreview";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Welcome />
        <MissionsPreview />
        <Stats />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
