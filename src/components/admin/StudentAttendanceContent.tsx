import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { Loader2, UserCheck, UserX, Users, Calendar, TrendingUp, CheckCircle } from "lucide-react";
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

  // Calculate statistics
  const todayAttendance = attendanceData.filter(a => 
    new Date(a.attendance_date).toDateString() === new Date().toDateString()
  );
  const presentToday = todayAttendance.filter(a => a.status === 'present').length;
  const absentToday = todayAttendance.filter(a => a.status === 'absent').length;
  const totalStudents = filteredStudents.length;
  const attendanceRate = totalStudents > 0 ? Math.round((presentToday / totalStudents) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-4">
            <UserCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
            Student Attendance Management
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Efficiently track and manage student attendance with real-time updates and comprehensive analytics
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Students</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{totalStudents}</div>
              <p className="text-xs text-blue-600">Active enrollments</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-100 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Present Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{presentToday}</div>
              <p className="text-xs text-green-600">Students attended</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-pink-100 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700">Absent Today</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-900">{absentToday}</div>
              <p className="text-xs text-red-600">Students absent</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-100 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Attendance Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{attendanceRate}%</div>
              <p className="text-xs text-purple-600">Overall performance</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters Section */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Search & Filter Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Franchise ID</label>
                <Select value={selectedFranchise} onValueChange={setSelectedFranchise}>
                  <SelectTrigger className="h-11 border-gray-300 bg-white hover:border-blue-400 focus:border-blue-500 transition-colors">
                    <SelectValue placeholder="Select Franchise ID" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="franchise1">Franchise 001</SelectItem>
                    <SelectItem value="franchise2">Franchise 002</SelectItem>
                    <SelectItem value="franchise3">Franchise 003</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Course</label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="h-11 border-gray-300 bg-white hover:border-blue-400 focus:border-blue-500 transition-colors">
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="course1">Computer Basics</SelectItem>
                    <SelectItem value="course2">Advanced Computer Course</SelectItem>
                    <SelectItem value="course3">Programming Fundamentals</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Action</label>
                <Button 
                  onClick={handleSearch}
                  className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Search Students
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students Attendance Cards */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Mark Attendance ({filteredStudents.length} students)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredStudents.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Students Found</h3>
                <p className="text-gray-500">No students match the selected criteria. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredStudents.map((student) => (
                  <Card key={student.id} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-900 text-lg">{student.full_name}</h3>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600">{student.course_name || 'No course assigned'}</p>
                            <p className="text-xs text-gray-500 font-mono">ID: {student.id}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button
                            onClick={() => markAttendance(student, 'present')}
                            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                            size="sm"
                          >
                            <UserCheck className="w-4 h-4 mr-2" />
                            Present
                          </Button>
                          <Button
                            onClick={() => markAttendance(student, 'absent')}
                            className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                            size="sm"
                          >
                            <UserX className="w-4 h-4 mr-2" />
                            Absent
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Today's Summary */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              Today's Attendance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="text-3xl font-bold text-green-600 mb-2">{presentToday}</div>
                <div className="text-sm font-medium text-gray-600">Students Present</div>
              </div>
              <div className="text-center p-6 bg-white/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="text-3xl font-bold text-red-600 mb-2">{absentToday}</div>
                <div className="text-sm font-medium text-gray-600">Students Absent</div>
              </div>
              <div className="text-center p-6 bg-white/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="text-3xl font-bold text-indigo-600 mb-2">{attendanceRate}%</div>
                <div className="text-sm font-medium text-gray-600">Attendance Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentAttendanceContent;