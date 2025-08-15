import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Phone, 
  Shield,
  Heart,
  ExternalLink
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export const UserFooter = () => {
  const isMobile = useIsMobile();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t shadow-sm">
      <div className="px-3 sm:px-6 py-2 sm:py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          {/* Left side - Institution info */}
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              <span className="font-medium">MPDS Portal</span>
            </div>
            {!isMobile && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <a 
                  href="tel:+917007989716" 
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  <Phone className="h-3 w-3" />
                  <span>+91 7007989716</span>
                </a>
                <a 
                  href="mailto:info@mpds.edu.in" 
                  className="flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  <Mail className="h-3 w-3" />
                  <span>info@mpds.edu.in</span>
                </a>
              </div>
            )}
          </div>

          {/* Center - Quick links (Desktop only) */}
          {!isMobile && (
            <div className="flex items-center gap-4 text-xs">
              <Link 
                to="/user/help" 
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                Help
                <ExternalLink className="h-3 w-3" />
              </Link>
              <Link 
                to="/user/support" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Support
              </Link>
              <Link 
                to="/privacy" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
            </div>
          )}

          {/* Right side - Status and info */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Badge variant="secondary" className="text-xs h-6 px-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse"></div>
              Online
            </Badge>
            
            {!isMobile && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>Made with</span>
                <Heart className="h-3 w-3 text-red-500 fill-current" />
                <span>for students</span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile-only bottom section */}
        {isMobile && (
          <div className="flex flex-col items-center gap-2 mt-2 pt-2 border-t">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <a 
                href="tel:+917007989716" 
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <Phone className="h-3 w-3" />
                Call Support
              </a>
              <Link 
                to="/user/help" 
                className="hover:text-foreground transition-colors"
              >
                Help Center
              </Link>
            </div>
            <div className="text-center text-xs text-muted-foreground flex items-center gap-1">
              <span>© 2024 MPDS</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="h-3 w-3 text-red-500 fill-current" /> for students
              </span>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};