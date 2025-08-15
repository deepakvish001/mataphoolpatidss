import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, Edit, Trash2, Loader2, Plus, Search } from "lucide-react";
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
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading attendance records...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.present}</div>
            <div className="text-sm text-green-600">Present</div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
            <div className="text-sm text-red-600">Absent</div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
            <div className="text-sm text-yellow-600">Late</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-blue-600">Total Records</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.percentage}%</div>
            <div className="text-sm text-purple-600">Attendance Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Mark Attendance Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-red-600 flex items-center space-x-3">
            <div className="p-2 bg-red-500 rounded-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <span>Mark Attendance</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Student ID *</label>
              <Input
                value={formData.studentId}
                onChange={(e) => handleInputChange('studentId', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                placeholder="Enter student ID"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Student Name *</label>
              <Input
                value={formData.studentName}
                onChange={(e) => handleInputChange('studentName', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                placeholder="Enter student name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Course Name *</label>
              <Select value={formData.courseName} onValueChange={(value) => handleInputChange('courseName', value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date *</label>
              <Input
                type="date"
                value={formData.attendanceDate}
                onChange={(e) => handleInputChange('attendanceDate', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status *</label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Session Type</label>
              <Select value={formData.sessionType} onValueChange={(value) => handleInputChange('sessionType', value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
                  <SelectValue placeholder="Select session type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="theory">Theory</SelectItem>
                  <SelectItem value="practical">Practical</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Remarks</label>
              <Input
                value={formData.remarks}
                onChange={(e) => handleInputChange('remarks', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                placeholder="Optional remarks"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Marked By</label>
              <Input
                value={formData.markedBy}
                onChange={(e) => handleInputChange('markedBy', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                placeholder="Teacher/Admin name"
              />
            </div>
          </div>

          <div className="pt-6 flex space-x-4">
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              {editingAttendance ? 'Update Attendance' : 'Mark Attendance'}
            </Button>
            
            {editingAttendance && (
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-gray-600 text-gray-600 hover:bg-gray-50 px-6 py-3"
              >
                Cancel Edit
              </Button>
            )}
            
            {!editingAttendance && (
              <>
                <Button
                  onClick={() => handleBulkAttendance('present')}
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-3"
                >
                  Bulk Present
                </Button>
                
                <Button
                  onClick={() => handleBulkAttendance('absent')}
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50 px-6 py-3"
                >
                  Bulk Absent
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filter Section */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Input
              value={filterData.studentId}
              onChange={(e) => handleFilterChange('studentId', e.target.value)}
              className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              placeholder="Search student..."
            />
            
            <Input
              value={filterData.courseName}
              onChange={(e) => handleFilterChange('courseName', e.target.value)}
              className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              placeholder="Search course..."
            />
            
            <Input
              type="date"
              value={filterData.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
            />
            
            <Input
              type="date"
              value={filterData.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
            />
            
            <Select value={filterData.status} onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger className="h-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Records Table */}
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-red-600 hover:bg-red-600">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Actions</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Date</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Student ID</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Student Name</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Course</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Session</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Status</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Remarks</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Marked By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendance.map((record, index) => (
                <TableRow key={record.id} className={index % 2 === 0 ? "bg-red-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 p-4">
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(record)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(record.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {new Date(record.attendance_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {record.student_id}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {record.student_name}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {record.course_name}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {record.session_type}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.status === 'present' ? 'bg-green-100 text-green-800' :
                      record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {record.status}
                    </span>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {record.remarks || "-"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {record.marked_by || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceManagementContent;
