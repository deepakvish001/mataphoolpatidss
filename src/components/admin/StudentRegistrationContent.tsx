import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { GraduationCap } from "lucide-react";
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

  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
    }
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
    <div className="space-y-6">
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-6 border-b border-gray-100 bg-gray-400">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span>Student Registration</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-8">
            {/* Examination Details */}
            <div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-t font-semibold">
                Examination Details / परीक्षा विवरण
              </div>
              <div className="border border-gray-300 p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Applied for Examination / जिस परीक्षा के लिए आवेदन किया*</label>
                    <Select value={formData.courseCategory} onValueChange={(value) => handleInputChange('courseCategory', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="--------Select Course Category--------" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diploma">Diploma</SelectItem>
                        <SelectItem value="certificate">Certificate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={formData.courseName} onValueChange={(value) => handleInputChange('courseName', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="-------Select Course Name-------" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dchn">DCHN</SelectItem>
                        <SelectItem value="adca">ADCA</SelectItem>
                        <SelectItem value="pgdca">PGDCA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <span className="text-sm">Fee : Rs/</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Examination Location / परीक्षा केंद्र *</label>
                  <Select value={formData.studyCenter} onValueChange={(value) => handleInputChange('studyCenter', value)}>
                    <SelectTrigger className="mt-1">
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

            {/* Applicant's Personal Details */}
            <div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-t font-semibold">
                Applicant's Personal Details /आवेदक का व्यक्तिगत विवरण
              </div>
              <div className="border border-gray-300 p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Applicant's Full Name / आवेदक का पूरा नाम *</label>
                    <div className="flex gap-2 mt-1">
                      <Select>
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="Mr./श्री" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mr">Mr./श्री</SelectItem>
                          <SelectItem value="mrs">Mrs./श्रीमती</SelectItem>
                          <SelectItem value="ms">Ms./सुश्री</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={formData.applicantName}
                        onChange={(e) => handleInputChange('applicantName', e.target.value)}
                        className="flex-1"
                        placeholder="Enter full name"
                      />
                    </div>
                  </div>
                  <div></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Father's Name / पिता का नाम *</label>
                    <div className="flex gap-2 mt-1">
                      <Select>
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="Mr./श्री" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mr">Mr./श्री</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={formData.fatherName}
                        onChange={(e) => handleInputChange('fatherName', e.target.value)}
                        className="flex-1"
                        placeholder="Enter father's name"
                      />
                    </div>
                  </div>
                  <div></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Mother's Name / माता का नाम *</label>
                    <div className="flex gap-2 mt-1">
                      <Select>
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="Mrs./श्रीमती" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mrs">Mrs./श्रीमती</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={formData.motherName}
                        onChange={(e) => handleInputChange('motherName', e.target.value)}
                        className="flex-1"
                        placeholder="Enter mother's name"
                      />
                    </div>
                  </div>
                  <div></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Gender / लिंग*</label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select One" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Date of Birth / जन्म दिनांक *</label>
                    <Input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="mt-1"
                      placeholder="dd/MM/yyyy"
                    />
                  </div>
                  <div></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Category / वर्ग*</label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="mt-1">
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
                  <div></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Date Of Registration *</label>
                    <Input
                      type="date"
                      value={formData.registrationDate}
                      onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                      className="mt-1"
                      placeholder="dd/MM/yyyy"
                    />
                  </div>
                  <div></div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-t font-semibold">
                Contact Details / संपर्क विवरण
              </div>
              <div className="border border-gray-300 p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Mobile / मोबाइल *</label>
                    <div className="flex gap-2 mt-1">
                      <Select>
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="+91" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+91">+91</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={formData.mobile}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        className="flex-1"
                        placeholder="Enter mobile number"
                      />
                    </div>
                  </div>
                  <div></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email / ईमेल पता *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-1"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div></div>
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-t font-semibold">
                Address Details / पता विवरण
              </div>
              <div className="border border-gray-300 p-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Full Address / पता *</label>
                  <Input
                    value={formData.fullAddress}
                    onChange={(e) => handleInputChange('fullAddress', e.target.value)}
                    className="mt-1"
                    placeholder="Enter full address"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">City Name / शहर का नाम *</label>
                  <Input
                    value={formData.cityName}
                    onChange={(e) => handleInputChange('cityName', e.target.value)}
                    className="mt-1"
                    placeholder="Enter city name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">State / राज्य *</label>
                  <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="-------------Select State--------------" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="up">Uttar Pradesh</SelectItem>
                      <SelectItem value="bihar">Bihar</SelectItem>
                      <SelectItem value="mp">Madhya Pradesh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">District / जिला *</label>
                  <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="-------------Select Distt--------------" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="azamgarh">Azamgarh</SelectItem>
                      <SelectItem value="mau">Mau</SelectItem>
                      <SelectItem value="baliya">Baliya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Pin Code / पिन कोड *</label>
                  <Input
                    value={formData.pinCode}
                    onChange={(e) => handleInputChange('pinCode', e.target.value)}
                    className="mt-1"
                    placeholder="Enter pin code"
                  />
                </div>
              </div>
            </div>

            {/* Educational/Qualification Details */}
            <div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-t font-semibold">
                Educational / Qualification Details / शैक्षिक / योग्यता का विवरण
              </div>
              <div className="border border-gray-300 p-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Highest Educational Qualification / उच्चतम शैक्षिक योग्यता *</label>
                  <Select value={formData.qualification} onValueChange={(value) => handleInputChange('qualification', value)}>
                    <SelectTrigger className="mt-1">
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

                <div>
                  <label className="text-sm font-medium text-gray-700">Year of Passing / उत्तीर्ण वर्ष *</label>
                  <Input
                    value={formData.yearOfPassing}
                    onChange={(e) => handleInputChange('yearOfPassing', e.target.value)}
                    className="mt-1"
                    placeholder="yyyy"
                  />
                </div>
              </div>
            </div>

            {/* Identification Details */}
            <div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-t font-semibold">
                Identification Details / पहचान की सूचना
              </div>
              <div className="border border-gray-300 p-4 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Aadhar Card Number / आधार कार्ड संख्या*</label>
                  <Input
                    value={formData.aadharNumber}
                    onChange={(e) => handleInputChange('aadharNumber', e.target.value)}
                    className="mt-1"
                    placeholder="Enter Aadhar number"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Upload Photo / फोटो अपलोड *</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 text-gray-700"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Student ID & Password</label>
                    <Input
                      value={formData.studentId}
                      readOnly
                      className="mt-1 bg-gray-100"
                    />
                  </div>
                  <div>
                    <Input
                      value={formData.password}
                      readOnly
                      className="mt-1 bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Declaration */}
            <div>
              <div className="bg-blue-600 text-white px-4 py-2 rounded-t font-semibold">
                Declaration
              </div>
              <div className="border border-gray-300 p-4">
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
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                className="bg-black hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded"
              >
                Submit Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentRegistrationContent;