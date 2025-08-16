import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HelpCircle, Trash2, Loader2, Search, Users, Calendar, MapPin, Building, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface Enquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  state: string;
  city?: string;
  organization?: string;
  address?: string;
}

const EnquiryContent = () => {
  const {
    data: enquiries,
    loading,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<Enquiry>({ tableName: 'enquiries' });

  useAdminRealTime({
    tableName: 'enquiries'
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Filtered enquiries based on search
  const filteredEnquiries = enquiries.filter(enquiry =>
    enquiry.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquiry.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquiry.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enquiry.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (enquiry.city && enquiry.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (enquiry.organization && enquiry.organization.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate statistics
  const totalEnquiries = enquiries.length;
  const recentEnquiries = enquiries.slice(-5).length; // Last 5 enquiries
  const enquiriesWithOrganizations = enquiries.filter(enquiry => enquiry.organization && enquiry.organization.trim() !== "").length;
  const uniqueStates = [...new Set(enquiries.map(enquiry => enquiry.state))].length;

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success("Enquiry deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete enquiry");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading enquiries...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/50 to-primary/5 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl mb-4 shadow-lg">
            <HelpCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/90 to-accent bg-clip-text text-transparent">
            Enquiry Management
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive dashboard for tracking and managing customer enquiries and business prospects
          </p>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-primary-foreground/80 text-sm font-medium">Total Enquiries</p>
                  <p className="text-3xl font-bold">{totalEnquiries}</p>
                  <div className="h-1 w-12 bg-primary-foreground/30 rounded-full">
                    <div className="h-full w-8 bg-primary-foreground rounded-full" />
                  </div>
                </div>
                <div className="p-3 bg-primary-foreground/20 rounded-xl backdrop-blur-sm">
                  <HelpCircle className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-accent via-accent/90 to-accent/80 text-accent-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-accent-foreground/80 text-sm font-medium">Unique States</p>
                  <p className="text-3xl font-bold">{uniqueStates}</p>
                  <div className="h-1 w-12 bg-accent-foreground/30 rounded-full">
                    <div className="h-full w-6 bg-accent-foreground rounded-full" />
                  </div>
                </div>
                <div className="p-3 bg-accent-foreground/20 rounded-xl backdrop-blur-sm">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80 text-secondary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-secondary-foreground/80 text-sm font-medium">With Organizations</p>
                  <p className="text-3xl font-bold">{enquiriesWithOrganizations}</p>
                  <div className="h-1 w-12 bg-secondary-foreground/30 rounded-full">
                    <div className="h-full w-10 bg-secondary-foreground rounded-full" />
                  </div>
                </div>
                <div className="p-3 bg-secondary-foreground/20 rounded-xl backdrop-blur-sm">
                  <Building className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-destructive via-destructive/90 to-destructive/80 text-destructive-foreground shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-destructive-foreground/80 text-sm font-medium">Recent Enquiries</p>
                  <p className="text-3xl font-bold">{recentEnquiries}</p>
                  <div className="h-1 w-12 bg-destructive-foreground/30 rounded-full">
                    <div className="h-full w-7 bg-destructive-foreground rounded-full" />
                  </div>
                </div>
                <div className="p-3 bg-destructive-foreground/20 rounded-xl backdrop-blur-sm">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Enquiry Table */}
        <Card className="border-0 bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-primary-foreground p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <CardTitle className="text-2xl font-bold flex items-center gap-4">
                <div className="p-3 bg-primary-foreground/20 rounded-xl backdrop-blur-sm">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <div>
                  <span>Enquiry Management</span>
                  <p className="text-sm font-normal text-primary-foreground/80 mt-1">
                    {filteredEnquiries.length} enquir{filteredEnquiries.length !== 1 ? 'ies' : 'y'} found
                  </p>
                </div>
              </CardTitle>
              <div className="relative w-full lg:w-80">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-foreground/60" />
                <Input
                  placeholder="Search enquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-primary-foreground/40 focus:ring-primary-foreground/20 h-12"
                />
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-muted via-muted/80 to-muted/60 hover:from-muted/90 hover:to-muted/70 border-none">
                    <TableHead className="text-foreground font-bold text-center py-6 border-r border-border/50 bg-muted/50">Name</TableHead>
                    <TableHead className="text-foreground font-bold text-center py-6 border-r border-border/50 bg-muted/50">Email</TableHead>
                    <TableHead className="text-foreground font-bold text-center py-6 border-r border-border/50 bg-muted/50">Phone</TableHead>
                    <TableHead className="text-foreground font-bold text-center py-6 border-r border-border/50 bg-muted/50">Location</TableHead>
                    <TableHead className="text-foreground font-bold text-center py-6 border-r border-border/50 bg-muted/50">Organization</TableHead>
                    <TableHead className="text-foreground font-bold text-center py-6 border-r border-border/50 bg-muted/50">Address</TableHead>
                    <TableHead className="text-foreground font-bold text-center py-6 bg-muted/50">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEnquiries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-16">
                        <div className="space-y-6">
                          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-muted via-muted/80 to-muted/60 rounded-2xl flex items-center justify-center">
                            {searchTerm ? (
                              <Search className="w-10 h-10 text-muted-foreground/50" />
                            ) : (
                              <HelpCircle className="w-10 h-10 text-muted-foreground/50" />
                            )}
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-foreground">
                              {searchTerm ? "No enquiries found" : "No enquiries yet"}
                            </h3>
                            <p className="text-muted-foreground">
                              {searchTerm ? "Try adjusting your search terms to find what you're looking for." : "Customer enquiries will appear here once they start coming in."}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEnquiries.map((enquiry, index) => (
                      <TableRow key={enquiry.id} className={`group transition-all duration-200 hover:bg-muted/30 ${index % 2 === 0 ? "bg-background" : "bg-muted/10"}`}>
                        <TableCell className="p-6 border-r border-border/30">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                              <Users className="w-4 h-4 text-primary" />
                            </div>
                            <span className="font-semibold text-foreground">
                              {enquiry.first_name} {enquiry.last_name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center p-6 border-r border-border/30">
                          <div className="flex items-center justify-center gap-3">
                            <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                              <Mail className="w-4 h-4 text-accent" />
                            </div>
                            <span className="text-muted-foreground">{enquiry.email}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center p-6 border-r border-border/30">
                          <div className="flex items-center justify-center gap-3">
                            <div className="p-2 bg-secondary/10 rounded-lg group-hover:bg-secondary/20 transition-colors">
                              <Phone className="w-4 h-4 text-secondary" />
                            </div>
                            <span className="text-muted-foreground">{enquiry.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center p-6 border-r border-border/30">
                          <div className="flex items-center justify-center gap-3">
                            <div className="p-2 bg-destructive/10 rounded-lg group-hover:bg-destructive/20 transition-colors">
                              <MapPin className="w-4 h-4 text-destructive" />
                            </div>
                            <span className="text-muted-foreground">
                              {enquiry.city ? `${enquiry.city}, ${enquiry.state}` : enquiry.state}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center p-6 border-r border-border/30">
                          <div className="flex items-center justify-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                              <Building className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-muted-foreground">{enquiry.organization || "-"}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center p-6 border-r border-border/30">
                          <span className="text-muted-foreground max-w-xs truncate block">
                            {enquiry.address || "-"}
                          </span>
                        </TableCell>
                        <TableCell className="text-center p-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(enquiry.id)}
                            className="text-destructive hover:text-destructive-foreground hover:bg-destructive/20 p-3 rounded-xl transition-all duration-200 hover:scale-110"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnquiryContent;