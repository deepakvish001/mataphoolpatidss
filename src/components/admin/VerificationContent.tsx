import { Button } from "@/components/ui/button";
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

const VerificationContent = () => {
  const { data: students, loading, delete: deleteItem } = useOptimisticCrud<StudentProfile>({
    tableName: 'student_profiles',
    orderBy: { column: 'created_at', ascending: false }
  });

  // Enable real-time updates
  useAdminRealTime({
    tableName: 'student_profiles'
  });

  const handleDelete = async (studentId: string) => {
    try {
      await deleteItem(studentId);
      toast.success('Student record deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete student record');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading student records...</span>
        </div>
      </div>
    );
  }

  const referenceNumber = Math.random().toString().substr(2, 7);

  return (
    <div className="w-full max-w-none bg-white">
      {/* Header */}
      <div className="bg-gray-400 px-4 py-3 mb-4 border border-gray-500">
        <h1 className="text-lg font-medium text-gray-800">Verification</h1>
      </div>

      {/* Verification Table */}
      <div className="border-2 border-gray-600 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[80px]">Actions</th>
                  <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[80px]">State</th>
                  <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[80px]">City</th>
                  <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[150px]">Student Name</th>
                  <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[180px]">Email</th>
                  <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[120px]">Phone</th>
                  <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[250px]">Course Name</th>
                  <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[100px]">Status</th>
                  <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[120px]">Enrollment Date</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="border-2 border-gray-600 px-4 py-8 text-center text-gray-500">
                      No student records found
                    </td>
                  </tr>
                ) : (
                  students.map((student, index) => (
                    <tr key={student.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                      <td className="border-2 border-gray-600 px-3 py-3 text-xs">
                        <Button
                          variant="link"
                          onClick={() => handleDelete(student.id)}
                          className="p-0 h-auto text-red-600 hover:text-red-800 text-xs"
                        >
                          Delete
                        </Button>
                      </td>
                      <td className="border-2 border-gray-600 px-3 py-3 text-xs">{student.state || '-'}</td>
                      <td className="border-2 border-gray-600 px-3 py-3 text-xs">{student.city || '-'}</td>
                      <td className="border-2 border-gray-600 px-3 py-3 text-xs">{student.full_name}</td>
                      <td className="border-2 border-gray-600 px-3 py-3 text-xs">{student.email}</td>
                      <td className="border-2 border-gray-600 px-3 py-3 text-xs">{student.phone || '-'}</td>
                      <td className="border-2 border-gray-600 px-3 py-3 text-xs">{student.course_name || 'Not assigned'}</td>
                      <td className="border-2 border-gray-600 px-3 py-3 text-xs">
                        <span className={`px-2 py-1 rounded text-xs ${
                          student.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="border-2 border-gray-600 px-3 py-3 text-xs">
                        {new Date(student.enrollment_date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
          </table>
        </div>
      </div>

      {/* Reference Number Footer */}
      <div className="mt-4">
        <div className="bg-blue-600 text-white text-center py-3 text-lg font-medium">
          {referenceNumber}
        </div>
      </div>
    </div>
  );
};

export default VerificationContent;