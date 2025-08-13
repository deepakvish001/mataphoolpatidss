import { ArrowRight, Play, Award, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-background/95 to-primary/5 overflow-hidden">
      {/* Ultra Premium Background System */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN - Excellence in Education" 
          className="w-full h-full object-cover opacity-8"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-primary/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,background_70%)]"></div>
      </div>

      {/* Minimal Floating Elements */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-500/2 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-blue-500/2 rounded-full blur-2xl"></div>
      </div>

      <div className="container-custom relative z-10 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Ultra Premium Content */}
          <div className="space-y-10">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/15 to-orange-500/15 border border-primary/25 rounded-full px-6 py-3 text-sm backdrop-blur-sm">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-primary font-bold tracking-wide">Government Certified Training Partner</span>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
                <span className="bg-gradient-to-br from-foreground via-primary to-orange-500 bg-clip-text text-transparent">EMPOWERING</span>
                <br />
                <span className="text-foreground">FUTURES</span>
                <br />
                <span className="text-lg md:text-xl lg:text-2xl font-medium text-muted-foreground tracking-normal">
                  through excellence in education
                </span>
              </h1>
              
              <div className="space-y-6 max-w-2xl">
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                  Pioneer in <span className="text-foreground font-semibold">Skill Training</span> with 
                  <span className="text-primary font-bold"> 13+ years of experience</span>, transforming lives across India.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Over <span className="text-primary font-bold text-xl">5 lakh students</span> trained with 
                  <span className="text-foreground font-semibold"> 100% placement assistance</span> guarantee.
                </p>
              </div>
            </div>

            {/* Ultra Premium Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="group bg-gradient-to-br from-primary/5 via-primary/3 to-transparent border border-primary/15 rounded-3xl p-8 text-center backdrop-blur-sm hover:border-primary/25 transition-all duration-500">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-primary to-orange-500 bg-clip-text text-transparent mb-3">13+</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Years Excellence</div>
              </div>
              <div className="group bg-gradient-to-br from-orange-500/5 via-orange-500/3 to-transparent border border-orange-500/15 rounded-3xl p-8 text-center backdrop-blur-sm hover:border-orange-500/25 transition-all duration-500">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-orange-500 to-red-500 bg-clip-text text-transparent mb-3">5L+</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Lives Transformed</div>
              </div>
              <div className="group bg-gradient-to-br from-blue-500/5 via-blue-500/3 to-transparent border border-blue-500/15 rounded-3xl p-8 text-center backdrop-blur-sm hover:border-blue-500/25 transition-all duration-500 col-span-2 md:col-span-1">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-3">900+</div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Expert Faculty</div>
              </div>
            </div>

            {/* Ultra Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Button size="lg" className="h-16 px-8 text-lg font-semibold bg-gradient-to-r from-primary via-orange-500 to-primary rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group border-0">
                <span className="flex items-center">
                  Start Your Journey Today
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-8 text-lg font-semibold border-2 border-primary/20 rounded-2xl backdrop-blur-sm hover:border-primary/40 hover:bg-primary/5 transition-all duration-500 group">
                <div className="flex items-center">
                  <div className="mr-3 w-10 h-10 bg-primary/15 rounded-full flex items-center justify-center group-hover:bg-primary/25 transition-colors">
                    <Play className="h-5 w-5 text-primary" />
                  </div>
                  Watch Our Story
                </div>
              </Button>
            </div>

            {/* Premium Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-10 border-t border-border/30">
              <div className="flex items-center space-x-3 text-muted-foreground group">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">NSDC Training Partner</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground group">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">Pan India Presence</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground group">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">Government Recognized</span>
              </div>
            </div>
          </div>

          {/* Ultra Premium Visual Experience */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Main ultra premium visual card */}
              <div className="w-full h-[600px] bg-gradient-to-br from-primary/10 via-orange-500/8 to-blue-500/6 rounded-[4rem] border border-primary/20 backdrop-blur-xl overflow-hidden shadow-[0_25px_80px_-15px_rgba(0,0,0,0.1)] relative">
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20"></div>
                
                {/* Floating achievement elements - minimal design */}
                <div className="absolute top-8 left-8 bg-background/90 backdrop-blur-xl rounded-3xl p-6 border border-primary/20 shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/15 rounded-2xl flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-foreground">NSDC Certified</div>
                      <div className="text-sm text-muted-foreground font-medium">Government Partner</div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-8 right-8 bg-background/90 backdrop-blur-xl rounded-3xl p-6 border border-orange-500/20 shadow-lg">
                  <div className="text-center">
                    <div className="text-3xl font-black bg-gradient-to-br from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">900+</div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Expert Faculty</div>
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 bg-background/90 backdrop-blur-xl rounded-3xl p-6 border border-blue-500/20 shadow-lg">
                  <div className="text-center">
                    <div className="text-3xl font-black bg-gradient-to-br from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-2">100%</div>
                    <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Placement Rate</div>
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 bg-background/90 backdrop-blur-xl rounded-3xl p-6 border border-primary/20 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-foreground">Pan India</div>
                      <div className="text-sm text-muted-foreground font-medium">Presence</div>
                    </div>
                  </div>
                </div>

                {/* Center premium content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto border-4 border-primary/10">
                        <div className="w-20 h-20 bg-background/95 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <BookOpen className="h-10 w-10 text-primary" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-black text-foreground">Excellence in Education</h3>
                      <p className="text-muted-foreground font-medium text-lg">Transforming Lives Through Skills</p>
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Subtle background effects */}
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-orange-500/15 to-blue-500/15 rounded-[5rem] blur-3xl opacity-30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Floating Elements */}
      <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-primary/8 rounded-full blur-2xl opacity-40"></div>
      <div className="absolute bottom-1/3 left-1/5 w-32 h-32 bg-orange-500/6 rounded-full blur-3xl opacity-30"></div>
    </section>
  );
};

export default Hero;