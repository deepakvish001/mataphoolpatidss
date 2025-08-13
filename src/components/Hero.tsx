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
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[size:40px_40px] opacity-20"></div>
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-10">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-primary/15 via-orange-500/15 to-primary/15 border-2 border-primary/30 rounded-full px-8 py-4 text-base backdrop-blur-sm shadow-xl">
                <Award className="h-6 w-6 text-primary" />
                <span className="text-primary font-black tracking-wide">Government Certified Training Partner</span>
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
              
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-tight tracking-tight">
                <span className="text-gradient-enhanced bg-clip-text text-transparent bg-gradient-to-r from-primary via-orange-500 to-red-500">EMPOWERING</span>
                <br />
                <span className="text-foreground drop-shadow-sm">WITH ABILITY</span>
              </h1>
              
              <div className="space-y-6">
                <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed max-w-3xl font-bold">
                  Pioneer in the field of <span className="text-gradient-enhanced bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500 font-black">Skill Training</span> with <span className="text-primary font-black bg-gradient-to-r from-primary/20 to-orange-500/20 px-4 py-2 rounded-2xl border border-primary/30">13+ years of experience</span>. 
                </p>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                  We have trained over <span className="text-primary font-black text-3xl">5 lakh students</span> across India with 
                  <span className="text-gradient-enhanced bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500 font-black"> 100% placement assistance</span>.
                </p>
              </div>
            </div>

            {/* Ultra-Premium Stats with Enhanced Design */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="group relative bg-gradient-to-br from-primary/15 via-primary/10 to-transparent border-2 border-primary/30 rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="text-6xl font-black text-gradient-enhanced bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500 mb-3">13+</div>
                  <div className="text-base font-bold text-muted-foreground uppercase tracking-wide">Years Experience</div>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-primary/30 rounded-tr-2xl"></div>
              </div>
              <div className="group relative bg-gradient-to-br from-orange-500/15 via-orange-500/10 to-transparent border-2 border-orange-500/30 rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="text-6xl font-black text-gradient-enhanced bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500 mb-3">5L+</div>
                  <div className="text-base font-bold text-muted-foreground uppercase tracking-wide">Students Trained</div>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-orange-500/30 rounded-tr-2xl"></div>
              </div>
              <div className="group relative bg-gradient-to-br from-blue-500/15 via-blue-500/10 to-transparent border-2 border-blue-500/30 rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 backdrop-blur-sm col-span-2 md:col-span-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="text-6xl font-black text-gradient-enhanced bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-3">900+</div>
                  <div className="text-base font-bold text-muted-foreground uppercase tracking-wide">Expert Faculties</div>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-blue-500/30 rounded-tr-2xl"></div>
              </div>
            </div>

            {/* Ultra-Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-8">
              <Button size="lg" className="btn-primary group relative overflow-hidden shadow-2xl hover:shadow-glow h-16 px-10 text-xl font-black rounded-2xl">
                <span className="relative z-10 flex items-center">
                  Start Your Journey
                  <ArrowRight className="ml-4 h-7 w-7 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              <Button size="lg" variant="outline" className="btn-secondary group relative border-3 border-primary/40 hover:border-primary/60 backdrop-blur-sm h-16 px-8 text-xl font-bold rounded-2xl">
                <div className="flex items-center">
                  <div className="mr-4 w-14 h-14 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-2xl flex items-center justify-center group-hover:bg-primary/30 transition-colors border border-primary/30">
                    <Play className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  Watch Our Story
                </div>
              </Button>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-10 border-t-2 border-primary/20">
              <div className="flex items-center space-x-3 text-base text-muted-foreground font-bold">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <span>NSDC Training Partner</span>
              </div>
              <div className="flex items-center space-x-3 text-base text-muted-foreground font-bold">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <span>Pan India Presence</span>
              </div>
              <div className="flex items-center space-x-3 text-base text-muted-foreground font-bold">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-blue-500" />
                </div>
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