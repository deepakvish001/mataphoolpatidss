import { ArrowRight, Play, Award, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-background overflow-hidden">
      {/* Premium Background System */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="JITM Skills Training Excellence Center" 
          className="w-full h-full object-cover opacity-12"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/98 via-background/80 to-background/95"></div>
      </div>

      {/* Sophisticated Accent Elements */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/12 to-primary/4 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/5 w-80 h-80 bg-gradient-to-tl from-primary/8 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[120vh] bg-gradient-radial from-primary/2 via-transparent to-transparent rounded-full"></div>
      </div>

      <div className="container-custom relative z-10 py-32">
        <div className="max-w-7xl mx-auto text-center">
          {/* Content */}
          <div className="space-y-16">
            <div className="space-y-12">
              <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 border border-primary/30 rounded-full px-10 py-5 text-lg backdrop-blur-sm shadow-xl">
                <Award className="h-7 w-7 text-primary" />
                <span className="text-primary font-bold tracking-wide">Government Certified Training Partner</span>
                <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
              </div>
              
              <h1 className="text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-black leading-[0.8] tracking-tighter">
                <span className="text-gradient-enhanced bg-clip-text block">EMPOWERING</span>
                <span className="text-foreground block mt-6">WITH ABILITY</span>
              </h1>
              
              <div className="space-y-10 max-w-6xl mx-auto">
                <p className="text-4xl md:text-5xl lg:text-6xl text-muted-foreground leading-relaxed font-extralight">
                  Pioneer in <span className="text-primary font-bold">Skill Training</span> with 
                  <span className="text-primary font-bold bg-primary/15 px-6 py-3 rounded-3xl ml-3 border border-primary/25">13+ years excellence</span>
                </p>
                <p className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground leading-relaxed font-light">
                  Transformed over <span className="text-primary font-black text-5xl md:text-6xl bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">5 lakh lives</span> across India with 
                  <span className="text-gradient-enhanced bg-clip-text font-bold"> guaranteed placement success</span>
                </p>
              </div>
            </div>

            {/* Ultra Premium Stats Grid */}
            <div className="grid grid-cols-3 gap-16 max-w-5xl mx-auto">
              <div className="text-center group">
                <div className="text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] font-black text-primary mb-6 group-hover:scale-105 transition-all duration-500">13+</div>
                <div className="text-2xl font-bold text-muted-foreground uppercase tracking-widest">Years Experience</div>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-orange-400 mx-auto mt-4 rounded-full"></div>
              </div>
              <div className="text-center group">
                <div className="text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] font-black text-primary mb-6 group-hover:scale-105 transition-all duration-500">5L+</div>
                <div className="text-2xl font-bold text-muted-foreground uppercase tracking-widest">Lives Transformed</div>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-orange-400 mx-auto mt-4 rounded-full"></div>
              </div>
              <div className="text-center group">
                <div className="text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] font-black text-primary mb-6 group-hover:scale-105 transition-all duration-500">100%</div>
                <div className="text-2xl font-bold text-muted-foreground uppercase tracking-widest">Placement Success</div>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-orange-400 mx-auto mt-4 rounded-full"></div>
              </div>
            </div>

            {/* Ultra Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-10 justify-center">
              <Button size="lg" className="btn-primary group text-2xl px-16 py-8 rounded-3xl shadow-2xl hover:shadow-glow transition-all duration-500 border border-primary/20">
                <span className="font-black">Start Your Journey</span>
                <ArrowRight className="ml-4 h-8 w-8 group-hover:translate-x-3 transition-transform duration-500" />
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary text-2xl px-16 py-8 rounded-3xl border-3 border-primary/40 hover:border-primary hover:bg-primary/10 transition-all duration-500 backdrop-blur-sm">
                <Play className="mr-4 h-8 w-8" />
                <span className="font-black">Watch Our Story</span>
              </Button>
            </div>

            {/* Premium Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-16 pt-16 border-t border-border/40 max-w-4xl mx-auto">
              <div className="flex items-center space-x-4 text-muted-foreground group hover:text-primary transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-300 border border-primary/20">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <span className="font-bold text-xl">NSDC Partner</span>
              </div>
              <div className="flex items-center space-x-4 text-muted-foreground group hover:text-primary transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-300 border border-primary/20">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <span className="font-bold text-xl">Pan India Presence</span>
              </div>
              <div className="flex items-center space-x-4 text-muted-foreground group hover:text-primary transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary/25 group-hover:to-primary/10 transition-all duration-300 border border-primary/20">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <span className="font-bold text-xl">Government Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;