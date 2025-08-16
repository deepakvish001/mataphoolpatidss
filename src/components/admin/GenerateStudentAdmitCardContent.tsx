import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FileDown } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { supabase } from "@/integrations/supabase/client";

// Mock data for student admit cards (using mock data since table types aren't available)
const mockStudentData = [
  {
    id: "1",
    student_id: "STU001",
    student_name: "GUPTESHWAR SINGH",
    mothers_name: "SHASHI PRABHA SINGH",
    fathers_name: "RAVINDRA SINGH",
    course_name: "ADCA",
    roll_number: "20040",
    exam_center_code: "EC001",
    exam_center_address: "B. Soft Computer Institute, Azamgarh",
    exam_date: "2024-03-15",
    batch: "Morning",
    reporting_time: "09:00 AM",
    gate_closing_time: "09:30 AM",
    exam_start_time: "10:00 AM",
    exam_duration: "2 Hours",
    student_photo_url: "/lovable-uploads/393bdd79-f1d0-430f-8c0d-c10eb0d72005.png",
    pwd_status: "No",
    status: "active"
  },
  {
    id: "2",
    student_id: "STU002",
    student_name: "CHOTE LAL KUMAR",
    mothers_name: "DHARMI DEVI",
    fathers_name: "VIJAY PRASAD",
    course_name: "DCA",
    roll_number: "20043",
    exam_center_code: "EC002",
    exam_center_address: "Jiyanpur Center",
    exam_date: "2024-03-15",
    batch: "Morning",
    reporting_time: "10:00 AM",
    gate_closing_time: "10:30 AM",
    exam_start_time: "11:00 AM",
    exam_duration: "90 Minutes",
    student_photo_url: "/lovable-uploads/393bdd79-f1d0-430f-8c0d-c10eb0d72005.png",
    pwd_status: "No",
    status: "active"
  },
  {
    id: "3",
    student_id: "STU003",
    student_name: "RAJESH KUMAR",
    mothers_name: "SUNITA DEVI",
    fathers_name: "RAM PRASAD",
    course_name: "PGDCA",
    roll_number: "20045",
    exam_center_code: "EC003",
    exam_center_address: "Main Center, Azamgarh",
    exam_date: "2024-03-16",
    batch: "Evening",
    reporting_time: "02:00 PM",
    gate_closing_time: "02:30 PM",
    exam_start_time: "03:00 PM",
    exam_duration: "3 Hours",
    student_photo_url: "/lovable-uploads/393bdd79-f1d0-430f-8c0d-c10eb0d72005.png",
    pwd_status: "No",
    status: "active"
  }
];

type StudentAdmitCard = typeof mockStudentData[0];

const GenerateStudentAdmitCardContent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCard, setSelectedCard] = useState<StudentAdmitCard | null>(null);
  const [searchResults, setSearchResults] = useState<StudentAdmitCard[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const admitCardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchValue.trim()) {
      toast({
        title: "Error",
        description: "Please enter a student ID, roll number, or name to search",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = mockStudentData.filter(student => 
        student.student_id.toLowerCase().includes(searchValue.toLowerCase()) ||
        student.roll_number.toLowerCase().includes(searchValue.toLowerCase()) ||
        student.student_name.toLowerCase().includes(searchValue.toLowerCase())
      );

      setSearchResults(results);
      setShowSearchResults(true);
      setLoading(false);

      if (results.length > 0) {
        toast({
          title: "Success",
          description: `Found ${results.length} student(s)`,
        });
      } else {
        toast({
          title: "No Results",
          description: "No students found with the given criteria",
          variant: "destructive"
        });
      }
    }, 500);
  };

  const handleSelectStudent = (card: StudentAdmitCard) => {
    setSelectedCard(card);
    setShowSearchResults(false);
    toast({
      title: "Student Selected",
      description: `Selected ${card.student_name} for admit card generation`,
    });
  };

  const handleGenerateAdmitCard = () => {
    if (!selectedCard) {
      toast({
        title: "Error",
        description: "Please search and select a student first",
        variant: "destructive"
      });
      return;
    }

    setGenerating(true);
    
    // Simulate generation process
    setTimeout(() => {
      toast({
        title: "Success",
        description: `Admit card generated successfully for ${selectedCard.student_name}`,
      });

      // Update the selected card status locally
      setSelectedCard({
        ...selectedCard,
        status: 'generated'
      });
      
      setGenerating(false);
    }, 1000);
  };

  const handlePrintAdmitCard = () => {
    if (!selectedCard) {
      toast({
        title: "Error",
        description: "Please generate an admit card first",
        variant: "destructive"
      });
      return;
    }
    window.print();
  };

  const generatePDF = async () => {
    if (!admitCardRef.current) {
      toast({
        title: "Error",
        description: "Admit card template not found",
        variant: "destructive"
      });
      return;
    }

    if (!selectedCard) {
      toast({
        title: "Error",
        description: "Please select a student first",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsGeneratingPDF(true);
      toast({
        title: "Generating PDF",
        description: "Creating Professional Admit Card PDF...",
      });

      // Ensure layout and webfonts are fully ready
      if ((document as any).fonts?.ready) {
        await (document as any).fonts.ready;
      }
      await new Promise((resolve) => setTimeout(resolve, 400));

      const element = admitCardRef.current;

      // High-DPI capture for crisp text
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

      const pdf = new jsPDF({ 
        orientation: 'portrait', 
        unit: 'mm', 
        format: 'a4', 
        compress: true 
      });
      
      const pdfWidth = 210;
      const pdfHeight = 297;
      const margin = 10;
      const usableWidthMm = pdfWidth - margin * 2;
      const usableHeightMm = pdfHeight - margin * 2;

      // Calculate how to fit the content
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const aspectRatio = canvas.height / canvas.width;
      const heightMm = usableWidthMm * aspectRatio;

      if (heightMm <= usableHeightMm) {
        // Fits on one page
        pdf.addImage(imgData, 'JPEG', margin, margin, usableWidthMm, heightMm, undefined, 'FAST');
      } else {
        // Multi-page handling
        const pageHeightPx = Math.round((canvas.width * usableHeightMm) / usableWidthMm);
        let currentY = 0;
        let pageNumber = 1;

        while (currentY < canvas.height) {
          if (pageNumber > 1) pdf.addPage();
          
          const sliceHeight = Math.min(pageHeightPx, canvas.height - currentY);
          
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = canvas.width;
          pageCanvas.height = sliceHeight;
          const ctx = pageCanvas.getContext('2d');
          if (!ctx) throw new Error('2D context not available');

          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          ctx.drawImage(canvas, 0, currentY, canvas.width, sliceHeight, 0, 0, pageCanvas.width, pageCanvas.height);

          const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.95);
          const pageHeightMm = (sliceHeight / canvas.width) * usableWidthMm;
          pdf.addImage(pageImgData, 'JPEG', margin, margin, usableWidthMm, pageHeightMm, undefined, 'FAST');

          // Add page number
          pdf.setTextColor(120, 120, 120);
          pdf.setFontSize(8);
          pdf.text(`Page ${pageNumber}`, pdfWidth - 15, pdfHeight - 5, { align: 'right' });

          currentY += sliceHeight;
          pageNumber++;
        }
      }

      const currentDate = new Date().toISOString().split('T')[0];
      const sanitizedName = selectedCard.student_name?.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '_') || 'Student';
      const fileName = `${sanitizedName}_AdmitCard_${currentDate}.pdf`;
      pdf.save(fileName);

      toast({
        title: "Success",
        description: "Professional Admit Card PDF generated successfully!",
      });
    } catch (error: any) {
      console.error('PDF generation error:', error);
      toast({
        title: "Error",
        description: `Failed to generate PDF: ${error?.message || 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="w-full max-w-none bg-gray-50 min-h-screen">
      {/* Header Navigation */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <a href="/admin" className="text-blue-600 hover:text-blue-800 font-medium">
            Home
          </a>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Search Student</span>
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-60 h-8 border border-gray-300"
              placeholder="Enter Student ID, Roll Number, or Name"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 text-sm"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleGenerateAdmitCard}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2"
            disabled={!selectedCard || generating}
          >
            {generating ? "Generating..." : "Generate Admit Card"}
          </Button>
          <Button 
            onClick={generatePDF}
            disabled={!selectedCard || isGeneratingPDF}
            className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 text-white px-6 py-2 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <FileDown className="h-4 w-4" />
            {isGeneratingPDF ? "Generating PDF..." : "Generate Professional PDF"}
          </Button>
          <Button 
            onClick={handlePrintAdmitCard}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
            disabled={!selectedCard}
          >
            Print Admit Card
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {showSearchResults && searchResults.length > 0 && (
        <div className="px-6 py-4 bg-white border-b">
          <h3 className="text-lg font-semibold mb-3">Search Results:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((student) => (
              <Card key={student.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {student.student_name}</p>
                    <p><strong>Roll No:</strong> {student.roll_number}</p>
                    <p><strong>Course:</strong> {student.course_name}</p>
                    <p><strong>Student ID:</strong> {student.student_id}</p>
                    <Button 
                      onClick={() => handleSelectStudent(student)}
                      className="w-full mt-2"
                      size="sm"
                    >
                      Select Student
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-6 py-8 max-w-4xl mx-auto">
        <div ref={admitCardRef} className="bg-white shadow-2xl rounded-lg overflow-hidden border-2 border-blue-200">
          
          {/* Professional Header with Blue Gradient */}
          <div className="bg-gradient-to-r from-blue-800 via-blue-700 to-blue-600 text-white p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">
                B. Soft Computer & Technical Institute
              </h1>
              <p className="text-blue-100 text-sm mb-4 max-w-2xl mx-auto">
                Near Union Bank Of India Bina Soft Educational & Welfare Society 
                <br />Vill & Post BILARIYAGAN J, AZAMGARH-276121
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg py-3 px-6 inline-block">
                <h2 className="text-xl font-bold mb-1">EXAMINATION</h2>
                <h3 className="text-lg font-semibold">CANDIDATE ADMIT CARD</h3>
              </div>
            </div>
          </div>

          {/* Student Information Section */}
          <div className="p-6">
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h4 className="text-center text-sm font-semibold text-blue-800 mb-4">
                CANDIDATE INFORMATION
              </h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Student Details */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
                      <label className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Roll Number</label>
                      <p className="text-lg font-bold text-gray-800 mt-1">{selectedCard?.roll_number || "N/A"}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
                      <label className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Course</label>
                      <p className="text-lg font-bold text-gray-800 mt-1">{selectedCard?.course_name || "N/A"}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
                    <label className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Student Name</label>
                    <p className="text-xl font-bold text-gray-800 mt-1">{selectedCard?.student_name || "N/A"}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
                      <label className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Father's Name</label>
                      <p className="text-sm font-medium text-gray-800 mt-1">{selectedCard?.fathers_name || "N/A"}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-200">
                      <label className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Mother's Name</label>
                      <p className="text-sm font-medium text-gray-800 mt-1">{selectedCard?.mothers_name || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Photo Section */}
                <div className="flex justify-center lg:justify-end">
                  <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-blue-300">
                    <div className="w-32 h-40 bg-gray-100 rounded-lg overflow-hidden border-2 border-blue-200">
                      {selectedCard?.student_photo_url ? (
                        <img 
                          src={selectedCard.student_photo_url} 
                          alt="Student Photo" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <div className="text-center">
                            <div className="w-8 h-8 border-2 border-gray-300 rounded mx-auto mb-2"></div>
                            <p className="text-xs">Photo</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-center text-blue-700 font-semibold mt-2">Student Photo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Exam Information */}
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <h4 className="text-center text-sm font-semibold text-green-800 mb-4">
                EXAMINATION DETAILS
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
                  <label className="text-xs font-semibold text-green-700 uppercase tracking-wide">Exam Center Code</label>
                  <p className="text-lg font-bold text-gray-800 mt-1">{selectedCard?.exam_center_code || "N/A"}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
                  <label className="text-xs font-semibold text-green-700 uppercase tracking-wide">Exam Date</label>
                  <p className="text-lg font-bold text-gray-800 mt-1">{selectedCard?.exam_date || "N/A"}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200 mb-4">
                <label className="text-xs font-semibold text-green-700 uppercase tracking-wide">Exam Center Address</label>
                <p className="text-sm font-medium text-gray-800 mt-1">{selectedCard?.exam_center_address || "N/A"}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
                  <label className="text-xs font-semibold text-green-700 uppercase tracking-wide">Reporting Time</label>
                  <p className="text-sm font-bold text-gray-800 mt-1">{selectedCard?.reporting_time || "N/A"}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
                  <label className="text-xs font-semibold text-green-700 uppercase tracking-wide">Exam Start Time</label>
                  <p className="text-sm font-bold text-gray-800 mt-1">{selectedCard?.exam_start_time || "N/A"}</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-green-200">
                  <label className="text-xs font-semibold text-green-700 uppercase tracking-wide">Duration</label>
                  <p className="text-sm font-bold text-gray-800 mt-1">{selectedCard?.exam_duration || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Important Notice
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>Gate closing time: <strong>{selectedCard?.gate_closing_time || "N/A"}</strong></p>
                    <p className="mt-1">No candidate will be allowed to enter the examination center after the gate closing time.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="text-center text-sm font-semibold text-gray-800 mb-3">
                EXAMINATION INSTRUCTIONS
              </h4>
              <div className="text-xs text-gray-600 space-y-2">
                <p>• Bring this admit card along with a valid photo ID to the examination center</p>
                <p>• Report to the examination center at the specified reporting time</p>
                <p>• Follow all COVID-19 safety protocols as applicable</p>
                <p>• Electronic devices are strictly prohibited in the examination hall</p>
                <p>• This admit card is valid only for the mentioned examination date and center</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-blue-800 text-white p-4 text-center">
            <p className="text-sm font-semibold">
              B. Soft Computer & Technical Institute - Examination Department
            </p>
            <p className="text-xs text-blue-200 mt-1">
              For any queries, contact the examination department
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateStudentAdmitCardContent;