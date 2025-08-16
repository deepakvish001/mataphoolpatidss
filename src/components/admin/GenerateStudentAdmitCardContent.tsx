import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FileDown } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { supabase } from "@/integrations/supabase/client";
import indiaEmblem from "@/assets/india-emblem.png";
import nabardLogo from "@/assets/nabard-logo.png";

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
      const imgData = canvas.toDataURL('image/png');
      const aspectRatio = canvas.height / canvas.width;
      const heightMm = usableWidthMm * aspectRatio;

      if (heightMm <= usableHeightMm) {
        // Fits on one page
        pdf.addImage(imgData, 'PNG', margin, margin, usableWidthMm, heightMm, undefined, 'FAST');
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

          const pageImgData = pageCanvas.toDataURL('image/png');
          const pageHeightMm = (sliceHeight / canvas.width) * usableWidthMm;
          pdf.addImage(pageImgData, 'PNG', margin, margin, usableWidthMm, pageHeightMm, undefined, 'FAST');

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
        {/* Preview panel (screen) */}
        {selectedCard && (
          <div className="mb-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
            <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center space-x-2">
              <FileDown className="h-5 w-5 text-primary" />
              <span>Selected Student Information</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Name:</span>
                <p className="text-foreground">{selectedCard.student_name}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Roll No:</span>
                <p className="text-foreground">{selectedCard.roll_number}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Course:</span>
                <p className="text-foreground">{selectedCard.course_name}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Center:</span>
                <p className="text-foreground">{selectedCard.exam_center_code}</p>
              </div>
            </div>
          </div>
        )}

        {/* A4 Admit Card Canvas (captured to PDF) */}
        <div
          ref={admitCardRef}
          className="relative mx-auto bg-background w-[794px] min-h-[1123px] p-10 border-[12px] border-primary/20 rounded-md shadow-elegant"
        >
          {/* Inner decorative frame */}
          <div className="absolute inset-4 border-2 border-border/60 rounded-md pointer-events-none" />
          <div className="absolute inset-6 border border-border/30 rounded-sm pointer-events-none" />

          {/* Watermark */}
          <img
            src={nabardLogo}
            alt="Institute watermark logo"
            className="absolute inset-0 m-auto opacity-5 w-[420px] h-[420px] object-contain pointer-events-none"
          />

          {/* Header */}
          <div className="relative flex items-start justify-between mb-6">
            <img src={indiaEmblem} alt="National emblem" className="h-16 w-auto opacity-90" />
            <div className="text-center flex-1 px-4">
              <h1 className="text-2xl font-extrabold text-foreground">B SOFT Computer & Technical Institute</h1>
              <p className="text-sm text-muted-foreground">
                Near Union Bank Of India Bina Soft Educational & Welfare Society Vill & Post BILARIYAGAN J, AZAMGARH-276121
              </p>
              <p className="text-xs text-muted-foreground">Email: infobinasoft@gmail.com</p>
            </div>
            <div className="h-24 w-20 border-2 border-border/60 rounded-sm overflow-hidden bg-muted/20">
              {selectedCard?.student_photo_url ? (
                <img
                  src={selectedCard.student_photo_url}
                  alt={`${selectedCard.student_name} photo`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-[10px] text-muted-foreground">Photo</div>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold tracking-wide text-primary uppercase">Examination Admit Card</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Valid for the examination schedule mentioned below only
            </p>
          </div>

          {/* Student Details Section */}
          <div className="mb-6">
            <div className="bg-primary/10 text-center py-2 mb-4 border border-primary/20 rounded">
              <h3 className="font-bold text-sm text-primary">CANDIDATE INFORMATION</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <div>
                <p className="text-[11px] text-muted-foreground font-medium">Roll Number</p>
                <p className="border-b border-border/60 py-2 font-semibold">{selectedCard?.roll_number || "-"}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-medium">Student Name</p>
                <p className="border-b border-border/60 py-2 font-semibold">{selectedCard?.student_name || "-"}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-medium">Father's Name</p>
                <p className="border-b border-border/60 py-2">{selectedCard?.fathers_name || "-"}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-medium">Mother's Name</p>
                <p className="border-b border-border/60 py-2">{selectedCard?.mothers_name || "-"}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-medium">Course</p>
                <p className="border-b border-border/60 py-2">{selectedCard?.course_name || "-"}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-medium">PWD Status</p>
                <p className="border-b border-border/60 py-2">{selectedCard?.pwd_status || "No"}</p>
              </div>
            </div>
          </div>

          {/* Examination Details */}
          <div className="mb-6">
            <div className="bg-secondary/10 text-center py-2 mb-4 border border-secondary/20 rounded">
              <h3 className="font-bold text-sm text-secondary-foreground">EXAMINATION SCHEDULE</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <div>
                <p className="text-[11px] text-muted-foreground font-medium">Exam Center Code</p>
                <p className="border-b border-border/60 py-2">{selectedCard?.exam_center_code || "-"}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-medium">Exam Date</p>
                <p className="border-b border-border/60 py-2">{selectedCard?.exam_date || "-"}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-medium">Reporting Time</p>
                <p className="border-b border-border/60 py-2">{selectedCard?.reporting_time || "-"}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-medium">Gate Closing Time</p>
                <p className="border-b border-border/60 py-2">{selectedCard?.gate_closing_time || "-"}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-medium">Exam Start Time</p>
                <p className="border-b border-border/60 py-2">{selectedCard?.exam_start_time || "-"}</p>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground font-medium">Exam Duration</p>
                <p className="border-b border-border/60 py-2">{selectedCard?.exam_duration || "-"}</p>
              </div>
            </div>
          </div>

          {/* Center Address */}
          <div className="mb-6">
            <p className="text-[11px] text-muted-foreground font-medium">Examination Center Address</p>
            <div className="border border-border/60 rounded p-3 bg-muted/10 min-h-[60px]">
              <p className="text-sm">{selectedCard?.exam_center_address || "Address will be communicated separately"}</p>
            </div>
          </div>

          {/* Important Instructions */}
          <div className="mb-6">
            <div className="bg-accent/10 text-center py-2 mb-4 border border-accent/20 rounded">
              <h3 className="font-bold text-sm text-accent-foreground">IMPORTANT INSTRUCTIONS</h3>
            </div>
            <div className="text-xs space-y-1 text-muted-foreground">
              <p>• Candidates must carry this admit card to the examination center</p>
              <p>• Report to the examination center at least 30 minutes before the exam start time</p>
              <p>• Carry a valid photo ID proof along with this admit card</p>
              <p>• Electronic devices are strictly prohibited in the examination hall</p>
              <p>• Late entry after gate closing time will not be permitted</p>
            </div>
          </div>

          {/* Verification and Signatures */}
          <div className="mt-8 grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="border-b border-border/60 h-12 mb-2"></div>
              <p className="text-sm font-medium">Candidate Signature</p>
            </div>
            <div className="text-center">
              <div className="border border-border/60 rounded px-3 py-2 font-mono text-center">
                ADMIT-{new Date().getFullYear()}-{(selectedCard?.roll_number || "").toString().replace(/[^A-Z0-9]/gi, "").toUpperCase()}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Verification Code</p>
            </div>
            <div className="text-center">
              <div className="border-b border-border/60 h-12 mb-2"></div>
              <p className="text-sm font-medium">Controller of Examinations</p>
            </div>
          </div>

          <div className="mt-6 text-[10px] text-muted-foreground text-center">
            This admit card is computer generated and does not require a physical signature.
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateStudentAdmitCardContent;