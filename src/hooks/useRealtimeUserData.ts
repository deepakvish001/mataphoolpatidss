import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface UserCourse {
  id: string;
  course_id: string;
  progress: number;
  completed_lessons: number;
  status: string;
  courses: {
    title: string;
    instructor: string;
    total_lessons: number;
    duration_weeks: number;
  };
}

interface UserAssignment {
  id: string;
  assignment_id: string;
  status: string;
  submitted_at?: string;
  assignments: {
    title: string;
    description: string;
    due_date: string;
    course_id: string;
  };
}

interface Certificate {
  id: string;
  course_id: string;
  certificate_number: string;
  issued_date: string;
  courses: {
    title: string;
  };
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

interface UserStats {
  total_courses: number;
  completed_courses: number;
  certificates_earned: number;
  study_streak_days: number;
  total_study_hours: number;
  last_activity: string;
}

export const useRealtimeUserData = () => {
  const { user } = useAuth();
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [userAssignments, setUserAssignments] = useState<UserAssignment[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchAllData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel for better performance
        const [coursesResult, assignmentsResult, certificatesResult, notificationsResult, statsResult] = await Promise.all([
          // Fetch user courses
          supabase
            .from('user_courses')
            .select(`
              *,
              courses:course_id (
                title,
                instructor,
                total_lessons,
                duration_weeks
              )
            `)
            .eq('user_id', user.id),

          // Fetch user assignments  
          supabase
            .from('user_assignments')
            .select(`
              *,
              assignments:assignment_id (
                title,
                description,
                due_date,
                course_id
              )
            `)
            .eq('user_id', user.id),

          // Fetch certificates
          supabase
            .from('certificates')
            .select(`
              *,
              courses:course_id (
                title
              )
            `)
            .eq('user_id', user.id),

          // Fetch notifications
          supabase
            .from('notifications')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(10),

          // Fetch user stats
          supabase
            .from('user_stats')
            .select('*')
            .eq('user_id', user.id)
            .maybeSingle()
        ]);

        // Handle results with error checking
        if (coursesResult.error) {
          console.error('Error fetching courses:', coursesResult.error);
        } else if (coursesResult.data) {
          setUserCourses(coursesResult.data);
        }

        if (assignmentsResult.error) {
          console.error('Error fetching assignments:', assignmentsResult.error);
        } else if (assignmentsResult.data) {
          setUserAssignments(assignmentsResult.data);
        }

        if (certificatesResult.error) {
          console.error('Error fetching certificates:', certificatesResult.error);
        } else if (certificatesResult.data) {
          setCertificates(certificatesResult.data);
        }

        if (notificationsResult.error) {
          console.error('Error fetching notifications:', notificationsResult.error);
        } else if (notificationsResult.data) {
          setNotifications(notificationsResult.data);
        }

        if (statsResult.error) {
          console.error('Error fetching stats:', statsResult.error);
        } else if (statsResult.data) {
          setUserStats(statsResult.data);
        } else {
          // Create default stats if none exist
          setUserStats({
            total_courses: 0,
            completed_courses: 0,
            certificates_earned: 0,
            study_streak_days: 1,
            total_study_hours: 0,
            last_activity: new Date().toISOString()
          });
        }

      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();

    // Set up real-time subscriptions
    const courseChannel = supabase
      .channel('user-courses-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_courses',
        filter: `user_id=eq.${user.id}`
      }, () => {
        // Refetch courses data
        supabase
          .from('user_courses')
          .select(`
            *,
            courses:course_id (
              title,
              instructor,
              total_lessons,
              duration_weeks
            )
          `)
          .eq('user_id', user.id)
          .then(({ data }) => {
            if (data) setUserCourses(data);
          });
      })
      .subscribe();

    const assignmentChannel = supabase
      .channel('user-assignments-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_assignments',
        filter: `user_id=eq.${user.id}`
      }, () => {
        // Refetch assignments data
        supabase
          .from('user_assignments')
          .select(`
            *,
            assignments:assignment_id (
              title,
              description,
              due_date,
              course_id
            )
          `)
          .eq('user_id', user.id)
          .then(({ data }) => {
            if (data) setUserAssignments(data);
          });
      })
      .subscribe();

    const notificationChannel = supabase
      .channel('notifications-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${user.id}`
      }, () => {
        // Refetch notifications
        supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(10)
          .then(({ data }) => {
            if (data) setNotifications(data);
          });
      })
      .subscribe();

    const statsChannel = supabase
      .channel('user-stats-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_stats',
        filter: `user_id=eq.${user.id}`
      }, () => {
        // Refetch stats
        supabase
          .from('user_stats')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle()
          .then(({ data }) => {
            if (data) setUserStats(data);
          });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(courseChannel);
      supabase.removeChannel(assignmentChannel);
      supabase.removeChannel(notificationChannel);
      supabase.removeChannel(statsChannel);
    };
  }, [user]);

  const markNotificationAsRead = async (notificationId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error marking notification as read:', error);
        throw error;
      }
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const updateCourseProgress = async (courseId: string, progress: number, completedLessons: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_courses')
        .update({ 
          progress, 
          completed_lessons: completedLessons,
          status: progress === 100 ? 'completed' : 'active'
        })
        .eq('user_id', user.id)
        .eq('course_id', courseId);

      if (error) {
        console.error('Error updating course progress:', error);
        throw error;
      }
    } catch (error) {
      console.error('Failed to update course progress:', error);
    }
  };

  return {
    userCourses,
    userAssignments,
    certificates,
    notifications,
    userStats,
    loading,
    markNotificationAsRead,
    updateCourseProgress,
    unreadNotificationsCount: notifications.filter(n => !n.is_read).length
  };
};