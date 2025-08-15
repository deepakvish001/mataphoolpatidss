import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AttendanceRecord {
  id: string;
  student_id: string;
  student_name: string;
  course_name: string;
  attendance_date: string;
  status: string;
  session_type: string;
  marked_by?: string;
  remarks?: string;
  created_at: string;
  updated_at: string;
}

const StudentAttendanceReportContent = () => {
  const [selectedFranchise, setSelectedFranchise] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredAttendance, setFilteredAttendance] = useState<AttendanceRecord[]>([]);

  const { data: attendanceData, loading } = useOptimisticCrud<AttendanceRecord>({
    tableName: 'attendance_management',
    orderBy: { column: 'attendance_date', ascending: false }
  });

  // Enable real-time updates
  useAdminRealTime({
    tableName: 'attendance_management'
  });

  // Filter attendance data based on filters
  useEffect(() => {
    let filtered = attendanceData;

    if (selectedCourse) {
      filtered = filtered.filter(record => 
        record.course_name.toLowerCase().includes(selectedCourse.toLowerCase())
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter(record => {
        const recordDate = new Date(record.attendance_date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return recordDate >= start && recordDate <= end;
      });
    }

    setFilteredAttendance(filtered);
  }, [attendanceData, selectedCourse, startDate, endDate]);

  const handleSearch = () => {
    toast.success(`Found ${filteredAttendance.length} attendance records`);
  };

  return (
    <div className="w-full max-w-none bg-gray-50 min-h-screen">
      {/* Header Navigation */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <a href="/admin" className="text-blue-600 hover:text-blue-800 font-medium">
            Home
          </a>
        </div>
      </div>

      {/* All Students Attendance Record Header */}
      <div className="px-4 py-6">
        <div className="bg-gray-300 px-6 py-4 mb-6">
          <h1 className="text-2xl font-bold text-green-600">All Students Attendance Record</h1>
        </div>

        {/* Main Content */}
        <div className="bg-gray-300 p-8 rounded">
          {/* Filter Controls */}
          <div className="flex items-center gap-4">
            {/* Select Franchise */}
            <div className="min-w-40">
              <Select value={selectedFranchise} onValueChange={setSelectedFranchise}>
                <SelectTrigger className="w-full bg-white border border-gray-400 h-12 text-base">
                  <SelectValue placeholder="Select Frencise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="franchise1">Franchise 001</SelectItem>
                  <SelectItem value="franchise2">Franchise 002</SelectItem>
                  <SelectItem value="franchise3">Franchise 003</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Select Course */}
            <div className="min-w-64">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full bg-white border border-gray-400 h-12 text-base">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="course1">Computer Basics</SelectItem>
                  <SelectItem value="course2">Advanced Computer Course</SelectItem>
                  <SelectItem value="course3">Programming Fundamentals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Start Date */}
            <div className="min-w-48">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Start Date"
                className="w-full bg-white border border-gray-400 h-12 text-base"
              />
            </div>

            {/* End Date */}
            <div className="min-w-48">
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End Date"
                className="w-full bg-white border border-gray-400 h-12 text-base"
              />
            </div>

            {/* Search Button */}
            <Button 
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 h-12 text-base font-medium"
            >
              search
            </Button>
          </div>

          {/* Results Section */}
          {loading ? (
            <div className="mt-8 flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Loading attendance records...</span>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <div className="bg-white border-2 border-gray-600">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr className="bg-blue-600 text-white">
                        <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left">Student ID</th>
                        <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left">Student Name</th>
                        <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left">Course</th>
                        <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left">Date</th>
                        <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left">Status</th>
                        <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left">Session Type</th>
                        <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left">Marked By</th>
                        <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAttendance.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="border-2 border-gray-600 px-4 py-8 text-center text-gray-500">
                            No attendance records found
                          </td>
                        </tr>
                      ) : (
                        filteredAttendance.map((record, index) => (
                          <tr key={record.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                            <td className="border-2 border-gray-600 px-2 py-3 text-xs">{record.student_id}</td>
                            <td className="border-2 border-gray-600 px-2 py-3 text-xs">{record.student_name}</td>
                            <td className="border-2 border-gray-600 px-2 py-3 text-xs">{record.course_name}</td>
                            <td className="border-2 border-gray-600 px-2 py-3 text-xs">
                              {new Date(record.attendance_date).toLocaleDateString()}
                            </td>
                            <td className="border-2 border-gray-600 px-2 py-3 text-xs">
                              <span className={`px-2 py-1 rounded text-xs ${
                                record.status === 'present' 
                                  ? 'bg-green-100 text-green-800' 
                                  : record.status === 'absent'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {record.status}
                              </span>
                            </td>
                            <td className="border-2 border-gray-600 px-2 py-3 text-xs">{record.session_type}</td>
                            <td className="border-2 border-gray-600 px-2 py-3 text-xs">{record.marked_by || '-'}</td>
                            <td className="border-2 border-gray-600 px-2 py-3 text-xs">{record.remarks || '-'}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                Total Records: {filteredAttendance.length}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceReportContent;