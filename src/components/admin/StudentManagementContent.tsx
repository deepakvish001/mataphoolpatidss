import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudentManagementContent = () => {
  const { toast } = useToast();
  
  const [selectedFranchise, setSelectedFranchise] = useState("");

  // Sample student data based on the screenshots
  const [students] = useState([
    {
      sNo: 1,
      applicantName: "Mr./श्री Vivek",
      fatherName: "Mr./श्री गगगजग",
      memberName: "Mrs./श्रीमती gytytgfgff",
      gender: "Male",
      dateOfBirth: "03/05/1990",
      district: "Hardoi",
      courseName: "Diploma in Computer Application (DCA)",
      courseFees: "14500",
      franchiseCenterName: "Institute of Computer Training Centre, Numaish Chauraha, Hardoi",
      qualification: "B.A.",
      franchiseId: "UP/HDI/ICTC/0002",
      aadharNumber: "543456456646565654",
      studentId: "TCI/HDI/ADCA/1",
      studentPassword: "58741",
      photo: "~/Offer_pic/P.jpg",
      signature: "~/Offer_pic/S.jpg",
      thumbImpression: "~/Offer_pic/T.jpg"
    },
    {
      sNo: 2,
      applicantName: "Mr./श्री VIVEK YADAV",
      fatherName: "Mr./श्री NA",
      memberName: "Mrs./श्रीमती NA",
      gender: "Male",
      dateOfBirth: "12/07/2020",
      district: "Azamgarh",
      courseName: "Diploma in Computer Application",
      courseFees: "6000",
      franchiseCenterName: "Ravi Kumar Gupta",
      qualification: "Other",
      franchiseId: "SM11101",
      aadharNumber: "343546546534355645",
      studentId: "",
      studentPassword: "",
      photo: "~/Offer_pic/599-5990202_rm-clipart copy.jpg",
      signature: "",
      thumbImpression: ""
    },
    {
      sNo: 3,
      applicantName: "Mr./ Aurangzeb Ahmad",
      fatherName: "Mr./ Ajaj Ahmad",
      memberName: "Mrs./ Farzana",
      gender: "Male",
      dateOfBirth: "09/07/1998",
      district: "",
      courseName: "Diploma in Computer Hardware and Networking",
      courseFees: "15000",
      franchiseCenterName: "",
      qualification: "10th Pass",
      franchiseId: "SM11101",
      aadharNumber: "539177029237",
      studentId: "",
      studentPassword: "",
      photo: "~/Offer_pic/",
      signature: "~/Offer_pic/",
      thumbImpression: "~/Offer_pic/"
    },
    {
      sNo: 4,
      applicantName: "Mr./श्री VIVEK YADAV",
      fatherName: "Mr./श्री NA",
      memberName: "Mrs./श्रीमती NA",
      gender: "Male",
      dateOfBirth: "12/07/2020",
      district: "Azamgarh",
      courseName: "Diploma in Computer Application",
      courseFees: "6000",
      franchiseCenterName: "Ravi Kumar Gupta",
      qualification: "Other",
      franchiseId: "SM11101",
      aadharNumber: "343546546534355645",
      studentId: "",
      studentPassword: "",
      photo: "~/Offer_pic/599-5990202_rm-clipart copy.jpg",
      signature: "",
      thumbImpression: ""
    },
    {
      sNo: 5,
      applicantName: "Mr./श्री sanjay",
      fatherName: "Mr./श्री rajkumar",
      memberName: "Mrs./श्रीमती manorama",
      gender: "Male",
      dateOfBirth: "10/06/1996",
      district: "Azamgarh",
      courseName: "Diploma in Computer Application",
      courseFees: "6000",
      franchiseCenterName: "Ravi Kumar Gupta",
      qualification: "10th Pass",
      franchiseId: "SM11101",
      aadharNumber: "539177029237",
      studentId: "",
      studentPassword: "",
      photo: "~/Offer_pic/CaptureNN.JPG",
      signature: "",
      thumbImpression: ""
    }
  ]);

  const handleEdit = (studentId: number) => {
    toast({
      title: "Edit Student",
      description: `Opening edit form for student ${studentId}`,
      variant: "default"
    });
  };

  const totalRecords = students.length;

  return (
    <div className="w-full max-w-none bg-white">
      {/* Header */}
      <div className="bg-gray-400 px-4 py-3 mb-4 border border-gray-500">
        <h1 className="text-lg font-medium text-gray-800">Student Management</h1>
      </div>

      {/* Franchise Selection */}
      <div className="mb-4">
        <Select value={selectedFranchise} onValueChange={setSelectedFranchise}>
          <SelectTrigger className="max-w-lg border-2 border-gray-400 h-12">
            <SelectValue placeholder="---------------Select Franchise Institute Name----------- --" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ictc">Institute of Computer Training Centre, Numaish Chauraha, Hardoi</SelectItem>
            <SelectItem value="ravi">Ravi Kumar Gupta</SelectItem>
            <SelectItem value="azamgarh">Azamgarh Center</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Total Records */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">Total record found - {totalRecords}</p>
      </div>

      {/* Students Table */}
      <div className="border-2 border-gray-600 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[50px]">S.No</th>
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[60px]">Edit</th>
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[150px]">Applicant_Name</th>
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[130px]">Father_Name</th>
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[130px]">Member_Name</th>
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[80px]">Gender</th>
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[100px]">Date_Of_Birth</th>
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[80px]">District</th>
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[200px]">Course_Name</th>
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[100px]">Course_Fees</th>
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[200px]">Franchise_Center_Name</th>
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[120px]">Qualification</th>
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[120px]">Franchise_ID</th>
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[150px]">Aadhar_Number</th>
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[120px]">Student_ID</th>
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[140px]">Student_Password</th>
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[200px]">Photo</th>
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[120px]">Signature</th>
                <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[150px]">Thumb_Impression</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.sNo} className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs text-center">{student.sNo}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(student.sNo)}
                      className="p-1 h-8 w-8 text-green-600 hover:text-green-800 hover:bg-green-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.applicantName}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.fatherName}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.memberName}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.gender}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.dateOfBirth}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.district}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.courseName}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.courseFees}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.franchiseCenterName}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.qualification}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.franchiseId}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.aadharNumber}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.studentId}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.studentPassword}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.photo}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.signature}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.thumbImpression}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Export Data
        </Button>
        <Button variant="outline" className="border-gray-400">
          Print Report
        </Button>
        <Button variant="outline" className="border-gray-400">
          Add New Student
        </Button>
      </div>
    </div>
  );
};

export default StudentManagementContent;