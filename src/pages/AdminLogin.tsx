import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Loader2, Shield, Lock, Mail, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminLogin: React.FC = () => {
  const { user, userRole, signIn, resetPassword, loading, hasRole } = useAuth();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  
  // Sign In form
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  
  // Password Reset form
  const [resetEmail, setResetEmail] = useState('');

  // Redirect logic based on user role
  if (user && !loading) {
    if (hasRole('admin')) {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      // User is authenticated but not admin - show error
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red/10 via-background to-orange/10 p-4">
          <Card className="w-full max-w-md shadow-lg border-red-200">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold text-red-600">Access Denied</h3>
                  <p className="text-muted-foreground">You don't have admin privileges.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your current role: {userRole}
                  </p>
                </div>
                <div className="space-y-2">
                  <Button onClick={() => window.location.href = '/user/dashboard'} className="w-full">
                    Go to User Dashboard
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/'} className="w-full">
                    Back to Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { error } = await signIn(signInData.email, signInData.password);
    
    if (!error) {
      // Check if user has admin role after successful login
      // Navigation will be handled by the redirect logic above
    }
    
    setIsLoading(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await resetPassword(resetEmail);
    setResetEmail('');
    
    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red/10 via-background to-orange/10">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red/10 via-background to-orange/10 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Shield className="h-8 w-8 text-red-600" />
            <h1 className="text-2xl font-bold">Admin Portal</h1>
          </div>
          <p className="text-muted-foreground">
            Secure access for administrators only
          </p>
        </div>

        <Card className="shadow-lg border-red-100">
          <CardHeader className="space-y-1">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-600" />
              <CardTitle className="text-xl">Administrator Access</CardTitle>
            </div>
            <CardDescription>
              Sign in with your admin credentials
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Alert className="mb-4 border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Admin Only:</strong> This portal is restricted to users with administrator privileges.
              </AlertDescription>
            </Alert>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Admin Sign In</TabsTrigger>
                <TabsTrigger value="reset">Reset Password</TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-signin-email">Admin Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="admin-signin-email"
                        type="email"
                        placeholder="Enter admin email"
                        className="pl-10"
                        value={signInData.email}
                        onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="admin-signin-password">Admin Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="admin-signin-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter admin password"
                        className="pl-10 pr-10"
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Authenticating...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Sign In
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Password Reset Tab */}
              <TabsContent value="reset" className="space-y-4">
                <form onSubmit={handlePasswordReset} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-reset-email">Admin Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="admin-reset-email"
                        type="email"
                        placeholder="Enter admin email"
                        className="pl-10"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Reset Link...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <Separator className="my-6" />
            
            {/* Admin Features */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Admin Features</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs bg-red-500/10 text-red-600 border-red-500/20">
                  User Management
                </Badge>
                <Badge variant="secondary" className="text-xs bg-orange-500/10 text-orange-600 border-orange-500/20">
                  System Control
                </Badge>
                <Badge variant="secondary" className="text-xs bg-purple-500/10 text-purple-600 border-purple-500/20">
                  Full Access
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Access Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Not an admin? 
            <a href="/user-login" className="text-primary hover:underline ml-1">
              User Login
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 Mata Phoolpati Devi Shikshan Sansthan</p>
          <p>Secure admin access portal</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;