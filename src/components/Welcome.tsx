import { Button } from "@/components/ui/button";
import { ArrowRight, Users, BookOpen, Award, Sparkles, Star, Heart } from "lucide-react";

const Welcome = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-primary/10 via-secondary/5 to-background overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-l from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-75"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-secondary/40 rounded-full animate-bounce delay-150"></div>
        <div className="absolute bottom-32 left-32 w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-20 right-20 w-3 h-3 bg-secondary/40 rounded-full animate-bounce delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Enhanced Welcome Header */}
          <div className="mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-scale-in">
              <Sparkles className="w-4 h-4" />
              नमस्ते! Welcome to Our Institution
              <Sparkles className="w-4 h-4" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              <span className="text-muted-foreground text-2xl md:text-3xl block mb-2">
                Welcome to
              </span>
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-fade-in delay-200">
                MATA PHOOLPATI DEVI
              </span>
              <span className="block bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent animate-fade-in delay-400">
                SHIKSHAN SANSTHAN
              </span>
            </h1>
            
            <div className="relative max-w-3xl mx-auto">
              <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in delay-600">
                शिक्षा से सशक्तीकरण की दिशा में • Empowering communities through quality education, 
                skill development, and sustainable growth initiatives. Join us in building a brighter future for all.
              </p>
              <div className="absolute -top-2 -left-2 w-6 h-6 text-primary/20">
                <Star className="w-full h-full" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 text-secondary/20">
                <Heart className="w-full h-full" />
              </div>
            </div>
          </div>

          {/* Enhanced Key Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in delay-700">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-secondary/20 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                Community Focus
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                समुदायिक विकास के लिए प्रतिबद्ध • Dedicated to serving and uplifting local communities through education
              </p>
            </div>
            
            <div className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in delay-800">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary/20 rounded-full animate-pulse delay-150"></div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">
                Quality Education
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                गुणवत्तापूर्ण शिक्षा • Providing accessible and comprehensive education for all age groups
              </p>
            </div>
            
            <div className="group bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in delay-900">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-secondary/20 rounded-full animate-pulse delay-300"></div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                Certified Programs
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                प्रमाणित पाठ्यक्रम • Government-approved courses and skill development programs
              </p>
            </div>
          </div>

          {/* Enhanced Call to Action */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in delay-1000">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-lg font-semibold">Explore Our Programs</span>
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="group border-2 border-primary/20 bg-card/50 backdrop-blur-sm text-primary hover:bg-primary/10 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <span className="text-lg font-semibold">Learn More About Us</span>
              <Heart className="ml-3 h-5 w-5 group-hover:scale-110 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;