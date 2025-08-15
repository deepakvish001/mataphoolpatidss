import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useRealtimeUserData } from '@/hooks/useRealtimeUserData';
import { 
  LayoutDashboard, 
  User, 
  BookOpen, 
  Award, 
  Settings, 
  Calendar,
  FileText,
  HelpCircle,
  Bell
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

export function UserSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const currentPath = location.pathname;
  const { userCourses, certificates, userAssignments, unreadNotificationsCount } = useRealtimeUserData();

  const activeCourses = userCourses.filter(course => course.status === 'active');
  const pendingAssignments = userAssignments.filter(assignment => assignment.status === 'pending');

  const navigationItems = [
    {
      title: 'Dashboard',
      url: '/user/dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      title: 'My Profile',
      url: '/user/profile',
      icon: User,
      badge: null
    },
    {
      title: 'My Courses',
      url: '/user/courses',
      icon: BookOpen,
      badge: activeCourses.length > 0 ? activeCourses.length.toString() : null
    },
    {
      title: 'Certificates',
      url: '/user/certificates',
      icon: Award,
      badge: certificates.length > 0 ? certificates.length.toString() : null
    },
    {
      title: 'Schedule',
      url: '/user/schedule',
      icon: Calendar,
      badge: null
    },
    {
      title: 'Assignments',
      url: '/user/assignments',
      icon: FileText,
      badge: pendingAssignments.length > 0 ? pendingAssignments.length.toString() : null
    }
  ];

  const settingsItems = [
    {
      title: 'Settings',
      url: '/user/settings',
      icon: Settings,
      badge: null
    },
    {
      title: 'Notifications',
      url: '/user/notifications',
      icon: Bell,
      badge: unreadNotificationsCount > 0 ? unreadNotificationsCount.toString() : null
    },
    {
      title: 'Help & Support',
      url: '/user/help',
      icon: HelpCircle,
      badge: null
    }
  ];

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted/50";

  return (
    <Sidebar className={`${collapsed ? "w-14" : "w-64"} border-r`} collapsible="icon">
      <SidebarContent className="py-4">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => getNavCls({ isActive })}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings & Support */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => getNavCls({ isActive })}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.title}</span>
                          {item.badge && (
                            <Badge variant="destructive" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}