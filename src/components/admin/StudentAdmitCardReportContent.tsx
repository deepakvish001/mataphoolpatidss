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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/10">
      {/* Professional Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="admin-icon-wrapper">
                <FileText className="admin-icon" />
              </div>
              <div>
                <h1 className="admin-title">Student Admit Card Report</h1>
                <p className="admin-subtitle">Comprehensive admit card management and reporting</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleExport}
                variant="outline"
                size="sm"
                className="admin-action-button"
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                onClick={handlePrint}
                variant="outline"
                size="sm"
                className="admin-action-button"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <div className="admin-content">
        <div className="admin-stats-grid">
          <Card className="admin-stat-card">
            <CardHeader className="admin-stat-header">
              <CardTitle className="admin-stat-title">
                Total Admit Cards
              </CardTitle>
              <FileText className="admin-stat-icon" />
            </CardHeader>
            <CardContent className="admin-stat-content">
              <div className="admin-stat-value">{totalAdmitCards}</div>
              <p className="admin-stat-description">
                Generated admit cards
              </p>
            </CardContent>
          </Card>

          <Card className="admin-stat-card">
            <CardHeader className="admin-stat-header">
              <CardTitle className="admin-stat-title">
                Completed Cards
              </CardTitle>
              <Users className="admin-stat-icon text-success" />
            </CardHeader>
            <CardContent className="admin-stat-content">
              <div className="admin-stat-value text-success">{completedCards}</div>
              <p className="admin-stat-description">
                With exam details
              </p>
            </CardContent>
          </Card>

          <Card className="admin-stat-card">
            <CardHeader className="admin-stat-header">
              <CardTitle className="admin-stat-title">
                Pending Cards
              </CardTitle>
              <Calendar className="admin-stat-icon text-warning" />
            </CardHeader>
            <CardContent className="admin-stat-content">
              <div className="admin-stat-value text-warning">{pendingCards}</div>
              <p className="admin-stat-description">
                Awaiting completion
              </p>
            </CardContent>
          </Card>

          <Card className="admin-stat-card">
            <CardHeader className="admin-stat-header">
              <CardTitle className="admin-stat-title">
                Active Courses
              </CardTitle>
              <GraduationCap className="admin-stat-icon text-info" />
            </CardHeader>
            <CardContent className="admin-stat-content">
              <div className="admin-stat-value text-info">{activeCourses}</div>
              <p className="admin-stat-description">
                Course programs
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Data Table */}
        <Card className="admin-table-card">
          <CardHeader className="admin-table-header">
            <CardTitle className="admin-table-title">Admit Card Records</CardTitle>
          </CardHeader>
          <CardContent className="admin-table-content">
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr className="admin-table-header-row">
                    <th className="admin-table-header-cell min-w-[120px]">Actions</th>
                    <th className="admin-table-header-cell min-w-[100px]">Course</th>
                    <th className="admin-table-header-cell min-w-[120px]">Roll Number</th>
                    <th className="admin-table-header-cell min-w-[180px]">Student Name</th>
                    <th className="admin-table-header-cell min-w-[180px]">Mother's Name</th>
                    <th className="admin-table-header-cell min-w-[180px]">Father's Name</th>
                    <th className="admin-table-header-cell min-w-[150px]">Center Code</th>
                    <th className="admin-table-header-cell min-w-[80px]">PWD</th>
                    <th className="admin-table-header-cell min-w-[180px]">Center Address</th>
                    <th className="admin-table-header-cell min-w-[120px]">Exam Date</th>
                    <th className="admin-table-header-cell min-w-[100px]">Batch</th>
                    <th className="admin-table-header-cell min-w-[120px]">Reporting Time</th>
                    <th className="admin-table-header-cell min-w-[130px]">Gate Closing</th>
                    <th className="admin-table-header-cell min-w-[120px]">Exam Start</th>
                    <th className="admin-table-header-cell min-w-[120px]">Duration</th>
                    <th className="admin-table-header-cell min-w-[150px]">Photo Path</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((item, index) => (
                    <tr key={item.id} className={`admin-table-row ${index % 2 === 0 ? "admin-table-row-even" : "admin-table-row-odd"}`}>
                      <td className="admin-table-cell">
                        <div className="admin-action-buttons">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(item.id)}
                            className="admin-edit-button"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(item.id)}
                            className="admin-delete-button"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                      <td className="admin-table-cell">
                        <Badge variant="secondary" className="admin-badge">
                          {item.course}
                        </Badge>
                      </td>
                      <td className="admin-table-cell admin-cell-primary">{item.rollNumber}</td>
                      <td className="admin-table-cell admin-cell-primary">{item.studentName}</td>
                      <td className="admin-table-cell admin-cell-secondary">{item.motherName}</td>
                      <td className="admin-table-cell admin-cell-secondary">{item.fatherName}</td>
                      <td className="admin-table-cell admin-cell-primary">{item.examCenterCode || "-"}</td>
                      <td className="admin-table-cell admin-cell-secondary">{item.pwd || "-"}</td>
                      <td className="admin-table-cell admin-cell-secondary">{item.examCenterAddress || "-"}</td>
                      <td className="admin-table-cell admin-cell-primary">{item.examDate || "-"}</td>
                      <td className="admin-table-cell admin-cell-secondary">{item.batch || "-"}</td>
                      <td className="admin-table-cell admin-cell-secondary">{item.reportingTime || "-"}</td>
                      <td className="admin-table-cell admin-cell-secondary">{item.gateClosingTime || "-"}</td>
                      <td className="admin-table-cell admin-cell-secondary">{item.examStartTime || "-"}</td>
                      <td className="admin-table-cell admin-cell-secondary">{item.examDuration || "-"}</td>
                      <td className="admin-table-cell admin-cell-code">{item.photo}</td>
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