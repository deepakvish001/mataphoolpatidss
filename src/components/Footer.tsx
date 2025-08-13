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
    <footer className="bg-card border-t border-border">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">M</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">MATA PHOOLPATI DEVI</h3>
                    <h3 className="text-lg font-bold text-foreground">SHIKSHAN SANSTHAN</h3>
                    <p className="text-xs text-muted-foreground">Skill Development Programs</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Pioneer in skill training with 13+ years of experience, training 5+ lakh students 
                  across India with government certified courses and 100% placement assistance.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Vill- Murarpatti, Post Lalganj, Tahsil Bairiya, Dist Ballia, (U.P.) 271216
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    +91 7007989716, +91 9004362661
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    info.mpdss@gmail.com
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Training Programs */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-6">Training Programs</h4>
              <ul className="space-y-3">
                {trainingPrograms.map((program) => (
                  <li key={program}>
                    <span className="text-sm text-muted-foreground">
                      {program}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-6">Stay Updated</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Subscribe to our newsletter to stay updated on our latest training programs and industry news.
              </p>
              
              <div className="space-y-3">
                <Input 
                  type="email"
                  placeholder="Enter your email"
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                />
                <Button className="w-full btn-primary">
                  Subscribe
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Footer */}
        <div className="border-t border-border py-8">
          <div className="space-y-6">
            {/* Company Legal Info */}
            <div className="bg-muted/30 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h5 className="font-semibold text-foreground mb-2">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</h5>
                  <div className="space-y-1 text-muted-foreground">
                    <p>REG No: BAL/10760/2019-2020</p>
                    <p>GST No: 09AAXAM0981E1Z3</p>
                    <p>PAN No: AAXAM0981E</p>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-foreground mb-2">Registered Address</h5>
                  <div className="text-muted-foreground">
                    <p>Vill- Murarpatti, Post Lalganj, Tahsil Bairiya,</p>
                    <p>Dist Ballia, (U.P.) 271216</p>
                    <p>Website: www.mataphoolpatidss.in</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
              <p>© 2025 MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a>
                <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;