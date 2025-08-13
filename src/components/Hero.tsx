import { ArrowRight, Play, Award, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-background overflow-hidden">
      {/* Ultra Premium Background System */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="JITM Skills Training Excellence Center" 
          className="w-full h-full object-cover opacity-15 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/92 to-background/85"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/75 to-background/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/3 to-transparent"></div>
      </div>

      {/* Advanced Accent Elements */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[30rem] h-[30rem] bg-gradient-to-br from-primary/15 via-primary/8 to-primary/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/5 w-96 h-96 bg-gradient-to-tl from-primary/10 via-primary/5 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150vh] h-[150vh] bg-gradient-radial from-primary/3 via-transparent to-transparent rounded-full"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,127,0,0.03)_0%,transparent_50%)]"></div>
      </div>

      <div className="container-custom relative z-10 py-32">
        <div className="max-w-7xl mx-auto text-center">
          {/* Content */}
          <div className="space-y-16">
            <div className="space-y-16">
              <div className="relative inline-flex items-center space-x-5 bg-gradient-to-r from-primary/25 via-primary/15 to-primary/8 border-2 border-primary/40 rounded-full px-12 py-6 text-xl backdrop-blur-md shadow-2xl">
                <Award className="h-8 w-8 text-primary animate-pulse" />
                <span className="text-primary font-black tracking-wide">Government Certified Training Partner</span>
                <div className="w-5 h-5 bg-primary rounded-full animate-ping"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-transparent animate-pulse"></div>
              </div>
              
              <h1 className="text-9xl md:text-[10rem] lg:text-[14rem] xl:text-[16rem] 2xl:text-[18rem] font-black leading-[0.75] tracking-tighter">
                <span className="text-gradient-enhanced bg-clip-text block drop-shadow-2xl">EMPOWERING</span>
                <span className="text-foreground block mt-8 drop-shadow-xl">WITH ABILITY</span>
              </h1>
              
              <div className="space-y-12 max-w-7xl mx-auto">
                <p className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-muted-foreground leading-relaxed font-extralight">
                  Pioneer in <span className="text-primary font-bold relative">
                    Skill Training
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-orange-400 rounded-full"></div>
                  </span> with 
                  <span className="text-primary font-bold bg-gradient-to-r from-primary/20 to-primary/10 px-8 py-4 rounded-[2rem] ml-4 border-2 border-primary/30 shadow-xl">13+ years excellence</span>
                </p>
                <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-muted-foreground leading-relaxed font-light">
                  Transformed over <span className="text-primary font-black text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-primary via-orange-400 to-primary bg-clip-text text-transparent drop-shadow-lg">5 lakh lives</span> across India with 
                  <span className="text-gradient-enhanced bg-clip-text font-bold"> guaranteed placement success</span>
                </p>
              </div>
            </div>

            {/* Magnificent Stats Grid */}
            <div className="grid grid-cols-3 gap-20 max-w-6xl mx-auto">
              <div className="text-center group relative">
                <div className="text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black text-primary mb-8 group-hover:scale-110 transition-all duration-700 drop-shadow-2xl">13+</div>
                <div className="text-3xl font-black text-muted-foreground uppercase tracking-[0.3em] mb-4">Years Experience</div>
                <div className="w-32 h-2 bg-gradient-to-r from-primary via-orange-400 to-primary mx-auto rounded-full shadow-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="text-center group relative">
                <div className="text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black text-primary mb-8 group-hover:scale-110 transition-all duration-700 drop-shadow-2xl">5L+</div>
                <div className="text-3xl font-black text-muted-foreground uppercase tracking-[0.3em] mb-4">Lives Transformed</div>
                <div className="w-32 h-2 bg-gradient-to-r from-primary via-orange-400 to-primary mx-auto rounded-full shadow-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="text-center group relative">
                <div className="text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-black text-primary mb-8 group-hover:scale-110 transition-all duration-700 drop-shadow-2xl">100%</div>
                <div className="text-3xl font-black text-muted-foreground uppercase tracking-[0.3em] mb-4">Placement Success</div>
                <div className="w-32 h-2 bg-gradient-to-r from-primary via-orange-400 to-primary mx-auto rounded-full shadow-lg"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Supreme CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-12 justify-center">
              <Button size="lg" className="btn-primary group text-3xl px-20 py-10 rounded-[2rem] shadow-[0_20px_60px_-10px_rgba(255,127,0,0.4)] hover:shadow-[0_30px_80px_-10px_rgba(255,127,0,0.6)] transition-all duration-700 border-2 border-primary/30 relative overflow-hidden">
                <span className="font-black relative z-10">Start Your Journey</span>
                <ArrowRight className="ml-5 h-10 w-10 group-hover:translate-x-4 transition-transform duration-700 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-orange-400 to-primary opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary text-3xl px-20 py-10 rounded-[2rem] border-4 border-primary/50 hover:border-primary hover:bg-primary/15 transition-all duration-700 backdrop-blur-md relative overflow-hidden">
                <Play className="mr-5 h-10 w-10 relative z-10" />
                <span className="font-black relative z-10">Watch Our Story</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
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