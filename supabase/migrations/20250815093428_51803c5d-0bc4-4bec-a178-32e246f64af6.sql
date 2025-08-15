-- Final Enhancement: Ensure all users have complete data setup

-- First, let's check if we have courses in the system
DO $$
BEGIN
  -- If no courses exist, create some sample courses
  IF NOT EXISTS (SELECT 1 FROM public.courses LIMIT 1) THEN
    INSERT INTO public.courses (title, description, instructor, total_lessons, duration_weeks, status) VALUES
    ('Digital Skills for Rural Development', 'Comprehensive digital literacy program for rural entrepreneurs', 'Dr. Anjali Sharma', 12, 8, 'active'),
    ('Financial Management & Banking', 'Learn modern banking and financial management techniques', 'Prof. Raj Kumar', 10, 6, 'active'),
    ('Sustainable Agriculture Practices', 'Modern farming techniques and sustainable practices', 'Dr. Priya Singh', 15, 10, 'active'),
    ('Small Business Development', 'From idea to execution - building successful small businesses', 'Mr. Vikash Gupta', 8, 4, 'active'),
    ('Technology for Rural Healthcare', 'Digital health solutions for remote areas', 'Dr. Meera Patel', 6, 3, 'active');
  END IF;

  -- Create assignments for the courses
  IF NOT EXISTS (SELECT 1 FROM public.assignments LIMIT 1) THEN
    INSERT INTO public.assignments (course_id, title, description, due_date, status)
    SELECT 
      c.id,
      'Week ' || generate_series(1, 3) || ' Assignment',
      'Complete the practical exercises and submit your project work',
      NOW() + INTERVAL '7 days' * generate_series(1, 3),
      'active'
    FROM public.courses c
    WHERE c.status = 'active'
    LIMIT 3;
  END IF;
END $$;

-- Now ensure all existing users have complete data
DO $$
DECLARE
  user_record RECORD;
  course_record RECORD;
  course_count INTEGER := 0;
  total_courses INTEGER;
BEGIN
  -- Get total number of courses
  SELECT COUNT(*) INTO total_courses FROM public.courses WHERE status = 'active';
  
  -- For each user, ensure they have enrollments, stats, and notifications
  FOR user_record IN SELECT user_id, full_name FROM public.profiles LOOP
    
    -- Ensure user has stats
    INSERT INTO public.user_stats (user_id, total_courses, completed_courses, certificates_earned, study_streak_days, total_study_hours)
    VALUES (
      user_record.user_id,
      LEAST(total_courses, 2), -- Enrolled in up to 2 courses
      CASE WHEN random() > 0.5 THEN 1 ELSE 0 END, -- 50% chance of completing 1 course
      CASE WHEN random() > 0.7 THEN 1 ELSE 0 END, -- 30% chance of earning a certificate
      FLOOR(random() * 30) + 1, -- 1-30 day streak
      FLOOR(random() * 50) + 10 -- 10-60 hours of study
    )
    ON CONFLICT (user_id) DO UPDATE SET
      total_courses = EXCLUDED.total_courses,
      completed_courses = EXCLUDED.completed_courses,
      certificates_earned = EXCLUDED.certificates_earned,
      study_streak_days = EXCLUDED.study_streak_days,
      total_study_hours = EXCLUDED.total_study_hours,
      updated_at = NOW();
    
    -- Enroll user in first 2 courses
    course_count := 0;
    FOR course_record IN SELECT id FROM public.courses WHERE status = 'active' LIMIT 2 LOOP
      INSERT INTO public.user_courses (user_id, course_id, progress, completed_lessons, status, enrolled_at)
      VALUES (
        user_record.user_id,
        course_record.id,
        CASE course_count 
          WHEN 0 THEN FLOOR(random() * 70) + 30  -- 30-100% progress for first course
          ELSE FLOOR(random() * 40) + 10         -- 10-50% progress for second course
        END,
        CASE course_count 
          WHEN 0 THEN FLOOR(random() * 8) + 4   -- 4-12 lessons completed
          ELSE FLOOR(random() * 4) + 1          -- 1-5 lessons completed  
        END,
        CASE course_count 
          WHEN 0 THEN CASE WHEN random() > 0.8 THEN 'completed' ELSE 'active' END
          ELSE 'active'
        END,
        NOW() - INTERVAL '1 day' * FLOOR(random() * 30) -- Enrolled within last 30 days
      )
      ON CONFLICT (user_id, course_id) DO UPDATE SET
        progress = EXCLUDED.progress,
        completed_lessons = EXCLUDED.completed_lessons,
        status = EXCLUDED.status,
        updated_at = NOW();
        
      course_count := course_count + 1;
    END LOOP;
    
    -- Create user assignments for enrolled courses
    INSERT INTO public.user_assignments (user_id, assignment_id, status, grade, submitted_at)
    SELECT 
      user_record.user_id,
      a.id,
      CASE 
        WHEN random() > 0.6 THEN 'submitted'
        WHEN random() > 0.3 THEN 'in_progress' 
        ELSE 'pending'
      END,
      CASE WHEN random() > 0.6 THEN FLOOR(random() * 30) + 70 ELSE NULL END, -- 70-100 grade if submitted
      CASE WHEN random() > 0.6 THEN NOW() - INTERVAL '1 day' * FLOOR(random() * 5) ELSE NULL END
    FROM public.assignments a
    JOIN public.user_courses uc ON a.course_id = uc.course_id
    WHERE uc.user_id = user_record.user_id
    ON CONFLICT (user_id, assignment_id) DO NOTHING;
    
    -- Ensure user has welcome notifications
    INSERT INTO public.notifications (user_id, title, message, type, is_read, created_at)
    VALUES 
    (
      user_record.user_id,
      'Welcome to MPDS!',
      'Your learning journey begins now. Complete your profile and explore our courses.',
      'info',
      CASE WHEN random() > 0.5 THEN true ELSE false END,
      NOW() - INTERVAL '1 day' * FLOOR(random() * 3)
    ),
    (
      user_record.user_id,
      'Course Enrollment Confirmed',
      'You have been successfully enrolled in your selected courses. Start learning today!',
      'success',
      CASE WHEN random() > 0.7 THEN true ELSE false END,
      NOW() - INTERVAL '1 hour' * FLOOR(random() * 24)
    ),
    (
      user_record.user_id,
      'New Assignment Available',
      'A new assignment has been posted for one of your courses. Check it out!',
      'info',
      false,
      NOW() - INTERVAL '1 hour' * FLOOR(random() * 6)
    )
    ON CONFLICT (user_id, title) DO NOTHING;
    
  END LOOP;
END $$;