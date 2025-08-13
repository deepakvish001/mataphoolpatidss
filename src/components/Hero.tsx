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
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="text-foreground block">TRANSFORMING</span>
                <span className="text-primary block">CAREERS</span>
                <span className="text-muted-foreground text-3xl md:text-4xl lg:text-5xl font-light block mt-2">
                  with skill excellence
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                Join India's leading skill development program with 
                <span className="text-primary font-semibold"> 13+ years of proven success</span> and 
                <span className="text-primary font-semibold"> 100% placement assistance</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                <Target className="mr-3 h-5 w-5" />
                Start Your Journey
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary/30 text-primary hover:bg-primary/5 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300">
                <Play className="mr-3 h-5 w-5" />
                Watch Success Stories
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/20">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-primary mb-1">5L+</div>
                <div className="text-sm text-muted-foreground font-medium">Lives Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground font-medium">Placement Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-primary mb-1">13+</div>
                <div className="text-sm text-muted-foreground font-medium">Years Excellence</div>
              </div>
            </div>
          </div>

          {/* Right Visual Content */}
          <div className="relative lg:block hidden">
            {/* Hero Image with modern frame */}
            <div className="relative mx-8">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
                <img 
                  src={heroImage} 
                  alt="JITM Skills Training Excellence" 
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
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

        {/* Trust Indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4">
          <div className="flex items-center justify-center gap-8 md:gap-12 text-muted-foreground text-sm">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="whitespace-nowrap">NSDC Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="whitespace-nowrap">Pan India Network</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="whitespace-nowrap">Government Approved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;