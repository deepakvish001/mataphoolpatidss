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
  Moon,
  Sun,
  Command,
  Zap,
  Trophy,
  Clock,
  MessageSquare,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { useRealtimeProfile } from '@/hooks/useRealtimeProfile';

export const UserHeader = () => {
  const { user, userRole, signOut } = useAuth();
  const { profile } = useRealtimeProfile();
  const navigate = useNavigate();
  const [searchFocused, setSearchFocused] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const notifications = [
    {
      id: 1,
      title: 'New course available',
      description: 'Advanced Python Programming is now live',
      time: '2 hours ago',
      type: 'info',
      unread: true
    },
    {
      id: 2,
      title: 'Assignment due soon',
      description: 'Data Analysis project due in 2 days',
      time: '1 day ago',
      type: 'warning',
      unread: true
    },
    {
      id: 3,
      title: 'Certificate ready',
      description: 'Your Web Development certificate is ready',
      time: '3 days ago',
      type: 'success',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="flex h-full items-center justify-between px-4">
        {/* Left side - Sidebar trigger and search */}
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="h-8 w-8 hover:bg-muted/80 transition-colors rounded-md" />
          
          <div className="hidden md:flex items-center space-x-2">
            <div className={`relative transition-all duration-300 ${searchFocused ? 'w-80' : 'w-64'}`}>
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground transition-colors" />
              <Input
                placeholder="Search courses, certificates, help..."
                className={`pl-10 pr-12 transition-all duration-300 ${
                  searchFocused 
                    ? 'border-primary/50 shadow-md bg-primary/5' 
                    : 'border-border bg-background'
                }`}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <div className="absolute right-3 top-2.5 flex items-center space-x-1">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <Command className="h-3 w-3" />
                  <span>K</span>
                </kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Center - Logo/Title */}
        <div className="hidden lg:flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              MPDS Student Portal
            </h1>
            <p className="text-xs text-muted-foreground">Mata Phoolpati Devi Shikshan Sansthan</p>
          </div>
        </div>

        {/* Right side - Actions and User menu */}
        <div className="flex items-center space-x-3">
          {/* Quick Stats */}
          <div className="hidden lg:flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1 px-2 py-1 bg-blue-50 rounded-full">
              <Trophy className="h-3 w-3 text-blue-600" />
              <span className="font-medium text-blue-600">Level 5</span>
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 bg-green-50 rounded-full">
              <Zap className="h-3 w-3 text-green-600" />
              <span className="font-medium text-green-600">15 day streak</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative hover:bg-muted/80">
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="relative hover:bg-muted/80">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative hover:bg-muted/80">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center animate-pulse"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end" forceMount>
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <Badge variant="secondary" className="text-xs">
                  {unreadCount} new
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex-col items-start p-3 cursor-pointer">
                    <div className="flex items-start justify-between w-full">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium">{notification.title}</p>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-primary">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" className="hidden md:flex hover:bg-muted/80">
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:ring-2 hover:ring-primary/20 transition-all">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-gradient-to-r from-primary/20 to-primary/10">
                    {getInitials(profile?.full_name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback>
                        {getInitials(profile?.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-none">
                        {profile?.full_name || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground mt-1">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {userRole || 'user'}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Level 5
                    </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/user/profile')} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/user/settings')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Clock className="mr-2 h-4 w-4" />
                Activity Log
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};