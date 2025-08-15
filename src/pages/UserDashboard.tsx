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
import { useRealtimeUserData } from '@/hooks/useRealtimeUserData';

const UserDashboard: React.FC = () => {
  const { user, userRole } = useAuth();
  const { profile, loading: profileLoading } = useRealtimeProfile();
  const { 
    userCourses, 
    userAssignments, 
    certificates, 
    notifications, 
    userStats, 
    loading: dataLoading,
    unreadNotificationsCount
  } = useRealtimeUserData();

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const loading = profileLoading || dataLoading;

  // Calculate real-time data
  const activeCourses = userCourses.filter(course => course.status === 'active');
  const pendingAssignments = userAssignments.filter(assignment => assignment.status === 'pending');
  const averageProgress = activeCourses.length > 0 
    ? Math.round(activeCourses.reduce((sum, course) => sum + course.progress, 0) / activeCourses.length)
    : 0;

  const quickActions = [
    {
      title: 'Continue Learning',
      description: 'Resume your current course',
      icon: PlayCircle,
      href: '/user/courses',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      progress: averageProgress,
      badge: activeCourses.length > 0 ? 'In Progress' : 'Start Learning'
    },
    {
      title: 'View Certificates',
      description: 'Download your achievements',
      icon: Award,
      href: '/user/certificates',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      progress: null,
      badge: `${certificates.length} Available`
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
      progress: pendingAssignments.length > 0 ? 60 : 100,
      badge: `${pendingAssignments.length} Pending`
    }
  ];

  const stats = [
    {
      title: 'Learning Progress',
      value: `${averageProgress}%`,
      change: '+12%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Courses Completed',
      value: `${userStats?.completed_courses || 0}/${userStats?.total_courses || 0}`,
      change: '+2',
      trend: 'up',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Study Streak',
      value: `${userStats?.study_streak_days || 0} days`,
      change: '+5',
      trend: 'up',
      icon: Zap,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  // Use real notifications data with fallback
  const recentActivity = notifications.length > 0 ? notifications.map(notification => ({
    title: notification.title,
    description: notification.message,
    time: new Date(notification.created_at).toLocaleDateString(),
    icon: notification.type === 'success' ? CheckCircle : 
          notification.type === 'warning' ? AlertCircle : 
          notification.type === 'error' ? AlertCircle : Brain,
    type: notification.type
  })) : [
    {
      title: 'Welcome to MPDS!',
      description: 'Start your learning journey with us',
      time: 'Today',
      icon: Star,
      type: 'info'
    },
    {
      title: 'Explore Courses',
      description: 'Check out our available courses',
      time: 'Today',
      icon: BookOpen,
      type: 'info'
    }
  ];

  // Use real course data
  const currentCourses = activeCourses.length > 0 ? activeCourses.map(course => ({
    title: course.courses?.title || 'Course',
    progress: course.progress,
    totalLessons: course.courses?.total_lessons || 0,
    completedLessons: course.completed_lessons,
    nextLesson: 'Continue Learning',
    instructor: course.courses?.instructor || 'Instructor',
    timeLeft: `${course.courses?.duration_weeks || 1} weeks`
  })) : [
    {
      title: 'No Active Courses',
      progress: 0,
      totalLessons: 0,
      completedLessons: 0,
      nextLesson: 'Enroll in a course to start learning',
      instructor: '',
      timeLeft: ''
    }
  ];

  const achievements = [
    { title: 'First Course Complete', icon: Trophy, unlocked: (userStats?.completed_courses || 0) >= 1 },
    { title: 'Perfect Attendance', icon: Star, unlocked: (userStats?.study_streak_days || 0) >= 7 },
    { title: 'Quick Learner', icon: Zap, unlocked: (userStats?.total_study_hours || 0) >= 10 },
    { title: 'Knowledge Master', icon: Brain, unlocked: (userStats?.completed_courses || 0) >= 3 },
    { title: 'Graduation Ready', icon: GraduationCap, unlocked: (userStats?.certificates_earned || 0) >= 1 }
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
              <span>Level {Math.floor((userStats?.total_study_hours || 0) / 10) + 1} Learner</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span>{achievements.filter(a => a.unlocked).length} Achievements</span>
            </div>
            <div className="flex items-center space-x-2">
              <Timer className="h-4 w-4" />
              <span>{userStats?.total_study_hours || 0} hours learned</span>
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