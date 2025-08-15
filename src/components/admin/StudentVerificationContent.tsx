import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Edit, Trash2, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface StudentVerification {
  id: string;
  state: string;
  district: string;
  center_code: string;
  enrollment_no: string;
  student_name: string;
  father_name: string;
  course_name: string;
  rank_or_marks?: string;
  course_duration?: string;
  date_of_birth?: string;
  admission_date?: string;
  photo_url?: string;
  marksheet_url?: string;
  certificate_url?: string;
  status: 'pending' | 'verified' | 'rejected';
  verified_by?: string;
  verification_date?: string;
}

const StudentVerificationContent = () => {
  const {
    data: verifications,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<StudentVerification>({ 
    tableName: 'student_verifications',
    orderBy: { column: 'created_at', ascending: false }
  });

  useAdminRealTime({
    tableName: 'student_verifications'
  });
  
  const [formData, setFormData] = useState({
    state: "",
    district: "",
    centerCode: "",
    enrollmentNo: "",
    studentName: "",
    fatherName: "",
    courseName: "",
    rankOrMarks: "",
    courseDuration: "",
    dateOfBirth: "",
    admissionDate: "",
    photoFile: null as File | null,
    marksheetFile: null as File | null,
    certificateFile: null as File | null
  });

  const [editingVerification, setEditingVerification] = useState<StudentVerification | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async () => {
    // Validate required fields
    const requiredFields = ['state', 'district', 'centerCode', 'enrollmentNo', 'studentName', 'fatherName', 'courseName'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editingVerification) {
        await update(editingVerification.id, {
          state: formData.state,
          district: formData.district,
          center_code: formData.centerCode,
          enrollment_no: formData.enrollmentNo,
          student_name: formData.studentName,
          father_name: formData.fatherName,
          course_name: formData.courseName,
          rank_or_marks: formData.rankOrMarks || undefined,
          course_duration: formData.courseDuration || undefined,
          date_of_birth: formData.dateOfBirth || undefined,
          admission_date: formData.admissionDate || undefined,
          photo_url: formData.photoFile ? formData.photoFile.name : undefined,
          marksheet_url: formData.marksheetFile ? formData.marksheetFile.name : undefined,
          certificate_url: formData.certificateFile ? formData.certificateFile.name : undefined
        });
        toast.success("Verification updated successfully!");
      } else {
        await create({
          state: formData.state,
          district: formData.district,
          center_code: formData.centerCode,
          enrollment_no: formData.enrollmentNo,
          student_name: formData.studentName,
          father_name: formData.fatherName,
          course_name: formData.courseName,
          rank_or_marks: formData.rankOrMarks || null,
          course_duration: formData.courseDuration || null,
          date_of_birth: formData.dateOfBirth || null,
          admission_date: formData.admissionDate || null,
          photo_url: formData.photoFile ? formData.photoFile.name : null,
          marksheet_url: formData.marksheetFile ? formData.marksheetFile.name : null,
          certificate_url: formData.certificateFile ? formData.certificateFile.name : null,
          status: 'pending'
        });
        toast.success("Student verification submitted successfully!");
      }

      handleReset();
    } catch (error) {
      toast.error(`Failed to ${editingVerification ? 'update' : 'submit'} verification`);
    }
  };

  const handleEdit = (verification: StudentVerification) => {
    setEditingVerification(verification);
    setFormData({
      state: verification.state,
      district: verification.district,
      centerCode: verification.center_code,
      enrollmentNo: verification.enrollment_no,
      studentName: verification.student_name,
      fatherName: verification.father_name,
      courseName: verification.course_name,
      rankOrMarks: verification.rank_or_marks || "",
      courseDuration: verification.course_duration || "",
      dateOfBirth: verification.date_of_birth || "",
      admissionDate: verification.admission_date || "",
      photoFile: null,
      marksheetFile: null,
      certificateFile: null
    });
  };

  const handleReset = () => {
    setEditingVerification(null);
    setFormData({
      state: "",
      district: "",
      centerCode: "",
      enrollmentNo: "",
      studentName: "",
      fatherName: "",
      courseName: "",
      rankOrMarks: "",
      courseDuration: "",
      dateOfBirth: "",
      admissionDate: "",
      photoFile: null,
      marksheetFile: null,
      certificateFile: null
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this verification?")) return;
    
    try {
      await deleteItem(id);
      toast.success("Verification deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete verification");
    }
  };

  const handleStatusChange = async (id: string, status: 'pending' | 'verified' | 'rejected') => {
    try {
      await update(id, {
        status: status,
        verified_by: status !== 'pending' ? 'Admin' : undefined,
        verification_date: status !== 'pending' ? new Date().toISOString() : undefined
      });
      toast.success(`Verification status updated to ${status}`);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading verifications...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Form Card */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-blue-600 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span>{editingVerification ? 'Edit' : 'Add'} Student Verification</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* State Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">State *</label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                  <SelectItem value="bihar">Bihar</SelectItem>
                  <SelectItem value="madhya-pradesh">Madhya Pradesh</SelectItem>
                  <SelectItem value="rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="haryana">Haryana</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* District Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">District *</label>
              <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="azamgarh">Azamgarh</SelectItem>
                  <SelectItem value="mau">Mau</SelectItem>
                  <SelectItem value="baliya">Baliya</SelectItem>
                  <SelectItem value="hardoi">Hardoi</SelectItem>
                  <SelectItem value="lucknow">Lucknow</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Center Code */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Center Code *</label>
              <Input
                value={formData.centerCode}
                onChange={(e) => handleInputChange('centerCode', e.target.value)}
                placeholder="Center Code"
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              />
            </div>

            {/* Enrollment Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Enrollment No *</label>
              <Input
                value={formData.enrollmentNo}
                onChange={(e) => handleInputChange('enrollmentNo', e.target.value)}
                placeholder="Enter Enrollment No"
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              />
            </div>

            {/* Student Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Student Name *</label>
              <Input
                value={formData.studentName}
                onChange={(e) => handleInputChange('studentName', e.target.value)}
                placeholder="Enter Student Name"
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              />
            </div>

            {/* Father's Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Father's Name *</label>
              <Input
                value={formData.fatherName}
                onChange={(e) => handleInputChange('fatherName', e.target.value)}
                placeholder="Enter Father's Name"
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              />
            </div>

            {/* Course Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Course Name *</label>
              <Select value={formData.courseName} onValueChange={(value) => handleInputChange('courseName', value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dca">Diploma in Computer Application (DCA)</SelectItem>
                  <SelectItem value="adca">Advance Diploma in Computer Application (ADCA)</SelectItem>
                  <SelectItem value="pgdca">Post Graduate Diploma in Computer Application (PGDCA)</SelectItem>
                  <SelectItem value="dchn">Diploma in Computer Hardware and Networking</SelectItem>
                  <SelectItem value="web-design">Web Design & Development</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date of Birth</label>
              <Input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              />
            </div>

            {/* Admission Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Admission Date</label>
              <Input
                type="date"
                value={formData.admissionDate}
                onChange={(e) => handleInputChange('admissionDate', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              />
            </div>
          </div>

          <div className="pt-6 flex space-x-4">
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              {editingVerification ? 'Update' : 'Submit'} Verification
            </Button>
            
            {editingVerification && (
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

      {/* Verifications Table */}
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Actions</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Enrollment No</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Student Name</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Course</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">State</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">District</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {verifications.map((verification, index) => (
                <TableRow key={verification.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 p-4">
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(verification)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(verification.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {verification.enrollment_no}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {verification.student_name}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {verification.course_name}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {verification.state}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {verification.district}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4">
                    <Select
                      value={verification.status}
                      onValueChange={(value) => handleStatusChange(verification.id, value as any)}
                    >
                      <SelectTrigger className="w-32 h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
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

export default StudentVerificationContent;