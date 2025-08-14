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
            <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-6 py-3 rounded-full text-base font-bold mb-8 animate-scale-in border border-primary/30">
              <Sparkles className="w-5 h-5" />
              <span className="font-extrabold">Welcome to Excellence in Education</span>
              <Sparkles className="w-5 h-5" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">
              <span className="text-foreground text-3xl md:text-4xl block mb-4 font-bold">
                Welcome to
              </span>
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-fade-in delay-200 font-black">
                MATA PHOOLPATI DEVI
              </span>
              <span className="block bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent animate-fade-in delay-400 font-black">
                SHIKSHAN SANSTHAN
              </span>
            </h1>
            
            <div className="relative max-w-4xl mx-auto bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed animate-fade-in delay-600 font-bold">
                <span className="text-primary font-extrabold">Transforming Lives Through Education</span>
                <br />
                <span className="font-semibold text-lg md:text-xl mt-2 block">
                  We are dedicated to empowering communities through quality education, comprehensive skill development, 
                  and sustainable growth initiatives. Join us in building a brighter, more prosperous future for everyone.
                </span>
              </p>
              <div className="absolute -top-3 -left-3 w-8 h-8 text-primary/30">
                <Star className="w-full h-full" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-8 h-8 text-secondary/30">
                <Heart className="w-full h-full" />
              </div>
            </div>
          </div>

          {/* Enhanced Key Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group bg-card/80 backdrop-blur-sm border-2 border-primary/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 animate-fade-in delay-700">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary/30 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-primary transition-colors">
                Community Focused
              </h3>
              <p className="text-foreground leading-relaxed font-semibold text-base">
                <span className="font-bold text-primary">Dedicated to Community Growth:</span><br />
                We are committed to serving and uplifting local communities through comprehensive 
                educational programs and community development initiatives.
              </p>
            </div>
            
            <div className="group bg-card/80 backdrop-blur-sm border-2 border-secondary/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 animate-fade-in delay-800">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary/70 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary/30 rounded-full animate-pulse delay-150"></div>
              </div>
              <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-secondary transition-colors">
                Quality Education
              </h3>
              <p className="text-foreground leading-relaxed font-semibold text-base">
                <span className="font-bold text-secondary">Excellence in Learning:</span><br />
                Providing accessible, comprehensive, and high-quality education for learners 
                of all ages with modern teaching methodologies and resources.
              </p>
            </div>
            
            <div className="group bg-card/80 backdrop-blur-sm border-2 border-primary/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 animate-fade-in delay-900">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary/30 rounded-full animate-pulse delay-300"></div>
              </div>
              <h3 className="text-2xl font-black text-foreground mb-4 group-hover:text-primary transition-colors">
                Certified Programs
              </h3>
              <p className="text-foreground leading-relaxed font-semibold text-base">
                <span className="font-bold text-primary">Government Approved:</span><br />
                Offering officially recognized, government-approved courses and comprehensive 
                skill development programs with industry-standard certifications.
              </p>
            </div>
          </div>

          {/* Enhanced Call to Action */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in delay-1000">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-10 py-5 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-white/20"
            >
              <span className="text-xl font-black">Explore Our Programs</span>
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform font-bold" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="group border-3 border-primary/30 bg-card/80 backdrop-blur-sm text-foreground hover:bg-primary/10 px-10 py-5 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <span className="text-xl font-black">Learn More About Us</span>
              <Heart className="ml-3 h-6 w-6 group-hover:scale-125 transition-transform text-primary" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;