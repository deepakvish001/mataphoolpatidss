import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Edit, Trash2, Loader2, Plus, Search, Filter, CheckCircle, XCircle, Clock, Users, FileCheck, AlertCircle, User, MapPin, GraduationCap, FileText } from "lucide-react";
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
      <div className="w-full max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 px-8 py-6 rounded-xl shadow-lg animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-foreground/20 rounded-lg">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">Student Verification Portal</h1>
              <p className="text-primary-foreground/80">Verify and manage student credentials efficiently</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover-scale cursor-pointer">
            <CardContent className="p-6 text-center">
              <Plus className="h-12 w-12 mx-auto mb-4 text-blue-200" />
              <h3 className="text-lg font-semibold mb-2">New Verification</h3>
              <p className="text-blue-100 text-sm">Submit a new student verification request</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover-scale cursor-pointer">
            <CardContent className="p-6 text-center">
              <Search className="h-12 w-12 mx-auto mb-4 text-green-200" />
              <h3 className="text-lg font-semibold mb-2">Search Records</h3>
              <p className="text-green-100 text-sm">Find and verify existing student records</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover-scale cursor-pointer">
            <CardContent className="p-6 text-center">
              <FileCheck className="h-12 w-12 mx-auto mb-4 text-purple-200" />
              <h3 className="text-lg font-semibold mb-2">Bulk Verify</h3>
              <p className="text-purple-100 text-sm">Process multiple verifications at once</p>
            </CardContent>
          </Card>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
          <Card className="bg-card/50 backdrop-blur border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground">{verifications?.length || 0}</div>
              <div className="text-sm text-muted-foreground">Total Requests</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{verifications?.filter(v => v.status === 'verified').length || 0}</div>
              <div className="text-sm text-muted-foreground">Verified</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{verifications?.filter(v => v.status === 'pending').length || 0}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-0 shadow-md">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{verifications?.filter(v => v.status === 'rejected').length || 0}</div>
              <div className="text-sm text-muted-foreground">Rejected</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Verification Form */}
        <Card className="shadow-xl border-0 bg-card/60 backdrop-blur animate-scale-in">
          <CardHeader className="border-b border-border bg-gradient-to-r from-card to-card/50">
            <CardTitle className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-primary to-primary/80 rounded-xl">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-xl font-bold">{editingVerification ? 'Edit Verification Request' : 'Student Verification Form'}</span>
                <p className="text-sm text-muted-foreground font-normal">Complete all required fields to submit verification request</p>
              </div>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            {/* Form Sections */}
            <div className="space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <User className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Student Name *</label>
                    <Input
                      value={formData.studentName}
                      onChange={(e) => handleInputChange('studentName', e.target.value)}
                      placeholder="Enter Full Name"
                      className="border-2 bg-background/50 focus:bg-background transition-all h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Father's Name *</label>
                    <Input
                      value={formData.fatherName}
                      onChange={(e) => handleInputChange('fatherName', e.target.value)}
                      placeholder="Enter Father's Name"
                      className="border-2 bg-background/50 focus:bg-background transition-all h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Date of Birth</label>
                    <Input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="border-2 bg-background/50 focus:bg-background transition-all h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Location Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Location Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">State *</label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger className="border-2 bg-background/50 focus:bg-background transition-all h-12">
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border shadow-xl">
                        <SelectItem value="Uttar Pradesh">Uttar Pradesh</SelectItem>
                        <SelectItem value="Bihar">Bihar</SelectItem>
                        <SelectItem value="Madhya Pradesh">Madhya Pradesh</SelectItem>
                        <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                        <SelectItem value="Haryana">Haryana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">District *</label>
                    <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                      <SelectTrigger className="border-2 bg-background/50 focus:bg-background transition-all h-12">
                        <SelectValue placeholder="Select District" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border shadow-xl">
                        <SelectItem value="Azamgarh">Azamgarh</SelectItem>
                        <SelectItem value="Mau">Mau</SelectItem>
                        <SelectItem value="Baliya">Baliya</SelectItem>
                        <SelectItem value="Hardoi">Hardoi</SelectItem>
                        <SelectItem value="Lucknow">Lucknow</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Center Code *</label>
                    <Input
                      value={formData.centerCode}
                      onChange={(e) => handleInputChange('centerCode', e.target.value)}
                      placeholder="Enter Center Code"
                      className="border-2 bg-background/50 focus:bg-background transition-all h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Academic Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Enrollment Number *</label>
                    <Input
                      value={formData.enrollmentNo}
                      onChange={(e) => handleInputChange('enrollmentNo', e.target.value)}
                      placeholder="Enter Enrollment Number"
                      className="border-2 bg-background/50 focus:bg-background transition-all h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Course Name *</label>
                    <Select value={formData.courseName} onValueChange={(value) => handleInputChange('courseName', value)}>
                      <SelectTrigger className="border-2 bg-background/50 focus:bg-background transition-all h-12">
                        <SelectValue placeholder="Select Course" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border shadow-xl">
                        <SelectItem value="Diploma in Computer Application (DCA)">DCA</SelectItem>
                        <SelectItem value="Advance Diploma in Computer Application (ADCA)">ADCA</SelectItem>
                        <SelectItem value="Post Graduate Diploma in Computer Application (PGDCA)">PGDCA</SelectItem>
                        <SelectItem value="Diploma in Computer Hardware and Networking">Hardware & Networking</SelectItem>
                        <SelectItem value="Web Design & Development">Web Design & Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Course Duration</label>
                    <Input
                      value={formData.courseDuration}
                      onChange={(e) => handleInputChange('courseDuration', e.target.value)}
                      placeholder="e.g., 1 Year"
                      className="border-2 bg-background/50 focus:bg-background transition-all h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Rank/Marks</label>
                    <Input
                      value={formData.rankOrMarks}
                      onChange={(e) => handleInputChange('rankOrMarks', e.target.value)}
                      placeholder="e.g., First Class, 85%"
                      className="border-2 bg-background/50 focus:bg-background transition-all h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Admission Date</label>
                    <Input
                      type="date"
                      value={formData.admissionDate}
                      onChange={(e) => handleInputChange('admissionDate', e.target.value)}
                      className="border-2 bg-background/50 focus:bg-background transition-all h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8 py-3 h-12 shadow-lg hover-scale"
                >
                  <Shield className="h-5 w-5 mr-2" />
                  {editingVerification ? 'Update Verification' : 'Submit for Verification'}
                </Button>
                
                {editingVerification && (
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-2 hover:bg-accent/50 px-8 py-3 h-12"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel Edit
                  </Button>
                )}

                <Button
                  variant="outline"
                  className="border-2 hover:bg-accent/50 px-8 py-3 h-12 ml-auto"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Save as Draft
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Search and Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Search */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Quick Verification Lookup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by enrollment number, student name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 bg-background/50 focus:bg-background transition-all h-12"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-2 bg-background/50 focus:bg-background transition-all">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border shadow-xl">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-gradient-to-r from-primary to-primary/80 hover-scale">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recent Verification Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredVerifications.slice(0, 3).map((verification) => (
                  <div key={verification.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border hover:bg-accent/30 transition-colors">
                    <div>
                      <div className="font-medium text-sm">{verification.student_name}</div>
                      <div className="text-xs text-muted-foreground">{verification.enrollment_no}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(verification.status)}
                      {getStatusBadge(verification.status)}
                    </div>
                  </div>
                ))}
                {filteredVerifications.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                    <p>No verification requests found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verification Records Summary */}
        {filteredVerifications.length > 0 && (
          <Card className="shadow-lg border-0 bg-card/50 backdrop-blur animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-primary" />
                  <span>Verification Records ({filteredVerifications.length})</span>
                </div>
                <Button variant="outline" className="border-2 hover-scale">
                  <FileText className="h-4 w-4 mr-2" />
                  Export All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {filteredVerifications.map((verification, index) => (
                  <div key={verification.id} className={`p-6 rounded-xl border-2 transition-all hover:shadow-md hover-scale ${
                    verification.status === 'verified' ? 'bg-green-50 border-green-200' :
                    verification.status === 'rejected' ? 'bg-red-50 border-red-200' :
                    'bg-yellow-50 border-yellow-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <h3 className="font-semibold text-lg text-foreground">{verification.student_name}</h3>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(verification.status)}
                            {getStatusBadge(verification.status)}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Enrollment:</span>
                            <div className="font-mono font-medium text-blue-600">{verification.enrollment_no}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Course:</span>
                            <div className="font-medium text-green-600">{verification.course_name}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Location:</span>
                            <div className="font-medium">{verification.state}, {verification.district}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Center:</span>
                            <div className="font-mono">{verification.center_code}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(verification)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Select
                          value={verification.status}
                          onValueChange={(value) => handleStatusChange(verification.id, value as any)}
                        >
                          <SelectTrigger className="w-32 border-2 bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-border shadow-xl">
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(verification.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentVerificationContent;