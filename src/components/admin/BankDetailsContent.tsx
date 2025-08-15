import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard, Edit, Trash2, Loader2 } from "lucide-react";
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
      {/* Add Bank Details Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100 bg-gray-200">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
            <span>Add Bank Details</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Bank Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Bank Name
              </label>
              <Input
                value={formData.bankName}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter bank name"
              />
            </div>

            {/* Account Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Account Number
              </label>
              <Input
                value={formData.accountNumber}
                onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter account number"
              />
            </div>

            {/* Branch Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Branch Name
              </label>
              <Input
                value={formData.branchName}
                onChange={(e) => handleInputChange('branchName', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter branch name"
              />
            </div>

            {/* IFSC Code */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                IFSC Code
              </label>
              <Input
                value={formData.ifscCode}
                onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter IFSC code"
              />
            </div>

            {/* MICR Code */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                MICR Code
              </label>
              <Input
                value={formData.micrCode}
                onChange={(e) => handleInputChange('micrCode', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter MICR code"
              />
            </div>

            {/* Bank Photo */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Bank Photo
              </label>
              <div className="border border-gray-300 rounded p-4 bg-white">
                <div className="flex items-center space-x-4">
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
                      className="h-10 px-4 border-gray-300 hover:bg-gray-50 font-medium text-gray-700"
                    >
                      Choose file
                    </Button>
                  </div>
                  <span className="text-gray-500 font-medium">
                    {formData.bankPhoto ? formData.bankPhoto.name : "No file chosen"}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit and Reset Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {editingBank ? "Update" : "Submit Now"}
              </Button>
              {editingBank && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50 px-6 py-3"
                >
                  Cancel
                </Button>
              )}
              <Button
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bank Details Table */}
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Actions</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Bank Name</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Account Number</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Branch Name</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">IFSC Code</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">MICR Code</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Bank Photo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bankDetails.map((detail, index) => (
                <TableRow key={detail.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 p-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(detail)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(detail.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {detail.bank_name}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {detail.account_number}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {detail.branch_name}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {detail.ifsc_code}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {detail.micr_code}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4">
                    {detail.bank_photo_url ? (
                      <div className="flex justify-center">
                        <img
                          src={detail.bank_photo_url}
                          alt="Bank photo"
                          className="w-16 h-10 object-cover rounded border-2 border-gray-400"
                        />
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <div className="w-16 h-10 bg-gray-200 border-2 border-gray-400 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-500">No Photo</span>
                        </div>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankDetailsContent;