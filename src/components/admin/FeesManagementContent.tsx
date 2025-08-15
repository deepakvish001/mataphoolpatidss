import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Receipt, Edit, Trash2, Loader2 } from "lucide-react";
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

  if (loading) {
    return (
      <div className="w-full max-w-none bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading fees receipts...</p>
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
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="p-8 border-b border-gray-100">
            <CardTitle className="text-2xl font-bold text-green-600 flex items-center space-x-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <Receipt className="h-6 w-6 text-white" />
              </div>
              <span>Enter Detail of Fee Receipt</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
          <div className="space-y-6">
            {/* Receipt No */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Receipt No *
              </label>
              <Input
                type="text"
                value={receiptNo}
                onChange={(e) => setReceiptNo(e.target.value)}
                className="w-full bg-white border border-gray-400 h-12 text-base"
              />
            </div>

            {/* Franchise Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Franchise Name*
              </label>
              <Select value={franchiseName} onValueChange={setFranchiseName}>
                <SelectTrigger className="w-full bg-white border border-gray-400 h-12 text-base">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Franchise ID *
              </label>
              <Input
                type="text"
                value={franchiseId}
                onChange={(e) => setFranchiseId(e.target.value)}
                className="w-full bg-white border border-gray-400 h-12 text-base"
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

            {/* Course */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course*
              </label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger className="w-full bg-white border border-gray-400 h-12 text-base">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student *
              </label>
              <Select value={student} onValueChange={setStudent}>
                <SelectTrigger className="w-full bg-white border border-gray-400 h-12 text-base">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student ID *
              </label>
              <Input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full bg-white border border-gray-400 h-12 text-base"
              />
            </div>

            {/* Total fee Of Student */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total fee Of Student *
              </label>
              <Input
                type="number"
                value={totalFee}
                onChange={(e) => {
                  setTotalFee(e.target.value);
                  calculateAmountDue();
                }}
                className="w-full bg-white border border-gray-400 h-12 text-base"
              />
            </div>

            {/* Amount Paid */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount Paid *
              </label>
              <Input
                type="number"
                value={amountPaid}
                onChange={(e) => {
                  setAmountPaid(e.target.value);
                  calculateAmountDue();
                }}
                className="w-full bg-white border border-gray-400 h-12 text-base"
              />
            </div>

            {/* Amount Payment Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount Payment Details *
              </label>
              <Input
                type="text"
                value={paymentDetails}
                onChange={(e) => setPaymentDetails(e.target.value)}
                className="w-full bg-white border border-gray-400 h-12 text-base"
              />
            </div>

            {/* Amount Due */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount Due *
              </label>
              <Input
                type="number"
                value={amountDue}
                onChange={(e) => setAmountDue(e.target.value)}
                className="w-full bg-white border border-gray-400 h-12 text-base"
                readOnly
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full bg-white border border-gray-400 h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paided">Paided</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Partial">Partial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                onClick={handleAdd}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base font-medium"
              >
                {editingReceipt ? "UPDATE" : "ADD"}
              </Button>
              <Button 
                onClick={handleReset}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base font-medium"
              >
                RESET
              </Button>
              <Button 
                onClick={handlePrint}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base font-medium"
              >
                Print
              </Button>
            </div>
          </div>
          </CardContent>
        </Card>

        {/* Receipts Table */}
        {feesReceipts.length > 0 && (
          <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-600 hover:bg-blue-600">
                    <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Actions</TableHead>
                    <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Receipt No</TableHead>
                    <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Franchise</TableHead>
                    <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Student</TableHead>
                    <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Course</TableHead>
                    <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Total Fee</TableHead>
                    <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Paid</TableHead>
                    <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Due</TableHead>
                    <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feesReceipts.map((receipt, index) => (
                    <TableRow key={receipt.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                      <TableCell className="border-2 border-gray-600 p-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(receipt)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(receipt.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                        {receipt.receipt_no}
                      </TableCell>
                      <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                        {receipt.franchise_name}
                      </TableCell>
                      <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                        {receipt.student}
                      </TableCell>
                      <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                        {receipt.course}
                      </TableCell>
                      <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                        ₹{receipt.total_fee.toFixed(2)}
                      </TableCell>
                      <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                        ₹{receipt.amount_paid.toFixed(2)}
                      </TableCell>
                      <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                        ₹{receipt.amount_due.toFixed(2)}
                      </TableCell>
                      <TableCell className="border-2 border-gray-600 text-center p-4">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          receipt.status === 'Paided' ? 'bg-green-100 text-green-800' :
                          receipt.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {receipt.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FeesManagementContent;