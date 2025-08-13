import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, Download, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Training', href: '#training' },
    { name: 'Our Affiliates', href: '#affiliates' },
    { name: 'Work With Us', href: '#work-with-us' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 hidden md:block">
        <div className="container-custom">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 7007989716</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info.mpdss@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Noida, UP | Ballia, UP</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-xs opacity-90">Government Certified Institute</span>
              <div className="w-px h-4 bg-primary-foreground/30"></div>
              <span className="text-xs opacity-90">100% Placement Assistance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg' 
          : 'bg-background/80 backdrop-blur-sm border-b border-border/50'
      } ${!isScrolled ? 'md:top-10' : ''}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">M</span>
                  </div>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground leading-tight">
                  MATA PHOOLPATI DEVI
                  <br />
                  <span className="text-lg text-primary">SHIKSHAN SANSTHAN</span>
                </h1>
                <p className="text-xs text-muted-foreground font-medium tracking-wide">
                  Excellence in Skill Development
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link text-base font-medium py-2 px-1 group relative"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Desktop CTA Section */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-3 text-sm">
                <div className="text-center">
                  <div className="text-primary font-bold">13+ Years</div>
                  <div className="text-xs text-muted-foreground">Experience</div>
                </div>
                <div className="w-px h-8 bg-border"></div>
                <div className="text-center">
                  <div className="text-primary font-bold">5L+</div>
                  <div className="text-xs text-muted-foreground">Trained</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" className="btn-ghost group">
                  <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Brochure
                </Button>
                <Button size="sm" className="btn-primary group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Enquire Now
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-hover to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-muted"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border shadow-xl animate-fade-in">
              <div className="px-4 py-6 space-y-6">
                {/* Mobile Contact Info */}
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>+91 7007989716</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>info.mpdss@gmail.com</span>
                  </div>
                </div>

                {/* Mobile Nav Links */}
                <div className="space-y-3">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block py-3 px-4 text-foreground hover:text-primary hover:bg-muted/50 rounded-lg transition-all duration-300 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>

                {/* Mobile Stats */}
                <div className="flex justify-center space-x-8 py-4">
                  <div className="text-center">
                    <div className="text-primary font-bold text-lg">13+</div>
                    <div className="text-xs text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary font-bold text-lg">5L+</div>
                    <div className="text-xs text-muted-foreground">Students Trained</div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary font-bold text-lg">100%</div>
                    <div className="text-xs text-muted-foreground">Placement Help</div>
                  </div>
                </div>

                {/* Mobile CTA Buttons */}
                <div className="space-y-3">
                  <Button variant="outline" className="w-full btn-secondary group">
                    <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    Download Brochure
                  </Button>
                  <Button className="w-full btn-primary group">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact Us Now
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className={`${isScrolled ? 'h-20' : 'h-30'} md:h-30 transition-all duration-300`}></div>
    </>
  );
};

export default Navigation;