import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Users, 
  UserCheck, 
  UserX, 
  Loader2, 
  RefreshCw,
  Eye,
  Download,
  Filter
} from "lucide-react";

interface Student {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  course_name: string;
  status: 'active' | 'inactive' | 'suspended';
  enrollment_date: string;
  city: string;
  state: string;
  created_at: string;
  updated_at: string;
}

const StudentManagementRealTime = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseName: "",
    city: "",
    state: "",
    status: "active" as "active" | "inactive" | "suspended"
  });
  const [formLoading, setFormLoading] = useState(false);

  // Load students data
  const loadStudents = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('student_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStudents(data || []);
    } catch (error: any) {
      console.error('Error loading students:', error);
      toast.error("Failed to load students data");
    } finally {
      setLoading(false);
    }
  };

  // Real-time subscription
  useEffect(() => {
    loadStudents();

    const channel = supabase
      .channel('student-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'student_profiles'
        },
        (payload: any) => {
          console.log('Student change:', payload);
          
          if (payload.eventType === 'INSERT') {
            setStudents(prev => [payload.new, ...prev]);
            toast.success("New student registered!");
          } else if (payload.eventType === 'UPDATE') {
            setStudents(prev => 
              prev.map(student => 
                student.id === payload.new.id ? payload.new : student
              )
            );
            toast.success("Student updated!");
          } else if (payload.eventType === 'DELETE') {
            setStudents(prev => 
              prev.filter(student => student.id !== payload.old.id)
            );
            toast.success("Student removed!");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    const matchesCourse = courseFilter === "all" || student.course_name === courseFilter;
    
    return matchesSearch && matchesStatus && matchesCourse;
  });

  // Get unique courses for filter
  const uniqueCourses = [...new Set(students.map(s => s.course_name))];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      courseName: "",
      city: "",
      state: "",
      status: "active"
    });
    setEditingStudent(null);
  };

  const openEditDialog = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      fullName: student.full_name,
      email: student.email,
      phone: student.phone,
      courseName: student.course_name,
      city: student.city,
      state: student.state,
      status: student.status
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    setFormLoading(true);
    try {
      const studentData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        course_name: formData.courseName,
        city: formData.city,
        state: formData.state,
        status: formData.status,
        updated_at: new Date().toISOString()
      };

      if (editingStudent) {
        // Update existing student
        const { error } = await (supabase as any)
          .from('student_profiles')
          .update(studentData)
          .eq('id', editingStudent.id);

        if (error) throw error;
        toast.success("Student updated successfully!");
      } else {
        // Create new student
        const { error } = await (supabase as any)
          .from('student_profiles')
          .insert({
            ...studentData,
            enrollment_date: new Date().toISOString(),
            created_at: new Date().toISOString()
          });

        if (error) throw error;
        toast.success("Student registered successfully!");
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error('Error saving student:', error);
      toast.error(error.message || "Failed to save student data");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (studentId: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      const { error } = await (supabase as any)
        .from('student_profiles')
        .delete()
        .eq('id', studentId);

      if (error) throw error;
      toast.success("Student deleted successfully!");
    } catch (error: any) {
      console.error('Error deleting student:', error);
      toast.error("Failed to delete student");
    }
  };

  const handleStatusChange = async (studentId: string, newStatus: string) => {
    try {
      const { error } = await (supabase as any)
        .from('student_profiles')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', studentId);

      if (error) throw error;
      toast.success(`Student status updated to ${newStatus}`);
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error("Failed to update student status");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading student data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="p-8 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <span>Student Management</span>
          </CardTitle>
          <div className="flex space-x-3">
            <Button
              onClick={loadStudents}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={resetForm}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Student</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>
                    {editingStudent ? "Edit Student" : "Add New Student"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="Enter full name"
                        disabled={formLoading}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter email"
                        disabled={formLoading}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter phone number"
                        disabled={formLoading}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Course Name</label>
                      <Select 
                        value={formData.courseName} 
                        onValueChange={(value) => handleInputChange('courseName', value)}
                      >
                        <SelectTrigger disabled={formLoading}>
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADCA">ADCA</SelectItem>
                          <SelectItem value="PGDCA">PGDCA</SelectItem>
                          <SelectItem value="DCHN">DCHN</SelectItem>
                          <SelectItem value="DTP">DTP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">City</label>
                      <Input
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="Enter city"
                        disabled={formLoading}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">State</label>
                      <Input
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        placeholder="Enter state"
                        disabled={formLoading}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Status</label>
                      <Select 
                        value={formData.status} 
                        onValueChange={(value) => handleInputChange('status', value)}
                      >
                        <SelectTrigger disabled={formLoading}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      disabled={formLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={formLoading}
                      className="flex items-center space-x-2"
                    >
                      {formLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-4 w-4" />
                          <span>{editingStudent ? "Update" : "Register"} Student</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        {/* Filters and Search */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search students..."
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {uniqueCourses.map(course => (
                <SelectItem key={course} value={course}>{course}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Students Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Student Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Enrolled</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{student.full_name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>{student.course_name}</TableCell>
                    <TableCell>{student.city}, {student.state}</TableCell>
                    <TableCell>{getStatusBadge(student.status)}</TableCell>
                    <TableCell>
                      {new Date(student.enrollment_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(student)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Select
                          value={student.status}
                          onValueChange={(value) => handleStatusChange(student.id, value)}
                        >
                          <SelectTrigger className="w-24 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(student.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <UserCheck className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold">
                  {students.filter(s => s.status === 'active').length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <UserX className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Inactive</p>
                <p className="text-2xl font-bold">
                  {students.filter(s => s.status === 'inactive').length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <UserX className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Suspended</p>
                <p className="text-2xl font-bold">
                  {students.filter(s => s.status === 'suspended').length}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentManagementRealTime;