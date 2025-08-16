import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Filter, UserCheck, FileText, Printer, Users, GraduationCap, Calendar, Award, Building, MapPin, Phone, Mail, CreditCard, User, FileDown, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { supabase } from "@/integrations/supabase/client";

type StudentData = {
  id: string;
  student_id: string;
  student_name: string;
  student_father_name: string;
  student_mother_name: string;
  course_name: string;
  center_code: string;
  center_name: string;
  student_photo_url?: string;
  place?: string;
};

const StudentRegPrintContent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);
  const [searchResults, setSearchResults] = useState<StudentData[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const registrationFormRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      toast({
        title: "Error",
        description: "Please enter a student ID or name to search",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      // Search in alot_numbers table for detailed student information
      const { data: alotData, error: alotError } = await supabase
        .from('alot_numbers')
        .select('*')
        .or(`student_id.ilike.%${searchValue}%,student_name.ilike.%${searchValue}%`);

      if (alotError) {
        throw alotError;
      }

      // Transform data to our StudentData type
      const transformedResults: StudentData[] = (alotData || []).map(item => ({
        id: item.id,
        student_id: item.student_id,
        student_name: item.student_name,
        student_father_name: item.student_father_name,
        student_mother_name: item.student_mother_name,
        course_name: item.course_name,
        center_code: item.center_code,
        center_name: item.center_name,
        student_photo_url: item.student_photo_url,
        place: item.place
      }));

      setSearchResults(transformedResults);
      setShowSearchResults(true);
      setLoading(false);

      if (transformedResults.length > 0) {
        toast({
          title: "Success",
          description: `Found ${transformedResults.length} student(s)`,
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

  const handleSelectStudent = (student: StudentData) => {
    setSelectedStudent(student);
    setShowSearchResults(false);
    toast({
      title: "Student Selected",
      description: `Selected ${student.student_name} for registration form`,
    });
  };

  const generateProfessionalPDF = async () => {
    if (!selectedStudent) {
      toast({
        title: "Error",
        description: "Please search and select a student first",
        variant: "destructive"
      });
      return;
    }

    if (!registrationFormRef.current) {
      toast({
        title: "Error",
        description: "Registration form template not found",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsGeneratingPDF(true);
      
      toast({
        title: "Generating PDF",
        description: "Creating high-quality Registration Form PDF...",
      });

      // Ensure layout and webfonts are fully ready
      if ((document as any).fonts?.ready) {
        await (document as any).fonts.ready;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));

      const element = registrationFormRef.current;

      // Temporarily modify styles for better PDF output
      const originalStyle = element.style.cssText;
      element.style.cssText = `
        ${originalStyle}
        background: white !important;
        width: 210mm !important;
        min-height: 297mm !important;
        margin: 0 !important;
        padding: 20mm !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        font-family: 'Times New Roman', serif !important;
        line-height: 1.4 !important;
        color: #000 !important;
      `;

      // High-quality capture with better settings
      const canvas = await html2canvas(element, {
        scale: 4, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 15000,
        scrollX: 0,
        scrollY: 0,
        width: element.scrollWidth,
        height: element.scrollHeight,
        foreignObjectRendering: true,
        removeContainer: true,
      });

      // Restore original styles
      element.style.cssText = originalStyle;

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error('Captured canvas has zero size');
      }

      const pdf = new jsPDF({ 
        orientation: 'portrait', 
        unit: 'mm', 
        format: 'a4', 
        compress: true,
        precision: 16,
        userUnit: 1.0
      });
      
      const pdfWidth = 210;
      const pdfHeight = 297;
      const margin = 0; // No margin for full page
      const usableWidthMm = pdfWidth - margin * 2;
      const usableHeightMm = pdfHeight - margin * 2;

      // Calculate how to fit the content perfectly
      const imgData = canvas.toDataURL('image/png', 1.0); // Use PNG for better quality
      const aspectRatio = canvas.height / canvas.width;
      let heightMm = usableWidthMm * aspectRatio;

      // If content is too tall, scale it down to fit
      if (heightMm > usableHeightMm) {
        const scaleFactor = usableHeightMm / heightMm;
        heightMm = usableHeightMm;
        const widthMm = usableWidthMm * scaleFactor;
        const xOffset = (pdfWidth - widthMm) / 2;
        pdf.addImage(imgData, 'PNG', xOffset, margin, widthMm, heightMm, undefined, 'FAST');
      } else {
        // Center vertically if content is shorter than page
        const yOffset = (pdfHeight - heightMm) / 2;
        pdf.addImage(imgData, 'PNG', margin, yOffset, usableWidthMm, heightMm, undefined, 'FAST');
      }

      // Add metadata
      pdf.setProperties({
        title: `Registration Form - ${selectedStudent.student_name}`,
        subject: 'Student Registration Form',
        author: 'B SOFT Computer & Technical Institute',
        creator: 'Student Management System'
      });

      const currentDate = new Date().toISOString().split('T')[0];
      const sanitizedName = selectedStudent.student_name?.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '_') || 'Student';
      const fileName = `${sanitizedName}_Registration_Form_${currentDate}.pdf`;
      
      pdf.save(fileName);

      toast({
        title: "Success!",
        description: "High-quality Registration Form PDF generated successfully!",
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

  // Mock statistics data
  const stats = {
    totalRegistrations: 1247,
    thisMonth: 89,
    verified: 1198,
    pending: 49
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5 p-6">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <span>Student Registration Print</span>
          </h1>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm font-medium">Total Registrations</p>
                  <p className="text-3xl font-bold">{stats.totalRegistrations}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-accent-foreground/80 text-sm font-medium">This Month</p>
                  <p className="text-3xl font-bold">{stats.thisMonth}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-foreground/80 text-sm font-medium">Verified Students</p>
                  <p className="text-3xl font-bold">{stats.verified}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <UserCheck className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-muted to-muted/80 text-muted-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground/80 text-sm font-medium">Pending Review</p>
                  <p className="text-3xl font-bold text-foreground">{stats.pending}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <Award className="h-6 w-6 text-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Action Controls */}
        <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-6">
                <a href="/admin" className="text-primary hover:text-primary/80 font-medium flex items-center space-x-2 transition-colors">
                  <Building className="h-4 w-4" />
                  <span>Home</span>
                </a>
                <div className="flex items-center space-x-4">
                  <span className="text-foreground font-medium flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Students List</span>
                  </span>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="pl-10 w-64 border-border/40 bg-background focus:border-primary/50 focus:ring-primary/20"
                      placeholder="Enter Student ID or Name"
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  <Button 
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <Button 
                onClick={generateProfessionalPDF}
                disabled={!selectedStudent || isGeneratingPDF}
                className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 text-white px-8 py-3 flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
              >
                {isGeneratingPDF ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating High-Quality PDF...
                  </>
                ) : (
                  <>
                    <FileDown className="h-5 w-5" />
                    Generate Professional PDF
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {showSearchResults && searchResults.length > 0 && (
          <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm mb-8">
            <CardHeader className="bg-gradient-to-r from-accent via-accent/95 to-accent/90 text-accent-foreground p-6">
              <CardTitle className="text-xl font-bold flex items-center space-x-3">
                <div className="p-2 bg-background/20 rounded-lg backdrop-blur-sm">
                  <Users className="h-5 w-5" />
                </div>
                <span>Search Results ({searchResults.length} found)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((student) => (
                  <Card key={student.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-border/40 hover:border-primary/50">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-primary" />
                          <p className="font-semibold text-foreground">{student.student_name}</p>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p><span className="font-medium">ID:</span> {student.student_id}</p>
                          <p><span className="font-medium">Course:</span> {student.course_name}</p>
                          <p><span className="font-medium">Center:</span> {student.center_name}</p>
                        </div>
                        <Button 
                          onClick={() => handleSelectStudent(student)}
                          className="w-full mt-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                          size="sm"
                        >
                          Select Student
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Registration Print Form */}
        <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-primary-foreground p-8">
            <CardTitle className="text-2xl font-bold flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-background/20 rounded-lg backdrop-blur-sm">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <span>B SOFT Computer & Technical Institute</span>
              </div>
              <Badge className="bg-background/20 text-primary-foreground border-background/30">
                Registration Form
              </Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            <div ref={registrationFormRef} className="pdf-container bg-white shadow-2xl border border-gray-200" style={{ 
              width: '210mm', 
              minHeight: '297mm', 
              margin: '0 auto',
              padding: '20mm',
              fontFamily: 'Times New Roman, serif',
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#000000'
            }}>
              {/* Selected Student Info */}
              {selectedStudent && (
                <div className="mb-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center space-x-2">
                    <UserCheck className="h-5 w-5 text-primary" />
                    <span>Selected Student Information</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-muted-foreground">Name:</span>
                      <p className="text-foreground">{selectedStudent.student_name}</p>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">ID:</span>
                      <p className="text-foreground">{selectedStudent.student_id}</p>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Course:</span>
                      <p className="text-foreground">{selectedStudent.course_name}</p>
                    </div>
                    <div>
                      <span className="font-medium text-muted-foreground">Center:</span>
                      <p className="text-foreground">{selectedStudent.center_name}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Institute Header */}
              <div className="flex items-start justify-between mb-12" style={{ pageBreakInside: 'avoid' }}>
                {/* Logo */}
                <div className="flex-shrink-0">
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
                    border: '3px solid #1e40af',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '10px',
                    textAlign: 'center',
                    lineHeight: '1.2'
                  }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 'bold' }}>B SOFT</div>
                      <div style={{ fontSize: '9px' }}>Computer &</div>
                      <div style={{ fontSize: '9px' }}>Technical Institute</div>
                    </div>
                  </div>
                </div>

                {/* Institute Details */}
                <div className="flex-1 text-center px-8">
                  <h1 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#1e40af',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    B SOFT Computer & Technical Institute
                  </h1>
                  <p style={{
                    fontSize: '12px',
                    color: '#374151',
                    lineHeight: '1.4',
                    marginBottom: '8px',
                    maxWidth: '400px',
                    margin: '0 auto'
                  }}>
                    Near Union Bank Of India, Bina Soft Educational & Welfare Society<br />
                    Vill & Post BILARIYAGAN J, AZAMGARH-276121
                  </p>
                </div>

                {/* Contact Info */}
                <div className="flex-shrink-0 text-right">
                  <p style={{
                    fontSize: '12px',
                    color: '#374151',
                    fontWeight: '500'
                  }}>
                    📧 infobinasoft@gmail.com
                  </p>
                </div>
              </div>

              {/* Student Registration Form */}
              <div style={{ 
                borderTop: '2px solid #1e40af', 
                paddingTop: '30px',
                pageBreakInside: 'avoid'
              }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: '30px',
                  textDecoration: 'underline',
                  color: '#1e40af',
                  textTransform: 'uppercase',
                  letterSpacing: '2px'
                }}>
                  Student Registration Form
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px 60px' }}>
                  {/* Left Column */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #d1d5db', paddingBottom: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', width: '140px' }}>Name:</label>
                      <span style={{ fontSize: '14px', color: '#000', borderBottom: '1px dotted #6b7280', flexGrow: 1, paddingLeft: '10px' }}>
                        {selectedStudent?.student_name || ''}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #d1d5db', paddingBottom: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', width: '140px' }}>Course Category:</label>
                      <span style={{ fontSize: '14px', color: '#000', borderBottom: '1px dotted #6b7280', flexGrow: 1, paddingLeft: '10px' }}>
                        {selectedStudent?.course_name || ''}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #d1d5db', paddingBottom: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', width: '140px' }}>Course Name:</label>
                      <span style={{ fontSize: '14px', color: '#000', borderBottom: '1px dotted #6b7280', flexGrow: 1, paddingLeft: '10px' }}>
                        {selectedStudent?.course_name || ''}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #d1d5db', paddingBottom: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', width: '140px' }}>Father's Name:</label>
                      <span style={{ fontSize: '14px', color: '#000', borderBottom: '1px dotted #6b7280', flexGrow: 1, paddingLeft: '10px' }}>
                        {selectedStudent?.student_father_name || ''}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #d1d5db', paddingBottom: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', width: '140px' }}>Mother's Name:</label>
                      <span style={{ fontSize: '14px', color: '#000', borderBottom: '1px dotted #6b7280', flexGrow: 1, paddingLeft: '10px' }}>
                        {selectedStudent?.student_mother_name || ''}
                      </span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #d1d5db', paddingBottom: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', width: '140px' }}>Study Center Code:</label>
                      <span style={{ fontSize: '14px', color: '#000', borderBottom: '1px dotted #6b7280', flexGrow: 1, paddingLeft: '10px' }}>
                        {selectedStudent?.center_code || ''}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #d1d5db', paddingBottom: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', width: '140px' }}>Date of Birth:</label>
                      <span style={{ fontSize: '14px', color: '#000', borderBottom: '1px dotted #6b7280', flexGrow: 1, paddingLeft: '10px' }}>
                        ________________________
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #d1d5db', paddingBottom: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', width: '140px' }}>Mobile No.:</label>
                      <span style={{ fontSize: '14px', color: '#000', borderBottom: '1px dotted #6b7280', flexGrow: 1, paddingLeft: '10px' }}>
                        ________________________
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #d1d5db', paddingBottom: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151', width: '140px' }}>Student ID:</label>
                      <span style={{ fontSize: '14px', color: '#000', borderBottom: '1px dotted #6b7280', flexGrow: 1, paddingLeft: '10px' }}>
                        {selectedStudent?.student_id || ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Signature Section */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '40px', 
                  marginTop: '60px', 
                  paddingTop: '30px', 
                  borderTop: '1px solid #d1d5db',
                  pageBreakInside: 'avoid'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ borderBottom: '1px solid #000', height: '60px', marginBottom: '10px' }}></div>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Student Signature</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ borderBottom: '1px solid #000', height: '60px', marginBottom: '10px' }}></div>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Parent/Guardian Signature</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ borderBottom: '1px solid #000', height: '60px', marginBottom: '10px' }}></div>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Institute Signature</p>
                  </div>
                </div>

                {/* Footer Information */}
                <div style={{ 
                  marginTop: '50px', 
                  paddingTop: '30px', 
                  borderTop: '2px solid #1e40af', 
                  background: '#f8fafc', 
                  padding: '25px', 
                  borderRadius: '8px',
                  pageBreakInside: 'avoid'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e40af', marginBottom: '15px' }}>Document Details:</h4>
                      <div style={{ fontSize: '12px', color: '#4b5563', lineHeight: '1.6' }}>
                        <p>• This is an official registration document</p>
                        <p>• Valid for academic purposes</p>
                        <p>• Keep this document safe for future reference</p>
                        <p>• Any alterations will make this document invalid</p>
                      </div>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e40af', marginBottom: '15px' }}>Verification Details:</h4>
                      <div style={{ 
                        background: 'white', 
                        padding: '15px', 
                        border: '2px dashed #1e40af', 
                        borderRadius: '8px',
                        textAlign: 'center',
                        fontFamily: 'Courier New, monospace',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#1e40af'
                      }}>
                        REG-{new Date().getFullYear()}-{selectedStudent?.student_id || 'XXXXXX'}
                      </div>
                      <p style={{ fontSize: '10px', color: '#6b7280', textAlign: 'center', marginTop: '8px' }}>
                        Generated on: {new Date().toLocaleDateString('en-IN')}
                      </p>
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

export default StudentRegPrintContent;