import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Search, Printer, FileText, Users, TrendingUp, Calculator } from "lucide-react";

const FeesPrintContent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [studentData, setStudentData] = useState({
    receiptId: "",
    name: "",
    course: "",
    studentId: "",
    date: "",
    totalFee: "",
    feePaid: "",
    feeDue: ""
  });

  // Sample statistics
  const stats = [
    {
      title: "Total Receipts",
      value: "156",
      icon: FileText,
      trend: "+12%",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Students Enrolled",
      value: "89",
      icon: Users,
      trend: "+8%",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Fees Collected",
      value: "₹2,45,000",
      icon: Calculator,
      trend: "+15%",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Pending Fees",
      value: "₹45,000",
      icon: TrendingUp,
      trend: "-5%",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleSubmit = () => {
    console.log("Submit clicked with search:", searchValue);
  };

  const handleInputChange = (field: string, value: string) => {
    setStudentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground shadow-xl">
        <div className="px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 text-gradient-enhanced">Fee Receipt Management</h1>
            <p className="text-primary-foreground/80 text-lg">Generate and print student fee receipts</p>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 mb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/95">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1 font-medium">{stat.trend} from last month</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/95">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-gradient flex items-center gap-2">
              <Search className="h-6 w-6" />
              Student Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="search" className="text-sm font-medium text-muted-foreground mb-2 block">
                  Search Student
                </Label>
                <Input
                  id="search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="h-12 border-border/40 focus:border-primary/50 bg-background/50"
                  placeholder="Enter student name, ID, or course..."
                />
              </div>
              <div className="flex gap-3">
                <Button 
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg px-8 h-12"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button 
                  onClick={handlePrintReceipt}
                  className="bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary shadow-lg px-8 h-12"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print Receipt
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Receipt Form */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <Card className="border-0 shadow-xl bg-gradient-to-br from-card to-card/95">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-gradient flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Fee Receipt Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Receipt ID</Label>
                <Input
                  value={studentData.receiptId}
                  onChange={(e) => handleInputChange('receiptId', e.target.value)}
                  className="h-12 border-border/40 focus:border-primary/50 bg-background/50"
                  placeholder="Enter receipt ID"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Student Name</Label>
                <Input
                  value={studentData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="h-12 border-border/40 focus:border-primary/50 bg-background/50"
                  placeholder="Enter student name"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Course</Label>
                <Input
                  value={studentData.course}
                  onChange={(e) => handleInputChange('course', e.target.value)}
                  className="h-12 border-border/40 focus:border-primary/50 bg-background/50"
                  placeholder="Enter course name"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Student ID</Label>
                <Input
                  value={studentData.studentId}
                  onChange={(e) => handleInputChange('studentId', e.target.value)}
                  className="h-12 border-border/40 focus:border-primary/50 bg-background/50"
                  placeholder="Enter student ID"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Date</Label>
                <Input
                  type="date"
                  value={studentData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="h-12 border-border/40 focus:border-primary/50 bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Total Fee</Label>
                <Input
                  value={studentData.totalFee}
                  onChange={(e) => handleInputChange('totalFee', e.target.value)}
                  className="h-12 border-border/40 focus:border-primary/50 bg-background/50"
                  placeholder="Enter total fee"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Fee Paid</Label>
                <Input
                  value={studentData.feePaid}
                  onChange={(e) => handleInputChange('feePaid', e.target.value)}
                  className="h-12 border-border/40 focus:border-primary/50 bg-background/50"
                  placeholder="Enter fee paid"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">Fee Due</Label>
                <Input
                  value={studentData.feeDue}
                  onChange={(e) => handleInputChange('feeDue', e.target.value)}
                  className="h-12 border-border/40 focus:border-primary/50 bg-background/50"
                  placeholder="Enter fee due"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Receipt Preview */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <Card className="border-0 shadow-xl bg-white print:shadow-none print:border-none">
          <CardContent className="p-8">
            {/* Header Section with Logo */}
            <div className="flex items-start justify-between mb-8">
              {/* Logo */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 border-4 border-pink-700 flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <div className="text-sm font-bold text-white leading-tight">B.Soft</div>
                    <div className="text-xs text-white leading-none">Computer &</div>
                    <div className="text-xs text-white leading-none">Technical</div>
                    <div className="text-xs text-white leading-none">Institute</div>
                  </div>
                </div>
              </div>

              {/* Institute Header */}
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

            {/* Receipt Title */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-gray-800 underline">
                Student Fee Receipt
              </h2>
            </div>

            {/* Receipt Details */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex">
                  <span className="font-medium text-gray-700 w-24">Receipt ID:</span>
                  <span className="border-b border-gray-400 flex-1 min-h-[1.5rem] pl-2">
                    {studentData.receiptId}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-24">Name:</span>
                  <span className="border-b border-gray-400 flex-1 min-h-[1.5rem] pl-2">
                    {studentData.name}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-24">Course:</span>
                  <span className="border-b border-gray-400 flex-1 min-h-[1.5rem] pl-2">
                    {studentData.course}
                  </span>
                </div>
                <div className="flex">
                  <span className="font-medium text-gray-700 w-24">Student ID:</span>
                  <span className="border-b border-gray-400 flex-1 min-h-[1.5rem] pl-2">
                    {studentData.studentId}
                  </span>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="flex">
                  <span className="font-medium text-gray-700 w-16">Date:</span>
                  <span className="border-b border-gray-400 flex-1 min-h-[1.5rem] pl-2">
                    {studentData.date}
                  </span>
                </div>
              </div>
            </div>

            {/* Fee Details */}
            <div className="space-y-4 mb-12">
              <div className="flex">
                <span className="font-medium text-gray-700 w-24">Total fee:</span>
                <span className="border-b border-gray-400 flex-1 min-h-[1.5rem] pl-2">
                  {studentData.totalFee}
                </span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-700 w-24">Fee Paid:</span>
                <span className="border-b border-gray-400 flex-1 min-h-[1.5rem] pl-2">
                  {studentData.feePaid}
                </span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-700 w-24">Fee Due:</span>
                <span className="border-b border-gray-400 flex-1 min-h-[1.5rem] pl-2">
                  {studentData.feeDue}
                </span>
              </div>
            </div>

            {/* Office Sign */}
            <div className="flex">
              <span className="font-medium text-gray-700 w-24">Office sign:</span>
              <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeesPrintContent;