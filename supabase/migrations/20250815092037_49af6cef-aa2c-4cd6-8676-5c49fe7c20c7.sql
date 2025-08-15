-- Phase 1: Fix User Data Initialization Issues

-- First, let's check if the trigger exists and fix the user stats creation
-- Drop existing trigger if it exists to recreate it properly
DROP TRIGGER IF EXISTS trigger_user_stats_creation ON public.profiles;
DROP FUNCTION IF EXISTS public.handle_user_stats_creation();

-- Create the user stats creation function
CREATE OR REPLACE FUNCTION public.handle_user_stats_creation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $$
BEGIN
  -- Insert user stats with default values
  INSERT INTO public.user_stats (
    user_id,
    total_courses,
    completed_courses,
    certificates_earned,
    study_streak_days,
    total_study_hours
  ) VALUES (
    NEW.user_id,
    0,
    0,
    0,
    1, -- Start with 1 day streak
    0
  );
  RETURN NEW;
END;
$$;

-- Create trigger to auto-create user stats when profile is created
CREATE TRIGGER trigger_user_stats_creation
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_user_stats_creation();

-- Create user stats for existing users who don't have them
INSERT INTO public.user_stats (user_id, total_courses, completed_courses, certificates_earned, study_streak_days, total_study_hours)
SELECT 
  p.user_id,
  0,
  0,
  0,
  1,
  5 -- Give them some initial study hours
FROM public.profiles p
LEFT JOIN public.user_stats us ON p.user_id = us.user_id
WHERE us.user_id IS NULL;

-- Create sample enrollments for existing users if they exist
DO $$
DECLARE
  user_record RECORD;
  course_record RECORD;
  course_count INTEGER := 0;
BEGIN
  -- Get all users
  FOR user_record IN SELECT user_id FROM public.profiles LIMIT 5 LOOP
    course_count := 0;
    
    -- Enroll user in first 2 available courses
    FOR course_record IN SELECT id FROM public.courses WHERE status = 'active' LIMIT 2 LOOP
      -- Check if user is already enrolled
      IF NOT EXISTS (
        SELECT 1 FROM public.user_courses 
        WHERE user_id = user_record.user_id AND course_id = course_record.id
      ) THEN
        INSERT INTO public.user_courses (user_id, course_id, progress, completed_lessons, status)
        VALUES (
          user_record.user_id,
          course_record.id,
          CASE 
            WHEN course_count = 0 THEN 45  -- First course 45% complete
            ELSE 20                        -- Second course 20% complete
          END,
          CASE 
            WHEN course_count = 0 THEN 8   -- 8 lessons completed
            ELSE 3                         -- 3 lessons completed  
          END,
          'active'
        );
        
        course_count := course_count + 1;
      END IF;
    END LOOP;
  END LOOP;
END $$;

-- Create sample assignments for enrolled users
DO $$
DECLARE
  user_course_record RECORD;
  assignment_record RECORD;
  assignment_count INTEGER := 0;
BEGIN
  -- For each user enrollment, create some user assignments
  FOR user_course_record IN 
    SELECT DISTINCT uc.user_id, uc.course_id 
    FROM public.user_courses uc 
    LIMIT 10 
  LOOP
    assignment_count := 0;
    
    -- Create assignments for this user/course combination
    FOR assignment_record IN 
      SELECT id FROM public.assignments 
      WHERE course_id = user_course_record.course_id 
      LIMIT 2
    LOOP
      -- Check if user assignment already exists
      IF NOT EXISTS (
        SELECT 1 FROM public.user_assignments 
        WHERE user_id = user_course_record.user_id 
        AND assignment_id = assignment_record.id
      ) THEN
        INSERT INTO public.user_assignments (user_id, assignment_id, status, grade)
        VALUES (
          user_course_record.user_id,
          assignment_record.id,
          CASE 
            WHEN assignment_count = 0 THEN 'submitted'  -- First assignment submitted
            ELSE 'pending'                              -- Second assignment pending
          END,
          CASE 
            WHEN assignment_count = 0 THEN 85           -- First assignment graded
            ELSE NULL                                   -- Second assignment not graded yet
          END
        );
        
        assignment_count := assignment_count + 1;
      END IF;
    END LOOP;
  END LOOP;
END $$;

-- Create sample notifications for users
DO $$
DECLARE
  user_record RECORD;
  notification_count INTEGER := 0;
BEGIN
  FOR user_record IN SELECT user_id FROM public.profiles LIMIT 5 LOOP
    -- Welcome notification
    IF NOT EXISTS (
      SELECT 1 FROM public.notifications 
      WHERE user_id = user_record.user_id AND title = 'Welcome to MPDS!'
    ) THEN
      INSERT INTO public.notifications (user_id, title, message, type, is_read)
      VALUES (
        user_record.user_id,
        'Welcome to MPDS!',
        'Your learning journey begins now. Complete your profile and explore our courses.',
        'info',
        false
      );
    END IF;
    
    -- Course enrollment notification
    IF NOT EXISTS (
      SELECT 1 FROM public.notifications 
      WHERE user_id = user_record.user_id AND title = 'Course Enrolled Successfully'
    ) THEN
      INSERT INTO public.notifications (user_id, title, message, type, is_read)
      VALUES (
        user_record.user_id,
        'Course Enrolled Successfully',
        'You have been enrolled in your selected courses. Start learning today!',
        'success',
        false
      );
    END IF;
    
    -- Assignment due reminder
    IF NOT EXISTS (
      SELECT 1 FROM public.notifications 
      WHERE user_id = user_record.user_id AND title = 'Assignment Due Soon'
    ) THEN
      INSERT INTO public.notifications (user_id, title, message, type, is_read)
      VALUES (
        user_record.user_id,
        'Assignment Due Soon',
        'You have pending assignments due within the next 7 days. Please complete them on time.',
        'warning',
        true  -- This one is read
      );
    END IF;
  END LOOP;
END $$;

-- Update user stats based on actual enrollments and completions
UPDATE public.user_stats 
SET 
  total_courses = (
    SELECT COUNT(*) 
    FROM public.user_courses uc 
    WHERE uc.user_id = user_stats.user_id
  ),
  completed_courses = (
    SELECT COUNT(*) 
    FROM public.user_courses uc 
    WHERE uc.user_id = user_stats.user_id AND uc.status = 'completed'
  ),
  certificates_earned = (
    SELECT COUNT(*) 
    FROM public.certificates c 
    WHERE c.user_id = user_stats.user_id
  ),
  total_study_hours = CASE 
    WHEN total_study_hours = 0 THEN 15  -- Give some initial hours
    ELSE total_study_hours 
  END,
  study_streak_days = CASE 
    WHEN study_streak_days = 0 THEN 3   -- Give some initial streak
    ELSE study_streak_days 
  END
WHERE EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = user_stats.user_id);