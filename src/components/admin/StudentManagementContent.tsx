import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Loader2, Users, BookOpen, GraduationCap, UserCheck, Search, Building, MapPin, Mail, Phone, Trash2, Plus, Download, Printer } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered students based on search and franchise
  const filteredStudents = studentProfiles.filter(student => {
    const matchesSearch = student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.phone && student.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.course_name && student.course_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.city && student.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.state && student.state.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Add franchise filtering logic here if needed
    return matchesSearch;
  });

  // Calculate statistics
  const totalStudents = studentProfiles.length;
  const activeStudents = studentProfiles.filter(s => s.status === 'active').length;
  const uniqueCourses = [...new Set(studentProfiles.filter(s => s.course_name).map(s => s.course_name))].length;
  const recentEnrollments = studentProfiles.filter(student => {
    if (!student.enrollment_date) return false;
    const enrollmentDate = new Date(student.enrollment_date);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return enrollmentDate >= sevenDaysAgo;
  }).length;

  const handleEdit = (studentId: string) => {
    toast.success(`Opening edit form for student ${studentId}`);
  };

  const handleDelete = async (studentId: string) => {
    try {
      await deleteItem(studentId);
      // Success notification is handled by the real-time hook
    } catch (error) {
      toast.error('Failed to delete student');
    }
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-full">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <span>Student Management</span>
        </h1>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Students</p>
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
                <p className="text-green-100 text-sm font-medium">Active Students</p>
                <p className="text-3xl font-bold">{activeStudents}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <UserCheck className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Available Courses</p>
                <p className="text-3xl font-bold">{uniqueCourses}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <GraduationCap className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Recent Enrollments</p>
                <p className="text-3xl font-bold">{recentEnrollments}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <BookOpen className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Franchise Selection and Actions */}
      <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <CardTitle className="text-xl font-bold flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Building className="h-5 w-5" />
            </div>
            <span>Franchise & Actions</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex-1 max-w-lg">
              <Select value={selectedFranchise} onValueChange={setSelectedFranchise}>
                <SelectTrigger className="border-2 border-gray-400 h-12">
                  <SelectValue placeholder="Select Franchise Institute Name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ictc">Institute of Computer Training Centre, Numaish Chauraha, Hardoi</SelectItem>
                  <SelectItem value="ravi">Ravi Kumar Gupta</SelectItem>
                  <SelectItem value="azamgarh">Azamgarh Center</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all">
                <Plus className="h-4 w-4" />
                <span>Add New Student</span>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all">
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </Button>
              <Button variant="outline" className="border-gray-400 hover:bg-gray-50 flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all">
                <Printer className="h-4 w-4" />
                <span>Print Report</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Student Management Table */}
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="text-xl font-bold flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Users className="h-5 w-5" />
              </div>
              <span>Student Records ({filteredStudents.length} students)</span>
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
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">S.No</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Actions</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Student Name</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Email</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Phone</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Course</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Location</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Status</TableHead>
                  <TableHead className="text-white font-bold text-center py-4">Enrollment Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      {searchTerm ? "No students found matching your search." : "No students registered yet."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student, index) => (
                    <TableRow key={student.id} className={`${index % 2 === 0 ? "bg-blue-50/50" : "bg-white"} hover:bg-blue-100/50 transition-colors`}>
                      <TableCell className="text-center p-4 border-r border-gray-200 font-medium">
                        {index + 1}
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex space-x-2 justify-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(student.id)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(student.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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
                          <span className="text-gray-700">{student.phone || "-"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex items-center justify-center space-x-2">
                          <GraduationCap className="h-4 w-4 text-orange-600" />
                          <span className="text-gray-700">{student.course_name || "-"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex items-center justify-center space-x-2">
                          <MapPin className="h-4 w-4 text-indigo-600" />
                          <span className="text-gray-700">
                            {student.city && student.state ? `${student.city}, ${student.state}` : student.state || student.city || "-"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          student.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {student.status || 'Pending'}
                        </span>
                      </TableCell>
                      <TableCell className="text-center p-4">
                        <span className="text-gray-700">
                          {student.enrollment_date ? new Date(student.enrollment_date).toLocaleDateString() : "-"}
                        </span>
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

export default StudentManagementContent;