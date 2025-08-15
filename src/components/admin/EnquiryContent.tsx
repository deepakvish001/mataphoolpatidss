import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageCircle, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface Enquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  state: string;
  city?: string;
  organization?: string;
  address?: string;
}

const EnquiryContent = () => {
  const {
    data: enquiries,
    loading,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<Enquiry>({ tableName: 'enquiries' });

  useAdminRealTime({
    tableName: 'enquiries',
    onInsert: refresh,
    onUpdate: refresh,
    onDelete: refresh
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success("Enquiry deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete enquiry");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading enquiries...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Enquiry Table */}
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100 bg-gray-400">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <span>My All Enquiry</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">First Name</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Last Name</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Email</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Phone</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">State</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">City</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Organization</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enquiries.map((enquiry, index) => (
                <TableRow key={enquiry.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 p-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(enquiry.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="ml-1">Delete</span>
                      </Button>
                      <span className="text-sm text-gray-700 font-medium ml-2">
                        {enquiry.first_name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {enquiry.last_name}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {enquiry.email}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {enquiry.phone}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {enquiry.state}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {enquiry.city || "-"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {enquiry.organization || "-"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {enquiry.address || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center">
        <div className="bg-blue-600 px-4 py-2 rounded text-white font-medium">
          {Math.ceil(enquiries.length / 10) || 1}
        </div>
      </div>
    </div>
  );
};

export default EnquiryContent;