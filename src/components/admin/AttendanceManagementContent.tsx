import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, Edit, Trash2, Loader2, Plus, Search, Users, UserCheck, UserX, CalendarClock, TrendingUp, Filter, X } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface AttendanceManagement {
  id: string;
  student_id: string;
  student_name: string;
  course_name: string;
  attendance_date: string;
  status: 'present' | 'absent' | 'late';
  session_type: string;
  remarks?: string;
  marked_by?: string;
}

const AttendanceManagementContent = () => {
  const {
    data: attendance,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<AttendanceManagement>({ 
    tableName: 'attendance_management',
    orderBy: { column: 'attendance_date', ascending: false }
  });

  useAdminRealTime({
    tableName: 'attendance_management'
  });

  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    courseName: "",
    attendanceDate: new Date().toISOString().split('T')[0],
    status: "present" as 'present' | 'absent' | 'late',
    sessionType: "theory",
    remarks: "",
    markedBy: ""
  });

  const [editingAttendance, setEditingAttendance] = useState<AttendanceManagement | null>(null);

  const [filterData, setFilterData] = useState({
    studentId: "",
    courseName: "",
    startDate: "",
    endDate: "",
    status: ""
  });

  const [filteredAttendance, setFilteredAttendance] = useState<AttendanceManagement[]>([]);

  // Filter attendance based on search criteria
  useEffect(() => {
    let filtered = attendance;

    if (filterData.studentId) {
      filtered = filtered.filter(record => 
        record.student_id.toLowerCase().includes(filterData.studentId.toLowerCase()) ||
        record.student_name.toLowerCase().includes(filterData.studentId.toLowerCase())
      );
    }

    if (filterData.courseName) {
      filtered = filtered.filter(record => 
        record.course_name.toLowerCase().includes(filterData.courseName.toLowerCase())
      );
    }

    if (filterData.status) {
      filtered = filtered.filter(record => record.status === filterData.status);
    }

    if (filterData.startDate && filterData.endDate) {
      filtered = filtered.filter(record => {
        const recordDate = new Date(record.attendance_date);
        const start = new Date(filterData.startDate);
        const end = new Date(filterData.endDate);
        return recordDate >= start && recordDate <= end;
      });
    }

    setFilteredAttendance(filtered);
  }, [attendance, filterData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilterData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.studentId || !formData.studentName || !formData.courseName) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editingAttendance) {
        await update(editingAttendance.id, {
          student_id: formData.studentId,
          student_name: formData.studentName,
          course_name: formData.courseName,
          attendance_date: formData.attendanceDate,
          status: formData.status,
          session_type: formData.sessionType,
          remarks: formData.remarks || undefined,
          marked_by: formData.markedBy || undefined
        });
        toast.success("Attendance updated successfully!");
      } else {
        await create({
          student_id: formData.studentId,
          student_name: formData.studentName,
          course_name: formData.courseName,
          attendance_date: formData.attendanceDate,
          status: formData.status,
          session_type: formData.sessionType,
          remarks: formData.remarks || null,
          marked_by: formData.markedBy || null
        });
        toast.success("Attendance marked successfully!");
      }

      handleReset();
    } catch (error) {
      toast.error(`Failed to ${editingAttendance ? 'update' : 'mark'} attendance`);
    }
  };

  const handleEdit = (record: AttendanceManagement) => {
    setEditingAttendance(record);
    setFormData({
      studentId: record.student_id,
      studentName: record.student_name,
      courseName: record.course_name,
      attendanceDate: record.attendance_date,
      status: record.status,
      sessionType: record.session_type,
      remarks: record.remarks || "",
      markedBy: record.marked_by || ""
    });
  };

  const handleReset = () => {
    setEditingAttendance(null);
    setFormData({
      studentId: "",
      studentName: "",
      courseName: "",
      attendanceDate: new Date().toISOString().split('T')[0],
      status: "present",
      sessionType: "theory",
      remarks: "",
      markedBy: ""
    });
  };

  const handleBulkAttendance = async (status: 'present' | 'absent') => {
    if (!formData.courseName || !formData.attendanceDate) {
      toast.error("Please select course and date for bulk attendance");
      return;
    }

    // This would typically fetch students from the course and mark them all
    toast.info(`Bulk ${status} marking would be implemented here for ${formData.courseName}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this attendance record?")) return;
    
    try {
      await deleteItem(id);
      toast.success("Attendance record deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete attendance record");
    }
  };

  const getAttendanceStats = () => {
    const present = filteredAttendance.filter(record => record.status === 'present').length;
    const absent = filteredAttendance.filter(record => record.status === 'absent').length;
    const late = filteredAttendance.filter(record => record.status === 'late').length;
    const total = filteredAttendance.length;

    return { present, absent, late, total, percentage: total > 0 ? ((present + late) / total * 100).toFixed(2) : 0 };
  };

  const stats = getAttendanceStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-12 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-primary/20"></div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">Loading Attendance Management</h3>
                  <p className="text-gray-600">Please wait while we load your attendance records...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-primary to-primary/80 rounded-full mb-4">
            <Clock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Attendance Management System
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track, manage, and analyze student attendance records with comprehensive tools
          </p>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium mb-1">Present Students</p>
                  <p className="text-3xl font-bold text-green-700">{stats.present}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-red-50 to-red-100/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium mb-1">Absent Students</p>
                  <p className="text-3xl font-bold text-red-700">{stats.absent}</p>
                </div>
                <div className="p-3 bg-red-100 rounded-full group-hover:bg-red-200 transition-colors">
                  <UserX className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-yellow-50 to-yellow-100/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium mb-1">Late Arrivals</p>
                  <p className="text-3xl font-bold text-yellow-700">{stats.late}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full group-hover:bg-yellow-200 transition-colors">
                  <CalendarClock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium mb-1">Total Records</p>
                  <p className="text-3xl font-bold text-blue-700">{stats.total}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-medium mb-1">Attendance Rate</p>
                  <p className="text-3xl font-bold text-purple-700">{stats.percentage}%</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mark Attendance Form */}
        <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-primary/10">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-primary to-primary/80 rounded-xl shadow-lg">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <span>Mark Attendance</span>
              </CardTitle>
              {editingAttendance && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  size="sm"
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel Edit
                </Button>
              )}
            </div>
          </CardHeader>
        
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  Student ID <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  value={formData.studentId}
                  onChange={(e) => handleInputChange('studentId', e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white rounded-lg transition-all duration-200"
                  placeholder="Enter student ID"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  Student Name <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  value={formData.studentName}
                  onChange={(e) => handleInputChange('studentName', e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white rounded-lg transition-all duration-200"
                  placeholder="Enter student name"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  Course Name <span className="text-red-500 ml-1">*</span>
                </label>
                <Select value={formData.courseName} onValueChange={(value) => handleInputChange('courseName', value)}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white rounded-lg">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADCA">ADCA</SelectItem>
                    <SelectItem value="DCA">DCA</SelectItem>
                    <SelectItem value="PGDCA">PGDCA</SelectItem>
                    <SelectItem value="BCA">BCA</SelectItem>
                    <SelectItem value="MCA">MCA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  Date <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  type="date"
                  value={formData.attendanceDate}
                  onChange={(e) => handleInputChange('attendanceDate', e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white rounded-lg"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  Status <span className="text-red-500 ml-1">*</span>
                </label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white rounded-lg">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Session Type</label>
                <Select value={formData.sessionType} onValueChange={(value) => handleInputChange('sessionType', value)}>
                  <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white rounded-lg">
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theory">Theory</SelectItem>
                    <SelectItem value="practical">Practical</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Remarks</label>
                <Input
                  value={formData.remarks}
                  onChange={(e) => handleInputChange('remarks', e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white rounded-lg"
                  placeholder="Optional remarks"
                />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Marked By</label>
                <Input
                  value={formData.markedBy}
                  onChange={(e) => handleInputChange('markedBy', e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white rounded-lg"
                  placeholder="Teacher/Admin name"
                />
              </div>
            </div>

            <div className="pt-8 flex flex-wrap gap-4">
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="h-5 w-5 mr-2" />
                {editingAttendance ? 'Update Attendance' : 'Mark Attendance'}
              </Button>
              
              {!editingAttendance && (
                <>
                  <Button
                    onClick={() => handleBulkAttendance('present')}
                    variant="outline"
                    className="border-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                  >
                    <UserCheck className="h-5 w-5 mr-2" />
                    Bulk Present
                  </Button>
                  
                  <Button
                    onClick={() => handleBulkAttendance('absent')}
                    variant="outline"
                    className="border-2 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 px-6 py-3 rounded-lg font-medium transition-all duration-200"
                  >
                    <UserX className="h-5 w-5 mr-2" />
                    Bulk Absent
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Search & Filters */}
        <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-lg">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-800 flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <Filter className="h-5 w-5 text-white" />
              </div>
              <span>Search & Filter Attendance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Search Student</label>
                <Input
                  value={filterData.studentId}
                  onChange={(e) => handleFilterChange('studentId', e.target.value)}
                  className="h-11 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white rounded-lg"
                  placeholder="ID or Name..."
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Course Name</label>
                <Input
                  value={filterData.courseName}
                  onChange={(e) => handleFilterChange('courseName', e.target.value)}
                  className="h-11 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white rounded-lg"
                  placeholder="Search course..."
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Start Date</label>
                <Input
                  type="date"
                  value={filterData.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  className="h-11 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">End Date</label>
                <Input
                  type="date"
                  value={filterData.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  className="h-11 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white rounded-lg"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status Filter</label>
                <Select value={filterData.status} onValueChange={(value) => handleFilterChange('status', value === 'all' ? '' : value)}>
                  <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white rounded-lg">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-800">{filteredAttendance.length}</span> of <span className="font-semibold text-gray-800">{attendance.length}</span> records
              </p>
              <Button
                onClick={() => setFilterData({ studentId: "", courseName: "", startDate: "", endDate: "", status: "" })}
                variant="outline"
                size="sm"
                className="text-gray-600 hover:bg-gray-50"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Records Table */}
        <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-primary/10">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-primary to-primary/80 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <span>Attendance Records</span>
              </CardTitle>
              <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {filteredAttendance.length} records
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b-2 border-gray-200">
                    <TableHead className="text-gray-700 font-bold p-4 text-left">Actions</TableHead>
                    <TableHead className="text-gray-700 font-bold p-4 text-left">Date</TableHead>
                    <TableHead className="text-gray-700 font-bold p-4 text-left">Student ID</TableHead>
                    <TableHead className="text-gray-700 font-bold p-4 text-left">Student Name</TableHead>
                    <TableHead className="text-gray-700 font-bold p-4 text-left">Course</TableHead>
                    <TableHead className="text-gray-700 font-bold p-4 text-left">Session</TableHead>
                    <TableHead className="text-gray-700 font-bold p-4 text-left">Status</TableHead>
                    <TableHead className="text-gray-700 font-bold p-4 text-left">Remarks</TableHead>
                    <TableHead className="text-gray-700 font-bold p-4 text-left">Marked By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendance.map((record, index) => (
                    <TableRow 
                      key={record.id} 
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'} hover:bg-primary/5 transition-all duration-200 border-b border-gray-100`}
                    >
                      <TableCell className="p-4">
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleEdit(record)}
                            size="sm"
                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(record.id)}
                            size="sm"
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="p-4 text-gray-800 font-medium">
                        {new Date(record.attendance_date).toLocaleDateString('en-GB')}
                      </TableCell>
                      <TableCell className="p-4 font-semibold text-primary">{record.student_id}</TableCell>
                      <TableCell className="p-4 font-semibold text-gray-800">{record.student_name}</TableCell>
                      <TableCell className="p-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                          {record.course_name}
                        </span>
                      </TableCell>
                      <TableCell className="p-4">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium border border-purple-200 capitalize">
                          {record.session_type}
                        </span>
                      </TableCell>
                      <TableCell className="p-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border-2 ${
                          record.status === 'present' 
                            ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300' 
                            : record.status === 'absent'
                            ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300'
                            : 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300'
                        }`}>
                          {record.status.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell className="p-4 text-gray-600 max-w-32 truncate" title={record.remarks || '-'}>
                        {record.remarks || '-'}
                      </TableCell>
                      <TableCell className="p-4 text-gray-600">{record.marked_by || '-'}</TableCell>
                    </TableRow>
                  ))}
                  {filteredAttendance.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="p-12 text-center">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="p-4 bg-gray-100 rounded-full">
                            <Users className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-600">No attendance records found</h3>
                            <p className="text-gray-500">Try adjusting your search filters or add new attendance records.</p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceManagementContent;
