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
  GraduationCap
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
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

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
    badge: '3'
  },
  {
    title: 'Certificates',
    url: '/user/certificates',
    icon: Award,
    badge: '2'
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
    badge: '5'
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
    badge: '3'
  },
  {
    title: 'Help & Support',
    url: '/user/help',
    icon: HelpCircle,
    badge: null
  }
];

export function UserSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useIsMobile();

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `transition-all duration-200 ${
      isActive 
        ? "bg-primary text-primary-foreground font-medium shadow-sm" 
        : "hover:bg-muted/80 hover:scale-[1.02] active:scale-[0.98]"
    }`;

  return (
    <Sidebar 
      className={`${collapsed ? "w-16" : "w-72"} border-r bg-card/50 backdrop-blur-sm transition-all duration-300`} 
      collapsible="icon"
    >
      <SidebarContent className="p-2">
        {/* Logo Section */}
        {!collapsed && (
          <div className="flex items-center gap-2 px-4 py-6 mb-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">MPDS Portal</span>
              <span className="text-xs text-muted-foreground">Student Dashboard</span>
            </div>
          </div>
        )}
        
        {collapsed && (
          <div className="flex items-center justify-center py-6 mb-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
        )}

        <Separator className="mb-4" />
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={`text-xs font-medium text-muted-foreground px-3 mb-2 ${collapsed ? "sr-only" : ""}`}>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="relative group">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => getNavCls({ isActive })}
                    >
                      <item.icon className={`${collapsed ? 'h-5 w-5' : 'h-4 w-4'} shrink-0`} />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-sm font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge 
                              variant="secondary" 
                              className="text-xs h-5 min-w-[20px] flex items-center justify-center px-1.5 bg-muted text-muted-foreground group-hover:bg-background"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                      {/* Tooltip for collapsed state */}
                      {collapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                          {item.title}
                          {item.badge && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-4" />

        {/* Settings & Support */}
        <SidebarGroup>
          <SidebarGroupLabel className={`text-xs font-medium text-muted-foreground px-3 mb-2 ${collapsed ? "sr-only" : ""}`}>
            Account & Support
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="relative group">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => getNavCls({ isActive })}
                    >
                      <item.icon className={`${collapsed ? 'h-5 w-5' : 'h-4 w-4'} shrink-0`} />
                      {!collapsed && (
                        <>
                          <span className="flex-1 text-sm font-medium">{item.title}</span>
                          {item.badge && (
                            <Badge 
                              variant={item.title === 'Notifications' ? 'destructive' : 'secondary'} 
                              className="text-xs h-5 min-w-[20px] flex items-center justify-center px-1.5"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                      {/* Tooltip for collapsed state */}
                      {collapsed && (
                        <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                          {item.title}
                          {item.badge && (
                            <Badge 
                              variant={item.title === 'Notifications' ? 'destructive' : 'secondary'} 
                              className="ml-2 text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
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