import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Save, RefreshCw } from "lucide-react";

const EditProfileContent = () => {
  const { user, profile, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    retypePassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Load profile data on component mount
  useEffect(() => {
    const loadProfileData = async () => {
      if (user && profile) {
        setFormData({
          fullName: profile.full_name || "",
          phone: profile.phone || "",
          email: user.email || "",
          password: "",
          retypePassword: ""
        });
      }
      setInitialLoading(false);
    };

    loadProfileData();
  }, [user, profile]);

  // Real-time subscription to profile changes
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('profile-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: `user_id=eq.${user.id}`
        },
        (payload: any) => {
          const updatedProfile = payload.new;
          setFormData(prev => ({
            ...prev,
            fullName: updatedProfile.full_name || "",
            phone: updatedProfile.phone || ""
          }));
          toast.success("Profile updated in real-time!");
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (formData.password && formData.password !== formData.retypePassword) {
      toast.error("Passwords do not match");
      return false;
    }
    if (formData.password && formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleUpdateData = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // Update profile data
      const profileData = {
        full_name: formData.fullName,
        phone: formData.phone
      };

      const { error: profileError } = await (supabase as any)
        .from('profiles')
        .update(profileData)
        .eq('user_id', user?.id);

      if (profileError) throw profileError;

      // Update email if changed
      if (formData.email !== user?.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: formData.email
        });
        if (emailError) throw emailError;
      }

      // Update password if provided
      if (formData.password) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: formData.password
        });
        if (passwordError) throw passwordError;
        
        // Clear password fields after successful update
        setFormData(prev => ({
          ...prev,
          password: "",
          retypePassword: ""
        }));
      }

      // Update local auth context
      await updateProfile(profileData);
      
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error('Update error:', error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (profile) {
      setFormData({
        fullName: profile.full_name || "",
        phone: profile.phone || "",
        email: user?.email || "",
        password: "",
        retypePassword: ""
      });
      toast.info("Form reset to original values");
    }
  };

  const handleRefresh = async () => {
    setInitialLoading(true);
    try {
      const { data: profileData, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;

      if (profileData) {
        setFormData({
          fullName: profileData.full_name || "",
          phone: profileData.phone || "",
          email: user?.email || "",
          password: "",
          retypePassword: ""
        });
      }
      
      toast.success("Profile data refreshed!");
    } catch (error: any) {
      toast.error("Failed to refresh profile data");
    } finally {
      setInitialLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading profile data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="p-8 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Admin Profile
          </CardTitle>
          <Button
            onClick={handleRefresh}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-gray-700 font-medium bg-gray-50"
              placeholder="Enter full name"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <Input
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-gray-700 font-medium bg-gray-50"
              placeholder="Enter phone number"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-gray-700 font-medium bg-gray-50"
              placeholder="Enter email address"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              New Password <span className="text-gray-500">(leave blank to keep current)</span>
            </label>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-gray-700 font-medium bg-gray-50"
              placeholder="Enter new password"
            />
          </div>

          {/* Retype Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <Input
              type="password"
              value={formData.retypePassword}
              onChange={(e) => handleInputChange('retypePassword', e.target.value)}
              className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-gray-700 font-medium bg-gray-50"
              placeholder="Confirm new password"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6">
            <Button
              onClick={handleUpdateData}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Update Profile</span>
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
      </CardContent>
    </Card>
  );
};

export default EditProfileContent;