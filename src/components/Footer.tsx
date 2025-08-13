import { Mail, Phone, MapPin, Linkedin, Youtube, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Training Programs', href: '#training' },
    { name: 'Our Affiliates', href: '#affiliates' },
    { name: 'Contact Us', href: '#work-with-us' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy Policy', href: '#' }
  ];

  const trainingPrograms = [
    'Apparel Manufacturing',
    'Organized Retail',
    'Electronics & Hardware',
    'Healthcare Services',
    'Food Processing',
    'Agriculture Services',
    'IT & Software',
    'Automotive Services'
  ];

  return (
    <footer className="bg-gradient-to-b from-card via-card/90 to-background border-t-2 border-primary/20 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-500/3 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Enhanced Footer Content */}
        <div className="py-20">
          <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">
            
            {/* Enhanced Company Info - Takes 2 columns on large screens */}
            <div className="lg:col-span-2 space-y-8">
              <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm border border-primary/20 rounded-3xl p-8 overflow-hidden">
                <div className="absolute top-4 right-4 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-xl">
                      <span className="text-primary-foreground font-black text-2xl">M</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gradient-enhanced bg-clip-text leading-tight">MATA PHOOLPATI DEVI</h3>
                      <h3 className="text-2xl font-black text-gradient-enhanced bg-clip-text leading-tight">SHIKSHAN SANSTHAN</h3>
                      <p className="text-sm text-primary font-bold bg-primary/10 px-3 py-1 rounded-full inline-block mt-2">Skill Development Programs</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                    Pioneer in skill training with <span className="text-primary font-bold">13+ years of experience</span>, training 
                    <span className="text-primary font-bold"> 5+ lakh students</span> across India with government certified courses and 
                    <span className="text-primary font-bold"> 100% placement assistance</span>.
                  </p>
                </div>
              </div>

              {/* Enhanced Contact Info Cards */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-primary/5 to-transparent border border-primary/20 rounded-2xl hover:bg-primary/10 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">
                    Vill- Murarpatti, Post Lalganj, Tahsil Bairiya, Dist Ballia, (U.P.) 271216
                  </span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-500/5 to-transparent border border-green-500/20 rounded-2xl hover:bg-green-500/10 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">
                    +91 7007989716, +91 9004362661
                  </span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-500/5 to-transparent border border-orange-500/20 rounded-2xl hover:bg-orange-500/10 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">
                    info.mpdss@gmail.com
                  </span>
                </div>
              </div>

              {/* Enhanced Legal Info */}
              <div className="relative bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 rounded-2xl p-6 border-2 border-primary/30 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1)_0%,transparent_70%)] rounded-2xl"></div>
                <div className="relative z-10">
                  <h5 className="font-bold text-foreground mb-4 text-base text-gradient-enhanced bg-clip-text">Official Registration</h5>
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-background/20 rounded-lg">
                      <span className="text-muted-foreground font-medium">REG No:</span>
                      <span className="font-bold text-foreground">BAL/10760/2019-2020</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-background/20 rounded-lg">
                      <span className="text-muted-foreground font-medium">GST No:</span>
                      <span className="font-bold text-foreground">09AAXAM0981E1Z3</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-background/20 rounded-lg">
                      <span className="text-muted-foreground font-medium">PAN No:</span>
                      <span className="font-bold text-foreground">AAXAM0981E</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-background/20 rounded-lg">
                      <span className="text-muted-foreground font-medium">Website:</span>
                      <span className="font-bold text-primary">www.mataphoolpatidss.in</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-6 border-b border-border pb-2">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center space-x-2 group"
                    >
                      <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Training Programs */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-6 border-b border-border pb-2">Training Programs</h4>
              <ul className="space-y-3">
                {trainingPrograms.map((program) => (
                  <li key={program}>
                    <span className="text-sm text-muted-foreground flex items-center space-x-2">
                      <span className="w-1 h-1 bg-primary rounded-full"></span>
                      <span>{program}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-6 border-b border-border pb-2">Stay Connected</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Subscribe to our newsletter for the latest updates on training programs and industry news.
              </p>
              
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input 
                    type="email"
                    placeholder="Enter your email"
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary text-sm"
                  />
                  <Button className="btn-primary px-4 shrink-0">
                    Subscribe
                  </Button>
                </div>

                {/* Social Links */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Follow Us</p>
                  <div className="flex space-x-3">
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors group"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors group"
                    >
                      <Youtube className="h-4 w-4" />
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors group"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground space-y-4 md:space-y-0">
            <p className="text-center md:text-left">
              © 2025 <span className="font-semibold text-foreground">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span>. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;