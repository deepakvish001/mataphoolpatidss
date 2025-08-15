import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface OpeningBalance {
  id: string;
  amount: number;
  entry_date: string;
  description: string;
}

const OpeningBalanceContent = () => {
  const {
    data: openingBalances,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<OpeningBalance>({ 
    tableName: 'opening_balances',
    orderBy: { column: 'entry_date', ascending: false }
  });

  useAdminRealTime({
    tableName: 'opening_balances'
  });

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [editingBalance, setEditingBalance] = useState<OpeningBalance | null>(null);

  const handleSubmit = async () => {
    if (!amount || !date || !description.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editingBalance) {
        // Update existing balance
        await update(editingBalance.id, {
          amount: parseFloat(amount),
          entry_date: date,
          description: description.trim()
        });
        toast.success("Opening balance updated successfully!");
        setEditingBalance(null);
      } else {
        // Create new balance
        const openingBalanceData = {
          amount: parseFloat(amount),
          entry_date: date,
          description: description.trim()
        };
        await create(openingBalanceData);
        toast.success("Opening balance added successfully!");
      }
      
      // Reset form
      setAmount("");
      setDate("");
      setDescription("");
    } catch (error) {
      toast.error(editingBalance ? "Failed to update opening balance" : "Failed to add opening balance");
    }
  };

  const handleReset = () => {
    setAmount("");
    setDate("");
    setDescription("");
    setEditingBalance(null);
  };

  const handleEdit = (balance: OpeningBalance) => {
    setEditingBalance(balance);
    setAmount(balance.amount.toString());
    setDate(balance.entry_date);
    setDescription(balance.description);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this opening balance?")) return;
    
    try {
      await deleteItem(id);
      toast.success("Opening balance deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete opening balance");
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-none bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading opening balances...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-none bg-gray-50 min-h-screen">
      {/* Header Navigation */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <a href="/admin" className="text-blue-600 hover:text-blue-800 font-medium">
            Home
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-8">
        {/* Form Card */}
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm max-w-4xl">
          <CardHeader className="p-8 border-b border-gray-100">
            <CardTitle className="text-2xl font-bold text-green-600 flex items-center space-x-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <span>Opening Balance</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount *
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white border border-gray-400 h-12 text-base"
                  placeholder="Enter amount"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-gray-400 h-12 text-base"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white border border-gray-400 min-h-[150px] text-base"
                  rows={6}
                  placeholder="Enter description"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base font-medium"
                >
                  {editingBalance ? "UPDATE" : "SUBMIT"}
                </Button>
                <Button 
                  onClick={handleReset}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base font-medium"
                >
                  RESET
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Opening Balances Table */}
        <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-green-600 hover:bg-green-600">
                  <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Actions</TableHead>
                  <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Amount</TableHead>
                  <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Date</TableHead>
                  <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {openingBalances.map((balance, index) => (
                  <TableRow key={balance.id} className={index % 2 === 0 ? "bg-green-50" : "bg-white"}>
                    <TableCell className="border-2 border-gray-600 p-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(balance)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(balance.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                      ₹{balance.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                      {new Date(balance.entry_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                      {balance.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OpeningBalanceContent;