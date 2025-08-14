import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, ArrowRight, Sparkles, Globe, Users, Award, BookOpen, MessageSquare, Download, Search, Bell, ChevronDown, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// Import payment logos
import visaLogo from '@/assets/visa-logo.png';
import mastercardLogo from '@/assets/mastercard-logo.png';
import maestroLogo from '@/assets/maestro-logo.png';
import discoverLogo from '@/assets/discover-logo.png';
import paypalLogo from '@/assets/paypal-logo.png';

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
    { name: 'Donate', href: '/donation', icon: Heart },
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
            
            {/* Logo Section - Updated with Actual Logo */}
            <a href="/" className="flex items-center space-x-4 group cursor-pointer">
              <div className="relative">
                {/* Logo container */}
                <div className="w-14 h-14 bg-background rounded-2xl p-1 group-hover:scale-110 transition-all duration-500 shadow-lg border border-primary/20">
                  <img 
                    src="/lovable-uploads/b43da45b-3faf-4247-a3f7-33e3821aae7b.png" 
                    alt="Mata Phoolpati Devi Shikshan Sansthan Logo" 
                    className="w-full h-full object-contain rounded-xl"
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-orange-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
              </div>
              
              <div className="hidden md:block">
                <h1 className="text-lg font-bold leading-tight tracking-tight">
                  <span className="text-foreground">MATA PHOOLPATI DEVI</span>
                  <br />
                  <span className="text-primary">SHIKSHAN SANSTHAN</span>
                </h1>
              </div>
            </a>

            {/* Center Navigation - Modern Pills Design */}
            <div className="hidden lg:flex items-center space-x-2 bg-muted/30 backdrop-blur-xl rounded-full px-2 py-2 border border-border/50">
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
                        className={`nav-link-modern flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 magnetic-effect ${
                          isActive 
                            ? 'bg-primary text-primary-foreground shadow-lg' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                        }`}
                        onClick={() => setShowProgramsDropdown(!showProgramsDropdown)}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="font-medium">{item.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showProgramsDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {showProgramsDropdown && (
                        <div 
                          className="absolute top-full left-0 mt-2 w-64 bg-background/98 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl z-[100] p-2 animate-fade-in"
                          onMouseEnter={handleDropdownEnter}
                          onMouseLeave={handleDropdownLeave}
                        >
                          {programsDropdownItems.map((dropdownItem, index) => (
                            <a
                              key={dropdownItem.name}
                              href={dropdownItem.href}
                              className="flex items-center px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors duration-200 group block"
                              style={{ animationDelay: `${index * 0.1}s` }}
                              onClick={() => setShowProgramsDropdown(false)}
                            >
                              <BookOpen className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                              <span className="font-medium text-foreground group-hover:text-primary text-sm">{dropdownItem.name}</span>
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
                    className={`nav-link-modern flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 magnetic-effect ${
                      item.name === 'Donate' 
                        ? 'nav-donate-blink bg-primary text-primary-foreground shadow-lg' 
                        : isActive 
                        ? 'bg-primary text-primary-foreground shadow-lg' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                    {item.name === 'Donate' && <span className="animate-pulse">💖</span>}
                  </a>
                );
              })}
            </div>

            {/* Right Actions - Simplified */}
            <div className="flex items-center space-x-4">
              
              {/* Payment Options */}
              <div className="hidden md:flex items-center space-x-3">
                <a 
                  href="/donation"
                  className="group relative flex items-center space-x-4 px-8 py-4 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border-2 border-gray-100 hover:border-primary/30"
                >
                  {/* Animated glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
                  
                  {/* Payment icons container */}
                  <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-xl">
                    <div className="text-xs font-semibold text-gray-600 whitespace-nowrap">SECURE PAYMENT</div>
                    <div className="flex items-center space-x-2">
                      {/* Actual Payment Logos */}
                      <img src={visaLogo} alt="Visa" className="h-6 w-auto object-contain" />
                      <img src={mastercardLogo} alt="MasterCard" className="h-6 w-auto object-contain" />
                      <img src={maestroLogo} alt="Maestro" className="h-6 w-auto object-contain" />
                      <img src={discoverLogo} alt="Discover" className="h-6 w-auto object-contain" />
                      <img src={paypalLogo} alt="PayPal" className="h-6 w-auto object-contain" />
                    </div>
                  </div>
                  
                  {/* Text with icon */}
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-lg text-gray-800 tracking-wide">PAY NOW</span>
                    <span className="text-xs text-gray-500">Multiple Options</span>
                  </div>
                  
                  {/* Arrow and sparkle */}
                  <div className="flex items-center">
                    <div className="text-primary text-xl">→</div>
                    <div className="text-yellow-400 animate-pulse ml-1">✨</div>
                  </div>
                </a>
              </div>

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
              
              {/* Mobile Payment Option */}
              <a 
                href="/donation"
                className="group relative flex flex-col items-center justify-center space-y-3 p-6 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 border-gray-100 hover:border-primary/30"
                onClick={() => setIsMenuOpen(false)}
              >
                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 rounded-3xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
                
                {/* Header */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 mb-1">SECURE PAYMENT</div>
                  <div className="text-sm text-gray-500">Multiple Payment Methods Available</div>
                </div>
                
                {/* Payment logos grid */}
                <div className="flex items-center justify-center space-x-3 bg-gray-50 p-4 rounded-xl">
                  <img src={visaLogo} alt="Visa" className="h-8 w-auto object-contain" />
                  <img src={mastercardLogo} alt="MasterCard" className="h-8 w-auto object-contain" />
                  <img src={maestroLogo} alt="Maestro" className="h-8 w-auto object-contain" />
                  <img src={discoverLogo} alt="Discover" className="h-8 w-auto object-contain" />
                  <img src={paypalLogo} alt="PayPal" className="h-8 w-auto object-contain" />
                </div>
                
                {/* CTA */}
                <div className="flex items-center space-x-2 text-primary font-semibold">
                  <span>TAP TO PAY</span>
                  <div className="text-xl">→</div>
                  <div className="text-yellow-400 animate-pulse">✨</div>
                </div>
              </a>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-2xl border border-primary/20">
                  <div className="text-2xl font-bold text-primary">5+</div>
                  <div className="text-xs text-muted-foreground">Years</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-2xl border border-primary/20">
                  <div className="text-2xl font-bold text-primary">25K+</div>
                  <div className="text-xs text-muted-foreground">Students</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-orange-500/10 rounded-2xl border border-primary/20">
                  <div className="text-2xl font-bold text-primary">100+</div>
                  <div className="text-xs text-muted-foreground">Faculties</div>
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
                      className={`flex items-center space-x-4 p-4 rounded-2xl hover:bg-muted/50 transition-all duration-300 group ${
                        item.name === 'Donate' ? 'nav-donate-blink' : ''
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors ${
                        item.name === 'Donate' ? 'bg-primary text-primary-foreground' : 'bg-primary/10'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={`text-lg font-medium transition-colors ${
                        item.name === 'Donate' ? 'text-primary' : 'text-foreground group-hover:text-primary'
                      }`}>
                        {item.name}
                        {item.name === 'Donate' && <span className="ml-2 animate-pulse">💖</span>}
                      </span>
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

      {/* Dynamic Spacer */}
      <div className={`${isScrolled ? 'h-20' : 'h-32'} transition-all duration-700 ease-out`}></div>
    </>
  );
};

export default Navigation;