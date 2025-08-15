import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  BookOpen, 
  Award,
  ChevronDown
} from 'lucide-react';

const UserProfileNav = () => {
  const { user, profile, userRole, signOut } = useAuth();

  if (!user) return null;

  // Get display name with fallback logic
  const displayName = profile?.full_name || 
                     user.user_metadata?.full_name || 
                     user.email?.split('@')[0] || 
                     'User';
  
  console.log('UserProfileNav - User:', user);
  console.log('UserProfileNav - Profile:', profile);
  console.log('UserProfileNav - Display Name:', displayName);

  const initials = displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-destructive text-destructive-foreground';
      case 'moderator':
        return 'bg-orange-500 text-white';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center space-x-2 h-10 w-10 p-0 rounded-full hover:bg-muted/50 focus:bg-muted/50"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatar_url || ''} alt={displayName} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="w-80 bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl z-[9999] p-2"
        sideOffset={8}
      >
        <DropdownMenuLabel className="flex items-center space-x-3 p-4 bg-muted/30 rounded-xl m-1">
          <Avatar className="h-14 w-14 border-2 border-primary/20">
            <AvatarImage src={profile?.avatar_url || ''} alt={displayName} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-semibold text-foreground text-base truncate">{displayName}</span>
            <span className="text-sm text-muted-foreground truncate">{user.email}</span>
            {userRole && (
              <Badge 
                variant="secondary" 
                className={`text-xs w-fit mt-2 px-2 py-1 ${getRoleBadgeColor(userRole.role)}`}
              >
                <Shield className="h-3 w-3 mr-1" />
                {userRole.role.charAt(0).toUpperCase() + userRole.role.slice(1)}
              </Badge>
            )}
          </div>
        </DropdownMenuLabel>
        
        <div className="px-1 py-2 space-y-1">
          <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <User className="h-4 w-4 mr-3 text-primary" />
            <span className="font-medium">Profile Settings</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <BookOpen className="h-4 w-4 mr-3 text-primary" />
            <span className="font-medium">My Courses</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Award className="h-4 w-4 mr-3 text-primary" />
            <span className="font-medium">Certificates</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <Settings className="h-4 w-4 mr-3 text-primary" />
            <span className="font-medium">Account Settings</span>
          </DropdownMenuItem>
        </div>
        
        {userRole?.role === 'admin' && (
          <>
            <DropdownMenuSeparator className="my-2 mx-2" />
            <div className="px-1 py-2">
              <DropdownMenuItem className="cursor-pointer p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <Shield className="h-4 w-4 mr-3 text-orange-500" />
                <span className="font-medium">Admin Dashboard</span>
              </DropdownMenuItem>
            </div>
          </>
        )}
        
        <DropdownMenuSeparator className="my-2 mx-2" />
        
        <div className="px-1 py-2">
          <DropdownMenuItem 
            className="cursor-pointer p-3 rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4 mr-3" />
            <span className="font-medium">Sign Out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileNav;