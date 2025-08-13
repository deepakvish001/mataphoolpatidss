import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, ArrowRight, Sparkles, Globe, Users, Award, BookOpen, MessageSquare, Download, Search, Bell, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showProgramsDropdown, setShowProgramsDropdown] = useState(false);
  const [dropdownTimeoutId, setDropdownTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const navItems = [
    { name: 'Home', href: '/', icon: Globe },
    { name: 'About', href: '/about', icon: Users },
    { name: 'Programs', href: '#training', icon: BookOpen, hasDropdown: true },
    { name: 'Partners', href: '/partners', icon: Award },
    { name: 'Contact', href: '/contact', icon: MessageSquare },
  ];

  const programsDropdownItems = [
    { name: 'Rashtiya Gram Swaraj Abhiyan', href: '/rashtiya-gram-swaraj-abhiyan' },
    { name: 'NSQF', href: '/nsqf' },
    { name: 'AAIOE', href: '/aaioe' },
    { name: 'Entrepreneurship', href: '/entrepreneurship-development' },
  ];

  // Handle dropdown hover with delay
  const handleDropdownEnter = () => {
    if (dropdownTimeoutId) {
      clearTimeout(dropdownTimeoutId);
      setDropdownTimeoutId(null);
    }
    setShowProgramsDropdown(true);
  };

  const handleDropdownLeave = () => {
    const timeoutId = setTimeout(() => {
      setShowProgramsDropdown(false);
    }, 200); // 200ms delay before hiding
    setDropdownTimeoutId(timeoutId);
  };

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
      {/* Ultra-Modern Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-2xl shadow-2xl shadow-primary/10 border-b-2 border-primary/20' 
          : 'bg-transparent'
      }`}>
        
        {/* Enhanced Top announcement bar */}
        {!isScrolled && (
          <div className="bg-gradient-to-r from-primary via-orange-500 to-primary text-primary-foreground py-3 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(255,255,255,0.1)_50%,transparent_60%)]"></div>
            <div className="container-custom relative z-10">
              <div className="flex items-center justify-center text-sm font-bold">
                <Sparkles className="h-5 w-5 mr-3" />
                <span className="text-lg">🎉 New Batch Starting Soon - Limited Seats Available! Apply Now!</span>
                <ArrowRight className="h-5 w-5 ml-3" />
              </div>
            </div>
          </div>
        )}

        {/* Ultra-Modern Main navigation */}
        <nav className="px-4 lg:px-8">
          <div className="flex items-center justify-between h-24">
            
            {/* Premium Logo Section - Enhanced Design */}
            <div className="flex items-center space-x-4 group cursor-pointer">
              <div className="relative">
                {/* Enhanced logo container with multiple layers */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary via-orange-500 to-red-500 rounded-3xl p-[3px] group-hover:scale-110 transition-all duration-500 shadow-xl">
                  <div className="w-full h-full bg-background rounded-3xl flex items-center justify-center relative overflow-hidden">
                    <span className="text-primary font-black text-2xl relative z-10">M</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-3xl"></div>
                  </div>
                </div>
                {/* Enhanced glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-primary via-orange-500 to-red-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-orange-500/50 rounded-3xl blur-md opacity-20"></div>
              </div>
              
              <div className="hidden md:block">
                <h1 className="text-xl font-black leading-tight tracking-tight">
                  <span className="text-gradient-enhanced bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">MATA PHOOLPATI DEVI</span>
                  <br />
                  <span className="text-gradient-enhanced bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500">SHIKSHAN SANSTHAN</span>
                </h1>
                <p className="text-xs text-primary font-bold bg-primary/10 px-2 py-1 rounded-full mt-1 inline-block">Skill Development Excellence</p>
              </div>
            </div>

            {/* Ultra-Modern Center Navigation - Enhanced Pills Design */}
            <div className="hidden lg:flex items-center space-x-3 bg-gradient-to-r from-muted/40 via-muted/30 to-muted/40 backdrop-blur-2xl rounded-full px-3 py-3 border-2 border-primary/20 shadow-xl">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.replace('#', '');
                
                if (item.hasDropdown) {
                  return (
                    <div 
                      key={item.name}
                      className="relative"
                      onMouseEnter={handleDropdownEnter}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <button
                        className={`nav-link-modern flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 magnetic-effect font-bold ${
                          isActive 
                            ? 'bg-gradient-to-r from-primary to-orange-500 text-primary-foreground shadow-xl shadow-primary/30' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-background/80 hover:to-background/60 hover:shadow-lg'
                        }`}
                        onClick={() => setShowProgramsDropdown(!showProgramsDropdown)}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-bold">{item.name}</span>
                        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${showProgramsDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {showProgramsDropdown && (
                        <div 
                          className="absolute top-full left-0 mt-3 w-72 bg-background/98 backdrop-blur-2xl border-2 border-primary/30 rounded-3xl shadow-2xl z-[100] p-4 overflow-hidden"
                          onMouseEnter={handleDropdownEnter}
                          onMouseLeave={handleDropdownLeave}
                        >
                          {programsDropdownItems.map((dropdownItem, index) => (
                            <a
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="flex items-center px-5 py-4 rounded-2xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-orange-500/10 transition-all duration-300 group block border border-transparent hover:border-primary/20"
                              style={{ animationDelay: `${index * 0.1}s` }}
                              onClick={() => setShowProgramsDropdown(false)}
                            >
                              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform">
                                <BookOpen className="h-5 w-5 text-primary" />
                              </div>
                              <span className="font-bold text-foreground group-hover:text-primary text-base">{dropdownItem.name}</span>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`nav-link-modern flex items-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 magnetic-effect font-bold ${
                      isActive 
                        ? 'bg-gradient-to-r from-primary to-orange-500 text-primary-foreground shadow-xl shadow-primary/30' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-gradient-to-r hover:from-background/80 hover:to-background/60 hover:shadow-lg'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-bold">{item.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Enhanced Right Actions */}
            <div className="flex items-center space-x-6">
              
              {/* Enhanced Search */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    placeholder="Search courses..."
                    className="pl-12 w-56 h-12 bg-gradient-to-r from-muted/40 to-muted/30 border-2 border-primary/20 focus:border-primary/50 rounded-2xl glass-effect font-medium text-base"
                  />
                </div>
              </div>

              {/* Enhanced Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-12 h-12 p-0 rounded-2xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-orange-500/10 border border-primary/20 transition-all duration-300"
              >
                <div className="relative w-7 h-7">
                  <span className={`absolute block w-7 h-1 bg-primary rounded-full transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}></span>
                  <span className={`absolute block w-7 h-1 bg-primary rounded-full transform transition-all duration-300 top-3 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`absolute block w-7 h-1 bg-primary rounded-full transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}></span>
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
                  
                  if (item.hasDropdown) {
                    return (
                      <div key={item.name} className="space-y-2">
                        <div
                          className="flex items-center space-x-4 p-4 rounded-2xl bg-muted/30 border border-border/50"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <span className="text-lg font-medium text-foreground">{item.name}</span>
                        </div>
                        
                        {/* Mobile Dropdown Items */}
                        <div className="ml-6 space-y-1">
                          {programsDropdownItems.map((dropdownItem, dropdownIndex) => (
                            <a
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/50 transition-all duration-300 group"
                              style={{ animationDelay: `${(index + dropdownIndex + 1) * 0.1}s` }}
                            >
                              <BookOpen className="h-4 w-4 text-primary" />
                              <span className="text-base font-medium text-muted-foreground group-hover:text-primary transition-colors">{dropdownItem.name}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  
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
                      <div className="text-sm text-muted-foreground">Primary Contact</div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl border border-border/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">+91 9004362661</div>
                      <div className="text-sm text-muted-foreground">Secondary Contact</div>
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
                      <div className="text-sm text-muted-foreground">Email Support</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons - Simplified */}
              <div className="space-y-4">
                <Button 
                  className="w-full h-14 text-lg bg-gradient-to-r from-primary to-orange-500 hover:from-orange-500 hover:to-primary rounded-2xl shadow-lg"
                >
                  <MessageSquare className="h-5 w-5 mr-3" />
                  Contact Us
                  <ArrowRight className="h-5 w-5 ml-3" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Enhanced Dynamic Spacer */}
      <div className={`${isScrolled ? 'h-24' : 'h-40'} transition-all duration-700 ease-out`}></div>
    </>
  );
};

export default Navigation;