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
      toast.loading("Processing certificate for PDF generation...", { id: "pdf-gen" });
      
      // Wait a moment for any final renders
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Ultra high quality canvas options for professional certificate
      const canvas = await html2canvas(marksheetRef.current, {
        scale: 4, // Ultra high resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: marksheetRef.current.scrollWidth,
        height: marksheetRef.current.scrollHeight,
        logging: false,
        imageTimeout: 15000,
        removeContainer: true,
        ignoreElements: (element) => {
          return element.classList?.contains('no-print');
        }
      });

      toast.loading("Creating professional PDF document...", { id: "pdf-gen" });

      const imgData = canvas.toDataURL('image/jpeg', 0.98); // High quality JPEG
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true,
        precision: 2
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Optimal scaling for A4 landscape
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight) * 0.95;
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;
      
      // Perfect centering
      const imgX = (pdfWidth - finalWidth) / 2;
      const imgY = (pdfHeight - finalHeight) / 2;

      pdf.addImage(imgData, 'JPEG', imgX, imgY, finalWidth, finalHeight, '', 'FAST');
      
      // Enhanced metadata
      pdf.setProperties({
        title: `${selectedStudent?.full_name} - Professional Certificate`,
        subject: `Course Completion Certificate - ${selectedStudent?.course_name}`,
        author: 'B.SOFT Computer & Technical Institute',
        keywords: 'certificate, diploma, course completion, professional certification',
        creator: 'B.SOFT Institute Management System'
      });

      const fileName = `${selectedStudent?.full_name?.replace(/[^a-zA-Z0-9]/g, '_')}_Certificate_${new Date().getFullYear()}.pdf`;
      pdf.save(fileName);
      
      toast.success("Professional Certificate PDF generated successfully!", { id: "pdf-gen" });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Failed to generate PDF. Please try again.", { id: "pdf-gen" });
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
            <div ref={marksheetRef} className="relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 p-12 min-h-[800px]">
              
              {/* Elegant Border Design */}
              <div className="absolute inset-4 border-4 border-double border-gradient-to-r from-blue-800 via-purple-600 to-blue-800 rounded-lg opacity-60">
                <div className="absolute inset-2 border-2 border-amber-300/40 rounded-md"></div>
                <div className="absolute inset-1 border border-blue-200/30 rounded-md"></div>
              </div>
              
              {/* Decorative Corner Elements */}
              <div className="absolute top-8 left-8 w-20 h-20 border-l-4 border-t-4 border-blue-800/80 rounded-tl-xl"></div>
              <div className="absolute top-8 right-8 w-20 h-20 border-r-4 border-t-4 border-blue-800/80 rounded-tr-xl"></div>
              <div className="absolute bottom-8 left-8 w-20 h-20 border-l-4 border-b-4 border-blue-800/80 rounded-bl-xl"></div>
              <div className="absolute bottom-8 right-8 w-20 h-20 border-r-4 border-b-4 border-blue-800/80 rounded-br-xl"></div>

              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <div className="transform rotate-45 text-9xl font-elegant text-blue-800">
                  B.SOFT
                </div>
              </div>

              <div className="relative z-10">
                {/* Header with Logo and Institution Name */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-6">
                 {/* Enhanced Logo */}
                    <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 border-4 border-amber-400 shadow-2xl flex items-center justify-center">
                      <div className="absolute inset-1 rounded-full border-2 border-white/30"></div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white leading-tight">B</div>
                        <div className="text-sm text-white leading-none font-medium">SOFT</div>
                        <div className="text-xs text-white/90 leading-none font-light">Institute</div>
                      </div>
                    </div>
                  </div>

                  {/* Institution Header */}
                  <h1 className="text-4xl font-elegant font-bold text-blue-800 mb-3 tracking-wide">
                    B.SOFT COMPUTER & TECHNICAL INSTITUTE
                  </h1>
                  
                  <div className="space-y-1 text-sm text-gray-700 mb-6">
                    <div>
                      <span className="font-medium">Registered NGO DARPAN ID: </span>
                      <span className="text-red-600 font-bold">UP/2011/0044943</span>
                    </div>
                    <div>
                      <span className="font-medium">Society Regd. No.: </span>
                      <span className="text-red-600 font-bold">AZ-13610</span>
                    </div>
                    <div>
                      <span className="font-medium">ISO 9001:2015 CERTIFIED No.: </span>
                      <span className="text-red-600 font-bold">UQ-252016790</span>
                    </div>
                  </div>

                  {/* Certificate Title */}
                  <div className="mb-8">
                    <div className="text-purple-600 font-certificate text-lg tracking-wide mb-2 italic">
                      Certificate of Course Completion
                    </div>
                    <h2 className="text-3xl font-elegant font-bold text-red-600 tracking-wider">
                      DIPLOMA CERTIFICATE-CUM-MARKS SHEET
                    </h2>
                    <div className="mt-4 mx-auto w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                  </div>
                </div>

                {/* Student Photo and Details Section */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-8 text-sm">
                      <div>
                        <div className="font-certificate text-gray-700 mb-1">Enrollment Number:</div>
                        <div className="font-bold text-blue-800 text-lg">{selectedStudent?.id || "Not Available"}</div>
                      </div>
                      <div>
                        <div className="font-certificate text-gray-700 mb-1">Roll Number:</div>
                        <div className="font-bold text-blue-800 text-lg">{marksheetData?.roll_number || "Not Available"}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Student Photo */}
                  <div className="w-32 h-40 border-4 border-gray-300 bg-gray-50 flex items-center justify-center shadow-lg rounded-lg">
                    <div className="text-center text-gray-500">
                      <div className="text-xs mb-1">STUDENT</div>
                      <div className="text-xs">PHOTOGRAPH</div>
                    </div>
                  </div>
                </div>

                {/* Certificate Text */}
                <div className="mb-8 text-center font-certificate text-lg leading-relaxed">
                  <div className="bg-blue-50/50 p-6 rounded-lg border border-blue-200/50">
                    <p className="mb-4">
                      This is to certify that <span className="font-bold text-blue-800 text-xl underline decoration-blue-600/30 decoration-2">
                        {selectedStudent?.full_name || "___________________"}
                      </span>
                    </p>
                    <p className="mb-4">
                      Son/Daughter of Mr./Mrs. <span className="border-b-2 border-blue-300 inline-block w-48 h-6 align-bottom mx-2"></span>
                    </p>
                    <p className="mb-4">
                      has successfully completed the <span className="font-bold text-purple-700 text-xl">
                        {selectedStudent?.course_name || "___________________"}
                      </span> course
                    </p>
                    <p className="mb-4">
                      conducted by <span className="font-bold text-blue-800">B.SOFT Computer & Technical Institute</span>
                    </p>
                    <p className="mb-4">
                      in the year <span className="font-bold text-red-600 text-xl">
                        {marksheetData?.examination_date ? new Date(marksheetData.examination_date).getFullYear() : new Date().getFullYear()}
                      </span>
                    </p>
                    <p className="text-gray-700">
                      Center Code: <span className="font-bold text-blue-800">BSOFT001</span>
                    </p>
                  </div>
                </div>

                {/* Academic Performance Table */}
                <div className="mb-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-elegant font-bold text-blue-800 tracking-wider">ACADEMIC PERFORMANCE</h3>
                    <div className="mt-2 mx-auto w-24 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-xl border-2 border-gray-100 overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white">
                          <th className="px-6 py-4 text-sm font-bold text-center tracking-wide">Subject</th>
                          <th className="px-6 py-4 text-sm font-bold text-center tracking-wide">Max. Theory</th>
                          <th className="px-6 py-4 text-sm font-bold text-center tracking-wide">Max. Practical</th>
                          <th className="px-6 py-4 text-sm font-bold text-center tracking-wide">Obtained Theory</th>
                          <th className="px-6 py-4 text-sm font-bold text-center tracking-wide">Obtained Practical</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {courseSubjects.map((subject, index) => (
                          <tr key={subject.id} className={`transition-colors hover:bg-blue-50/50 ${
                            index % 2 === 0 ? "bg-gray-50/70" : "bg-white"
                          }`}>
                            <td className="px-6 py-4 text-center font-semibold text-gray-800 border-r border-gray-100">{subject.subject}</td>
                            <td className="px-6 py-4 text-center font-medium border-r border-gray-100">{subject.theory_marks}</td>
                            <td className="px-6 py-4 text-center font-medium border-r border-gray-100">{subject.practical_marks}</td>
                            <td className="px-6 py-4 text-center font-bold text-blue-600 text-lg border-r border-gray-100">
                              {Math.round(parseInt(subject.theory_marks || "0") * 0.75)}
                            </td>
                            <td className="px-6 py-4 text-center font-bold text-purple-600 text-lg">
                              {Math.round(parseInt(subject.practical_marks || "0") * 0.8)}
                            </td>
                          </tr>
                        ))}
                        
                        {/* Summary Rows */}
                        <tr className="bg-gradient-to-r from-blue-100 to-blue-200 border-t-4 border-blue-400">
                          <td className="px-6 py-4 text-center font-bold text-blue-900 text-lg border-r border-blue-300">TOTAL MARKS</td>
                          <td className="px-6 py-4 text-center font-bold text-blue-800 text-lg border-r border-blue-300">
                            {courseSubjects.reduce((sum, s) => sum + parseInt(s.theory_marks || "0"), 0)}
                          </td>
                          <td className="px-6 py-4 text-center font-bold text-blue-800 text-lg border-r border-blue-300">
                            {courseSubjects.reduce((sum, s) => sum + parseInt(s.practical_marks || "0"), 0)}
                          </td>
                          <td className="px-6 py-4 text-center font-bold text-green-600 text-xl border-r border-blue-300">
                            {marksheetData?.obtained_marks || 0}
                          </td>
                          <td className="px-6 py-4 text-center font-bold text-green-600 text-xl">
                            {courseSubjects.reduce((sum, s) => sum + Math.round(parseInt(s.practical_marks || "0") * 0.8), 0)}
                          </td>
                        </tr>
                        
                        <tr className="bg-gradient-to-r from-purple-100 to-purple-200 border-t-2 border-purple-300">
                          <td className="px-6 py-4 text-center font-bold text-purple-900 text-lg border-r border-purple-300">GRAND TOTAL</td>
                          <td className="px-6 py-4 text-center font-bold text-purple-800 text-xl border-r border-purple-300">
                            {marksheetData?.total_marks || 0}
                          </td>
                          <td className="px-6 py-4 text-center border-r border-purple-300"></td>
                          <td className="px-6 py-4 text-center font-bold text-green-600 text-xl border-r border-purple-300">
                            {marksheetData?.obtained_marks || 0}
                          </td>
                          <td className="px-6 py-4 text-center"></td>
                        </tr>
                        
                        <tr className="bg-gradient-to-r from-amber-100 via-green-100 to-blue-100 border-t-4 border-amber-400">
                          <td className="px-6 py-5 text-center font-bold text-gray-900 text-xl border-r border-amber-300">RESULT</td>
                          <td className="px-6 py-5 text-center border-r border-amber-300">
                            <div className="text-red-600 font-bold text-2xl drop-shadow-sm">
                              {marksheetData?.percentage || 0}%
                            </div>
                          </td>
                          <td className="px-6 py-5 text-center border-r border-amber-300">
                            <div className="text-green-600 font-bold text-2xl drop-shadow-sm">
                              {marksheetData?.grade || "N/A"}
                            </div>
                          </td>
                          <td className="px-6 py-5 text-center border-r border-amber-300">
                            <div className={`font-bold text-lg px-4 py-2 rounded-full shadow-lg ${
                              marksheetData?.result_status === 'pass' 
                                ? 'bg-gradient-to-r from-green-200 to-green-300 text-green-900 border-2 border-green-400' 
                                : 'bg-gradient-to-r from-red-200 to-red-300 text-red-900 border-2 border-red-400'
                            }`}>
                              {marksheetData?.result_status?.toUpperCase() || "PENDING"}
                            </div>
                          </td>
                          <td className="px-6 py-5 text-center"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Grading System and Signatures */}
                <div className="grid grid-cols-2 gap-12 mb-8">
                  {/* Grading Legend */}
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-blue-800 mb-4 text-lg">GRADING SYSTEM</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Distinction (A+):</span>
                        <span className="text-green-600 font-bold">85% & Above</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">First Class (A):</span>
                        <span className="text-blue-600 font-bold">75% - 84%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Second Class (B):</span>
                        <span className="text-purple-600 font-bold">65% - 74%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Third Class (C):</span>
                        <span className="text-orange-600 font-bold">55% - 64%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Pass (D):</span>
                        <span className="text-yellow-600 font-bold">50% - 54%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Fail (F):</span>
                        <span className="text-red-600 font-bold">Below 50%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Signatures Section */}
                  <div className="text-center space-y-6">
                    <div>
                      <div className="w-40 h-20 border-2 border-gray-300 bg-blue-50/30 mx-auto mb-3 flex items-center justify-center rounded-lg">
                        <div className="text-xs text-gray-500 font-elegant">Digital Signature</div>
                      </div>
                      <div className="border-b-2 border-gray-400 w-40 mx-auto mb-2"></div>
                      <div className="font-bold text-blue-800 text-sm">DIRECTOR/PRINCIPAL</div>
                      <div className="text-xs text-gray-600 mt-1">B.SOFT Institute</div>
                    </div>
                  </div>
                </div>

                {/* Footer Information */}
                <div className="grid grid-cols-3 gap-8 mb-6 text-center">
                  <div className="bg-blue-50/50 p-4 rounded-lg">
                    <div className="font-bold text-blue-800 mb-2">Issue Date</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {marksheetData?.examination_date 
                        ? new Date(marksheetData.examination_date).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit', 
                            year: 'numeric'
                          })
                        : new Date().toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })
                      }
                    </div>
                  </div>
                  <div className="bg-purple-50/50 p-4 rounded-lg">
                    <div className="font-bold text-purple-800 mb-2">Place of Issue</div>
                    <div className="text-lg font-semibold text-gray-800">Azamgarh, UP</div>
                  </div>
                  <div className="bg-green-50/50 p-4 rounded-lg">
                    <div className="font-bold text-green-800 mb-2">Certificate ID</div>
                    <div className="text-sm font-mono text-gray-800">
                      BSOFT{new Date().getFullYear()}{selectedStudent?.id?.slice(-4) || "0000"}
                    </div>
                  </div>
                </div>

                {/* Verification and Contact Information */}
                <div className="text-center space-y-3 text-sm">
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <div className="font-medium text-yellow-800 mb-1">Certificate Verification</div>
                    <div className="text-yellow-700">
                      Verify this certificate at{" "}
                      <span className="font-bold text-blue-700 underline">www.binasoftedu.org.in</span>
                      {" "}using enrollment number: <span className="font-mono font-bold">{selectedStudent?.id || "N/A"}</span>
                    </div>
                  </div>
                  
                  <div className="text-gray-600 leading-relaxed">
                    <div className="font-semibold text-gray-800">Head Office Address</div>
                    <div>Near Union Bank Of India, Bina Soft Educational & Welfare Society</div>
                    <div>Vill & Post BILARIYAGAN J, AZAMGARH - 276121, Uttar Pradesh</div>
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