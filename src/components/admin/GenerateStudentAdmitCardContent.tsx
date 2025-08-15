import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Edit, Trash2, Loader2, Plus, Search, Eye, FileDown } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";
import { AdminPresenceIndicator } from "./AdminPresenceIndicator";

interface StudentAdmitCard {
  id: string;
  student_id: string;
  student_name: string;
  mothers_name?: string;
  fathers_name?: string;
  roll_number: string;
  course_name: string;
  exam_center_code?: string;
  exam_center_address?: string;
  exam_date?: string;
  batch?: string;
  reporting_time?: string;
  gate_closing_time?: string;
  exam_start_time?: string;
  exam_duration?: string;
  student_photo_url?: string;
  pwd_status?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const GenerateStudentAdmitCardContent = () => {
  const {
    data: admitCards,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<StudentAdmitCard>({ 
    tableName: 'student_admit_cards',
    orderBy: { column: 'created_at', ascending: false }
  });

  useAdminRealTime({
    tableName: 'student_admit_cards'
  });

  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    mothersName: "",
    fathersName: "",
    rollNumber: "",
    courseName: "",
    examCenterCode: "",
    examCenterAddress: "",
    examDate: "",
    batch: "",
    reportingTime: "",
    gateClosingTime: "",
    examStartTime: "",
    examDuration: "",
    studentPhotoUrl: "",
    pwdStatus: "No"
  });

  const [editingAdmitCard, setEditingAdmitCard] = useState<StudentAdmitCard | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [viewingAdmitCard, setViewingAdmitCard] = useState<StudentAdmitCard | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const filteredAdmitCards = admitCards.filter(card =>
    card.student_name.toLowerCase().includes(searchValue.toLowerCase()) ||
    card.student_id.toLowerCase().includes(searchValue.toLowerCase()) ||
    card.roll_number.toLowerCase().includes(searchValue.toLowerCase()) ||
    card.course_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.studentId || !formData.studentName || !formData.rollNumber || !formData.courseName) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editingAdmitCard) {
        await update(editingAdmitCard.id, {
          student_id: formData.studentId,
          student_name: formData.studentName,
          mothers_name: formData.mothersName || null,
          fathers_name: formData.fathersName || null,
          roll_number: formData.rollNumber,
          course_name: formData.courseName,
          exam_center_code: formData.examCenterCode || null,
          exam_center_address: formData.examCenterAddress || null,
          exam_date: formData.examDate || null,
          batch: formData.batch || null,
          reporting_time: formData.reportingTime || null,
          gate_closing_time: formData.gateClosingTime || null,
          exam_start_time: formData.examStartTime || null,
          exam_duration: formData.examDuration || null,
          student_photo_url: formData.studentPhotoUrl || null,
          pwd_status: formData.pwdStatus || "No"
        });
        toast.success("Admit card updated successfully!");
      } else {
        await create({
          student_id: formData.studentId,
          student_name: formData.studentName,
          mothers_name: formData.mothersName || null,
          fathers_name: formData.fathersName || null,
          roll_number: formData.rollNumber,
          course_name: formData.courseName,
          exam_center_code: formData.examCenterCode || null,
          exam_center_address: formData.examCenterAddress || null,
          exam_date: formData.examDate || null,
          batch: formData.batch || null,
          reporting_time: formData.reportingTime || null,
          gate_closing_time: formData.gateClosingTime || null,
          exam_start_time: formData.examStartTime || null,
          exam_duration: formData.examDuration || null,
          student_photo_url: formData.studentPhotoUrl || null,
          pwd_status: formData.pwdStatus || "No",
          status: 'active'
        });
        toast.success("Admit card created successfully!");
      }

      handleReset();
    } catch (error) {
      toast.error(`Failed to ${editingAdmitCard ? 'update' : 'create'} admit card`);
    }
  };

  const handleEdit = (card: StudentAdmitCard) => {
    setEditingAdmitCard(card);
    setFormData({
      studentId: card.student_id,
      studentName: card.student_name,
      mothersName: card.mothers_name || "",
      fathersName: card.fathers_name || "",
      rollNumber: card.roll_number,
      courseName: card.course_name,
      examCenterCode: card.exam_center_code || "",
      examCenterAddress: card.exam_center_address || "",
      examDate: card.exam_date || "",
      batch: card.batch || "",
      reportingTime: card.reporting_time || "",
      gateClosingTime: card.gate_closing_time || "",
      examStartTime: card.exam_start_time || "",
      examDuration: card.exam_duration || "",
      studentPhotoUrl: card.student_photo_url || "",
      pwdStatus: card.pwd_status || "No"
    });
    setShowForm(true);
  };

  const handleReset = () => {
    setEditingAdmitCard(null);
    setShowForm(false);
    setFormData({
      studentId: "",
      studentName: "",
      mothersName: "",
      fathersName: "",
      rollNumber: "",
      courseName: "",
      examCenterCode: "",
      examCenterAddress: "",
      examDate: "",
      batch: "",
      reportingTime: "",
      gateClosingTime: "",
      examStartTime: "",
      examDuration: "",
      studentPhotoUrl: "",
      pwdStatus: "No"
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this admit card?")) return;
    
    try {
      await deleteItem(id);
      toast.success("Admit card deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete admit card");
    }
  };

  const handleView = (card: StudentAdmitCard) => {
    setViewingAdmitCard(card);
  };

  const handlePrintAdmitCard = (card?: StudentAdmitCard) => {
    if (card || viewingAdmitCard) {
      window.print();
    } else {
      toast.error("Please select an admit card to print");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading admit cards...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (viewingAdmitCard) {
    return (
      <div className="w-full max-w-none bg-gray-50 min-h-screen">
        {/* Header Navigation */}
        <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between no-print">
          <div className="flex items-center space-x-6">
            <Button 
              onClick={() => setViewingAdmitCard(null)}
              className="text-blue-600 hover:text-blue-800 font-medium bg-transparent hover:bg-blue-50 border-0 p-0"
            >
              ← Back to List
            </Button>
            <span className="text-gray-700 font-medium">Admit Card - {viewingAdmitCard.student_name}</span>
          </div>
          <Button 
            onClick={() => handlePrintAdmitCard(viewingAdmitCard)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
          >
            <FileDown className="h-4 w-4 mr-2" />
            Print Admit Card
          </Button>
        </div>

        {/* Admit Card Content */}
        <div className="px-6 py-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 shadow-lg border">
            
            {/* Institute Header */}
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold text-gray-800 mb-2">
                B. Soft Computer & Technical Institute
              </h1>
              <p className="text-sm text-gray-600 mb-4">
                Near Union Bank Of India Bina Soft Educational & Welfare Society Vill & Post BILARIYAGAN J, AZAMGARH-276121
              </p>
              <h2 className="text-lg font-bold text-gray-800 mb-2">
                B. Soft Computer & Technical Institute ' ' EXAMINATION
              </h2>
              <h3 className="text-base font-bold text-gray-800 mb-6">
                CANDIDATE ADMIT CARD
              </h3>
            </div>

            {/* Candidate Information Table */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3 text-center">
                Name of the Candidate ( AS FILLED BY THE CANDIDATE IN OEAF)
              </p>
              
              <div className="flex gap-4">
                {/* Left side - Form fields */}
                <div className="flex-1">
                  <table className="w-full border-2 border-gray-800">
                    <tbody>
                      <tr>
                        <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm w-1/3">
                          ROLL NO
                        </td>
                        <td className="border border-gray-800 px-3 py-3 font-medium">
                          {viewingAdmitCard.roll_number}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                          NAME
                        </td>
                        <td className="border border-gray-800 px-3 py-3 font-medium">
                          {viewingAdmitCard.student_name}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                          MOTHER'S NAME
                        </td>
                        <td className="border border-gray-800 px-3 py-3 font-medium">
                          {viewingAdmitCard.mothers_name || ''}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                          FATHER'S NAME
                        </td>
                        <td className="border border-gray-800 px-3 py-3 font-medium">
                          {viewingAdmitCard.fathers_name || ''}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                          EXAM CENTER CODE
                        </td>
                        <td className="border border-gray-800 px-3 py-3 font-medium">
                          {viewingAdmitCard.exam_center_code || ''}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                          PWD :
                        </td>
                        <td className="border border-gray-800 px-3 py-3 font-medium">
                          {viewingAdmitCard.pwd_status || 'No'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Right side - Photo */}
                <div className="w-32">
                  <div className="border-2 border-gray-800 h-40 bg-gray-50 flex items-center justify-center">
                    {viewingAdmitCard.student_photo_url ? (
                      <img 
                        src={viewingAdmitCard.student_photo_url} 
                        alt="Student Photo" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-4 h-4 border border-gray-400"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Valid For Section */}
            <div className="text-center mb-6">
              <div className="border-2 border-gray-800 py-2 bg-gray-100">
                <p className="font-medium text-sm">
                  VALID FOR ( Every Month Exam Cycle ) EXAMINATION ONLY
                </p>
              </div>
            </div>

            {/* Batch Schedule */}
            <div className="mb-6">
              <div className="border-2 border-gray-800 bg-gray-100 text-center py-2 mb-0">
                <h4 className="font-bold text-sm">BATCH SCHEDULE</h4>
              </div>
              
              <table className="w-full border-2 border-gray-800 border-t-0">
                <tbody>
                  <tr>
                    <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm w-1/2">
                      EXAM CENTRE CODE:
                    </td>
                    <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                      EXAM DATE :
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-3 py-3 font-medium">
                      {viewingAdmitCard.exam_center_code || ''}
                    </td>
                    <td className="border border-gray-800 px-3 py-3 font-medium">
                      {viewingAdmitCard.exam_date || ''}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                      EXAM CENTRE ADDRESS:
                    </td>
                    <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                      BATCH :
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-3 py-3 font-medium">
                      {viewingAdmitCard.exam_center_address || ''}
                    </td>
                    <td className="border border-gray-800 px-3 py-3 font-medium">
                      {viewingAdmitCard.batch || ''}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm" colSpan={2}>
                      REPORTING TIME :
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-3 py-3 font-medium" colSpan={2}>
                      {viewingAdmitCard.reporting_time || ''}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm" colSpan={2}>
                      GATE CLOSING TIME :
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-3 py-4 text-sm font-medium" colSpan={2}>
                      {viewingAdmitCard.gate_closing_time || 'No candidate will be allowed to enter the examination center after the gate closing time.'}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm" colSpan={2}>
                      EXAM START TIME:
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-3 py-3 font-medium" colSpan={2}>
                      {viewingAdmitCard.exam_start_time || ''}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm" colSpan={2}>
                      EXAM DURATION :
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 px-3 py-3 font-medium" colSpan={2}>
                      {viewingAdmitCard.exam_duration || ''}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Instructions Footer */}
            <div className="text-center">
              <div className="border-2 border-gray-800 py-3 bg-gray-100">
                <p className="font-bold text-sm">
                  INSTRUCTIONS TO BE FOLLOWED BY CANDIDATES AT B. Soft Computer & Technical Institute EXAMINATION
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AdminPresenceIndicator 
        currentSection="generate-student-admit-card"
        showSectionUsers={true}
        showOnlineCount={true}
      />

      {/* Header with Controls */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-red-600 flex items-center space-x-3">
              <div className="p-2 bg-red-500 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <span>Student Admit Card Management</span>
            </CardTitle>
            <Button
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-6 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              {showForm ? 'Hide Form' : 'Add New Admit Card'}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Create/Edit Form */}
      {showForm && (
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="p-6 border-b border-gray-100">
            <CardTitle className="text-xl font-semibold text-gray-800">
              {editingAdmitCard ? 'Edit Admit Card' : 'Create New Admit Card'}
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
                <label className="text-sm font-medium text-gray-700">Roll Number *</label>
                <Input
                  value={formData.rollNumber}
                  onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Enter roll number"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Mother's Name</label>
                <Input
                  value={formData.mothersName}
                  onChange={(e) => handleInputChange('mothersName', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Enter mother's name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Father's Name</label>
                <Input
                  value={formData.fathersName}
                  onChange={(e) => handleInputChange('fathersName', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Enter father's name"
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
                <label className="text-sm font-medium text-gray-700">Exam Center Code</label>
                <Input
                  value={formData.examCenterCode}
                  onChange={(e) => handleInputChange('examCenterCode', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Enter exam center code"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Exam Date</label>
                <Input
                  type="date"
                  value={formData.examDate}
                  onChange={(e) => handleInputChange('examDate', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Batch</label>
                <Input
                  value={formData.batch}
                  onChange={(e) => handleInputChange('batch', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Enter batch"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Reporting Time</label>
                <Input
                  value={formData.reportingTime}
                  onChange={(e) => handleInputChange('reportingTime', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="e.g., 09:00 AM"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Gate Closing Time</label>
                <Input
                  value={formData.gateClosingTime}
                  onChange={(e) => handleInputChange('gateClosingTime', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="e.g., 09:30 AM"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Exam Start Time</label>
                <Input
                  value={formData.examStartTime}
                  onChange={(e) => handleInputChange('examStartTime', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="e.g., 10:00 AM"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Exam Duration</label>
                <Input
                  value={formData.examDuration}
                  onChange={(e) => handleInputChange('examDuration', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="e.g., 3 Hours"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Student Photo URL</label>
                <Input
                  value={formData.studentPhotoUrl}
                  onChange={(e) => handleInputChange('studentPhotoUrl', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Enter photo URL"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">PWD Status</label>
                <Select value={formData.pwdStatus} onValueChange={(value) => handleInputChange('pwdStatus', value)}>
                  <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
                    <SelectValue placeholder="Select PWD status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="No">No</SelectItem>
                    <SelectItem value="Yes">Yes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">Exam Center Address</label>
                <Textarea
                  value={formData.examCenterAddress}
                  onChange={(e) => handleInputChange('examCenterAddress', e.target.value)}
                  className="min-h-[80px] border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Enter exam center address"
                />
              </div>
            </div>

            <div className="pt-6 flex space-x-4">
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="h-5 w-5 mr-2" />
                {editingAdmitCard ? 'Update Admit Card' : 'Create Admit Card'}
              </Button>
              
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-gray-600 text-gray-600 hover:bg-gray-50 px-6 py-3"
              >
                {editingAdmitCard ? 'Cancel Edit' : 'Clear Form'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                placeholder="Search by student name, ID, roll number, or course..."
              />
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Admit Cards Table */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Admit Cards ({filteredAdmitCards.length})
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Exam Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdmitCards.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell className="font-medium">{card.student_id}</TableCell>
                    <TableCell>{card.student_name}</TableCell>
                    <TableCell>{card.roll_number}</TableCell>
                    <TableCell>{card.course_name}</TableCell>
                    <TableCell>{card.exam_date || 'Not set'}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        card.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {card.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleView(card)}
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleEdit(card)}
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(card.id)}
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredAdmitCards.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No admit cards found. {searchValue && "Try adjusting your search criteria."}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateStudentAdmitCardContent;