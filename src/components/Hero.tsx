import { ArrowRight, Play, Award, Users, BookOpen, Target, TrendingUp, Star, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Advanced Background System */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-primary/8"></div>
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        {/* Premium floating orbs with enhanced glow */}
        <div className="absolute top-16 left-16 w-80 h-80 bg-gradient-to-r from-primary/25 to-secondary/20 rounded-full blur-3xl animate-float-slow opacity-60"></div>
        <div className="absolute bottom-16 right-16 w-96 h-96 bg-gradient-to-l from-primary/20 to-accent/20 rounded-full blur-3xl animate-float-slower opacity-70" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-accent/15 to-primary/25 rounded-full blur-2xl animate-pulse-glow" style={{animationDelay: '4s'}}></div>
        
        {/* Enhanced geometric patterns */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-primary/12 to-transparent rotate-45 rounded-3xl animate-float shadow-2xl backdrop-blur-[1px]"></div>
        <div className="absolute top-1/2 right-1/6 w-56 h-56 bg-gradient-to-bl from-secondary/18 to-transparent rotate-12 rounded-2xl animate-float-slow shadow-xl" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-gradient-to-tr from-primary/25 to-transparent -rotate-12 rounded-xl animate-float-slower shadow-lg" style={{animationDelay: '3s'}}></div>
        
        {/* Particle effects */}
        <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-float blur-sm" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-3/4 right-2/3 w-1 h-1 bg-primary/50 rounded-full animate-float-slow blur-sm" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/3 right-1/2 w-1.5 h-1.5 bg-secondary/40 rounded-full animate-float-slower blur-sm" style={{animationDelay: '2.5s'}}></div>
        
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/60 to-background/90"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen flex items-center py-20 lg:py-0">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full max-w-7xl mx-auto">
          {/* Left Content - 7 columns */}
          <div className="lg:col-span-7 space-y-8 lg:space-y-10 text-center lg:text-left flex flex-col justify-center">
            {/* Status Badge with perfect centering */}
            <div className="flex justify-center lg:justify-start animate-fade-in">
              <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20 px-5 py-2.5 text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm hover:scale-105 transition-all duration-300">
                <Award className="h-4 w-4 mr-2 animate-pulse" />
                Government Certified Excellence
              </Badge>
            </div>

            {/* Main Heading with enhanced typography */}
            <div className="space-y-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.85] tracking-tight">
                <span className="text-foreground block text-gradient-enhanced animate-gradient-x">TRANSFORMING</span>
                <span className="text-transparent bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text block animate-gradient-x bg-[length:200%_200%]">CAREERS</span>
                <span className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light block mt-4">
                  with <span className="relative inline-block">
                    <span className="text-primary font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">skill excellence</span>
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-full opacity-60 animate-pulse"></span>
                  </span>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 backdrop-blur-sm">
                Join India's leading skill development program with 
                <span className="text-primary font-semibold bg-gradient-to-r from-primary/15 to-secondary/15 px-3 py-1.5 rounded-lg mx-1 border border-primary/20 backdrop-blur-sm hover:bg-primary/20 transition-all duration-300 cursor-pointer"> 13+ years of proven success</span> and 
                <span className="text-primary font-semibold bg-gradient-to-r from-primary/15 to-secondary/15 px-3 py-1.5 rounded-lg mx-1 border border-primary/20 backdrop-blur-sm hover:bg-primary/20 transition-all duration-300 cursor-pointer"> 100% placement assistance</span>
              </p>
            </div>

            {/* Premium Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start animate-fade-in" style={{animationDelay: '0.4s'}}>
              <Button size="lg" className="relative group bg-gradient-to-r from-primary via-accent to-primary hover:from-primary/90 hover:via-accent/90 hover:to-primary/90 text-primary-foreground px-10 py-7 text-xl font-bold rounded-2xl shadow-2xl hover:shadow-glow transition-all duration-500 hover:scale-110 overflow-hidden min-w-[240px] border border-primary/20">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <Zap className="mr-3 h-6 w-6 relative z-10 group-hover:animate-pulse" />
                <span className="relative z-10">Start Your Journey</span>
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
              </Button>
              <Button size="lg" variant="outline" className="relative group border-3 border-primary/40 bg-background/50 backdrop-blur-md text-primary hover:bg-primary/15 hover:border-primary/60 px-10 py-7 text-xl font-bold rounded-2xl transition-all duration-500 hover:scale-110 hover:shadow-xl min-w-[240px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Play className="mr-3 h-6 w-6 group-hover:scale-125 transition-transform duration-300 relative z-10" />
                <span className="relative z-10">Watch Success Stories</span>
              </Button>
            </div>

            {/* Premium Statistics Cards */}
            <div className="grid grid-cols-3 gap-6 pt-10 animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="relative group cursor-pointer p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-sm hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">5L+</div>
                  <div className="text-sm text-muted-foreground font-semibold group-hover:text-foreground transition-colors flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary group-hover:animate-pulse" />
                    Lives Transformed
                  </div>
                </div>
              </div>
              <div className="relative group cursor-pointer p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-sm hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
                  <div className="text-sm text-muted-foreground font-semibold group-hover:text-foreground transition-colors flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary group-hover:animate-pulse" />
                    Placement Rate
                  </div>
                </div>
              </div>
              <div className="relative group cursor-pointer p-6 rounded-2xl border border-primary/20 bg-gradient-to-br from-background/50 to-background/30 backdrop-blur-sm hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">13+</div>
                  <div className="text-sm text-muted-foreground font-semibold group-hover:text-foreground transition-colors flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary group-hover:animate-pulse" />
                    Years Excellence
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Content - 5 columns */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center">
            {/* Premium Hero Image with advanced frame */}
            <div className="relative w-full max-w-sm lg:max-w-full">
              {/* Outer glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl scale-110 opacity-50 animate-pulse-glow"></div>
              
              {/* Main image container */}
              <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-gradient-to-br from-primary/15 to-secondary/15 p-6 lg:p-8 mx-auto shadow-2xl border border-primary/20 backdrop-blur-sm">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <img 
                    src={heroImage} 
                    alt="JITM Skills Training Excellence" 
                    className="w-full h-full object-cover shadow-xl animate-ken-burns"
                  />
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent"></div>
                </div>
              </div>
              
              {/* Enhanced floating achievement cards */}
              <div className="absolute -top-6 -right-6 lg:-top-8 lg:-right-8 bg-background/95 backdrop-blur-xl rounded-2xl p-4 lg:p-5 shadow-2xl border border-primary/30 animate-float-slow hover:scale-105 transition-transform duration-300 cursor-pointer">
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl flex items-center justify-center relative">
                    <Star className="h-6 w-6 lg:h-7 lg:w-7 text-primary animate-pulse" />
                    <div className="absolute inset-0 bg-primary/20 rounded-xl animate-ping"></div>
                  </div>
                  <div>
                    <div className="text-sm lg:text-base font-bold text-foreground">Top Rated</div>
                    <div className="text-xs lg:text-sm text-muted-foreground">Training Partner</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 lg:-bottom-8 lg:-left-8 bg-background/95 backdrop-blur-xl rounded-2xl p-4 lg:p-5 shadow-2xl border border-primary/30 animate-float hover:scale-105 transition-transform duration-300 cursor-pointer" style={{animationDelay: '2s'}}>
                <div className="flex items-center space-x-3 lg:space-x-4">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl flex items-center justify-center relative">
                    <Shield className="h-6 w-6 lg:h-7 lg:w-7 text-primary animate-pulse" />
                    <div className="absolute inset-0 bg-primary/20 rounded-xl animate-ping"></div>
                  </div>
                  <div>
                    <div className="text-sm lg:text-base font-bold text-foreground">99.8% Success</div>
                    <div className="text-xs lg:text-sm text-muted-foreground">Placement Record</div>
                  </div>
                </div>
              </div>

              {/* Additional floating badge */}
              <div className="absolute top-1/2 -left-4 lg:-left-6 bg-background/95 backdrop-blur-xl rounded-xl p-3 lg:p-4 shadow-xl border border-primary/25 animate-float-slower transform -translate-y-1/2" style={{animationDelay: '3s'}}>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-primary animate-pulse" />
                  <span className="text-xs lg:text-sm font-semibold text-foreground whitespace-nowrap">Pan India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Trust Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4">
          <div className="bg-background/80 backdrop-blur-xl rounded-2xl border border-primary/20 p-6 shadow-xl">
            <div className="flex flex-wrap justify-center gap-8 lg:gap-12 text-muted-foreground">
              <div className="flex items-center space-x-3 group cursor-pointer hover:text-foreground transition-colors duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-5 w-5 text-primary group-hover:animate-pulse" />
                </div>
                <span className="font-semibold">NSDC Certified</span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer hover:text-foreground transition-colors duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-5 w-5 text-primary group-hover:animate-pulse" />
                </div>
                <span className="font-semibold">Pan India Network</span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer hover:text-foreground transition-colors duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-5 w-5 text-primary group-hover:animate-pulse" />
                </div>
                <span className="font-semibold">Government Approved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;