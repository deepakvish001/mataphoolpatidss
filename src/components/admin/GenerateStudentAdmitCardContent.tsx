import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FileDown } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { supabase } from "@/integrations/supabase/client";

type StudentAdmitCard = {
  id: string;
  student_id: string;
  student_name: string;
  mothers_name: string | null;
  fathers_name: string | null;
  course_name: string;
  roll_number: string;
  exam_center_code: string | null;
  exam_center_address: string | null;
  exam_date: string | null;
  batch: string | null;
  reporting_time: string | null;
  gate_closing_time: string | null;
  exam_start_time: string | null;
  exam_duration: string | null;
  student_photo_url: string | null;
  pwd_status: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

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

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      toast({
        title: "Error",
        description: "Please enter a student ID, roll number, or name to search",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('student_admit_cards')
        .select('*')
        .or(`student_id.ilike.%${searchValue}%,roll_number.ilike.%${searchValue}%,student_name.ilike.%${searchValue}%`)
        .eq('status', 'active');

      if (error) {
        throw error;
      }

      setSearchResults(data || []);
      setShowSearchResults(true);
      setLoading(false);

      if (data && data.length > 0) {
        toast({
          title: "Success",
          description: `Found ${data.length} student(s)`,
        });
      } else {
        toast({
          title: "No Results",
          description: "No students found with the given criteria",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('Search error:', error);
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to search students. Please try again.",
        variant: "destructive"
      });
    }
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

  const generateProfessionalPDF = async () => {
    if (!selectedCard) {
      toast({
        title: "Error",
        description: "Please select a student first",
        variant: "destructive"
      });
      return;
    }

    if (!admitCardRef.current) {
      toast({
        title: "Error",
        description: "Admit card template not found",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsGeneratingPDF(true);
      
      // First generate the admit card (simulate generation process)
      setGenerating(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the selected card status locally
      setSelectedCard({
        ...selectedCard,
        status: 'generated'
      });
      setGenerating(false);

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
            onClick={generateProfessionalPDF}
            disabled={!selectedCard || isGeneratingPDF || generating}
            className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 text-white px-6 py-2 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <FileDown className="h-4 w-4" />
            {isGeneratingPDF || generating ? "Generating PDF..." : "Generate Professional PDF"}
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
      <div className="px-6 py-8 max-w-5xl mx-auto">
        <div ref={admitCardRef} className="bg-white p-8 shadow-lg border">
          
          {/* Institute Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              B. Soft Computer & Technical Institute
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              Near Union Bank Of India Bina Soft Educational & Welfare Society Vill & Post BILARIYAGAN J, AZAMGARH-276121
            </p>
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              B. Soft Computer & Technical Institute EXAMINATION
            </h2>
            <h3 className="text-base font-bold text-gray-800 mb-6">
              CANDIDATE ADMIT CARD
            </h3>
          </div>

          {/* Candidate Information Table */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3 text-center">
              Name of the Candidate ( AS FILLED BY THE CANDIDATE IN OEAF)
            </p>
            
            <div className="flex gap-4">
              {/* Left side - Form fields */}
              <div className="flex-1">
                <table className="w-full border-2 border-gray-800">
                  <tbody>
                    <tr>
                      <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm w-1/3">
                        ROLL NO
                      </td>
                      <td className="border border-gray-800 px-3 py-3 text-sm">
                        {selectedCard?.roll_number || ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                        NAME
                      </td>
                      <td className="border border-gray-800 px-3 py-3 text-sm">
                        {selectedCard?.student_name || ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                        MOTHER'S NAME
                      </td>
                      <td className="border border-gray-800 px-3 py-3 text-sm">
                        {selectedCard?.mothers_name || ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                        FATHER'S NAME
                      </td>
                      <td className="border border-gray-800 px-3 py-3 text-sm">
                        {selectedCard?.fathers_name || ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                        EXAM CENTER CODE
                      </td>
                      <td className="border border-gray-800 px-3 py-3 text-sm">
                        {selectedCard?.exam_center_code || ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                        PWD :
                      </td>
                      <td className="border border-gray-800 px-3 py-3 text-sm">
                        {selectedCard?.pwd_status || ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Right side - Photo placeholder */}
              <div className="w-32">
                <div className="border-2 border-gray-800 h-40 bg-gray-50 flex items-center justify-center">
                  {selectedCard?.student_photo_url ? (
                    <img 
                      src={selectedCard.student_photo_url} 
                      alt="Student" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-4 h-4 border border-gray-400"></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Valid For Section */}
          <div className="text-center mb-6">
            <div className="border-2 border-gray-800 py-2 bg-gray-100">
              <p className="font-medium text-sm">
                VALID FOR ( Every Month Exam Cycle ) EXAMINATION ONLY
              </p>
            </div>
          </div>

          {/* Batch Schedule */}
          <div className="mb-6">
            <div className="border-2 border-gray-800 bg-gray-100 text-center py-2 mb-0">
              <h4 className="font-bold text-sm">BATCH SCHEDULE</h4>
            </div>
            
            <table className="w-full border-2 border-gray-800 border-t-0">
              <tbody>
                <tr>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm w-1/2">
                    EXAM CENTRE CODE:
                  </td>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                    EXAM DATE :
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-3 text-sm">
                    {selectedCard?.exam_center_code || ""}
                  </td>
                  <td className="border border-gray-800 px-3 py-3 text-sm">
                    {selectedCard?.exam_date || ""}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                    EXAM CENTRE ADDRESS:
                  </td>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                    BATCH :
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-3 text-sm">
                    {selectedCard?.exam_center_address || ""}
                  </td>
                  <td className="border border-gray-800 px-3 py-3 text-sm">
                    {selectedCard?.batch || ""}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm" colSpan={2}>
                    REPORTING TIME :
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-3 text-sm" colSpan={2}>
                    {selectedCard?.reporting_time || ""}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm" colSpan={2}>
                    GATE CLOSING TIME :
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-4 text-sm" colSpan={2}>
                    {selectedCard?.gate_closing_time || ""} - No candidate will be allowed to enter the examination center after the gate closing time.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm" colSpan={2}>
                    EXAM START TIME:
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-3 text-sm" colSpan={2}>
                    {selectedCard?.exam_start_time || ""}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm" colSpan={2}>
                    EXAM DURATION :
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-3 text-sm" colSpan={2}>
                    {selectedCard?.exam_duration || ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Instructions Footer */}
          <div className="text-center">
            <div className="border-2 border-gray-800 py-3 bg-gray-100">
              <p className="font-bold text-sm">
                INSTRUCTIONS TO BE FOLLOWED BY CANDIDATES AT B. Soft Computer & Technical Institute EXAMINATION
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateStudentAdmitCardContent;