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

  // Real-time subscription with automatic background refresh
  useEffect(() => {
    loadHeadOffices();

    const channel = supabase
      .channel('head-office-auto-refresh')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'head_offices'
      }, (payload: any) => {
        console.log('Head office real-time change:', payload);
        
        // Automatic background refresh without user interaction
        switch (payload.eventType) {
          case 'INSERT':
            setHeadOffices(prev => {
              const exists = prev.some(office => office.id === payload.new.id);
              if (exists) return prev;
              
              const newList = [payload.new, ...prev].sort((a, b) => {
                if (a.is_primary && !b.is_primary) return -1;
                if (!a.is_primary && b.is_primary) return 1;
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
              });
              
              return newList;
            });
            break;
            
          case 'UPDATE':
            setHeadOffices(prev => {
              return prev.map(office => 
                office.id === payload.new.id ? { ...office, ...payload.new } : office
              ).sort((a, b) => {
                if (a.is_primary && !b.is_primary) return -1;
                if (!a.is_primary && b.is_primary) return 1;
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
              });
            });
            break;
            
          case 'DELETE':
            setHeadOffices(prev => prev.filter(office => office.id !== payload.old.id));
            break;
        }
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('✅ Head office auto-refresh active');
        }
      });

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
    
    // Show instant loading feedback
    const loadingToast = toast.loading(
      editingOffice ? "⚡ Updating head office..." : "⚡ Adding head office...",
      { style: { background: '#3B82F6', color: 'white' } }
    );

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
        
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success("🎉 Head office updated successfully!", {
          duration: 3000,
          style: { background: '#10B981', color: 'white' }
        });
      } else {
        // Create new head office
        const { error } = await (supabase as any)
          .from('head_offices')
          .insert({
            ...officeData,
            created_at: new Date().toISOString()
          });

        if (error) throw error;
        
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success("🎉 Head office added successfully!", {
          duration: 3000,
          style: { background: '#10B981', color: 'white' }
        });
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      console.error('Error saving head office:', error);
      toast.dismiss(loadingToast);
      toast.error(`❌ ${error.message || "Failed to save head office data"}`, {
        duration: 4000,
        style: { background: '#EF4444', color: 'white' }
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (officeId: string) => {
    if (!confirm("⚠️ Are you sure you want to delete this head office? This action cannot be undone.")) return;

    const loadingToast = toast.loading("🗑️ Deleting head office...", {
      style: { background: '#EF4444', color: 'white' }
    });

    try {
      const { error } = await (supabase as any)
        .from('head_offices')
        .delete()
        .eq('id', officeId);

      if (error) throw error;
      
      toast.dismiss(loadingToast);
      toast.success("🗑️ Head office deleted successfully!", {
        duration: 3000,
        style: { background: '#EF4444', color: 'white' }
      });
    } catch (error: any) {
      console.error('Error deleting head office:', error);
      toast.dismiss(loadingToast);
      toast.error(`❌ Failed to delete head office: ${error.message}`, {
        duration: 4000,
        style: { background: '#EF4444', color: 'white' }
      });
    }
  };

  const handleStatusToggle = async (officeId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const emoji = newStatus === 'active' ? '✅' : '⏸️';
    
    const loadingToast = toast.loading(`${emoji} Updating status to ${newStatus}...`, {
      style: { background: '#3B82F6', color: 'white' }
    });
    
    try {
      const { error } = await (supabase as any)
        .from('head_offices')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', officeId);

      if (error) throw error;
      
      toast.dismiss(loadingToast);
      toast.success(`${emoji} Head office status updated to ${newStatus}!`, {
        duration: 2000,
        style: { 
          background: newStatus === 'active' ? '#10B981' : '#F59E0B', 
          color: 'white' 
        }
      });
    } catch (error: any) {
      console.error('Error updating status:', error);
      toast.dismiss(loadingToast);
      toast.error(`❌ Failed to update status: ${error.message}`, {
        duration: 4000,
        style: { background: '#EF4444', color: 'white' }
      });
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

      {/* Head Office Management Table */}
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50/30 backdrop-blur-sm">
        <CardContent className="p-0">
          {filteredOffices.length === 0 ? (
            <div className="text-center py-16 px-8">
              <Building2 className="h-20 w-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-700 mb-3">No head offices found</h3>
              <p className="text-gray-500 text-lg">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filters" 
                  : "Add your first head office to get started"
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-b-2 border-blue-300">
                    <TableHead className="font-bold text-white text-sm py-4 px-3 border-r border-blue-300">
                      Office Details
                    </TableHead>
                    <TableHead className="font-bold text-white text-sm py-4 px-3 border-r border-blue-300">
                      Contact & Location
                    </TableHead>
                    <TableHead className="font-bold text-white text-sm py-4 px-3 border-r border-blue-300 text-center">
                      Status
                    </TableHead>
                    <TableHead className="font-bold text-white text-sm py-4 px-3 text-center">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="bg-white">
                  {filteredOffices.map((office, index) => (
                    <TableRow 
                      key={office.id} 
                      className={`
                        border-b border-gray-200
                        hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 
                        transition-all duration-200
                        ${index % 2 === 0 ? 'bg-gray-50/70' : 'bg-white'}
                        hover:shadow-md
                      `}
                    >
                      {/* Office Details Column */}
                      <TableCell className="py-4 px-3 border-r border-gray-200 max-w-[300px]">
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <div className="p-1.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex-shrink-0">
                              <Building2 className="h-4 w-4 text-white" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-semibold text-gray-900 text-sm truncate">
                                  {office.name || "Unnamed Office"}
                                </span>
                                {office.is_primary && (
                                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-1.5 py-0.5">
                                    <Star className="h-3 w-3 fill-current" />
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-600 line-clamp-2 leading-tight">
                                {office.address}
                              </p>
                              {office.website && (
                                <a 
                                  href={office.website.startsWith('http') ? office.website : `https://${office.website}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 hover:underline truncate block"
                                >
                                  <Globe className="h-3 w-3 inline mr-1" />
                                  {office.website}
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Contact & Location Column */}
                      <TableCell className="py-4 px-3 border-r border-gray-200 max-w-[280px]">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="p-1 bg-green-100 rounded-full flex-shrink-0">
                              <Phone className="h-3 w-3 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-900 font-medium truncate">{office.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="p-1 bg-blue-100 rounded-full flex-shrink-0">
                              <Mail className="h-3 w-3 text-blue-600" />
                            </div>
                            <span className="text-xs text-gray-900 truncate">{office.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="p-1 bg-red-100 rounded-full flex-shrink-0">
                              <MapPin className="h-3 w-3 text-red-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="text-xs text-gray-900 truncate block">
                                {[office.city, office.state, office.country].filter(Boolean).join(", ")}
                              </span>
                              {office.postal_code && (
                                <Badge variant="outline" className="text-xs mt-1 px-1 py-0">
                                  {office.postal_code}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Status Column */}
                      <TableCell className="py-4 px-3 border-r border-gray-200 text-center">
                        <div className="space-y-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusToggle(office.id, office.status)}
                            className="p-0 h-auto hover:scale-105 transition-transform"
                          >
                            {office.status === 'active' ? (
                              <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 text-xs hover:from-green-600 hover:to-green-700 cursor-pointer">
                                ✅ Active
                              </Badge>
                            ) : (
                              <Badge className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-3 py-1 text-xs hover:from-gray-500 hover:to-gray-600 cursor-pointer">
                                ⏸️ Inactive
                              </Badge>
                            )}
                          </Button>
                          {office.is_primary && (
                            <div>
                              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1">
                                Primary
                              </Badge>
                            </div>
                          )}
                        </div>
                      </TableCell>

                      {/* Actions Column */}
                      <TableCell className="py-4 px-3 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(office)}
                            className="p-2 text-blue-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 rounded-lg transition-all duration-200 hover:scale-105"
                            title="Edit Office"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusToggle(office.id, office.status)}
                            className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                              office.status === 'active' 
                                ? "text-orange-600 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600" 
                                : "text-green-600 hover:text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600"
                            }`}
                            title={office.status === 'active' ? 'Deactivate' : 'Activate'}
                          >
                            {office.status === 'active' ? '⏸️' : '▶️'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(office.id)}
                            className="p-2 text-red-600 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-lg transition-all duration-200 hover:scale-105"
                            title="Delete Office"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
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