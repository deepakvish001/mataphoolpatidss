import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const StudentRegistrationContent = () => {
  const { toast } = useToast();
  
  // Form state
  const [formData, setFormData] = useState({
    courseCategory: "",
    courseName: "",
    studyCenter: "",
    applicantName: "",
    fatherName: "",
    motherName: "",
    gender: "",
    dateOfBirth: "",
    category: "",
    registrationDate: "",
    mobile: "",
    email: "",
    fullAddress: "",
    cityName: "",
    state: "",
    district: "",
    pinCode: "",
    qualification: "",
    yearOfPassing: "",
    aadharNumber: "",
    studentId: "2002318",
    password: "58742318",
    declaration: false
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.declaration) {
      toast({
        title: "Error",
        description: "Please accept the declaration to proceed",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Student registration submitted successfully!",
      variant: "default"
    });
  };

  return (
    <div className="w-full max-w-none">
      {/* Header */}
      <div className="bg-gray-400 px-4 py-3 mb-4">
        <h1 className="text-lg font-medium text-gray-800">Student Registration</h1>
      </div>

      <div className="space-y-0">
        {/* Examination Details */}
        <div className="border border-gray-300">
          <div className="bg-blue-600 text-white px-4 py-2 text-sm font-medium">
            Examination Details / परीक्षा विवरण
          </div>
          
          <div className="border-b border-gray-300">
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 bg-blue-100 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                Applied for Examination / जिस परीक्षा के लिए आवेदन किया*
              </div>
              <div className="col-span-3 px-3 py-2 border-r border-gray-300 flex items-center">
                <Select value={formData.courseCategory} onValueChange={(value) => handleInputChange('courseCategory', value)}>
                  <SelectTrigger className="h-8 text-xs border-gray-300">
                    <SelectValue placeholder="--------Select Course Category--------" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="certificate">Certificate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-3 px-3 py-2 border-r border-gray-300 flex items-center">
                <Select value={formData.courseName} onValueChange={(value) => handleInputChange('courseName', value)}>
                  <SelectTrigger className="h-8 text-xs border-gray-300">
                    <SelectValue placeholder="-------Select Course Name-------" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dchn">DCHN</SelectItem>
                    <SelectItem value="adca">ADCA</SelectItem>
                    <SelectItem value="pgdca">PGDCA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-3 px-3 py-2 flex items-center">
                <span className="text-xs text-gray-700">Fee : Rs/</span>
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                Examination Location / परीक्षा केंद्र *
              </div>
              <div className="col-span-9 px-3 py-2 flex items-center">
                <Select value={formData.studyCenter} onValueChange={(value) => handleInputChange('studyCenter', value)}>
                  <SelectTrigger className="h-8 text-xs border-gray-300">
                    <SelectValue placeholder="-----Select Study Center-----" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="azamgarh">Azamgarh</SelectItem>
                    <SelectItem value="mau">Mau</SelectItem>
                    <SelectItem value="baliya">Baliya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Applicant's Personal Details */}
        <div className="border border-gray-300 border-t-0">
          <div className="bg-blue-600 text-white px-4 py-2 text-sm font-medium">
            Applicant's Personal Details /आवेदक का व्यक्तिगत विवरण
          </div>

          <div className="border-b border-gray-300">
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 bg-blue-100 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                Applicant's Full Name / आवेदक का पूरा नाम *
              </div>
              <div className="col-span-2 px-3 py-2 border-r border-gray-300 flex items-center">
                <Select>
                  <SelectTrigger className="h-8 text-xs border-gray-300">
                    <SelectValue placeholder="Mr./श्री" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mr">Mr./श्री</SelectItem>
                    <SelectItem value="mrs">Mrs./श्रीमती</SelectItem>
                    <SelectItem value="ms">Ms./सुश्री</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-7 px-3 py-2 flex items-center">
                <Input
                  value={formData.applicantName}
                  onChange={(e) => handleInputChange('applicantName', e.target.value)}
                  className="h-8 text-xs border-gray-300"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300">
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                Father's Name / पिता का नाम *
              </div>
              <div className="col-span-2 px-3 py-2 border-r border-gray-300 flex items-center">
                <Select>
                  <SelectTrigger className="h-8 text-xs border-gray-300">
                    <SelectValue placeholder="Mr./श्री" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mr">Mr./श्री</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-7 px-3 py-2 flex items-center">
                <Input
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  className="h-8 text-xs border-gray-300"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300">
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 bg-blue-100 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                Mother's Name / माता का नाम *
              </div>
              <div className="col-span-2 px-3 py-2 border-r border-gray-300 flex items-center">
                <Select>
                  <SelectTrigger className="h-8 text-xs border-gray-300">
                    <SelectValue placeholder="Mrs./श्रीमती" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mrs">Mrs./श्रीमती</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-7 px-3 py-2 flex items-center">
                <Input
                  value={formData.motherName}
                  onChange={(e) => handleInputChange('motherName', e.target.value)}
                  className="h-8 text-xs border-gray-300"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300">
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                Gender / लिंग*
              </div>
              <div className="col-span-9 px-3 py-2 flex items-center">
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className="h-8 text-xs border-gray-300 max-w-xs">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300">
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 bg-blue-100 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                Date of Birth / जन्म दिनांक *
              </div>
              <div className="col-span-9 px-3 py-2 flex items-center">
                <Input
                  type="text"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="h-8 text-xs border-gray-300 max-w-xs"
                  placeholder="dd/MM/yyyy"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300">
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                Category / वर्ग*
              </div>
              <div className="col-span-9 px-3 py-2 flex items-center">
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="h-8 text-xs border-gray-300 max-w-xs">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="obc">OBC</SelectItem>
                    <SelectItem value="sc">SC</SelectItem>
                    <SelectItem value="st">ST</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 bg-blue-100 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                Date Of Registration *
              </div>
              <div className="col-span-9 px-3 py-2 flex items-center">
                <Input
                  type="text"
                  value={formData.registrationDate}
                  onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                  className="h-8 text-xs border-gray-300 max-w-xs"
                  placeholder="dd/MM/yyyy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="border border-gray-300 border-t-0">
          <div className="bg-blue-600 text-white px-4 py-2 text-sm font-medium">
            Contact Details / संपर्क विवरण
          </div>

          <div className="border-b border-gray-300">
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                Mobile / मोबाइल *
              </div>
              <div className="col-span-2 px-3 py-2 border-r border-gray-300 flex items-center">
                <Select>
                  <SelectTrigger className="h-8 text-xs border-gray-300">
                    <SelectValue placeholder="+91" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+91">+91</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-7 px-3 py-2 flex items-center">
                <Input
                  value={formData.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  className="h-8 text-xs border-gray-300"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 bg-blue-100 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                Email / ईमेल पता *
              </div>
              <div className="col-span-9 px-3 py-2 flex items-center">
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="h-8 text-xs border-gray-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="border border-gray-300 border-t-0">
          <div className="bg-blue-600 text-white px-4 py-2 text-sm font-medium">
            Address Details / पता विवरण
          </div>

          <div className="border-b border-gray-300">
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                Full Address / पता *
              </div>
              <div className="col-span-9 px-3 py-2 flex items-center">
                <Input
                  value={formData.fullAddress}
                  onChange={(e) => handleInputChange('fullAddress', e.target.value)}
                  className="h-8 text-xs border-gray-300"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300">
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 bg-blue-100 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                City Name / शहर का नाम *
              </div>
              <div className="col-span-9 px-3 py-2 flex items-center">
                <Input
                  value={formData.cityName}
                  onChange={(e) => handleInputChange('cityName', e.target.value)}
                  className="h-8 text-xs border-gray-300"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300">
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                State / राज्य *
              </div>
              <div className="col-span-9 px-3 py-2 flex items-center">
                <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                  <SelectTrigger className="h-8 text-xs border-gray-300">
                    <SelectValue placeholder="-------------Select State--------------" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="up">Uttar Pradesh</SelectItem>
                    <SelectItem value="bihar">Bihar</SelectItem>
                    <SelectItem value="mp">Madhya Pradesh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300">
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 bg-blue-100 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                District / जिला *
              </div>
              <div className="col-span-9 px-3 py-2 flex items-center">
                <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                  <SelectTrigger className="h-8 text-xs border-gray-300">
                    <SelectValue placeholder="-------------Select Distt--------------" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="azamgarh">Azamgarh</SelectItem>
                    <SelectItem value="mau">Mau</SelectItem>
                    <SelectItem value="baliya">Baliya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                Pin Code / पिन कोड *
              </div>
              <div className="col-span-9 px-3 py-2 flex items-center">
                <Input
                  value={formData.pinCode}
                  onChange={(e) => handleInputChange('pinCode', e.target.value)}
                  className="h-8 text-xs border-gray-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Educational/Qualification Details */}
        <div className="border border-gray-300 border-t-0">
          <div className="bg-blue-600 text-white px-4 py-2 text-sm font-medium">
            Educational / Qualification Details / शैक्षिक / योग्यता का विवरण
          </div>

          <div className="border-b border-gray-300">
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                Highest Educational Qualification / उच्चतम शैक्षिक योग्यता *
              </div>
              <div className="col-span-9 px-3 py-2 flex items-center">
                <Select value={formData.qualification} onValueChange={(value) => handleInputChange('qualification', value)}>
                  <SelectTrigger className="h-8 text-xs border-gray-300">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10th">10th</SelectItem>
                    <SelectItem value="12th">12th</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="postgraduate">Post Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 bg-blue-100 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                Year of Passing / उत्तीर्ण वर्ष *
              </div>
              <div className="col-span-9 px-3 py-2 flex items-center">
                <Input
                  value={formData.yearOfPassing}
                  onChange={(e) => handleInputChange('yearOfPassing', e.target.value)}
                  className="h-8 text-xs border-gray-300"
                  placeholder="yyyy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Identification Details */}
        <div className="border border-gray-300 border-t-0">
          <div className="bg-blue-600 text-white px-4 py-2 text-sm font-medium">
            Identification Details / पहचान की सूचना
          </div>

          <div className="border-b border-gray-300">
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                Aadhar Card Number / आधार कार्ड संख्या*
              </div>
              <div className="col-span-9 px-3 py-2 flex items-center">
                <Input
                  value={formData.aadharNumber}
                  onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                  className="h-8 text-xs border-gray-300"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300">
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 bg-blue-100 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                Upload Photo / फोटो अपलोड *
              </div>
              <div className="col-span-9 px-3 py-2 flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  className="text-xs"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-12 min-h-[40px]">
              <div className="col-span-3 px-4 py-2 border-r border-gray-300 text-sm font-medium text-gray-700 flex items-center">
                Student ID & Password
              </div>
              <div className="col-span-4 px-3 py-2 border-r border-gray-300 flex items-center">
                <Input
                  value={formData.studentId}
                  readOnly
                  className="h-8 text-xs border-gray-300 bg-gray-100"
                />
              </div>
              <div className="col-span-5 px-3 py-2 flex items-center">
                <Input
                  value={formData.password}
                  readOnly
                  className="h-8 text-xs border-gray-300 bg-gray-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Declaration */}
        <div className="border border-gray-300 border-t-0">
          <div className="bg-blue-600 text-white px-4 py-2 text-sm font-medium">
            Declaration
          </div>
          <div className="p-4 bg-gray-50 flex justify-between items-center">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="declaration"
                checked={formData.declaration}
                onCheckedChange={(checked) => handleInputChange('declaration', checked as string)}
              />
              <label htmlFor="declaration" className="text-sm text-gray-700">
                * I, hereby declare that the particulars submitted by me in the Student Reg.
              </label>
            </div>
            <Button
              onClick={handleSubmit}
              className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-2 text-sm"
            >
              Submit Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistrationContent;