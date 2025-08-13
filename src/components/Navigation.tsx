import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Download, MessageCircle, Star, Award, Users, Clock, Shield, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const navItems = [
    { name: 'Home', href: '#home', description: 'Welcome & Overview' },
    { name: 'About Us', href: '#about', description: 'Our Story & Mission' },
    { name: 'Training', href: '#training', description: 'Courses & Programs' },
    { name: 'Our Affiliates', href: '#affiliates', description: 'Partners & Recognition' },
    { name: 'Work With Us', href: '#work-with-us', description: 'Contact & Enquiry' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
  };

  return (
    <>
      {/* Enhanced Top Contact Bar */}
      <div className="bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground py-3 px-4 hidden md:block relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 nav-shimmer opacity-20"></div>
        
        <div className="container-custom relative z-10">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 group hover:scale-105 transition-transform duration-300">
                <div className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold">+91 7007989716</div>
                  <div className="text-xs opacity-80">24/7 Support Available</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 group hover:scale-105 transition-transform duration-300">
                <div className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold">info.mpdss@gmail.com</div>
                  <div className="text-xs opacity-80">Quick Response Guaranteed</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 group hover:scale-105 transition-transform duration-300">
                <div className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold">Noida | Ballia</div>
                  <div className="text-xs opacity-80">Multiple Locations</div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 floating-badge">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">Government Certified</span>
                </div>
                <div className="w-px h-6 bg-primary-foreground/30"></div>
                <div className="flex items-center space-x-2 floating-badge">
                  <Award className="h-4 w-4" />
                  <span className="font-medium">100% Placement</span>
                </div>
                <div className="w-px h-6 bg-primary-foreground/30"></div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span className="font-medium">IST {formatTime(currentTime)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/98 backdrop-blur-xl border-b border-border shadow-2xl shadow-primary/5' 
          : 'bg-background/85 backdrop-blur-lg border-b border-border/30'
      } ${!isScrolled ? 'md:top-16' : ''}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-24">
            {/* Premium Logo Section */}
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 logo-pulse">
                  <div className="w-10 h-10 bg-primary-foreground rounded-xl flex items-center justify-center shadow-inner">
                    <span className="text-primary font-bold text-xl">M</span>
                  </div>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
              </div>
              
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-foreground leading-tight tracking-tight">
                  <span className="text-gradient">MATA PHOOLPATI DEVI</span>
                  <br />
                  <span className="text-xl text-primary font-extrabold">SHIKSHAN SANSTHAN</span>
                </h1>
                <div className="flex items-center space-x-3 mt-1">
                  <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
                    Excellence in Skill Development
                  </p>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current text-yellow-400" />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <div key={item.name} className="relative group">
                  <a
                    href={item.href}
                    className="flex flex-col items-center py-3 px-4 rounded-xl transition-all duration-300 hover:bg-muted/50 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </span>
                    <span className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors">
                      {item.description}
                    </span>
                  </a>
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary to-primary/60 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              ))}
            </div>

            {/* Enhanced Desktop CTA Section */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Quick Stats with Animation */}
              <div className="flex items-center space-x-4 bg-muted/30 rounded-xl px-4 py-2 border border-border/50">
                <div className="text-center group hover:scale-110 transition-transform duration-300">
                  <div className="text-primary font-bold text-lg">13+</div>
                  <div className="text-xs text-muted-foreground">Years</div>
                </div>
                <div className="w-px h-8 bg-border"></div>
                <div className="text-center group hover:scale-110 transition-transform duration-300">
                  <div className="text-primary font-bold text-lg">5L+</div>
                  <div className="text-xs text-muted-foreground">Trained</div>
                </div>
                <div className="w-px h-8 bg-border"></div>
                <div className="text-center group hover:scale-110 transition-transform duration-300">
                  <div className="text-primary font-bold text-lg">900+</div>
                  <div className="text-xs text-muted-foreground">Faculty</div>
                </div>
              </div>
              
              {/* Enhanced Action Buttons */}
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="lg" className="btn-ghost group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Brochure
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-muted to-muted/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Button>
                
                <Button size="lg" className="btn-primary group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <span className="relative z-10 flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Enquire Now
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>
            </div>

            {/* Enhanced Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 hover:bg-muted rounded-xl relative group"
              >
                <div className="relative">
                  {isMenuOpen ? (
                    <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
                  ) : (
                    <Menu className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                  )}
                </div>
              </Button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-b border-border shadow-2xl nav-slide-down">
              <div className="px-6 py-8 space-y-8">
                {/* Mobile Contact Info with Enhanced Design */}
                <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl p-6 space-y-4 border border-border/50">
                  <h3 className="font-semibold text-foreground text-lg mb-4">Quick Contact</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center space-x-3 group hover:bg-background/50 rounded-lg p-2 transition-colors">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">+91 7007989716</div>
                        <div className="text-xs text-muted-foreground">24/7 Support</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 group hover:bg-background/50 rounded-lg p-2 transition-colors">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">info.mpdss@gmail.com</div>
                        <div className="text-xs text-muted-foreground">Quick Response</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Mobile Nav Links */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground text-lg mb-4">Navigation</h3>
                  {navItems.map((item, index) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-between py-4 px-4 text-foreground hover:text-primary hover:bg-muted/50 rounded-xl transition-all duration-300 font-medium border border-transparent hover:border-primary/20 group"
                      onClick={() => setIsMenuOpen(false)}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.description}</div>
                      </div>
                      <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  ))}
                </div>

                {/* Enhanced Mobile Stats */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
                  <h3 className="font-semibold text-foreground text-lg mb-4 text-center">Our Achievements</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center group hover:scale-105 transition-transform duration-300">
                      <div className="text-primary font-bold text-2xl">13+</div>
                      <div className="text-xs text-muted-foreground">Years Experience</div>
                    </div>
                    <div className="text-center group hover:scale-105 transition-transform duration-300">
                      <div className="text-primary font-bold text-2xl">5L+</div>
                      <div className="text-xs text-muted-foreground">Students Trained</div>
                    </div>
                    <div className="text-center group hover:scale-105 transition-transform duration-300">
                      <div className="text-primary font-bold text-2xl">100%</div>
                      <div className="text-xs text-muted-foreground">Placement Help</div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Mobile CTA Buttons */}
                <div className="space-y-4">
                  <Button variant="outline" className="w-full btn-secondary group h-14 text-lg">
                    <Download className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Download Brochure
                  </Button>
                  <Button className="w-full btn-primary group h-14 text-lg relative overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center">
                      <MessageCircle className="mr-3 h-5 w-5" />
                      Contact Us Now
                      <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Spacer with smooth transition */}
      <div className={`${isScrolled ? 'h-24' : 'h-40'} md:h-40 transition-all duration-500 ease-out`}></div>
    </>
  );
};

export default Navigation;