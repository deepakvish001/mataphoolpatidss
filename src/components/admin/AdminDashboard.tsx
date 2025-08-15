import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Users, Database, Key, Eye, Lock, CheckCircle, AlertTriangle, User, Settings, BarChart3 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, userRole, hasRole } = useAuth();

  const features = [
    {
      title: "User Management",
      description: "Manage user accounts, roles, and permissions",
      icon: Users,
      color: "text-blue-500",
      available: hasRole('admin')
    },
    {
      title: "Student Management", 
      description: "Handle student registrations and data",
      icon: User,
      color: "text-green-500",
      available: hasRole('admin') || hasRole('moderator')
    },
    {
      title: "System Analytics",
      description: "View system usage and performance metrics",
      icon: BarChart3,
      color: "text-purple-500",
      available: hasRole('admin')
    },
    {
      title: "Security Settings",
      description: "Configure authentication and security policies",
      icon: Shield,
      color: "text-red-500",
      available: hasRole('admin')
    },
    {
      title: "Database Management",
      description: "Manage database operations and backups",
      icon: Database,
      color: "text-orange-500",
      available: hasRole('admin')
    },
    {
      title: "Profile Settings",
      description: "Update your personal information and preferences",
      icon: Settings,
      color: "text-gray-500",
      available: true
    }
  ];

  const securityStatus = [
    {
      label: "Multi-Factor Auth",
      status: "ready",
      description: "Infrastructure prepared for MFA implementation"
    },
    {
      label: "Role-Based Access",
      status: "active",
      description: "RBAC system actively protecting resources"
    },
    {
      label: "Session Management",
      status: "active", 
      description: "Automatic token refresh and secure sessions"
    },
    {
      label: "Password Security",
      status: "active",
      description: "Secure password policies and reset flows"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'ready':
        return <Eye className="h-4 w-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Lock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'ready':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-muted-foreground mb-4">
          Secure administration portal for Mata Phoolpati Devi Shikshan Sansthan
        </p>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            <Shield className="mr-1 h-3 w-3" />
            {userRole}
          </Badge>
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            <Key className="mr-1 h-3 w-3" />
            Authenticated
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              feature.available ? 'hover:border-primary/50' : 'opacity-60'
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                {feature.description}
              </CardDescription>
              {!feature.available && (
                <Badge variant="outline" className="mt-2 text-xs bg-gray-500/10 text-gray-500 border-gray-500/20">
                  Restricted Access
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Security Status</span>
          </CardTitle>
          <CardDescription>
            Current security features and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityStatus.map((item, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border">
                <div className="mt-0.5">
                  {getStatusIcon(item.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-sm">{item.label}</p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getStatusColor(item.status)}`}
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-primary" />
            <span>Account Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Email</Label>
              <p className="text-sm">{user?.email}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Role</Label>
              <p className="text-sm">{userRole}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Account Created</Label>
              <p className="text-sm">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Last Sign In</Label>
              <p className="text-sm">
                {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Unknown'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Link */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-900">Authentication Documentation</h3>
              <p className="text-sm text-blue-700 mt-1">
                Complete setup guide and troubleshooting information
              </p>
            </div>
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100">
              View Docs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;