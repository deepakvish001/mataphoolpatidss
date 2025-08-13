import { ArrowRight, Play, Award, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/10">
      {/* Simplified Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="JITM Skills Training Facility" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-primary/5"></div>
      </div>

      {/* Minimal Background Elements */}
      <div className="absolute inset-0 z-5 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-orange-500/8 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/20 to-orange-500/20 border border-primary/30 rounded-full px-6 py-3 text-sm backdrop-blur-sm shadow-glow">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-primary font-bold tracking-wide">Government Certified Training Partner</span>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent">EMPOWERING</span>
                <br />
                <span className="text-foreground">WITH ABILITY</span>
              </h1>
              
              <div className="space-y-4 max-w-2xl">
                <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-medium">
                  Pioneer in the field of <span className="text-primary font-bold">Skill Training</span> with <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-lg">13+ years of experience</span>. 
                </p>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  We have trained over <span className="text-primary font-bold text-xl lg:text-2xl">5 lakh students</span> across India with 
                  <span className="text-primary font-bold"> 100% placement assistance</span>.
                </p>
              </div>
            </div>

            {/* Stats with Clean Design */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="relative group bg-gradient-to-br from-primary/8 to-transparent border border-primary/20 rounded-2xl p-4 lg:p-6 text-center hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <div className="text-3xl lg:text-4xl font-black text-primary mb-2">13+</div>
                <div className="text-xs lg:text-sm font-semibold text-muted-foreground uppercase tracking-wide">Years Experience</div>
              </div>
              <div className="relative group bg-gradient-to-br from-orange-500/8 to-transparent border border-orange-500/20 rounded-2xl p-4 lg:p-6 text-center hover:scale-105 transition-all duration-300 backdrop-blur-sm">
                <div className="text-3xl lg:text-4xl font-black text-orange-500 mb-2">5L+</div>
                <div className="text-xs lg:text-sm font-semibold text-muted-foreground uppercase tracking-wide">Students Trained</div>
              </div>
              <div className="relative group bg-gradient-to-br from-blue-500/8 to-transparent border border-blue-500/20 rounded-2xl p-4 lg:p-6 text-center hover:scale-105 transition-all duration-300 backdrop-blur-sm col-span-2 lg:col-span-1">
                <div className="text-3xl lg:text-4xl font-black text-blue-500 mb-2">900+</div>
                <div className="text-xs lg:text-sm font-semibold text-muted-foreground uppercase tracking-wide">Expert Faculties</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <Button size="lg" className="group relative bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-4 h-auto">
                <span className="flex items-center">
                  Start Your Journey
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button size="lg" variant="outline" className="group relative border-2 border-primary/30 hover:border-primary/50 backdrop-blur-sm font-semibold text-lg px-8 py-4 h-auto">
                <div className="flex items-center">
                  <div className="mr-3 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Play className="h-5 w-5 text-primary" />
                  </div>
                  Watch Our Story
                </div>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-border/50">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>NSDC Training Partner</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span>Pan India Presence</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4 text-primary" />
                <span>Government Recognized</span>
              </div>
            </div>
          </div>

          {/* Clean Visual Experience */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Main visual card */}
              <div className="w-full max-w-lg mx-auto aspect-square bg-gradient-to-br from-primary/15 via-orange-500/10 to-blue-500/8 rounded-3xl border-2 border-primary/20 backdrop-blur-sm overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent"></div>
                
                {/* Achievement badges */}
                <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-xl rounded-2xl p-4 border border-primary/20 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">NSDC Certified</div>
                      <div className="text-xs text-muted-foreground">Government Partner</div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-xl rounded-2xl p-4 border border-orange-500/20 shadow-lg">
                  <div className="text-center">
                    <div className="text-xl font-black text-orange-500">900+</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">Expert Faculty</div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-xl rounded-2xl p-4 border border-blue-500/20 shadow-lg">
                  <div className="text-center">
                    <div className="text-xl font-black text-blue-500">100%</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">Placement Rate</div>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 bg-background/90 backdrop-blur-xl rounded-2xl p-4 border border-primary/20 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">Pan India</div>
                      <div className="text-xs text-muted-foreground">Presence</div>
                    </div>
                  </div>
                </div>

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-primary/30">
                        <div className="w-16 h-16 bg-background/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <BookOpen className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-black text-foreground">Excellence in Education</h3>
                      <p className="text-muted-foreground font-medium">Transforming Lives Through Skills</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Subtle background glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-3xl blur-2xl opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;