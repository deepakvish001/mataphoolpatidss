-- Create franchise_certificates table for enhanced functionality
CREATE TABLE public.franchise_certificates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  franchise_id TEXT NOT NULL,
  franchise_name TEXT NOT NULL,
  centre_head TEXT NOT NULL,
  certificate_number TEXT NOT NULL UNIQUE,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  valid_from DATE NOT NULL,
  valid_to DATE NOT NULL,
  operating_area TEXT NOT NULL,
  location TEXT NOT NULL,
  registration_number TEXT NOT NULL,
  certificate_type TEXT NOT NULL DEFAULT 'Franchise Authorization',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.franchise_certificates ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for franchise certificates
CREATE POLICY "Admins can manage franchise_certificates" 
ON public.franchise_certificates 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_franchise_certificates_updated_at
  BEFORE UPDATE ON public.franchise_certificates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for better performance
CREATE INDEX idx_franchise_certificates_franchise_id ON public.franchise_certificates(franchise_id);
CREATE INDEX idx_franchise_certificates_certificate_number ON public.franchise_certificates(certificate_number);
CREATE INDEX idx_franchise_certificates_status ON public.franchise_certificates(status);
CREATE INDEX idx_franchise_certificates_issue_date ON public.franchise_certificates(issue_date DESC);

-- Add check constraints for valid values
ALTER TABLE public.franchise_certificates 
ADD CONSTRAINT check_certificate_status 
CHECK (status IN ('active', 'expired', 'revoked', 'pending'));

ALTER TABLE public.franchise_certificates 
ADD CONSTRAINT check_certificate_type 
CHECK (certificate_type IN ('Franchise Authorization', 'Renewal Certificate', 'Temporary Certificate'));

ALTER TABLE public.franchise_certificates 
ADD CONSTRAINT check_valid_dates 
CHECK (valid_to > valid_from);