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
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/15 to-primary/5 border border-primary/25 rounded-full px-8 py-4 text-base backdrop-blur-sm shadow-lg">
                <Award className="h-6 w-6 text-primary" />
                <span className="text-primary font-bold tracking-wide">Government Certified Training Partner</span>
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              </div>
              
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tight">
                <span className="text-gradient-enhanced bg-clip-text block">EMPOWERING</span>
                <span className="text-foreground block mt-4">WITH ABILITY</span>
              </h1>
              
              <div className="space-y-8 max-w-5xl mx-auto">
                <p className="text-3xl md:text-4xl lg:text-5xl text-muted-foreground leading-relaxed font-light">
                  Pioneer in <span className="text-primary font-bold">Skill Training</span> with 
                  <span className="text-primary font-bold bg-primary/10 px-4 py-2 rounded-2xl ml-2">13+ years excellence</span>
                </p>
                <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed font-light">
                  Transformed over <span className="text-primary font-black text-4xl md:text-5xl">5 lakh lives</span> across India with 
                  <span className="text-gradient-enhanced bg-clip-text font-bold"> guaranteed placement success</span>
                </p>
              </div>
            </div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="text-6xl md:text-7xl lg:text-8xl font-black text-primary mb-4 group-hover:scale-110 transition-transform duration-300">13+</div>
                <div className="text-xl font-semibold text-muted-foreground uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="text-center group">
                <div className="text-6xl md:text-7xl lg:text-8xl font-black text-primary mb-4 group-hover:scale-110 transition-transform duration-300">5L+</div>
                <div className="text-xl font-semibold text-muted-foreground uppercase tracking-wider">Lives Transformed</div>
              </div>
              <div className="text-center group">
                <div className="text-6xl md:text-7xl lg:text-8xl font-black text-primary mb-4 group-hover:scale-110 transition-transform duration-300">100%</div>
                <div className="text-xl font-semibold text-muted-foreground uppercase tracking-wider">Placement Success</div>
              </div>
            </div>

            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Button size="lg" className="btn-primary group text-xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-glow transition-all duration-300">
                <span className="font-bold">Start Your Journey</span>
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary text-xl px-12 py-6 rounded-2xl border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300">
                <Play className="mr-3 h-6 w-6" />
                <span className="font-bold">Watch Our Story</span>
              </Button>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-12 pt-12 border-t border-border/30 max-w-3xl mx-auto">
              <div className="flex items-center space-x-3 text-muted-foreground group hover:text-primary transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <span className="font-semibold text-lg">NSDC Partner</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground group hover:text-primary transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <span className="font-semibold text-lg">Pan India Presence</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground group hover:text-primary transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <span className="font-semibold text-lg">Government Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;