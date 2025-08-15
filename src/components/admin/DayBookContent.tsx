import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Search, Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface DayBookEntry {
  id: string;
  service_name: string;
  amount: number;
  entry_date: string;
  description?: string;
  transaction_type: string;
}

const DayBookContent = () => {
  const {
    data: dayBookEntries,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<DayBookEntry>({ 
    tableName: 'day_book_entries',
    orderBy: { column: 'entry_date', ascending: false }
  });

  useAdminRealTime({
    tableName: 'day_book_entries'
  });

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [filteredEntries, setFilteredEntries] = useState<DayBookEntry[]>([]);

  // Filter entries based on search criteria
  useEffect(() => {
    let filtered = dayBookEntries;

    if (serviceName) {
      filtered = filtered.filter(entry => 
        entry.service_name.toLowerCase().includes(serviceName.toLowerCase())
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter(entry => {
        const entryDate = new Date(entry.entry_date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return entryDate >= start && entryDate <= end;
      });
    }

    setFilteredEntries(filtered);
  }, [dayBookEntries, serviceName, startDate, endDate]);

  const handleSearch = () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }
    // The filtering is already done in useEffect
    toast.success(`Found ${filteredEntries.length} entries`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    
    try {
      await deleteItem(id);
      toast.success("Day book entry deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete entry");
    }
  };

  const totalAmount = filteredEntries.reduce((sum, entry) => sum + entry.amount, 0);

  if (loading) {
    return (
      <div className="w-full max-w-none bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading day book entries...</p>
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

      {/* Day Book Header */}
      <div className="px-4 py-6 space-y-6">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="p-8 border-b border-gray-100">
            <CardTitle className="text-2xl font-bold text-green-600 flex items-center space-x-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span>Day Book</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Filter Controls */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Start Date */}
              <div>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Start Date"
                  className="w-64 bg-white border border-gray-400 h-12 text-base"
                />
              </div>

              {/* End Date */}
              <div>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="End Date"
                  className="w-64 bg-white border border-gray-400 h-12 text-base"
                />
              </div>

              {/* Search Button */}
              <Button 
                onClick={handleSearch}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 h-12 text-base font-medium flex items-center space-x-2"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Button>

              {/* Service Name */}
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">Service Name *</span>
                <Select value={serviceName} onValueChange={setServiceName}>
                  <SelectTrigger className="w-64 bg-white border border-gray-400 h-12 text-base">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Services</SelectItem>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="tea">Tea</SelectItem>
                    <SelectItem value="office-supplies">Office Supplies</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Amount Section */}
        <div className="mb-6">
          <span className="text-gray-700 font-medium text-lg">
            Total Amount : <span className="text-green-600 font-bold">₹{totalAmount.toFixed(2)}</span>
          </span>
        </div>

        {/* Day Book Entries Table */}
        {filteredEntries.length > 0 ? (
          <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-600 hover:bg-blue-600">
                    <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Actions</TableHead>
                    <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Service Name</TableHead>
                    <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Amount</TableHead>
                    <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Date</TableHead>
                    <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Type</TableHead>
                    <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry, index) => (
                    <TableRow key={entry.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                      <TableCell className="border-2 border-gray-600 p-4">
                        <div className="flex space-x-2">
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
                            onClick={() => handleDelete(entry.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                        {entry.service_name}
                      </TableCell>
                      <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                        ₹{entry.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                        {new Date(entry.entry_date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                        {entry.transaction_type}
                      </TableCell>
                      <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                        {entry.description || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg border-0 bg-white rounded-lg">
            <CardContent className="p-8 min-h-96">
              <div className="text-center text-gray-500 text-lg">
                No records found. Please select dates and service name to view day book entries.
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DayBookContent;