import { ArrowRight, Play, Award, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[100vh] max-h-screen flex items-center overflow-hidden">
      {/* Ultra Premium Background System */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-primary/8"></div>
        <img 
          src={heroImage} 
          alt="JITM Skills Training Excellence Center" 
          className="w-full h-full object-cover opacity-[0.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/3"></div>
      </div>

      {/* Sophisticated Ambient Elements */}
      <div className="absolute inset-0 z-[1] overflow-hidden">
        <div className="absolute top-32 left-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px] opacity-70"></div>
        <div className="absolute bottom-40 right-1/3 w-[400px] h-[400px] bg-orange-500/4 rounded-full blur-[80px] opacity-80"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-primary/2 to-blue-500/2 rounded-full blur-[120px] opacity-50"></div>
      </div>

      {/* Hero Content Container */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center max-w-[1400px] mx-auto">
          
          {/* Premium Content Section - 7 columns */}
          <div className="lg:col-span-7 space-y-8 lg:space-y-12">
            
            {/* Elite Badge */}
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-primary/15 via-orange-500/12 to-primary/10 border-2 border-primary/25 rounded-full px-8 py-4 backdrop-blur-xl shadow-xl">
              <div className="relative">
                <Award className="h-6 w-6 text-primary" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full opacity-60"></div>
              </div>
              <span className="text-primary font-black tracking-wider text-base">GOVERNMENT CERTIFIED TRAINING PARTNER</span>
              <div className="w-2.5 h-2.5 bg-gradient-to-r from-primary to-orange-500 rounded-full"></div>
            </div>
            
            {/* Ultra Premium Headline */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight">
                <span className="bg-gradient-to-r from-primary via-orange-500 via-primary to-blue-600 bg-clip-text text-transparent">
                  EMPOWERING
                </span>
                <br />
                <span className="text-foreground drop-shadow-sm">WITH ABILITY</span>
              </h1>
              
              {/* Enhanced Subheadline */}
              <div className="space-y-6 max-w-3xl">
                <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground leading-relaxed font-semibold">
                  Pioneer in the field of{' '}
                  <span className="text-primary font-black bg-gradient-to-r from-primary/20 to-orange-500/20 px-4 py-2 rounded-xl border border-primary/20">
                    Skill Training
                  </span>{' '}
                  with{' '}
                  <span className="text-primary font-black bg-primary/10 px-4 py-2 rounded-xl border border-primary/20">
                    13+ years of excellence
                  </span>
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed font-medium">
                  We have successfully trained over{' '}
                  <span className="text-primary font-black text-2xl lg:text-3xl bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                    5 lakh students
                  </span>{' '}
                  across India with{' '}
                  <span className="text-primary font-black bg-gradient-to-r from-primary/15 to-orange-500/15 px-3 py-1 rounded-lg border border-primary/20">
                    100% placement assistance
                  </span>
                </p>
              </div>
            </div>

            {/* Premium Statistics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-4">
              <div className="group relative bg-gradient-to-br from-primary/12 via-primary/8 to-transparent border-2 border-primary/25 rounded-3xl p-6 lg:p-8 text-center backdrop-blur-xl shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="text-4xl lg:text-5xl xl:text-6xl font-black text-primary mb-3">13+</div>
                  <div className="text-sm lg:text-base font-bold text-muted-foreground uppercase tracking-wider">Years Excellence</div>
                </div>
              </div>
              
              <div className="group relative bg-gradient-to-br from-orange-500/12 via-orange-500/8 to-transparent border-2 border-orange-500/25 rounded-3xl p-6 lg:p-8 text-center backdrop-blur-xl shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="text-4xl lg:text-5xl xl:text-6xl font-black text-orange-500 mb-3">5L+</div>
                  <div className="text-sm lg:text-base font-bold text-muted-foreground uppercase tracking-wider">Students Trained</div>
                </div>
              </div>
              
              <div className="group relative bg-gradient-to-br from-blue-500/12 via-blue-500/8 to-transparent border-2 border-blue-500/25 rounded-3xl p-6 lg:p-8 text-center backdrop-blur-xl shadow-xl col-span-2 lg:col-span-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="text-4xl lg:text-5xl xl:text-6xl font-black text-blue-500 mb-3">900+</div>
                  <div className="text-sm lg:text-base font-bold text-muted-foreground uppercase tracking-wider">Expert Faculty</div>
                </div>
              </div>
            </div>

            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 pt-6">
              <Button 
                size="lg" 
                className="group relative bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-black text-xl px-10 py-6 h-auto rounded-2xl shadow-2xl border-2 border-primary/20"
              >
                <span className="flex items-center">
                  Start Your Journey
                  <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="group relative border-3 border-primary/40 hover:border-primary/60 backdrop-blur-xl font-bold text-xl px-10 py-6 h-auto rounded-2xl shadow-xl bg-background/50 hover:bg-background/70"
              >
                <div className="flex items-center">
                  <div className="mr-4 w-12 h-12 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-full flex items-center justify-center group-hover:from-primary/30 group-hover:to-orange-500/30 transition-all duration-300 border border-primary/20">
                    <Play className="h-6 w-6 text-primary" />
                  </div>
                  Watch Our Story
                </div>
              </Button>
            </div>

            {/* Elite Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 lg:gap-12 pt-12 border-t-2 border-gradient-to-r from-transparent via-border/30 to-transparent">
              <div className="flex items-center gap-3 text-base font-semibold text-muted-foreground">
                <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-lg flex items-center justify-center border border-primary/20">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <span>NSDC Training Partner</span>
              </div>
              <div className="flex items-center gap-3 text-base font-semibold text-muted-foreground">
                <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-lg flex items-center justify-center border border-primary/20">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <span>Pan India Presence</span>
              </div>
              <div className="flex items-center gap-3 text-base font-semibold text-muted-foreground">
                <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-lg flex items-center justify-center border border-primary/20">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <span>Government Recognized</span>
              </div>
            </div>
          </div>

          {/* Ultra Premium Visual Section - 5 columns */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <div className="relative max-w-[600px] mx-auto">
              
              {/* Main Achievement Showcase */}
              <div className="relative aspect-square bg-gradient-to-br from-primary/10 via-orange-500/8 via-blue-500/6 to-primary/5 rounded-[3rem] border-3 border-primary/20 backdrop-blur-xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.12)] p-8">
                
                {/* Elegant Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent"></div>
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl"></div>
                </div>
                
                {/* Premium Achievement Cards */}
                <div className="absolute top-8 left-8 bg-background/95 backdrop-blur-2xl rounded-3xl p-6 border-2 border-primary/20 shadow-2xl max-w-[200px]">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-2xl flex items-center justify-center border border-primary/30">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-lg font-black text-foreground">NSDC Certified</div>
                      <div className="text-sm text-muted-foreground font-semibold">Government Partner</div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-8 right-8 bg-background/95 backdrop-blur-2xl rounded-3xl p-6 border-2 border-orange-500/20 shadow-2xl">
                  <div className="text-center">
                    <div className="text-3xl font-black text-orange-500 mb-2">900+</div>
                    <div className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Expert Faculty</div>
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 bg-background/95 backdrop-blur-2xl rounded-3xl p-6 border-2 border-blue-500/20 shadow-2xl">
                  <div className="text-center">
                    <div className="text-3xl font-black text-blue-500 mb-2">100%</div>
                    <div className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Placement Rate</div>
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 bg-background/95 backdrop-blur-2xl rounded-3xl p-6 border-2 border-primary/20 shadow-2xl max-w-[180px]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-primary/20">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-base font-black text-foreground">Pan India</div>
                      <div className="text-sm text-muted-foreground font-semibold">Presence</div>
                    </div>
                  </div>
                </div>

                {/* Central Excellence Symbol */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-br from-primary/15 via-orange-500/12 to-blue-500/10 rounded-full flex items-center justify-center mx-auto border-3 border-primary/30 shadow-2xl">
                        <div className="w-24 h-24 bg-background/90 rounded-full flex items-center justify-center backdrop-blur-xl border border-primary/20">
                          <BookOpen className="h-12 w-12 text-primary" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-black text-foreground">Excellence in Education</h3>
                      <p className="text-muted-foreground font-bold text-lg">Transforming Lives Through Skills</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sophisticated Ambient Glow */}
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/8 via-orange-500/6 to-blue-500/8 rounded-[4rem] blur-3xl opacity-70"></div>
              <div className="absolute -inset-12 bg-gradient-to-br from-primary/4 to-orange-500/4 rounded-[5rem] blur-[100px] opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;