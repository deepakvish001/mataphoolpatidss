import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Printer, FileText, Calendar, Building, Users, Download } from "lucide-react";

interface FranchiseData {
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
}

const FranchiseRegPrintContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState("all");
  const [selectedFranchise, setSelectedFranchise] = useState<FranchiseData | null>(null);

  // Sample franchise data for printing
  const franchiseData = [
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
      status: "active"
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
      status: "active"
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
      status: "pending"
    }
  ];

  // Filter and search functionality
  const filteredData = useMemo(() => {
    let filtered = franchiseData;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.instituteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.centreHead.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply state filter
    if (filterState !== "all") {
      filtered = filtered.filter(item => item.state === filterState);
    }

    return filtered;
  }, [searchTerm, filterState]);

  const states = [...new Set(franchiseData.map(item => item.state))];

  const handlePrintReceipt = (franchise: any) => {
    setSelectedFranchise(franchise);
    // Print logic would go here
    console.log("Printing receipt for:", franchise);
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
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm font-medium">Total Franchises</p>
                  <p className="text-3xl font-bold">{franchiseData.length}</p>
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
                  <p className="text-accent-foreground/80 text-sm font-medium">Active Franchises</p>
                  <p className="text-3xl font-bold">
                    {franchiseData.filter(item => item.status === 'active').length}
                  </p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-foreground/80 text-sm font-medium">This Month</p>
                  <p className="text-3xl font-bold">
                    {franchiseData.filter(item => {
                      const itemDate = new Date(item.dateOfRegistration);
                      const currentMonth = new Date().getMonth();
                      return itemDate.getMonth() === currentMonth;
                    }).length}
                  </p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-muted to-muted/80 text-muted-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground/80 text-sm font-medium">Filtered Results</p>
                  <p className="text-3xl font-bold text-foreground">{filteredData.length}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <Filter className="h-6 w-6 text-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by franchise name, ID, or centre head..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-border/40 bg-background focus:border-primary/50 focus:ring-primary/20"
                />
              </div>
              <div className="w-full md:w-64">
                <Select value={filterState} onValueChange={setFilterState}>
                  <SelectTrigger className="border-border/40 bg-background focus:border-primary/50 focus:ring-primary/20">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by state" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/40">
                    <SelectItem value="all" className="hover:bg-accent/50">All States</SelectItem>
                    {states.map((state) => (
                      <SelectItem key={state} value={state} className="hover:bg-accent/50">
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Franchise List Table */}
        <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-primary-foreground p-8">
            <CardTitle className="text-2xl font-bold flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-background/20 rounded-lg backdrop-blur-sm">
                  <Building className="h-6 w-6" />
                </div>
                <span>Franchise Records ({filteredData.length})</span>
              </div>
              <Badge className="bg-background/20 text-primary-foreground border-background/30">
                Total: {franchiseData.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="border border-border/40 rounded-lg bg-background/50 overflow-hidden shadow-inner">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-primary-foreground">
                      <th className="border-r border-primary/30 px-6 py-4 text-sm font-bold text-left min-w-[120px]">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Franchise ID
                        </div>
                      </th>
                      <th className="border-r border-primary/30 px-6 py-4 text-sm font-bold text-left min-w-[250px]">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          Institute Name
                        </div>
                      </th>
                      <th className="border-r border-primary/30 px-6 py-4 text-sm font-bold text-left min-w-[150px]">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Centre Head
                        </div>
                      </th>
                      <th className="border-r border-primary/30 px-6 py-4 text-sm font-bold text-left min-w-[120px]">
                        Location
                      </th>
                      <th className="border-r border-primary/30 px-6 py-4 text-sm font-bold text-left min-w-[120px]">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Registration Date
                        </div>
                      </th>
                      <th className="border-r border-primary/30 px-6 py-4 text-sm font-bold text-center min-w-[100px]">
                        Status
                      </th>
                      <th className="px-6 py-4 text-sm font-bold text-center min-w-[120px]">
                        <div className="flex items-center justify-center gap-2">
                          <Printer className="h-4 w-4" />
                          Actions
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((franchise, index) => (
                      <tr 
                        key={franchise.id}
                        className={`${
                          index % 2 === 0 
                            ? 'bg-background/80' 
                            : 'bg-accent/20'
                        } hover:bg-accent/30 transition-all duration-200 border-b border-border/30`}
                      >
                        <td className="border-r border-border/30 px-6 py-4">
                          <div className="font-semibold text-primary">{franchise.id}</div>
                        </td>
                        <td className="border-r border-border/30 px-6 py-4">
                          <div className="font-medium text-foreground">{franchise.instituteName}</div>
                        </td>
                        <td className="border-r border-border/30 px-6 py-4">
                          <div className="text-muted-foreground">{franchise.centreHead}</div>
                        </td>
                        <td className="border-r border-border/30 px-6 py-4">
                          <div className="text-sm text-muted-foreground">
                            {franchise.city}, {franchise.state}
                          </div>
                        </td>
                        <td className="border-r border-border/30 px-6 py-4">
                          <div className="text-sm text-muted-foreground">
                            {new Date(franchise.dateOfRegistration).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="border-r border-border/30 px-6 py-4 text-center">
                          <Badge 
                            variant={franchise.status === 'active' ? 'default' : 'secondary'}
                            className={franchise.status === 'active' 
                              ? "bg-green-100 text-green-800 hover:bg-green-200" 
                              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                            }
                          >
                            {franchise.status.charAt(0).toUpperCase() + franchise.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <Button 
                            onClick={() => handlePrintReceipt(franchise)}
                            className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg px-4 py-2"
                            size="sm"
                          >
                            <Printer className="h-4 w-4 mr-2" />
                            Print
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredData.length === 0 && (
                  <div className="text-center py-12 bg-background/50">
                    <Printer className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No franchises found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm || filterState !== "all" 
                        ? "Try adjusting your search or filter criteria"
                        : "No franchise registrations available for printing"
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Print Preview Section */}
        {selectedFranchise && (
          <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-secondary via-secondary/95 to-secondary/90 text-secondary-foreground p-8">
              <CardTitle className="text-2xl font-bold flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-background/20 rounded-lg backdrop-blur-sm">
                    <FileText className="h-6 w-6" />
                  </div>
                  <span>Print Preview - {selectedFranchise.id}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-background/20 text-secondary-foreground border-background/30 hover:bg-background/30"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-8">
              {/* Institute Header */}
              <div className="text-center mb-8 space-y-2">
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-primary/10 border-4 border-primary/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xs font-bold text-primary">B.Soft</div>
                    </div>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-primary">B. Soft Computer & Technical Institute</h2>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  Near Union Bank Of India Bina Soft Educational & Welfare Society Vill & Post BILARIYAGAN J, AZAMGARH-276121
                </p>
                <p className="text-sm text-muted-foreground">infobinasoft@gmail.com</p>
              </div>

              {/* Print Form */}
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold underline text-foreground">Franchise Registration Print</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-4">
                    <div className="flex border-b border-border/30 pb-2">
                      <span className="font-medium w-40 text-foreground">Franchise ID:</span>
                      <span className="text-muted-foreground">{selectedFranchise.id}</span>
                    </div>
                    <div className="flex border-b border-border/30 pb-2">
                      <span className="font-medium w-40 text-foreground">State Name:</span>
                      <span className="text-muted-foreground">{selectedFranchise.state}</span>
                    </div>
                    <div className="flex border-b border-border/30 pb-2">
                      <span className="font-medium w-40 text-foreground">District Name:</span>
                      <span className="text-muted-foreground">{selectedFranchise.district}</span>
                    </div>
                    <div className="flex border-b border-border/30 pb-2">
                      <span className="font-medium w-40 text-foreground">City/Town/Village:</span>
                      <span className="text-muted-foreground">{selectedFranchise.city}</span>
                    </div>
                    <div className="flex border-b border-border/30 pb-2">
                      <span className="font-medium w-40 text-foreground">Pin Code:</span>
                      <span className="text-muted-foreground">{selectedFranchise.pinCode}</span>
                    </div>
                    <div className="flex border-b border-border/30 pb-2">
                      <span className="font-medium w-40 text-foreground">Registration Date:</span>
                      <span className="text-muted-foreground">{new Date(selectedFranchise.dateOfRegistration).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex border-b border-border/30 pb-2">
                      <span className="font-medium w-40 text-foreground">Institute Name:</span>
                      <span className="text-muted-foreground">{selectedFranchise.instituteName}</span>
                    </div>
                    <div className="flex border-b border-border/30 pb-2">
                      <span className="font-medium w-40 text-foreground">Year of Establishment:</span>
                      <span className="text-muted-foreground">{selectedFranchise.yearEstablishment}</span>
                    </div>
                    <div className="flex border-b border-border/30 pb-2">
                      <span className="font-medium w-40 text-foreground">Centre Head:</span>
                      <span className="text-muted-foreground">{selectedFranchise.centreHead}</span>
                    </div>
                    <div className="flex border-b border-border/30 pb-2">
                      <span className="font-medium w-40 text-foreground">Designation:</span>
                      <span className="text-muted-foreground">{selectedFranchise.designation}</span>
                    </div>
                    <div className="flex border-b border-border/30 pb-2">
                      <span className="font-medium w-40 text-foreground">Email Address:</span>
                      <span className="text-muted-foreground">{selectedFranchise.email}</span>
                    </div>
                    <div className="flex border-b border-border/30 pb-2">
                      <span className="font-medium w-40 text-foreground">Phone:</span>
                      <span className="text-muted-foreground">{selectedFranchise.phone}</span>
                    </div>
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