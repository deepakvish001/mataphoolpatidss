import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings, 
  LogOut, 
  Bell, 
  Calendar,
  BookOpen,
  Award,
  Activity
} from 'lucide-react';
import { useRealtimeProfile } from '@/hooks/useRealtimeProfile';

const UserDashboard: React.FC = () => {
  const { user, userRole, signOut } = useAuth();
  const { profile, loading } = useRealtimeProfile();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const quickActions = [
    {
      title: 'My Profile',
      description: 'View and edit your profile information',
      icon: User,
      href: '/user/profile',
      color: 'bg-blue-500'
    },
    {
      title: 'My Courses',
      description: 'View enrolled courses and progress',
      icon: BookOpen,
      href: '/user/courses',
      color: 'bg-green-500'
    },
    {
      title: 'Certificates',
      description: 'Download your certificates',
      icon: Award,
      href: '/user/certificates',
      color: 'bg-purple-500'
    },
    {
      title: 'Settings',
      description: 'Manage account preferences',
      icon: Settings,
      href: '/user/settings',
      color: 'bg-orange-500'
    }
  ];

  const recentActivity = [
    {
      title: 'Profile Updated',
      description: 'Your profile information was updated successfully',
      time: '2 hours ago',
      icon: User
    },
    {
      title: 'Course Enrolled',
      description: 'You enrolled in Advanced Computer Skills',
      time: '1 day ago',
      icon: BookOpen
    },
    {
      title: 'Certificate Generated',
      description: 'Your Basic Computer Course certificate is ready',
      time: '3 days ago',
      icon: Award
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-muted-foreground">Here's what's happening with your account today.</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Profile Overview */}
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="text-lg">
                  {getInitials(profile?.full_name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl font-bold">{profile?.full_name || 'User'}</h2>
                <p className="text-muted-foreground">{user?.email}</p>
                <div className="flex items-center justify-center md:justify-start space-x-2 mt-2">
                  <Badge variant="secondary">
                    {userRole || 'user'}
                  </Badge>
                  <Badge variant="outline">
                    <Calendar className="h-3 w-3 mr-1" />
                    Active Member
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <Link to="/user/profile">
                  <Button variant="outline" size="sm" className="w-full">
                    <User className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} to={action.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full ${action.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Statistics and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Statistics */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Courses Completed</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Certificates Earned</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current Courses</span>
                  <span className="font-semibold">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Study Hours</span>
                  <span className="font-semibold">48h</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{activity.title}</h4>
                          <p className="text-sm text-muted-foreground">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;