import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Target, Award, TrendingUp, ArrowRight, Sparkles, Trophy, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

const QuickAccess: React.FC = () => {
  const auth = useAuth();
  
  // Safety check for auth context
  if (!auth) {
    console.log('QuickAccess: No auth context available');
    return null;
  }
  
  const { user, userRole } = auth;

  if (!user) return null;

  const quickActions = [
    {
      title: 'Continue Learning',
      description: 'Resume your current courses',
      icon: BookOpen,
      href: userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'View Progress',
      description: 'Check your achievements',
      icon: TrendingUp,
      href: '/user/profile',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Certificates',
      description: 'Download your certificates',
      icon: Award,
      href: '/user/certificates',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Assignments',
      description: 'Complete pending tasks',
      icon: Target,
      href: '/user/assignments',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <Badge variant="secondary" className="px-4 py-1">
              Welcome Back!
            </Badge>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Continue Your Learning Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pick up where you left off and achieve your learning goals with our comprehensive courses and resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} to={action.href} className="group">
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden h-full">
                  <div className={`h-2 bg-gradient-to-r ${action.color}`}></div>
                  <CardContent className="pt-6">
                    <div className={`${action.bgColor} rounded-xl p-4 mb-4`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${action.color} text-white`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/90">
            <Link to={userRole === 'admin' ? '/admin/dashboard' : '/user/dashboard'}>
              <Trophy className="h-5 w-5 mr-2" />
              Go to {userRole === 'admin' ? 'Admin' : 'My'} Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;