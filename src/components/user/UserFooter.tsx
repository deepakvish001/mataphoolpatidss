import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Facebook, 
  Twitter, 
  Instagram,
  Shield,
  Heart,
  Zap,
  Trophy,
  Clock,
  Users,
  BookOpen,
  Sparkles,
  ExternalLink,
  Wifi
} from 'lucide-react';

export const UserFooter = () => {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const quickLinks = [
    { name: 'Help Center', href: '/user/help', icon: Heart },
    { name: 'Support', href: '/user/support', icon: Users },
    { name: 'Feedback', href: '/user/feedback', icon: Sparkles },
    { name: 'Privacy', href: '/privacy', icon: Shield }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' }
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t border-border/50 shadow-lg">
      <div className="px-4 py-3">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-3 lg:space-y-0">
          {/* Left side - Institution info */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-3">
              <div className="p-1.5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg">
                <Shield className="h-4 w-4 text-primary" />
              </div>
              <div>
                <span className="font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  MPDS Portal
                </span>
                <div className="flex items-center space-x-2 mt-0.5">
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                    <Wifi className="h-2 w-2 mr-1" />
                    Online
                  </Badge>
                  <span className="text-xs text-muted-foreground">{currentTime}</span>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center space-x-2 hover:text-foreground transition-colors cursor-pointer">
                <Phone className="h-3 w-3" />
                <span>+91 7007989716</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-foreground transition-colors cursor-pointer">
                <Mail className="h-3 w-3" />
                <span>info@mpds.edu.in</span>
              </div>
            </div>
          </div>

          {/* Center - Quick Status & Progress */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full">
                <BookOpen className="h-3 w-3 text-blue-600" />
                <span className="font-medium text-blue-600">3 Active Courses</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-green-100 rounded-full">
                <Trophy className="h-3 w-3 text-green-600" />
                <span className="font-medium text-green-600">75% Progress</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-purple-100 rounded-full">
                <Zap className="h-3 w-3 text-purple-600" />
                <span className="font-medium text-purple-600">15 Day Streak</span>
              </div>
            </div>
          </div>

          {/* Right side - Quick links and actions */}
          <div className="flex items-center space-x-4">
            {/* Quick Links */}
            <div className="hidden md:flex items-center space-x-3 text-sm">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link 
                    key={index}
                    to={link.href} 
                    className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors duration-200 group"
                  >
                    <Icon className="h-3 w-3 group-hover:scale-110 transition-transform" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Social Media & Actions */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Button 
                      key={index}
                      variant="ghost" 
                      size="sm" 
                      className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-110"
                      asChild
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        <Icon className="h-3 w-3" />
                      </a>
                    </Button>
                  );
                })}
              </div>
              
              <div className="w-px h-4 bg-border"></div>
              
              <Button variant="ghost" size="sm" className="h-7 px-2 text-xs hover:bg-primary/10">
                <ExternalLink className="h-3 w-3 mr-1" />
                Website
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile-only bottom row */}
        <div className="md:hidden mt-3 pt-2 border-t border-border/30">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span>+91 7007989716</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>Support</span>
              </div>
            </div>
            <div className="text-muted-foreground">
              © 2024 MPDS
            </div>
          </div>
        </div>

        {/* Desktop copyright */}
        <div className="hidden md:block text-center text-xs text-muted-foreground mt-2 pt-2 border-t border-border/30">
          <div className="flex items-center justify-center space-x-6">
            <span>© 2024 Mata Phoolpati Devi Shikshan Sansthan</span>
            <span className="flex items-center space-x-1">
              <Sparkles className="h-3 w-3" />
              <span>Powered by Advanced Learning Platform v2.1.0</span>
            </span>
            <Badge variant="outline" className="text-xs">
              <Heart className="h-2 w-2 mr-1 text-red-500" />
              Made with care
            </Badge>
          </div>
        </div>
      </div>
    </footer>
  );
};