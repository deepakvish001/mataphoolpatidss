import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Services from '@/components/Services';
import Partners from '@/components/Partners';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Sparkles, ArrowRight, Star, Award, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const highlights = [
    { icon: Award, label: "Government Certified", color: "text-blue-500" },
    { icon: Users, label: "5L+ Students Trained", color: "text-green-500" },
    { icon: Target, label: "100% Placement", color: "text-purple-500" },
    { icon: Star, label: "13+ Years Experience", color: "text-orange-500" }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-primary/3 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-primary/7 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <Navigation />
      
      {/* Enhanced Hero Section */}
      <main className="relative z-10">
        {/* Announcement Bar */}
        <div className="bg-gradient-to-r from-primary via-primary-600 to-primary-700 text-primary-foreground py-2 px-4">
          <div className="container-custom">
            <div className="flex items-center justify-center text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
              <span>🎉 New Batch Starting Soon - Limited Seats Available!</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-primary/10">
          <div className="container-custom py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center justify-center space-x-2 group">
                  <highlight.icon className={`h-4 w-4 ${highlight.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-sm font-medium text-foreground">{highlight.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Hero />
        <Stats />
        <About />
        <Services />
        <Partners />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
