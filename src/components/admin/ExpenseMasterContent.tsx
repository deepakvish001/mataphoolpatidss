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
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm">
            <CardContent className="p-12 flex items-center justify-center min-h-[600px]">
              <div className="flex flex-col items-center space-y-6">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground text-lg font-medium">Loading expense data...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-elegant border-0 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Total Services</p>
                  <p className="text-3xl font-bold text-primary">{expenses.length}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Receipt className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant border-0 bg-gradient-to-br from-secondary/5 to-secondary/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">With Description</p>
                  <p className="text-3xl font-bold text-secondary">{expenses.filter(e => e.description).length}</p>
                </div>
                <div className="p-3 bg-secondary/10 rounded-full">
                  <Edit className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant border-0 bg-gradient-to-br from-accent/5 to-accent/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Active Services</p>
                  <p className="text-3xl font-bold text-accent">{expenses.length}</p>
                </div>
                <div className="p-3 bg-accent/10 rounded-full">
                  <Receipt className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elegant border-0 bg-gradient-to-br from-destructive/5 to-destructive/10 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Management</p>
                  <p className="text-3xl font-bold text-destructive">Active</p>
                </div>
                <div className="p-3 bg-destructive/10 rounded-full">
                  <Trash2 className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form Card */}
        <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          <CardHeader className="p-8 border-b border-border/10 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardTitle className="text-3xl font-bold text-foreground flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-primary to-primary/80 rounded-xl shadow-lg">
                <Receipt className="h-8 w-8 text-primary-foreground" />
              </div>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Expense Master Management
              </span>
            </CardTitle>
          </CardHeader>
        
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Service Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">
                  Service Name *
                </label>
                <Input
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="h-12 border-border/20 focus:border-primary focus:ring-primary/20 rounded-lg text-foreground font-medium bg-background/50 backdrop-blur-sm transition-all duration-200"
                  placeholder="Enter service name"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground">
                  Description
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px] border-border/20 focus:border-primary focus:ring-primary/20 rounded-lg text-foreground font-medium bg-background/50 backdrop-blur-sm resize-none transition-all duration-200"
                  rows={4}
                  placeholder="Enter description (optional)"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6">
                <Button 
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground font-semibold px-8 py-3 rounded-lg shadow-elegant hover:shadow-lg transition-all duration-200 min-w-[120px]"
                >
                  {editingExpense ? "UPDATE" : "SUBMIT"}
                </Button>
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 font-semibold px-8 py-3 rounded-lg shadow-elegant hover:shadow-lg transition-all duration-200 min-w-[120px]"
                >
                  RESET
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table Card */}
        <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
          <CardHeader className="p-6 border-b border-border/10 bg-gradient-to-r from-muted/50 to-muted/30">
            <CardTitle className="text-xl font-bold text-foreground flex items-center space-x-2">
              <Receipt className="h-6 w-6 text-primary" />
              <span>Expense Services Data</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden rounded-b-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary hover:to-primary/90 border-none">
                    <TableHead className="text-primary-foreground font-bold text-center py-4 text-sm">Actions</TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center py-4 text-sm">Service Name</TableHead>
                    <TableHead className="text-primary-foreground font-bold text-center py-4 text-sm">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-12 text-muted-foreground">
                        <div className="flex flex-col items-center space-y-3">
                          <Receipt className="h-12 w-12 text-muted-foreground/50" />
                          <p className="text-lg font-medium">No expense services found</p>
                          <p className="text-sm">Add your first expense service to get started</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    expenses.map((expense, index) => (
                      <TableRow 
                        key={expense.id} 
                        className={`${
                          index % 2 === 0 ? "bg-background/50" : "bg-muted/20"
                        } hover:bg-muted/40 transition-colors duration-200 border-border/5`}
                      >
                        <TableCell className="text-center p-4">
                          <div className="flex justify-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(expense)}
                              className="text-primary hover:text-primary/80 hover:bg-primary/10 p-2 rounded-lg transition-all duration-200"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(expense.id)}
                              className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 p-2 rounded-lg transition-all duration-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-center p-4 text-foreground font-medium">
                          {expense.service_name}
                        </TableCell>
                        <TableCell className="text-center p-4 text-muted-foreground font-medium">
                          {expense.description || "No description"}
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
    </div>
  );
};

export default ExpenseMasterContent;