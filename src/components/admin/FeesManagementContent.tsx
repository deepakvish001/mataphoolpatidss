import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FeesManagementContent = () => {
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

  const handleAdd = () => {
    console.log("Add clicked");
    // Add logic here
  };

  const handlePrint = () => {
    console.log("Print clicked");
    // Print logic here
  };

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
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-green-600">Enter Detail of Fee Receipt</h1>
        </div>

        {/* Form */}
        <div className="bg-gray-200 p-8 rounded max-w-4xl">
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
                type="text"
                value={totalFee}
                onChange={(e) => setTotalFee(e.target.value)}
                className="w-full bg-white border border-gray-400 h-12 text-base"
              />
              <span className="text-red-500 text-sm">Label</span>
            </div>

            {/* Amount Paid */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount Paid *
              </label>
              <Input
                type="text"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
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
                type="text"
                value={amountDue}
                onChange={(e) => setAmountDue(e.target.value)}
                className="w-full bg-white border border-gray-400 h-12 text-base"
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
                ADD
              </Button>
              <Button 
                onClick={handlePrint}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base font-medium"
              >
                Print
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeesManagementContent;