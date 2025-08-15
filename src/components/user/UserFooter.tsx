import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Facebook, 
  Twitter, 
  Instagram,
  Shield
} from 'lucide-react';

export const UserFooter = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          {/* Left side - Institution info */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="font-medium">MPDS Portal</span>
            </div>
            <div className="hidden md:flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span>+91 7007989716</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>info@mpds.edu.in</span>
              </div>
            </div>
          </div>

          {/* Center - Quick links */}
          <div className="hidden md:flex items-center space-x-4 text-sm">
            <Link to="/user/help" className="text-muted-foreground hover:text-foreground transition-colors">
              Help
            </Link>
            <Link to="/user/support" className="text-muted-foreground hover:text-foreground transition-colors">
              Support
            </Link>
            <Link to="/user/feedback" className="text-muted-foreground hover:text-foreground transition-colors">
              Feedback
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>

          {/* Right side - Status and actions */}
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              Online
            </Badge>
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Facebook className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Twitter className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Instagram className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom copyright line for mobile */}
        <div className="text-center text-xs text-muted-foreground mt-2 md:hidden">
          © 2024 Mata Phoolpati Devi Shikshan Sansthan
        </div>
      </div>
    </footer>
  );
};