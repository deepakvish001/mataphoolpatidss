import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Edit, Trash2, Loader2, Plus, Settings, Eye, Shield } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";
import { useAuth } from "@/contexts/AuthContext";

interface AdminProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  designation?: string;
  department?: string;
  profile_image_url?: string;
  bio?: string;
  permissions: any;
  last_login?: string;
  is_active: boolean;
}

const AdminProfileManagementContent = () => {
  const { user } = useAuth();
  const {
    data: adminProfiles,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<AdminProfile>({ 
    tableName: 'admin_profiles',
    orderBy: { column: 'full_name', ascending: true }
  });

  useAdminRealTime({
    tableName: 'admin_profiles'
  });

  const [formData, setFormData] = useState({
    userId: "",
    fullName: "",
    email: "",
    phone: "",
    designation: "",
    department: "",
    bio: "",
    permissions: "",
    isActive: true
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showPermissions, setShowPermissions] = useState<string | null>(null);

  // Load current user data if editing own profile
  useEffect(() => {
    if (user && !editingId) {
      const currentUserProfile = adminProfiles.find(profile => profile.user_id === user.id);
      if (currentUserProfile) {
        setFormData({
          userId: currentUserProfile.user_id,
          fullName: currentUserProfile.full_name,
          email: currentUserProfile.email,
          phone: currentUserProfile.phone || "",
          designation: currentUserProfile.designation || "",
          department: currentUserProfile.department || "",
          bio: currentUserProfile.bio || "",
          permissions: currentUserProfile.permissions ? JSON.stringify(currentUserProfile.permissions, null, 2) : "",
          isActive: currentUserProfile.is_active
        });
      }
    }
  }, [user, adminProfiles, editingId]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.fullName.trim() || !formData.email.trim()) {
      toast.error("Please enter full name and email");
      return;
    }

    let permissionsJson = {};
    if (formData.permissions.trim()) {
      try {
        permissionsJson = JSON.parse(formData.permissions);
      } catch (error) {
        toast.error("Invalid JSON format for permissions");
        return;
      }
    }

    try {
      const profileData = {
        user_id: formData.userId || user?.id || "",
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone || null,
        designation: formData.designation || null,
        department: formData.department || null,
        bio: formData.bio || null,
        permissions: permissionsJson,
        is_active: formData.isActive,
        last_login: new Date().toISOString()
      };

      if (editingId) {
        await update(editingId, profileData);
        toast.success("Admin profile updated successfully!");
        setEditingId(null);
      } else {
        await create(profileData);
        toast.success("Admin profile created successfully!");
      }

      // Reset form
      setFormData({
        userId: "",
        fullName: "",
        email: "",
        phone: "",
        designation: "",
        department: "",
        bio: "",
        permissions: "",
        isActive: true
      });
    } catch (error) {
      toast.error(editingId ? "Failed to update admin profile" : "Failed to create admin profile");
    }
  };

  const handleEdit = (profile: AdminProfile) => {
    setFormData({
      userId: profile.user_id,
      fullName: profile.full_name,
      email: profile.email,
      phone: profile.phone || "",
      designation: profile.designation || "",
      department: profile.department || "",
      bio: profile.bio || "",
      permissions: profile.permissions ? JSON.stringify(profile.permissions, null, 2) : "",
      isActive: profile.is_active
    });
    setEditingId(profile.id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      userId: "",
      fullName: "",
      email: "",
      phone: "",
      designation: "",
      department: "",
      bio: "",
      permissions: "",
      isActive: true
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admin profile?")) return;
    
    try {
      await deleteItem(id);
      toast.success("Admin profile deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete admin profile");
    }
  };

  const handleToggleStatus = async (profile: AdminProfile) => {
    try {
      await update(profile.id, {
        ...profile,
        is_active: !profile.is_active
      });
      toast.success(`Admin profile ${!profile.is_active ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      toast.error("Failed to update admin profile status");
    }
  };

  const defaultPermissions = {
    "users": {
      "read": true,
      "write": true,
      "delete": false
    },
    "courses": {
      "read": true,
      "write": true,
      "delete": true
    },
    "students": {
      "read": true,
      "write": true,
      "delete": false
    },
    "finances": {
      "read": true,
      "write": false,
      "delete": false
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading admin profiles...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Add/Edit Admin Profile Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-green-600 flex items-center space-x-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            <span>{editingId ? 'Edit Admin Profile' : 'Add Admin Profile'}</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">User ID *</label>
              <Input
                value={formData.userId}
                onChange={(e) => handleInputChange('userId', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                placeholder="UUID from auth.users"
                disabled={!!editingId}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name *</label>
              <Input
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                placeholder="Enter full name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email *</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                placeholder="Enter email address"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Designation</label>
              <Select value={formData.designation} onValueChange={(value) => handleInputChange('designation', value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Super Admin">Super Admin</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Coordinator">Coordinator</SelectItem>
                  <SelectItem value="Assistant">Assistant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administration">Administration</SelectItem>
                  <SelectItem value="Academic">Academic</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Student Affairs">Student Affairs</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Bio</label>
              <Textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="min-h-[100px] border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white resize-none"
                placeholder="Enter bio/description"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Permissions (JSON)</label>
              <Textarea
                value={formData.permissions}
                onChange={(e) => handleInputChange('permissions', e.target.value)}
                className="min-h-[150px] border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white resize-none font-mono text-sm"
                placeholder={JSON.stringify(defaultPermissions, null, 2)}
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">Enter permissions as valid JSON</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleInputChange('permissions', JSON.stringify(defaultPermissions, null, 2))}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Load Default Permissions
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <div className="flex items-center space-x-3">
                <Switch
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                />
                <span className="text-sm text-gray-600">
                  {formData.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex space-x-4">
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {editingId ? <Settings className="h-5 w-5 mr-2" /> : <Plus className="h-5 w-5 mr-2" />}
              {editingId ? 'Update Profile' : 'Create Profile'}
            </Button>
            
            {editingId && (
              <Button
                onClick={handleCancelEdit}
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-3"
              >
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Admin Profiles Table */}
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-green-600 hover:bg-green-600">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Actions</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Name</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Email</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Designation</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Department</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Status</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Last Login</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Permissions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminProfiles.map((profile, index) => (
                <TableRow key={profile.id} className={index % 2 === 0 ? "bg-green-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 p-4">
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(profile)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(profile.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-green-600" />
                      </div>
                      <span>{profile.full_name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {profile.email}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {profile.designation || "-"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {profile.department || "-"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Switch
                        checked={profile.is_active}
                        onCheckedChange={() => handleToggleStatus(profile)}
                      />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        profile.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {profile.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {profile.last_login ? new Date(profile.last_login).toLocaleDateString() : "Never"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPermissions(showPermissions === profile.id ? null : profile.id)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <Shield className="h-4 w-4 mr-1" />
                      {showPermissions === profile.id ? 'Hide' : 'View'}
                    </Button>
                    {showPermissions === profile.id && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-xs font-mono text-left max-w-xs overflow-auto">
                        <pre>{JSON.stringify(profile.permissions, null, 2)}</pre>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfileManagementContent;