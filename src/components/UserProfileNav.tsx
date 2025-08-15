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
          className="flex items-center space-x-3 h-12 px-3 rounded-full hover:bg-muted/50 focus:bg-muted/50"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatar_url || ''} alt={displayName} />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="hidden lg:flex flex-col items-start text-left min-w-0">
            <span className="text-sm font-medium text-foreground truncate max-w-32">
              {displayName}
            </span>
            {userRole && (
              <Badge 
                variant="secondary" 
                className={`text-xs h-4 px-1 ${getRoleBadgeColor(userRole.role)}`}
              >
                {userRole.role}
              </Badge>
            )}
          </div>
          
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex items-center space-x-3 p-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={profile?.avatar_url || ''} alt={displayName} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{displayName}</span>
            <span className="text-sm text-muted-foreground">{user.email}</span>
            {userRole && (
              <Badge 
                variant="secondary" 
                className={`text-xs w-fit mt-1 ${getRoleBadgeColor(userRole.role)}`}
              >
                <Shield className="h-3 w-3 mr-1" />
                {userRole.role.charAt(0).toUpperCase() + userRole.role.slice(1)}
              </Badge>
            )}
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer">
          <User className="h-4 w-4 mr-3" />
          <span>Profile Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <BookOpen className="h-4 w-4 mr-3" />
          <span>My Courses</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <Award className="h-4 w-4 mr-3" />
          <span>Certificates</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="h-4 w-4 mr-3" />
          <span>Account Settings</span>
        </DropdownMenuItem>
        
        {userRole?.role === 'admin' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Shield className="h-4 w-4 mr-3" />
              <span>Admin Dashboard</span>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="cursor-pointer text-destructive focus:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4 mr-3" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileNav;