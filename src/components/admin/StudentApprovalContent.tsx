import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { AdminPresenceIndicator } from "@/components/admin/AdminPresenceIndicator";
import { Loader2, Users, CheckCircle, Clock, Search, UserCheck, Download, Mail, Phone, GraduationCap, MapPin, Calendar, Shield } from "lucide-react";
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

  const [searchTerm, setSearchTerm] = useState("");

  // Filtered students based on search
  const filteredStudents = students.filter(student =>
    student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (student.phone && student.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (student.course_name && student.course_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (student.city && student.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (student.state && student.state.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate statistics
  const totalStudents = students.length;
  const approvedStudents = students.filter(s => s.status === 'active').length;
  const pendingStudents = students.filter(s => s.status === 'pending').length;
  const recentApplications = students.filter(student => {
    const enrollmentDate = new Date(student.enrollment_date);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return enrollmentDate >= sevenDaysAgo;
  }).length;

  const handleApprovalChange = async (student: StudentProfile, approved: boolean) => {
    try {
      const newStatus = approved ? 'active' : 'pending';
      await update(student.id, {
        ...student,
        status: newStatus
      });

      // Note: Success notification is handled automatically by the real-time hook
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
      <div className="w-full max-w-none bg-white flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading student approvals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-full">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <span>Student Approval Management</span>
        </h1>
        <AdminPresenceIndicator 
          currentSection="student-approval" 
          showSectionUsers={true}
          showOnlineCount={true}
        />
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Applications</p>
                <p className="text-3xl font-bold">{totalStudents}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Approved Students</p>
                <p className="text-3xl font-bold">{approvedStudents}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Pending Approval</p>
                <p className="text-3xl font-bold">{pendingStudents}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Recent Applications</p>
                <p className="text-3xl font-bold">{recentApplications}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons Card */}
      <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <CardTitle className="text-xl font-bold flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <UserCheck className="h-5 w-5" />
            </div>
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={handleBulkApproval}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2 px-6 py-3 shadow-lg hover:shadow-xl transition-all"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Process Approved Students ({approvedStudents})</span>
            </Button>
            <Button 
              variant="outline"
              className="border-gray-400 hover:bg-gray-50 flex items-center space-x-2 px-6 py-3 shadow-lg hover:shadow-xl transition-all"
            >
              <Download className="h-4 w-4" />
              <span>Export List</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Management Table */}
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="text-xl font-bold flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Users className="h-5 w-5" />
              </div>
              <span>Student Approval Management ({filteredStudents.length} students)</span>
            </CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/90 border-white/20 focus:border-white focus:ring-white/20"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Approve</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Student Name</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Email</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Phone</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Course Name</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Location</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Status</TableHead>
                  <TableHead className="text-white font-bold text-center py-4">Enrollment Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      {searchTerm ? "No students found matching your search." : "No student profiles found."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student, index) => (
                    <TableRow key={student.id} className={`${index % 2 === 0 ? "bg-blue-50/50" : "bg-white"} hover:bg-blue-100/50 transition-colors`}>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex justify-center">
                          <Checkbox
                            checked={student.status === 'active'}
                            onCheckedChange={(checked) => handleApprovalChange(student, checked as boolean)}
                            className="w-5 h-5 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="p-4 border-r border-gray-200">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-gray-800">{student.full_name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex items-center justify-center space-x-2">
                          <Mail className="h-4 w-4 text-green-600" />
                          <span className="text-gray-700">{student.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex items-center justify-center space-x-2">
                          <Phone className="h-4 w-4 text-purple-600" />
                          <span className="text-gray-700">{student.phone || '-'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex items-center justify-center space-x-2">
                          <GraduationCap className="h-4 w-4 text-orange-600" />
                          <span className="text-gray-700">{student.course_name || 'Not assigned'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex items-center justify-center space-x-2">
                          <MapPin className="h-4 w-4 text-indigo-600" />
                          <span className="text-gray-700">
                            {student.city && student.state ? `${student.city}, ${student.state}` : student.state || student.city || '-'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          student.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {student.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-center p-4">
                        <div className="flex items-center justify-center space-x-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="text-gray-700">{new Date(student.enrollment_date).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentApprovalContent;