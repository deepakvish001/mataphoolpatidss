import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ModiQuote from '@/components/ModiQuote';
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
      <main>
        <Hero />
        <ModiQuote />
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
