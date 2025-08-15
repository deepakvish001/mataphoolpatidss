import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AuthMiddlewareProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: 'admin' | 'moderator' | 'user';
  fallbackPath?: string;
  showAccessDenied?: boolean;
}

export const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({
  children,
  requireAuth = true,
  requireRole,
  fallbackPath = '/user-login',
  showAccessDenied = true
}) => {
  const { user, userRole, loading, hasRole } = useAuth();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Authenticating...</p>
        </div>
      </div>
    );
  }

  // Check authentication requirement
  if (requireAuth && !user) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check role requirement
  if (requireRole && user && !hasRole(requireRole)) {
    if (!showAccessDenied) {
      return <Navigate to={fallbackPath} state={{ from: location }} replace />;
    }

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-destructive/5 via-background to-destructive/10 p-4">
        <Card className="w-full max-w-md shadow-lg border-destructive/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              {/* Icon */}
              <div className="flex justify-center">
                {requireRole === 'admin' ? (
                  <Shield className="h-16 w-16 text-destructive" />
                ) : (
                  <AlertTriangle className="h-16 w-16 text-destructive" />
                )}
              </div>
              
              {/* Error Content */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-destructive">Access Denied</h2>
                <p className="text-muted-foreground">
                  You don't have permission to access this area.
                </p>
                {requireRole && (
                  <div className="text-sm text-muted-foreground bg-destructive/5 p-3 rounded-md border border-destructive/20">
                    <p><strong>Required Role:</strong> {requireRole}</p>
                    <p><strong>Your Role:</strong> {userRole || 'none'}</p>
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                {userRole === 'user' && (
                  <Button 
                    onClick={() => window.location.href = '/user/dashboard'} 
                    className="w-full"
                  >
                    Go to User Dashboard
                  </Button>
                )}
                {userRole === 'admin' && requireRole !== 'admin' && (
                  <Button 
                    onClick={() => window.location.href = '/admin/dashboard'} 
                    className="w-full"
                  >
                    Go to Admin Dashboard
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/'} 
                  className="w-full"
                >
                  Back to Home
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => window.location.href = '/user-login'} 
                  className="w-full text-sm"
                >
                  Switch Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // All checks passed, render children
  return <>{children}</>;
};

// Helper components for common use cases
export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthMiddleware requireAuth={true}>
    {children}
  </AuthMiddleware>
);

export const RequireAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthMiddleware requireAuth={true} requireRole="admin" fallbackPath="/admin-login">
    {children}
  </AuthMiddleware>
);

export const RequireUser: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthMiddleware requireAuth={true} requireRole="user" fallbackPath="/user-login">
    {children}
  </AuthMiddleware>
);

export const RequireModerator: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthMiddleware requireAuth={true} requireRole="moderator" fallbackPath="/user-login">
    {children}
  </AuthMiddleware>
);