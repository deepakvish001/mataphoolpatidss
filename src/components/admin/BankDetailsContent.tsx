import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Edit, 
  Trash2, 
  Loader2, 
  Search, 
  Building2, 
  TrendingUp, 
  FileText, 
  Plus, 
  Filter,
  DollarSign,
  MapPin,
  Hash,
  Upload,
  Camera,
  Shield,
  Activity,
  Users,
  Banknote,
  Building,
  RefreshCw
} from "lucide-react";
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
      <Card className="shadow-lg border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-white dark:from-blue-950/20 dark:to-background">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500 text-white rounded-lg">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">Search & Filter Banks</h3>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-4 w-4" />
              <Input
                placeholder="Search banks, account numbers, IFSC codes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-blue-600">
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filter:</span>
              </div>
              <Select value={bankFilter} onValueChange={setBankFilter}>
                <SelectTrigger className="w-[180px] border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      All Banks
                    </div>
                  </SelectItem>
                  <SelectItem value="public">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      Public Banks
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-500" />
                      Private Banks
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refresh()}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Bank Details Form */}
      <Card className="shadow-lg border-l-4 border-l-green-500 bg-gradient-to-r from-green-50/50 to-white dark:from-green-950/20 dark:to-background">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-500 text-white rounded-lg">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-green-700 dark:text-green-300">
                {editingBank ? "Update Bank Details" : "Add New Bank Details"}
              </CardTitle>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                {editingBank ? "Modify existing bank information" : "Enter comprehensive bank details for registration"}
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-green-700 dark:text-green-300">
                <Banknote className="h-4 w-4" />
                Bank Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                <Input
                  value={formData.bankName}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                  placeholder="Enter bank name (e.g., State Bank of India)"
                  className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Hash className="h-4 w-4" />
                Account Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-4 w-4" />
                <Input
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  placeholder="Enter account number"
                  className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-purple-700 dark:text-purple-300">
                <MapPin className="h-4 w-4" />
                Branch Name
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 h-4 w-4" />
                <Input
                  value={formData.branchName}
                  onChange={(e) => handleInputChange('branchName', e.target.value)}
                  placeholder="Enter branch name"
                  className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-orange-700 dark:text-orange-300">
                <Hash className="h-4 w-4" />
                IFSC Code
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 h-4 w-4" />
                <Input
                  value={formData.ifscCode}
                  onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                  placeholder="Enter IFSC code (e.g., SBIN0001234)"
                  className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                <Activity className="h-4 w-4" />
                MICR Code
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500 h-4 w-4" />
                <Input
                  value={formData.micrCode}
                  onChange={(e) => handleInputChange('micrCode', e.target.value)}
                  placeholder="Enter MICR code"
                  className="pl-10 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-pink-700 dark:text-pink-300">
                <Camera className="h-4 w-4" />
                Bank Photo
              </label>
              <div className="relative border-2 border-dashed border-pink-300 rounded-lg p-6 bg-pink-50/50 dark:bg-pink-950/20 hover:border-pink-400 transition-colors">
                <input
                  id="bank-photo-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <Upload className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-pink-700 dark:text-pink-300">
                    {formData.bankPhoto ? formData.bankPhoto.name : "Click to upload bank photo"}
                  </p>
                  <p className="text-xs text-pink-600 dark:text-pink-400 mt-1">
                    Drag & drop or click to browse (PNG, JPG, JPEG)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-green-200">
            <Button 
              onClick={handleSubmit} 
              className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              {editingBank ? (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Update Bank Details
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Bank Details
                </>
              )}
            </Button>
            {editingBank && (
              <Button onClick={handleReset} variant="outline" size="lg">
                <Trash2 className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            )}
            <Button onClick={handleReset} variant="secondary" size="lg">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Form
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bank Details Table */}
      <Card className="shadow-lg border-l-4 border-l-indigo-500 bg-gradient-to-r from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-background">
        <CardHeader className="pb-4 bg-gradient-to-r from-indigo-50 to-transparent dark:from-indigo-950/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-indigo-500 text-white rounded-lg">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
                Bank Details Registry
              </CardTitle>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-indigo-600 dark:text-indigo-400">
                  Complete bank information database with {filteredBankDetails.length} entries
                </p>
                <Badge variant="outline" className="border-indigo-300 text-indigo-700 bg-indigo-50">
                  {filteredBankDetails.length} of {bankDetails.length} banks
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                <TableRow className="border-b-2 border-indigo-200">
                  <TableHead className="w-[120px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-indigo-500" />
                      Actions
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[200px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Banknote className="h-4 w-4 text-green-500" />
                      Bank Name
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[150px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-blue-500" />
                      Account Number
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[140px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-purple-500" />
                      Branch
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[130px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-orange-500" />
                      IFSC Code
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[130px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-indigo-500" />
                      MICR Code
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Camera className="h-4 w-4 text-pink-500" />
                      Photo
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBankDetails.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                          <Building2 className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                            {searchTerm || bankFilter !== "all" ? "No banks found" : "No bank details available"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                            {searchTerm || bankFilter !== "all" 
                              ? "Try adjusting your search criteria or filters" 
                              : "Start by adding your first bank detail using the form above"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBankDetails.map((detail, index) => (
                    <TableRow 
                      key={detail.id} 
                      className={`hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-colors ${
                        index % 2 === 0 ? 'bg-white dark:bg-background' : 'bg-gray-50/50 dark:bg-gray-950/30'
                      }`}
                    >
                      <TableCell className="py-4">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(detail)}
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            title="Edit bank details"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(detail.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Delete bank details"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <Building2 className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900 dark:text-gray-100">
                              {detail.bank_name}
                            </span>
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
                               ? (
                                 <div className="flex items-center gap-1">
                                   <Shield className="h-3 w-3" />
                                   Public Bank
                                 </div>
                               ) : (
                                 <div className="flex items-center gap-1">
                                   <Users className="h-3 w-3" />
                                   Private Bank
                                 </div>
                               )}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-blue-500" />
                          <span className="font-mono text-sm font-medium">{detail.account_number}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-purple-500" />
                          <span className="font-medium">{detail.branch_name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-orange-500" />
                          <span className="font-mono text-sm font-medium">{detail.ifsc_code}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4 text-indigo-500" />
                          <span className="font-mono text-sm font-medium">{detail.micr_code}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        {detail.bank_photo_url ? (
                          <div className="relative group">
                            <img
                              src={detail.bank_photo_url}
                              alt="Bank"
                              className="w-12 h-12 object-cover rounded-lg border-2 border-pink-200 shadow-sm group-hover:shadow-md transition-shadow"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-colors" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <Camera className="h-4 w-4 text-gray-400" />
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