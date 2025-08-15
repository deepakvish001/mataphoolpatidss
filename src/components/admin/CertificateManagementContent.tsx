import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Award, Edit, Trash2, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface CertificateManagement {
  id: string;
  student_id: string;
  student_name: string;
  course_name: string;
  certificate_number: string;
  issue_date: string;
  completion_date?: string;
  grade?: string;
  certificate_type: string;
  status: string;
  certificate_url?: string;
}

const CertificateManagementContent = () => {
  const {
    data: certificates,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<CertificateManagement>({ 
    tableName: 'certificate_management',
    orderBy: { column: 'issue_date', ascending: false }
  });

  useAdminRealTime({
    tableName: 'certificate_management'
  });

  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    courseName: "",
    certificateNumber: "",
    issueDate: "",
    completionDate: "",
    grade: "",
    certificateType: "course_completion",
    status: "active"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.studentId || !formData.studentName || !formData.courseName || !formData.certificateNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await create({
        student_id: formData.studentId,
        student_name: formData.studentName,
        course_name: formData.courseName,
        certificate_number: formData.certificateNumber,
        issue_date: formData.issueDate,
        completion_date: formData.completionDate || null,
        grade: formData.grade || null,
        certificate_type: formData.certificateType,
        status: formData.status
      });

      // Reset form
      setFormData({
        studentId: "",
        studentName: "",
        courseName: "",
        certificateNumber: "",
        issueDate: "",
        completionDate: "",
        grade: "",
        certificateType: "course_completion",
        status: "active"
      });

      toast.success("Certificate created successfully!");
    } catch (error) {
      toast.error("Failed to create certificate");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;
    
    try {
      await deleteItem(id);
      toast.success("Certificate deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete certificate");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading certificates...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Add Certificate Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-yellow-600 flex items-center space-x-3">
            <div className="p-2 bg-yellow-500 rounded-lg">
              <Award className="h-6 w-6 text-white" />
            </div>
            <span>Certificate Management</span>
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
              <label className="text-sm font-medium text-gray-700">Certificate Number *</label>
              <Input
                value={formData.certificateNumber}
                onChange={(e) => handleInputChange('certificateNumber', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                placeholder="Enter certificate number"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Issue Date</label>
              <Input
                type="date"
                value={formData.issueDate}
                onChange={(e) => handleInputChange('issueDate', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Completion Date</label>
              <Input
                type="date"
                value={formData.completionDate}
                onChange={(e) => handleInputChange('completionDate', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Grade</label>
              <Select value={formData.grade} onValueChange={(value) => handleInputChange('grade', value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Certificate Type</label>
              <Select value={formData.certificateType} onValueChange={(value) => handleInputChange('certificateType', value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="course_completion">Course Completion</SelectItem>
                  <SelectItem value="excellence">Excellence</SelectItem>
                  <SelectItem value="participation">Participation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-6">
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Certificate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Certificates Table */}
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-yellow-600 hover:bg-yellow-600">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Actions</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Student ID</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Student Name</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Course</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Certificate No.</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Issue Date</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Grade</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.map((certificate, index) => (
                <TableRow key={certificate.id} className={index % 2 === 0 ? "bg-yellow-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 p-4">
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(certificate.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {certificate.student_id}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {certificate.student_name}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {certificate.course_name}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {certificate.certificate_number}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {certificate.issue_date ? new Date(certificate.issue_date).toLocaleDateString() : "-"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {certificate.grade || "-"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      certificate.status === 'active' ? 'bg-green-100 text-green-800' :
                      certificate.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {certificate.status}
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

export default CertificateManagementContent;