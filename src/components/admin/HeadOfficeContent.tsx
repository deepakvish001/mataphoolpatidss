import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  Building2, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  RefreshCw, 
  Loader2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  Star,
  Filter
} from "lucide-react";

interface HeadOffice {
  id: string;
  name: string | null;
  address: string;
  phone: string;
  email: string;
  website: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  is_primary: boolean;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

const HeadOfficeContent = () => {
  const { user } = useAuth();
  const [headOffices, setHeadOffices] = useState<HeadOffice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOffice, setEditingOffice] = useState<HeadOffice | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isPrimary: false,
    status: "active" as "active" | "inactive"
  });
  const [formLoading, setFormLoading] = useState(false);

  // Load head offices data
  const loadHeadOffices = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('head_offices')
        .select('*')
        .order('is_primary', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHeadOffices(data || []);
    } catch (error: any) {
      console.error('Error loading head offices:', error);
      toast.error("Failed to load head office data");
    } finally {
      setLoading(false);
    }
  };

  // Real-time subscription
  useEffect(() => {
    loadHeadOffices();

    const channel = supabase
      .channel('head-office-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'head_offices'
        },
        (payload: any) => {
          console.log('Head office change:', payload);
          
          if (payload.eventType === 'INSERT') {
            setHeadOffices(prev => [payload.new, ...prev]);
            toast.success("New head office added!");
          } else if (payload.eventType === 'UPDATE') {
            setHeadOffices(prev => 
              prev.map(office => 
                office.id === payload.new.id ? payload.new : office
              )
            );
            toast.success("Head office updated!");
          } else if (payload.eventType === 'DELETE') {
            setHeadOffices(prev => 
              prev.filter(office => office.id !== payload.old.id)
            );
            toast.success("Head office removed!");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Filter head offices
  const filteredOffices = headOffices.filter(office => {
    const matchesSearch = 
      office.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.phone.includes(searchTerm) ||
      office.city?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || office.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      phone: "",
      email: "",
      website: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      isPrimary: false,
      status: "active"
    });
    setEditingOffice(null);
  };

  const openEditDialog = (office: HeadOffice) => {
    setEditingOffice(office);
    setFormData({
      name: office.name || "",
      address: office.address,
      phone: office.phone,
      email: office.email,
      website: office.website || "",
      city: office.city || "",
      state: office.state || "",
      postalCode: office.postal_code || "",
      country: office.country || "India",
      isPrimary: office.is_primary,
      status: office.status
    });
    setIsDialogOpen(true);
  };

  const validateForm = () => {
    if (!formData.address.trim()) {
      toast.error("Address is required");
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setFormLoading(true);
    try {
      const officeData = {
        name: formData.name || null,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        website: formData.website || null,
        city: formData.city || null,
        state: formData.state || null,
        postal_code: formData.postalCode || null,
        country: formData.country,
        is_primary: formData.isPrimary,
        status: formData.status,
        updated_at: new Date().toISOString(),
        ...(editingOffice ? {} : { created_by: user?.id })
      };

      // If setting as primary, unset all other primary offices first
      if (formData.isPrimary) {
        await (supabase as any)
          .from('head_offices')
          .update({ is_primary: false })
          .neq('id', editingOffice?.id || '');
      }

      if (editingOffice) {
        // Update existing head office
        const { error } = await (supabase as any)
          .from('head_offices')
          .update(officeData)
          .eq('id', editingOffice.id);

        if (error) throw error;
        toast.success("Head office updated successfully!");
      } else {
        // Create new head office
        const { error } = await (supabase as any)
          .from('head_offices')
          .insert({
            ...officeData,
            created_at: new Date().toISOString()
          });

        if (error) throw error;
        toast.success("Head office added successfully!");
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error('Error saving head office:', error);
      toast.error(error.message || "Failed to save head office data");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (officeId: string) => {
    if (!confirm("Are you sure you want to delete this head office?")) return;

    try {
      const { error } = await (supabase as any)
        .from('head_offices')
        .delete()
        .eq('id', officeId);

      if (error) throw error;
      toast.success("Head office deleted successfully!");
    } catch (error: any) {
      console.error('Error deleting head office:', error);
      toast.error("Failed to delete head office");
    }
  };

  const handleStatusToggle = async (officeId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      const { error } = await (supabase as any)
        .from('head_offices')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', officeId);

      if (error) throw error;
      toast.success(`Head office status updated to ${newStatus}`);
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.error("Failed to update head office status");
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge className="bg-green-100 text-green-800">Active</Badge>
      : <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading head office data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with controls */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span>Head Office Management</span>
            </CardTitle>
            <div className="flex space-x-3">
              <Button
                onClick={loadHeadOffices}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={resetForm}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Head Office</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <Building2 className="h-5 w-5" />
                      <span>{editingOffice ? "Edit Head Office" : "Add New Head Office"}</span>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Office Name</label>
                        <Input
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter office name"
                          disabled={formLoading}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter email address"
                          disabled={formLoading}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Enter full address"
                        className="min-h-[100px]"
                        disabled={formLoading}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Enter phone number"
                          disabled={formLoading}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Website</label>
                        <Input
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          placeholder="Enter website URL"
                          disabled={formLoading}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">City</label>
                        <Input
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="Enter city"
                          disabled={formLoading}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">State</label>
                        <Input
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          placeholder="Enter state"
                          disabled={formLoading}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Postal Code</label>
                        <Input
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          placeholder="Enter postal code"
                          disabled={formLoading}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Country</label>
                        <Select 
                          value={formData.country} 
                          onValueChange={(value) => handleInputChange('country', value)}
                        >
                          <SelectTrigger disabled={formLoading}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="India">India</SelectItem>
                            <SelectItem value="USA">USA</SelectItem>
                            <SelectItem value="UK">UK</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <Select 
                          value={formData.status} 
                          onValueChange={(value) => handleInputChange('status', value)}
                        >
                          <SelectTrigger disabled={formLoading}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2 pt-6">
                        <input
                          type="checkbox"
                          id="isPrimary"
                          checked={formData.isPrimary}
                          onChange={(e) => handleInputChange('isPrimary', e.target.checked)}
                          className="rounded"
                          disabled={formLoading}
                        />
                        <label htmlFor="isPrimary" className="text-sm font-medium text-gray-700">
                          Primary Office
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        disabled={formLoading}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={formLoading}
                        className="flex items-center space-x-2"
                      >
                        {formLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Building2 className="h-4 w-4" />
                            <span>{editingOffice ? "Update" : "Add"} Office</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {/* Filters and Search */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search head offices..."
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Head Office List Table */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600">
                  <TableHead className="text-white font-bold text-center py-4">Office Details</TableHead>
                  <TableHead className="text-white font-bold text-center py-4">Contact Info</TableHead>
                  <TableHead className="text-white font-bold text-center py-4">Location</TableHead>
                  <TableHead className="text-white font-bold text-center py-4">Status</TableHead>
                  <TableHead className="text-white font-bold text-center py-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOffices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No head offices found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOffices.map((office, index) => (
                    <TableRow key={office.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                      <TableCell className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            {office.is_primary && (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                            <span className="font-semibold text-gray-800">
                              {office.name || "Unnamed Office"}
                            </span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600 leading-relaxed">
                              {office.address}
                            </span>
                          </div>
                          {office.website && (
                            <div className="flex items-center space-x-2">
                              <Globe className="h-4 w-4 text-gray-500" />
                              <a 
                                href={office.website.startsWith('http') ? office.website : `https://${office.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:underline"
                              >
                                {office.website}
                              </a>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{office.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-700">{office.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="p-4 text-center">
                        <div className="text-sm text-gray-700">
                          {office.city && office.state ? (
                            <>
                              <div>{office.city}</div>
                              <div className="text-gray-500">{office.state}</div>
                              {office.postal_code && (
                                <div className="text-gray-500">{office.postal_code}</div>
                              )}
                            </>
                          ) : (
                            <span className="text-gray-400">Not specified</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="p-4 text-center">
                        <div className="space-y-2">
                          {getStatusBadge(office.status)}
                          {office.is_primary && (
                            <Badge className="bg-yellow-100 text-yellow-800">Primary</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="p-4">
                        <div className="flex space-x-2 justify-center">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openEditDialog(office)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusToggle(office.id, office.status)}
                            className={office.status === 'active' 
                              ? "text-orange-600 hover:text-orange-700" 
                              : "text-green-600 hover:text-green-700"
                            }
                          >
                            {office.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(office.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <Building2 className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Total Offices</p>
              <p className="text-2xl font-bold">{headOffices.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <Star className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-sm text-gray-600">Primary Office</p>
              <p className="text-2xl font-bold">
                {headOffices.filter(o => o.is_primary).length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-green-600 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold">
                {headOffices.filter(o => o.status === 'active').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 bg-gray-600 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-2xl font-bold">
                {headOffices.filter(o => o.status === 'inactive').length}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HeadOfficeContent;