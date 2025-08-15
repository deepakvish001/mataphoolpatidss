import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileSearch, Search, Download, Printer, Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface CertificateMarksheet {
  id: string;
  student_id: string;
  student_name: string;
  course_name: string;
  certificate_url?: string;
  marksheet_url?: string;
  issue_date: string;
  status: 'issued' | 'pending' | 'verified';
}

const ReportContent = () => {
  const {
    data: reports,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<CertificateMarksheet>({ 
    tableName: 'certificate_management',
    orderBy: { column: 'issue_date', ascending: false }
  });

  useAdminRealTime({
    tableName: 'certificate_management'
  });

  const [searchValue, setSearchValue] = useState("");
  const [filteredReports, setFilteredReports] = useState<CertificateMarksheet[]>([]);

  const handleSearch = () => {
    if (!searchValue.trim()) {
      toast.error("Please enter search criteria");
      return;
    }

    const filtered = reports.filter(report => 
      report.student_name.toLowerCase().includes(searchValue.toLowerCase()) ||
      report.student_id.toLowerCase().includes(searchValue.toLowerCase()) ||
      report.course_name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredReports(filtered);
    toast.success(`Found ${filtered.length} matching records`);
  };

  const handleDownload = (report: CertificateMarksheet) => {
    toast.info(`Downloading certificate/marksheet for ${report.student_name}`);
  };

  const handlePrint = (report: CertificateMarksheet) => {
    toast.info(`Printing certificate/marksheet for ${report.student_name}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    
    try {
      await deleteItem(id);
      toast.success("Record deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete record");
    }
  };

  const displayReports = searchValue ? filteredReports : reports;

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading certificate and marksheet data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-blue-600 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <FileSearch className="h-6 w-6 text-white" />
            </div>
            <span>Certificate & Marksheet Reports</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="flex gap-4 items-center">
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-96 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              placeholder="Search by student name, ID, or course..."
            />
            <Button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-6 py-3 h-12 flex items-center space-x-2"
            >
              <Search className="h-4 w-4" />
              <span>Search Now</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Table */}
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Actions</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Student ID</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Student Name</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Course</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Issue Date</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Status</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayReports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="border-2 border-gray-600 px-4 py-8 text-center text-gray-500">
                    {searchValue ? "No matching records found" : "No certificate/marksheet records found"}
                  </TableCell>
                </TableRow>
              ) : (
                displayReports.map((report, index) => (
                  <TableRow key={report.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                    <TableCell className="border-2 border-gray-600 p-4">
                      <div className="flex justify-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(report.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                      {report.student_id}
                    </TableCell>
                    <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                      {report.student_name}
                    </TableCell>
                    <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                      {report.course_name}
                    </TableCell>
                    <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                      {new Date(report.issue_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="border-2 border-gray-600 text-center p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === 'issued' ? 'bg-green-100 text-green-800' :
                        report.status === 'verified' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {report.status}
                      </span>
                    </TableCell>
                    <TableCell className="border-2 border-gray-600 text-center p-4">
                      <div className="flex justify-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(report)}
                          className="text-green-600 hover:text-green-800 hover:bg-green-50 p-1"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePrint(report)}
                          className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 p-1"
                        >
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportContent;