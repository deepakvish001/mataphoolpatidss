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
    <div className="space-y-8">
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Enquiries</p>
                <p className="text-3xl font-bold">{totalEnquiries}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <HelpCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Unique States</p>
                <p className="text-3xl font-bold">{uniqueStates}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <MapPin className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">With Organizations</p>
                <p className="text-3xl font-bold">{enquiriesWithOrganizations}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Building className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Recent Enquiries</p>
                <p className="text-3xl font-bold">{recentEnquiries}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Enquiry Table */}
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="text-xl font-bold flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <HelpCircle className="h-5 w-5" />
              </div>
              <span>Enquiry Management ({filteredEnquiries.length} items)</span>
            </CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search enquiries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/90 border-white/20 focus:border-white focus:ring-white/20"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Name</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Email</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Phone</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Location</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Organization</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Address</TableHead>
                  <TableHead className="text-white font-bold text-center py-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      {searchTerm ? "No enquiries found matching your search." : "No enquiries submitted yet."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEnquiries.map((enquiry, index) => (
                    <TableRow key={enquiry.id} className={`${index % 2 === 0 ? "bg-blue-50/50" : "bg-white"} hover:bg-blue-100/50 transition-colors`}>
                      <TableCell className="p-4 border-r border-gray-200">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-gray-800">
                            {enquiry.first_name} {enquiry.last_name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex items-center justify-center space-x-2">
                          <Mail className="h-4 w-4 text-green-600" />
                          <span className="text-gray-700">{enquiry.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex items-center justify-center space-x-2">
                          <Phone className="h-4 w-4 text-purple-600" />
                          <span className="text-gray-700">{enquiry.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex items-center justify-center space-x-2">
                          <MapPin className="h-4 w-4 text-orange-600" />
                          <span className="text-gray-700">
                            {enquiry.city ? `${enquiry.city}, ${enquiry.state}` : enquiry.state}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex items-center justify-center space-x-2">
                          <Building className="h-4 w-4 text-indigo-600" />
                          <span className="text-gray-700">{enquiry.organization || "-"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <span className="text-gray-700 max-w-xs truncate block">
                          {enquiry.address || "-"}
                        </span>
                      </TableCell>
                      <TableCell className="text-center p-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(enquiry.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
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

      {/* Pagination */}
      <div className="flex justify-center">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 rounded-lg text-white font-medium shadow-lg">
          Page {Math.ceil(filteredEnquiries.length / 10) || 1}
        </div>
      </div>
    </div>
  );
};

export default EnquiryContent;