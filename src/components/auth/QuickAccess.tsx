import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Users, Database, Key, Lock, ArrowRight, Zap, Settings, BarChart3, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuickAccess: React.FC = () => {
  const { user, userRole, hasRole } = useAuth();

  if (!user) {
    return (
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 rounded-lg p-8 text-center">
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Access Admin Dashboard</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Sign in to access the secure administration portal for Mata Phoolpati Devi Shikshan Sansthan
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/auth">
                <Lock className="mr-2 h-4 w-4" />
                Admin Login
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      title: "Dashboard",
      description: "Main admin dashboard",
      icon: BarChart3,
      href: "/admin/dashboard",
      available: true,
      color: "text-blue-500"
    },
    {
      title: "User Management",
      description: "Manage users and roles",
      icon: Users,
      href: "/admin/users",
      available: hasRole('admin'),
      color: "text-green-500"
    },
    {
      title: "Settings",
      description: "System configuration",
      icon: Settings,
      href: "/admin/settings",
      available: hasRole('admin'),
      color: "text-orange-500"
    },
    {
      title: "Profile",
      description: "Your account settings",
      icon: User,
      href: "/admin/profile",
      available: true,
      color: "text-purple-500"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 rounded-lg p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold">Admin Portal</h2>
          </div>
          <p className="text-muted-foreground">
            Quick access to administrative functions
          </p>
        </div>

        {/* User Info */}
        <Card className="bg-background/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Welcome, {user.email}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge 
                    variant="outline" 
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    <Shield className="mr-1 h-3 w-3" />
                    {userRole}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="bg-green-500/10 text-green-500 border-green-500/20"
                  >
                    <Key className="mr-1 h-3 w-3" />
                    Authenticated
                  </Badge>
                </div>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/admin/dashboard">
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                action.available 
                  ? 'hover:border-primary/50 hover:scale-105' 
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
              <CardContent className="pt-6 text-center">
                <div className="space-y-2">
                  <div className={`mx-auto w-fit p-3 rounded-full bg-muted/50`}>
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{action.title}</h3>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </div>
                {action.available ? (
                  <Button asChild variant="ghost" size="sm" className="mt-3 w-full">
                    <Link to={action.href}>Access</Link>
                  </Button>
                ) : (
                  <Badge variant="outline" className="mt-3 text-xs bg-gray-500/10 text-gray-500 border-gray-500/20">
                    Restricted
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Note */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            <Lock className="inline h-4 w-4 mr-1" />
            Secured with role-based access control
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;