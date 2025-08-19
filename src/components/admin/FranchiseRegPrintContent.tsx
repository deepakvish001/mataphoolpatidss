import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { FileDown, Search, Users, FileText, Building, Calendar, Printer } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type FranchiseData = {
  id: string;
  instituteName: string;
  centreHead: string;
  state: string;
  district: string;
  city: string;
  pinCode: string;
  dateOfRegistration: string;
  yearEstablishment: string;
  email: string;
  phone: string;
  designation: string;
  status: string;
  postalAddress: string;
  franchiseType: string;
};

const FranchiseRegPrintContent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedFranchise, setSelectedFranchise] = useState<FranchiseData | null>(null);
  const [searchResults, setSearchResults] = useState<FranchiseData[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const franchiseCardRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Sample franchise data - in real app this would come from Supabase
  const allFranchises: FranchiseData[] = [
    {
      id: "FR001",
      instituteName: "B. Soft Computer & Technical Institute",
      centreHead: "John Doe",
      state: "Uttar Pradesh",
      district: "Azamgarh",
      city: "Bilariyagan",
      pinCode: "276121",
      dateOfRegistration: "2023-01-15",
      yearEstablishment: "2020",
      email: "infobinasoft@gmail.com",
      phone: "9876543210",
      designation: "Director",
      status: "active",
      postalAddress: "Near Union Bank Of India Bina Soft Educational & Welfare Society Vill & Post BILARIYAGAN J",
      franchiseType: "Computer Training"
    },
    {
      id: "FR002", 
      instituteName: "Tech Learning Center",
      centreHead: "Jane Smith",
      state: "Maharashtra",
      district: "Mumbai",
      city: "Andheri",
      pinCode: "400058",
      dateOfRegistration: "2023-03-20",
      yearEstablishment: "2019",
      email: "info@techlearning.com",
      phone: "9123456789",
      designation: "Manager",
      status: "active",
      postalAddress: "Plot No. 15, Andheri West, Mumbai",
      franchiseType: "Digital Skills"
    },
    {
      id: "FR003",
      instituteName: "Digital Skills Academy",
      centreHead: "Mike Johnson",
      state: "Karnataka",
      district: "Bangalore",
      city: "Whitefield",
      pinCode: "560066",
      dateOfRegistration: "2023-02-10",
      yearEstablishment: "2021",
      email: "contact@digitalskills.edu",
      phone: "9998887776",
      designation: "Principal",
      status: "active",
      postalAddress: "ITPL Road, Whitefield, Bangalore",
      franchiseType: "Technical Training"
    }
  ];

  const handleSearch = () => {
    if (!searchValue.trim()) {
      toast({
        title: "Error",
        description: "Please enter a franchise ID, institute name, or centre head name to search",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      const results = allFranchises.filter(franchise =>
        franchise.id.toLowerCase().includes(searchValue.toLowerCase()) ||
        franchise.instituteName.toLowerCase().includes(searchValue.toLowerCase()) ||
        franchise.centreHead.toLowerCase().includes(searchValue.toLowerCase())
      );

      setSearchResults(results);
      setShowSearchResults(true);
      setLoading(false);

      if (results.length > 0) {
        toast({
          title: "Success",
          description: `Found ${results.length} franchise(s)`,
        });
      } else {
        toast({
          title: "No Results",
          description: "No franchises found with the given criteria",
          variant: "destructive"
        });
      }
    }, 500);
  };

  const handleSelectFranchise = (franchise: FranchiseData) => {
    setSelectedFranchise(franchise);
    setShowSearchResults(false);
    toast({
      title: "Franchise Selected",
      description: `Selected ${franchise.instituteName} for registration print`,
    });
  };

  const handleGenerateRegistrationPrint = () => {
    if (!selectedFranchise) {
      toast({
        title: "Error",
        description: "Please search and select a franchise first",
        variant: "destructive"
      });
      return;
    }

    setGenerating(true);
    
    // Simulate generation process
    setTimeout(() => {
      toast({
        title: "Success",
        description: `Registration print generated successfully for ${selectedFranchise.instituteName}`,
      });

      // Update the selected franchise status locally
      setSelectedFranchise({
        ...selectedFranchise,
        status: 'generated'
      });
      
      setGenerating(false);
    }, 1000);
  };

  const handlePrintRegistration = () => {
    if (!selectedFranchise) {
      toast({
        title: "Error",
        description: "Please generate a registration print first",
        variant: "destructive"
      });
      return;
    }
    window.print();
  };

  const generateProfessionalPDF = async () => {
    if (!selectedFranchise) {
      toast({
        title: "Error",
        description: "Please select a franchise first",
        variant: "destructive"
      });
      return;
    }

    if (!franchiseCardRef.current) {
      toast({
        title: "Error",
        description: "Registration print template not found",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsGeneratingPDF(true);
      
      // First generate the registration print
      setGenerating(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update the selected franchise status locally
      setSelectedFranchise({
        ...selectedFranchise,
        status: 'generated'
      });
      setGenerating(false);

      toast({
        title: "Generating PDF",
        description: "Creating Professional Registration Print PDF...",
      });

      // Ensure layout and webfonts are fully ready
      if ((document as any).fonts?.ready) {
        await (document as any).fonts.ready;
      }
      await new Promise((resolve) => setTimeout(resolve, 400));

      const element = franchiseCardRef.current;

      // High-DPI capture for crisp text
      const canvas = await html2canvas(element, {
        scale: Math.min(3, window.devicePixelRatio * 2),
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      // A4 dimensions in points (1 point = 1/72 inch)
      const a4Width = 595.28;
      const a4Height = 841.89;

      // Create PDF with proper A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [a4Width, a4Height],
        compress: true
      });

      // Get image dimensions
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Calculate scale to fit A4 with margins
      const margin = 40;
      const availableWidth = a4Width - (margin * 2);
      const availableHeight = a4Height - (margin * 2);

      const scaleWidth = availableWidth / imgWidth;
      const scaleHeight = availableHeight / imgHeight;
      const scale = Math.min(scaleWidth, scaleHeight);

      const scaledWidth = imgWidth * scale;
      const scaledHeight = imgHeight * scale;

      // Center the image
      const xOffset = margin + (availableWidth - scaledWidth) / 2;
      const yOffset = margin + (availableHeight - scaledHeight) / 2;

      // Convert canvas to image and add to PDF
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', xOffset, yOffset, scaledWidth, scaledHeight);

      // Generate filename
      const sanitizedName = selectedFranchise.instituteName.replace(/[^a-z0-9]/gi, '_');
      const currentDate = new Date().toISOString().split('T')[0];
      const fileName = `${sanitizedName}_FranchiseRegistration_${currentDate}.pdf`;

      // Save the PDF
      pdf.save(fileName);

      toast({
        title: "Success",
        description: "Professional Registration Print PDF generated successfully!",
      });

    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5 p-6">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Printer className="h-8 w-8 text-primary" />
            </div>
            <span>Franchise Registration Print</span>
          </h1>
          <Button 
            onClick={generateProfessionalPDF}
            disabled={!selectedFranchise || isGeneratingPDF || generating}
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-elegant px-8 py-3 text-base"
          >
            <FileDown className="h-5 w-5 mr-2" />
            {isGeneratingPDF || generating ? "Generating PDF..." : "Generate Professional PDF"}
          </Button>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm font-medium">Search Results</p>
                  <p className="text-3xl font-bold">{searchResults.length}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <Search className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-foreground/80 text-sm font-medium">Selected Franchise</p>
                  <p className="text-3xl font-bold">{selectedFranchise ? '1' : '0'}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <Building className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-accent-foreground/80 text-sm font-medium">Prints Generated</p>
                  <p className="text-3xl font-bold">{selectedFranchise && selectedFranchise.status === 'generated' ? '1' : '0'}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-muted to-muted/80 text-muted-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground/80 text-sm font-medium">Franchise Type</p>
                  <p className="text-xl font-bold text-foreground">{selectedFranchise ? selectedFranchise.franchiseType : 'None'}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <Users className="h-6 w-6 text-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Section */}
        <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-primary-foreground p-8">
            <CardTitle className="text-2xl font-bold flex items-center space-x-3">
              <div className="p-2 bg-background/20 rounded-lg backdrop-blur-sm">
                <Search className="h-6 w-6" />
              </div>
              <span>Search Franchise</span>
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
                  placeholder="Enter Franchise ID, Institute Name, or Centre Head Name"
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
        {showSearchResults && (
          <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-secondary via-secondary/95 to-secondary/90 text-secondary-foreground p-8">
              <CardTitle className="text-2xl font-bold flex items-center space-x-3">
                <div className="p-2 bg-background/20 rounded-lg backdrop-blur-sm">
                  <Building className="h-6 w-6" />
                </div>
                <span>Search Results ({searchResults.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-4">
                {searchResults.map((franchise) => (
                  <div 
                    key={franchise.id}
                    className="p-6 border border-border/40 rounded-lg bg-background/50 hover:bg-accent/20 transition-all duration-200 cursor-pointer"
                    onClick={() => handleSelectFranchise(franchise)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                            {franchise.id}
                          </Badge>
                          <h3 className="text-lg font-semibold text-foreground">{franchise.instituteName}</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Centre Head:</span> {franchise.centreHead}
                          </div>
                          <div>
                            <span className="font-medium">Location:</span> {franchise.city}, {franchise.state}
                          </div>
                          <div>
                            <span className="font-medium">Registration:</span> {new Date(franchise.dateOfRegistration).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline"
                        size="sm"
                        className="border-primary/30 text-primary hover:bg-primary/10"
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Selected Franchise Actions */}
        {selectedFranchise && (
          <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-accent via-accent/95 to-accent/90 text-accent-foreground p-8">
              <CardTitle className="text-2xl font-bold flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-background/20 rounded-lg backdrop-blur-sm">
                    <FileText className="h-6 w-6" />
                  </div>
                  <span>Selected: {selectedFranchise.instituteName}</span>
                </div>
                <div className="flex gap-4">
                  <Button 
                    onClick={handleGenerateRegistrationPrint}
                    disabled={generating}
                    variant="outline"
                    size="sm"
                    className="bg-background/20 text-accent-foreground border-background/30 hover:bg-background/30"
                  >
                    {generating ? "Generating..." : "Generate Print"}
                  </Button>
                  <Button 
                    onClick={handlePrintRegistration}
                    disabled={!selectedFranchise || selectedFranchise.status !== 'generated'}
                    variant="outline"
                    size="sm"
                    className="bg-background/20 text-accent-foreground border-background/30 hover:bg-background/30"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-foreground">Franchise ID:</span>
                    <span className="text-muted-foreground ml-2">{selectedFranchise.id}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Centre Head:</span>
                    <span className="text-muted-foreground ml-2">{selectedFranchise.centreHead}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Designation:</span>
                    <span className="text-muted-foreground ml-2">{selectedFranchise.designation}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Email:</span>
                    <span className="text-muted-foreground ml-2">{selectedFranchise.email}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-foreground">Registration Date:</span>
                    <span className="text-muted-foreground ml-2">{new Date(selectedFranchise.dateOfRegistration).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Location:</span>
                    <span className="text-muted-foreground ml-2">{selectedFranchise.city}, {selectedFranchise.state}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Phone:</span>
                    <span className="text-muted-foreground ml-2">{selectedFranchise.phone}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Status:</span>
                    <Badge 
                      variant={selectedFranchise.status === 'generated' ? 'default' : 'secondary'}
                      className="ml-2"
                    >
                      {selectedFranchise.status === 'generated' ? 'Ready to Print' : 'Active'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* A4 Registration Print Canvas */}
        {selectedFranchise && (
          <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm overflow-hidden print:shadow-none print:border-0">
            <CardHeader className="bg-gradient-to-r from-muted via-muted/95 to-muted/90 text-muted-foreground p-8 print:hidden">
              <CardTitle className="text-2xl font-bold flex items-center space-x-3">
                <div className="p-2 bg-background/20 rounded-lg backdrop-blur-sm">
                  <FileText className="h-6 w-6" />
                </div>
                <span className="text-foreground">Registration Print Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 print:p-4">
              <div 
                ref={franchiseCardRef}
                className="bg-white p-12 rounded-lg border border-border/20 print:border-0 print:rounded-none print:p-8 min-h-[800px] relative"
                style={{ 
                  width: '210mm', 
                  minHeight: '297mm',
                  margin: '0 auto',
                  fontSize: '14px',
                  lineHeight: '1.6'
                }}
              >
                {/* Header Section */}
                <div className="text-center mb-12 relative">
                  {/* Government Emblem */}
                  <div className="flex justify-center mb-6">
                    <img 
                      src="/lovable-uploads/f15af816-2dc8-45f6-9e1a-10ca186f8a09.png" 
                      alt="Government Emblem"
                      className="h-20 w-20"
                    />
                  </div>
                  
                  <h1 className="text-4xl font-bold text-primary mb-2 print:text-black">
                    CERTIFICATE OF FRANCHISE REGISTRATION
                  </h1>
                  <div className="w-48 h-1 bg-primary mx-auto mb-4 print:bg-black"></div>
                  <p className="text-xl text-muted-foreground font-semibold print:text-black">
                    Government of India
                  </p>
                  <p className="text-lg text-muted-foreground print:text-black">
                    Ministry of Skill Development & Entrepreneurship
                  </p>
                  
                  {/* Certificate Number */}
                  <div className="absolute top-0 right-0 text-right">
                    <p className="text-sm font-medium print:text-black">Certificate No.</p>
                    <p className="text-lg font-bold text-primary print:text-black">{selectedFranchise.id}</p>
                  </div>
                </div>

                {/* Certificate Content */}
                <div className="mb-12">
                  <p className="text-lg text-center mb-8 print:text-black leading-relaxed">
                    This is to certify that <strong className="text-primary print:text-black text-xl">{selectedFranchise.instituteName}</strong> 
                    has been duly registered as an authorized franchise partner under the 
                    <strong> Skill Development and Training Program</strong> for the provision of 
                    <strong> {selectedFranchise.franchiseType}</strong> services.
                  </p>
                </div>

                {/* Details Section */}
                <div className="grid grid-cols-2 gap-12 mb-12">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg print:bg-transparent print:border print:border-gray-300">
                      <h3 className="font-bold text-lg mb-4 text-primary print:text-black border-b border-primary/20 pb-2 print:border-black">
                        Franchise Details
                      </h3>
                      <div className="space-y-3 text-base">
                        <div className="flex justify-between">
                          <span className="font-medium">Registration ID:</span>
                          <span className="font-bold">{selectedFranchise.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Centre Head:</span>
                          <span>{selectedFranchise.centreHead}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Designation:</span>
                          <span>{selectedFranchise.designation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Franchise Type:</span>
                          <span className="font-semibold">{selectedFranchise.franchiseType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Established:</span>
                          <span>{selectedFranchise.yearEstablishment}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg print:bg-transparent print:border print:border-gray-300">
                      <h3 className="font-bold text-lg mb-4 text-primary print:text-black border-b border-primary/20 pb-2 print:border-black">
                        Contact Information
                      </h3>
                      <div className="space-y-3 text-base">
                        <div>
                          <span className="font-medium">Email:</span>
                          <p className="text-sm mt-1">{selectedFranchise.email}</p>
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span>
                          <p className="text-sm mt-1">{selectedFranchise.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg print:bg-transparent print:border print:border-gray-300">
                      <h3 className="font-bold text-lg mb-4 text-primary print:text-black border-b border-primary/20 pb-2 print:border-black">
                        Location Details
                      </h3>
                      <div className="space-y-3 text-base">
                        <div>
                          <span className="font-medium">Address:</span>
                          <p className="text-sm mt-1 leading-relaxed">{selectedFranchise.postalAddress}</p>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">City:</span>
                          <span>{selectedFranchise.city}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">District:</span>
                          <span>{selectedFranchise.district}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">State:</span>
                          <span>{selectedFranchise.state}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Pin Code:</span>
                          <span className="font-bold">{selectedFranchise.pinCode}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-lg print:bg-transparent print:border print:border-gray-300">
                      <h3 className="font-bold text-lg mb-4 text-primary print:text-black border-b border-primary/20 pb-2 print:border-black">
                        Registration Info
                      </h3>
                      <div className="space-y-3 text-base">
                        <div className="flex justify-between">
                          <span className="font-medium">Registration Date:</span>
                          <span className="font-semibold">{new Date(selectedFranchise.dateOfRegistration).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Valid From:</span>
                          <span>{new Date(selectedFranchise.dateOfRegistration).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Status:</span>
                          <Badge className="bg-green-100 text-green-800 print:bg-transparent print:text-black print:border print:border-green-800">
                            {selectedFranchise.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Authority Section */}
                <div className="border-t-2 border-primary/20 pt-12 print:border-black">
                  <div className="grid grid-cols-3 gap-8 items-end">
                    {/* Authorized Signature */}
                    <div className="text-center">
                      <div className="mb-8">
                        <div className="w-32 h-16 border-b-2 border-gray-400 mx-auto mb-2"></div>
                        <p className="text-sm font-semibold">Authorized Signature</p>
                        <p className="text-xs text-muted-foreground print:text-black">Registration Officer</p>
                      </div>
                    </div>
                    
                    {/* Official Seal */}
                    <div className="text-center">
                      <div className="mb-4">
                        <img 
                          src="/lovable-uploads/d6577713-1ec2-4c09-ace0-65aa6e97f4fc.png" 
                          alt="Official Seal"
                          className="h-24 w-24 mx-auto mb-2"
                        />
                        <p className="text-sm font-semibold">Official Seal</p>
                        <p className="text-xs text-muted-foreground print:text-black">Government of India</p>
                      </div>
                    </div>
                    
                    {/* Date */}
                    <div className="text-center">
                      <div className="mb-8">
                        <p className="text-sm font-semibold mb-2">Date of Issue</p>
                        <p className="text-lg font-bold border-b-2 border-gray-400 pb-2 inline-block">
                          {new Date().toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center border-t border-gray-300 pt-6">
                  <p className="text-sm text-muted-foreground print:text-black font-medium">
                    This certificate is issued under the authority of the Government of India
                  </p>
                  <p className="text-xs text-muted-foreground print:text-black mt-2">
                    For verification and inquiries, please contact the issuing authority
                  </p>
                  <p className="text-xs text-muted-foreground print:text-black mt-1">
                    Certificate ID: {selectedFranchise.id} | Issued on: {new Date().toLocaleDateString('en-IN')}
                  </p>
                </div>

                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 print:opacity-10">
                  <div className="transform rotate-45 text-8xl font-bold text-primary print:text-black">
                    OFFICIAL
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

export default FranchiseRegPrintContent;