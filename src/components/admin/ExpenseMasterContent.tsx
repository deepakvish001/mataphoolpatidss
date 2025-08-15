import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Receipt, Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface ExpenseMaster {
  id: string;
  service_name: string;
  description?: string;
}

const ExpenseMasterContent = () => {
  const {
    data: expenses,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<ExpenseMaster>({ tableName: 'expense_master' });

  useAdminRealTime({
    tableName: 'expense_master'
  });

  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [editingExpense, setEditingExpense] = useState<ExpenseMaster | null>(null);

  const handleSubmit = async () => {
    if (!serviceName.trim()) {
      toast.error("Please enter a service name");
      return;
    }

    try {
      if (editingExpense) {
        // Update existing expense
        await update(editingExpense.id, {
          service_name: serviceName.trim(),
          description: description || null
        });
        toast.success("Expense service updated successfully!");
        setEditingExpense(null);
      } else {
        // Create new expense
        await create({
          service_name: serviceName.trim(),
          description: description || null
        });
        toast.success("Expense service added successfully!");
      }
      
      setServiceName("");
      setDescription("");
    } catch (error) {
      toast.error(editingExpense ? "Failed to update expense service" : "Failed to add expense service");
    }
  };

  const handleReset = () => {
    setServiceName("");
    setDescription("");
    setEditingExpense(null);
  };

  const handleEdit = (expense: ExpenseMaster) => {
    setEditingExpense(expense);
    setServiceName(expense.service_name);
    setDescription(expense.description || "");
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success("Expense service deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete expense service");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading expense data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Form Card */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <Receipt className="h-6 w-6 text-white" />
            </div>
            <span>Expense Master</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Service Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Name *
              </label>
              <Input
                type="text"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter service name"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px] border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white resize-none"
                rows={4}
                placeholder="Enter description"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                onClick={handleSubmit}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                SUBMIT
              </Button>
              <Button 
                onClick={handleReset}
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                RESET
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table Card */}
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-500 hover:bg-blue-500">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Actions</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Service Name</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense, index) => (
                <TableRow key={expense.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                  <TableCell className="border-2 border-gray-600 p-4">
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(expense)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(expense.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {expense.service_name}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {expense.description || "N/A"}
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

export default ExpenseMasterContent;