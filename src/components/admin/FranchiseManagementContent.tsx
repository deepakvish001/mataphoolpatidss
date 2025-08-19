import { useState } from "react";
import { Edit, Plus, Trash2, Building2, RefreshCw, Loader2, Users, TrendingUp, Calendar, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { toast } from "sonner";
import { AdminPresenceIndicator } from "./AdminPresenceIndicator";

interface Franchise {
  id: string;
  franchise_id: string;
  password: string;
  center_name: string;
  mobile: string;
  email: string;
  center_head: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

const FranchiseManagementContent = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFranchise, setEditingFranchise] = useState<Franchise | null>(null);
  const [formData, setFormData] = useState({
    franchiseId: "",
    password: "",
    centerName: "",
    mobile: "",
    email: "",
    centerHead: "",
    status: "active" as "active" | "inactive"
  });
  const [formLoading, setFormLoading] = useState(false);

  const { data: franchises, loading, create, update, delete: deleteFranchise } = useOptimisticCrud<Franchise>({
    tableName: 'franchises',
    orderBy: { column: 'created_at', ascending: false }
  });

  useAdminRealTime({
    tableName: 'franchises'
  });

  // Statistics calculations
  const totalFranchises = franchises.length;
  const activeFranchises = franchises.filter(f => f.status === 'active').length;
  const inactiveFranchises = franchises.filter(f => f.status === 'inactive').length;
  const currentMonth = new Date().toISOString().slice(0, 7);
  const thisMonthFranchises = franchises.filter(f => 
    f.created_at && f.created_at.slice(0, 7) === currentMonth
  ).length;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      franchiseId: "",
      password: "",
      centerName: "",
      mobile: "",
      email: "",
      centerHead: "",
      status: "active"
    });
    setEditingFranchise(null);
  };

  const openEditDialog = (franchise: Franchise) => {
    setEditingFranchise(franchise);
    setFormData({
      franchiseId: franchise.franchise_id,
      password: franchise.password,
      centerName: franchise.center_name,
      mobile: franchise.mobile,
      email: franchise.email,
      centerHead: franchise.center_head,
      status: franchise.status
    });
    setIsDialogOpen(true);
  };

  const validateForm = () => {
    if (!formData.franchiseId.trim()) {
      toast.error("Franchise ID is required");
      return false;
    }
    if (!formData.centerName.trim()) {
      toast.error("Center name is required");
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Valid email is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setFormLoading(true);
    try {
      const franchiseData = {
        franchise_id: formData.franchiseId,
        password: formData.password,
        center_name: formData.centerName,
        mobile: formData.mobile,
        email: formData.email,
        center_head: formData.centerHead,
        status: formData.status
      };

      if (editingFranchise) {
        await update(editingFranchise.id, franchiseData);
        toast.success("🎉 Franchise updated instantly!");
      } else {
        await create(franchiseData);
        toast.success("🎉 Franchise added instantly!");
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      // Error handled by hook
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("⚠️ Are you sure you want to delete this franchise?")) return;
    
    try {
      await deleteFranchise(id);
      toast.success("🗑️ Franchise deleted instantly!");
    } catch (error) {
      // Error handled by hook
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading franchise data...</p>
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
            Franchise Management
          </h1>
          <p className="text-muted-foreground mt-1">Manage and oversee all franchise operations</p>
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
                <p className="text-sm font-medium text-muted-foreground">Total Franchises</p>
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
                <p className="text-sm font-medium text-muted-foreground">Active Franchises</p>
                <p className="text-2xl font-bold text-foreground">{activeFranchises}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/10" />
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inactive Franchises</p>
                <p className="text-2xl font-bold text-foreground">{inactiveFranchises}</p>
              </div>
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
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
            <CardTitle className="text-xl font-semibold">Franchise List</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {franchises.length} total franchises
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Franchise
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingFranchise ? "Edit Franchise" : "Add New Franchise"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Franchise ID *</label>
                    <Input
                      value={formData.franchiseId}
                      onChange={(e) => handleInputChange('franchiseId', e.target.value)}
                      placeholder="Enter franchise ID"
                      disabled={formLoading}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <Input
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="Enter password"
                      disabled={formLoading}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Center Name *</label>
                  <Input
                    value={formData.centerName}
                    onChange={(e) => handleInputChange('centerName', e.target.value)}
                    placeholder="Enter center name"
                    disabled={formLoading}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Mobile *</label>
                    <Input
                      value={formData.mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      placeholder="Enter mobile number"
                      disabled={formLoading}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter email"
                      disabled={formLoading}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Center Head</label>
                  <Input
                    value={formData.centerHead}
                    onChange={(e) => handleInputChange('centerHead', e.target.value)}
                    placeholder="Enter center head name"
                    disabled={formLoading}
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={formLoading}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} disabled={formLoading} className="bg-primary hover:bg-primary/90">
                    {formLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    {editingFranchise ? "Update" : "Create"} Franchise
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-700">
                  <TableHead className="text-white font-semibold">Actions</TableHead>
                  <TableHead className="text-white font-semibold">Franchise ID</TableHead>
                  <TableHead className="text-white font-semibold">Center Name</TableHead>
                  <TableHead className="text-white font-semibold">Contact</TableHead>
                  <TableHead className="text-white font-semibold">Center Head</TableHead>
                  <TableHead className="text-white font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {franchises.map((franchise, index) => (
                  <TableRow 
                    key={franchise.id} 
                    className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}
                  >
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(franchise)}
                          className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(franchise.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{franchise.franchise_id}</TableCell>
                    <TableCell className="font-medium">{franchise.center_name}</TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center text-muted-foreground">
                          <span className="text-xs mr-1">📞</span>
                          {franchise.mobile}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <span className="text-xs mr-1">✉️</span>
                          {franchise.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{franchise.center_head}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={franchise.status === 'active' ? 'default' : 'secondary'}
                        className={franchise.status === 'active' 
                          ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                        }
                      >
                        {franchise.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {franchises.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No franchises found</h3>
              <p className="text-muted-foreground mb-4">Get started by creating your first franchise.</p>
              <Button onClick={() => {resetForm(); setIsDialogOpen(true);}} className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add First Franchise
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FranchiseManagementContent;