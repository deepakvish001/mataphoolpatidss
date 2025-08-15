import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

type AppRole = 'admin' | 'moderator' | 'user';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  userRole: AppRole | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: AuthError | null }>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
  updatePassword: (password: string) => Promise<{ error: AuthError | null }>;
  updateProfile: (data: { full_name?: string; phone?: string }) => Promise<{ error: any }>;
  hasRole: (role: AppRole) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Force clear any existing state and sessions on app initialization
  useEffect(() => {
    const clearAllSessions = async () => {
      console.log('Force clearing all existing sessions...');
      
      // Clear all storage first
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear Supabase session with global scope
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (e) {
        console.log('Session already cleared or error:', e);
      }
      
      // Ensure state is clean
      setUser(null);
      setSession(null);
      setUserRole(null);
      
      console.log('All sessions forcefully cleared');
    };
    
    clearAllSessions();
  }, []);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session ? 'session exists' : 'no session');
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user role after setting user state
          try {
            const { data } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', session.user.id)
              .maybeSingle();
            
            console.log('User role fetched:', data?.role || 'user');
            setUserRole(data?.role || 'user');
          } catch (error) {
            console.error('Error fetching user role:', error);
            setUserRole('user');
          }
        } else {
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Initial session check:', session ? `session exists for user: ${session.user.email}` : 'no session');
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        try {
          const { data } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .maybeSingle();
          
          console.log('Initial user role:', data?.role || 'user');
          setUserRole(data?.role || 'user');
        } catch (error) {
          console.error('Error fetching user role:', error);
          setUserRole('user');
        }
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName
          }
        }
      });

      if (error) {
        toast({
          title: "Signup Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Check your email",
          description: "We've sent you a confirmation link."
        });
      }

      return { error };
    } catch (error: any) {
      const authError = error as AuthError;
      toast({
        title: "Signup Error",
        description: authError.message,
        variant: "destructive"
      });
      return { error: authError };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Login Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in."
        });
      }

      return { error };
    } catch (error: any) {
      const authError = error as AuthError;
      toast({
        title: "Login Error",
        description: authError.message,
        variant: "destructive"
      });
      return { error: authError };
    }
  };

  const signOut = async () => {
    try {
      console.log('Force clearing all authentication data...');
      
      // Clear all auth state immediately
      setUser(null);
      setSession(null);
      setUserRole(null);
      
      // Clear Supabase session with all scopes
      await supabase.auth.signOut({ scope: 'global' });
      
      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear specific Supabase keys that might persist
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('sb-') || key.includes('supabase')) {
          localStorage.removeItem(key);
        }
      });
      
      console.log('All authentication data cleared');
      
      // Force page reload to ensure completely clean state
      window.location.href = '/';
    } catch (error: any) {
      console.error('Sign out error:', error);
      // Force clear even on error
      setUser(null);
      setSession(null);
      setUserRole(null);
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const redirectUrl = `${window.location.origin}/auth/reset-password`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl
      });

      if (error) {
        toast({
          title: "Password Reset Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Check your email",
          description: "We've sent you a password reset link."
        });
      }

      return { error };
    } catch (error: any) {
      const authError = error as AuthError;
      toast({
        title: "Password Reset Error",
        description: authError.message,
        variant: "destructive"
      });
      return { error: authError };
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password
      });

      if (error) {
        toast({
          title: "Password Update Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Password updated",
          description: "Your password has been successfully updated."
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "Password Update Error",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  const updateProfile = async (data: { full_name?: string; phone?: string }) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          ...data
        });

      if (error) {
        toast({
          title: "Profile Update Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Profile updated",
          description: "Your profile has been successfully updated."
        });
      }

      return { error };
    } catch (error: any) {
      toast({
        title: "Profile Update Error",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  const hasRole = (role: AppRole): boolean => {
    if (!userRole) return false;
    
    // Admin has all permissions
    if (userRole === 'admin') return true;
    
    // Moderator has user permissions
    if (userRole === 'moderator' && role === 'user') return true;
    
    // Exact role match
    return userRole === role;
  };

  const value: AuthContextType = {
    user,
    session,
    userRole,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};