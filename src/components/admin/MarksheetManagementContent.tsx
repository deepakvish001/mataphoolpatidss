import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Edit, Trash2, Loader2, Plus, Search, Calendar, CheckCircle, Clock, Calculator, TrendingUp, Users, Award, BarChart3 } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface MarksheetManagement {
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
}

const MarksheetManagementContent = () => {
  const {
    data: marksheets,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<MarksheetManagement>({ 
    tableName: 'marksheet_management',
    orderBy: { column: 'examination_date', ascending: false }
  });

  useAdminRealTime({
    tableName: 'marksheet_management'
  });

  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    courseName: "",
    rollNumber: "",
    examinationDate: "",
    totalMarks: "",
    obtainedMarks: "",
    grade: "",
    resultStatus: "pass"
  });

  const [editingMarksheet, setEditingMarksheet] = useState<MarksheetManagement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculatePercentage = (obtained: number, total: number) => {
    return total > 0 ? Math.round((obtained / total) * 100 * 100) / 100 : 0;
  };

  const calculateGrade = (percentage: number) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    return "F";
  };

  const handleSubmit = async () => {
    if (!formData.studentId || !formData.studentName || !formData.courseName || !formData.rollNumber || !formData.totalMarks || !formData.obtainedMarks) {
      toast.error("Please fill in all required fields");
      return;
    }

    const totalMarks = parseInt(formData.totalMarks);
    const obtainedMarks = parseInt(formData.obtainedMarks);
    
    if (obtainedMarks > totalMarks) {
      toast.error("Obtained marks cannot be greater than total marks");
      return;
    }

    const percentage = calculatePercentage(obtainedMarks, totalMarks);
    const autoGrade = calculateGrade(percentage);

    try {
      if (editingMarksheet) {
        await update(editingMarksheet.id, {
          student_id: formData.studentId,
          student_name: formData.studentName,
          course_name: formData.courseName,
          roll_number: formData.rollNumber,
          examination_date: formData.examinationDate,
          total_marks: totalMarks,
          obtained_marks: obtainedMarks,
          percentage: percentage,
          grade: formData.grade || autoGrade,
          result_status: formData.resultStatus
        });
        toast.success("Marksheet updated successfully!");
      } else {
        await create({
          student_id: formData.studentId,
          student_name: formData.studentName,
          course_name: formData.courseName,
          roll_number: formData.rollNumber,
          examination_date: formData.examinationDate,
          total_marks: totalMarks,
          obtained_marks: obtainedMarks,
          percentage: percentage,
          grade: formData.grade || autoGrade,
          result_status: formData.resultStatus
        });
        toast.success("Marksheet created successfully!");
      }

      handleReset();
    } catch (error) {
      toast.error(`Failed to ${editingMarksheet ? 'update' : 'create'} marksheet`);
    }
  };

  const handleEdit = (marksheet: MarksheetManagement) => {
    setEditingMarksheet(marksheet);
    setFormData({
      studentId: marksheet.student_id,
      studentName: marksheet.student_name,
      courseName: marksheet.course_name,
      rollNumber: marksheet.roll_number,
      examinationDate: marksheet.examination_date,
      totalMarks: marksheet.total_marks.toString(),
      obtainedMarks: marksheet.obtained_marks.toString(),
      grade: marksheet.grade,
      resultStatus: marksheet.result_status
    });
  };

  const handleReset = () => {
    setEditingMarksheet(null);
    setFormData({
      studentId: "",
      studentName: "",
      courseName: "",
      rollNumber: "",
      examinationDate: "",
      totalMarks: "",
      obtainedMarks: "",
      grade: "",
      resultStatus: "pass"
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this marksheet?")) return;
    
    try {
      await deleteItem(id);
      toast.success("Marksheet deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete marksheet");
    }
  };

  // Filter and search functionality
  const filteredMarksheets = useMemo(() => {
    return marksheets.filter(marksheet => {
      const matchesSearch = 
        marksheet.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        marksheet.student_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        marksheet.roll_number.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCourse = filterCourse === "" || marksheet.course_name === filterCourse;
      
      return matchesSearch && matchesCourse;
    });
  }, [marksheets, searchTerm, filterCourse]);

  // Statistics calculations
  const stats = useMemo(() => {
    const total = marksheets.length;
    const passed = marksheets.filter(m => m.result_status === 'pass').length;
    const averagePercentage = marksheets.length > 0 
      ? marksheets.reduce((sum, m) => sum + m.percentage, 0) / marksheets.length 
      : 0;
    const highPerformers = marksheets.filter(m => m.percentage >= 80).length;

    return { total, passed, averagePercentage, highPerformers };
  }, [marksheets]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="admin-gradient rounded-2xl p-8 mx-4 shadow-premium border border-border/20">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading marksheets...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-6">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="admin-gradient rounded-2xl p-8 shadow-premium border border-border/20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-primary to-primary/80 rounded-xl shadow-lg">
                <FileText className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gradient-enhanced">Marksheet Management</h1>
                <p className="text-muted-foreground mt-1">Manage student marksheets and academic records</p>
              </div>
            </div>
          </div>

          {/* Statistics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="stats-card hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Marksheets</p>
                    <p className="text-2xl font-bold text-primary">{stats.total}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-primary/10 to-primary/20 rounded-xl">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stats-card hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Passed Students</p>
                    <p className="text-2xl font-bold text-green-600">{stats.passed}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-green-500/10 to-green-500/20 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stats-card hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Average Percentage</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.averagePercentage.toFixed(1)}%</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-blue-500/10 to-blue-500/20 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="stats-card hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">High Performers</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.highPerformers}</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-purple-500/10 to-purple-500/20 rounded-xl">
                    <Award className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Marksheet Form */}
        <Card className="admin-card shadow-premium border border-border/20">
          <CardHeader className="border-b border-border/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardTitle className="text-xl font-semibold text-foreground flex items-center space-x-3">
              <Plus className="h-5 w-5 text-primary" />
              <span>{editingMarksheet ? 'Edit Marksheet' : 'Add New Marksheet'}</span>
            </CardTitle>
          </CardHeader>
        
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="form-field">
                <label className="form-label">Student ID *</label>
                <Input
                  value={formData.studentId}
                  onChange={(e) => handleInputChange('studentId', e.target.value)}
                  className="form-input"
                  placeholder="Enter student ID"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Student Name *</label>
                <Input
                  value={formData.studentName}
                  onChange={(e) => handleInputChange('studentName', e.target.value)}
                  className="form-input"
                  placeholder="Enter student name"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Course Name *</label>
                <Select value={formData.courseName} onValueChange={(value) => handleInputChange('courseName', value)}>
                  <SelectTrigger className="form-input">
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

              <div className="form-field">
                <label className="form-label">Roll Number *</label>
                <Input
                  value={formData.rollNumber}
                  onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                  className="form-input"
                  placeholder="Enter roll number"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Examination Date *</label>
                <Input
                  type="date"
                  value={formData.examinationDate}
                  onChange={(e) => handleInputChange('examinationDate', e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Total Marks *</label>
                <Input
                  type="number"
                  value={formData.totalMarks}
                  onChange={(e) => handleInputChange('totalMarks', e.target.value)}
                  className="form-input"
                  placeholder="Enter total marks"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Obtained Marks *</label>
                <Input
                  type="number"
                  value={formData.obtainedMarks}
                  onChange={(e) => handleInputChange('obtainedMarks', e.target.value)}
                  className="form-input"
                  placeholder="Enter obtained marks"
                />
              </div>

              <div className="form-field">
                <label className="form-label">Grade (Auto-calculated)</label>
                <Select value={formData.grade} onValueChange={(value) => handleInputChange('grade', value)}>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Auto-calculated" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="F">F</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-field">
                <label className="form-label">Result Status</label>
                <Select value={formData.resultStatus} onValueChange={(value) => handleInputChange('resultStatus', value)}>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Select result status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pass">Pass</SelectItem>
                    <SelectItem value="fail">Fail</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Show calculated percentage */}
            {formData.totalMarks && formData.obtainedMarks && (
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-border/20">
                <div className="flex items-center space-x-4">
                  <Calculator className="h-5 w-5 text-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      Calculated Percentage: <span className="text-primary font-bold">{calculatePercentage(parseInt(formData.obtainedMarks), parseInt(formData.totalMarks))}%</span>
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      Suggested Grade: <span className="text-secondary font-bold">{calculateGrade(calculatePercentage(parseInt(formData.obtainedMarks), parseInt(formData.totalMarks)))}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-6 flex space-x-4">
              <Button
                onClick={handleSubmit}
                className="btn-primary"
              >
                <Plus className="h-5 w-5 mr-2" />
                {editingMarksheet ? 'Update' : 'Create'} Marksheet
              </Button>
              
              {editingMarksheet && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="btn-secondary"
                >
                  Cancel Edit
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter Section */}
        <Card className="admin-card shadow-premium border border-border/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="form-label">Search Marksheets</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by student name, ID, or roll number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-input pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-64">
                <label className="form-label">Filter by Course</label>
                <Select value={filterCourse} onValueChange={setFilterCourse}>
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="All courses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Courses</SelectItem>
                    <SelectItem value="ADCA">ADCA</SelectItem>
                    <SelectItem value="DCA">DCA</SelectItem>
                    <SelectItem value="PGDCA">PGDCA</SelectItem>
                    <SelectItem value="BCA">BCA</SelectItem>
                    <SelectItem value="MCA">MCA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Marksheets Table */}
        <Card className="admin-card shadow-premium border border-border/20 overflow-hidden">
          <CardHeader className="border-b border-border/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold text-foreground flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>Marksheets Overview</span>
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Showing {filteredMarksheets.length} of {marksheets.length} marksheets
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary/80">
                    <TableHead className="text-primary-foreground font-bold text-center border-r border-primary-foreground/20">Actions</TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center border-r border-primary-foreground/20">Student ID</TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center border-r border-primary-foreground/20">Student Name</TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center border-r border-primary-foreground/20">Course</TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center border-r border-primary-foreground/20">Roll No.</TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center border-r border-primary-foreground/20">Total Marks</TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center border-r border-primary-foreground/20">Obtained</TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center border-r border-primary-foreground/20">Percentage</TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center border-r border-primary-foreground/20">Grade</TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center">Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMarksheets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-12 text-muted-foreground">
                        <div className="flex flex-col items-center space-y-3">
                          <FileText className="h-12 w-12 text-muted-foreground/30" />
                          <p className="text-lg font-medium">No marksheets found</p>
                          <p className="text-sm">Try adjusting your search or filter criteria</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMarksheets.map((marksheet, index) => (
                      <TableRow 
                        key={marksheet.id} 
                        className={`hover:bg-muted/50 transition-colors ${
                          index % 2 === 0 ? "bg-background" : "bg-muted/30"
                        }`}
                      >
                        <TableCell className="border-r border-border/20 p-4">
                          <div className="flex justify-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(marksheet)}
                              className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(marksheet.id)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="border-r border-border/20 text-center p-4 font-medium">
                          {marksheet.student_id}
                        </TableCell>
                        <TableCell className="border-r border-border/20 text-center p-4 font-medium">
                          {marksheet.student_name}
                        </TableCell>
                        <TableCell className="border-r border-border/20 text-center p-4">
                          <span className="px-2 py-1 bg-secondary/20 text-secondary-foreground rounded-md text-sm font-medium">
                            {marksheet.course_name}
                          </span>
                        </TableCell>
                        <TableCell className="border-r border-border/20 text-center p-4 font-medium">
                          {marksheet.roll_number}
                        </TableCell>
                        <TableCell className="border-r border-border/20 text-center p-4 font-bold text-primary">
                          {marksheet.total_marks}
                        </TableCell>
                        <TableCell className="border-r border-border/20 text-center p-4 font-bold text-secondary">
                          {marksheet.obtained_marks}
                        </TableCell>
                        <TableCell className="border-r border-border/20 text-center p-4">
                          <span className={`px-2 py-1 rounded-md text-sm font-bold ${
                            marksheet.percentage >= 80 ? 'bg-green-100 text-green-800' :
                            marksheet.percentage >= 60 ? 'bg-blue-100 text-blue-800' :
                            marksheet.percentage >= 40 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {marksheet.percentage}%
                          </span>
                        </TableCell>
                        <TableCell className="border-r border-border/20 text-center p-4">
                          <span className={`px-2 py-1 rounded-md text-sm font-bold ${
                            marksheet.grade === 'A+' || marksheet.grade === 'A' ? 'bg-green-100 text-green-800' :
                            marksheet.grade === 'B+' || marksheet.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                            marksheet.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {marksheet.grade}
                          </span>
                        </TableCell>
                        <TableCell className="text-center p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            marksheet.result_status === 'pass' ? 'bg-green-100 text-green-800' :
                            marksheet.result_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {marksheet.result_status}
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
    </div>
  );
};

export default MarksheetManagementContent;