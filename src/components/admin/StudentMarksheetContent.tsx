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
  const [searchValue, setSearchValue] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [marksheetData, setMarksheetData] = useState<MarksheetData | null>(null);
  const [courseSubjects, setCourseSubjects] = useState<CourseSubject[]>([]);
  const [searchResults, setSearchResults] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const marksheetRef = useRef<HTMLDivElement>(null);

  // Real-time search functionality
  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (searchValue.trim() && searchValue.length > 2) {
        performRealTimeSearch();
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchValue]);

  const performRealTimeSearch = async () => {
    try {
      const { data: students, error } = await supabase
        .from('student_profiles')
        .select('*')
        .or(`full_name.ilike.%${searchValue}%,email.ilike.%${searchValue}%`)
        .limit(5);

      if (error) throw error;
      setSearchResults(students || []);
      setShowResults(students && students.length > 0);
    } catch (error) {
      console.error('Real-time search error:', error);
    }
  };

  const selectStudent = async (student: StudentData) => {
    setSelectedStudent(student);
    setShowResults(false);
    setSearchValue(student.full_name);

    // Auto-fill marksheet data
    try {
      const { data: marksheet } = await supabase
        .from('marksheet_management')
        .select('*')
        .eq('student_name', student.full_name)
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

    try {
      toast.info("Generating Professional Certificate PDF...");
      
      const canvas = await html2canvas(marksheetRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: marksheetRef.current.scrollWidth,
        height: marksheetRef.current.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;
      
      const imgX = (pdfWidth - finalWidth) / 2;
      const imgY = (pdfHeight - finalHeight) / 2;

      pdf.addImage(imgData, 'PNG', imgX, imgY, finalWidth, finalHeight);
      
      const fileName = `${selectedStudent?.full_name?.replace(/\s+/g, '_')}_Certificate_${new Date().getFullYear()}.pdf`;
      pdf.save(fileName);
      
      toast.success("Certificate PDF generated successfully!");
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Failed to generate PDF");
    }
  };

  // Sample subjects for demo
  const sampleSubjects = [
    { subject: "Fundamentals", theory_max: "50", practical_max: "50", theory_obtained: "39", practical_obtained: "41" },
    { subject: "Windows 10", theory_max: "50", practical_max: "50", theory_obtained: "38", practical_obtained: "43" },
    { subject: "MS Office", theory_max: "50", practical_max: "50", theory_obtained: "40", practical_obtained: "42" },
    { subject: "Accounting Tally", theory_max: "50", practical_max: "50", theory_obtained: "41", practical_obtained: "40" },
    { subject: "Photoshop", theory_max: "50", practical_max: "50", theory_obtained: "40", practical_obtained: "43" },
    { subject: "Corel Draw", theory_max: "50", practical_max: "50", theory_obtained: "45", practical_obtained: "38" },
    { subject: "Page Maker", theory_max: "50", practical_max: "50", theory_obtained: "40", practical_obtained: "35" },
    { subject: "HTML", theory_max: "50", practical_max: "50", theory_obtained: "43", practical_obtained: "39" },
    { subject: "Visual Basic", theory_max: "50", practical_max: "50", theory_obtained: "40", practical_obtained: "38" },
    { subject: "C & C++", theory_max: "50", practical_max: "50", theory_obtained: "37", practical_obtained: "44" },
    { subject: "Internet", theory_max: "50", practical_max: "50", theory_obtained: "44", practical_obtained: "40" },
  ];

  const displaySubjects = courseSubjects.length > 0 ? courseSubjects : sampleSubjects;
  
  return (
    <div className="w-full max-w-none bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      {/* Search Header */}
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
                <div className="relative">
                  <Input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-60 h-10 border border-orange-300 focus:border-orange-500 focus:ring-orange-500/20"
                    placeholder="Type student name or email..."
                  />
                  
                  {/* Real-time Search Results */}
                  {showResults && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1">
                      {searchResults.map((student) => (
                        <div
                          key={student.id}
                          onClick={() => selectStudent(student)}
                          className="p-3 hover:bg-orange-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-medium text-gray-900">{student.full_name}</div>
                          <div className="text-sm text-gray-500">
                            {student.email} • {student.course_name || 'No course'}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button 
                onClick={generatePDF}
                disabled={!selectedStudent}
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white px-6 py-2 flex items-center gap-2"
              >
                <FileDown className="h-4 w-4" />
                Generate Certificate PDF
              </Button>
            </div>
          </div>

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
            <div ref={marksheetRef} className="bg-white p-8 min-h-[1000px]" style={{ width: '210mm' }}>
              
              {/* Header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">16/08/2025, 01:21</div>
                  <div className="text-sm text-gray-600">about: blank</div>
                </div>

                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center border-4 border-white shadow-lg">
                    <div className="text-white font-bold text-lg">B.SOFT</div>
                  </div>
                </div>

                {/* Enrollment and Sl. No. */}
                <div className="flex justify-between items-start mb-6">
                  <div className="text-left">
                    <div className="font-bold text-gray-800">Enroll. Number</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-800">Sl. No.</div>
                    <div className="font-bold text-blue-800">BSOFT{marksheetData?.id?.substring(0, 6) || "302369"}</div>
                  </div>
                </div>

                {/* Institution Name */}
                <h1 className="text-4xl font-bold text-blue-800 mb-2">
                  B.SOFT COMPUTER & TECHNICAL INSTITUTE
                </h1>
                
                {/* Registration Details */}
                <div className="text-sm text-gray-700 mb-2">
                  <div>Registered NGO DARPAN ID AAYOG-Regd. No. <span className="text-red-600 font-bold">UP/2011/0044943</span></div>
                  <div>Regd. with.: Society Regd. No.: <span className="text-red-600 font-bold">AZ-13610</span></div>
                  <div>ISO 9001:2015 CERTIFIED No.: <span className="text-red-600 font-bold">UQ-252016790</span></div>
                </div>

                {/* Award Line */}
                <div className="text-pink-600 font-medium text-lg mb-4">
                  (Awarded Under the Management)
                </div>

                {/* Course Title */}
                <div className="text-2xl font-bold text-cyan-600 underline mb-6">
                  {selectedStudent?.course_name || "Advanced Diploma In Computer Application(ADCA)"}
                </div>

                {/* Certificate Title */}
                <h2 className="text-3xl font-bold text-red-600 mb-6">
                  CERTIFICATE-CUM-MARKS SHEET
                </h2>
              </div>

              {/* Main Content with Photo */}
              <div className="grid grid-cols-12 gap-6 mb-6">
                <div className="col-span-8">
                  {/* Certificate Text */}
                  <div className="text-base leading-relaxed space-y-2">
                    <p>This is to certify that according to organization <span className="border-b border-gray-400 px-8">_________________</span></p>
                    <p>Son/Daughter of Mr. and Mrs. <span className="border-b border-gray-400 px-8">_________________</span></p>
                    <p className="mt-3">
                      has passed one year <span className="font-bold underline">
                      {selectedStudent?.course_name || "Advanced Diploma In Computer Application(ADCA)"}
                      </span> Course examination held in
                    </p>
                    <p>from <span className="border-b border-gray-400 px-8">_________________</span></p>
                    <p className="mt-3">Center Code: <span className="border-b border-gray-400 px-4">__</span>.His/Her grading in Individual Papers are given below.</p>
                  </div>
                </div>
                
                {/* Student Photo */}
                <div className="col-span-4 flex justify-center">
                  <div className="w-32 h-40 border-2 border-gray-400 bg-gray-100 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <User className="h-12 w-12 mx-auto mb-2" />
                      <div className="text-xs">Student Photo</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grades Table */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-center text-blue-800 mb-4">GRADES AWARDED</h3>
                
                <table className="w-full border-collapse border border-gray-400">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-400 p-2 text-sm font-bold">Subjects</th>
                      <th className="border border-gray-400 p-2 text-sm font-bold">Max.Theory Marks</th>
                      <th className="border border-gray-400 p-2 text-sm font-bold">Max.Practical Marks</th>
                      <th className="border border-gray-400 p-2 text-sm font-bold">Obtain Theory Marks</th>
                      <th className="border border-gray-400 p-2 text-sm font-bold">Obtain Practical Marks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displaySubjects.map((subject, index) => (
                      <tr key={index} className="even:bg-gray-50">
                        <td className="border border-gray-400 p-2 text-sm">
                          {typeof subject === 'object' && 'subject' in subject ? subject.subject : subject.subject}
                        </td>
                        <td className="border border-gray-400 p-2 text-sm text-center">
                          {typeof subject === 'object' && 'theory_marks' in subject ? subject.theory_marks : subject.theory_max}
                        </td>
                        <td className="border border-gray-400 p-2 text-sm text-center">
                          {typeof subject === 'object' && 'practical_marks' in subject ? subject.practical_marks : subject.practical_max}
                        </td>
                        <td className="border border-gray-400 p-2 text-sm text-center">
                          {subject.theory_obtained || Math.floor(Math.random() * 10) + 35}
                        </td>
                        <td className="border border-gray-400 p-2 text-sm text-center">
                          {subject.practical_obtained || Math.floor(Math.random() * 10) + 35}
                        </td>
                      </tr>
                    ))}
                    
                    {/* Total Row */}
                    <tr className="bg-gray-100 font-bold">
                      <td className="border border-gray-400 p-2 text-sm text-center">Total</td>
                      <td className="border border-gray-400 p-2 text-sm text-center">1050</td>
                      <td className="border border-gray-400 p-2 text-sm text-center">1050</td>
                      <td className="border border-gray-400 p-2 text-sm text-center">
                        {marksheetData?.obtained_marks || "866"}
                      </td>
                      <td className="border border-gray-400 p-2 text-sm text-center">821</td>
                    </tr>
                    
                    {/* Grand Total */}
                    <tr className="bg-gray-200 font-bold">
                      <td className="border border-gray-400 p-2 text-sm text-center">Grand Total</td>
                      <td className="border border-gray-400 p-2 text-sm text-center" colSpan={2}>2100</td>
                      <td className="border border-gray-400 p-2 text-sm text-center" colSpan={2}>
                        {marksheetData?.total_marks || "1687"}
                      </td>
                    </tr>
                    
                    {/* Percentage */}
                    <tr className="bg-gray-100">
                      <td className="border border-gray-400 p-2 text-sm text-center font-bold">Percentage (%)</td>
                      <td className="border border-gray-400 p-2 text-sm text-center text-red-600 font-bold" colSpan={4}>
                        {marksheetData?.percentage || "80.33"} %
                      </td>
                    </tr>
                    
                    {/* Grade */}
                    <tr className="bg-gray-100">
                      <td className="border border-gray-400 p-2 text-sm text-center font-bold">Grade</td>
                      <td className="border border-gray-400 p-2 text-sm text-center text-red-600 font-bold" colSpan={4}>
                        {marksheetData?.grade || "A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Legend of Grades */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-800 mb-2">LEGEND OF GRADES</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>S : 85% & Above</div>
                  <div>A : 75%-84%</div>
                  <div>B : 65%-74%</div>
                  <div>C : 55%-64%</div>
                  <div>D : 50%-54%</div>
                  <div>F : Less than 50% - Fail</div>
                </div>
              </div>

              {/* Footer */}
              <div className="grid grid-cols-3 gap-8 items-end">
                <div className="text-center">
                  <div className="border-t border-gray-400 pt-2 mt-8">
                    <div className="text-sm font-medium">Digitally signed by</div>
                    <div className="text-lg font-bold">SECRETARY/DIRECTOR</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 mx-auto mb-2 flex items-center justify-center">
                    <div className="text-xs text-gray-500">QR Code</div>
                  </div>
                  <div className="text-sm">
                    <div>Issue Date : {marksheetData?.examination_date || "10/01/2019"}</div>
                    <div>Place : Jiyanpur</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="border-t border-gray-400 pt-2 mt-8">
                    <div className="text-sm font-medium">SECRETARY/DIRECTOR</div>
                  </div>
                </div>
              </div>

              {/* Verification Note */}
              <div className="text-center text-xs text-gray-600 mt-6">
                <p>This Diploma may be Verified at <span className="text-blue-600">www.binsoftedu.org.in</span> using the diploma holder's enrollment number</p>
                <p className="mt-2">Head Office Address - Near Union Bank Of India Bina Soft Educational & Welfare Society Vill & Post BILARIYAGANJ, AZAMGARH-276121</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentMarksheetContent;