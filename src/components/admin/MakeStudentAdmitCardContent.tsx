import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const MakeStudentAdmitCardContent = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    course: "",
    studentRollNumber: "",
    studentName: "",
    studentMotherName: "",
    studentFatherName: "",
    examCentreCode: "",
    pwd: "",
    examCentreAddress: "",
    examDate: "",
    batch: "",
    reportingTime: "",
    gateClosingTime: "",
    examStartTime: "",
    examDuration: "",
    studentPhoto: null as File | null,
    importantNotice: "",
    instructionsNotice: ""
  });

  // Sample student data
  const [studentData] = useState([
    {
      id: 1,
      course: "ADCA",
      rollNumber: "20040",
      studentName: "Mr./श्रीGUPTESHWAR SINGH",
      motherName: "Mrs./श्रीमतीSHASHI PRABHA SINGH",
      fatherName: "Mr./श्रीRAVINDRA SINGH",
      examCentreCode: "",
      pwd: "",
      examCentreAddress: "",
      examDate: "",
      batch: "",
      reportingTime: "",
      gateClosingTime: "",
      examStartTime: "",
      examDuration: "",
      studentPhoto: ""
    },
    {
      id: 2,
      course: "ADCA",
      rollNumber: "20043",
      studentName: "Mr./श्रीChote Lal Kumar",
      motherName: "Mrs./श्रीमतीDharmi Devi",
      fatherName: "Mr./श्रीVijay Prasad",
      examCentreCode: "SM11101",
      pwd: "",
      examCentreAddress: "Jiyanpur",
      examDate: "11/06/2019",
      batch: "M004",
      reportingTime: "10:00",
      gateClosingTime: "10:30",
      examStartTime: "11:00",
      examDuration: "90 Minute",
      studentPhoto: "/lovable-uploads/393bdd79-f1d0-430f-8c0d-c10eb0d72005.png"
    }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, studentPhoto: file }));
  };

  const handleSubmit = () => {
    toast({
      title: "Success",
      description: "Student admit card data submitted successfully!",
      variant: "default"
    });

    // Reset form
    setFormData({
      course: "",
      studentRollNumber: "",
      studentName: "",
      studentMotherName: "",
      studentFatherName: "",
      examCentreCode: "",
      pwd: "",
      examCentreAddress: "",
      examDate: "",
      batch: "",
      reportingTime: "",
      gateClosingTime: "",
      examStartTime: "",
      examDuration: "",
      studentPhoto: null,
      importantNotice: "",
      instructionsNotice: ""
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete",
      description: `Delete student admit card ID: ${id}`,
      variant: "destructive"
    });
  };

  return (
    <div className="w-full max-w-none bg-gray-200 min-h-screen">
      {/* Header */}
      <div className="bg-gray-400 px-6 py-4 border-b border-gray-500">
        <h1 className="text-xl font-medium text-gray-800">Make Student Admit Card</h1>
      </div>

      {/* Form Container */}
      <div className="px-8 py-6 space-y-6">
        
        {/* Course */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Course</label>
          <Select value={formData.course} onValueChange={(value) => handleInputChange('course', value)}>
            <SelectTrigger className="w-full h-12 border-2 border-gray-400 bg-white">
              <SelectValue placeholder="---------------Select Course Name----------" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADCA">Advance Diploma In Computer Application(ADCA)</SelectItem>
              <SelectItem value="DCA">Diploma in Computer Application (DCA)</SelectItem>
              <SelectItem value="PGDCA">Post Graduate Diploma in Computer Application (PGDCA)</SelectItem>
              <SelectItem value="DCHN">Diploma in Computer Hardware and Networking</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Student Roll Number */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Student Roll Number</label>
          <Input
            value={formData.studentRollNumber}
            onChange={(e) => handleInputChange('studentRollNumber', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
          />
        </div>

        {/* Student Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Student Name</label>
          <Input
            value={formData.studentName}
            onChange={(e) => handleInputChange('studentName', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
          />
        </div>

        {/* Student Mother's Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Student Mother's Name</label>
          <Input
            value={formData.studentMotherName}
            onChange={(e) => handleInputChange('studentMotherName', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
          />
        </div>

        {/* Student Father's Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Student Father's Name</label>
          <Input
            value={formData.studentFatherName}
            onChange={(e) => handleInputChange('studentFatherName', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
          />
        </div>

        {/* Exam Centre Code */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Exam Centre Code</label>
          <Input
            value={formData.examCentreCode}
            onChange={(e) => handleInputChange('examCentreCode', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
          />
        </div>

        {/* PWD */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">PWD</label>
          <Input
            value={formData.pwd}
            onChange={(e) => handleInputChange('pwd', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
          />
        </div>

        {/* Exam Centre Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Exam Centre Address</label>
          <Input
            value={formData.examCentreAddress}
            onChange={(e) => handleInputChange('examCentreAddress', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
          />
        </div>

        {/* Exam Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Exam Date</label>
          <Input
            value={formData.examDate}
            onChange={(e) => handleInputChange('examDate', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
          />
        </div>

        {/* Batch */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Batch</label>
          <Input
            value={formData.batch}
            onChange={(e) => handleInputChange('batch', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
          />
        </div>

        {/* Reporting Time */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Reporting Time</label>
          <Input
            value={formData.reportingTime}
            onChange={(e) => handleInputChange('reportingTime', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
          />
        </div>

        {/* Gate Closing Time */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Gate Closing Time</label>
          <Input
            value={formData.gateClosingTime}
            onChange={(e) => handleInputChange('gateClosingTime', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
          />
        </div>

        {/* Exam Start Time */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Exam Start Time</label>
          <Input
            value={formData.examStartTime}
            onChange={(e) => handleInputChange('examStartTime', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
          />
        </div>

        {/* Exam Duration */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Exam Duration</label>
          <Input
            value={formData.examDuration}
            onChange={(e) => handleInputChange('examDuration', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
          />
        </div>

        {/* Student Photo Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Student Photo Upload</label>
          <div className="border-2 border-gray-400 bg-white flex">
            <label className="bg-gray-100 hover:bg-gray-200 border-r border-gray-400 px-4 py-2 cursor-pointer text-sm font-medium text-gray-700">
              Choose file
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
            <span className="px-3 py-2 text-gray-500 text-sm flex-1">
              {formData.studentPhoto ? formData.studentPhoto.name : "No file chosen"}
            </span>
          </div>
        </div>

        {/* Important Notice */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Important Notice</label>
          <Textarea
            value={formData.importantNotice}
            onChange={(e) => handleInputChange('importantNotice', e.target.value)}
            className="w-full h-32 border-2 border-gray-400 bg-white resize-none"
          />
        </div>

        {/* Instructions Notice */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Instructions Notice</label>
          <Textarea
            value={formData.instructionsNotice}
            onChange={(e) => handleInputChange('instructionsNotice', e.target.value)}
            className="w-full h-32 border-2 border-gray-400 bg-white resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 text-center">
          <Button 
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-red-500 font-bold px-8 py-3 text-base border-2 border-black"
          >
            Submit Now
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="px-8 pb-6">
        <div className="border-2 border-gray-600 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[80px]">Course</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[80px]">Roll Number</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[150px]">Student_Name</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[150px]">Mother_Name</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[150px]">Father_Name</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[120px]">Exam_Center_Code</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[60px]">PWD</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[120px]">Exam_Center_Address</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">Exam_Date</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[80px]">Batch</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">Reporting_Time</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">Gate_Closing_Time</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">Exam_Start_Time</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">Exam_Duration</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">Student_Photo</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">
                      <div className="mb-2">
                        <Button
                          variant="link"
                          onClick={() => handleDelete(item.id)}
                          className="p-0 h-auto text-blue-600 hover:text-blue-800 text-xs"
                        >
                          Delete
                        </Button>
                      </div>
                      <div>{item.course}</div>
                    </td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.rollNumber}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.studentName}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.motherName}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.fatherName}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.examCentreCode}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.pwd}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.examCentreAddress}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.examDate}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.batch}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.reportingTime}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.gateClosingTime}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.examStartTime}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.examDuration}</td>
                    <td className="border-2 border-gray-600 px-2 py-3">
                      <div className="w-16 h-12 border-2 border-gray-400 bg-gray-50 flex items-center justify-center">
                        {item.studentPhoto ? (
                          <img 
                            src={item.studentPhoto} 
                            alt="Student" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-4 h-4 border border-gray-400"></div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeStudentAdmitCardContent;