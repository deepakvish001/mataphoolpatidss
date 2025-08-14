import Navigation from '@/components/Navigation';
import Welcome from '@/components/Welcome';
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
        <Welcome />
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
