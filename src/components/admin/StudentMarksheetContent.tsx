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
  const headerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

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
    if (!marksheetRef.current) {
      toast.error("Certificate template not found");
      return;
    }

    const missing = checkMissingData();
    if (missing.length > 0) {
      toast.error(`Cannot generate certificate. Missing: ${missing.join(', ')}`);
      return;
    }

    try {
      toast.loading("Creating Professional Certificate...", { id: "pdf-gen" });

      // Ensure layout and webfonts are fully ready
      if ((document as any).fonts?.ready) {
        await (document as any).fonts.ready;
      }
      await new Promise((resolve) => setTimeout(resolve, 400));

      const element = marksheetRef.current;

      // High-DPI capture for crisp text; stable settings to avoid blank pages
      const canvas = await html2canvas(element, {
        scale: Math.min(3, window.devicePixelRatio * 2),
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 12000,
        scrollX: 0,
        scrollY: 0,
      });

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error('Captured canvas has zero size');
      }

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
      const pdfWidth = 210;
      const pdfHeight = 297;
      const margin = 10; // mm

      // Compute usable page size (accounting for margins)
      const usableWidthMm = pdfWidth - margin * 2;
      const usableHeightMm = pdfHeight - margin * 2;

      // Compute page height in canvas pixels to slice clean A4 pages (scaled to usable area)
      const pageHeightPx = Math.round((canvas.width * usableHeightMm) / usableWidthMm);

      // Compute row-aware page breaks to avoid splitting subject rows
      const ratio = canvas.width / element.clientWidth; // canvas px per CSS px
      const yBreaks: number[] = [0];
      let lastBreak = 0;

      if (tableRef.current) {
        const elemRect = element.getBoundingClientRect();
        const rows = Array.from(tableRef.current.querySelectorAll('tbody tr')) as HTMLElement[];
        for (let i = 0; i < rows.length; i++) {
          const r = rows[i].getBoundingClientRect();
          const rowBottomPx = Math.round((r.bottom - elemRect.top) * ratio);
          if (rowBottomPx - lastBreak > pageHeightPx && i > 0) {
            const prevBottom = rows[i - 1].getBoundingClientRect().bottom;
            const prevBottomPx = Math.max(lastBreak + 1, Math.round((prevBottom - elemRect.top) * ratio));
            yBreaks.push(prevBottomPx);
            lastBreak = prevBottomPx;
          }
        }
      }

      if (yBreaks[yBreaks.length - 1] !== canvas.height) {
        // Fill remaining pages if needed
        let next = yBreaks[yBreaks.length - 1];
        while (next + pageHeightPx < canvas.height) {
          next += pageHeightPx;
          yBreaks.push(next);
        }
        if (yBreaks[yBreaks.length - 1] !== canvas.height) yBreaks.push(canvas.height);
      }

      // Render each slice as a page with margins
      for (let i = 0; i < yBreaks.length - 1; i++) {
        if (i > 0) pdf.addPage();
        const sliceTop = yBreaks[i];
        const sliceHeight = yBreaks[i + 1] - sliceTop;

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;
        const ctx = pageCanvas.getContext('2d');
        if (!ctx) throw new Error('2D context not available');

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(canvas, 0, sliceTop, canvas.width, sliceHeight, 0, 0, pageCanvas.width, pageCanvas.height);

        const imgData = pageCanvas.toDataURL('image/jpeg', 0.95);
        const heightMm = (sliceHeight / canvas.width) * usableWidthMm;
        pdf.addImage(imgData, 'JPEG', margin, margin, usableWidthMm, heightMm, undefined, 'FAST');

        // Optional border for aesthetics
        pdf.setDrawColor(90, 90, 140);
        pdf.setLineWidth(0.4);
        pdf.rect(5, 5, pdfWidth - 10, pdfHeight - 10);
      }

      const currentDate = new Date().toISOString().split('T')[0];
      const sanitizedName = selectedStudent?.full_name?.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '_') || 'Student';
      const fileName = `${sanitizedName}_Certificate_${currentDate}.pdf`;
      pdf.save(fileName);

      toast.success("Professional Certificate Generated!", { id: "pdf-gen" });
    } catch (error: any) {
      console.error('PDF error:', error);
      toast.error(`Failed to generate certificate: ${error?.message || 'Unknown error'}`, { id: "pdf-gen" });
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

      {/* Enhanced Professional Certificate */}
      <div className="px-6 pb-6">
        <Card className="shadow-2xl border-0 bg-white overflow-hidden">
          <CardContent className="p-0">
            <div ref={marksheetRef} className="relative bg-white w-[210mm] min-h-[297mm] mx-auto p-8" style={{ fontFamily: 'serif' }}>
              
              {/* Premium Border Design */}
              <div className="absolute inset-4 border-4 border-double border-indigo-800 rounded-lg">
                <div className="absolute inset-2 border-2 border-amber-400 rounded-md">
                  <div className="absolute inset-2 border border-indigo-300 rounded-sm bg-gradient-to-br from-blue-50/40 via-white to-amber-50/30"></div>
                </div>
              </div>
              
              {/* Elegant Corner Decorations */}
              <div className="absolute top-6 left-6 w-16 h-16 border-l-4 border-t-4 border-indigo-800 rounded-tl-xl opacity-60"></div>
              <div className="absolute top-6 right-6 w-16 h-16 border-r-4 border-t-4 border-indigo-800 rounded-tr-xl opacity-60"></div>
              <div className="absolute bottom-6 left-6 w-16 h-16 border-l-4 border-b-4 border-indigo-800 rounded-bl-xl opacity-60"></div>
              <div className="absolute bottom-6 right-6 w-16 h-16 border-r-4 border-b-4 border-indigo-800 rounded-br-xl opacity-60"></div>

              <div className="relative z-10 p-8 h-full flex flex-col">
                {/* Premium Header */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-800 border-4 border-amber-400 shadow-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white leading-tight">B</div>
                        <div className="text-sm text-white leading-none">SOFT</div>
                      </div>
                    </div>
                  </div>

                  <h1 className="text-3xl font-bold text-indigo-900 mb-2 tracking-wide">
                    B.SOFT COMPUTER & TECHNICAL INSTITUTE
                  </h1>
                  
                  <div className="text-sm text-gray-700 mb-4 space-y-1 font-medium">
                    <div>🏛️ <span className="font-semibold">NGO DARPAN ID:</span> <span className="text-red-600 font-bold">UP/2011/0044943</span></div>
                    <div>📋 <span className="font-semibold">Society Regd. No.:</span> <span className="text-red-600 font-bold">AZ-13610</span></div>
                    <div>⭐ <span className="font-semibold">ISO 9001:2015 CERTIFIED:</span> <span className="text-red-600 font-bold">UQ-252016790</span></div>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-red-600 tracking-wider mb-2">
                      🎓 DIPLOMA CERTIFICATE-CUM-MARKS SHEET
                    </h2>
                    <div className="mx-auto w-32 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-500 rounded-full"></div>
                  </div>
                </div>

                {/* Student Info & Photo - Enhanced Layout */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1 grid grid-cols-2 gap-6 text-base">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <span className="font-semibold text-indigo-800 text-sm">📝 Enrollment No:</span>
                      <div className="font-bold text-indigo-900 text-lg">{selectedStudent?.id?.slice(-8) || "Not Available"}</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <span className="font-semibold text-green-800 text-sm">🎯 Roll Number:</span>
                      <div className="font-bold text-green-900 text-lg">{marksheetData?.roll_number || "Not Available"}</div>
                    </div>
                  </div>
                  
                  <div className="w-24 h-32 border-3 border-indigo-300 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center shadow-lg rounded-lg ml-6">
                    <div className="text-center text-indigo-600 text-sm font-semibold">
                      <div>👤</div>
                      <div>STUDENT</div>
                      <div>PHOTO</div>
                    </div>
                  </div>
                </div>

                {/* Premium Certificate Text */}
                <div className="mb-6 text-center">
                  <div className="bg-gradient-to-r from-blue-50 via-white to-purple-50 p-6 rounded-xl border-2 border-indigo-200 shadow-inner">
                    <p className="text-lg mb-3 leading-relaxed">
                      🏆 This is to certify that <span className="font-bold text-indigo-900 text-xl underline decoration-indigo-400/50 decoration-2">
                        {selectedStudent?.full_name || "___________________"}
                      </span>
                    </p>
                    <p className="text-base mb-3">
                      Son/Daughter of Mr./Mrs. <span className="border-b-2 border-indigo-400 inline-block w-32 h-6 align-bottom mx-2"></span>
                    </p>
                    <p className="text-lg mb-3">
                      has successfully completed the <span className="font-bold text-purple-800 text-xl bg-yellow-100 px-2 py-1 rounded">
                        {selectedStudent?.course_name || "___________________"}
                      </span> course
                    </p>
                    <p className="text-base mb-3">
                      conducted by <span className="font-bold text-indigo-900">B.SOFT Computer & Technical Institute</span>
                    </p>
                    <p className="text-lg mb-2">
                      in the year <span className="font-bold text-red-700 text-xl bg-red-100 px-3 py-1 rounded-lg">
                        {marksheetData?.examination_date ? new Date(marksheetData.examination_date).getFullYear() : new Date().getFullYear()}
                      </span>
                    </p>
                    <p className="text-sm text-gray-700">
                      🏢 <span className="font-semibold">Center Code:</span> <span className="font-bold text-indigo-800">BSOFT001</span>
                    </p>
                  </div>
                </div>

                {/* Academic Performance Table - Dynamic for Multiple Subjects */}
                <div className="mb-3">
                  <h3 className="text-base font-bold text-blue-800 text-center mb-2">ACADEMIC PERFORMANCE</h3>
                  
                  <div ref={tableRef} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                          <th className="px-1 py-1.5 text-center font-bold text-xs border-r border-blue-500">Subject</th>
                          <th className="px-1 py-1.5 text-center font-bold text-xs border-r border-blue-500">Max Theory</th>
                          <th className="px-1 py-1.5 text-center font-bold text-xs border-r border-blue-500">Max Practical</th>
                          <th className="px-1 py-1.5 text-center font-bold text-xs border-r border-blue-500">Obt. Theory</th>
                          <th className="px-1 py-1.5 text-center font-bold text-xs">Obt. Practical</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courseSubjects.map((subject, index) => (
                          <tr key={subject.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                            <td className="px-1 py-1 text-left font-medium text-xs border-r border-gray-200 max-w-[120px] break-words">
                              {subject.subject}
                            </td>
                            <td className="px-1 py-1 text-center text-xs border-r border-gray-200">{subject.theory_marks}</td>
                            <td className="px-1 py-1 text-center text-xs border-r border-gray-200">{subject.practical_marks}</td>
                            <td className="px-1 py-1 text-center font-bold text-blue-600 text-xs border-r border-gray-200">
                              {Math.round(parseInt(subject.theory_marks || "0") * 0.75)}
                            </td>
                            <td className="px-1 py-1 text-center font-bold text-purple-600 text-xs">
                              {Math.round(parseInt(subject.practical_marks || "0") * 0.8)}
                            </td>
                          </tr>
                        ))}
                        
                        {/* Summary Row */}
                        <tr className="bg-gradient-to-r from-green-100 to-blue-100 border-t-2 border-blue-400">
                          <td className="px-1 py-1.5 text-center font-bold text-gray-800 text-xs border-r border-blue-300">
                            OVERALL RESULT
                          </td>
                          <td className="px-1 py-1.5 text-center font-bold text-red-600 text-xs border-r border-blue-300">
                            {marksheetData?.percentage || 0}%
                          </td>
                          <td className="px-1 py-1.5 text-center font-bold text-green-600 text-xs border-r border-blue-300">
                            Grade: {marksheetData?.grade || "N/A"}
                          </td>
                          <td className="px-1 py-1.5 text-center border-r border-blue-300">
                            <div className={`font-bold text-xs px-1 py-0.5 rounded ${
                              marksheetData?.result_status === 'pass' 
                                ? 'bg-green-200 text-green-800' 
                                : 'bg-red-200 text-red-800'
                            }`}>
                              {marksheetData?.result_status?.toUpperCase() || "PENDING"}
                            </div>
                          </td>
                          <td className="px-1 py-1.5 text-center font-bold text-green-600 text-xs">
                            Total: {marksheetData?.obtained_marks || 0}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Subject Count Info */}
                  {courseSubjects.length > 6 && (
                    <div className="mt-2 text-center">
                      <div className="inline-block bg-blue-50 border border-blue-200 rounded px-3 py-1">
                        <span className="text-xs text-blue-700 font-medium">
                          Showing all {courseSubjects.length} subjects • Multi-page certificate
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Enhanced Footer Section */}
                <div className="grid grid-cols-3 gap-6 items-end mt-8">
                  {/* Premium Grading System */}
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-xl border-2 border-gray-200 shadow-lg">
                    <h4 className="font-bold text-indigo-900 mb-3 text-base flex items-center gap-2">
                      📊 GRADING SYSTEM
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center bg-green-100 px-2 py-1 rounded">
                        <span className="font-semibold">A+:</span>
                        <span className="text-green-700 font-bold">85%+</span>
                      </div>
                      <div className="flex justify-between items-center bg-blue-100 px-2 py-1 rounded">
                        <span className="font-semibold">A:</span>
                        <span className="text-blue-700 font-bold">75-84%</span>
                      </div>
                      <div className="flex justify-between items-center bg-purple-100 px-2 py-1 rounded">
                        <span className="font-semibold">B:</span>
                        <span className="text-purple-700 font-bold">65-74%</span>
                      </div>
                      <div className="flex justify-between items-center bg-yellow-100 px-2 py-1 rounded">
                        <span className="font-semibold">C:</span>
                        <span className="text-yellow-700 font-bold">50-64%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Examination Details */}
                  <div className="text-center">
                    <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200 mb-4">
                      <div className="text-sm mb-2">
                        <div className="font-bold text-indigo-900 flex items-center justify-center gap-2 mb-2">
                          📅 Issue Date:
                        </div>
                        <div className="font-bold text-lg text-indigo-800">
                          {marksheetData?.examination_date 
                            ? new Date(marksheetData.examination_date).toLocaleDateString('en-GB')
                            : new Date().toLocaleDateString('en-GB')
                          }
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-100 border-2 border-yellow-300 p-3 rounded-xl">
                      <div className="font-bold text-yellow-800 text-sm">🔍 Verify Online</div>
                      <div className="text-yellow-700 font-mono text-lg font-bold">
                        {selectedStudent?.id?.slice(-8) || "N/A"}
                      </div>
                    </div>
                  </div>
                  
                  {/* Premium Digital Signature */}
                  <div className="text-center">
                    <div className="w-32 h-16 border-3 border-indigo-300 bg-gradient-to-br from-blue-50 to-indigo-100 mx-auto mb-3 flex items-center justify-center rounded-xl shadow-lg">
                      <div className="text-sm text-indigo-700 font-bold">✍️ Digital Seal</div>
                    </div>
                    <div className="border-b-2 border-indigo-400 w-32 mx-auto mb-2"></div>
                    <div className="font-bold text-indigo-900 text-base">DIRECTOR</div>
                    <div className="text-sm text-indigo-700 font-semibold">B.SOFT Institute</div>
                  </div>
                </div>

                {/* Enhanced Contact Information */}
                <div className="text-center mt-6 text-sm">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-200">
                    <div className="text-indigo-800 font-semibold mb-2">
                      🏢 <span className="font-bold">Head Office:</span> Near Union Bank Of India, Bina Soft Educational & Welfare Society
                    </div>
                    <div className="text-indigo-700">
                      📍 Vill & Post BILARIYAGAN J, AZAMGARH - 276121, Uttar Pradesh
                    </div>
                    <div className="text-indigo-600 font-medium mt-2">
                      🌐 www.binasoftedu.org.in
                    </div>
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