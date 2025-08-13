import { ArrowRight, Play, Award, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="JITM Skills Training Facility" 
          className="w-full h-full object-cover opacity-15 animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/70 to-primary/5"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 z-5 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-float"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[size:40px_40px] opacity-20"></div>
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/20 to-orange-500/20 border border-primary/30 rounded-full px-6 py-3 text-sm backdrop-blur-sm shadow-glow animate-glow">
                <Award className="h-5 w-5 text-primary animate-spin-slow" />
                <span className="text-primary font-bold tracking-wide">Government Certified Training Partner</span>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tight">
                <span className="text-gradient-enhanced animate-gradient-x bg-clip-text">EMPOWERING</span>
                <br />
                <span className="text-foreground drop-shadow-sm">WITH ABILITY</span>
              </h1>
              
              <div className="space-y-4">
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-medium">
                  Pioneer in the field of <span className="text-gradient font-bold">Skill Training</span> with <span className="text-primary font-bold bg-primary/10 px-2 py-1 rounded-lg">13+ years of experience</span>. 
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  We have trained over <span className="text-primary font-bold text-2xl">5 lakh students</span> across India with 
                  <span className="text-gradient font-bold"> 100% placement assistance</span>.
                </p>
              </div>
            </div>

            {/* Enhanced Stats with Premium Design */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="group bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 backdrop-blur-sm animate-fade-in">
                <div className="text-4xl font-black text-gradient mb-2 group-hover:animate-bounce">13+</div>
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Years Experience</div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="group bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 backdrop-blur-sm animate-fade-in" style={{animationDelay: '0.1s'}}>
                <div className="text-4xl font-black text-gradient mb-2 group-hover:animate-bounce">5L+</div>
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Students Trained</div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="group bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 backdrop-blur-sm animate-fade-in col-span-2 md:col-span-1" style={{animationDelay: '0.2s'}}>
                <div className="text-4xl font-black text-gradient mb-2 group-hover:animate-bounce">900+</div>
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Expert Faculties</div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Button size="lg" className="btn-primary group relative overflow-hidden shadow-2xl hover:shadow-glow">
                <span className="relative z-10 flex items-center font-bold text-lg">
                  Start Your Journey
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-orange-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-gradient-x"></div>
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary group relative border-2 border-primary/30 hover:border-primary/50 backdrop-blur-sm">
                <div className="flex items-center font-semibold text-lg">
                  <div className="mr-3 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Play className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
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

          {/* Premium Visual Experience */}
          <div className="hidden lg:block relative">
            <div className="relative animate-fade-in">
              {/* Main premium visual card */}
              <div className="w-full h-[500px] bg-gradient-to-br from-primary/30 via-orange-500/20 to-blue-500/10 rounded-[3rem] border-2 border-primary/40 backdrop-blur-xl overflow-hidden shadow-[0_20px_70px_-10px_rgba(0,0,0,0.3)] relative">
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)]"></div>
                
                {/* Dynamic floating achievement badges */}
                <div className="absolute top-8 left-8 bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-xl rounded-3xl p-6 border border-primary/30 animate-float shadow-glow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
                      <Award className="h-7 w-7 text-primary animate-glow" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-foreground">NSDC Certified</div>
                      <div className="text-sm text-muted-foreground font-medium">Government Partner</div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-8 right-8 bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-xl rounded-3xl p-6 border border-orange-500/30 animate-float-slower shadow-glow">
                  <div className="text-center">
                    <div className="text-3xl font-black text-gradient mb-2">900+</div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Expert Faculty</div>
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-xl rounded-3xl p-6 border border-blue-500/30 animate-float-slow shadow-glow">
                  <div className="text-center">
                    <div className="text-3xl font-black text-gradient mb-2">100%</div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Placement Rate</div>
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-xl rounded-3xl p-6 border border-primary/30 animate-float shadow-glow">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-foreground">Pan India</div>
                      <div className="text-sm text-muted-foreground font-medium">Presence</div>
                    </div>
                  </div>
                </div>

                {/* Center premium content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6 animate-glow">
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-br from-primary/30 to-orange-500/30 rounded-full flex items-center justify-center mx-auto animate-spin-slow border-4 border-primary/20">
                        <div className="w-20 h-20 bg-background/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <BookOpen className="h-12 w-12 text-primary animate-pulse" />
                        </div>
                      </div>
                      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-full blur-xl opacity-60 animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-black text-foreground">Excellence in Education</h3>
                      <p className="text-muted-foreground font-medium text-lg">Transforming Lives Through Skills</p>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced background glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/30 via-orange-500/30 to-blue-500/20 rounded-[4rem] blur-3xl opacity-40 animate-gradient-x"></div>
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-[3.5rem] blur-xl opacity-60 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Floating Elements */}
      <div className="absolute top-20 right-20 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-float opacity-60"></div>
      <div className="absolute bottom-32 left-16 w-40 h-40 bg-orange-500/15 rounded-full blur-3xl animate-float-slower opacity-40"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-float-slow opacity-50"></div>
      <div className="absolute bottom-1/4 right-1/3 w-28 h-28 bg-primary/10 rounded-full blur-2xl animate-float opacity-30"></div>
    </section>
  );
};

export default Hero;