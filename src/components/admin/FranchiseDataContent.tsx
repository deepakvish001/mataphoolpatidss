import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Image, Search, Filter, Calendar, FileText, Plus, Users, TrendingUp, Clock } from "lucide-react";
import { useState, useMemo } from "react";

const FranchiseDataContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    franchise: "",
    publishDate: ""
  });

  const franchiseData = [
    {
      id: 1,
      title: "Fees Chart",
      details: "Fee structure details for franchise operations",
      date: "31/05/2018 00:00:00",
      category: "financial",
      file: true
    },
    {
      id: 2,
      title: "Training Manual",
      details: "Comprehensive training guide for new franchisees",
      date: "15/06/2023 10:30:00",
      category: "training",
      file: true
    },
    {
      id: 3,
      title: "Marketing Guidelines",
      details: "Brand guidelines and marketing strategies",
      date: "20/07/2023 14:15:00",
      category: "marketing",
      file: false
    }
  ];

  // Filter and search logic
  const filteredData = useMemo(() => {
    return franchiseData.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.details.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "all" || item.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, filterCategory]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitting franchise data:", formData);
    // Reset form
    setFormData({ title: "", details: "", franchise: "", publishDate: "" });
  };

  // Statistics
  const totalRecords = franchiseData.length;
  const thisMonthRecords = franchiseData.filter(item => {
    const itemDate = new Date(item.date);
    const currentDate = new Date();
    return itemDate.getMonth() === currentDate.getMonth() && 
           itemDate.getFullYear() === currentDate.getFullYear();
  }).length;
  const withFiles = franchiseData.filter(item => item.file).length;
  const filteredResults = filteredData.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/50">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-lg border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Franchise Data Management
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage and organize franchise documentation and data files
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent" />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Records
              </CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold text-foreground">{totalRecords}</div>
              <p className="text-xs text-muted-foreground">
                All franchise data files
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent" />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                This Month
              </CardTitle>
              <Calendar className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold text-foreground">{thisMonthRecords}</div>
              <p className="text-xs text-muted-foreground">
                New records added
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent" />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                With Files
              </CardTitle>
              <Image className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold text-foreground">{withFiles}</div>
              <p className="text-xs text-muted-foreground">
                Records with attachments
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent" />
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Filtered Results
              </CardTitle>
              <Filter className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold text-foreground">{filteredResults}</div>
              <p className="text-xs text-muted-foreground">
                Current search results
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Form Section */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Add New Franchise Data
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Title Of Data</label>
                <Input 
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter data title"
                  className="bg-background/50 border-border/50 focus:border-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Details of Franchise</label>
                <Select value={formData.franchise} onValueChange={(value) => handleInputChange("franchise", value)}>
                  <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary/50">
                    <SelectValue placeholder="Select franchise" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border/50">
                    <SelectItem value="franchise1">Downtown Center</SelectItem>
                    <SelectItem value="franchise2">Mall Location</SelectItem>
                    <SelectItem value="franchise3">Suburban Branch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-foreground">Details of Data</label>
                <Textarea 
                  value={formData.details}
                  onChange={(e) => handleInputChange("details", e.target.value)}
                  placeholder="Enter detailed description"
                  className="bg-background/50 border-border/50 focus:border-primary/50 h-24"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Documents</label>
                <Input 
                  type="file" 
                  className="bg-background/50 border-border/50 focus:border-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Date of Publish</label>
                <Input 
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) => handleInputChange("publishDate", e.target.value)}
                  className="bg-background/50 border-border/50 focus:border-primary/50"
                />
              </div>
            </div>

            <Button 
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Submit Now
            </Button>
          </CardContent>
        </Card>

        {/* Search and Filter Section */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search franchise data..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50 focus:border-primary/50"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-48 bg-background/50 border-border/50 focus:border-primary/50">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border/50">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="training">Training</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table Section */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Franchise Data Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground bg-muted/30">Actions</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground bg-muted/30">Title</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground bg-muted/30">Details</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground bg-muted/30">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground bg-muted/30">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-muted-foreground bg-muted/30">File</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr 
                      key={item.id} 
                      className="border-b border-border/30 hover:bg-muted/20 transition-colors duration-150"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10">
                            <Edit className="h-4 w-4 text-primary" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-foreground">{item.title}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-muted-foreground max-w-xs truncate">
                          {item.details}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-muted-foreground">
                          {new Date(item.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge 
                          variant="secondary" 
                          className="capitalize bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          {item.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        {item.file ? (
                          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                            <Image className="h-3 w-3 mr-1" />
                            Yes
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500 border-gray-200">
                            No
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredData.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No data found</h3>
                  <p className="text-muted-foreground">
                    {searchTerm || filterCategory !== "all" 
                      ? "Try adjusting your search or filter criteria"
                      : "Start by adding your first franchise data record"
                    }
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FranchiseDataContent;