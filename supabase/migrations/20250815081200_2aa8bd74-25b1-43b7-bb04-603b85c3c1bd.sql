-- Update the user to admin role
UPDATE public.user_roles 
SET role = 'admin' 
WHERE user_id = '26e21e52-e866-4320-aeca-a0978f294cee';

-- Verify the update
SELECT * FROM public.user_roles WHERE user_id = '26e21e52-e866-4320-aeca-a0978f294cee';