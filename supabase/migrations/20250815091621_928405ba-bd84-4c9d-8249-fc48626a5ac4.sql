-- Insert sample courses
INSERT INTO public.courses (title, description, instructor, total_lessons, duration_weeks) VALUES 
('Advanced Computer Skills', 'Learn advanced computer operations and software skills', 'Dr. Smith', 24, 8),
('Digital Marketing Basics', 'Introduction to digital marketing strategies', 'Prof. Johnson', 16, 6),
('Web Development Fundamentals', 'Learn HTML, CSS, and JavaScript basics', 'Ms. Wilson', 20, 10);

-- Insert sample assignments
INSERT INTO public.assignments (course_id, title, description, due_date) 
SELECT 
  c.id,
  'Module ' || generate_series(1, 3) || ' Assignment',
  'Complete the exercises for module ' || generate_series(1, 3),
  now() + interval '7 days'
FROM public.courses c
LIMIT 3;