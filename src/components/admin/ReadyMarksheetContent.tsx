import { Button } from "@/components/ui/button";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface MarksheetRecord {
  id: string;
  student_id: string;
  student_name: string;
  course_name: string;
  roll_number: string;
  examination_date: string;
  total_marks: number;
  obtained_marks: number;
  percentage: number;
  grade: string;
  result_status: string;
  marksheet_url?: string;
  created_at: string;
  updated_at: string;
}

const ReadyMarksheetContent = () => {
  const { data: marksheetData, loading, delete: deleteItem } = useOptimisticCrud<MarksheetRecord>({
    tableName: 'marksheet_management',
    orderBy: { column: 'created_at', ascending: false }
  });

  // Enable real-time updates
  useAdminRealTime({
    tableName: 'marksheet_management'
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success('Marksheet record deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete marksheet record');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading marksheet records...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-none bg-gray-200 min-h-screen">
      {/* Header */}
      <div className="bg-gray-400 px-6 py-4 border-b border-gray-500">
        <h1 className="text-xl font-medium text-gray-800">All Student Marksheet</h1>
      </div>

      {/* Data Table */}
      <div className="px-8 py-6">
        <div className="border-2 border-gray-600 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[60px]">Actions</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[80px]">Student ID</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[150px]">Student Name</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">Course</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[80px]">Roll No</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">Exam Date</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[80px]">Total Marks</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">Obtained Marks</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[80px]">Percentage</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[60px]">Grade</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[80px]">Result</th>
                </tr>
              </thead>
              <tbody>
                {marksheetData.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="border-2 border-gray-600 px-4 py-8 text-center text-gray-500">
                      No marksheet records found
                    </td>
                  </tr>
                ) : (
                  marksheetData.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                      <td className="border-2 border-gray-600 px-2 py-3 text-xs">
                        <Button
                          variant="link"
                          onClick={() => handleDelete(item.id)}
                          className="p-0 h-auto text-red-600 hover:text-red-800 text-xs"
                        >
                          Delete
                        </Button>
                      </td>
                      <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.student_id}</td>
                      <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.student_name}</td>
                      <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.course_name}</td>
                      <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.roll_number}</td>
                      <td className="border-2 border-gray-600 px-2 py-3 text-xs">
                        {new Date(item.examination_date).toLocaleDateString()}
                      </td>
                      <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.total_marks}</td>
                      <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.obtained_marks}</td>
                      <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.percentage}%</td>
                      <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.grade}</td>
                      <td className="border-2 border-gray-600 px-2 py-3 text-xs">
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.result_status === 'pass' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.result_status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadyMarksheetContent;