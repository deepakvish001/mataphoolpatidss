import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ModiQuote from '@/components/ModiQuote';
import MissionCourses from '@/components/MissionCourses';
import GovernmentSchemes from '@/components/GovernmentSchemes';
import ImageSlider from '@/components/ImageSlider';
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
        <MissionCourses />
        <GovernmentSchemes />
        <ImageSlider />
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
