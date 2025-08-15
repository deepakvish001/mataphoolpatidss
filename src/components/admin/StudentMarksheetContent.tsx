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
      toast.loading("Generating Certificate PDF...", { id: "pdf-gen" });
      
      const certElement = marksheetRef.current;
      
      // Ensure element is visible and styled properly
      certElement.style.display = 'block';
      certElement.style.visibility = 'visible';
      certElement.style.position = 'relative';
      certElement.style.transform = 'none';
      
      // Wait for fonts and layout
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Capturing element:', certElement);
      console.log('Element dimensions:', {
        width: certElement.offsetWidth,
        height: certElement.offsetHeight,
        scrollWidth: certElement.scrollWidth,
        scrollHeight: certElement.scrollHeight
      });

      // Capture with simple, reliable settings
      const canvas = await html2canvas(certElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true, // Enable logging to debug
        imageTimeout: 10000,
        removeContainer: false,
        scrollX: 0,
        scrollY: 0,
        ignoreElements: (element) => {
          // Ignore any overlay elements
          return element.classList?.contains('absolute') && element.classList?.contains('opacity-3');
        }
      });

      console.log('Canvas captured:', {
        width: canvas.width,
        height: canvas.height
      });

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error('Canvas capture failed - no content captured');
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = 210;
      const pdfHeight = 297;

      // Calculate scaling to fit A4
      const canvasRatio = canvas.height / canvas.width;
      let imgWidth = pdfWidth;
      let imgHeight = imgWidth * canvasRatio;

      // If too tall, scale down to fit
      if (imgHeight > pdfHeight) {
        imgHeight = pdfHeight;
        imgWidth = imgHeight / canvasRatio;
      }

      // Center the image
      const x = (pdfWidth - imgWidth) / 2;
      const y = (pdfHeight - imgHeight) / 2;

      const imgData = canvas.toDataURL('image/jpeg', 0.9);
      
      console.log('Adding image to PDF:', {
        imgWidth,
        imgHeight,
        x,
        y
      });

      pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);

      // Add metadata
      pdf.setProperties({
        title: `${selectedStudent?.full_name} - Certificate`,
        subject: `Certificate - ${selectedStudent?.course_name}`,
        author: 'B.SOFT Computer & Technical Institute'
      });

      const currentDate = new Date().toISOString().split('T')[0];
      const sanitizedName = selectedStudent?.full_name?.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_') || 'Student';
      const fileName = `${sanitizedName}_Certificate_${currentDate}.pdf`;
      
      pdf.save(fileName);

      toast.success("Certificate PDF Generated Successfully!", { id: "pdf-gen" });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error(`Failed to generate PDF: ${error.message}`, { id: "pdf-gen" });
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
            <div ref={marksheetRef} className="relative bg-white p-4 min-h-[1123px] w-[794px] mx-auto" style={{ aspectRatio: '210/297' }}>
              
              {/* Elegant Certificate Border with Decorative Frame */}
              <div className="absolute inset-3 border-4 border-double border-blue-900 rounded-lg bg-gradient-to-br from-blue-50/30 via-white to-amber-50/30">
                <div className="absolute inset-3 border-2 border-amber-500 rounded-md bg-white/80"></div>
                <div className="absolute inset-5 border border-blue-400 rounded-sm"></div>
              </div>
              
              {/* Elegant Corner Ornaments */}
              <div className="absolute top-6 left-6 w-12 h-12 border-l-3 border-t-3 border-blue-900 rounded-tl-lg"></div>
              <div className="absolute top-6 right-6 w-12 h-12 border-r-3 border-t-3 border-blue-900 rounded-tr-lg"></div>
              <div className="absolute bottom-6 left-6 w-12 h-12 border-l-3 border-b-3 border-blue-900 rounded-bl-lg"></div>
              <div className="absolute bottom-6 right-6 w-12 h-12 border-r-3 border-b-3 border-blue-900 rounded-br-lg"></div>

              {/* Subtle Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none">
                <div className="transform rotate-45 text-6xl font-bold text-blue-800">B.SOFT</div>
              </div>

              <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                {/* Header Section - Compact */}
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 border-3 border-amber-400 shadow-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-sm font-bold text-white leading-tight">B</div>
                        <div className="text-xs text-white leading-none">SOFT</div>
                      </div>
                    </div>
                  </div>

                  <h1 className="text-2xl font-bold text-blue-800 mb-1 leading-tight">
                    B.SOFT COMPUTER & TECHNICAL INSTITUTE
                  </h1>
                  
                  <div className="text-xs text-gray-700 mb-2 space-y-0.5">
                    <div><span className="font-medium">NGO DARPAN ID:</span> <span className="text-red-600 font-bold">UP/2011/0044943</span></div>
                    <div><span className="font-medium">Society Regd. No.:</span> <span className="text-red-600 font-bold">AZ-13610</span></div>
                    <div><span className="font-medium">ISO 9001:2015 CERTIFIED No.:</span> <span className="text-red-600 font-bold">UQ-252016790</span></div>
                  </div>

                  <div className="mb-3">
                    <h2 className="text-xl font-bold text-red-600 tracking-wide">
                      DIPLOMA CERTIFICATE-CUM-MARKS SHEET
                    </h2>
                    <div className="mt-1 mx-auto w-20 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
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

                {/* Academic Performance Table - Dynamic for Multiple Subjects */}
                <div className="mb-3">
                  <h3 className="text-base font-bold text-blue-800 text-center mb-2">ACADEMIC PERFORMANCE</h3>
                  
                  <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
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