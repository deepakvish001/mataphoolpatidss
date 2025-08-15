import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGlobalCrud } from "@/contexts/GlobalCrudContext";
import { useButtonDetection } from "@/hooks/useButtonDetection";

const EmployeeMasterContent = () => {
  const { toast } = useToast();
  const { lastEvent, isConnected } = useGlobalCrud();
  useButtonDetection('employees');
  
  const [formData, setFormData] = useState({
    employeeId: "EMP001210",
    employeePassword: "Bdcid001110",
    fullName: "",
    fatherName: "",
    contactNo: "",
    emailId: "",
    country: "India",
    state: "",
    district: "",
    address: "",
    otherDetails: "",
    pincode: "",
    salary: "",
    registrationDate: "",
    photoUpload: null as File | null
  });

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const districts = [
    "Agra", "Allahabad", "Azamgarh", "Bareilly", "Ghaziabad", "Gorakhpur",
    "Kanpur", "Lucknow", "Meerut", "Moradabad", "Saharanpur", "Varanasi"
  ];

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInputChange('photoUpload', file);
    }
  };

  const handleSubmit = () => {
    if (!formData.fullName.trim() || !formData.contactNo.trim() || !formData.emailId.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Employee details submitted successfully!",
      variant: "default"
    });
  };

  // Listen to global CRUD events for real-time updates
  useEffect(() => {
    if (lastEvent && lastEvent.table === 'employees') {
      if (lastEvent.operation === 'INSERT') {
        toast({
          title: "Employee Added",
          description: "New employee has been successfully added",
          variant: "default"
        });
      } else if (lastEvent.operation === 'UPDATE') {
        toast({
          title: "Employee Updated",
          description: "Employee information has been updated",
          variant: "default"
        });
      }
    }
  }, [lastEvent, toast]);

  const handleReset = () => {
    setFormData({
      employeeId: "EMP001210",
      employeePassword: "Bdcid001110",
      fullName: "",
      fatherName: "",
      contactNo: "",
      emailId: "",
      country: "India",
      state: "",
      district: "",
      address: "",
      otherDetails: "",
      pincode: "",
      salary: "",
      registrationDate: "",
      photoUpload: null
    });

    // Reset file input
    const fileInput = document.getElementById('employee-photo-file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100 bg-gray-200">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <span>Employee Master</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Employee ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Employee ID
              </label>
              <Input
                value={formData.employeeId}
                onChange={(e) => handleInputChange('employeeId', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-gray-100"
                readOnly
              />
            </div>

            {/* Employee Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Employee Password
              </label>
              <Input
                value={formData.employeePassword}
                onChange={(e) => handleInputChange('employeePassword', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-gray-100"
                readOnly
              />
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter full name"
              />
            </div>

            {/* Father Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Father Name
              </label>
              <Input
                value={formData.fatherName}
                onChange={(e) => handleInputChange('fatherName', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter father name"
              />
            </div>

            {/* Contact No */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Contact No
              </label>
              <Input
                value={formData.contactNo}
                onChange={(e) => handleInputChange('contactNo', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter contact number"
              />
            </div>

            {/* Email ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email ID
              </label>
              <Input
                type="email"
                value={formData.emailId}
                onChange={(e) => handleInputChange('emailId', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter email address"
              />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Country
              </label>
              <Input
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-gray-100"
                readOnly
              />
            </div>

            {/* State */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                State
              </label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white z-50">
                  <SelectValue placeholder="---Please Select---" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* District */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                District
              </label>
              <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white z-50">
                  <SelectValue placeholder="---Please Select---" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Address
              </label>
              <Textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white resize-none"
                placeholder="Enter address"
              />
            </div>

            {/* Other Details */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Other Details
              </label>
              <Textarea
                value={formData.otherDetails}
                onChange={(e) => handleInputChange('otherDetails', e.target.value)}
                className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white resize-none"
                placeholder="Enter other details"
              />
            </div>

            {/* Pincode */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Pincode
              </label>
              <Input
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter pincode"
              />
            </div>

            {/* Salary */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Salary
              </label>
              <Input
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter salary"
              />
            </div>

            {/* Registration Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Registration Date
              </label>
              <Input
                type="date"
                value={formData.registrationDate}
                onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Photo Upload
              </label>
              <div className="border border-gray-300 rounded p-4 bg-white">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      id="employee-photo-file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button
                      variant="outline"
                      className="h-10 px-4 border-gray-300 hover:bg-gray-50 font-medium text-gray-700"
                    >
                      Choose file
                    </Button>
                  </div>
                  <span className="text-gray-500 font-medium">
                    {formData.photoUpload ? formData.photoUpload.name : "No file chosen"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit and Reset Buttons */}
          <div className="flex space-x-4 pt-8">
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Submit
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeMasterContent;
