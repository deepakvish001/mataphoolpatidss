import { ArrowRight, Play, Award, Users, BookOpen, Target, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        {/* Floating orbs with glow */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-l from-primary/15 to-accent/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Geometric shapes with enhanced animations */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rotate-45 rounded-3xl animate-float shadow-2xl"></div>
        <div className="absolute top-1/2 right-1/6 w-48 h-48 bg-gradient-to-bl from-secondary/15 to-transparent rotate-12 rounded-2xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-gradient-to-tr from-primary/20 to-transparent -rotate-12 rounded-xl animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/50 to-background"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8 lg:pr-8 text-center lg:text-left">
            {/* Status Badge with perfect centering */}
            <div className="flex justify-center lg:justify-start animate-fade-in">
              <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20 px-5 py-2.5 text-sm font-semibold rounded-full shadow-lg backdrop-blur-sm hover:scale-105 transition-all duration-300">
                <Award className="h-4 w-4 mr-2 animate-pulse" />
                Government Certified Excellence
              </Badge>
            </div>

            {/* Main Heading with enhanced typography */}
            <div className="space-y-6 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight">
                <span className="text-foreground block bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">TRANSFORMING</span>
                <span className="text-transparent bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text block animate-pulse">CAREERS</span>
                <span className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl font-light block mt-4">
                  with <span className="relative">
                    <span className="text-primary font-semibold">skill excellence</span>
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary opacity-50"></span>
                  </span>
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 backdrop-blur-sm">
                Join India's leading skill development program with 
                <span className="text-primary font-semibold bg-primary/10 px-2 py-1 rounded-md mx-1"> 13+ years of proven success</span> and 
                <span className="text-primary font-semibold bg-primary/10 px-2 py-1 rounded-md mx-1"> 100% placement assistance</span>
              </p>
            </div>

            {/* Action Buttons with perfect alignment */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in" style={{animationDelay: '0.4s'}}>
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105 relative overflow-hidden min-w-[200px]">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <Target className="mr-3 h-5 w-5 relative z-10" />
                <span className="relative z-10">Start Your Journey</span>
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm hover:scale-105 group min-w-[200px]">
                <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Success Stories
              </Button>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gradient-to-r from-transparent via-border to-transparent animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">5L+</div>
                <div className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">Lives Transformed</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">100%</div>
                <div className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">Placement Rate</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl md:text-4xl font-black bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">13+</div>
                <div className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">Years Excellence</div>
              </div>
            </div>
          </div>

          {/* Right Visual Content with better alignment */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Hero Image with modern frame */}
            <div className="relative max-w-md lg:max-w-none">
              <div className="aspect-[4/5] w-full max-w-sm lg:max-w-md rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 p-6 mx-auto">
                <img 
                  src={heroImage} 
                  alt="JITM Skills Training Excellence" 
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
              
              {/* Floating achievement cards with better positioning */}
              <div className="absolute -top-4 -right-4 bg-background/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-border/50 animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Top Rated</div>
                    <div className="text-xs text-muted-foreground">Training Partner</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-background/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-border/50 animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">99.8% Success</div>
                    <div className="text-xs text-muted-foreground">Placement Record</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
          <div className="flex flex-wrap justify-center gap-8 text-muted-foreground text-sm">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span>NSDC Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-primary" />
              <span>Pan India Network</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-primary" />
              <span>Government Approved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;