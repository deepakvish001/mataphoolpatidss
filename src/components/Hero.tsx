import { ArrowRight, Play, Award, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-background">
      {/* Clean Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="JITM Skills Training Excellence Center" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/85"></div>
      </div>

      {/* Subtle Accent Elements */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/5 w-48 h-48 bg-primary/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container-custom relative z-10 py-24">
        <div className="max-w-6xl mx-auto text-center">
          {/* Content */}
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 text-base">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-primary font-semibold">Government Certified Training Partner</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
                <span className="text-gradient-enhanced bg-clip-text">EMPOWERING</span>
                <br />
                <span className="text-foreground">WITH ABILITY</span>
              </h1>
              
              <div className="space-y-6 max-w-4xl mx-auto">
                <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed font-light">
                  Pioneer in <span className="text-primary font-bold">Skill Training</span> with 
                  <span className="text-primary font-bold"> 13+ years excellence</span>
                </p>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Trained over <span className="text-primary font-black text-3xl">5 lakh students</span> across India with 
                  <span className="text-primary font-bold"> guaranteed placement support</span>
                </p>
              </div>
            </div>

            {/* Clean Stats Grid */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black text-primary mb-2">13+</div>
                <div className="text-lg font-medium text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black text-primary mb-2">5L+</div>
                <div className="text-lg font-medium text-muted-foreground">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-black text-primary mb-2">100%</div>
                <div className="text-lg font-medium text-muted-foreground">Placement Support</div>
              </div>
            </div>

            {/* Simple CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="btn-primary group text-lg px-8 py-4">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary text-lg px-8 py-4">
                <Play className="mr-2 h-5 w-5" />
                Watch Our Story
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-border/30 max-w-2xl mx-auto">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="font-medium">NSDC Partner</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span className="font-medium">Pan India Presence</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Award className="h-4 w-4 text-primary" />
                <span className="font-medium">Government Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;