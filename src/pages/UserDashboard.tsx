import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { User, BookOpen, Award, Clock, BarChart3, Settings, FileText, CreditCard, GraduationCap, Target } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user, userRole } = useAuth();

  const userFeatures = [
    {
      title: "My Courses",
      description: "View enrolled courses and progress",
      icon: BookOpen,
      color: "text-blue-500",
      href: "/user/courses"
    },
    {
      title: "Certificates",
      description: "Download your earned certificates",
      icon: Award,
      color: "text-green-500",
      href: "/user/certificates"
    },
    {
      title: "Progress",
      description: "Track your learning progress",
      icon: BarChart3,
      color: "text-purple-500",
      href: "/user/progress"
    },
    {
      title: "Profile",
      description: "Update your personal information",
      icon: Settings,
      color: "text-orange-500",
      href: "/user/profile"
    },
    {
      title: "Assignments",
      description: "View and submit assignments",
      icon: FileText,
      color: "text-indigo-500",
      href: "/user/assignments"
    },
    {
      title: "Payments",
      description: "View payment history and dues",
      icon: CreditCard,
      color: "text-red-500",
      href: "/user/payments"
    }
  ];

  const recentActivity = [
    {
      title: "Course Enrollment",
      description: "Successfully enrolled in 'Digital Marketing Basics'",
      time: "2 hours ago",
      icon: BookOpen,
      color: "text-blue-500"
    },
    {
      title: "Assignment Submitted",
      description: "Submitted assignment for 'Computer Fundamentals'",
      time: "1 day ago",
      icon: FileText,
      color: "text-green-500"
    },
    {
      title: "Certificate Earned",
      description: "Received certificate for 'Basic Computer Course'",
      time: "3 days ago",
      icon: Award,
      color: "text-purple-500"
    }
  ];

  const stats = [
    {
      label: "Enrolled Courses",
      value: "3",
      icon: GraduationCap,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      label: "Completed",
      value: "1",
      icon: Award,
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      label: "In Progress",
      value: "2",
      icon: Clock,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      label: "Overall Progress",
      value: "65%",
      icon: Target,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue/5 via-background to-green/5">
      {/* Header */}
      <div className="bg-white border-b border-border/40 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">User Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.email}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
              <User className="mr-1 h-3 w-3" />
              {userRole}
            </Badge>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Access your most used features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userFeatures.map((feature, index) => (
                      <Card 
                        key={index}
                        className="cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/50 hover:scale-105"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 rounded-lg bg-muted/50">
                              <feature.icon className={`h-5 w-5 ${feature.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm">{feature.title}</h3>
                              <p className="text-xs text-muted-foreground mt-1">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your latest actions and updates
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="p-2 rounded-full bg-muted/50">
                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Your account details and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  <p className="text-sm mt-1">{user?.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Role</Label>
                  <p className="text-sm mt-1">{userRole}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Member Since</Label>
                  <p className="text-sm mt-1">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;