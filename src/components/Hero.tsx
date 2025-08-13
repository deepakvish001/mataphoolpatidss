import { ArrowRight, Play, Award, Users, BookOpen, Target, TrendingUp, Star, Zap, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/5"></div>
        
        {/* Floating geometric elements */}
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/8 to-transparent rotate-45 rounded-[60px] animate-pulse blur-sm"></div>
          <div className="absolute top-1/2 right-1/6 w-80 h-80 bg-gradient-to-bl from-secondary/10 to-transparent rotate-12 rounded-[40px] animate-float blur-sm" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 right-1/3 w-60 h-60 bg-gradient-to-tr from-primary/6 to-transparent -rotate-12 rounded-[30px] animate-float blur-sm" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Particle effect overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-40 right-40 w-1 h-1 bg-secondary rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-60 w-1.5 h-1.5 bg-primary/70 rounded-full animate-ping" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-60 right-20 w-1 h-1 bg-secondary/70 rounded-full animate-ping" style={{animationDelay: '6s'}}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-20 items-center w-full">
          {/* Left Content */}
          <div className="space-y-10 lg:pr-8 animate-fade-in">
            {/* Enhanced Status Badge */}
            <div className="flex items-start">
              <Badge className="bg-gradient-to-r from-primary/15 to-primary/5 text-primary border border-primary/30 px-6 py-3 text-base font-bold rounded-full shadow-lg backdrop-blur-sm animate-pulse">
                <Shield className="h-5 w-5 mr-3" />
                Government Certified Excellence
                <Zap className="h-4 w-4 ml-3 text-yellow-500" />
              </Badge>
            </div>

            {/* Enhanced Main Heading */}
            <div className="space-y-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
                <span className="text-transparent bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text block animate-slide-in-left">TRANSFORMING</span>
                <span className="text-transparent bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text block animate-slide-in-left" style={{animationDelay: '0.2s'}}>CAREERS</span>
                <span className="text-muted-foreground text-2xl md:text-3xl lg:text-4xl font-light block mt-4 animate-slide-in-left" style={{animationDelay: '0.4s'}}>
                  through innovation & excellence
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl animate-fade-in" style={{animationDelay: '0.6s'}}>
                Join India's most trusted skill development ecosystem with 
                <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-lg mx-1 inline-block"> 13+ years proven track record</span> and 
                <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-lg mx-1 inline-block"> guaranteed career transformation</span>
              </p>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 animate-fade-in" style={{animationDelay: '0.8s'}}>
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground px-10 py-7 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-primary/25 hover:scale-105 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Target className="mr-4 h-6 w-6 relative z-10" />
                <span className="relative z-10">Start Your Journey</span>
                <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60 px-10 py-7 text-xl font-bold rounded-2xl backdrop-blur-sm bg-background/50 hover:scale-105 transition-all duration-300 group">
                <Play className="mr-4 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                Watch Success Stories
              </Button>
            </div>

            {/* Enhanced Stats with Animations */}
            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-gradient-to-r from-transparent via-border to-transparent animate-fade-in" style={{animationDelay: '1s'}}>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-gradient-to-br from-primary to-primary/70 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">5L+</div>
                <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Lives Transformed</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-gradient-to-br from-primary to-primary/70 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
                <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Placement Success</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-gradient-to-br from-primary to-primary/70 bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">13+</div>
                <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Years Excellence</div>
              </div>
            </div>
          </div>

          {/* Enhanced Right Visual Content */}
          <div className="relative lg:block hidden animate-fade-in" style={{animationDelay: '0.4s'}}>
            {/* Hero Image with enhanced effects */}
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-gradient-to-br from-primary/15 via-primary/10 to-secondary/15 p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02]">
                <img 
                  src={heroImage} 
                  alt="JITM Skills Training Excellence" 
                  className="w-full h-full object-cover rounded-[2rem] shadow-2xl group-hover:scale-105 transition-transform duration-700"
                />
                {/* Image overlay gradient */}
                <div className="absolute inset-8 rounded-[2rem] bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Enhanced floating achievement cards */}
              <div className="absolute -top-6 -right-6 bg-background/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-primary/20 hover:shadow-primary/10 hover:scale-105 transition-all duration-300 animate-float">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-foreground">Top Rated</div>
                    <div className="text-sm text-muted-foreground">Training Partner</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-background/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-primary/20 hover:shadow-primary/10 hover:scale-105 transition-all duration-300 animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-base font-bold text-foreground">99.8% Success</div>
                    <div className="text-sm text-muted-foreground">Placement Record</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-4 bg-background/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-primary/20 hover:scale-105 transition-all duration-300 animate-pulse">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Growing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Trust Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-5xl animate-fade-in" style={{animationDelay: '1.2s'}}>
          <div className="flex flex-wrap justify-center gap-12 text-muted-foreground">
            <div className="flex items-center space-x-3 hover:text-primary transition-colors duration-300 group">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold">NSDC Certified</span>
            </div>
            <div className="flex items-center space-x-3 hover:text-primary transition-colors duration-300 group">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold">Pan India Network</span>
            </div>
            <div className="flex items-center space-x-3 hover:text-primary transition-colors duration-300 group">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold">Government Approved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;