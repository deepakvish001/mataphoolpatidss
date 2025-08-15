-- Simple data population - insert only if not exists
DO $$
DECLARE
  user_rec RECORD;
  course_ids UUID[];
  first_course_id UUID;
  second_course_id UUID;
BEGIN
  -- Get available courses
  SELECT ARRAY_AGG(id) INTO course_ids FROM public.courses WHERE status = 'active';
  
  IF array_length(course_ids, 1) >= 2 THEN
    first_course_id := course_ids[1];
    second_course_id := course_ids[2];
    
    -- For each user, create data if it doesn't exist
    FOR user_rec IN SELECT user_id, full_name FROM public.profiles LOOP
      
      -- Create user stats if not exists
      IF NOT EXISTS (SELECT 1 FROM public.user_stats WHERE user_id = user_rec.user_id) THEN
        INSERT INTO public.user_stats (
          user_id, total_courses, completed_courses, certificates_earned, 
          study_streak_days, total_study_hours, last_activity
        ) VALUES (
          user_rec.user_id, 2, 1, 1, 7, 25, NOW()
        );
      END IF;
      
      -- Enroll in first course if not already enrolled
      IF NOT EXISTS (SELECT 1 FROM public.user_courses WHERE user_id = user_rec.user_id AND course_id = first_course_id) THEN
        INSERT INTO public.user_courses (
          user_id, course_id, progress, completed_lessons, status, enrolled_at
        ) VALUES (
          user_rec.user_id, first_course_id, 75, 8, 'active', NOW() - INTERVAL '14 days'
        );
      END IF;
      
      -- Enroll in second course if not already enrolled
      IF NOT EXISTS (SELECT 1 FROM public.user_courses WHERE user_id = user_rec.user_id AND course_id = second_course_id) THEN
        INSERT INTO public.user_courses (
          user_id, course_id, progress, completed_lessons, status, enrolled_at
        ) VALUES (
          user_rec.user_id, second_course_id, 30, 3, 'active', NOW() - INTERVAL '7 days'
        );
      END IF;
      
      -- Create notifications if they don't exist
      IF NOT EXISTS (SELECT 1 FROM public.notifications WHERE user_id = user_rec.user_id AND title = 'Welcome to MPDS!') THEN
        INSERT INTO public.notifications (user_id, title, message, type, is_read, created_at)
        VALUES (
          user_rec.user_id,
          'Welcome to MPDS!',
          'Your learning journey begins now. Complete your profile and explore our courses.',
          'info',
          false,
          NOW() - INTERVAL '2 days'
        );
      END IF;
      
      IF NOT EXISTS (SELECT 1 FROM public.notifications WHERE user_id = user_rec.user_id AND title = 'Course Progress Update') THEN
        INSERT INTO public.notifications (user_id, title, message, type, is_read, created_at)
        VALUES (
          user_rec.user_id,
          'Course Progress Update',
          'Great job! You have made excellent progress in your courses.',
          'success',
          true,
          NOW() - INTERVAL '1 day'
        );
      END IF;
      
      IF NOT EXISTS (SELECT 1 FROM public.notifications WHERE user_id = user_rec.user_id AND title = 'New Assignment Available') THEN
        INSERT INTO public.notifications (user_id, title, message, type, is_read, created_at)
        VALUES (
          user_rec.user_id,
          'New Assignment Available',
          'A new assignment has been posted. Check it out!',
          'info',
          false,
          NOW() - INTERVAL '6 hours'
        );
      END IF;
      
    END LOOP;
  END IF;
END $$;