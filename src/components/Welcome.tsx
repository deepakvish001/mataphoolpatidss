import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Award, Target } from 'lucide-react';

const Welcome = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent/20 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-2xl animate-pulse-glow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8 animate-fade-in">
            <span className="inline-block px-6 py-3 bg-primary/10 text-primary font-semibold rounded-full text-sm uppercase tracking-wider mb-6">
              Welcome to Our Journey
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight">
              Transforming Lives Through
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Quality Education
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Empowering communities with skill development, vocational training, and educational excellence. 
              Join us in building a brighter future for India's youth.
            </p>
          </div>

          {/* Key Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-hover rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">50,000+ Lives Impacted</h3>
              <p className="text-muted-foreground">Transforming communities through comprehensive skill development programs</p>
            </div>

            <div className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Government Certified</h3>
              <p className="text-muted-foreground">Authorized by leading government agencies and skill councils</p>
            </div>

            <div className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-success to-success/80 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">100% Placement Focus</h3>
              <p className="text-muted-foreground">Dedicated to ensuring every trained candidate finds meaningful employment</p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="group px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Explore Our Programs
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold border-2 hover:bg-primary/5 transition-all duration-300"
            >
              Learn Our Story
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;