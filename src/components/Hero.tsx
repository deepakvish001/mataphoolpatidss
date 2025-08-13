import { ArrowRight, Play, Award, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN Training Facility" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-primary font-semibold">Government Certified Training Partner</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight font-serif">
                <span className="text-gradient">EMPOWERING</span>
                <br />
                <span className="text-foreground">WITH ABILITY</span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Pioneer in the field of Skill Training with <span className="text-primary font-semibold">13+ years of experience</span>. 
                We have trained over <span className="text-primary font-semibold">5 lakh students</span> across India with 
                <span className="text-primary font-semibold"> 100% placement assistance</span>.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">13+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5L+</div>
                <div className="text-sm text-muted-foreground">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">900+</div>
                <div className="text-sm text-muted-foreground">Expert Faculties</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-primary group">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary group">
                <Play className="mr-2 h-5 w-5" />
                Watch Our Story
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

          {/* Enhanced visual elements */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Main visual card with enhanced gradients */}
              <div className="w-full h-96 bg-gradient-to-br from-primary/10 via-primary/5 to-primary/3 rounded-3xl border border-primary/20 backdrop-blur-sm overflow-hidden shadow-strong animate-glow">
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
                
                {/* Enhanced floating achievement badges */}
                <div className="absolute top-6 left-6 bg-background/90 backdrop-blur-sm rounded-2xl p-4 border border-primary/30 animate-fade-in shadow-medium">
                  <div className="flex items-center space-x-3">
                    <Award className="h-8 w-8 text-primary" />
                    <div>
                      <div className="text-sm font-bold text-foreground">NSDC Certified</div>
                      <div className="text-xs text-muted-foreground">Government Partner</div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm rounded-2xl p-4 border border-primary/30 animate-fade-in shadow-medium" style={{animationDelay: '0.2s'}}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">900+</div>
                    <div className="text-xs text-muted-foreground">Expert Faculty</div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm rounded-2xl p-4 border border-primary/30 animate-fade-in shadow-medium" style={{animationDelay: '0.4s'}}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">100%</div>
                    <div className="text-xs text-muted-foreground">Placement Rate</div>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 bg-background/90 backdrop-blur-sm rounded-2xl p-4 border border-primary/30 animate-fade-in shadow-medium" style={{animationDelay: '0.6s'}}>
                  <div className="flex items-center space-x-2">
                    <Users className="h-6 w-6 text-primary" />
                    <div>
                      <div className="text-sm font-bold text-foreground">Pan India</div>
                      <div className="text-xs text-muted-foreground">Presence</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-glow">
                      <BookOpen className="h-10 w-10 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-foreground font-serif">Excellence in Education</h3>
                      <p className="text-muted-foreground">Transforming Lives Through Skills</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced background glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-primary/20 rounded-3xl blur-2xl opacity-60 animate-glow"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
    </section>
  );
};

export default Hero;