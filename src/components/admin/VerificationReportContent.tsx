import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, FileText, Users, GraduationCap, Award, MapPin, User, Calendar, Image, FileCheck, Download, Printer, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VerificationReportContent = () => {
  const { toast } = useToast();

  // Sample student verification report data based on the screenshot
  const [students] = useState([
    {
      id: 1,
      state: "Delhi",
      district: "PHASE1",
      centerCode: "123",
      enrollmentNo: "455",
      dob: "12/12/2018",
      name: "VIVEK",
      courseName: "Diploma in Computer Application",
      photo: "~/Offer_pic/adchn.jpg",
      certificate: "~/Offer_pic/alison_courseware_intro_599.jpg",
      marksheet: "~/Offer_pic/refrigeration-and-air-conditioning.jpg"
    },
    {
      id: 2,
      state: "Uttar Pradesh",
      district: "Azamgarh",
      centerCode: "",
      enrollmentNo: "",
      dob: "",
      name: "",
      courseName: "ADCA",
      photo: "~/Offer_pic/",
      certificate: "~/Offer_pic/",
      marksheet: "~/Offer_pic/"
    },
    {
      id: 3,
      state: "Uttar Pradesh",
      district: "Mau",
      centerCode: "SM11101",
      enrollmentNo: "20070",
      dob: "12/08/2007",
      name: "Vineet Pandey",
      courseName: "Advance Diploma In Computer Application (ADCA)",
      photo: "~/Offer_pic/VINEET PANDEY.jpg",
      certificate: "~/Offer_pic/",
      marksheet: "~/Offer_pic/vineet pandey adca.pdf"
    },
    {
      id: 4,
      state: "Uttar Pradesh",
      district: "Mau",
      centerCode: "SM11101",
      enrollmentNo: "20051",
      dob: "07/07/1998",
      name: "Km Jyoti",
      courseName: "Advance Diploma In Computer Application (ADCA)",
      photo: "~/Offer_pic/jyoti photo.jpg",
      certificate: "~/Offer_pic/",
      marksheet: "~/Offer_pic/jyoti marksheet.pdf"
    },
    {
      id: 5,
      state: "0",
      district: "Azamgarh",
      centerCode: "SM11101",
      enrollmentNo: "20072",
      dob: "",
      name: "Ranvijay Yadav",
      courseName: "Advance Diploma In Computer Application (ADCA)",
      photo: "~/Offer_pic/",
      certificate: "~/Offer_pic/",
      marksheet: "~/Offer_pic/"
    },
    {
      id: 6,
      state: "Uttar Pradesh",
      district: "Mau",
      centerCode: "SM11101",
      enrollmentNo: "20074",
      dob: "14/03/2002",
      name: "ADITYA KUMAR",
      courseName: "Advance Diploma In Computer Application (ADCA)",
      photo: "~/Offer_pic/ADITYA.jpeg",
      certificate: "~/Offer_pic/",
      marksheet: "~/Offer_pic/ar.pdf"
    },
    {
      id: 7,
      state: "Uttar Pradesh",
      district: "AMBEDAKAR NAGAR",
      centerCode: "SM11101",
      enrollmentNo: "BSOFT300375",
      dob: "05/07/1988",
      name: "SURABHI SINGH",
      courseName: "Advance Diploma In Computer Application (ADCA)",
      photo: "~/Offer_pic/SURABHI SINGH.jpeg",
      certificate: "~/Offer_pic/",
      marksheet: "~/Offer_pic/SURABHI.pdf"
    },
    {
      id: 8,
      state: "Uttar Pradesh",
      district: "Azamgarh",
      centerCode: "SM11101",
      enrollmentNo: "20085",
      dob: "12/11/2000",
      name: "Shrinath Yadav",
      courseName: "Advance Diploma In Computer Application (ADCA)",
      photo: "~/Offer_pic/shrinath.jpeg",
      certificate: "~/Offer_pic/",
      marksheet: "~/Offer_pic/shrinath.pdf"
    },
    {
      id: 9,
      state: "Uttar Pradesh",
      district: "Mau",
      centerCode: "SM11101",
      enrollmentNo: "20098",
      dob: "03/01/2005",
      name: "BAJARANGI RAJBHAR",
      courseName: "Advance Diploma In Computer Application (ADCA)",
      photo: "~/Offer_pic/bajrangi.jpeg",
      certificate: "~/Offer_pic/",
      marksheet: "~/Offer_pic/"
    },
    {
      id: 10,
      state: "Uttar Pradesh",
      district: "Mau",
      centerCode: "SM11101",
      enrollmentNo: "200104",
      dob: "02/02/2003",
      name: "ROSHAN RAJBHAR",
      courseName: "Advance Diploma In Computer Application (ADCA)",
      photo: "~/Offer_pic/roshan rajbhar.jpeg",
      certificate: "~/Offer_pic/",
      marksheet: "~/Offer_pic/ROSHAN.pdf"
    }
  ]);

  const handleEdit = (studentId: number) => {
    toast({
      title: "Edit Student",
      description: `Opening edit form for student ID ${studentId}`,
      variant: "default"
    });
  };

  const handleDelete = (studentId: number) => {
    toast({
      title: "Delete Student",
      description: `Delete action for student ID ${studentId}`,
      variant: "destructive"
    });
  };

  const referenceNumber = "1234567";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5 p-6">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-4 rounded-lg shadow-lg">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-primary-foreground" />
            <h1 className="text-xl font-bold text-primary-foreground">Verification Report</h1>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Students</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-200" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-green-100 text-sm font-medium">Verified Students</p>
                <p className="text-2xl font-bold">{students.filter(s => s.enrollmentNo && s.name).length}</p>
              </div>
              <FileCheck className="h-8 w-8 text-green-200" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-purple-100 text-sm font-medium">Courses</p>
                <p className="text-2xl font-bold">{new Set(students.map(s => s.courseName)).size}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-purple-200" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-orange-100 text-sm font-medium">Districts</p>
                <p className="text-2xl font-bold">{new Set(students.map(s => s.district)).size}</p>
              </div>
              <MapPin className="h-8 w-8 text-orange-200" />
            </CardContent>
          </Card>
        </div>

        {/* Verification Report Table */}
        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Student Verification Report ({students.length} records)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border border-border rounded-lg bg-background/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[1800px]">
                  <thead>
                    <tr className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                      <th className="border border-border px-4 py-3 text-sm font-semibold text-left min-w-[120px]">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          State & Actions
                        </div>
                      </th>
                      <th className="border border-border px-4 py-3 text-sm font-semibold text-left min-w-[120px]">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          District
                        </div>
                      </th>
                      <th className="border border-border px-4 py-3 text-sm font-semibold text-left min-w-[140px]">Center Code</th>
                      <th className="border border-border px-4 py-3 text-sm font-semibold text-left min-w-[150px]">Enrollment No</th>
                      <th className="border border-border px-4 py-3 text-sm font-semibold text-left min-w-[120px]">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          DOB
                        </div>
                      </th>
                      <th className="border border-border px-4 py-3 text-sm font-semibold text-left min-w-[160px]">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          Student Name
                        </div>
                      </th>
                      <th className="border border-border px-4 py-3 text-sm font-semibold text-left min-w-[300px]">
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4" />
                          Course Name
                        </div>
                      </th>
                      <th className="border border-border px-4 py-3 text-sm font-semibold text-left min-w-[220px]">
                        <div className="flex items-center gap-1">
                          <Image className="h-4 w-4" />
                          Photo
                        </div>
                      </th>
                      <th className="border border-border px-4 py-3 text-sm font-semibold text-left min-w-[220px]">
                        <div className="flex items-center gap-1">
                          <FileCheck className="h-4 w-4" />
                          Certificate
                        </div>
                      </th>
                      <th className="border border-border px-4 py-3 text-sm font-semibold text-left min-w-[250px]">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          Marksheet
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={student.id} className={index % 2 === 0 ? "bg-background hover:bg-accent/30" : "bg-accent/10 hover:bg-accent/40"}>
                        <td className="border border-border px-4 py-3 text-sm">
                          <div className="flex gap-2 mb-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(student.id)}
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(student.id)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="font-medium text-primary">{student.state}</div>
                        </td>
                        <td className="border border-border px-4 py-3 text-sm font-medium">{student.district}</td>
                        <td className="border border-border px-4 py-3 text-sm font-mono">{student.centerCode}</td>
                        <td className="border border-border px-4 py-3 text-sm font-mono text-blue-600">{student.enrollmentNo}</td>
                        <td className="border border-border px-4 py-3 text-sm">{student.dob}</td>
                        <td className="border border-border px-4 py-3 text-sm font-medium text-green-600">{student.name}</td>
                        <td className="border border-border px-4 py-3 text-sm">{student.courseName}</td>
                        <td className="border border-border px-4 py-3 text-sm text-muted-foreground break-all">{student.photo}</td>
                        <td className="border border-border px-4 py-3 text-sm text-muted-foreground break-all">{student.certificate}</td>
                        <td className="border border-border px-4 py-3 text-sm text-muted-foreground break-all">{student.marksheet}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reference Number Footer */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg border-0">
          <CardContent className="text-center py-6">
            <div className="flex items-center justify-center gap-3">
              <FileCheck className="h-6 w-6" />
              <div>
                <p className="text-sm opacity-90">Report Reference Number</p>
                <p className="text-2xl font-bold tracking-wider">{referenceNumber}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card className="shadow-lg border-0 bg-card/50 backdrop-blur">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg">
                <Share className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" className="border-2 hover:bg-accent/50 shadow-md">
                <Printer className="h-4 w-4 mr-2" />
                Print Report
              </Button>
              <Button variant="outline" className="border-2 hover:bg-accent/50 shadow-md">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerificationReportContent;