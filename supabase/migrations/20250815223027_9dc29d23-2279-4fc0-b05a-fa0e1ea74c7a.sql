-- Create table for student admit cards
CREATE TABLE public.student_admit_cards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  mothers_name TEXT,
  fathers_name TEXT,
  roll_number TEXT NOT NULL,
  course_name TEXT NOT NULL,
  exam_center_code TEXT,
  exam_center_address TEXT,
  exam_date DATE,
  batch TEXT,
  reporting_time TEXT,
  gate_closing_time TEXT,
  exam_start_time TEXT,
  exam_duration TEXT,
  student_photo_url TEXT,
  pwd_status TEXT DEFAULT 'No',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.student_admit_cards ENABLE ROW LEVEL SECURITY;

-- Create policies for student admit cards
CREATE POLICY "Admins can manage student_admit_cards" 
ON public.student_admit_cards 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create function to update timestamps
CREATE TRIGGER update_student_admit_cards_updated_at
BEFORE UPDATE ON public.student_admit_cards
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();