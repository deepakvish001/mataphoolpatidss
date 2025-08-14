import { ArrowRight, Play, Award, Users, BookOpen, Target, TrendingUp, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

const Hero = () => {
  const heroImages = [
    '/lovable-uploads/628467af-7c3c-422a-bca3-db6d45fdc8df.png',
    '/lovable-uploads/b5574b24-63e2-45cc-93a6-da83d22ca0e5.png',
    '/lovable-uploads/60184028-b491-4b63-88e5-0249f7aae2b7.png',
    '/lovable-uploads/ad203805-3287-4c05-8844-7c2d1f2bb45b.png'
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <section id="home" className="relative min-h-screen bg-background overflow-hidden">
      {/* Enhanced Modern Geometric Background */}
      <div className="absolute inset-0">
        {/* Sophisticated animated geometric shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/8 to-blue-500/5 rotate-45 rounded-3xl animate-float-slow shadow-2xl"></div>
          <div className="absolute top-1/2 right-1/6 w-64 h-64 bg-gradient-to-br from-blue-500/6 to-primary/8 rotate-12 rounded-2xl animate-float-slower shadow-xl" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-gradient-to-br from-primary/10 to-blue-600/6 -rotate-12 rounded-xl animate-float shadow-lg" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Enhanced gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/3"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.04),transparent_50%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background/90 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 min-h-screen flex items-center">
        {/* Hero Image Slider - Full Width */}
        <div className="w-full">
          <div className="relative mx-auto max-w-7xl">
            {/* Image Slider Container */}
            <div className="relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[24/9] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
              {/* Slider Images */}
              <div 
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {heroImages.map((image, index) => (
                  <div key={index} className="min-w-full h-full relative">
                    <img 
                      src={image} 
                      alt={`Yuva Vikas Society Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient overlay for better text visibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
              >
                <ChevronLeft className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group"
              >
                <ChevronRight className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white scale-125' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              {/* Call-to-Action Overlay */}
              <div className="absolute bottom-8 right-8">
                <Button 
                  size="lg" 
                  className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  onClick={() => window.location.href = '/donation'}
                >
                  <Target className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Join Our Mission
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Trust Indicators Below Slider */}
            <div className="mt-8">
              <div className="bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/5 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border/20">
                <h3 className="text-sm font-semibold text-primary mb-4 text-center">TRUSTED BY THOUSANDS</h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                      <Star className="h-6 w-6 text-orange-600" />
                    </div>
                    <span className="text-xs font-medium text-foreground">Top Rated Partner</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-black text-primary mb-1">25K+</div>
                <div className="text-sm text-muted-foreground font-medium">Students Empowered</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-primary mb-1">100%</div>
                <div className="text-sm text-muted-foreground font-medium">Placement Rate</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black text-primary mb-1">5+</div>
                <div className="text-sm text-muted-foreground font-medium">Years Excellence</div>
              </div>
            </div>
          </div>
        </div>

        {/* PM Modi Quote Section */}
        <div className="mt-16">
          <div className="relative w-full">
            <img 
              src="/lovable-uploads/f1cf0043-5b2b-48b3-a0b5-fc08c31c0480.png" 
              alt="PM Narendra Modi Quote on Entrepreneurship" 
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Pankh Paridhi Foundation Section */}
        <div className="mt-12">
          <div className="relative w-full">
            <img 
              src="/lovable-uploads/227f4b44-6802-4010-89bd-90f316f0458e.png" 
              alt="Pankh Paridhi Foundation - Our Mission and Courses" 
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;