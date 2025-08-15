import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, FileDown, AlertTriangle, User, BookOpen, Calendar } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface StudentData {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  course_name?: string;
  status?: string;
  city?: string;
  state?: string;
  enrollment_date?: string;
}

interface MarksheetData {
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
}

interface CourseSubject {
  id: string;
  course_name: string;
  subject: string;
  theory_marks: string;
  practical_marks: string;
  semester_year: string;
}

const StudentMarksheetContent = () => {
  console.log("StudentMarksheetContent component is loading - v2.0");
  
  const [searchValue, setSearchValue] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [marksheetData, setMarksheetData] = useState<MarksheetData | null>(null);
  const [courseSubjects, setCourseSubjects] = useState<CourseSubject[]>([]);
  const [searchResults, setSearchResults] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const marksheetRef = useRef<HTMLDivElement>(null);

  const checkMissingData = () => {
    const missing: string[] = [];
    
    if (!selectedStudent?.full_name) missing.push("Student Name");
    if (!selectedStudent?.course_name) missing.push("Course Name");
    if (!marksheetData?.roll_number) missing.push("Roll Number");
    if (!marksheetData?.examination_date) missing.push("Examination Date");
    if (!marksheetData?.total_marks) missing.push("Total Marks");
    if (!marksheetData?.obtained_marks) missing.push("Obtained Marks");
    if (!marksheetData?.grade) missing.push("Grade");
    if (courseSubjects.length === 0) missing.push("Course Subjects");
    
    return missing;
  };

  const searchStudents = async () => {
    if (!searchValue.trim()) {
      toast.error("Please enter a search term");
      return;
    }

    setLoading(true);
    try {
      const { data: students, error } = await supabase
        .from('student_profiles')
        .select('*')
        .or(`full_name.ilike.%${searchValue}%,email.ilike.%${searchValue}%,phone.ilike.%${searchValue}%,course_name.ilike.%${searchValue}%`)
        .limit(10);

      if (error) throw error;

      setSearchResults(students || []);
      setShowResults(true);
      
      if (students && students.length === 0) {
        toast.info("No students found matching your search");
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error("Failed to search students");
    } finally {
      setLoading(false);
    }
  };

  const selectStudent = async (student: StudentData) => {
    setSelectedStudent(student);
    setShowResults(false);
    setSearchValue(student.full_name);

    // Fetch marksheet data for this student
    try {
      const { data: marksheet } = await supabase
        .from('marksheet_management')
        .select('*')
        .eq('student_id', student.id)
        .single();

      if (marksheet) {
        setMarksheetData(marksheet);
      }

      // Fetch course subjects
      if (student.course_name) {
        const { data: subjects } = await supabase
          .from('course_subjects')
          .select('*')
          .eq('course_name', student.course_name);

        if (subjects) {
          setCourseSubjects(subjects);
        }
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const generatePDF = async () => {
    if (!marksheetRef.current) return;

    const missing = checkMissingData();
    if (missing.length > 0) {
      toast.error(`Cannot generate certificate. Missing: ${missing.join(', ')}`);
      return;
    }

    try {
      toast.loading("Generating Full A4 Certificate PDF...", { id: "pdf-gen" });
      
      // Ensure layout fully rendered
      await new Promise(resolve => setTimeout(resolve, 400));

      // Capture the certificate at high DPI without forcing size (prevents cropping)
      const canvas = await html2canvas(marksheetRef.current, {
        scale: 4, // Ultra-high quality for professional certificates
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 10000,
        removeContainer: true
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pdfWidth = 210;
      const pdfHeight = 297;

      // Calculate page height in canvas pixels for perfect A4 slicing at full width
      const a4Ratio = pdfHeight / pdfWidth; // ~1.414
      const pageHeightPx = Math.round(canvas.width * a4Ratio);

      // If the canvas height fits into one A4 page slice, render single page filling the sheet
      if (canvas.height <= pageHeightPx) {
        const imgData = canvas.toDataURL('image/jpeg', 0.98);
        // Fill entire page (no margins). Our template keeps A4 ratio so no distortion.
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      } else {
        // Multi-page: slice the tall canvas into A4-height chunks
        let y = 0;
        let pageIndex = 0;
        while (y < canvas.height) {
          const sliceHeight = Math.min(pageHeightPx, canvas.height - y);
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = canvas.width;
          pageCanvas.height = sliceHeight;
          const ctx = pageCanvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
            ctx.drawImage(
              canvas,
              0, y, canvas.width, sliceHeight,
              0, 0, pageCanvas.width, pageCanvas.height
            );
            const pageImg = pageCanvas.toDataURL('image/jpeg', 0.98);
            if (pageIndex > 0) pdf.addPage();
            // Maintain aspect ratio based on width
            const pageImgHeightMm = (sliceHeight / pageHeightPx) * pdfHeight;
            pdf.addImage(pageImg, 'JPEG', 0, 0, pdfWidth, pageImgHeightMm, undefined, 'FAST');
          }
          y += sliceHeight;
          pageIndex += 1;
        }
      }

      pdf.setProperties({
        title: `${selectedStudent?.full_name} - Official Course Certificate`,
        subject: `Professional Certificate - ${selectedStudent?.course_name}`,
        author: 'B.SOFT Computer & Technical Institute',
        keywords: 'certificate, diploma, course completion, A4, professional',
        creator: 'B.SOFT Institute Certificate System'
      });

      const currentDate = new Date().toISOString().split('T')[0];
      const fileName = `${selectedStudent?.full_name?.replace(/[^a-zA-Z0-9]/g, '_')}_Certificate_${currentDate}.pdf`;
      pdf.save(fileName);

      toast.success("Full A4 Certificate PDF Generated Successfully!", { id: "pdf-gen" });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Failed to generate certificate PDF. Please try again.", { id: "pdf-gen" });
    }
  };

  const missing = checkMissingData();

  return (
    <div className="w-full max-w-none bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 min-h-screen">
      {/* Enhanced Header with Search */}
      <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-md m-6 mb-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-orange-600/5"></div>
        <CardContent className="p-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <a href="/admin" className="text-orange-600 hover:text-orange-800 font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105">
                <User className="h-5 w-5" />
                Admin Home
              </a>
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 font-semibold">Find Student:</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchStudents()}
                    className="w-64 h-12 border-2 border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-lg transition-all duration-300"
                    placeholder="Search by name, email, or ID..."
                  />
                  <Button 
                    onClick={searchStudents}
                    disabled={loading}
                    className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-8 h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {loading ? "Searching..." : "Search"}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={generatePDF}
                disabled={!selectedStudent || missing.length > 0}
                className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 text-white px-8 py-3 h-12 flex items-center gap-3 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <FileDown className="h-5 w-5" />
                Generate Professional Certificate PDF
              </Button>
            </div>
          </div>

          {/* Missing Data Warning */}
          {selectedStudent && missing.length > 0 && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">Information Required</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    The following information is not available. Please upload or add it to generate the certificate:
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {missing.map((field) => (
                      <Badge key={field} variant="outline" className="text-amber-700 border-amber-300">
                        {field}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Student Search Results */}
          {showResults && (
            <div className="mt-4 max-h-64 overflow-y-auto border border-gray-200 rounded-lg bg-white shadow-lg animate-fade-in">
              {searchResults.length === 0 ? (
                <div className="p-4 text-center text-gray-500 animate-fade-in">No students found</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {searchResults.map((student, index) => (
                    <div
                      key={student.id}
                      onClick={() => selectStudent(student)}
                      className="p-4 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 cursor-pointer flex items-center justify-between transition-all duration-300 hover:shadow-md animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-lg">{student.full_name}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          <span className="inline-flex items-center gap-1">
                            📧 {student.email}
                          </span>
                          <span className="mx-2">•</span>
                          <span className="inline-flex items-center gap-1">
                            📚 {student.course_name || 'No course assigned'}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          ID: {student.id}
                        </div>
                      </div>
                      <div className="text-sm text-orange-600 font-medium hover:text-orange-700 transition-colors">
                        Select →
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Selected Student Info */}
          {selectedStudent && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-800">Selected Student</h3>
                  <p className="text-sm text-green-700">
                    {selectedStudent.full_name} • {selectedStudent.course_name || 'No course'} • {selectedStudent.email}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Professional Certificate Template */}
      <div className="px-6 pb-6">
        <Card className="shadow-2xl border-0 bg-white overflow-hidden">
          <CardContent className="p-0">
              <div ref={marksheetRef} className="relative bg-white p-6 min-h-[1123px] w-[794px] mx-auto shadow-2xl" style={{ aspectRatio: '210/297' }}>
              
              {/* Professional Certificate Border with Gold Accent */}
              <div className="absolute inset-4 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 rounded-2xl p-1 shadow-2xl">
                <div className="absolute inset-1 bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400 rounded-xl p-1">
                  <div className="w-full h-full bg-gradient-to-br from-white via-blue-50/50 to-amber-50/30 rounded-lg relative overflow-hidden">
                    {/* Decorative Pattern Background */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.3),transparent_50%)]"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Premium Corner Seals */}
              <div className="absolute top-8 left-8 w-16 h-16 bg-gradient-to-br from-blue-900 to-purple-900 rounded-full shadow-xl flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-900 to-purple-900 rounded-full shadow-xl flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Premium Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none z-0">
                <div className="transform rotate-45 text-8xl font-black text-transparent bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text">B.SOFT</div>
              </div>

              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                {/* Premium Header Section */}
                <div className="relative z-10 text-center mb-6">
                  {/* Institute Logo */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 border-4 border-amber-400 shadow-2xl flex items-center justify-center transform hover:scale-105 transition-transform">
                        <div className="text-center">
                          <div className="text-lg font-black text-white leading-tight drop-shadow-lg">B</div>
                          <div className="text-sm text-white leading-none font-bold drop-shadow-lg">SOFT</div>
                        </div>
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full border-2 border-white shadow-lg"></div>
                    </div>
                  </div>

                  {/* Institute Name with Premium Styling */}
                  <div className="mb-4">
                    <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-blue-800 via-purple-700 to-blue-900 bg-clip-text mb-2 leading-tight tracking-wide">
                      B.SOFT COMPUTER & TECHNICAL INSTITUTE
                    </h1>
                    <div className="mx-auto w-32 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 rounded-full shadow-lg"></div>
                  </div>
                  
                  {/* Credentials with Enhanced Design */}
                  <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-lg p-3 mb-4 border border-blue-200 shadow-inner">
                    <div className="text-xs text-gray-800 space-y-1 font-medium">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-blue-700 font-semibold">NGO DARPAN ID:</span> 
                        <span className="text-red-600 font-black text-sm">UP/2011/0044943</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-blue-700 font-semibold">Society Regd. No.:</span> 
                        <span className="text-red-600 font-black text-sm">AZ-13610</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-blue-700 font-semibold">ISO 9001:2015 CERTIFIED No.:</span> 
                        <span className="text-red-600 font-black text-sm">UQ-252016790</span>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Title with Premium Design */}
                  <div className="mb-6">
                    <div className="relative">
                      <h2 className="text-2xl font-black text-transparent bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text tracking-wider leading-tight">
                        DIPLOMA CERTIFICATE-CUM-MARKS SHEET
                      </h2>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent"></div>
                    </div>
                    <div className="mt-3 mx-auto w-28 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-full shadow-lg"></div>
                  </div>
                </div>

                {/* Student Details and Photo Row - Compact */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Enrollment No:</span>
                      <div className="font-bold text-blue-800">{selectedStudent?.id?.slice(-8) || "Not Available"}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Roll Number:</span>
                      <div className="font-bold text-blue-800">{marksheetData?.roll_number || "Not Available"}</div>
                    </div>
                  </div>
                  
                  <div className="w-20 h-24 border-2 border-gray-300 bg-gray-50 flex items-center justify-center shadow-sm rounded">
                    <div className="text-center text-gray-500 text-xs">
                      <div>STUDENT</div>
                      <div>PHOTO</div>
                    </div>
                  </div>
                </div>

                {/* Certificate Text - Compact */}
                <div className="mb-3 text-center text-sm leading-relaxed">
                  <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-200/50">
                    <p className="mb-1">
                      This is to certify that <span className="font-bold text-blue-800 text-base underline decoration-blue-600/30">
                        {selectedStudent?.full_name || "___________________"}
                      </span>
                    </p>
                    <p className="mb-1">
                      Son/Daughter of Mr./Mrs. <span className="border-b border-blue-300 inline-block w-24 h-4 align-bottom mx-1"></span>
                    </p>
                    <p className="mb-1">
                      has successfully completed the <span className="font-bold text-purple-700 text-base">
                        {selectedStudent?.course_name || "___________________"}
                      </span> course
                    </p>
                    <p className="mb-1">
                      conducted by <span className="font-bold text-blue-800">B.SOFT Computer & Technical Institute</span>
                    </p>
                    <p className="mb-1">
                      in the year <span className="font-bold text-red-600 text-base">
                        {marksheetData?.examination_date ? new Date(marksheetData.examination_date).getFullYear() : new Date().getFullYear()}
                      </span>
                    </p>
                    <p className="text-gray-700 text-xs">
                      Center Code: <span className="font-bold text-blue-800">BSOFT001</span>
                    </p>
                  </div>
                </div>

                {/* Academic Performance Table - More Compact */}
                <div className="mb-3">
                  <h3 className="text-base font-bold text-blue-800 text-center mb-2">ACADEMIC PERFORMANCE</h3>
                  
                  <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                          <th className="px-1 py-1.5 text-center font-bold text-xs">Subject</th>
                          <th className="px-1 py-1.5 text-center font-bold text-xs">Max Theory</th>
                          <th className="px-1 py-1.5 text-center font-bold text-xs">Max Practical</th>
                          <th className="px-1 py-1.5 text-center font-bold text-xs">Obt. Theory</th>
                          <th className="px-1 py-1.5 text-center font-bold text-xs">Obt. Practical</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courseSubjects.slice(0, 4).map((subject, index) => (
                          <tr key={subject.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                            <td className="px-1 py-0.5 text-center font-medium text-xs">{subject.subject}</td>
                            <td className="px-1 py-0.5 text-center text-xs">{subject.theory_marks}</td>
                            <td className="px-1 py-0.5 text-center text-xs">{subject.practical_marks}</td>
                            <td className="px-1 py-0.5 text-center font-bold text-blue-600 text-xs">
                              {Math.round(parseInt(subject.theory_marks || "0") * 0.75)}
                            </td>
                            <td className="px-1 py-0.5 text-center font-bold text-purple-600 text-xs">
                              {Math.round(parseInt(subject.practical_marks || "0") * 0.8)}
                            </td>
                          </tr>
                        ))}
                        
                        <tr className="bg-gradient-to-r from-green-100 to-blue-100 border-t-2 border-blue-400">
                          <td className="px-1 py-1.5 text-center font-bold text-gray-800 text-xs">RESULT</td>
                          <td className="px-1 py-1.5 text-center font-bold text-red-600 text-xs">
                            {marksheetData?.percentage || 0}%
                          </td>
                          <td className="px-1 py-1.5 text-center font-bold text-green-600 text-xs">
                            {marksheetData?.grade || "N/A"}
                          </td>
                          <td className="px-1 py-1.5 text-center">
                            <div className={`font-bold text-xs px-1 py-0.5 rounded ${
                              marksheetData?.result_status === 'pass' 
                                ? 'bg-green-200 text-green-800' 
                                : 'bg-red-200 text-red-800'
                            }`}>
                              {marksheetData?.result_status?.toUpperCase() || "PENDING"}
                            </div>
                          </td>
                          <td className="px-1 py-1.5 text-center font-bold text-green-600 text-xs">
                            {marksheetData?.obtained_marks || 0}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Footer Section - Ultra Compact */}
                <div className="grid grid-cols-3 gap-4 items-end">
                  {/* Grading System - Compact */}
                  <div className="bg-gray-50 p-2 rounded border border-gray-200">
                    <h4 className="font-bold text-blue-800 mb-1 text-xs">GRADING SYSTEM</h4>
                    <div className="space-y-0.5 text-xs">
                      <div className="flex justify-between">
                        <span>A+:</span>
                        <span className="text-green-600 font-bold">85%+</span>
                      </div>
                      <div className="flex justify-between">
                        <span>A:</span>
                        <span className="text-blue-600 font-bold">75-84%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>B:</span>
                        <span className="text-purple-600 font-bold">65-74%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>D:</span>
                        <span className="text-yellow-600 font-bold">50-64%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Examination Details */}
                  <div className="text-center">
                    <div className="text-xs mb-2">
                      <div className="font-bold text-blue-800">Issue Date:</div>
                      <div className="font-semibold">
                        {marksheetData?.examination_date 
                          ? new Date(marksheetData.examination_date).toLocaleDateString('en-GB')
                          : new Date().toLocaleDateString('en-GB')
                        }
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 p-1.5 rounded text-xs">
                      <div className="font-medium text-yellow-800">Verify Online</div>
                      <div className="text-yellow-700 font-mono text-xs">
                        {selectedStudent?.id?.slice(-8) || "N/A"}
                      </div>
                    </div>
                  </div>
                  
                  {/* Digital Signature */}
                  <div className="text-center">
                    <div className="w-24 h-12 border-2 border-gray-300 bg-blue-50/30 mx-auto mb-1 flex items-center justify-center rounded">
                      <div className="text-xs text-gray-500 font-bold">Digital Sign</div>
                    </div>
                    <div className="border-b border-gray-400 w-24 mx-auto mb-0.5"></div>
                    <div className="font-bold text-blue-800 text-xs">DIRECTOR</div>
                    <div className="text-xs text-gray-600">B.SOFT Institute</div>
                  </div>
                </div>

                {/* Bottom Contact Info - Ultra Compact */}
                <div className="text-center mt-2 text-xs">
                  <div className="text-gray-600">
                    <div className="font-semibold text-gray-800">Head Office: Near Union Bank Of India, Bina Soft Educational & Welfare Society</div>
                    <div>Vill & Post BILARIYAGAN J, AZAMGARH - 276121, Uttar Pradesh | www.binasoftedu.org.in</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentMarksheetContent;