import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Services from '@/components/Services';
import Partners from '@/components/Partners';
import Testimonials from '@/components/Testimonials';
import Donation from '@/components/Donation';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="relative overflow-hidden">
        {/* Enhanced floating background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/5 to-primary/2 rounded-full blur-xl animate-float-slow" />
          <div className="absolute top-1/3 right-20 w-48 h-48 bg-gradient-to-br from-blue-500/4 to-primary/3 rounded-full blur-2xl animate-float-slower" />
          <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-primary/6 to-blue-500/3 rounded-full blur-lg animate-float" />
        </div>
        
        <Hero />
        <Stats />
        <About />
        <Services />
        <Partners />
        <Testimonials />
        <div id="donation">
          <Donation />
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
