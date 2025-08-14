import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const CourseSubjectContent = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    courseName: "",
    semesterYear: "",
    subject: "",
    theoryMarks: "",
    practicalMarks: "",
    description: ""
  });

  // Sample course subject data
  const [subjectData] = useState([
    {
      id: 17,
      courseName: "Advance Diploma In Computer Application(ADCA)",
      semesterYear: "12 Month",
      subject: "Windows 10",
      theoryMarks: "50",
      practicalMarks: "50",
      description: "N/A"
    },
    {
      id: 18,
      courseName: "Advance Diploma In Computer Application(ADCA)",
      semesterYear: "12 Month",
      subject: "MS Office",
      theoryMarks: "50",
      practicalMarks: "50",
      description: "N/A"
    },
    {
      id: 19,
      courseName: "Advance Diploma In Computer Application(ADCA)",
      semesterYear: "12 Month",
      subject: "Accounting Tally",
      theoryMarks: "50",
      practicalMarks: "50",
      description: "N/A"
    },
    {
      id: 20,
      courseName: "Advance Diploma In Computer Application(ADCA)",
      semesterYear: "12 Month",
      subject: "HTML",
      theoryMarks: "50",
      practicalMarks: "50",
      description: "N/A"
    },
    {
      id: 21,
      courseName: "Advance Diploma In Computer Application(ADCA)",
      semesterYear: "12 Month",
      subject: "C & C++",
      theoryMarks: "50",
      practicalMarks: "50",
      description: "N/A"
    },
    {
      id: 22,
      courseName: "Advance Diploma In Computer Application(ADCA)",
      semesterYear: "12 Month",
      subject: "Visual Basic",
      theoryMarks: "50",
      practicalMarks: "50",
      description: "N/A"
    },
    {
      id: 23,
      courseName: "Advance Diploma In Computer Application(ADCA)",
      semesterYear: "12 Month",
      subject: "Internet",
      theoryMarks: "50",
      practicalMarks: "50",
      description: "N/A"
    },
    {
      id: 24,
      courseName: "Advance Diploma In Computer Application(ADCA)",
      semesterYear: "12 Month",
      subject: "Corel Draw",
      theoryMarks: "50",
      practicalMarks: "50",
      description: "N/A"
    },
    {
      id: 25,
      courseName: "Advance Diploma In Computer Application(ADCA)",
      semesterYear: "12 Month",
      subject: "Photoshop",
      theoryMarks: "50",
      practicalMarks: "50",
      description: "N/A"
    },
    {
      id: 26,
      courseName: "Advance Diploma In Computer Application(ADCA)",
      semesterYear: "12 Month",
      subject: "Page Maker",
      theoryMarks: "50",
      practicalMarks: "50",
      description: "N/A"
    }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.courseName || !formData.semesterYear || !formData.subject) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Course subject submitted successfully!",
      variant: "default"
    });
  };

  const handleReset = () => {
    setFormData({
      courseName: "",
      semesterYear: "",
      subject: "",
      theoryMarks: "",
      practicalMarks: "",
      description: ""
    });
  };

  const handleEdit = (id: number) => {
    toast({
      title: "Edit",
      description: `Edit course subject ID: ${id}`,
      variant: "default"
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete",
      description: `Delete course subject ID: ${id}`,
      variant: "destructive"
    });
  };

  return (
    <div className="w-full max-w-none bg-gray-200 min-h-screen">
      {/* Header */}
      <div className="bg-gray-400 px-6 py-4 border-b border-gray-500">
        <h1 className="text-xl font-medium text-green-600">Course Subject Entry</h1>
      </div>

      {/* Form Container */}
      <div className="px-8 py-6 space-y-6">
        
        {/* Course Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Course Name *</label>
          <Select value={formData.courseName} onValueChange={(value) => handleInputChange('courseName', value)}>
            <SelectTrigger className="w-full h-12 border-2 border-gray-400 bg-white">
              <SelectValue placeholder="---------------Select Course Name---------- --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADCA">Advance Diploma In Computer Application(ADCA)</SelectItem>
              <SelectItem value="DCA">Diploma in Computer Application (DCA)</SelectItem>
              <SelectItem value="PGDCA">Post Graduate Diploma in Computer Application (PGDCA)</SelectItem>
              <SelectItem value="DCHN">Diploma in Computer Hardware and Networking</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Semester/Year */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Semester/Year *</label>
          <Input
            value={formData.semesterYear}
            onChange={(e) => handleInputChange('semesterYear', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
          />
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Subject *</label>
          <Input
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
          />
        </div>

        {/* Theory Marks */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Theory Marks *</label>
          <Input
            value={formData.theoryMarks}
            onChange={(e) => handleInputChange('theoryMarks', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
          />
        </div>

        {/* Practical Marks */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Practical Marks *</label>
          <Input
            value={formData.practicalMarks}
            onChange={(e) => handleInputChange('practicalMarks', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Description *</label>
          <Textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full h-32 border-2 border-gray-400 bg-white resize-none"
          />
        </div>

        {/* Submit and Reset Buttons */}
        <div className="flex gap-4 pt-4">
          <Button 
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-2 text-sm"
          >
            SUBMIT
          </Button>
          <Button 
            onClick={handleReset}
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-2 text-sm"
          >
            RESET
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <div className="px-8 pb-6">
        <div className="border-2 border-gray-600 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border-2 border-gray-600 px-4 py-3 text-sm font-medium text-left min-w-[60px]">id</th>
                  <th className="border-2 border-gray-600 px-4 py-3 text-sm font-medium text-left min-w-[250px]">Course_Name</th>
                  <th className="border-2 border-gray-600 px-4 py-3 text-sm font-medium text-left min-w-[120px]">Semester_year</th>
                  <th className="border-2 border-gray-600 px-4 py-3 text-sm font-medium text-left min-w-[150px]">Subject</th>
                  <th className="border-2 border-gray-600 px-4 py-3 text-sm font-medium text-left min-w-[120px]">Theory_Marks</th>
                  <th className="border-2 border-gray-600 px-4 py-3 text-sm font-medium text-left min-w-[120px]">Practical_Marks</th>
                  <th className="border-2 border-gray-600 px-4 py-3 text-sm font-medium text-left min-w-[120px]">Description</th>
                </tr>
              </thead>
              <tbody>
                {subjectData.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                    <td className="border-2 border-gray-600 px-4 py-3 text-xs">
                      <div className="flex gap-1 mb-2">
                        <Button
                          variant="link"
                          onClick={() => handleEdit(item.id)}
                          className="p-0 h-auto text-blue-600 hover:text-blue-800 text-xs"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="link"
                          onClick={() => handleDelete(item.id)}
                          className="p-0 h-auto text-blue-600 hover:text-blue-800 text-xs"
                        >
                          Delete
                        </Button>
                      </div>
                      <div>{item.id}</div>
                    </td>
                    <td className="border-2 border-gray-600 px-4 py-3 text-xs">{item.courseName}</td>
                    <td className="border-2 border-gray-600 px-4 py-3 text-xs">{item.semesterYear}</td>
                    <td className="border-2 border-gray-600 px-4 py-3 text-xs">{item.subject}</td>
                    <td className="border-2 border-gray-600 px-4 py-3 text-xs">{item.theoryMarks}</td>
                    <td className="border-2 border-gray-600 px-4 py-3 text-xs">{item.practicalMarks}</td>
                    <td className="border-2 border-gray-600 px-4 py-3 text-xs">{item.description}</td>
                  </tr>
                ))}
                <tr className="bg-blue-600">
                  <td className="border-2 border-gray-600 px-4 py-3 text-white text-center font-bold" colSpan={7}>
                    1234567
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSubjectContent;