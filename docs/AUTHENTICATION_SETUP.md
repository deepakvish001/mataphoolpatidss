# Authentication System Documentation

## Overview

This application implements a comprehensive authentication system with the following features:

- **Email/Password Authentication**: Standard login and signup flows
- **Role-Based Access Control (RBAC)**: Admin, moderator, and user roles
- **Session Management**: Automatic token refresh and session persistence  
- **Password Reset Flow**: Secure password reset via email
- **Multi-Factor Authentication Ready**: Infrastructure prepared for MFA implementation
- **Secure Implementation**: Following security best practices

## Architecture

### Database Schema

#### Profiles Table
```sql
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

#### User Roles Table
```sql
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
```

#### App Role Enum
```sql
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
```

### Security Functions

#### Role Checking Function
```sql
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;
```

### Row Level Security (RLS) Policies

- **Profiles**: Users can only view/edit their own profiles
- **User Roles**: Admins can manage all roles, users can view their own
- **Secure Functions**: All database functions use `SECURITY DEFINER` with empty search path

## Components

### Core Authentication Components

1. **AuthContext** (`src/contexts/AuthContext.tsx`)
   - Manages authentication state
   - Provides auth methods (signIn, signUp, signOut, etc.)
   - Handles session persistence and role management

2. **AuthGuard** (`src/components/auth/AuthGuard.tsx`)
   - Protects routes based on authentication status
   - Supports role-based access control
   - Automatic redirects for unauthorized users

3. **Auth Page** (`src/pages/Auth.tsx`)
   - Complete login/signup interface
   - Password reset functionality
   - Responsive design with security features display

4. **UserMenu** (`src/components/auth/UserMenu.tsx`)
   - User profile dropdown
   - Role display with color coding
   - Quick access to profile and logout

5. **ChangePassword** (`src/components/auth/ChangePassword.tsx`)
   - Secure password update component
   - Password strength validation
   - Success/error handling

6. **ResetPassword** (`src/pages/ResetPassword.tsx`)
   - Password reset completion page
   - Token validation
   - New password setting

## Features

### Authentication Flows

#### Sign Up Flow
1. User provides email, password, and full name
2. Supabase creates user account
3. Database trigger creates profile and assigns default 'user' role
4. Email confirmation sent (configurable)
5. User can log in after confirmation

#### Sign In Flow
1. User provides email and password
2. Supabase validates credentials
3. Session created with automatic refresh
4. User role fetched and stored in context
5. Redirect to appropriate dashboard

#### Password Reset Flow
1. User requests password reset with email
2. Supabase sends reset link with tokens
3. User clicks link and is redirected to reset page
4. New password is set and validated
5. User can log in with new password

### Role-Based Access Control

#### Role Hierarchy
- **Admin**: Full system access, can manage all users and roles
- **Moderator**: Limited admin functions, can manage users
- **User**: Standard user access, own data only

#### Permission Checking
```typescript
const { hasRole } = useAuth();

// Check specific role
if (hasRole('admin')) {
  // Admin-only functionality
}

// Role hierarchy (admin has all permissions)
if (hasRole('user')) {
  // Available to admin, moderator, and user
}
```

### Session Management

- **Automatic Token Refresh**: Supabase handles token renewal
- **Persistent Sessions**: Sessions survive browser restarts
- **Secure Storage**: Tokens stored in localStorage with encryption
- **Session Validation**: Automatic validation on app load

## Security Features

### Best Practices Implemented

1. **Secure Password Policies**
   - Minimum 6 characters (configurable)
   - Password confirmation on signup
   - Secure password reset flow

2. **Row Level Security**
   - All tables have RLS enabled
   - Users can only access their own data
   - Admin override policies for management functions

3. **CORS Protection**
   - Proper email redirect URLs
   - Site URL configuration required
   - Domain validation for redirects

4. **Function Security**
   - All functions use `SECURITY DEFINER`
   - Empty search path prevents injection
   - Minimal privilege access

5. **Error Handling**
   - No sensitive information in error messages
   - Proper validation feedback
   - Rate limiting ready (Supabase handles)

## Setup Instructions

### 1. Supabase Configuration

1. **Enable Authentication**
   - Go to Authentication > Settings in Supabase dashboard
   - Configure Site URL and Redirect URLs
   - Set appropriate password policies

2. **Email Configuration**
   - Configure email templates in Authentication > Email Templates
   - Set up SMTP settings for custom email provider (optional)
   - Configure redirect URLs for password reset

3. **URL Configuration**
   ```
   Site URL: https://your-domain.com
   Redirect URLs: 
   - https://your-domain.com/auth/reset-password
   - https://your-domain.com/
   ```

### 2. Environment Setup

The authentication system uses the existing Supabase configuration:
- Project URL and anon key are automatically configured
- No additional environment variables required
- All secrets managed through Supabase dashboard

### 3. Database Migration

The database schema is automatically created through migrations:
- Run migrations to create tables and functions
- RLS policies are applied automatically
- Default roles and triggers are set up

### 4. First Admin User

To create the first admin user:

```sql
-- After a user signs up, update their role to admin
UPDATE public.user_roles 
SET role = 'admin' 
WHERE user_id = 'user-uuid-here';
```

Or create an admin user directly:

```sql
-- Insert admin user (replace with actual user ID from auth.users)
INSERT INTO public.user_roles (user_id, role) 
VALUES ('user-uuid-here', 'admin');
```

## Usage Examples

### Protecting Routes

```typescript
// Require authentication
<AuthGuard>
  <ProtectedComponent />
</AuthGuard>

// Require specific role
<AuthGuard requiredRole="admin">
  <AdminOnlyComponent />
</AuthGuard>

// Custom redirect
<AuthGuard requiredRole="moderator" redirectTo="/unauthorized">
  <ModeratorComponent />
</AuthGuard>
```

### Using Auth Context

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { 
    user, 
    userRole, 
    loading, 
    signIn, 
    signOut, 
    hasRole 
  } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <p>Welcome, {user.email}</p>
      <p>Role: {userRole}</p>
      {hasRole('admin') && <AdminPanel />}
      <button onClick={signOut}>Logout</button>
    </div>
  );
}
```

### Password Management

```typescript
import { ChangePassword } from '@/components/auth/ChangePassword';

function SettingsPage() {
  return (
    <div>
      <h1>Account Settings</h1>
      <ChangePassword />
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Email Confirmation Not Working**
   - Check Site URL and Redirect URL configuration
   - Verify email provider settings
   - Check spam folder

2. **Permission Denied Errors**
   - Verify RLS policies are correct
   - Check user role assignments
   - Ensure proper session state

3. **Infinite Loading**
   - Check for auth state loops
   - Verify Supabase client configuration
   - Clear localStorage if needed

4. **Password Reset Issues**
   - Verify redirect URL configuration
   - Check email template settings
   - Ensure proper token handling

### Debug Tools

1. **Check Auth State**
   ```typescript
   import { supabase } from '@/integrations/supabase/client';
   
   // Get current session
   const { data: session } = await supabase.auth.getSession();
   console.log('Current session:', session);
   
   // Get current user
   const { data: user } = await supabase.auth.getUser();
   console.log('Current user:', user);
   ```

2. **Check User Role**
   ```typescript
   const { data: roles } = await supabase
     .from('user_roles')
     .select('role')
     .eq('user_id', user.id);
   console.log('User roles:', roles);
   ```

3. **Test RLS Policies**
   ```sql
   -- Test as specific user
   SELECT set_config('request.jwt.claims', '{"sub":"user-id-here"}', true);
   
   -- Test queries
   SELECT * FROM profiles;
   SELECT * FROM user_roles;
   ```

## Future Enhancements

### Multi-Factor Authentication (MFA)

The system is prepared for MFA implementation:
- User table ready for MFA preferences
- Auth flow supports additional verification steps
- UI components can be extended for MFA setup

### Social Authentication

Easy to add social providers:
- Supabase supports Google, GitHub, Facebook, etc.
- Auth context will automatically handle social login
- No code changes needed for basic social auth

### Advanced Permissions

Future role enhancements:
- Granular permissions per feature
- Custom role creation
- Time-limited access roles
- Department-based access control

## Security Considerations

### Production Checklist

- [ ] Configure proper CORS settings
- [ ] Set up email verification
- [ ] Enable rate limiting
- [ ] Configure password policies
- [ ] Set up monitoring and alerts
- [ ] Review RLS policies
- [ ] Test all authentication flows
- [ ] Configure session timeouts
- [ ] Set up backup admin access
- [ ] Document emergency procedures

### Regular Maintenance

- Monitor failed login attempts
- Review user roles and permissions
- Update security policies as needed
- Keep Supabase client updated
- Regular security audits
- Backup authentication configuration