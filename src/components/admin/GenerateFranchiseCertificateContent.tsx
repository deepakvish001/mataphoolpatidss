import { useState, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { FileDown, Search, Users, FileText, Building, Calendar, Printer, Award, CheckCircle, Filter, Plus, Edit, Trash2 } from "lucide-react";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type FranchiseCertificate = {
  id: string;
  franchise_id: string;
  franchise_name: string;
  centre_head: string;
  certificate_number: string;
  issue_date: string;
  valid_from: string;
  valid_to: string;
  operating_area: string;
  location: string;
  registration_number: string;
  certificate_type: string;
  status: string;
  created_at: string;
  updated_at: string;
};

const GenerateFranchiseCertificateContent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedFranchise, setSelectedFranchise] = useState<FranchiseCertificate | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<FranchiseCertificate | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const certificateRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Form data for creating/editing
  const [formData, setFormData] = useState({
    franchise_id: "",
    franchise_name: "",
    centre_head: "",
    certificate_number: "",
    issue_date: "",
    valid_from: "",
    valid_to: "",
    operating_area: "",
    location: "",
    registration_number: "",
    certificate_type: "Franchise Authorization",
    status: "active"
  });

  // Database operations with optimistic updates
  const {
    data: certificates,
    loading,
    actionLoading,
    create,
    update,
    delete: deleteCertificate,
    refresh
  } = useOptimisticCrud<FranchiseCertificate>({
    tableName: "franchise_certificates",
    orderBy: { column: "created_at", ascending: false },
    onSuccess: (action, data) => {
      if (action === "create") {
        toast({
          title: "Success",
          description: "Certificate created successfully",
        });
        setShowAddForm(false);
        resetForm();
      } else if (action === "update") {
        toast({
          title: "Success", 
          description: "Certificate updated successfully",
        });
        setEditingCertificate(null);
      } else if (action === "delete") {
        toast({
          title: "Success",
          description: "Certificate deleted successfully", 
        });
      }
    },
    onError: (action, error) => {
      toast({
        title: "Error",
        description: `Failed to ${action} certificate: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Real-time updates
  useAdminRealTime({
    tableName: "franchise_certificates",
    onInsert: () => {
      toast({
        title: "New Certificate Added",
        description: "A new franchise certificate has been created",
      });
    },
    onUpdate: () => {
      toast({
        title: "Certificate Updated", 
        description: "A franchise certificate has been updated",
      });
    },
    onDelete: () => {
      toast({
        title: "Certificate Deleted",
        description: "A franchise certificate has been removed",
      });
    }
  });

  // Filter and search logic
  const filteredCertificates = useMemo(() => {
    return certificates.filter(cert => {
      const matchesSearch = searchValue === "" || 
        cert.franchise_id.toLowerCase().includes(searchValue.toLowerCase()) ||
        cert.franchise_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        cert.centre_head.toLowerCase().includes(searchValue.toLowerCase());
      
      const matchesStatus = filterStatus === "all" || cert.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });
  }, [certificates, searchValue, filterStatus]);

  const resetForm = () => {
    setFormData({
      franchise_id: "",
      franchise_name: "",
      centre_head: "",
      certificate_number: "",
      issue_date: "",
      valid_from: "",
      valid_to: "",
      operating_area: "",
      location: "",
      registration_number: "",
      certificate_type: "Franchise Authorization",
      status: "active"
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.franchise_id || !formData.franchise_name || !formData.centre_head) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const certificateData = {
      ...formData,
      certificate_number: formData.certificate_number || `CERT${Date.now()}`,
      issue_date: formData.issue_date || new Date().toISOString().split('T')[0],
      valid_from: formData.valid_from || new Date().toISOString().split('T')[0],
      valid_to: formData.valid_to || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    if (editingCertificate) {
      await update(editingCertificate.id, certificateData);
    } else {
      await create(certificateData);
    }
  };

  const handleEdit = (certificate: FranchiseCertificate) => {
    setEditingCertificate(certificate);
    setFormData({
      franchise_id: certificate.franchise_id,
      franchise_name: certificate.franchise_name,
      centre_head: certificate.centre_head,
      certificate_number: certificate.certificate_number,
      issue_date: certificate.issue_date,
      valid_from: certificate.valid_from,
      valid_to: certificate.valid_to,
      operating_area: certificate.operating_area,
      location: certificate.location,
      registration_number: certificate.registration_number,
      certificate_type: certificate.certificate_type,
      status: certificate.status
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this certificate?")) {
      await deleteCertificate(id);
    }
  };

  const handleReset = () => {
    setEditingCertificate(null);
    setShowAddForm(false);
    resetForm();
  };

  const handleSelectFranchise = (certificate: FranchiseCertificate) => {
    setSelectedFranchise(certificate);
    toast({
      title: "Franchise Selected",
      description: `Selected ${certificate.franchise_name} for certificate generation`,
    });
  };

  const handlePrintCertificate = () => {
    if (!selectedFranchise) {
      toast({
        title: "Error",
        description: "Please select a franchise first",
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

    if (!certificateRef.current) {
      toast({
        title: "Error",
        description: "Certificate template not found",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsGeneratingPDF(true);
      
      toast({
        title: "Generating PDF",
        description: "Creating Professional Certificate PDF...",
      });

      await new Promise((resolve) => setTimeout(resolve, 400));

      const element = certificateRef.current;

      const canvas = await html2canvas(element, {
        scale: Math.min(3, window.devicePixelRatio * 2),
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const a4Width = 595.28;
      const a4Height = 841.89;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [a4Width, a4Height],
        compress: true
      });

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const margin = 40;
      const availableWidth = a4Width - (margin * 2);
      const availableHeight = a4Height - (margin * 2);

      const scaleWidth = availableWidth / imgWidth;
      const scaleHeight = availableHeight / imgHeight;
      const scale = Math.min(scaleWidth, scaleHeight);

      const scaledWidth = imgWidth * scale;
      const scaledHeight = imgHeight * scale;

      const xOffset = margin + (availableWidth - scaledWidth) / 2;
      const yOffset = margin + (availableHeight - scaledHeight) / 2;

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', xOffset, yOffset, scaledWidth, scaledHeight);

      const sanitizedName = selectedFranchise.franchise_name.replace(/[^a-z0-9]/gi, '_');
      const currentDate = new Date().toISOString().split('T')[0];
      const fileName = `${sanitizedName}_Certificate_${currentDate}.pdf`;

      pdf.save(fileName);

      toast({
        title: "Success",
        description: "Professional Certificate PDF generated successfully!",
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
              <Award className="h-8 w-8 text-primary" />
            </div>
            <span>Generate Franchise Certificate</span>
          </h1>
          <Button 
            onClick={generateProfessionalPDF}
            disabled={!selectedFranchise || isGeneratingPDF}
            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-elegant px-8 py-3 text-base"
          >
            <FileDown className="h-5 w-5 mr-2" />
            {isGeneratingPDF ? "Generating PDF..." : "Generate Professional PDF"}
          </Button>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm font-medium">Total Certificates</p>
                  <p className="text-3xl font-bold">{certificates.length}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <Award className="h-6 w-6" />
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
                  <p className="text-accent-foreground/80 text-sm font-medium">Search Results</p>
                  <p className="text-3xl font-bold">{filteredCertificates.length}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <Search className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-muted to-muted/80 text-muted-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground/80 text-sm font-medium">Certificate Type</p>
                  <p className="text-xl font-bold text-foreground">{selectedFranchise ? selectedFranchise.certificate_type : 'None'}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <FileText className="h-6 w-6 text-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter Section */}
        <Card className="shadow-elegant border-border/50">
          <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-foreground flex items-center space-x-2">
                <Search className="h-5 w-5 text-primary" />
                <span>Search & Manage Certificates</span>
              </CardTitle>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Certificate
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex gap-4 items-end mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Search by Franchise ID, Name, or Centre Head
                </label>
                <Input 
                  type="text" 
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full"
                  placeholder="Enter search term..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Filter by Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="revoked">Revoked</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certificate List */}
        {loading ? (
          <Card className="shadow-elegant border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-elegant border-border/50">
            <CardHeader className="bg-gradient-to-r from-secondary/10 to-accent/10 border-b border-border/50">
              <CardTitle className="text-xl font-semibold text-foreground flex items-center space-x-2">
                <Users className="h-5 w-5 text-secondary" />
                <span>Franchise Certificates ({filteredCertificates.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4">
                {filteredCertificates.map((certificate) => (
                  <div
                    key={certificate.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/10 transition-colors"
                  >
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold text-foreground">{certificate.franchise_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ID: {certificate.franchise_id} | Head: {certificate.centre_head}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Certificate: {certificate.certificate_number} | Location: {certificate.location}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Valid: {certificate.valid_from} to {certificate.valid_to}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={certificate.status === 'active' ? 'default' : 'secondary'}
                        className={certificate.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {certificate.status}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(certificate)}
                        className="hover:bg-secondary/10"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleSelectFranchise(certificate)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Select & Preview
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(certificate.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {filteredCertificates.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No certificates found. {searchValue && "Try adjusting your search criteria or "}
                    <Button variant="link" onClick={() => setShowAddForm(true)} className="p-0">
                      create a new certificate
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="shadow-elegant border-border/50">
            <CardHeader className="bg-gradient-to-r from-accent/10 to-primary/10 border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-foreground flex items-center space-x-2">
                  <Plus className="h-5 w-5 text-accent" />
                  <span>{editingCertificate ? 'Edit' : 'Add'} Certificate</span>
                </CardTitle>
                <Button variant="outline" onClick={handleReset}>
                  Cancel
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Franchise ID *
                  </label>
                  <Input
                    type="text"
                    name="franchise_id"
                    value={formData.franchise_id}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter franchise ID"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Franchise Name *
                  </label>
                  <Input
                    type="text"
                    name="franchise_name"
                    value={formData.franchise_name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter franchise name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Centre Head *
                  </label>
                  <Input
                    type="text"
                    name="centre_head"
                    value={formData.centre_head}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter centre head name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Certificate Number
                  </label>
                  <Input
                    type="text"
                    name="certificate_number"
                    value={formData.certificate_number}
                    onChange={handleInputChange}
                    placeholder="Auto-generated if empty"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Valid From
                  </label>
                  <Input
                    type="date"
                    name="valid_from"
                    value={formData.valid_from}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Valid To
                  </label>
                  <Input
                    type="date"
                    name="valid_to"
                    value={formData.valid_to}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Operating Area
                  </label>
                  <Input
                    type="text"
                    name="operating_area"
                    value={formData.operating_area}
                    onChange={handleInputChange}
                    placeholder="Enter operating area"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Location
                  </label>
                  <Input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Registration Number
                  </label>
                  <Input
                    type="text"
                    name="registration_number"
                    value={formData.registration_number}
                    onChange={handleInputChange}
                    placeholder="Enter registration number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Certificate Type
                  </label>
                  <select
                    name="certificate_type"
                    value={formData.certificate_type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="Franchise Authorization">Franchise Authorization</option>
                    <option value="Renewal Certificate">Renewal Certificate</option>
                    <option value="Temporary Certificate">Temporary Certificate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="expired">Expired</option>
                    <option value="revoked">Revoked</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={!!actionLoading}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {actionLoading ? "Processing..." : (editingCertificate ? "Update Certificate" : "Create Certificate")}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Certificate Preview */}
        {selectedFranchise && (
          <Card className="shadow-elegant border-border/50">
            <CardHeader className="bg-gradient-to-r from-accent/10 to-primary/10 border-b border-border/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-foreground flex items-center space-x-2">
                  <Award className="h-5 w-5 text-accent" />
                  <span>Certificate Preview</span>
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handlePrintCertificate}
                    className="hover:bg-secondary/10"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div 
                ref={certificateRef}
                className="bg-gradient-to-br from-background to-accent/5 border-2 border-primary/20 rounded-lg p-12 text-center space-y-8 shadow-inner"
                style={{ minHeight: '800px' }}
              >
                {/* Certificate Header */}
                <div className="space-y-4">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Award className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold text-primary mb-2">
                    FRANCHISE CERTIFICATE
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Takniki Vikas Prashishan Sansthan
                  </p>
                </div>

                <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>

                {/* Certificate Content */}
                <div className="space-y-6 text-xl leading-relaxed text-foreground">
                  <p className="text-2xl font-semibold text-primary">
                    This is to certify that
                  </p>
                  
                  <p className="text-3xl font-bold text-foreground bg-accent/10 py-4 px-8 rounded-lg">
                    {selectedFranchise.franchise_name}
                  </p>
                  
                  <p>has been appointed as an authorized franchise by</p>
                  
                  <p className="text-2xl font-bold text-primary">
                    Takniki Vikas Prashishan Sansthan
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                    <div className="space-y-2">
                      <p><strong>From:</strong> {selectedFranchise.valid_from}</p>
                      <p><strong>To:</strong> {selectedFranchise.valid_to}</p>
                    </div>
                    <div className="space-y-2">
                      <p><strong>Operating in:</strong> {selectedFranchise.operating_area}</p>
                      <p><strong>Located at:</strong> {selectedFranchise.location}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mt-12">
                    <p className="text-lg">
                      <strong>Certificate Number:</strong> {selectedFranchise.certificate_number}
                    </p>
                    <p className="text-lg">
                      <strong>Authorized Registration No.:</strong> {selectedFranchise.registration_number}
                    </p>
                    <p className="text-lg">
                      <strong>Issue Date:</strong> {selectedFranchise.issue_date}
                    </p>
                  </div>
                </div>

                <div className="w-32 h-1 bg-gradient-to-r from-secondary to-primary mx-auto"></div>

                {/* Certificate Footer */}
                <div className="flex justify-between items-end mt-16 pt-8">
                  <div className="text-center">
                    <div className="w-48 h-0.5 bg-border mb-2"></div>
                    <p className="text-sm text-muted-foreground">Authorized Signature</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle className="h-12 w-12 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Official Seal</p>
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

export default GenerateFranchiseCertificateContent;