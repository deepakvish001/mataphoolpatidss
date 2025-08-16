import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Edit, Trash2, Loader2, Plus, Search, Filter, CheckCircle, XCircle, Clock, Users, FileCheck, AlertCircle } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  // Filter and search functionality
  const filteredVerifications = useMemo(() => {
    let filtered = verifications || [];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.enrollment_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.father_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    return filtered;
  }, [verifications, searchTerm, statusFilter]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5 p-6">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4 rounded-lg shadow-lg">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary-foreground" />
            <h1 className="text-xl font-bold text-primary-foreground">Student Verification Management</h1>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Verifications</p>
                <p className="text-2xl font-bold">{verifications?.length || 0}</p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-green-100 text-sm font-medium">Verified</p>
                <p className="text-2xl font-bold">
                  {verifications?.filter(v => v.status === 'verified').length || 0}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-200" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-0 shadow-lg">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold">
                  {verifications?.filter(v => v.status === 'pending').length || 0}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-200" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 shadow-lg">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-red-100 text-sm font-medium">Rejected</p>
                <p className="text-2xl font-bold">
                  {verifications?.filter(v => v.status === 'rejected').length || 0}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-200" />
            </CardContent>
          </Card>
        </div>

        {/* Add/Edit Form */}
        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-primary to-primary/80 rounded-lg">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">{editingVerification ? 'Edit Student Verification' : 'Add New Student Verification'}</span>
            </CardTitle>
          </CardHeader>
        
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* State Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Shield className="h-4 w-4 text-primary" />
                  State *
                </label>
                <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                  <SelectTrigger className="border-2 bg-background/50 focus:bg-background transition-all">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border shadow-lg">
                    <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                    <SelectItem value="Bihar">Bihar</SelectItem>
                    <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                    <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                    <SelectItem value="Haryana">Haryana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* District Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Shield className="h-4 w-4 text-primary" />
                  District *
                </label>
                <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                  <SelectTrigger className="border-2 bg-background/50 focus:bg-background transition-all">
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border shadow-lg">
                    <SelectItem value="Azamgarh">Azamgarh</SelectItem>
                    <SelectItem value="Mau">Mau</SelectItem>
                    <SelectItem value="Baliya">Baliya</SelectItem>
                    <SelectItem value="Hardoi">Hardoi</SelectItem>
                    <SelectItem value="Lucknow">Lucknow</SelectItem>
                    <SelectItem value="Patna">Patna</SelectItem>
                    <SelectItem value="Jaipur">Jaipur</SelectItem>
                    <SelectItem value="Bhopal">Bhopal</SelectItem>
                    <SelectItem value="Gurgaon">Gurgaon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Center Code */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Shield className="h-4 w-4 text-primary" />
                  Center Code *
                </label>
                <Input
                  value={formData.centerCode}
                  onChange={(e) => handleInputChange('centerCode', e.target.value)}
                  placeholder="Enter Center Code"
                  className="border-2 bg-background/50 focus:bg-background transition-all"
                />
              </div>

              {/* Enrollment Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Shield className="h-4 w-4 text-primary" />
                  Enrollment No *
                </label>
                <Input
                  value={formData.enrollmentNo}
                  onChange={(e) => handleInputChange('enrollmentNo', e.target.value)}
                  placeholder="Enter Enrollment Number"
                  className="border-2 bg-background/50 focus:bg-background transition-all"
                />
              </div>

              {/* Student Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Shield className="h-4 w-4 text-primary" />
                  Student Name *
                </label>
                <Input
                  value={formData.studentName}
                  onChange={(e) => handleInputChange('studentName', e.target.value)}
                  placeholder="Enter Student Full Name"
                  className="border-2 bg-background/50 focus:bg-background transition-all"
                />
              </div>

              {/* Father's Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Shield className="h-4 w-4 text-primary" />
                  Father's Name *
                </label>
                <Input
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  placeholder="Enter Father's Full Name"
                  className="border-2 bg-background/50 focus:bg-background transition-all"
                />
              </div>

              {/* Course Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Shield className="h-4 w-4 text-primary" />
                  Course Name *
                </label>
                <Select value={formData.courseName} onValueChange={(value) => handleInputChange('courseName', value)}>
                  <SelectTrigger className="border-2 bg-background/50 focus:bg-background transition-all">
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border shadow-lg">
                    <SelectItem value="Diploma in Computer Application (DCA)">Diploma in Computer Application (DCA)</SelectItem>
                    <SelectItem value="Advance Diploma in Computer Application (ADCA)">Advance Diploma in Computer Application (ADCA)</SelectItem>
                    <SelectItem value="Post Graduate Diploma in Computer Application (PGDCA)">Post Graduate Diploma in Computer Application (PGDCA)</SelectItem>
                    <SelectItem value="Diploma in Computer Hardware and Networking">Diploma in Computer Hardware and Networking</SelectItem>
                    <SelectItem value="Web Design & Development">Web Design & Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rank or Marks */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Shield className="h-4 w-4 text-primary" />
                  Rank/Marks
                </label>
                <Input
                  value={formData.rankOrMarks}
                  onChange={(e) => handleInputChange('rankOrMarks', e.target.value)}
                  placeholder="e.g., First Class with 85%"
                  className="border-2 bg-background/50 focus:bg-background transition-all"
                />
              </div>

              {/* Course Duration */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Shield className="h-4 w-4 text-primary" />
                  Course Duration
                </label>
                <Input
                  value={formData.courseDuration}
                  onChange={(e) => handleInputChange('courseDuration', e.target.value)}
                  placeholder="e.g., 1 Year, 6 Months"
                  className="border-2 bg-background/50 focus:bg-background transition-all"
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Shield className="h-4 w-4 text-primary" />
                  Date of Birth
                </label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="border-2 bg-background/50 focus:bg-background transition-all"
                />
              </div>

              {/* Admission Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Shield className="h-4 w-4 text-primary" />
                  Admission Date
                </label>
                <Input
                  type="date"
                  value={formData.admissionDate}
                  onChange={(e) => handleInputChange('admissionDate', e.target.value)}
                  className="border-2 bg-background/50 focus:bg-background transition-all"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 pt-6">
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                {editingVerification ? 'Update Verification' : 'Submit Verification'}
              </Button>
              
              {editingVerification && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-2 hover:bg-accent/50"
                >
                  Cancel Edit
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by enrollment, student name, father name, or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 bg-background/50 focus:bg-background transition-all"
                />
              </div>
              <div className="w-full md:w-64">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-2 bg-background/50 focus:bg-background transition-all">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border shadow-lg">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending Only</SelectItem>
                    <SelectItem value="verified">Verified Only</SelectItem>
                    <SelectItem value="rejected">Rejected Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Verifications Table */}
        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                <span>Student Verifications ({filteredVerifications.length})</span>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Total: {verifications?.length || 0}
              </Badge>
            </CardTitle>
          </CardHeader>
        
          <CardContent>
            <div className="border border-border rounded-lg bg-background/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                      <th className="border border-border px-4 py-3 text-sm font-semibold text-left">Actions</th>
                      <th className="border border-border px-4 py-3 text-sm font-semibold text-left">Enrollment No</th>
                      <th className="border border-border px-4 py-3 text-sm font-semibold text-left">Student Name</th>
                      <th className="border border-border px-4 py-3 text-sm font-semibold text-left">Father's Name</th>
                      <th className="border border-border px-4 py-3 text-sm font-semibold text-left">Course</th>
                      <th className="border border-border px-4 py-3 text-sm font-semibold text-left">State</th>
                      <th className="border border-border px-4 py-3 text-sm font-semibold text-left">Status</th>
                      <th className="border border-border px-4 py-3 text-sm font-semibold text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVerifications.map((verification, index) => (
                      <tr key={verification.id} className={`transition-colors ${index % 2 === 0 ? "bg-background hover:bg-accent/30" : "bg-accent/10 hover:bg-accent/40"}`}>
                        <td className="border border-border px-4 py-3">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(verification)}
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(verification.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                        <td className="border border-border px-4 py-3">
                          <div className="font-mono text-blue-600 font-medium">{verification.enrollment_no}</div>
                        </td>
                        <td className="border border-border px-4 py-3">
                          <div className="font-medium text-primary">{verification.student_name}</div>
                          {verification.rank_or_marks && (
                            <div className="text-sm text-muted-foreground">{verification.rank_or_marks}</div>
                          )}
                        </td>
                        <td className="border border-border px-4 py-3">
                          <div className="text-foreground">{verification.father_name}</div>
                        </td>
                        <td className="border border-border px-4 py-3">
                          <div className="text-sm text-green-600 font-medium">{verification.course_name}</div>
                          {verification.course_duration && (
                            <div className="text-xs text-muted-foreground">{verification.course_duration}</div>
                          )}
                        </td>
                        <td className="border border-border px-4 py-3">
                          <div className="text-sm font-medium">{verification.state}</div>
                          <div className="text-xs text-muted-foreground">{verification.district}</div>
                        </td>
                        <td className="border border-border px-4 py-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(verification.status)}
                            {getStatusBadge(verification.status)}
                          </div>
                        </td>
                        <td className="border border-border px-4 py-3">
                          <Select
                            value={verification.status}
                            onValueChange={(value) => handleStatusChange(verification.id, value as any)}
                          >
                            <SelectTrigger className="w-36 border-2 bg-background/50">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-background border-border shadow-lg">
                              <SelectItem value="pending">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-3 w-3 text-yellow-600" />
                                  Pending
                                </div>
                              </SelectItem>
                              <SelectItem value="verified">
                                <div className="flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-600" />
                                  Verified
                                </div>
                              </SelectItem>
                              <SelectItem value="rejected">
                                <div className="flex items-center gap-2">
                                  <XCircle className="h-3 w-3 text-red-600" />
                                  Rejected
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    ))}
                    {filteredVerifications.length === 0 && (
                      <tr>
                        <td colSpan={8} className="border border-border px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-4">
                            <AlertCircle className="h-12 w-12 text-muted-foreground" />
                            <div>
                              <h3 className="text-lg font-semibold text-foreground">No Records Found</h3>
                              <p className="text-muted-foreground">
                                {searchTerm || statusFilter !== "all" 
                                  ? "No verifications match your search criteria" 
                                  : "No student verifications found"}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentVerificationContent;