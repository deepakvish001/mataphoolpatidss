import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface StudentProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  course_name?: string;
  status?: string;
  city?: string;
  state?: string;
  enrollment_date?: string;
}

const StudentManagementContent = () => {
  const {
    data: studentProfiles,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<StudentProfile>({ 
    tableName: 'student_profiles',
    orderBy: { column: 'enrollment_date', ascending: false }
  });

  useAdminRealTime({
    tableName: 'student_profiles'
  });
  const [selectedFranchise, setSelectedFranchise] = useState("");


  const handleEdit = (studentId: string) => {
    toast.success(`Opening edit form for student ${studentId}`);
  };

  if (loading) {
    return (
      <div className="w-full max-w-none bg-white flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading student management...</p>
        </div>
      </div>
    );
  }

  const totalRecords = studentProfiles.length;

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
              {studentProfiles.map((student, index) => (
                <tr key={student.id} className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs text-center">{index + 1}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(student.id)}
                      className="p-1 h-8 w-8 text-green-600 hover:text-green-800 hover:bg-green-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.full_name}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">-</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">-</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">-</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">-</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.city || "-"}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.course_name || "-"}</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">-</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">-</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">-</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">-</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">-</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">-</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">-</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">-</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">-</td>
                  <td className="border-2 border-gray-600 px-2 py-2 text-xs">-</td>
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