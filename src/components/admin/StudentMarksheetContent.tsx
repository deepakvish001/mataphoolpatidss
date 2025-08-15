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
        .or(`full_name.ilike.%${searchValue}%,email.ilike.%${searchValue}%,id.eq.${searchValue}`)
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
      toast.info("Generating PDF... Please wait");
      
      const canvas = await html2canvas(marksheetRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${selectedStudent?.full_name}_marksheet.pdf`);
      
      toast.success("PDF generated successfully!");
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Failed to generate PDF");
    }
  };

  const missing = checkMissingData();

  return (
    <div className="w-full max-w-none bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Enhanced Header with Search */}
      <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm m-6 mb-4">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <a href="/admin" className="text-orange-600 hover:text-orange-800 font-medium flex items-center gap-2">
                <User className="h-4 w-4" />
                Admin Home
              </a>
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-700 font-medium">Find Student:</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchStudents()}
                    className="w-60 h-10 border border-orange-300 focus:border-orange-500 focus:ring-orange-500/20"
                    placeholder="Search by name, email, or ID..."
                  />
                  <Button 
                    onClick={searchStudents}
                    disabled={loading}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6"
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
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-2 flex items-center gap-2"
              >
                <FileDown className="h-4 w-4" />
                Generate Certificate PDF
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
            <div className="mt-4 max-h-64 overflow-y-auto border border-gray-200 rounded-lg bg-white">
              {searchResults.length === 0 ? (
                <div className="p-4 text-center text-gray-500">No students found</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {searchResults.map((student) => (
                    <div
                      key={student.id}
                      onClick={() => selectStudent(student)}
                      className="p-4 hover:bg-orange-50 cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{student.full_name}</div>
                        <div className="text-sm text-gray-500">
                          {student.email} • {student.course_name || 'No course assigned'}
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">Click to select</div>
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

      {/* Marksheet Template */}
      <div className="px-6 pb-6">
        <Card className="shadow-2xl border-0 bg-white">
          <CardContent className="p-0">
            <div ref={marksheetRef} className="bg-gray-50 p-8 border-2 border-gray-400">
              
              {/* Header Section with Logo */}
              <div className="flex items-start justify-between mb-8">
                <div className="text-left">
                  <div className="font-bold text-black text-base">Enroll. Number</div>
                  <div className="border-b-2 border-black w-40 h-6 mt-2 flex items-end">
                    <span className="text-sm pb-1">{selectedStudent?.id || ""}</span>
                  </div>
                </div>
                
                {/* Center Logo */}
                <div className="flex-shrink-0 mx-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 border-4 border-pink-700 flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <div className="text-xs font-bold text-white leading-tight">B SOFT</div>
                      <div className="text-xs text-white leading-none">Computer &</div>
                      <div className="text-xs text-white leading-none">Technical</div>
                      <div className="text-xs text-white leading-none">Institute</div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-black text-base">Sl. No.</div>
                  <div className="border-b-2 border-black w-40 h-6 mt-2 flex items-end justify-end">
                    <span className="text-sm pb-1">{marksheetData?.roll_number || ""}</span>
                  </div>
                </div>
              </div>

              {/* Institute Header with Photo */}
              <div className="relative mb-8">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-blue-700 mb-4 tracking-wider">
                    B.SOFT COMPUTER & TECHNICAL INSTITUTE
                  </h1>
                  <div className="text-sm text-black mb-2 leading-tight">
                    <span className="font-medium">Registered NGO DARPAN ID AAYOGRegd. No. </span>
                    <span className="text-red-600 font-bold">UP/2011/0044943</span>
                  </div>
                  <div className="text-sm text-black mb-2 leading-tight">
                    <span className="font-medium">Regd. with : Society Regd. No. : </span>
                    <span className="text-red-600 font-bold">AZ-13610</span>
                  </div>
                  <div className="text-sm text-black mb-6 leading-tight">
                    <span className="font-medium">ISO 9001:2015 CERTIFIED/No.- </span>
                    <span className="text-red-600 font-bold">UQ-252016790</span>
                  </div>
                  
                  {/* Photo positioned absolute on right side */}
                  <div className="absolute right-0 top-20">
                    <div className="w-24 h-32 border-2 border-black bg-white flex items-center justify-center">
                      <div className="text-xs text-gray-500 text-center">Student Photo</div>
                    </div>
                  </div>
                  
                  <div className="text-pink-600 font-bold text-lg tracking-wide mb-2">
                    (Awarded to Under the Management)
                  </div>
                  <h2 className="text-2xl font-bold text-red-600 tracking-wider">
                    CERTIFICATE-CUM-MARKS SHEET
                  </h2>
                </div>
              </div>

              {/* Certificate Text with Dynamic Data */}
              <div className="mb-8 text-sm leading-relaxed">
                <p className="mb-3">
                  This is to certify that{" "}
                  <span className="border-b-2 border-black inline-block min-w-40 h-5 align-bottom px-2 font-semibold">
                    {selectedStudent?.full_name || ""}
                  </span>
                </p>
                <p className="mb-3">
                  Son/Daughter of Mr. and Mrs.{" "}
                  <span className="border-b-2 border-black inline-block w-40 h-4 align-bottom"></span>
                </p>
                <p className="mb-3">
                  has passed one year{" "}
                  <span className="border-b-2 border-black inline-block min-w-32 h-5 align-bottom px-2 font-semibold">
                    {selectedStudent?.course_name || ""}
                  </span>{" "}
                  Course examination held in{" "}
                  <span className="border-b-2 border-black inline-block w-32 h-5 align-bottom px-2">
                    {marksheetData?.examination_date ? new Date(marksheetData.examination_date).getFullYear() : ""}
                  </span>
                </p>
                <p className="mb-3">
                  from{" "}
                  <span className="border-b-2 border-black inline-block w-48 h-5 align-bottom px-2">
                    B.SOFT Computer & Technical Institute
                  </span>
                </p>
                <p className="mb-6">
                  Center Code:{" "}
                  <span className="border-b-2 border-black inline-block w-24 h-5 align-bottom px-2">
                    BSOFT001
                  </span>. His/Her grading in Individual Papers are given below.
                </p>
              </div>

              {/* Grades Awarded Table with Dynamic Data */}
              <div className="mb-8">
                <div className="text-center mb-4">
                  <h3 className="text-blue-700 font-bold text-xl tracking-wider">GRADES AWARDED</h3>
                </div>
                
                <table className="w-full border-2 border-black border-collapse bg-white text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border-2 border-black px-3 py-2 font-bold text-center">Subjects</th>
                      <th className="border-2 border-black px-3 py-2 font-bold text-center">Max.Theory Marks</th>
                      <th className="border-2 border-black px-3 py-2 font-bold text-center">Max.Practical Marks</th>
                      <th className="border-2 border-black px-3 py-2 font-bold text-center">Obtain Theory Marks</th>
                      <th className="border-2 border-black px-3 py-2 font-bold text-center">Obtain Practical Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseSubjects.map((subject, index) => (
                      <tr key={subject.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border-2 border-black px-3 py-2 text-center">{subject.subject}</td>
                        <td className="border-2 border-black px-3 py-2 text-center">{subject.theory_marks}</td>
                        <td className="border-2 border-black px-3 py-2 text-center">{subject.practical_marks}</td>
                        <td className="border-2 border-black px-3 py-2 text-center">
                          {Math.round(parseInt(subject.theory_marks || "0") * 0.75)}
                        </td>
                        <td className="border-2 border-black px-3 py-2 text-center">
                          {Math.round(parseInt(subject.practical_marks || "0") * 0.8)}
                        </td>
                      </tr>
                    ))}
                    
                    <tr className="bg-gray-100">
                      <td className="border-2 border-black px-3 py-2 font-bold text-center">Total</td>
                      <td className="border-2 border-black px-3 py-2 text-center font-bold">
                        {courseSubjects.reduce((sum, s) => sum + parseInt(s.theory_marks || "0"), 0)}
                      </td>
                      <td className="border-2 border-black px-3 py-2 text-center font-bold">
                        {courseSubjects.reduce((sum, s) => sum + parseInt(s.practical_marks || "0"), 0)}
                      </td>
                      <td className="border-2 border-black px-3 py-2 text-center font-bold">
                        {marksheetData?.obtained_marks || 0}
                      </td>
                      <td className="border-2 border-black px-3 py-2 text-center font-bold">
                        {courseSubjects.reduce((sum, s) => sum + Math.round(parseInt(s.practical_marks || "0") * 0.8), 0)}
                      </td>
                    </tr>
                    
                    <tr className="bg-white">
                      <td className="border-2 border-black px-3 py-2 font-bold text-center">Grand Total</td>
                      <td className="border-2 border-black px-3 py-2 text-center font-bold">
                        {marksheetData?.total_marks || 0}
                      </td>
                      <td className="border-2 border-black px-3 py-2 text-center"></td>
                      <td className="border-2 border-black px-3 py-2 text-center font-bold">
                        {marksheetData?.obtained_marks || 0}
                      </td>
                      <td className="border-2 border-black px-3 py-2 text-center"></td>
                    </tr>
                    
                    <tr className="bg-gray-100">
                      <td className="border-2 border-black px-3 py-2 font-bold text-center">Percentage (%)</td>
                      <td className="border-2 border-black px-3 py-2 text-center">
                        <span className="text-red-600 font-bold">{marksheetData?.percentage || 0}%</span>
                      </td>
                      <td className="border-2 border-black px-3 py-2 text-center"></td>
                      <td className="border-2 border-black px-3 py-2 text-center"></td>
                      <td className="border-2 border-black px-3 py-2 text-center"></td>
                    </tr>
                    
                    <tr className="bg-white">
                      <td className="border-2 border-black px-3 py-2 font-bold text-center">Grade</td>
                      <td className="border-2 border-black px-3 py-2 text-center font-bold text-green-600">
                        {marksheetData?.grade || ""}
                      </td>
                      <td className="border-2 border-black px-3 py-2 text-center"></td>
                      <td className="border-2 border-black px-3 py-2 text-center"></td>
                      <td className="border-2 border-black px-3 py-2 text-center"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Legend of Grades and Signature Section */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="font-bold text-sm mb-3">LEGEND OF GRADES</div>
                  <div className="text-sm leading-relaxed">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      <div>S : 85% & Above</div>
                      <div>A : 75%-84%</div>
                      <div>C : 55%-64%</div>
                      <div>D : 50%-54%</div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                      <div>B : 65%-74%</div>
                      <div></div>
                      <div>F : Less than 50% - Fail</div>
                      <div></div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="w-24 h-16 border-2 border-black bg-white ml-auto mb-2 flex items-center justify-center">
                    <div className="text-xs text-gray-500">Digital Signature</div>
                  </div>
                  <div className="font-bold text-sm">Digitally signed by</div>
                  <div className="border-b-2 border-black w-32 h-4 ml-auto mt-1"></div>
                </div>
              </div>

              {/* Footer Section with Dynamic Data */}
              <div className="grid grid-cols-3 gap-8 mb-6">
                <div>
                  <div className="font-bold text-sm mb-2">Issue Date :</div>
                  <div className="border-b-2 border-black w-full h-5 flex items-end">
                    <span className="text-sm pb-1">
                      {marksheetData?.examination_date ? new Date(marksheetData.examination_date).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB')}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-bold text-sm mb-2">Place :</div>
                  <div className="border-b-2 border-black w-full h-5 flex items-end">
                    <span className="text-sm pb-1">Azamgarh</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-sm">SECRETARY/DIRECTOR</div>
                </div>
              </div>

              {/* Verification Link */}
              <div className="text-center text-sm mb-4 leading-tight">
                <span className="font-medium">This Diploma may be Verified at </span>
                <span className="text-blue-700 underline font-medium">www.binasoftedu.org.in</span>
                <span className="font-medium"> using the diploma holder's enrollment number</span>
              </div>

              {/* Head Office Address */}
              <div className="text-center text-sm leading-tight">
                <div className="font-bold">Head Office Address - Near Union Bank Of India Bina Soft Educational & Welfare Society Vill & Post BILARIYAGAN J, AZAMGARH-276121</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentMarksheetContent;