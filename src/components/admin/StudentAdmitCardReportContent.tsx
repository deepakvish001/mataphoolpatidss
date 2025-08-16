import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Users, 
  Calendar, 
  GraduationCap,
  Edit,
  Trash2,
  Download,
  Printer,
  FileSpreadsheet
} from "lucide-react";

const StudentAdmitCardReportContent = () => {
  const { toast } = useToast();

  // Sample student admit card report data
  const [reportData] = useState([
    {
      id: 1,
      course: "ADCA",
      rollNumber: "20040",
      studentName: "Mr./श्रीGUPTESHWAR SINGH",
      motherName: "Mrs./श्रीमतीSHASHI PRABHA SINGH",
      fatherName: "Mr./श्रीRAVINDRA SINGH",
      examCenterCode: "",
      pwd: "",
      examCenterAddress: "",
      examDate: "",
      batch: "",
      reportingTime: "",
      gateClosingTime: "",
      examStartTime: "",
      examDuration: "",
      photo: "~/Offer_pic/"
    },
    {
      id: 2,
      course: "ADCA",
      rollNumber: "20043",
      studentName: "Mr./श्रीChote Lal Kumar",
      motherName: "Mrs./श्रीमतीDharmi Devi",
      fatherName: "Mr./श्रीVijay Prasad",
      examCenterCode: "SM11101",
      pwd: "",
      examCenterAddress: "Jiyanpur",
      examDate: "11/06/2019",
      batch: "M004",
      reportingTime: "10:00",
      gateClosingTime: "10:30",
      examStartTime: "11:00",
      examDuration: "90 Minute",
      photo: "~/Offer_pic/chotalal.jpg"
    }
  ]);

  // Statistics calculations
  const totalAdmitCards = reportData.length;
  const completedCards = reportData.filter(card => card.examDate && card.examCenterCode).length;
  const pendingCards = totalAdmitCards - completedCards;
  const activeCourses = [...new Set(reportData.map(card => card.course))].length;

  const handleEdit = (id: number) => {
    toast({
      title: "Edit",
      description: `Edit student admit card report ID: ${id}`,
      variant: "default"
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete",
      description: `Delete student admit card report ID: ${id}`,
      variant: "destructive"
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Report",
      description: "Admit card report exported successfully",
      variant: "default"
    });
  };

  const handlePrint = () => {
    toast({
      title: "Print Report",
      description: "Printing admit card report...",
      variant: "default"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5">
      {/* Professional Header */}
      <div className="bg-card/95 backdrop-blur-sm border-b border-border/20 shadow-elegant">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Student Admit Card Report</h1>
                <p className="text-sm text-muted-foreground">Comprehensive admit card management and reporting</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleExport}
                variant="outline"
                size="sm"
                className="text-primary hover:bg-primary/10"
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                onClick={handlePrint}
                variant="outline"
                size="sm"
                className="text-primary hover:bg-primary/10"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="admin-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Admit Cards
              </CardTitle>
              <FileText className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{totalAdmitCards}</div>
              <p className="text-xs text-muted-foreground">
                Generated admit cards
              </p>
            </CardContent>
          </Card>

          <Card className="admin-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed Cards
              </CardTitle>
              <Users className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedCards}</div>
              <p className="text-xs text-muted-foreground">
                With exam details
              </p>
            </CardContent>
          </Card>

          <Card className="admin-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Cards
              </CardTitle>
              <Calendar className="w-4 h-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{pendingCards}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting completion
              </p>
            </CardContent>
          </Card>

          <Card className="admin-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Courses
              </CardTitle>
              <GraduationCap className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{activeCourses}</div>
              <p className="text-xs text-muted-foreground">
                Course programs
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Data Table */}
        <Card className="admin-card">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-foreground">Admit Card Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="border border-border px-3 py-3 text-sm font-semibold text-left min-w-[120px]">Actions</th>
                    <th className="border border-border px-3 py-3 text-sm font-semibold text-left min-w-[100px]">Course</th>
                    <th className="border border-border px-3 py-3 text-sm font-semibold text-left min-w-[120px]">Roll Number</th>
                    <th className="border border-border px-3 py-3 text-sm font-semibold text-left min-w-[180px]">Student Name</th>
                    <th className="border border-border px-3 py-3 text-sm font-semibold text-left min-w-[180px]">Mother's Name</th>
                    <th className="border border-border px-3 py-3 text-sm font-semibold text-left min-w-[180px]">Father's Name</th>
                    <th className="border border-border px-3 py-3 text-sm font-semibold text-left min-w-[150px]">Center Code</th>
                    <th className="border border-border px-3 py-3 text-sm font-semibold text-left min-w-[80px]">PWD</th>
                    <th className="border border-border px-3 py-3 text-sm font-semibold text-left min-w-[180px]">Center Address</th>
                    <th className="border border-border px-3 py-3 text-sm font-semibold text-left min-w-[120px]">Exam Date</th>
                    <th className="border border-border px-3 py-3 text-sm font-semibold text-left min-w-[100px]">Batch</th>
                    <th className="border border-border px-3 py-3 text-sm font-semibold text-left min-w-[120px]">Reporting Time</th>
                    <th className="border border-border px-3 py-3 text-sm font-semibold text-left min-w-[130px]">Gate Closing</th>
                    <th className="border border-border px-3 py-3 text-sm font-semibold text-left min-w-[120px]">Exam Start</th>
                    <th className="border border-border px-3 py-3 text-sm font-semibold text-left min-w-[120px]">Duration</th>
                    <th className="border border-border px-3 py-3 text-sm font-semibold text-left min-w-[150px]">Photo Path</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((item, index) => (
                    <tr key={item.id} className={`${index % 2 === 0 ? "bg-accent/30" : "bg-background"} hover:bg-accent/50 transition-colors`}>
                      <td className="border border-border px-3 py-3">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(item.id)}
                            className="h-8 w-8 p-0 text-primary hover:bg-primary/10"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(item.id)}
                            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                      <td className="border border-border px-3 py-3">
                        <Badge variant="secondary" className="text-xs">
                          {item.course}
                        </Badge>
                      </td>
                      <td className="border border-border px-3 py-3 text-sm font-medium text-foreground">{item.rollNumber}</td>
                      <td className="border border-border px-3 py-3 text-sm text-foreground">{item.studentName}</td>
                      <td className="border border-border px-3 py-3 text-sm text-muted-foreground">{item.motherName}</td>
                      <td className="border border-border px-3 py-3 text-sm text-muted-foreground">{item.fatherName}</td>
                      <td className="border border-border px-3 py-3 text-sm text-foreground">{item.examCenterCode || "-"}</td>
                      <td className="border border-border px-3 py-3 text-sm text-muted-foreground">{item.pwd || "-"}</td>
                      <td className="border border-border px-3 py-3 text-sm text-muted-foreground">{item.examCenterAddress || "-"}</td>
                      <td className="border border-border px-3 py-3 text-sm text-foreground">{item.examDate || "-"}</td>
                      <td className="border border-border px-3 py-3 text-sm text-muted-foreground">{item.batch || "-"}</td>
                      <td className="border border-border px-3 py-3 text-sm text-muted-foreground">{item.reportingTime || "-"}</td>
                      <td className="border border-border px-3 py-3 text-sm text-muted-foreground">{item.gateClosingTime || "-"}</td>
                      <td className="border border-border px-3 py-3 text-sm text-muted-foreground">{item.examStartTime || "-"}</td>
                      <td className="border border-border px-3 py-3 text-sm text-muted-foreground">{item.examDuration || "-"}</td>
                      <td className="border border-border px-3 py-3 text-sm text-muted-foreground font-mono">{item.photo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentAdmitCardReportContent;