import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface StudentProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  course_name?: string;
  city?: string;
  state?: string;
  status: string;
  enrollment_date: string;
  created_at: string;
  updated_at: string;
}

const StudentApprovalContent = () => {
  const { 
    data: students, 
    loading, 
    update,
    delete: deleteItem,
    create,
    refresh 
  } = useOptimisticCrud<StudentProfile>({
    tableName: 'student_profiles',
    orderBy: { column: 'created_at', ascending: false }
  });

  // Enable real-time updates
  useAdminRealTime({
    tableName: 'student_profiles'
  });

  const handleApprovalChange = async (student: StudentProfile, approved: boolean) => {
    try {
      const newStatus = approved ? 'active' : 'pending';
      await update(student.id, {
        ...student,
        status: newStatus
      });

      toast.success(`${student.full_name} ${approved ? 'approved' : 'marked as pending'} successfully!`);
    } catch (error) {
      toast.error('Failed to update student approval status');
    }
  };

  const handleBulkApproval = async () => {
    const approvedStudents = students.filter(s => s.status === 'active');
    
    if (approvedStudents.length === 0) {
      toast.error('No approved students to process');
      return;
    }

    try {
      // Here you could implement bulk processing logic
      toast.success(`Processing ${approvedStudents.length} approved students`);
    } catch (error) {
      toast.error('Failed to process bulk approval');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading student profiles...</span>
        </div>
      </div>
    );
  }

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
                  <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[180px]">Student Name</th>
                  <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[180px]">Email</th>
                  <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[120px]">Phone</th>
                  <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[200px]">Course Name</th>
                  <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[80px]">State</th>
                  <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[80px]">City</th>
                  <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[100px]">Status</th>
                  <th className="border-2 border-gray-600 px-3 py-2 text-sm font-medium text-left min-w-[120px]">Enrollment Date</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="border-2 border-gray-600 px-4 py-8 text-center text-gray-500">
                      No student profiles found
                    </td>
                  </tr>
                ) : (
                  students.map((student, index) => (
                    <tr key={student.id} className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                      <td className="border-2 border-gray-600 px-3 py-2 text-center">
                        <Checkbox
                          checked={student.status === 'active'}
                          onCheckedChange={(checked) => handleApprovalChange(student, checked as boolean)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="border-2 border-gray-600 px-3 py-2 text-xs">{student.full_name}</td>
                      <td className="border-2 border-gray-600 px-3 py-2 text-xs">{student.email}</td>
                      <td className="border-2 border-gray-600 px-3 py-2 text-xs">{student.phone || '-'}</td>
                      <td className="border-2 border-gray-600 px-3 py-2 text-xs">{student.course_name || 'Not assigned'}</td>
                      <td className="border-2 border-gray-600 px-3 py-2 text-xs">{student.state || '-'}</td>
                      <td className="border-2 border-gray-600 px-3 py-2 text-xs">{student.city || '-'}</td>
                      <td className="border-2 border-gray-600 px-3 py-2 text-xs">
                        <span className={`px-2 py-1 rounded text-xs ${
                          student.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="border-2 border-gray-600 px-3 py-2 text-xs">
                        {new Date(student.enrollment_date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 p-4 bg-gray-100 border border-gray-400">
        <p className="text-sm text-gray-700">
          Total Students: {students.length} | 
          Approved: {students.filter(s => s.status === 'active').length} | 
          Pending: {students.filter(s => s.status === 'pending').length}
        </p>
      </div>
    </div>
  );
};

export default StudentApprovalContent;