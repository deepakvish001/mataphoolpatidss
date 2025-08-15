import { useState } from "react";
import { Edit, Plus, Trash2, Building2, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { toast } from "sonner";

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
    <div className="space-y-8">
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span>Franchise Management</span>
            </CardTitle>
            <div className="flex space-x-3">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm} className="bg-gradient-to-r from-green-600 to-green-700">
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
                        <label className="text-sm font-medium text-gray-700">Franchise ID *</label>
                        <Input
                          value={formData.franchiseId}
                          onChange={(e) => handleInputChange('franchiseId', e.target.value)}
                          placeholder="Enter franchise ID"
                          disabled={formLoading}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <Input
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          placeholder="Enter password"
                          disabled={formLoading}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Center Name *</label>
                      <Input
                        value={formData.centerName}
                        onChange={(e) => handleInputChange('centerName', e.target.value)}
                        placeholder="Enter center name"
                        disabled={formLoading}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Mobile *</label>
                        <Input
                          value={formData.mobile}
                          onChange={(e) => handleInputChange('mobile', e.target.value)}
                          placeholder="Enter mobile number"
                          disabled={formLoading}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Email *</label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter email"
                          disabled={formLoading}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Center Head</label>
                      <Input
                        value={formData.centerHead}
                        onChange={(e) => handleInputChange('centerHead', e.target.value)}
                        placeholder="Enter center head name"
                        disabled={formLoading}
                      />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={formLoading}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit} disabled={formLoading}>
                        {formLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        {editingFranchise ? "Update" : "Create"} Franchise
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">Total records: {franchises.length}</p>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600">
                  <TableHead className="text-white font-bold">Actions</TableHead>
                  <TableHead className="text-white font-bold">Franchise ID</TableHead>
                  <TableHead className="text-white font-bold">Center Name</TableHead>
                  <TableHead className="text-white font-bold">Contact</TableHead>
                  <TableHead className="text-white font-bold">Center Head</TableHead>
                  <TableHead className="text-white font-bold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {franchises.map((franchise, index) => (
                  <TableRow key={franchise.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <TableCell className="p-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(franchise)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(franchise.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="p-4 font-medium">{franchise.franchise_id}</TableCell>
                    <TableCell className="p-4 font-medium">{franchise.center_name}</TableCell>
                    <TableCell className="p-4">
                      <div className="text-sm space-y-1">
                        <div>📞 {franchise.mobile}</div>
                        <div>✉️ {franchise.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="p-4 font-medium">{franchise.center_head}</TableCell>
                    <TableCell className="p-4">
                      <Badge className={franchise.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {franchise.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FranchiseManagementContent;