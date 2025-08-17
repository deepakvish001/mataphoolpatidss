import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search, Printer, FileText, Users, TrendingUp, Calculator, FileDown, Loader2, Receipt } from "lucide-react";
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
      title: "Total Receipts",
      value: sampleReceipts.length.toString(),
      icon: FileText,
      color: "from-primary to-primary/80"
    },
    {
      title: "Students Enrolled",
      value: sampleReceipts.length.toString(),
      icon: Users,
      color: "from-accent to-accent/80"
    },
    {
      title: "Fees Collected",
      value: "₹" + sampleReceipts.reduce((sum, receipt) => sum + parseInt(receipt.feePaid), 0).toLocaleString(),
      icon: Calculator,
      color: "from-secondary to-secondary/80"
    },
    {
      title: "Pending Fees",
      value: "₹" + sampleReceipts.reduce((sum, receipt) => sum + parseInt(receipt.feeDue), 0).toLocaleString(),
      icon: TrendingUp,
      color: "from-destructive to-destructive/80"
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

  const generateProfessionalPDF = async () => {
    if (!selectedReceipt) {
      toast({
        title: "Error",
        description: "Please search and select a receipt first",
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
        // Multi-page handling if needed
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
          ctx.drawImage(canvas, 0, -currentY);
          
          const pageImgData = pageCanvas.toDataURL('image/png');
          pdf.addImage(pageImgData, 'PNG', margin, margin, usableWidthMm, usableHeightMm, undefined, 'FAST');
          
          currentY += sliceHeight;
          pageNumber++;
        }
      }

      const fileName = `fee_receipt_${selectedReceipt.receiptId}_${selectedReceipt.studentName.replace(/\s+/g, '_')}.pdf`;
      pdf.save(fileName);

      toast({
        title: "Success",
        description: "Fee receipt PDF generated successfully!",
      });

    } catch (error: any) {
      console.error('PDF generation error:', error);
      toast({
        title: "Error",
        description: `Failed to generate PDF: ${error.message}`,
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
        <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-foreground flex items-center space-x-2">
              <Search className="h-5 w-5 text-primary" />
              <span>Search Receipt</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="search" className="text-sm font-medium text-muted-foreground">
                  Search by Student Name, ID, or Receipt ID
                </Label>
                <Input
                  id="search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Enter search term..."
                  className="mt-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
                  Search
                </Button>
              </div>
            </div>

            {/* Search Results */}
            {showSearchResults && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Search Results ({searchResults.length})</h3>
                {searchResults.length > 0 ? (
                  <div className="grid gap-4">
                    {searchResults.map((receipt) => (
                      <Card key={receipt.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleSelectReceipt(receipt)}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-semibold">{receipt.studentName}</h4>
                              <p className="text-sm text-muted-foreground">Receipt: {receipt.receiptId} | Student ID: {receipt.studentId}</p>
                              <p className="text-sm text-muted-foreground">Course: {receipt.course}</p>
                            </div>
                            <Badge variant="secondary">Click to Select</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No receipts found matching your search criteria.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Selected Receipt Actions */}
        {selectedReceipt && (
          <Card className="shadow-elegant border-0 bg-card/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground flex items-center justify-between">
                <span>Selected Receipt: {selectedReceipt.receiptId}</span>
                <Button 
                  onClick={generateProfessionalPDF}
                  disabled={isGeneratingPDF}
                  className="bg-secondary hover:bg-secondary/90"
                >
                  {isGeneratingPDF ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <FileDown className="h-4 w-4 mr-2" />
                      Generate PDF
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground mb-4">
                Student: {selectedReceipt.studentName} | Course: {selectedReceipt.course}
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