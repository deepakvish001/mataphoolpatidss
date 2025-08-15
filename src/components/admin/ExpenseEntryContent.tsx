import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Receipt, Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface ExpenseEntry {
  id: string;
  service_name: string;
  expense_name: string;
  quantity: string;
  given_to: string;
  description?: string;
  expense_date: string;
}

const ExpenseEntryContent = () => {
  const {
    data: expenseEntries,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<ExpenseEntry>({ tableName: 'expense_entries' });

  useAdminRealTime({
    tableName: 'expense_entries'
  });

  const [serviceName, setServiceName] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [givenTo, setGivenTo] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [editingExpense, setEditingExpense] = useState<ExpenseEntry | null>(null);

  const handleEdit = (expense: ExpenseEntry) => {
    setEditingExpense(expense);
    setServiceName(expense.service_name);
    setExpenseName(expense.expense_name);
    setQuantity(expense.quantity);
    setGivenTo(expense.given_to);
    setDescription(expense.description || "");
    setDate(expense.expense_date);
  };

  const handleUpdate = async () => {
    if (!editingExpense) return;
    
    if (!serviceName || !expenseName || !quantity || !givenTo || !date) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await update(editingExpense.id, {
        service_name: serviceName,
        expense_name: expenseName,
        quantity: quantity,
        given_to: givenTo,
        description: description || null,
        expense_date: date
      });

      setEditingExpense(null);
      handleReset();
      toast.success("Expense entry updated successfully!");
    } catch (error) {
      toast.error("Failed to update expense entry");
    }
  };

  const handleSubmit = async () => {
    if (editingExpense) {
      await handleUpdate();
      return;
    }

    if (!serviceName || !expenseName || !quantity || !givenTo || !date) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await create({
        service_name: serviceName,
        expense_name: expenseName,
        quantity: quantity,
        given_to: givenTo,
        description: description || null,
        expense_date: date
      });

      handleReset();
      toast.success("Expense entry added successfully!");
    } catch (error) {
      toast.error("Failed to add expense entry");
    }
  };

  const handleReset = () => {
    setServiceName("");
    setExpenseName("");
    setQuantity("");
    setGivenTo("");
    setDescription("");
    setDate("");
    setEditingExpense(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this expense entry?")) return;
    
    try {
      await deleteItem(id);
      toast.success("Expense entry deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete expense entry");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading expense entries...</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Form Card */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
              <Receipt className="h-6 w-6 text-white" />
            </div>
            <span>Expense Entry</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Service Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Name *
              </label>
              <Select value={serviceName} onValueChange={setServiceName}>
                <SelectTrigger className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="tea">Tea</SelectItem>
                  <SelectItem value="office-supplies">Office Supplies</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Expense Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expense Name *
                </label>
                <Input
                  type="text"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Enter expense name"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <Input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Enter quantity"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Given To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Given To *
                </label>
                <Input
                  type="text"
                  value={givenTo}
                  onChange={(e) => setGivenTo(e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Enter recipient"
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
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px] border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white resize-none"
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
                {editingExpense ? "UPDATE" : "SUBMIT"}
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
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Expense Name</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Quantity</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Given To</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Description</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenseEntries.map((expense, index) => (
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
                    {expense.expense_name}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {expense.quantity}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {expense.given_to}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {expense.description || "N/A"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {new Date(expense.expense_date).toLocaleDateString()}
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

export default ExpenseEntryContent;