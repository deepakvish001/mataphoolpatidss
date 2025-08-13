import { ArrowRight, Play, Award, Users, BookOpen, Target, TrendingUp, Star, Zap, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Professional Background System */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-primary/6"></div>
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        {/* Static premium orbs */}
        <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-r from-primary/15 to-secondary/12 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-l from-primary/12 to-accent/15 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-accent/8 to-primary/12 rounded-full blur-2xl opacity-30"></div>
        
        {/* Professional geometric patterns */}
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-primary/8 to-transparent rotate-45 rounded-3xl shadow-xl backdrop-blur-[1px] opacity-60"></div>
        <div className="absolute top-1/2 right-1/6 w-56 h-56 bg-gradient-to-bl from-secondary/10 to-transparent rotate-12 rounded-2xl shadow-lg opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-gradient-to-tr from-primary/15 to-transparent -rotate-12 rounded-xl shadow-md opacity-40"></div>
        
        {/* Refined gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-background/70 to-background/95"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/30"></div>
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10 min-h-screen flex items-center py-24 lg:py-0">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full max-w-7xl mx-auto">
          {/* Left Content - 7 columns */}
          <div className="lg:col-span-7 space-y-12 lg:space-y-14 text-center lg:text-left flex flex-col justify-center">
            {/* Professional Status Badge */}
            <div className="flex justify-center lg:justify-start">
              <Badge variant="secondary" className="bg-gradient-to-r from-primary/12 to-secondary/12 text-primary border border-primary/25 px-6 py-3 text-base font-bold rounded-full shadow-lg backdrop-blur-sm">
                <Award className="h-5 w-5 mr-3" />
                Government Certified Excellence
              </Badge>
            </div>

            {/* Premium Typography System */}
            <div className="space-y-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.8] tracking-tighter">
                <span className="text-foreground block bg-gradient-to-r from-foreground via-foreground/95 to-foreground/85 bg-clip-text text-transparent">TRANSFORMING</span>
                <span className="text-transparent bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text block bg-[length:100%_100%]">CAREERS</span>
                <span className="text-muted-foreground text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light block mt-6 leading-tight">
                  with <span className="relative inline-block">
                    <span className="text-primary font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">skill excellence</span>
                    <span className="absolute -bottom-3 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-secondary rounded-full opacity-70"></span>
                  </span>
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground/95 leading-relaxed max-w-3xl mx-auto lg:mx-0 font-light">
                Join India's leading skill development program with 
                <span className="text-primary font-semibold bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-2 rounded-xl mx-2 border border-primary/25 backdrop-blur-sm"> 13+ years of proven success</span> and 
                <span className="text-primary font-semibold bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-2 rounded-xl mx-2 border border-primary/25 backdrop-blur-sm"> 100% placement assistance</span>
              </p>
            </div>

            {/* Professional Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start">
              <Button size="lg" className="relative bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground px-12 py-8 text-2xl font-bold rounded-2xl shadow-2xl border border-primary/30 min-w-[280px]">
                <Zap className="mr-4 h-7 w-7" />
                <span>Start Your Journey</span>
                <ArrowRight className="ml-4 h-7 w-7" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary/50 bg-background/70 backdrop-blur-md text-primary px-12 py-8 text-2xl font-bold rounded-2xl min-w-[280px] shadow-xl">
                <Play className="mr-4 h-7 w-7" />
                <span>Watch Success Stories</span>
              </Button>
            </div>

            {/* Professional Statistics Display */}
            <div className="grid grid-cols-3 gap-8 pt-12">
              <div className="text-center p-8 rounded-3xl border border-primary/25 bg-gradient-to-br from-background/70 to-background/50 backdrop-blur-sm shadow-xl">
                <div className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">5L+</div>
                <div className="text-lg text-muted-foreground font-semibold flex items-center justify-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  Lives Transformed
                </div>
              </div>
              <div className="text-center p-8 rounded-3xl border border-primary/25 bg-gradient-to-br from-background/70 to-background/50 backdrop-blur-sm shadow-xl">
                <div className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">100%</div>
                <div className="text-lg text-muted-foreground font-semibold flex items-center justify-center gap-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  Placement Rate
                </div>
              </div>
              <div className="text-center p-8 rounded-3xl border border-primary/25 bg-gradient-to-br from-background/70 to-background/50 backdrop-blur-sm shadow-xl">
                <div className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">13+</div>
                <div className="text-lg text-muted-foreground font-semibold flex items-center justify-center gap-3">
                  <Award className="h-6 w-6 text-primary" />
                  Years Excellence
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Content - 5 columns */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center">
            {/* Professional Hero Image */}
            <div className="relative w-full max-w-md lg:max-w-full">
              {/* Subtle outer glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-secondary/15 rounded-3xl blur-2xl scale-105 opacity-30"></div>
              
              {/* Main image container */}
              <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden bg-gradient-to-br from-primary/12 to-secondary/12 p-8 lg:p-10 mx-auto shadow-2xl border border-primary/25 backdrop-blur-sm">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <img 
                    src={heroImage} 
                    alt="JITM Skills Training Excellence" 
                    className="w-full h-full object-cover shadow-xl"
                  />
                  {/* Professional overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/15 via-transparent to-transparent"></div>
                </div>
              </div>
              
              {/* Professional achievement cards */}
              <div className="absolute -top-8 -right-8 lg:-top-12 lg:-right-12 bg-background/95 backdrop-blur-xl rounded-2xl p-6 lg:p-7 shadow-2xl border border-primary/30">
                <div className="flex items-center space-x-4 lg:space-x-5">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary/25 to-secondary/25 rounded-xl flex items-center justify-center">
                    <Star className="h-7 w-7 lg:h-8 lg:w-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-base lg:text-lg font-bold text-foreground">Top Rated</div>
                    <div className="text-sm lg:text-base text-muted-foreground">Training Partner</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 lg:-bottom-12 lg:-left-12 bg-background/95 backdrop-blur-xl rounded-2xl p-6 lg:p-7 shadow-2xl border border-primary/30">
                <div className="flex items-center space-x-4 lg:space-x-5">
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary/25 to-secondary/25 rounded-xl flex items-center justify-center">
                    <Shield className="h-7 w-7 lg:h-8 lg:w-8 text-primary" />
                  </div>
                  <div>
                    <div className="text-base lg:text-lg font-bold text-foreground">99.8% Success</div>
                    <div className="text-sm lg:text-base text-muted-foreground">Placement Record</div>
                  </div>
                </div>
              </div>

              {/* Side badge */}
              <div className="absolute top-1/2 -left-6 lg:-left-8 bg-background/95 backdrop-blur-xl rounded-xl p-4 lg:p-5 shadow-xl border border-primary/25 transform -translate-y-1/2">
                <div className="flex items-center space-x-3">
                  <Globe className="h-6 w-6 text-primary" />
                  <span className="text-sm lg:text-base font-semibold text-foreground whitespace-nowrap">Pan India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Trust Indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-6">
          <div className="bg-background/90 backdrop-blur-xl rounded-3xl border border-primary/25 p-8 shadow-2xl">
            <div className="flex flex-wrap justify-center gap-12 lg:gap-16 text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <span className="text-lg font-bold">NSDC Certified</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <span className="text-lg font-bold">Pan India Network</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <span className="text-lg font-bold">Government Approved</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;