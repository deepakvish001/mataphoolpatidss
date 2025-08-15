import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, CheckCircle, Loader2, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ChangePasswordContent = () => {
  const { user } = useAuth();
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }));
  };

  const validateForm = () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error("Please fill in all password fields");
      return false;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return false;
    }

    if (formData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return false;
    }

    if (formData.currentPassword === formData.newPassword) {
      toast.error("New password must be different from current password");
      return false;
    }

    return true;
  };

  const handleChangePassword = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // First verify current password by trying to sign in with it
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: user?.email || "",
        password: formData.currentPassword
      });

      if (verifyError) {
        toast.error("Current password is incorrect");
        return;
      }

      // Update password in Supabase
      const { error: updateError } = await supabase.auth.updateUser({
        password: formData.newPassword
      });

      if (updateError) {
        throw updateError;
      }

      // Success
      setIsSuccess(true);
      toast.success("Password changed successfully!");
      
      // Clear form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

      // Log the password change activity
      try {
        await (supabase as any)
          .from('notifications')
          .insert({
            user_id: user?.id,
            title: 'Password Changed',
            message: 'Your password was successfully updated for security.',
            type: 'security'
          });
      } catch (notificationError) {
        console.error('Failed to log password change:', notificationError);
      }

    } catch (error: any) {
      console.error('Password change error:', error);
      toast.error(error.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setIsSuccess(false);
    toast.info("Form reset");
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "", color: "" };
    if (password.length < 6) return { strength: 25, label: "Too Short", color: "bg-red-500" };
    if (password.length < 8) return { strength: 50, label: "Weak", color: "bg-orange-500" };
    if (password.length < 12) return { strength: 75, label: "Good", color: "bg-yellow-500" };
    return { strength: 100, label: "Strong", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  return (
    <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="p-8 border-b border-gray-100">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <span>Change Login Password</span>
        </CardTitle>
        <p className="text-gray-600 mt-2">
          Update your password to keep your account secure
        </p>
      </CardHeader>
      
      <CardContent className="p-8">
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-4">Password Changed Successfully!</h3>
            <p className="text-gray-600 mb-6">Your password has been updated successfully. Please use your new password for future logins.</p>
            <Button
              onClick={() => setIsSuccess(false)}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Change Another Password
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Current Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showPasswords.current ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-gray-700 font-medium bg-gray-50 pr-12"
                  placeholder="Enter current password"
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => togglePasswordVisibility('current')}
                  disabled={loading}
                >
                  {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showPasswords.new ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-gray-700 font-medium bg-gray-50 pr-12"
                  placeholder="Enter new password"
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => togglePasswordVisibility('new')}
                  disabled={loading}
                >
                  {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              
              {/* Password Strength Indicator */}
              {formData.newPassword && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Password Strength</span>
                    <span className={`text-xs font-medium ${passwordStrength.strength >= 75 ? 'text-green-600' : passwordStrength.strength >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-gray-700 font-medium bg-gray-50 pr-12 ${
                    formData.confirmPassword && formData.newPassword !== formData.confirmPassword 
                      ? 'border-red-300 focus:border-red-500' 
                      : ''
                  }`}
                  placeholder="Confirm new password"
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => togglePasswordVisibility('confirm')}
                  disabled={loading}
                >
                  {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                <p className="text-red-600 text-sm">Passwords do not match</p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Password Requirements:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li className={formData.newPassword.length >= 6 ? "text-green-600" : ""}>
                  • Minimum 6 characters long {formData.newPassword.length >= 6 && "✓"}
                </li>
                <li className={formData.currentPassword !== formData.newPassword && formData.newPassword ? "text-green-600" : ""}>
                  • Must not match current password {formData.currentPassword !== formData.newPassword && formData.newPassword && "✓"}
                </li>
                <li className={formData.newPassword === formData.confirmPassword && formData.confirmPassword ? "text-green-600" : ""}>
                  • New password and confirm password must match {formData.newPassword === formData.confirmPassword && formData.confirmPassword && "✓"}
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <Button
                onClick={handleChangePassword}
                disabled={loading || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Changing Password...</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    <span>Change Password</span>
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={loading}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-3 rounded-lg transition-all duration-200"
              >
                Reset
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChangePasswordContent;