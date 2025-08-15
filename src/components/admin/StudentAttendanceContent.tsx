import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { Loader2, UserCheck, UserX } from "lucide-react";
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

interface StudentProfile {
  id: string;
  full_name: string;
  email: string;
  course_name?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const StudentAttendanceContent = () => {
  const [selectedFranchise, setSelectedFranchise] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<StudentProfile[]>([]);

  const { data: attendanceData, create: createAttendance } = useOptimisticCrud<AttendanceRecord>({
    tableName: 'attendance_management',
    orderBy: { column: 'created_at', ascending: false }
  });

  const { data: students, loading } = useOptimisticCrud<StudentProfile>({
    tableName: 'student_profiles',
    orderBy: { column: 'full_name', ascending: true }
  });

  // Enable real-time updates
  useAdminRealTime({
    tableName: 'attendance_management'
  });

  useAdminRealTime({
    tableName: 'student_profiles'
  });

  // Filter students based on course selection
  useEffect(() => {
    let filtered = students;

    if (selectedCourse) {
      filtered = filtered.filter(student => 
        student.course_name?.toLowerCase().includes(selectedCourse.toLowerCase())
      );
    }

    setFilteredStudents(filtered);
  }, [students, selectedCourse]);

  const markAttendance = async (student: StudentProfile, status: 'present' | 'absent') => {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      await createAttendance({
        student_id: student.id,
        student_name: student.full_name,
        course_name: student.course_name || 'Not specified',
        attendance_date: today,
        status,
        session_type: 'theory',
        marked_by: 'Admin',
        remarks: `Marked ${status} on ${new Date().toLocaleDateString()}`
      });

      toast.success(`${student.full_name} marked as ${status}`);
    } catch (error) {
      toast.error('Failed to mark attendance');
    }
  };

  const handleSearch = () => {
    toast.success(`Found ${filteredStudents.length} students`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading students...</span>
        </div>
      </div>
    );
  }

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

      {/* All Students Header */}
      <div className="px-4 py-6">
        <div className="bg-gray-300 px-6 py-4 mb-6">
          <h1 className="text-2xl font-bold text-green-600">All Students</h1>
        </div>

        {/* Main Content */}
        <div className="bg-gray-300 p-8 rounded">
          {/* Filter Controls */}
          <div className="flex items-center justify-center gap-6 mb-8">
            {/* Select Franchise ID */}
            <div className="min-w-64">
              <Select value={selectedFranchise} onValueChange={setSelectedFranchise}>
                <SelectTrigger className="w-full bg-white border border-gray-400 h-12 text-base">
                  <SelectValue placeholder="Select Franchise ID" />
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

            {/* Search Button */}
            <Button 
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 h-12 text-base font-medium"
            >
              search
            </Button>
          </div>

          {/* Students List for Attendance */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              Mark Attendance ({filteredStudents.length} students)
            </h2>
            
            {filteredStudents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No students found for the selected criteria
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
                    <div className="mb-3">
                      <h3 className="font-medium text-gray-900">{student.full_name}</h3>
                      <p className="text-sm text-gray-600">{student.course_name || 'No course assigned'}</p>
                      <p className="text-xs text-gray-500">ID: {student.id}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        onClick={() => markAttendance(student, 'present')}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm"
                        size="sm"
                      >
                        <UserCheck className="w-4 h-4 mr-1" />
                        Present
                      </Button>
                      <Button
                        onClick={() => markAttendance(student, 'absent')}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm"
                        size="sm"
                      >
                        <UserX className="w-4 h-4 mr-1" />
                        Absent
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Attendance Summary */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Today's Attendance Summary</h3>
            <div className="bg-white border border-gray-300 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {attendanceData.filter(a => 
                      a.status === 'present' && 
                      new Date(a.attendance_date).toDateString() === new Date().toDateString()
                    ).length}
                  </div>
                  <div className="text-sm text-gray-600">Present Today</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {attendanceData.filter(a => 
                      a.status === 'absent' && 
                      new Date(a.attendance_date).toDateString() === new Date().toDateString()
                    ).length}
                  </div>
                  <div className="text-sm text-gray-600">Absent Today</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceContent;