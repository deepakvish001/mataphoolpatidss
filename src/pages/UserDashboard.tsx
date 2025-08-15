import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  BookOpen,
  Award,
  Activity,
  TrendingUp,
  Clock,
  Target,
  Calendar,
  Star,
  PlayCircle,
  Download,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Trophy,
  GraduationCap,
  BarChart3,
  Zap,
  Timer,
  Brain
} from 'lucide-react';
import { useRealtimeProfile } from '@/hooks/useRealtimeProfile';

const UserDashboard: React.FC = () => {
  const { user, userRole } = useAuth();
  const { profile, loading } = useRealtimeProfile();

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const quickActions = [
    {
      title: 'Continue Learning',
      description: 'Resume your current course',
      icon: PlayCircle,
      href: '/user/courses',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      progress: 75,
      badge: 'In Progress'
    },
    {
      title: 'View Certificates',
      description: 'Download your achievements',
      icon: Award,
      href: '/user/certificates',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      progress: null,
      badge: '2 Available'
    },
    {
      title: 'Schedule',
      description: 'Check upcoming classes',
      icon: Calendar,
      href: '/user/schedule',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      progress: null,
      badge: 'Next: 2PM'
    },
    {
      title: 'Assignments',
      description: 'Complete pending tasks',
      icon: Target,
      href: '/user/assignments',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      progress: 60,
      badge: '3 Pending'
    }
  ];

  const stats = [
    {
      title: 'Learning Progress',
      value: '75%',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Goals Achieved',
      value: '8/10',
      change: '+2',
      trend: 'up',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Study Streak',
      value: '15 days',
      change: '+5',
      trend: 'up',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentActivity = [
    {
      title: 'Completed Module: Advanced Excel',
      description: 'Successfully finished data analysis techniques',
      time: '2 hours ago',
      icon: CheckCircle,
      type: 'success'
    },
    {
      title: 'Assignment Due Soon',
      description: 'PowerPoint presentation due in 2 days',
      time: '1 day ago',
      icon: AlertCircle,
      type: 'warning'
    },
    {
      title: 'New Certificate Available',
      description: 'Your Basic Computer Course certificate is ready',
      time: '3 days ago',
      icon: Award,
      type: 'info'
    },
    {
      title: 'Course Recommendation',
      description: 'Based on your progress, try Advanced Programming',
      time: '5 days ago',
      icon: Brain,
      type: 'info'
    }
  ];

  const currentCourses = [
    {
      title: 'Advanced Computer Skills',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      nextLesson: 'Data Analysis with Excel',
      instructor: 'Dr. Smith',
      timeLeft: '2 weeks'
    },
    {
      title: 'Digital Marketing Basics',
      progress: 40,
      totalLessons: 16,
      completedLessons: 6,
      nextLesson: 'Social Media Strategy',
      instructor: 'Prof. Johnson',
      timeLeft: '3 weeks'
    }
  ];

  const achievements = [
    { title: 'First Course Complete', icon: Trophy, unlocked: true },
    { title: 'Perfect Attendance', icon: Star, unlocked: true },
    { title: 'Quick Learner', icon: Zap, unlocked: true },
    { title: 'Knowledge Master', icon: Brain, unlocked: false },
    { title: 'Graduation Ready', icon: GraduationCap, unlocked: false }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Enhanced Welcome Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary/90 to-primary/80 p-8 text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16 border-4 border-white/20">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="text-lg bg-white/20">
                {getInitials(profile?.full_name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name?.split(' ')[0] || 'Student'}! 👋</h1>
              <p className="text-white/80 text-lg">Ready to continue your learning journey?</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>Level 5 Learner</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span>3 Achievements</span>
            </div>
            <div className="flex items-center space-x-2">
              <Timer className="h-4 w-4" />
              <span>48 hours learned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link key={index} to={action.href} className="group">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg overflow-hidden h-full">
                <div className={`h-2 bg-gradient-to-r ${action.color}`}></div>
                <CardContent className="pt-6">
                  <div className={`${action.bgColor} rounded-xl p-4 mb-4`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${action.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="text-xs font-medium">
                        {action.badge}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                    {action.progress && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{action.progress}%</span>
                        </div>
                        <Progress value={action.progress} className="h-2" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Enhanced Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                    <div className="flex items-baseline space-x-2">
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                        stat.trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Current Courses Progress */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-primary" />
            Current Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {currentCourses.map((course, index) => (
              <div key={index} className="p-6 bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      Next: {course.nextLesson}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Instructor: {course.instructor} • {course.timeLeft} remaining
                    </p>
                  </div>
                  <Badge variant="outline">{course.completedLessons}/{course.totalLessons} lessons</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-3" />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Button size="sm" className="bg-gradient-to-r from-primary to-primary/90">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Button>
                  <Button size="sm" variant="ghost">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-primary" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div 
                    key={index} 
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10' 
                        : 'bg-muted/30 opacity-50'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      achievement.unlocked ? 'bg-primary/20' : 'bg-muted'
                    }`}>
                      <Icon className={`h-4 w-4 ${
                        achievement.unlocked ? 'text-primary' : 'text-muted-foreground'
                      }`} />
                    </div>
                    <span className={`font-medium ${
                      achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {achievement.title}
                    </span>
                    {achievement.unlocked && (
                      <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-all duration-300">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-50' :
                      activity.type === 'warning' ? 'bg-orange-50' : 'bg-blue-50'
                    }`}>
                      <Icon className={`h-4 w-4 ${
                        activity.type === 'success' ? 'text-green-600' :
                        activity.type === 'warning' ? 'text-orange-600' : 'text-blue-600'
                      }`} />
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

      {/* Quick Profile Access */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-muted/30 to-background">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback>{getInitials(profile?.full_name)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Complete your profile</h3>
                <p className="text-sm text-muted-foreground">Add more details to personalize your experience</p>
              </div>
            </div>
            <Link to="/user/profile">
              <Button variant="outline">
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;