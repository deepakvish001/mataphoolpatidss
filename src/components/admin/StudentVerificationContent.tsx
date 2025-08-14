import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const StudentVerificationContent = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    centerCode: "",
    enrollmentNo: "",
    studentName: "",
    fatherName: "",
    courseName: "",
    rankOrMarks: "",
    courseDuration: "",
    dateOfBirth: "",
    admissionDate: "",
    photoFile: null as File | null,
    marksheetFile: null as File | null,
    certificateFile: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleRegister = () => {
    // Validate required fields
    const requiredFields = ['state', 'district', 'centerCode', 'enrollmentNo', 'studentName', 'fatherName', 'courseName'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Registration Submitted",
      description: "Student verification request has been submitted successfully!",
      variant: "default"
    });
  };

  const referenceNumber = "TE11101125";

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-200 min-h-screen">
      {/* Header */}
      <div className="bg-gray-400 px-6 py-4 border-b border-gray-500">
        <h1 className="text-xl font-medium text-gray-800">Student Verification</h1>
      </div>

      {/* Form Container */}
      <div className="px-8 py-6 space-y-6">
        
        {/* State Selection */}
        <div className="space-y-2">
          <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
            <SelectTrigger className="w-full h-12 border-2 border-gray-400 bg-white">
              <SelectValue placeholder="----------Select State-----------" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
              <SelectItem value="bihar">Bihar</SelectItem>
              <SelectItem value="madhya-pradesh">Madhya Pradesh</SelectItem>
              <SelectItem value="rajasthan">Rajasthan</SelectItem>
              <SelectItem value="haryana">Haryana</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* District Selection */}
        <div className="space-y-2">
          <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
            <SelectTrigger className="w-full h-12 border-2 border-gray-400 bg-white">
              <SelectValue placeholder="-----------Select Distt-----------" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="azamgarh">Azamgarh</SelectItem>
              <SelectItem value="mau">Mau</SelectItem>
              <SelectItem value="baliya">Baliya</SelectItem>
              <SelectItem value="hardoi">Hardoi</SelectItem>
              <SelectItem value="lucknow">Lucknow</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Center Code */}
        <div className="space-y-2">
          <Input
            value={formData.centerCode}
            onChange={(e) => handleInputChange('centerCode', e.target.value)}
            placeholder="Center Code"
            className="w-full h-12 border-2 border-gray-400 bg-white text-gray-600"
          />
        </div>

        {/* Enrollment Number */}
        <div className="space-y-2">
          <Input
            value={formData.enrollmentNo}
            onChange={(e) => handleInputChange('enrollmentNo', e.target.value)}
            placeholder="Enter Your Enrollment No."
            className="w-full h-12 border-2 border-gray-400 bg-white text-gray-600"
          />
        </div>

        {/* Student Name */}
        <div className="space-y-2">
          <Input
            value={formData.studentName}
            onChange={(e) => handleInputChange('studentName', e.target.value)}
            placeholder="Enter Your Name"
            className="w-full h-12 border-2 border-gray-400 bg-white text-gray-600"
          />
        </div>

        {/* Father's Name */}
        <div className="space-y-2">
          <Input
            value={formData.fatherName}
            onChange={(e) => handleInputChange('fatherName', e.target.value)}
            placeholder="Enter Your Father's Name"
            className="w-full h-12 border-2 border-gray-400 bg-white text-gray-600"
          />
        </div>

        {/* Course Name Selection */}
        <div className="space-y-2">
          <Select value={formData.courseName} onValueChange={(value) => handleInputChange('courseName', value)}>
            <SelectTrigger className="w-full h-12 border-2 border-gray-400 bg-white">
              <SelectValue placeholder="-----------Select Course Name----------- --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dca">Diploma in Computer Application (DCA)</SelectItem>
              <SelectItem value="adca">Advance Diploma in Computer Application (ADCA)</SelectItem>
              <SelectItem value="pgdca">Post Graduate Diploma in Computer Application (PGDCA)</SelectItem>
              <SelectItem value="dchn">Diploma in Computer Hardware and Networking</SelectItem>
              <SelectItem value="web-design">Web Design & Development</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rank or Marks */}
        <div className="space-y-2">
          <Input
            value={formData.rankOrMarks}
            onChange={(e) => handleInputChange('rankOrMarks', e.target.value)}
            placeholder="Enter Rank or Marks"
            className="w-full h-12 border-2 border-gray-400 bg-white text-gray-600"
          />
        </div>

        {/* Course Duration */}
        <div className="space-y-2">
          <Input
            value={formData.courseDuration}
            onChange={(e) => handleInputChange('courseDuration', e.target.value)}
            placeholder="Enter Course Duration"
            className="w-full h-12 border-2 border-gray-400 bg-white text-gray-600"
          />
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <Input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            placeholder="Date Of Birth"
            className="w-full h-12 border-2 border-gray-400 bg-white text-gray-600"
          />
        </div>

        {/* Admission Date */}
        <div className="space-y-2">
          <Input
            type="date"
            value={formData.admissionDate}
            onChange={(e) => handleInputChange('admissionDate', e.target.value)}
            placeholder="Admission Date"
            className="w-full h-12 border-2 border-gray-400 bg-white text-gray-600"
          />
        </div>

        {/* Photo Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Photo Upload</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange('photoFile', e.target.files?.[0] || null)}
            className="w-full h-12 border-2 border-gray-400 bg-white p-2 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>

        {/* Marksheet Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Marksheet Upload</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange('marksheetFile', e.target.files?.[0] || null)}
            className="w-full h-12 border-2 border-gray-400 bg-white p-2 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>

        {/* Certificate Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Certificate Upload</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileChange('certificateFile', e.target.files?.[0] || null)}
            className="w-full h-12 border-2 border-gray-400 bg-white p-2 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />
        </div>

        {/* Register Button and Reference Number */}
        <div className="flex justify-center items-center pt-6 relative">
          <Button 
            onClick={handleRegister}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 text-lg rounded-md"
          >
            REGISTER NOW
          </Button>
          <div className="absolute right-0 text-sm text-gray-600">
            {referenceNumber}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentVerificationContent;