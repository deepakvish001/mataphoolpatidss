import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  BookOpen, 
  Award, 
  Settings, 
  Calendar,
  FileText,
  HelpCircle,
  Bell,
  Clock,
  Target,
  TrendingUp,
  MessageSquare,
  Users,
  Shield,
  Sparkles,
  GraduationCap,
  Brain
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useRealtimeProfile } from '@/hooks/useRealtimeProfile';

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/user/dashboard',
    icon: LayoutDashboard,
    badge: null,
    description: 'Overview & stats'
  },
  {
    title: 'My Profile',
    url: '/user/profile',
    icon: User,
    badge: null,
    description: 'Personal information'
  },
  {
    title: 'My Courses',
    url: '/user/courses',
    icon: BookOpen,
    badge: '3',
    description: 'Active courses'
  },
  {
    title: 'Certificates',
    url: '/user/certificates',
    icon: Award,
    badge: '2',
    description: 'Achievements'
  },
  {
    title: 'Schedule',
    url: '/user/schedule',
    icon: Calendar,
    badge: null,
    description: 'Class timetable'
  },
  {
    title: 'Assignments',
    url: '/user/assignments',
    icon: FileText,
    badge: '5',
    description: 'Pending tasks'
  }
];

const quickStats = [
  { label: 'Progress', value: 75, color: 'bg-blue-500' },
  { label: 'Streak', value: 15, color: 'bg-green-500' },
  { label: 'Goals', value: 80, color: 'bg-purple-500' }
];

const settingsItems = [
  {
    title: 'Settings',
    url: '/user/settings',
    icon: Settings,
    badge: null,
    description: 'Preferences'
  },
  {
    title: 'Notifications',
    url: '/user/notifications',
    icon: Bell,
    badge: '3',
    description: 'Updates & alerts'
  },
  {
    title: 'Help & Support',
    url: '/user/help',
    icon: HelpCircle,
    badge: null,
    description: 'Get assistance'
  }
];

export function UserSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAuth();
  const { profile } = useRealtimeProfile();

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium shadow-lg" : "hover:bg-muted/80 hover:shadow-md";

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-72"} border-r border-border/50 bg-gradient-to-b from-background to-muted/20 transition-all duration-300`} collapsible="icon">
      <SidebarContent className="py-4">
        {/* Profile Section */}
        {!collapsed && (
          <div className="px-4 mb-6 animate-fade-in">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="h-10 w-10 border-2 border-primary/20">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-primary/10">
                    {getInitials(profile?.full_name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {profile?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="text-xs font-medium">Level 5 Learner</span>
                <Badge variant="secondary" className="text-xs px-1">Pro</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Learning Progress</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-1.5" />
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats - Mini version when collapsed */}
        {collapsed && (
          <div className="px-2 mb-4">
            <div className="space-y-2">
              {quickStats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${stat.color} mb-1`}></div>
                  <span className="text-xs font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={`${collapsed ? "sr-only" : "text-xs font-semibold text-muted-foreground/80 mb-2"}`}>
            <TrendingUp className="h-3 w-3 mr-1" />
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `
                        ${getNavCls({ isActive })}
                        group relative transition-all duration-200 rounded-lg px-3 py-2.5
                        hover:scale-[1.02] active:scale-[0.98]
                      `}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <item.icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                        collapsed ? '' : 'mr-3'
                      }`} />
                      {!collapsed && (
                        <>
                          <div className="flex-1">
                            <span className="font-medium">{item.title}</span>
                            {item.description && (
                              <p className="text-xs text-muted-foreground/80 mt-0.5">
                                {item.description}
                              </p>
                            )}
                          </div>
                          {item.badge && (
                            <Badge 
                              variant={isActive(item.url) ? "secondary" : "outline"} 
                              className="text-xs px-2 ml-2 animate-pulse"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                      {collapsed && item.badge && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-[8px] text-primary-foreground font-bold">
                            {item.badge}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions - Only when expanded */}
        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 mb-2">
              <Target className="h-3 w-3 mr-1" />
              Quick Stats
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-3 space-y-3">
                {quickStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${stat.color}`}></div>
                      <span className="text-sm font-medium">{stat.label}</span>
                    </div>
                    <span className="text-sm font-bold">
                      {typeof stat.value === 'number' && stat.label === 'Progress' ? `${stat.value}%` : stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Settings & Support */}
        <SidebarGroup>
          <SidebarGroupLabel className={`${collapsed ? "sr-only" : "text-xs font-semibold text-muted-foreground/80 mb-2"}`}>
            <Shield className="h-3 w-3 mr-1" />
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {settingsItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `
                        ${getNavCls({ isActive })}
                        group relative transition-all duration-200 rounded-lg px-3 py-2.5
                        hover:scale-[1.02] active:scale-[0.98]
                      `}
                    >
                      <item.icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                        collapsed ? '' : 'mr-3'
                      }`} />
                      {!collapsed && (
                        <>
                          <div className="flex-1">
                            <span className="font-medium">{item.title}</span>
                            {item.description && (
                              <p className="text-xs text-muted-foreground/80 mt-0.5">
                                {item.description}
                              </p>
                            )}
                          </div>
                          {item.badge && (
                            <Badge 
                              variant="destructive" 
                              className="text-xs px-2 ml-2 animate-pulse"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                      {collapsed && item.badge && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center animate-pulse">
                          <span className="text-[8px] text-destructive-foreground font-bold">
                            {item.badge}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer Section - Only when expanded */}
        {!collapsed && (
          <div className="mt-auto px-4 pt-4 border-t border-border/50">
            <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg p-3 mb-2">
              <div className="flex items-center space-x-2 mb-2">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Learning Goal</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Complete 5 courses</span>
                  <span>3/5</span>
                </div>
                <Progress value={60} className="h-1.5" />
              </div>
            </div>
            <div className="text-center text-xs text-muted-foreground">
              <p>© 2024 MPDS Portal</p>
              <p>Version 2.1.0</p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}