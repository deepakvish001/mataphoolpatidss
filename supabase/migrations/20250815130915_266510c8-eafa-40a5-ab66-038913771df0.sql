-- Enable real-time for all admin tables
ALTER TABLE IF EXISTS public.head_offices REPLICA IDENTITY FULL;
ALTER TABLE IF EXISTS public.student_profiles REPLICA IDENTITY FULL;
ALTER TABLE IF EXISTS public.courses REPLICA IDENTITY FULL;
ALTER TABLE IF EXISTS public.assignments REPLICA IDENTITY FULL;
ALTER TABLE IF EXISTS public.certificates REPLICA IDENTITY FULL;
ALTER TABLE IF EXISTS public.notifications REPLICA IDENTITY FULL;
ALTER TABLE IF EXISTS public.user_courses REPLICA IDENTITY FULL;
ALTER TABLE IF EXISTS public.user_assignments REPLICA IDENTITY FULL;
ALTER TABLE IF EXISTS public.user_stats REPLICA IDENTITY FULL;
ALTER TABLE IF EXISTS public.profiles REPLICA IDENTITY FULL;
ALTER TABLE IF EXISTS public.user_roles REPLICA IDENTITY FULL;

-- Add tables to real-time publication
ALTER PUBLICATION supabase_realtime ADD TABLE IF EXISTS public.head_offices;
ALTER PUBLICATION supabase_realtime ADD TABLE IF EXISTS public.student_profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE IF EXISTS public.courses;
ALTER PUBLICATION supabase_realtime ADD TABLE IF EXISTS public.assignments;
ALTER PUBLICATION supabase_realtime ADD TABLE IF EXISTS public.certificates;
ALTER PUBLICATION supabase_realtime ADD TABLE IF EXISTS public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE IF EXISTS public.user_courses;
ALTER PUBLICATION supabase_realtime ADD TABLE IF EXISTS public.user_assignments;
ALTER PUBLICATION supabase_realtime ADD TABLE IF EXISTS public.user_stats;
ALTER PUBLICATION supabase_realtime ADD TABLE IF EXISTS public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE IF EXISTS public.user_roles;