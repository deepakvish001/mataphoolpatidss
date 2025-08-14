import { ArrowRight, Play, Award, Users, BookOpen, Target, TrendingUp, Star, Sparkles, Zap, Trophy, Crown, Gem, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen hero-gradient overflow-hidden">
      {/* Modern Geometric Background */}
      <div className="absolute inset-0">
        {/* Animated geometric shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/15 rotate-45 rounded-3xl animate-float shadow-luxury"></div>
          <div className="absolute top-1/2 right-1/6 w-64 h-64 bg-secondary/15 rotate-12 rounded-2xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-violet/15 -rotate-12 rounded-xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/3 right-1/2 w-32 h-32 bg-emerald/15 rotate-45 rounded-lg animate-float" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-1/3 right-1/5 w-20 h-20 bg-rose/15 -rotate-12 rounded-lg animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/5"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8 lg:pr-8">
            {/* Status Badge */}
            <div className="flex items-start">
              <Badge variant="secondary" className="premium-gradient text-primary-foreground border-none px-6 py-3 text-sm font-semibold rounded-full shadow-luxury">
                <Crown className="h-4 w-4 mr-2" />
                Government Certified Excellence
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                <span className="text-foreground block">TRANSFORMING</span>
                <span className="text-gradient-premium block">CAREERS</span>
                <span className="text-muted-foreground text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-light block mt-1 sm:mt-2">
                  with skill excellence
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                Join India's leading skill development program with 
                <span className="text-primary font-semibold"> 5+ years of proven success</span> and 
                <span className="text-primary font-semibold"> 100% placement assistance</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="btn-primary group w-full sm:w-auto">
                <Rocket className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5" />
                <span className="sm:hidden">Start Journey</span>
                <span className="hidden sm:inline">Start Your Journey</span>
                <ArrowRight className="ml-2 sm:ml-3 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" className="btn-secondary w-full sm:w-auto">
                <Play className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5" />
                <span className="sm:hidden">Success Stories</span>
                <span className="hidden sm:inline">Watch Success Stories</span>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-border/20">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-1">25K+</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">Students Empowered</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-1">100%</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-1">5+</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">Years Excellence</div>
              </div>
            </div>

            {/* Trust Indicators Card */}
            <div className="pt-8">
              <div className="aurora-gradient backdrop-blur-sm rounded-3xl p-6 shadow-luxury border border-border/20">
                <h3 className="text-sm font-semibold text-accent-foreground mb-4 text-center flex items-center justify-center">
                  <Gem className="h-4 w-4 mr-2" />
                  TRUSTED BY THOUSANDS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 premium-gradient rounded-2xl flex items-center justify-center shadow-lg">
                      <BookOpen className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <span className="text-xs font-medium text-accent-foreground">NSDC Certified</span>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 ocean-gradient rounded-2xl flex items-center justify-center shadow-lg">
                      <Users className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <span className="text-xs font-medium text-accent-foreground">Pan India Network</span>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 royal-gradient rounded-2xl flex items-center justify-center shadow-lg">
                      <Trophy className="h-6 w-6 text-indigo-foreground" />
                    </div>
                    <span className="text-xs font-medium text-accent-foreground">Government Approved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Content */}
          <div className="relative mt-8 lg:mt-0 lg:block">
            {/* Hero Image with modern frame */}
            <div className="relative mx-4 sm:mx-6 lg:mx-8">
              <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-3xl sm:rounded-3xl overflow-hidden royal-gradient p-4 sm:p-6 shadow-luxury">
                <img 
                  src={heroImage} 
                  alt="JITM Skills Training Excellence" 
                  className="w-full h-full object-cover rounded-2xl sm:rounded-2xl shadow-2xl"
                />
              </div>
              
              {/* Floating achievement cards */}
              <div className="absolute -top-8 -right-12 card-premium w-48 shadow-luxury">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 premium-gradient rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Star className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground">Top Rated</div>
                    <div className="text-xs text-muted-foreground">Training Partner</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-8 card-premium w-48 shadow-luxury">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 ocean-gradient rounded-2xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground">99.8% Success</div>
                    <div className="text-xs text-muted-foreground">Placement Record</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;