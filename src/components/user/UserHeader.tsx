import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  LogOut, 
  User, 
  Settings, 
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import { useRealtimeProfile } from '@/hooks/useRealtimeProfile';
import { useIsMobile } from '@/hooks/use-mobile';

export const UserHeader = () => {
  const { user, userRole, signOut } = useAuth();
  const { profile } = useRealtimeProfile();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 h-14 sm:h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="flex h-full items-center justify-between px-3 sm:px-6 gap-2 sm:gap-4">
        {/* Left side - Sidebar trigger and search */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <SidebarTrigger className="h-8 w-8 shrink-0 hover:bg-muted/80 transition-colors" />
          
          {/* Mobile search toggle */}
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </Button>
          )}
          
          {/* Desktop search */}
          <div className="hidden lg:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, certificates..."
                className="w-full pl-10 pr-4 h-9 bg-muted/50 border-0 focus:bg-background transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Mobile search overlay */}
        {isMobile && searchOpen && (
          <div className="absolute top-full left-0 right-0 p-3 bg-background border-b shadow-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses, certificates..."
                className="w-full pl-10 pr-4 h-10"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Center - Logo/Title */}
        <div className="hidden xl:flex items-center justify-center flex-1">
          <div className="text-center">
            <h1 className="text-lg font-semibold tracking-tight">MPDS Student Portal</h1>
            <p className="text-xs text-muted-foreground">Mata Phoolpati Devi Shikshan Sansthan</p>
          </div>
        </div>

        {/* Right side - Notifications and User menu */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          {/* Notifications */}
          <Button 
            variant="ghost" 
            size={isMobile ? "sm" : "default"}
            className="relative h-8 w-8 sm:h-9 sm:w-9 hover:bg-muted/80 transition-colors"
          >
            <Bell className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 text-xs p-0 flex items-center justify-center animate-pulse"
            >
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-muted/80 transition-colors">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="text-xs sm:text-sm font-medium">
                    {getInitials(profile?.full_name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 sm:w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal p-3">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-medium leading-none truncate">
                    {profile?.full_name || 'User'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground truncate">
                    {user?.email}
                  </p>
                  <Badge variant="secondary" className="w-fit text-xs">
                    {userRole || 'user'}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => navigate('/user/profile')}
                className="cursor-pointer py-2.5"
              >
                <User className="mr-3 h-4 w-4" />
                <span className="text-sm">Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate('/user/settings')}
                className="cursor-pointer py-2.5"
              >
                <Settings className="mr-3 h-4 w-4" />
                <span className="text-sm">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleSignOut}
                className="cursor-pointer py-2.5 text-destructive focus:text-destructive"
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span className="text-sm">Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};