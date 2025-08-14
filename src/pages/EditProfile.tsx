import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    adminName: "",
    contactNo: "",
    email: "",
    password: "",
    retypePassword: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateData = () => {
    // Handle form submission logic here
    console.log("Update Data:", formData);
  };

  const handleReset = () => {
    setFormData({
      adminName: "",
      contactNo: "",
      email: "",
      password: "",
      retypePassword: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-xl border-b border-gray-200 p-6 flex items-center space-x-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate("/admin")}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Profile</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8">
        <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="p-8 border-b border-gray-100">
            <CardTitle className="text-2xl font-bold text-gray-800">
              Admin Profile
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Admin Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Admin Name <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.adminName}
                  onChange={(e) => handleInputChange('adminName', e.target.value)}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-gray-700 font-medium bg-gray-50"
                  placeholder="Enter admin name"
                />
              </div>

              {/* Contact No */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Contact No <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.contactNo}
                  onChange={(e) => handleInputChange('contactNo', e.target.value)}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-gray-700 font-medium bg-gray-50"
                  placeholder="Enter contact number"
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
                  Password <span className="text-red-500">*</span>
                </label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-gray-700 font-medium bg-gray-50"
                  placeholder="Enter password"
                />
              </div>

              {/* Retype Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Retype Password <span className="text-red-500">*</span>
                </label>
                <Input
                  type="password"
                  value={formData.retypePassword}
                  onChange={(e) => handleInputChange('retypePassword', e.target.value)}
                  className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-gray-700 font-medium bg-gray-50"
                  placeholder="Retype password"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6">
                <Button
                  onClick={handleUpdateData}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Update Data
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-3 rounded-lg transition-all duration-200"
                >
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;