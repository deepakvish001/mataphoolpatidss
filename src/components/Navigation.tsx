import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, ArrowRight, Sparkles, Globe, Users, Award, BookOpen, MessageSquare, Download, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', href: '#home', icon: Globe },
    { name: 'About', href: '#about', icon: Users },
    { name: 'Programs', href: '#training', icon: BookOpen },
    { name: 'Partners', href: '#affiliates', icon: Award },
    { name: 'Contact', href: '#work-with-us', icon: MessageSquare },
  ];

  // Enhanced scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'training', 'affiliates', 'work-with-us'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section.replace('#', ''));
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Modern Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-xl shadow-2xl shadow-black/10 border-b border-primary/20' 
          : 'bg-transparent'
      }`}>
        
        {/* Top announcement bar */}
        {!isScrolled && (
          <div className="bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground py-2 px-4 slide-up">
            <div className="container-custom">
              <div className="flex items-center justify-center text-sm font-medium">
                <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                <span>🎉 New Batch Starting Soon - Limited Seats Available!</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          </div>
        )}

        {/* Main navigation */}
        <nav className="px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section - Completely New Design */}
            <div className="flex items-center space-x-4 group cursor-pointer">
              <div className="relative">
                {/* Main logo container */}
                <div className="w-12 h-12 bg-gradient-to-br from-primary via-orange-500 to-red-500 rounded-2xl p-[2px] group-hover:scale-110 transition-all duration-500">
                  <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center">
                    <span className="text-primary font-bold text-xl">M</span>
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-orange-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
              </div>
              
              <div className="hidden md:block">
                <h1 className="text-lg font-bold text-foreground leading-tight tracking-tight">
                  <span className="text-primary">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span>
                </h1>
                <p className="text-xs text-muted-foreground font-medium tracking-wide mt-1">
                  Excellence in Skill Development Since 2013
                </p>
              </div>
            </div>

            {/* Center Navigation - Modern Pills Design */}
            <div className="hidden lg:flex items-center space-x-2 bg-muted/30 backdrop-blur-xl rounded-full px-2 py-2 border border-border/50">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`nav-link-modern flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 magnetic-effect ${
                      isActive 
                        ? 'bg-primary text-primary-foreground shadow-lg' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Right Actions - Premium Design */}
            <div className="flex items-center space-x-4">
              
              {/* Search */}
              <div className="hidden md:flex items-center space-x-3">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    placeholder="Search courses..."
                    className="pl-10 w-48 bg-muted/30 border-border/50 focus:border-primary/50 rounded-full glass-effect"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="hidden lg:flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="morphing-button rounded-full px-6 hover:bg-muted/50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Brochure
                </Button>
                
                <Button 
                  size="sm" 
                  className="morphing-button bg-gradient-to-r from-primary to-orange-500 hover:from-orange-500 hover:to-primary text-primary-foreground rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative rounded-full w-10 h-10 p-0 hidden md:flex">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></span>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 p-0 rounded-full hover:bg-muted/50"
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute block w-6 h-0.5 bg-foreground transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                  <span className={`absolute block w-6 h-0.5 bg-foreground transform transition-all duration-300 top-3 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`absolute block w-6 h-0.5 bg-foreground transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
                </div>
              </Button>
            </div>
          </div>
        </nav>

        {/* Modern Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-2xl fade-in-scale">
            <div className="px-6 py-8 space-y-8">
              
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Search courses, programs..."
                  className="pl-12 h-12 bg-muted/30 border-border/50 rounded-2xl glass-effect text-lg"
                />
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-2xl border border-primary/20">
                  <div className="text-2xl font-bold text-primary">13+</div>
                  <div className="text-xs text-muted-foreground">Years</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-2xl border border-primary/20">
                  <div className="text-2xl font-bold text-primary">5L+</div>
                  <div className="text-xs text-muted-foreground">Students</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-2xl border border-primary/20">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-xs text-muted-foreground">Placement</div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-muted/50 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">{item.name}</span>
                      <ArrowRight className="h-5 w-5 ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </a>
                  );
                })}
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl border border-border/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">+91 7007989716</div>
                      <div className="text-sm text-muted-foreground">24/7 Support</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl border border-border/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">info.mpdss@gmail.com</div>
                      <div className="text-sm text-muted-foreground">Quick Response</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full h-14 text-lg rounded-2xl border-2 border-primary/30 hover:bg-primary/10"
                >
                  <Download className="h-5 w-5 mr-3" />
                  Download Brochure
                </Button>
                
                <Button 
                  className="w-full h-14 text-lg bg-gradient-to-r from-primary to-orange-500 hover:from-orange-500 hover:to-primary rounded-2xl shadow-lg"
                >
                  <MessageSquare className="h-5 w-5 mr-3" />
                  Start Your Journey
                  <ArrowRight className="h-5 w-5 ml-3" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Dynamic Spacer */}
      <div className={`${isScrolled ? 'h-20' : 'h-32'} transition-all duration-700 ease-out`}></div>
    </>
  );
};

export default Navigation;