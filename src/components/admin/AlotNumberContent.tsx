import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const AlotNumberContent = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    studentsId: "",
    courseName: "",
    theoryMaxMarks: "",
    practicalMaxMarks: "",
    obtainTheoryMarks: "",
    obtainPracticalMarks: "",
    studentId: "BSOFT3004482",
    studentName: "",
    studentFatherName: "",
    studentMotherName: "",
    courseExaminationDate: "",
    centerName: "",
    centerCode: "",
    issueDate: "",
    place: "",
    studentPhoto: null as File | null,
    directorSignature: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmitNow = () => {
    if (!formData.studentsId) {
      toast({
        title: "Error",
        description: "Please enter Students ID",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Students ID submitted successfully!",
      variant: "default"
    });
  };

  const handleAddNow = () => {
    toast({
      title: "Success",
      description: "Marks data added successfully!",
      variant: "default"
    });
  };

  const handleFinalSubmit = () => {
    toast({
      title: "Success",
      description: "Alot number data submitted successfully!",
      variant: "default"
    });
  };

  return (
    <div className="w-full max-w-none bg-gray-200 min-h-screen">
      {/* Header */}
      <div className="bg-gray-400 px-6 py-4 border-b border-gray-500">
        <h1 className="text-xl font-medium text-gray-800">Alot Number</h1>
      </div>

      {/* Form Container */}
      <div className="px-8 py-6 space-y-8">
        
        {/* Alot Number Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-700">Alot Number</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Input
                value={formData.studentsId}
                onChange={(e) => handleInputChange('studentsId', e.target.value)}
                className="w-full h-12 border-2 border-gray-400 bg-white"
                placeholder="Enter Students ID"
              />
            </div>
            <Button 
              onClick={handleSubmitNow}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 h-12"
            >
              Submit Now
            </Button>
          </div>
        </div>

        {/* Course Selection and Marks */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <Select value={formData.courseName} onValueChange={(value) => handleInputChange('courseName', value)}>
              <SelectTrigger className="w-80 h-12 border-2 border-gray-400 bg-white">
                <SelectValue placeholder="--------Select Course Name--------" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADCA">Advance Diploma In Computer Application(ADCA)</SelectItem>
                <SelectItem value="DCA">Diploma in Computer Application (DCA)</SelectItem>
                <SelectItem value="PGDCA">Post Graduate Diploma in Computer Application (PGDCA)</SelectItem>
                <SelectItem value="DCHN">Diploma in Computer Hardware and Networking</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-12 h-12 border-2 border-gray-400 bg-white"></div>
            <div className="w-12 h-12 border-2 border-gray-400 bg-white"></div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Input
              value={formData.theoryMaxMarks}
              onChange={(e) => handleInputChange('theoryMaxMarks', e.target.value)}
              className="h-12 border-2 border-gray-400 bg-white"
              placeholder="Theory Max Marks"
            />
            <Input
              value={formData.practicalMaxMarks}
              onChange={(e) => handleInputChange('practicalMaxMarks', e.target.value)}
              className="h-12 border-2 border-gray-400 bg-white"
              placeholder="Practical Max Marks"
            />
            <Input
              value={formData.obtainTheoryMarks}
              onChange={(e) => handleInputChange('obtainTheoryMarks', e.target.value)}
              className="h-12 border-2 border-gray-400 bg-white"
              placeholder="Obtain Theory Marks"
            />
            <Input
              value={formData.obtainPracticalMarks}
              onChange={(e) => handleInputChange('obtainPracticalMarks', e.target.value)}
              className="h-12 border-2 border-gray-400 bg-white"
              placeholder="Obtain Theory Marks"
            />
          </div>

          <div>
            <Button 
              onClick={handleAddNow}
              className="bg-blue-600 hover:bg-blue-700 text-red-500 font-bold px-6 py-2 border-2 border-black"
            >
              Add Now
            </Button>
          </div>
        </div>

        {/* Student Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <Input
              value={formData.studentId}
              onChange={(e) => handleInputChange('studentId', e.target.value)}
              className="h-12 border-2 border-gray-400 bg-white"
              placeholder="Student ID"
            />
            <Input
              value={formData.studentName}
              onChange={(e) => handleInputChange('studentName', e.target.value)}
              className="h-12 border-2 border-gray-400 bg-white"
              placeholder="Student Name"
            />
            <Input
              value={formData.studentFatherName}
              onChange={(e) => handleInputChange('studentFatherName', e.target.value)}
              className="h-12 border-2 border-gray-400 bg-white"
              placeholder="Student Father Name"
            />
            <Input
              value={formData.studentMotherName}
              onChange={(e) => handleInputChange('studentMotherName', e.target.value)}
              className="h-12 border-2 border-gray-400 bg-white"
              placeholder="Student Mother Name"
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="border-2 border-gray-400 bg-white h-12 px-3 py-2 text-gray-700">
              BSOFT3004482
            </div>
            <Input
              value={formData.courseExaminationDate}
              onChange={(e) => handleInputChange('courseExaminationDate', e.target.value)}
              className="h-12 border-2 border-gray-400 bg-white"
              placeholder="Course Examination Date"
            />
            <Input
              value={formData.centerName}
              onChange={(e) => handleInputChange('centerName', e.target.value)}
              className="h-12 border-2 border-gray-400 bg-white"
              placeholder="Center Name"
            />
            <Input
              value={formData.centerCode}
              onChange={(e) => handleInputChange('centerCode', e.target.value)}
              className="h-12 border-2 border-gray-400 bg-white"
              placeholder="Center Code"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              value={formData.issueDate}
              onChange={(e) => handleInputChange('issueDate', e.target.value)}
              className="h-12 border-2 border-gray-400 bg-white"
              placeholder="Issue Date"
            />
            <Input
              value={formData.place}
              onChange={(e) => handleInputChange('place', e.target.value)}
              className="h-12 border-2 border-gray-400 bg-white"
              placeholder="Place"
            />
          </div>
        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-2 gap-8">
          {/* Student Photo Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Student Photo Upload</label>
            <div className="border-2 border-gray-400 bg-white flex h-12">
              <label className="bg-gray-100 hover:bg-gray-200 border-r border-gray-400 px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 flex items-center">
                Choose file
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('studentPhoto', e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
              <span className="px-3 py-2 text-gray-500 text-sm flex-1 flex items-center">
                {formData.studentPhoto ? formData.studentPhoto.name : "No file chosen"}
              </span>
            </div>
          </div>

          {/* Director Signature */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Director Signature</label>
            <div className="border-2 border-gray-400 bg-white flex h-12">
              <label className="bg-gray-100 hover:bg-gray-200 border-r border-gray-400 px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 flex items-center">
                Choose file
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('directorSignature', e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>
              <span className="px-3 py-2 text-gray-500 text-sm flex-1 flex items-center">
                {formData.directorSignature ? formData.directorSignature.name : "No file chosen"}
              </span>
            </div>
          </div>
        </div>

        {/* Final Submit */}
        <div className="pt-4">
          <Button 
            onClick={handleFinalSubmit}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-2"
          >
            Final Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlotNumberContent;