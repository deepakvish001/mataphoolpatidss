import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, FileText, Users, TrendingUp, Calculator, FileDown, Loader2, Receipt } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
          <Button 
            onClick={generateProfessionalPDF}
            disabled={!selectedReceipt || isGeneratingPDF || generating}
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-elegant px-8 py-3 text-base"
          >
            <FileDown className="h-5 w-5 mr-2" />
            {isGeneratingPDF || generating ? "Generating PDF..." : "Generate Professional PDF"}
          </Button>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className={`bg-gradient-to-br ${stat.color} text-primary-foreground shadow-elegant border-0`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-primary-foreground/80 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className="p-3 bg-background/20 rounded-full">
                    <stat.icon className="h-6 w-6" />
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
                  <Card key={receipt.id} className="hover:shadow-lg transition-all duration-300 border-border/40 bg-background/50">
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
                          <Badge variant="secondary" className="text-xs">{receipt.course}</Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                          <p className="text-muted-foreground text-sm">{receipt.studentId}</p>
                        </div>
                        <Button 
                          onClick={() => handleSelectReceipt(receipt)}
                          className="w-full mt-4 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
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

        {/* Receipt Preview */}
        {selectedReceipt && (
          <Card className="shadow-elegant border-0 bg-white">
            <CardContent className="p-0">
              <div ref={receiptRef} className="p-8 bg-white">
                {/* Header Section with Logo */}
                <div className="flex items-start justify-between mb-8">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 border-4 border-pink-700 flex items-center justify-center shadow-lg">
                      <div className="text-center">
                        <div className="text-sm font-bold text-white leading-tight">B.Soft</div>
                        <div className="text-xs text-white leading-none">Computer &</div>
                        <div className="text-xs text-white leading-none">Technical</div>
                        <div className="text-xs text-white leading-none">Institute</div>
                      </div>
                    </div>
                  </div>

                  {/* Institute Header */}
                  <div className="flex-1 text-center ml-8">
                    <h1 className="text-3xl font-bold text-blue-600 mb-4 tracking-wider">
                      B. Soft Computer & Technical Institute
                    </h1>
                    <div className="text-sm text-gray-700 mb-2">
                      Near Union Bank Of India Bina Soft Educational & Welfare Society Vill & Post BILARIYAGAN J, AZAMGARH-276121
                    </div>
                    <div className="text-sm text-gray-700 mb-8">
                      infobinasoft@gmail.com
                    </div>
                  </div>
                </div>

                {/* Receipt Title */}
                <div className="text-center mb-8">
                  <h2 className="text-xl font-bold text-gray-800 underline">
                    Student Fee Receipt
                  </h2>
                </div>

                {/* Receipt Details */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="flex">
                      <span className="font-medium text-gray-700 w-24">Receipt ID:</span>
                      <span className="border-b border-gray-400 flex-1 min-h-[1.5rem] pl-2">
                        {selectedReceipt.receiptId}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-medium text-gray-700 w-24">Name:</span>
                      <span className="border-b border-gray-400 flex-1 min-h-[1.5rem] pl-2">
                        {selectedReceipt.studentName}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-medium text-gray-700 w-24">Course:</span>
                      <span className="border-b border-gray-400 flex-1 min-h-[1.5rem] pl-2">
                        {selectedReceipt.course}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-medium text-gray-700 w-24">Student ID:</span>
                      <span className="border-b border-gray-400 flex-1 min-h-[1.5rem] pl-2">
                        {selectedReceipt.studentId}
                      </span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="flex">
                      <span className="font-medium text-gray-700 w-16">Date:</span>
                      <span className="border-b border-gray-400 flex-1 min-h-[1.5rem] pl-2">
                        {new Date(selectedReceipt.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-medium text-gray-700 w-20">Payment:</span>
                      <span className="border-b border-gray-400 flex-1 min-h-[1.5rem] pl-2">
                        {selectedReceipt.paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fee Details */}
                <div className="space-y-4 mb-12">
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-24">Total fee:</span>
                    <span className="border-b border-gray-400 flex-1 min-h-[1.5rem] pl-2">
                      ₹{parseInt(selectedReceipt.totalFee).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-24">Fee Paid:</span>
                    <span className="border-b border-gray-400 flex-1 min-h-[1.5rem] pl-2">
                      ₹{parseInt(selectedReceipt.feePaid).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-24">Fee Due:</span>
                    <span className="border-b border-gray-400 flex-1 min-h-[1.5rem] pl-2">
                      ₹{parseInt(selectedReceipt.feeDue).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Office Sign */}
                <div className="flex justify-between">
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-24">Student Sign:</span>
                    <span className="border-b border-gray-400 w-40 min-h-[1.5rem]"></span>
                  </div>
                  <div className="flex">
                    <span className="font-medium text-gray-700 w-24">Office Sign:</span>
                    <span className="border-b border-gray-400 w-40 min-h-[1.5rem]"></span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FeesPrintContent;