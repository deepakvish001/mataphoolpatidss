import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { Loader2, Building2, CheckCircle, Clock, TrendingUp, Calendar, Search } from "lucide-react";
import { toast } from "sonner";
import { AdminPresenceIndicator } from "./AdminPresenceIndicator";
import { useState } from "react";

interface FranchiseRegistration {
  id: string;
  institute_full_name: string;
  institute_sort_name: string;
  centre_head_name: string;
  email: string;
  mobile_number: string;
  state_name: string;
  district_name: string;
  postal_address: string;
  pin_code: string;
  approval_status: string;
  status: string;
  date_of_registration: string;
  franchise_type: string;
  year_of_establishment: string;
  created_at: string;
  updated_at: string;
}

const FranchiseApprovalContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { 
    data: franchiseData, 
    loading, 
    update,
    delete: deleteItem,
    create,
    refresh 
  } = useOptimisticCrud<FranchiseRegistration>({
    tableName: 'franchise_registrations',
    orderBy: { column: 'created_at', ascending: false }
  });

  // Enable real-time updates
  useAdminRealTime({
    tableName: 'franchise_registrations'
  });

  // Statistics calculations
  const totalFranchises = franchiseData.length;
  const approvedFranchises = franchiseData.filter(f => f.approval_status === 'approved').length;
  const pendingFranchises = franchiseData.filter(f => f.approval_status === 'pending').length;
  const currentMonth = new Date().toISOString().slice(0, 7);
  const thisMonthFranchises = franchiseData.filter(f => 
    f.created_at && f.created_at.slice(0, 7) === currentMonth
  ).length;

  // Filter franchises based on search term
  const filteredFranchises = franchiseData.filter(franchise =>
    franchise.institute_full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    franchise.centre_head_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    franchise.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    franchise.state_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    franchise.district_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprovalToggle = async (franchise: FranchiseRegistration) => {
    try {
      const newApprovalStatus = franchise.approval_status === 'approved' ? 'pending' : 'approved';
      await update(franchise.id, {
        ...franchise,
        approval_status: newApprovalStatus,
        status: newApprovalStatus === 'approved' ? 'active' : 'pending'
      });
      toast.success(`Franchise ${newApprovalStatus === 'approved' ? 'approved' : 'marked as pending'} successfully!`);
    } catch (error) {
      toast.error('Failed to update franchise approval status');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading franchise registrations...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Management of Franchise
          </h1>
          <p className="text-muted-foreground mt-1">Approve and manage franchise applications</p>
        </div>
        <AdminPresenceIndicator />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                <p className="text-2xl font-bold text-foreground">{totalFranchises}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/10" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-foreground">{approvedFranchises}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/10" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground">{pendingFranchises}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/10" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold text-foreground">{thisMonthFranchises}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-semibold">Franchise Applications</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredFranchises.length} applications shown
            </p>
          </div>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search franchises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-700">
                  <TableHead className="text-white font-semibold">Approval</TableHead>
                  <TableHead className="text-white font-semibold">Institute Details</TableHead>
                  <TableHead className="text-white font-semibold">Contact Info</TableHead>
                  <TableHead className="text-white font-semibold">Location</TableHead>
                  <TableHead className="text-white font-semibold">Type & Date</TableHead>
                  <TableHead className="text-white font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFranchises.map((franchise, index) => (
                  <TableRow 
                    key={franchise.id} 
                    className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}
                  >
                    <TableCell>
                      <div className="flex flex-col items-center space-y-2">
                        <Checkbox 
                          checked={franchise.approval_status === 'approved'} 
                          onCheckedChange={() => handleApprovalToggle(franchise)}
                        />
                        <Button
                          variant={franchise.approval_status === 'approved' ? 'destructive' : 'default'}
                          size="sm"
                          onClick={() => handleApprovalToggle(franchise)}
                          className="text-xs h-7"
                        >
                          {franchise.approval_status === 'approved' ? 'Revoke' : 'Approve'}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{franchise.institute_full_name}</div>
                        <div className="text-xs text-muted-foreground">Head: {franchise.centre_head_name}</div>
                        <div className="text-xs text-muted-foreground">Short: {franchise.institute_sort_name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <span className="text-xs mr-1">📧</span>
                          {franchise.email}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <span className="text-xs mr-1">📞</span>
                          {franchise.mobile_number}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="font-medium">{franchise.state_name}</div>
                        <div className="text-muted-foreground">{franchise.district_name}</div>
                        <div className="text-xs text-muted-foreground">{franchise.pin_code}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="font-medium">{franchise.franchise_type}</div>
                        <div className="text-muted-foreground">Est: {franchise.year_of_establishment}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(franchise.date_of_registration).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          franchise.approval_status === 'approved' ? 'default' : 
                          franchise.approval_status === 'rejected' ? 'destructive' : 'secondary'
                        }
                        className={
                          franchise.approval_status === 'approved' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                            : franchise.approval_status === 'rejected'
                            ? 'bg-red-100 text-red-800 hover:bg-red-100'
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                        }
                      >
                        {franchise.approval_status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredFranchises.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchTerm ? 'No matching franchises found' : 'No franchise applications found'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm 
                  ? 'Try adjusting your search criteria' 
                  : 'Franchise applications will appear here once submitted.'
                }
              </p>
              {searchTerm && (
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Clear Search
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FranchiseApprovalContent;