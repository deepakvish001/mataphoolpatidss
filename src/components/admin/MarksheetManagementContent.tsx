import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Edit, Trash2, Loader2, Plus, Search, Calendar, CheckCircle, Clock, Calculator } from "lucide-react";
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

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading marksheets...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Add Marksheet Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-blue-600 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span>Marksheet Management</span>
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
              <label className="text-sm font-medium text-gray-700">Roll Number *</label>
              <Input
                value={formData.rollNumber}
                onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                placeholder="Enter roll number"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Examination Date *</label>
              <Input
                type="date"
                value={formData.examinationDate}
                onChange={(e) => handleInputChange('examinationDate', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Total Marks *</label>
              <Input
                type="number"
                value={formData.totalMarks}
                onChange={(e) => handleInputChange('totalMarks', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                placeholder="Enter total marks"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Obtained Marks *</label>
              <Input
                type="number"
                value={formData.obtainedMarks}
                onChange={(e) => handleInputChange('obtainedMarks', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                placeholder="Enter obtained marks"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Grade (Auto-calculated)</label>
              <Select value={formData.grade} onValueChange={(value) => handleInputChange('grade', value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Result Status</label>
              <Select value={formData.resultStatus} onValueChange={(value) => handleInputChange('resultStatus', value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
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
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-700 font-medium">
                Calculated Percentage: {calculatePercentage(parseInt(formData.obtainedMarks), parseInt(formData.totalMarks))}%
              </p>
              <p className="text-blue-700 font-medium">
                Suggested Grade: {calculateGrade(calculatePercentage(parseInt(formData.obtainedMarks), parseInt(formData.totalMarks)))}
              </p>
            </div>
          )}

          <div className="pt-6 flex space-x-4">
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              {editingMarksheet ? 'Update' : 'Create'} Marksheet
            </Button>
            
            {editingMarksheet && (
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-gray-600 text-gray-600 hover:bg-gray-50 px-6 py-3"
              >
                Cancel Edit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Marksheets Table */}
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Actions</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Student ID</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Student Name</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Course</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Roll No.</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Total Marks</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Obtained Marks</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Percentage</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Grade</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marksheets.map((marksheet, index) => (
                <TableRow key={marksheet.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 p-4">
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(marksheet)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(marksheet.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {marksheet.student_id}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {marksheet.student_name}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {marksheet.course_name}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {marksheet.roll_number}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {marksheet.total_marks}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {marksheet.obtained_marks}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {marksheet.percentage}%
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {marksheet.grade}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      marksheet.result_status === 'pass' ? 'bg-green-100 text-green-800' :
                      marksheet.result_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {marksheet.result_status}
                    </span>
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

export default MarksheetManagementContent;