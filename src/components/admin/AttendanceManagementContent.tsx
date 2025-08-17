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
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-secondary/10 p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm">
            <CardContent className="p-12 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-primary/20"></div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Loading Attendance Management</h3>
                  <p className="text-muted-foreground">Please wait while we load your attendance records...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-secondary/10 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary rounded-full mb-4 shadow-glow">
            <Clock className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            Attendance Management System
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track, manage, and analyze student attendance records with comprehensive tools
          </p>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="bg-gradient-to-br from-success to-success/80 text-success-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-success-foreground/80 text-sm font-medium">Present Students</p>
                  <p className="text-3xl font-bold">{stats.present}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <UserCheck className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-destructive to-destructive/80 text-destructive-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-destructive-foreground/80 text-sm font-medium">Absent Students</p>
                  <p className="text-3xl font-bold">{stats.absent}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <UserX className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm font-medium">Late Arrivals</p>
                  <p className="text-3xl font-bold">{stats.late}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <CalendarClock className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-accent-foreground/80 text-sm font-medium">Total Records</p>
                  <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <Users className="h-6 w-6 text-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-foreground/80 text-sm font-medium">Attendance Rate</p>
                  <p className="text-3xl font-bold text-foreground">{stats.percentage}%</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <TrendingUp className="h-6 w-6 text-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mark Attendance Form */}
        <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-primary-foreground p-8">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold flex items-center space-x-3">
                <div className="p-2 bg-background/20 rounded-lg backdrop-blur-sm">
                  <Plus className="h-6 w-6" />
                </div>
                <span>Mark Attendance</span>
              </CardTitle>
              {editingAttendance && (
                <Button
                  onClick={handleReset}
                  variant="secondary"
                  size="sm"
                  className="bg-background/20 text-primary-foreground border-background/30 hover:bg-background/30"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel Edit
                </Button>
              )}
            </div>
          </CardHeader>
        
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Student ID <span className="text-destructive">*</span></label>
                <Input
                  value={formData.studentId}
                  onChange={(e) => handleInputChange('studentId', e.target.value)}
                  className="border-border/40 bg-background focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                  placeholder="Enter student ID"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Student Name <span className="text-destructive">*</span></label>
                <Input
                  value={formData.studentName}
                  onChange={(e) => handleInputChange('studentName', e.target.value)}
                  className="border-border/40 bg-background focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                  placeholder="Enter student name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Course Name <span className="text-destructive">*</span></label>
                <Select value={formData.courseName} onValueChange={(value) => handleInputChange('courseName', value)}>
                  <SelectTrigger className="border-border/40 bg-background focus:border-primary/50 focus:ring-primary/20">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/40">
                    <SelectItem value="ADCA" className="hover:bg-accent/50">ADCA</SelectItem>
                    <SelectItem value="DCA" className="hover:bg-accent/50">DCA</SelectItem>
                    <SelectItem value="PGDCA" className="hover:bg-accent/50">PGDCA</SelectItem>
                    <SelectItem value="BCA" className="hover:bg-accent/50">BCA</SelectItem>
                    <SelectItem value="MCA" className="hover:bg-accent/50">MCA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Date <span className="text-destructive">*</span></label>
                <Input
                  type="date"
                  value={formData.attendanceDate}
                  onChange={(e) => handleInputChange('attendanceDate', e.target.value)}
                  className="border-border/40 bg-background focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Status <span className="text-destructive">*</span></label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger className="border-border/40 bg-background focus:border-primary/50 focus:ring-primary/20">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/40">
                    <SelectItem value="present" className="hover:bg-accent/50">Present</SelectItem>
                    <SelectItem value="absent" className="hover:bg-accent/50">Absent</SelectItem>
                    <SelectItem value="late" className="hover:bg-accent/50">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Session Type</label>
                <Select value={formData.sessionType} onValueChange={(value) => handleInputChange('sessionType', value)}>
                  <SelectTrigger className="border-border/40 bg-background focus:border-primary/50 focus:ring-primary/20">
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/40">
                    <SelectItem value="theory" className="hover:bg-accent/50">Theory</SelectItem>
                    <SelectItem value="practical" className="hover:bg-accent/50">Practical</SelectItem>
                    <SelectItem value="both" className="hover:bg-accent/50">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Remarks</label>
                <Input
                  value={formData.remarks}
                  onChange={(e) => handleInputChange('remarks', e.target.value)}
                  className="border-border/40 bg-background focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                  placeholder="Optional remarks"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Marked By</label>
                <Input
                  value={formData.markedBy}
                  onChange={(e) => handleInputChange('markedBy', e.target.value)}
                  className="border-border/40 bg-background focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                  placeholder="Teacher/Admin name"
                />
              </div>
            </div>

            <div className="pt-8 flex flex-wrap gap-4">
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-primary to-primary-hover hover:shadow-lg transition-all duration-300 text-primary-foreground font-medium px-8 py-3"
              >
                <Plus className="h-5 w-5 mr-2" />
                {editingAttendance ? 'Update Attendance' : 'Mark Attendance'}
              </Button>
              
              {!editingAttendance && (
                <>
                  <Button
                    onClick={() => handleBulkAttendance('present')}
                    variant="outline"
                    className="border-success/50 text-success hover:bg-success/10 hover:border-success px-6 py-3 font-medium transition-all duration-200"
                  >
                    <UserCheck className="h-5 w-5 mr-2" />
                    Bulk Present
                  </Button>
                  
                  <Button
                    onClick={() => handleBulkAttendance('absent')}
                    variant="outline"
                    className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive px-6 py-3 font-medium transition-all duration-200"
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
        <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-accent/20 to-muted/20 border-b border-border/20">
            <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Filter className="h-5 w-5 text-primary" />
              </div>
              <span>Search & Filter Attendance</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Search Student</label>
                <Input
                  value={filterData.studentId}
                  onChange={(e) => handleFilterChange('studentId', e.target.value)}
                  className="border-border/40 bg-background focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                  placeholder="ID or Name..."
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Course Name</label>
                <Input
                  value={filterData.courseName}
                  onChange={(e) => handleFilterChange('courseName', e.target.value)}
                  className="border-border/40 bg-background focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                  placeholder="Search course..."
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Start Date</label>
                <Input
                  type="date"
                  value={filterData.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  className="border-border/40 bg-background focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">End Date</label>
                <Input
                  type="date"
                  value={filterData.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  className="border-border/40 bg-background focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Status Filter</label>
                <Select value={filterData.status} onValueChange={(value) => handleFilterChange('status', value === 'all' ? '' : value)}>
                  <SelectTrigger className="border-border/40 bg-background focus:border-primary/50 focus:ring-primary/20">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/40">
                    <SelectItem value="all" className="hover:bg-accent/50">All Status</SelectItem>
                    <SelectItem value="present" className="hover:bg-accent/50">Present</SelectItem>
                    <SelectItem value="absent" className="hover:bg-accent/50">Absent</SelectItem>
                    <SelectItem value="late" className="hover:bg-accent/50">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredAttendance.length}</span> of <span className="font-semibold text-foreground">{attendance.length}</span> records
              </p>
              <Button
                onClick={() => setFilterData({ studentId: "", courseName: "", startDate: "", endDate: "", status: "" })}
                variant="outline"
                size="sm"
                className="border-border/40 text-muted-foreground hover:bg-accent/50"
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Records Table */}
        <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-primary-foreground p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold flex items-center space-x-3">
                <div className="p-2 bg-background/20 rounded-lg backdrop-blur-sm">
                  <Users className="h-5 w-5" />
                </div>
                <span>Attendance Records</span>
              </CardTitle>
              <div className="text-sm bg-background/20 px-3 py-1 rounded-full backdrop-blur-sm">
                {filteredAttendance.length} records
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-accent/30 to-muted/30 border-b-2 border-border/20 hover:bg-gradient-to-r hover:from-accent/30 hover:to-muted/30">
                    <TableHead className="text-foreground font-bold p-4 text-left">Actions</TableHead>
                    <TableHead className="text-foreground font-bold p-4 text-left">Date</TableHead>
                    <TableHead className="text-foreground font-bold p-4 text-left">Student ID</TableHead>
                    <TableHead className="text-foreground font-bold p-4 text-left">Student Name</TableHead>
                    <TableHead className="text-foreground font-bold p-4 text-left">Course</TableHead>
                    <TableHead className="text-foreground font-bold p-4 text-left">Session</TableHead>
                    <TableHead className="text-foreground font-bold p-4 text-left">Status</TableHead>
                    <TableHead className="text-foreground font-bold p-4 text-left">Remarks</TableHead>
                    <TableHead className="text-foreground font-bold p-4 text-left">Marked By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendance.map((record, index) => (
                    <TableRow 
                      key={record.id} 
                      className={`${index % 2 === 0 ? 'bg-background' : 'bg-accent/10'} hover:bg-primary/5 transition-all duration-200 border-b border-border/20`}
                    >
                      <TableCell className="p-4">
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleEdit(record)}
                            size="sm"
                            className="bg-gradient-to-r from-primary to-primary-hover hover:shadow-lg transition-all duration-200 h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(record.id)}
                            size="sm"
                            className="bg-gradient-to-r from-destructive to-destructive/90 hover:shadow-lg transition-all duration-200 h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="p-4 text-foreground font-medium">
                        {new Date(record.attendance_date).toLocaleDateString('en-GB')}
                      </TableCell>
                      <TableCell className="p-4 font-semibold text-primary">{record.student_id}</TableCell>
                      <TableCell className="p-4 font-semibold text-foreground">{record.student_name}</TableCell>
                      <TableCell className="p-4">
                        <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-medium border border-border/20">
                          {record.course_name}
                        </span>
                      </TableCell>
                      <TableCell className="p-4">
                        <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium border border-border/20 capitalize">
                          {record.session_type}
                        </span>
                      </TableCell>
                      <TableCell className="p-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border-2 ${
                          record.status === 'present' 
                            ? 'bg-gradient-to-r from-success/20 to-success/30 text-success border-success/30' 
                            : record.status === 'absent'
                            ? 'bg-gradient-to-r from-destructive/20 to-destructive/30 text-destructive border-destructive/30'
                            : 'bg-gradient-to-r from-primary/20 to-primary/30 text-primary border-primary/30'
                        }`}>
                          {record.status.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell className="p-4 text-muted-foreground max-w-32 truncate" title={record.remarks || '-'}>
                        {record.remarks || '-'}
                      </TableCell>
                      <TableCell className="p-4 text-muted-foreground">{record.marked_by || '-'}</TableCell>
                    </TableRow>
                  ))}
                  {filteredAttendance.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="p-12 text-center">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="p-4 bg-accent/20 rounded-full">
                            <Users className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-muted-foreground">No attendance records found</h3>
                            <p className="text-muted-foreground">Try adjusting your search filters or add new attendance records.</p>
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
