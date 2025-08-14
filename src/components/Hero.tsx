import { ArrowRight, Play, Award, Users, BookOpen, Target, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen bg-background overflow-hidden">
      {/* Modern Geometric Background */}
      <div className="absolute inset-0">
        {/* Animated geometric shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rotate-45 rounded-3xl animate-float"></div>
          <div className="absolute top-1/2 right-1/6 w-64 h-64 bg-secondary/10 rotate-12 rounded-2xl animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-primary/8 -rotate-12 rounded-xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left Content */}
          <div className="space-y-8 lg:pr-8">
            {/* Status Badge */}
            <div className="flex items-start">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-semibold rounded-full">
                <Award className="h-4 w-4 mr-2" />
                Government Certified Excellence
              </Badge>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                <span className="text-foreground block">TRANSFORMING</span>
                <span className="text-primary block">CAREERS</span>
                <span className="text-muted-foreground text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-light block mt-1 sm:mt-2">
                  with skill excellence
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                Join India's leading skill development program with 
                <span className="text-primary font-semibold"> 13+ years of proven success</span> and 
                <span className="text-primary font-semibold"> 100% placement assistance</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group w-full sm:w-auto">
                <Target className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5" />
                <span className="sm:hidden">Start Journey</span>
                <span className="hidden sm:inline">Start Your Journey</span>
                <ArrowRight className="ml-2 sm:ml-3 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary/30 text-primary hover:bg-primary/5 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 w-full sm:w-auto">
                <Play className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5" />
                <span className="sm:hidden">Success Stories</span>
                <span className="hidden sm:inline">Watch Success Stories</span>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-border/20">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-1">5L+</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">Lives Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-1">100%</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-1">13+</div>
                <div className="text-xs sm:text-sm text-muted-foreground font-medium">Years Excellence</div>
              </div>
            </div>

            {/* Trust Indicators Card */}
            <div className="pt-8">
              <div className="bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border/20">
                <h3 className="text-sm font-semibold text-primary mb-4 text-center">TRUSTED BY THOUSANDS</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <span className="text-xs font-medium text-foreground">NSDC Certified</span>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <span className="text-xs font-medium text-foreground">Pan India Network</span>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <Award className="h-6 w-6 text-purple-600" />
                    </div>
                    <span className="text-xs font-medium text-foreground">Government Approved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Content */}
          <div className="relative mt-8 lg:mt-0 lg:block">
            {/* Hero Image with modern frame */}
            <div className="relative mx-4 sm:mx-6 lg:mx-8">
              <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 p-4 sm:p-6">
                <img 
                  src={heroImage} 
                  alt="JITM Skills Training Excellence" 
                  className="w-full h-full object-cover rounded-xl sm:rounded-2xl shadow-2xl"
                />
              </div>
              
              {/* Floating achievement cards */}
              <div className="absolute -top-8 -right-12 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border/50 w-48">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-foreground">Top Rated</div>
                    <div className="text-xs text-muted-foreground">Training Partner</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-8 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-border/50 w-48">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-primary" />
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