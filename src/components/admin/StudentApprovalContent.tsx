import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const StudentApprovalContent = () => {
  const { toast } = useToast();

  // Sample student data based on the screenshots
  const [students, setStudents] = useState([
    {
      id: 2317,
      approved: false,
      state: "Uttar Pradesh",
      district: "Azamgarh",
      studyCenterId: "UP/Azm/B.Soft./000220",
      courseName: "ADCA",
      studentFullName: "Ms./सुश्री Anshika Yadav",
      fatherName: "Mr./श्री Rampravesh Yadav",
      motherName: "Mrs./श्रीमती Indu Devi",
      dob: "07/04/2005",
      email: "ankushydv771@gmail.com",
      mobile: "+917068992013",
      studentId: "2002317",
      password: "58742317"
    },
    {
      id: 2316,
      approved: false,
      state: "Uttar Pradesh", 
      district: "",
      studyCenterId: "UP/Azm/B.Soft./000220",
      courseName: "Advance Diploma In Computer Application(ADCA)",
      studentFullName: "Mr./श्री Beauty Yadav",
      fatherName: "Mr./श्री Ramesh Yadav",
      motherName: "Mrs./श्रीमती Anita Devi",
      dob: "13/04/2005",
      email: "beautyy200@gmail.com",
      mobile: "+918957645599",
      studentId: "2002316",
      password: "58742316"
    },
    {
      id: 2315,
      approved: true,
      state: "Uttar Pradesh",
      district: "Azamgarh", 
      studyCenterId: "UP/AZM/B.Soft/0007",
      courseName: "------Select Course Name------",
      studentFullName: "Mr./श्री YOGENDRA KUMAR",
      fatherName: "Mr./श्री RAJESH KUMAR",
      motherName: "Mrs./श्रीमती SHILA DEVI",
      dob: "06/07/2002",
      email: "",
      mobile: "+919454868605",
      studentId: "2002315",
      password: "58742315"
    },
    {
      id: 2314,
      approved: true,
      state: "Uttar Pradesh",
      district: "",
      studyCenterId: "UP/Azm/B.Soft./000220",
      courseName: "Advance Diploma In Computer Application(ADCA)",
      studentFullName: "Ms./सुश्री Madhu Yadav",
      fatherName: "Mr./श्री Dinesh Yadav",
      motherName: "Mrs./श्रीमती Uma Devi",
      dob: "18-08-2008",
      email: "madhu2008@gmail.com",
      mobile: "+918090893530",
      studentId: "2002314",
      password: "58742314"
    },
    {
      id: 2313,
      approved: false,
      state: "Uttar Pradesh",
      district: "Azamgarh",
      studyCenterId: "UP/Azm/B.Soft./000220",
      courseName: "Advance Diploma In Computer Application(ADCA)",
      studentFullName: "Mr./श्री Suraj Saroj",
      fatherName: "Mr./श्री Khurmulli Saroj",
      motherName: "Mrs./श्रीमती Urmila Devi",
      dob: "12-02-2010",
      email: "khurmullikumar88@gmail.com",
      mobile: "+917087849878",
      studentId: "2002313",
      password: "58742313"
    }
  ]);

  const handleApprovalChange = (studentId: number, approved: boolean) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, approved }
          : student
      )
    );
    
    toast({
      title: approved ? "Student Approved" : "Approval Removed",
      description: `Student ID ${studentId} has been ${approved ? 'approved' : 'disapproved'}`,
      variant: "default"
    });
  };

  const handleBulkApproval = () => {
    const approvedCount = students.filter(s => s.approved).length;
    toast({
      title: "Bulk Action",
      description: `${approvedCount} students are currently approved`,
      variant: "default"
    });
  };

  return (
    <div className="w-full max-w-none bg-white">
      {/* Header */}
      <div className="bg-gray-400 px-4 py-3 mb-4 border border-gray-500">
        <h1 className="text-lg font-medium text-gray-800">Student Approval</h1>
      </div>

      {/* Action Buttons */}
      <div className="mb-4 flex gap-4">
        <Button 
          onClick={handleBulkApproval}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Process Approved Students
        </Button>
        <Button 
          variant="outline"
          className="border-gray-400"
        >
          Export List
        </Button>
      </div>

      {/* Students Table */}
      <div className="border-2 border-gray-600 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[80px]">Approve</th>
                <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[60px]">Id</th>
                <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[80px]">State</th>
                <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[80px]">Dist</th>
                <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[120px]">Study_Center_ID</th>
                <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[200px]">CourseName</th>
                <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[180px]">Student_Full_Name</th>
                <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[140px]">Father_Name</th>
                <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[140px]">Mother_Name</th>
                <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[100px]">D.O.B.</th>
                <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[180px]">Email</th>
                <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[120px]">Mobile</th>
                <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[100px]">Student Id</th>
                <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[100px]">Password</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id} className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                  <td className="border-2 border-gray-600 px-3 py-2 text-center">
                    <Checkbox
                      checked={student.approved}
                      onCheckedChange={(checked) => handleApprovalChange(student.id, checked as boolean)}
                      className="w-4 h-4"
                    />
                  </td>
                  <td className="border-2 border-gray-600 px-3 py-2 text-xs">{student.id}</td>
                  <td className="border-2 border-gray-600 px-3 py-2 text-xs">{student.state}</td>
                  <td className="border-2 border-gray-600 px-3 py-2 text-xs">{student.district}</td>
                  <td className="border-2 border-gray-600 px-3 py-2 text-xs">{student.studyCenterId}</td>
                  <td className="border-2 border-gray-600 px-3 py-2 text-xs">{student.courseName}</td>
                  <td className="border-2 border-gray-600 px-3 py-2 text-xs">{student.studentFullName}</td>
                  <td className="border-2 border-gray-600 px-3 py-2 text-xs">{student.fatherName}</td>
                  <td className="border-2 border-gray-600 px-3 py-2 text-xs">{student.motherName}</td>
                  <td className="border-2 border-gray-600 px-3 py-2 text-xs">{student.dob}</td>
                  <td className="border-2 border-gray-600 px-3 py-2 text-xs">{student.email}</td>
                  <td className="border-2 border-gray-600 px-3 py-2 text-xs">{student.mobile}</td>
                  <td className="border-2 border-gray-600 px-3 py-2 text-xs font-medium">{student.studentId}</td>
                  <td className="border-2 border-gray-600 px-3 py-2 text-xs font-medium">{student.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 p-4 bg-gray-100 border border-gray-400">
        <p className="text-sm text-gray-700">
          Total Students: {students.length} | 
          Approved: {students.filter(s => s.approved).length} | 
          Pending: {students.filter(s => !s.approved).length}
        </p>
      </div>
    </div>
  );
};

export default StudentApprovalContent;