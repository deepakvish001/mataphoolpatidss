import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Receipt, Edit, Trash2, Loader2, DollarSign, FileText, TrendingUp, Users } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface FeesReceipt {
  id: string;
  receipt_no: string;
  franchise_name: string;
  franchise_id: string;
  receipt_date: string;
  course: string;
  student: string;
  student_id: string;
  total_fee: number;
  amount_paid: number;
  payment_details?: string;
  amount_due: number;
  status: string;
}

const FeesManagementContent = () => {
  const {
    data: feesReceipts,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<FeesReceipt>({ 
    tableName: 'fees_receipts',
    orderBy: { column: 'created_at', ascending: false }
  });

  useAdminRealTime({
    tableName: 'fees_receipts'
  });

  const [receiptNo, setReceiptNo] = useState("ReceiptNo 6");
  const [franchiseName, setFranchiseName] = useState("");
  const [franchiseId, setFranchiseId] = useState("");
  const [date, setDate] = useState("");
  const [course, setCourse] = useState("");
  const [student, setStudent] = useState("");
  const [studentId, setStudentId] = useState("");
  const [totalFee, setTotalFee] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [amountDue, setAmountDue] = useState("");
  const [status, setStatus] = useState("Paided");

  const [editingReceipt, setEditingReceipt] = useState<FeesReceipt | null>(null);

  const handleEdit = (receipt: FeesReceipt) => {
    setEditingReceipt(receipt);
    setReceiptNo(receipt.receipt_no);
    setFranchiseName(receipt.franchise_name);
    setFranchiseId(receipt.franchise_id);
    setDate(receipt.receipt_date);
    setCourse(receipt.course);
    setStudent(receipt.student);
    setStudentId(receipt.student_id);
    setTotalFee(receipt.total_fee.toString());
    setAmountPaid(receipt.amount_paid.toString());
    setPaymentDetails(receipt.payment_details || "");
    setAmountDue(receipt.amount_due.toString());
    setStatus(receipt.status);
  };

  const handleUpdate = async () => {
    if (!editingReceipt) return;
    
    if (!receiptNo || !franchiseName || !franchiseId || !date || !course || !student || !studentId || !totalFee || !amountPaid) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const calculatedAmountDue = parseFloat(totalFee) - parseFloat(amountPaid);
      
      await update(editingReceipt.id, {
        receipt_no: receiptNo,
        franchise_name: franchiseName,
        franchise_id: franchiseId,
        receipt_date: date,
        course,
        student,
        student_id: studentId,
        total_fee: parseFloat(totalFee),
        amount_paid: parseFloat(amountPaid),
        payment_details: paymentDetails,
        amount_due: calculatedAmountDue,
        status
      });

      setEditingReceipt(null);
      handleReset();
      toast.success("Fees receipt updated successfully!");
    } catch (error) {
      toast.error("Failed to update fees receipt");
    }
  };

  const handleAdd = async () => {
    if (editingReceipt) {
      await handleUpdate();
      return;
    }

    if (!receiptNo || !franchiseName || !franchiseId || !date || !course || !student || !studentId || !totalFee || !amountPaid) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const calculatedAmountDue = parseFloat(totalFee) - parseFloat(amountPaid);
      
      await create({
        receipt_no: receiptNo,
        franchise_name: franchiseName,
        franchise_id: franchiseId,
        receipt_date: date,
        course,
        student,
        student_id: studentId,
        total_fee: parseFloat(totalFee),
        amount_paid: parseFloat(amountPaid),
        payment_details: paymentDetails,
        amount_due: calculatedAmountDue,
        status
      });

      handleReset();
      toast.success("Fees receipt added successfully!");
    } catch (error) {
      toast.error("Failed to add fees receipt");
    }
  };

  const handleReset = () => {
    setReceiptNo(`ReceiptNo ${feesReceipts.length + 2}`);
    setFranchiseName("");
    setFranchiseId("");
    setDate("");
    setCourse("");
    setStudent("");
    setStudentId("");
    setTotalFee("");
    setAmountPaid("");
    setPaymentDetails("");
    setAmountDue("");
    setStatus("Paided");
    setEditingReceipt(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this receipt?")) return;
    
    try {
      await deleteItem(id);
      toast.success("Receipt deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete receipt");
    }
  };

  // Calculate amount due automatically
  const calculateAmountDue = () => {
    const total = parseFloat(totalFee) || 0;
    const paid = parseFloat(amountPaid) || 0;
    const due = total - paid;
    setAmountDue(due.toString());
  };

  // Helper function to format large numbers
  const formatAmount = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`; // Lakh format
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`; // Thousand format
    }
    return `₹${amount.toLocaleString()}`;
  };

  // Calculate statistics
  const statistics = useMemo(() => {
    const total = feesReceipts.length;
    const totalAmount = feesReceipts.reduce((sum, receipt) => sum + (receipt.total_fee || 0), 0);
    const paidAmount = feesReceipts.reduce((sum, receipt) => sum + (receipt.amount_paid || 0), 0);
    const dueAmount = feesReceipts.reduce((sum, receipt) => sum + (receipt.amount_due || 0), 0);
    
    return {
      total,
      totalAmount,
      paidAmount,
      dueAmount
    };
  }, [feesReceipts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading fees management...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-sm border-b border-border/40 px-6 py-4">
        <div className="flex items-center space-x-6">
          <a href="/admin" className="text-primary hover:text-primary/80 font-medium transition-colors">
            Home
          </a>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-semibold">Fees Management</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Receipts */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1 pr-3">
                  <p className="text-primary-foreground/80 text-sm font-medium">Total Receipts</p>
                  <p className="text-3xl font-bold">{statistics.total}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full flex-shrink-0">
                  <FileText className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Amount */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1 pr-3">
                  <p className="text-secondary-foreground/80 text-sm font-medium">Total Amount</p>
                  <p className="text-3xl font-bold" title={`₹${statistics.totalAmount.toLocaleString()}`}>{formatAmount(statistics.totalAmount)}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full flex-shrink-0">
                  <DollarSign className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amount Paid */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1 pr-3">
                  <p className="text-white/80 text-sm font-medium">Amount Paid</p>
                  <p className="text-3xl font-bold" title={`₹${statistics.paidAmount.toLocaleString()}`}>{formatAmount(statistics.paidAmount)}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full flex-shrink-0">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Amount Due */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1 pr-3">
                  <p className="text-white/80 text-sm font-medium">Amount Due</p>
                  <p className="text-3xl font-bold" title={`₹${statistics.dueAmount.toLocaleString()}`}>{formatAmount(statistics.dueAmount)}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full flex-shrink-0">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Form Card */}
        <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <Receipt className="h-6 w-6 text-primary-foreground" />
              </div>
              <span>Enter Detail of Fee Receipt</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Receipt No */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Receipt No *
                </label>
                <Input
                  type="text"
                  value={receiptNo}
                  onChange={(e) => setReceiptNo(e.target.value)}
                  className="h-10 bg-background border-input"
                />
              </div>

              {/* Franchise Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Franchise Name *
                </label>
                <Select value={franchiseName} onValueChange={setFranchiseName}>
                  <SelectTrigger className="h-10 bg-background border-input">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="franchise1">Franchise 001</SelectItem>
                    <SelectItem value="franchise2">Franchise 002</SelectItem>
                    <SelectItem value="franchise3">Franchise 003</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Franchise ID */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Franchise ID *
                </label>
                <Input
                  type="text"
                  value={franchiseId}
                  onChange={(e) => setFranchiseId(e.target.value)}
                  className="h-10 bg-background border-input"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date *
                </label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-10 bg-background border-input"
                />
              </div>

              {/* Course */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Course *
                </label>
                <Select value={course} onValueChange={setCourse}>
                  <SelectTrigger className="h-10 bg-background border-input">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic-computer">Basic Computer Course</SelectItem>
                    <SelectItem value="advanced-computer">Advanced Computer Course</SelectItem>
                    <SelectItem value="programming">Programming Fundamentals</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Student */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Student *
                </label>
                <Select value={student} onValueChange={setStudent}>
                  <SelectTrigger className="h-10 bg-background border-input">
                    <SelectValue placeholder="Select Student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student1">John Doe</SelectItem>
                    <SelectItem value="student2">Jane Smith</SelectItem>
                    <SelectItem value="student3">Mike Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Student ID */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Student ID *
                </label>
                <Input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="h-10 bg-background border-input"
                />
              </div>

              {/* Total fee Of Student */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Total fee Of Student *
                </label>
                <Input
                  type="number"
                  value={totalFee}
                  onChange={(e) => {
                    setTotalFee(e.target.value);
                    calculateAmountDue();
                  }}
                  className="h-10 bg-background border-input"
                />
              </div>

              {/* Amount Paid */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Amount Paid *
                </label>
                <Input
                  type="number"
                  value={amountPaid}
                  onChange={(e) => {
                    setAmountPaid(e.target.value);
                    calculateAmountDue();
                  }}
                  className="h-10 bg-background border-input"
                />
              </div>

              {/* Amount Payment Details */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Amount Payment Details *
                </label>
                <Input
                  type="text"
                  value={paymentDetails}
                  onChange={(e) => setPaymentDetails(e.target.value)}
                  className="h-10 bg-background border-input"
                />
              </div>

              {/* Amount Due */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Amount Due *
                </label>
                <Input
                  type="number"
                  value={amountDue}
                  onChange={(e) => setAmountDue(e.target.value)}
                  className="h-10 bg-background border-input"
                  readOnly
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status *
                </label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="h-10 bg-background border-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Paided">Paided</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Partial">Partial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            
            {/* Buttons */}
            <div className="col-span-full flex flex-wrap gap-4 pt-6 border-t border-border/20">
              <Button 
                onClick={handleAdd}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2 font-medium"
              >
                {editingReceipt ? "UPDATE" : "ADD"}
              </Button>
              {editingReceipt && (
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="border-border text-muted-foreground hover:bg-muted px-6 py-2"
                >
                  Cancel
                </Button>
              )}
              <Button 
                onClick={handleReset}
                variant="secondary"
                className="px-8 py-2 font-medium"
              >
                RESET
              </Button>
              <Button 
                onClick={handlePrint}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-2 font-medium"
              >
                Print
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Receipts Table */}
        {feesReceipts.length > 0 ? (
          <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold text-foreground flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Fees Receipts ({feesReceipts.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-hidden rounded-lg border border-border/20">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50 border-b border-border/20">
                      <TableHead className="font-semibold text-muted-foreground text-center py-4">Actions</TableHead>
                      <TableHead className="font-semibold text-muted-foreground text-center py-4">Receipt No</TableHead>
                      <TableHead className="font-semibold text-muted-foreground text-center py-4">Franchise</TableHead>
                      <TableHead className="font-semibold text-muted-foreground text-center py-4">Student</TableHead>
                      <TableHead className="font-semibold text-muted-foreground text-center py-4">Course</TableHead>
                      <TableHead className="font-semibold text-muted-foreground text-center py-4">Total Fee</TableHead>
                      <TableHead className="font-semibold text-muted-foreground text-center py-4">Paid</TableHead>
                      <TableHead className="font-semibold text-muted-foreground text-center py-4">Due</TableHead>
                      <TableHead className="font-semibold text-muted-foreground text-center py-4">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {feesReceipts.map((receipt, index) => (
                      <TableRow 
                        key={receipt.id} 
                        className={`hover:bg-muted/50 transition-colors border-b border-border/10 ${
                          index % 2 === 0 ? "bg-background/50" : "bg-muted/20"
                        }`}
                      >
                        <TableCell className="p-4 text-center">
                          <div className="flex justify-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(receipt)}
                              className="h-8 w-8 p-0 text-primary hover:text-primary/80 hover:bg-primary/10"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(receipt.id)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="p-4 text-center text-foreground font-medium">
                          {receipt.receipt_no}
                        </TableCell>
                        <TableCell className="p-4 text-center text-foreground font-medium">
                          {receipt.franchise_name}
                        </TableCell>
                        <TableCell className="p-4 text-center text-foreground font-medium">
                          {receipt.student}
                        </TableCell>
                        <TableCell className="p-4 text-center text-foreground font-medium">
                          {receipt.course}
                        </TableCell>
                        <TableCell className="p-4 text-center text-foreground font-medium">
                          ₹{receipt.total_fee.toFixed(2)}
                        </TableCell>
                        <TableCell className="p-4 text-center text-foreground font-medium">
                          ₹{receipt.amount_paid.toFixed(2)}
                        </TableCell>
                        <TableCell className="p-4 text-center text-foreground font-medium">
                          ₹{receipt.amount_due.toFixed(2)}
                        </TableCell>
                        <TableCell className="p-4 text-center">
                          <span className={`px-2 py-1 rounded text-sm font-medium ${
                            receipt.status === 'Paided' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            receipt.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
                          }`}>
                            {receipt.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <FileText className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No Receipts Found</h3>
              <p className="text-muted-foreground">No fee receipts have been added yet. Create your first receipt using the form above.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FeesManagementContent;