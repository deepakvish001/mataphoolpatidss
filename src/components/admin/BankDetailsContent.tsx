import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Edit, Trash2, Loader2, Search, Building2, TrendingUp, FileText, Plus, Filter } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface BankDetails {
  id: string;
  bank_name: string;
  account_number: string;
  branch_name: string;
  ifsc_code: string;
  micr_code: string;
  bank_photo_url?: string;
}

const BankDetailsContent = () => {
  const {
    data: bankDetails,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<BankDetails>({ tableName: 'bank_details' });

  useAdminRealTime({
    tableName: 'bank_details'
  });

  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    branchName: "",
    ifscCode: "",
    micrCode: "",
    bankPhoto: null as File | null
  });
  const [editingBank, setEditingBank] = useState<BankDetails | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [bankFilter, setBankFilter] = useState<string>("all");

  // Statistics
  const stats = useMemo(() => {
    const totalBanks = bankDetails.length;
    const uniqueBanks = new Set(bankDetails.map(b => b.bank_name)).size;
    const publicBanks = bankDetails.filter(b => 
      b.bank_name.toLowerCase().includes('state bank') || 
      b.bank_name.toLowerCase().includes('punjab national') ||
      b.bank_name.toLowerCase().includes('bank of baroda') ||
      b.bank_name.toLowerCase().includes('canara bank') ||
      b.bank_name.toLowerCase().includes('union bank') ||
      b.bank_name.toLowerCase().includes('central bank') ||
      b.bank_name.toLowerCase().includes('indian bank') ||
      b.bank_name.toLowerCase().includes('bank of maharashtra')
    ).length;
    const privateBanks = totalBanks - publicBanks;
    
    return { totalBanks, uniqueBanks, publicBanks, privateBanks };
  }, [bankDetails]);

  // Filtered data
  const filteredBankDetails = useMemo(() => {
    return bankDetails.filter(bank => {
      const matchesSearch = 
        bank.bank_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bank.account_number.includes(searchTerm) ||
        bank.branch_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bank.ifsc_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bank.micr_code.includes(searchTerm);

      const matchesFilter = bankFilter === "all" || 
        (bankFilter === "public" && (
          bank.bank_name.toLowerCase().includes('state bank') || 
          bank.bank_name.toLowerCase().includes('punjab national') ||
          bank.bank_name.toLowerCase().includes('bank of baroda') ||
          bank.bank_name.toLowerCase().includes('canara bank') ||
          bank.bank_name.toLowerCase().includes('union bank') ||
          bank.bank_name.toLowerCase().includes('central bank') ||
          bank.bank_name.toLowerCase().includes('indian bank') ||
          bank.bank_name.toLowerCase().includes('bank of maharashtra')
        )) ||
        (bankFilter === "private" && !(
          bank.bank_name.toLowerCase().includes('state bank') || 
          bank.bank_name.toLowerCase().includes('punjab national') ||
          bank.bank_name.toLowerCase().includes('bank of baroda') ||
          bank.bank_name.toLowerCase().includes('canara bank') ||
          bank.bank_name.toLowerCase().includes('union bank') ||
          bank.bank_name.toLowerCase().includes('central bank') ||
          bank.bank_name.toLowerCase().includes('indian bank') ||
          bank.bank_name.toLowerCase().includes('bank of maharashtra')
        ));

      return matchesSearch && matchesFilter;
    });
  }, [bankDetails, searchTerm, bankFilter]);

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInputChange('bankPhoto', file);
    }
  };

  const handleSubmit = async () => {
    if (editingBank) {
      await handleUpdate();
      return;
    }

    if (!formData.bankName.trim() || !formData.accountNumber.trim() || !formData.branchName.trim() || 
        !formData.ifscCode.trim() || !formData.micrCode.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const bankPhotoUrl = formData.bankPhoto ? URL.createObjectURL(formData.bankPhoto) : "";

    try {
      const newBankDetail = {
        bank_name: formData.bankName.trim(),
        account_number: formData.accountNumber.trim(),
        branch_name: formData.branchName.trim(),
        ifsc_code: formData.ifscCode.trim(),
        micr_code: formData.micrCode.trim(),
        bank_photo_url: bankPhotoUrl
      };
      await create(newBankDetail);
      toast.success("Bank details added successfully!");
      handleReset();
    } catch (error) {
      toast.error("Failed to add bank details");
    }
  };

  const handleUpdate = async () => {
    if (!editingBank) return;
    
    if (!formData.bankName.trim() || !formData.accountNumber.trim() || !formData.branchName.trim() || 
        !formData.ifscCode.trim() || !formData.micrCode.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const bankPhotoUrl = formData.bankPhoto ? URL.createObjectURL(formData.bankPhoto) : editingBank.bank_photo_url;

    try {
      await update(editingBank.id, {
        bank_name: formData.bankName.trim(),
        account_number: formData.accountNumber.trim(),
        branch_name: formData.branchName.trim(),
        ifsc_code: formData.ifscCode.trim(),
        micr_code: formData.micrCode.trim(),
        bank_photo_url: bankPhotoUrl
      });
      toast.success("Bank details updated successfully!");
      setEditingBank(null);
      handleReset();
    } catch (error) {
      toast.error("Failed to update bank details");
    }
  };

  const handleEdit = (bank: BankDetails) => {
    setEditingBank(bank);
    setFormData({
      bankName: bank.bank_name,
      accountNumber: bank.account_number,
      branchName: bank.branch_name,
      ifscCode: bank.ifsc_code,
      micrCode: bank.micr_code,
      bankPhoto: null // Reset photo selection
    });
  };

  const handleReset = () => {
    setFormData({
      bankName: "",
      accountNumber: "",
      branchName: "",
      ifscCode: "",
      micrCode: "",
      bankPhoto: null
    });
    setEditingBank(null);
    
    // Reset file input
    const fileInput = document.getElementById('bank-photo-file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this bank detail?")) return;
    
    try {
      await deleteItem(id);
      toast.success("Bank details deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete bank details");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading bank details...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Banks</p>
                <p className="text-3xl font-bold">{stats.totalBanks}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Building2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Unique Banks</p>
                <p className="text-3xl font-bold">{stats.uniqueBanks}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Public Banks</p>
                <p className="text-3xl font-bold">{stats.publicBanks}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Private Banks</p>
                <p className="text-3xl font-bold">{stats.privateBanks}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <CreditCard className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card className="shadow-lg border border-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search banks, account numbers, IFSC codes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={bankFilter} onValueChange={setBankFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Banks</SelectItem>
                  <SelectItem value="public">Public Banks</SelectItem>
                  <SelectItem value="private">Private Banks</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Bank Details Form */}
      <Card className="shadow-lg border border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {editingBank ? "Update Bank Details" : "Add New Bank Details"}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Bank Name</label>
              <Input
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                placeholder="Enter bank name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Account Number</label>
              <Input
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                placeholder="Enter account number"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Branch Name</label>
              <Input
                value={formData.branchName}
                onChange={(e) => handleInputChange('branchName', e.target.value)}
                placeholder="Enter branch name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">IFSC Code</label>
              <Input
                value={formData.ifscCode}
                onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                placeholder="Enter IFSC code"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">MICR Code</label>
              <Input
                value={formData.micrCode}
                onChange={(e) => handleInputChange('micrCode', e.target.value)}
                placeholder="Enter MICR code"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bank Photo</label>
              <div className="border border-border rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      id="bank-photo-file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="pointer-events-none"
                    >
                      Choose File
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formData.bankPhoto ? formData.bankPhoto.name : "No file chosen"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSubmit} className="flex-1 md:flex-none">
              {editingBank ? "Update Bank" : "Add Bank"}
            </Button>
            {editingBank && (
              <Button onClick={handleReset} variant="outline">
                Cancel
              </Button>
            )}
            <Button onClick={handleReset} variant="secondary">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bank Details Table */}
      <Card className="shadow-lg border border-border">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <span>Bank Details ({filteredBankDetails.length})</span>
            <Badge variant="secondary" className="text-sm">
              {filteredBankDetails.length} of {bankDetails.length} banks
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Actions</TableHead>
                  <TableHead>Bank Name</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>IFSC Code</TableHead>
                  <TableHead>MICR Code</TableHead>
                  <TableHead>Photo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBankDetails.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      {searchTerm || bankFilter !== "all" ? "No banks found matching your criteria" : "No bank details available"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBankDetails.map((detail) => (
                    <TableRow key={detail.id}>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(detail)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(detail.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{detail.bank_name}</span>
                          <Badge 
                            variant={
                              detail.bank_name.toLowerCase().includes('state bank') || 
                              detail.bank_name.toLowerCase().includes('punjab national') ||
                              detail.bank_name.toLowerCase().includes('bank of baroda') ||
                              detail.bank_name.toLowerCase().includes('canara bank') ||
                              detail.bank_name.toLowerCase().includes('union bank') ||
                              detail.bank_name.toLowerCase().includes('central bank') ||
                              detail.bank_name.toLowerCase().includes('indian bank') ||
                              detail.bank_name.toLowerCase().includes('bank of maharashtra')
                              ? "default" : "secondary"
                            } 
                            className="w-fit text-xs mt-1"
                          >
                            {detail.bank_name.toLowerCase().includes('state bank') || 
                             detail.bank_name.toLowerCase().includes('punjab national') ||
                             detail.bank_name.toLowerCase().includes('bank of baroda') ||
                             detail.bank_name.toLowerCase().includes('canara bank') ||
                             detail.bank_name.toLowerCase().includes('union bank') ||
                             detail.bank_name.toLowerCase().includes('central bank') ||
                             detail.bank_name.toLowerCase().includes('indian bank') ||
                             detail.bank_name.toLowerCase().includes('bank of maharashtra')
                             ? "Public" : "Private"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{detail.account_number}</TableCell>
                      <TableCell>{detail.branch_name}</TableCell>
                      <TableCell className="font-mono text-sm">{detail.ifsc_code}</TableCell>
                      <TableCell className="font-mono text-sm">{detail.micr_code}</TableCell>
                      <TableCell>
                        {detail.bank_photo_url ? (
                          <img
                            src={detail.bank_photo_url}
                            alt="Bank"
                            className="w-12 h-8 object-cover rounded border"
                          />
                        ) : (
                          <div className="w-12 h-8 bg-muted rounded border flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">No photo</span>
                          </div>
                        )}
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
  );
};

export default BankDetailsContent;