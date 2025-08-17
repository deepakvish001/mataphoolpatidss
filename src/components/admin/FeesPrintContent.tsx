import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, FileText, Users, CreditCard, DollarSign, Calendar, Receipt } from "lucide-react";

const FeesPrintContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Sample data for fees
  const sampleFeesData = [
    {
      id: "FEE001",
      studentName: "Rahul Kumar",
      studentId: "STU001",
      course: "Computer Science",
      totalFee: 50000,
      feePaid: 30000,
      feeDue: 20000,
      status: "partial",
      paymentDate: "2024-01-15",
      receiptNo: "REC001"
    },
    {
      id: "FEE002", 
      studentName: "Priya Sharma",
      studentId: "STU002",
      course: "Web Development",
      totalFee: 35000,
      feePaid: 35000,
      feeDue: 0,
      status: "paid",
      paymentDate: "2024-01-20",
      receiptNo: "REC002"
    },
    {
      id: "FEE003",
      studentName: "Amit Singh",
      studentId: "STU003", 
      course: "Data Science",
      totalFee: 60000,
      feePaid: 15000,
      feeDue: 45000,
      status: "pending",
      paymentDate: "2024-01-10",
      receiptNo: "REC003"
    },
    {
      id: "FEE004",
      studentName: "Sneha Gupta",
      studentId: "STU004",
      course: "Mobile App Dev",
      totalFee: 45000,
      feePaid: 45000,
      feeDue: 0,
      status: "paid",
      paymentDate: "2024-01-25",
      receiptNo: "REC004"
    },
    {
      id: "FEE005",
      studentName: "Vikash Yadav",
      studentId: "STU005",
      course: "Digital Marketing",
      totalFee: 25000,
      feePaid: 0,
      feeDue: 25000,
      status: "pending",
      paymentDate: null,
      receiptNo: "REC005"
    }
  ];

  // Filter and search logic
  const filteredData = useMemo(() => {
    return sampleFeesData.filter(fee => {
      const matchesSearch = fee.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           fee.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           fee.course.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterCategory === "all" || fee.status === filterCategory;
      
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterCategory]);

  // Statistics calculations
  const totalStudents = sampleFeesData.length;
  const paidStudents = sampleFeesData.filter(fee => fee.status === "paid").length;
  const pendingStudents = sampleFeesData.filter(fee => fee.status === "pending").length;
  const totalRevenue = sampleFeesData.reduce((sum, fee) => sum + fee.feePaid, 0);

  const handlePrintReceipt = (feeData?: any) => {
    if (feeData) {
      // Store the selected fee data for printing
      localStorage.setItem('printData', JSON.stringify(feeData));
    }
    window.print();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>;
      case "partial":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Partial</Badge>;
      case "pending":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Fees Management</h1>
            <p className="text-muted-foreground">Manage student fee records and generate receipts</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Total Students</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                Active students
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Fees Paid</CardTitle>
              <CreditCard className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{paidStudents}</div>
              <p className="text-xs text-muted-foreground">
                Completed payments
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Pending Fees</CardTitle>
              <Calendar className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{pendingStudents}</div>
              <p className="text-xs text-muted-foreground">
                Outstanding payments
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">₹{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Total collected
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-card-foreground">Fee Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by student name, ID, or course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Receipt No</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead className="text-right">Total Fee</TableHead>
                    <TableHead className="text-right">Paid</TableHead>
                    <TableHead className="text-right">Due</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                        No fee records found matching your criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredData.map((fee) => (
                      <TableRow key={fee.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{fee.receiptNo}</TableCell>
                        <TableCell className="font-medium">{fee.studentName}</TableCell>
                        <TableCell>{fee.studentId}</TableCell>
                        <TableCell>{fee.course}</TableCell>
                        <TableCell className="text-right">₹{fee.totalFee.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-medium text-green-600">
                          ₹{fee.feePaid.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-medium text-red-600">
                          ₹{fee.feeDue.toLocaleString()}
                        </TableCell>
                        <TableCell>{getStatusBadge(fee.status)}</TableCell>
                        <TableCell>
                          {fee.paymentDate ? new Date(fee.paymentDate).toLocaleDateString() : "Not paid"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePrintReceipt(fee)}
                              className="h-8 w-8 p-0"
                            >
                              <Receipt className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Summary */}
            <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-muted-foreground">
              <div>
                Showing {filteredData.length} of {totalStudents} fee records
              </div>
              <div className="flex gap-4">
                <span>Total Collected: ₹{totalRevenue.toLocaleString()}</span>
                <span>Outstanding: ₹{sampleFeesData.reduce((sum, fee) => sum + fee.feeDue, 0).toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Print Receipt Template (Hidden) */}
        <div className="hidden print:block">
          <div className="bg-white p-8 max-w-4xl mx-auto">
            {/* Header Section with Logo */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 border-4 border-pink-700 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-sm font-bold text-white leading-tight">B.Soft</div>
                    <div className="text-xs text-white leading-none">Computer &</div>
                    <div className="text-xs text-white leading-none">Technical</div>
                    <div className="text-xs text-white leading-none">Institute</div>
                  </div>
                </div>
              </div>

              <div className="flex-1 text-center ml-8">
                <h1 className="text-3xl font-bold text-blue-600 mb-4 tracking-wider">
                  B. Soft Computer & Technical Institute
                </h1>
                <div className="text-sm text-gray-700 mb-2">
                  Near Union Bank Of India Bina Soft Educational & Welfare Society Vill & Post BILARIYAGAN J, AZAMGARH-276121
                </div>
                <div className="text-sm text-gray-700 mb-8">
                  infobinasoft@gmail.com
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-gray-800 underline">
                Student Fee Receipt
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex">
                  <span className="font-medium text-gray-700 w-24">Receipt ID:</span>
                  <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-24">Name:</span>
                  <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-24">Course:</span>
                  <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-24">Student ID:</span>
                  <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex">
                  <span className="font-medium text-gray-700 w-16">Date:</span>
                  <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-12">
              <div className="flex">
                <span className="font-medium text-gray-700 w-24">Total fee:</span>
                <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-700 w-24">Fee Paid:</span>
                <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-700 w-24">Fee Due:</span>
                <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
              </div>
            </div>

            <div className="flex">
              <span className="font-medium text-gray-700 w-24">Office sign:</span>
              <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesPrintContent;