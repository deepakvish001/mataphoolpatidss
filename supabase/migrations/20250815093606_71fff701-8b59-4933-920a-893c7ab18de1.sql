-- Simple data population for existing users
DO $$
DECLARE
  user_rec RECORD;
  course_rec RECORD;
  course_ids UUID[];
BEGIN
  -- Get all available courses
  SELECT ARRAY_AGG(id) INTO course_ids FROM public.courses WHERE status = 'active';
  
  -- For each user, create basic data
  FOR user_rec IN SELECT user_id, full_name FROM public.profiles LOOP
    
    -- Create user stats if not exists
    INSERT INTO public.user_stats (
      user_id, 
      total_courses, 
      completed_courses, 
      certificates_earned, 
      study_streak_days, 
      total_study_hours,
      last_activity
    ) VALUES (
      user_rec.user_id,
      2,  -- Total enrolled courses
      1,  -- Completed courses
      1,  -- Certificates earned
      7,  -- 7 day streak
      25, -- 25 hours studied
      NOW()
    ) ON CONFLICT (user_id) DO UPDATE SET
      total_courses = 2,
      completed_courses = 1,
      certificates_earned = 1,
      study_streak_days = 7,
      total_study_hours = 25,
      last_activity = NOW(),
      updated_at = NOW();
    
    -- Enroll user in first course with good progress
    IF array_length(course_ids, 1) >= 1 THEN
      INSERT INTO public.user_courses (
        user_id, 
        course_id, 
        progress, 
        completed_lessons, 
        status,
        enrolled_at
      ) VALUES (
        user_rec.user_id,
        course_ids[1],
        75, -- 75% progress
        8,  -- 8 lessons completed
        'active',
        NOW() - INTERVAL '14 days'
      ) ON CONFLICT (user_id, course_id) DO UPDATE SET
        progress = 75,
        completed_lessons = 8,
        status = 'active',
        updated_at = NOW();
    END IF;
    
    -- Enroll user in second course with some progress
    IF array_length(course_ids, 1) >= 2 THEN
      INSERT INTO public.user_courses (
        user_id, 
        course_id, 
        progress, 
        completed_lessons, 
        status,
        enrolled_at
      ) VALUES (
        user_rec.user_id,
        course_ids[2],
        30, -- 30% progress
        3,  -- 3 lessons completed
        'active',
        NOW() - INTERVAL '7 days'
      ) ON CONFLICT (user_id, course_id) DO UPDATE SET
        progress = 30,
        completed_lessons = 3,
        status = 'active',
        updated_at = NOW();
    END IF;
    
    -- Create welcome notifications
    INSERT INTO public.notifications (
      user_id,
      title,
      message,
      type,
      is_read,
      created_at
    ) VALUES 
    (
      user_rec.user_id,
      'Welcome to MPDS!',
      'Your learning journey begins now. Complete your profile and explore our courses.',
      'info',
      false,
      NOW() - INTERVAL '2 days'
    ),
    (
      user_rec.user_id,
      'Course Progress Update',
      'Great job! You''ve completed 75% of your Digital Skills course.',
      'success',
      true,
      NOW() - INTERVAL '1 day'
    ),
    (
      user_rec.user_id,
      'New Assignment Available',
      'A new assignment has been posted for your Financial Management course.',
      'info',
      false,
      NOW() - INTERVAL '6 hours'
    )
    ON CONFLICT (user_id, title) DO NOTHING;
    
  END LOOP;
END $$;