import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, FileText, Users, TrendingUp, Calculator, FileDown, Loader2, Receipt } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import indiaEmblem from "@/assets/india-emblem.png";
import nabardLogo from "@/assets/nabard-logo.png";

interface FeesReceiptData {
  id: string;
  receiptId: string;
  studentName: string;
  studentId: string;
  course: string;
  date: string;
  totalFee: string;
  feePaid: string;
  feeDue: string;
  paymentMethod: string;
  transactionId?: string;
  studentPhoto?: string;
  academicYear?: string;
  feesType?: string;
  status?: string;
}

const FeesPrintContent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedReceipt, setSelectedReceipt] = useState<FeesReceiptData | null>(null);
  const [searchResults, setSearchResults] = useState<FeesReceiptData[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Sample data for demonstration
  const sampleReceipts: FeesReceiptData[] = [
    {
      id: "1",
      receiptId: "REC001",
      studentName: "John Doe",
      studentId: "STU001",
      course: "Basic Computer Course",
      date: "2024-01-15",
      totalFee: "25000",
      feePaid: "15000",
      feeDue: "10000",
      paymentMethod: "Online Transfer"
    },
    {
      id: "2",
      receiptId: "REC002",
      studentName: "Jane Smith",
      studentId: "STU002",
      course: "Advanced Computer Course",
      date: "2024-01-16",
      totalFee: "35000",
      feePaid: "35000",
      feeDue: "0",
      paymentMethod: "Cash Payment"
    },
    {
      id: "3",
      receiptId: "REC003",
      studentName: "Mike Johnson",
      studentId: "STU003",
      course: "Programming Fundamentals",
      date: "2024-01-17",
      totalFee: "45000",
      feePaid: "25000",
      feeDue: "20000",
      paymentMethod: "UPI Payment"
    }
  ];

  const stats = [
    {
      title: "Search Results",
      value: searchResults.length.toString(),
      icon: Search,
      color: "from-primary to-primary/80"
    },
    {
      title: "Selected Receipt",
      value: selectedReceipt ? '1' : '0',
      icon: Users,
      color: "from-secondary to-secondary/80"
    },
    {
      title: "Fees Collected",
      value: "₹" + sampleReceipts.reduce((sum, receipt) => sum + parseInt(receipt.feePaid), 0).toLocaleString(),
      icon: Calculator,
      color: "from-accent to-accent/80"
    },
    {
      title: "Pending Fees",
      value: "₹" + sampleReceipts.reduce((sum, receipt) => sum + parseInt(receipt.feeDue), 0).toLocaleString(),
      icon: TrendingUp,
      color: "from-muted to-muted/80"
    }
  ];

  const handleSearch = () => {
    if (!searchValue.trim()) {
      toast({
        title: "Error",
        description: "Please enter a student ID, name, or receipt ID to search",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const results = sampleReceipts.filter(receipt => 
        receipt.studentName.toLowerCase().includes(searchValue.toLowerCase()) ||
        receipt.studentId.toLowerCase().includes(searchValue.toLowerCase()) ||
        receipt.receiptId.toLowerCase().includes(searchValue.toLowerCase())
      );
      
      setSearchResults(results);
      setShowSearchResults(true);
      setLoading(false);

      if (results.length > 0) {
        toast({
          title: "Success",
          description: `Found ${results.length} receipt(s)`,
        });
      } else {
        toast({
          title: "No Results",
          description: "No receipts found with the given criteria",
          variant: "destructive"
        });
      }
    }, 1000);
  };

  const handleSelectReceipt = (receipt: FeesReceiptData) => {
    setSelectedReceipt(receipt);
    setShowSearchResults(false);
    toast({
      title: "Receipt Selected",
      description: `Selected receipt ${receipt.receiptId} for ${receipt.studentName}`,
    });
  };

  const handleGenerateReceipt = () => {
    if (!selectedReceipt) {
      toast({
        title: "Error",
        description: "Please search and select a receipt first",
        variant: "destructive"
      });
      return;
    }

    setGenerating(true);
    
    // Simulate generation process
    setTimeout(() => {
      toast({
        title: "Success",
        description: `Fee receipt generated successfully for ${selectedReceipt.studentName}`,
      });
      
      setGenerating(false);
    }, 1000);
  };

  const generateProfessionalPDF = async () => {
    if (!selectedReceipt) {
      toast({
        title: "Error",
        description: "Please select a receipt first",
        variant: "destructive"
      });
      return;
    }

    if (!receiptRef.current) {
      toast({
        title: "Error",
        description: "Receipt template not found",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsGeneratingPDF(true);
      
      // First generate the receipt (simulate generation process)
      setGenerating(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setGenerating(false);

      toast({
        title: "Generating PDF",
        description: "Creating Professional Fee Receipt PDF...",
      });

      // Ensure layout and webfonts are fully ready
      if ((document as any).fonts?.ready) {
        await (document as any).fonts.ready;
      }
      await new Promise((resolve) => setTimeout(resolve, 400));

      const element = receiptRef.current;

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
      const sanitizedName = selectedReceipt.studentName?.replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '_') || 'Student';
      const fileName = `${sanitizedName}_FeeReceipt_${currentDate}.pdf`;
      pdf.save(fileName);

      toast({
        title: "Success",
        description: "Professional Fee Receipt PDF generated successfully!",
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

  if (loading) {
    return (
      <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Searching receipts...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5 p-6">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Receipt className="h-8 w-8 text-primary" />
            </div>
            <span>Fee Receipt Print</span>
          </h1>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className={`bg-gradient-to-br ${stat.color} text-primary-foreground shadow-elegant border-0 hover:shadow-xl transition-all duration-300`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-primary-foreground/80 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-full">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search Section */}
        <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-primary-foreground p-8">
            <CardTitle className="text-2xl font-bold flex items-center space-x-3">
              <div className="p-2 bg-background/20 rounded-lg backdrop-blur-sm">
                <Search className="h-6 w-6" />
              </div>
              <span>Search Receipt</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10 border-border/40 bg-background focus:border-primary/50 focus:ring-primary/20 h-12 text-base"
                  placeholder="Enter Student Name, ID, or Receipt ID"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg px-8 h-12"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {showSearchResults && searchResults.length > 0 && (
          <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-secondary via-secondary/95 to-secondary/90 text-secondary-foreground p-8">
              <CardTitle className="text-2xl font-bold flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-background/20 rounded-lg backdrop-blur-sm">
                    <Users className="h-6 w-6" />
                  </div>
                  <span>Search Results ({searchResults.length})</span>
                </div>
                <Badge className="bg-background/20 text-secondary-foreground border-background/30">
                  Found: {searchResults.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((receipt) => (
                  <Card key={receipt.id} className="hover:shadow-lg transition-all duration-300 border border-border/40 bg-background shadow-elegant">
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Student Name</p>
                          <p className="font-semibold text-foreground">{receipt.studentName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Receipt ID</p>
                          <p className="text-foreground">{receipt.receiptId}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Course</p>
                          <Badge variant="secondary" className="text-xs bg-secondary text-secondary-foreground">{receipt.course}</Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Amount Paid</p>
                          <p className="text-green-600 font-bold">₹{parseInt(receipt.feePaid).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                          <p className="text-muted-foreground text-sm">{receipt.studentId}</p>
                        </div>
                        <Button 
                          onClick={() => handleSelectReceipt(receipt)}
                          className="w-full mt-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground"
                          size="sm"
                        >
                          Select Receipt
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Selected Receipt Information */}
        {selectedReceipt && (
          <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-accent via-accent/95 to-accent/90 text-accent-foreground p-8">
              <CardTitle className="text-2xl font-bold flex items-center space-x-3">
                <div className="p-2 bg-background/20 rounded-lg backdrop-blur-sm">
                  <Receipt className="h-6 w-6" />
                </div>
                <span>Selected Receipt: {selectedReceipt.receiptId}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Student Name</p>
                  <p className="text-lg font-semibold text-foreground">{selectedReceipt.studentName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Course</p>
                  <p className="text-lg font-semibold text-foreground">{selectedReceipt.course}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Fee Paid</p>
                  <p className="text-lg font-semibold text-green-600">₹{parseInt(selectedReceipt.feePaid).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Payment Method</p>
                  <Badge variant="outline" className="mt-1">{selectedReceipt.paymentMethod}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* A4 Fees Receipt Preview */}
        <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-muted via-muted/95 to-muted/90 text-muted-foreground p-8">
            <CardTitle className="text-2xl font-bold flex items-center space-x-3">
              <div className="p-2 bg-background/20 rounded-lg backdrop-blur-sm">
                <Receipt className="h-6 w-6 text-foreground" />
              </div>
              <span className="text-foreground">Fees Receipt Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex justify-center mb-6">
              <div className="flex gap-4">
                <Button 
                  onClick={handleGenerateReceipt}
                  disabled={!selectedReceipt || generating}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-elegant px-8 py-3 text-base"
                >
                  <Receipt className="h-5 w-5 mr-2" />
                  {generating ? "Processing..." : "Generate Receipt"}
                </Button>
                <Button 
                  onClick={generateProfessionalPDF}
                  disabled={!selectedReceipt || generating}
                  className="bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary shadow-elegant px-8 py-3 text-base"
                >
                  <FileDown className="h-5 w-5 mr-2" />
                  {generating ? "Generating PDF..." : "Generate Professional PDF"}
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div
                ref={receiptRef}
                className="relative mx-auto bg-background w-[794px] min-h-[1123px] p-10 border-[12px] border-primary/20 rounded-md shadow-elegant"
                style={{ transform: 'scale(0.8)', transformOrigin: 'top center' }}
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
                    {selectedReceipt?.studentPhoto ? (
                      <img
                        src={selectedReceipt.studentPhoto}
                        alt={`${selectedReceipt.studentName} photo`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-[10px] text-muted-foreground">Photo</div>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold tracking-wide text-primary uppercase">Fees Payment Receipt</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Official Receipt for Course Fees Payment
                  </p>
                </div>

                {/* Receipt Details Section */}
                <div className="mb-6">
                  <div className="bg-primary/10 text-center py-2 mb-4 border border-primary/20 rounded">
                    <h3 className="font-bold text-sm text-primary">RECEIPT INFORMATION</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium">Receipt Number</p>
                      <p className="border-b border-border/60 py-2 font-semibold">{selectedReceipt?.receiptId || "-"}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium">Receipt Date</p>
                      <p className="border-b border-border/60 py-2 font-semibold">{selectedReceipt?.date ? new Date(selectedReceipt.date).toLocaleDateString() : "-"}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium">Student Name</p>
                      <p className="border-b border-border/60 py-2">{selectedReceipt?.studentName || "-"}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium">Student ID</p>
                      <p className="border-b border-border/60 py-2">{selectedReceipt?.studentId || "-"}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium">Course</p>
                      <p className="border-b border-border/60 py-2">{selectedReceipt?.course || "-"}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium">Academic Year</p>
                      <p className="border-b border-border/60 py-2">{selectedReceipt?.academicYear || "2024-25"}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="mb-6">
                  <div className="bg-secondary/10 text-center py-2 mb-4 border border-secondary/20 rounded">
                    <h3 className="font-bold text-sm text-secondary-foreground">PAYMENT DETAILS</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium">Fees Type</p>
                      <p className="border-b border-border/60 py-2">{selectedReceipt?.feesType || "Course Fees"}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium">Payment Mode</p>
                      <p className="border-b border-border/60 py-2">{selectedReceipt?.paymentMethod || "-"}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium">Transaction ID</p>
                      <p className="border-b border-border/60 py-2">{selectedReceipt?.transactionId || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium">Payment Status</p>
                      <p className="border-b border-border/60 py-2 text-green-600 font-semibold">{selectedReceipt?.status || "Paid"}</p>
                    </div>
                  </div>
                </div>

                {/* Amount Breakdown */}
                <div className="mb-6">
                  <div className="bg-accent/10 text-center py-2 mb-4 border border-accent/20 rounded">
                    <h3 className="font-bold text-sm text-accent-foreground">AMOUNT BREAKDOWN</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-border/30 pb-2">
                      <span>Course Fees:</span>
                      <span>₹{selectedReceipt?.feePaid ? parseInt(selectedReceipt.feePaid).toLocaleString() : "0"}</span>
                    </div>
                    <div className="flex justify-between border-b border-border/30 pb-2">
                      <span>GST (18%):</span>
                      <span>₹{selectedReceipt ? (parseInt(selectedReceipt.feePaid) * 0.18).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t-2 border-primary/30 pt-2">
                      <span>Total Amount:</span>
                      <span className="text-primary">₹{selectedReceipt ? (parseInt(selectedReceipt.feePaid) * 1.18).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"}</span>
                    </div>
                    {selectedReceipt && parseInt(selectedReceipt.feeDue) > 0 && (
                      <div className="flex justify-between border-t border-border/30 pt-2 text-red-600">
                        <span>Due Amount:</span>
                        <span>₹{parseInt(selectedReceipt.feeDue).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Terms */}
                <div className="mb-6">
                  <div className="bg-muted/10 text-center py-2 mb-4 border border-muted/20 rounded">
                    <h3 className="font-bold text-sm text-foreground">TERMS & CONDITIONS</h3>
                  </div>
                  <div className="text-xs space-y-1 text-muted-foreground">
                    <p>• This receipt is valid for official records and future reference</p>
                    <p>• Fees once paid are non-refundable and non-transferable</p>
                    <p>• Keep this receipt safely for all future correspondence</p>
                    <p>• In case of any discrepancy, contact the accounts department within 7 days</p>
                    <p>• This is a computer-generated receipt and does not require a signature</p>
                  </div>
                </div>

                {/* Verification and Signatures */}
                <div className="mt-8 grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="border-b border-border/60 h-12 mb-2"></div>
                    <p className="text-sm font-medium">Student Signature</p>
                  </div>
                  <div className="text-center">
                    <div className="border border-border/60 rounded px-3 py-2 font-mono text-center">
                      FEE-{new Date().getFullYear()}-{(selectedReceipt?.receiptId || "").toString().replace(/[^A-Z0-9]/gi, "").toUpperCase()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Verification Code</p>
                  </div>
                  <div className="text-center">
                    <div className="border-b border-border/60 h-12 mb-2"></div>
                    <p className="text-sm font-medium">Accounts Officer</p>
                  </div>
                </div>

                <div className="mt-6 text-[10px] text-muted-foreground text-center">
                  This receipt is computer generated and does not require a physical signature. | Generated on: {new Date().toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeesPrintContent;