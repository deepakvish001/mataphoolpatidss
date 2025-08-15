import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Phone, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface ContactUs {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at?: string;
}

const ContactUsContent = () => {
  const {
    data: contacts,
    loading,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<ContactUs>({ tableName: 'contact_us' });

  useAdminRealTime({
    tableName: 'contact_us',
    onInsert: refresh,
    onUpdate: refresh,
    onDelete: refresh
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success("Contact deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete contact");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading contacts...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* My All Contacts Header */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100 bg-gray-400">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <span>My All Contacts</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          {contacts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600">
                  <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Name</TableHead>
                  <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Email</TableHead>
                  <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Phone</TableHead>
                  <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Message</TableHead>
                  <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Date</TableHead>
                  <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact, index) => (
                  <TableRow key={contact.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                    <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                      {contact.name}
                    </TableCell>
                    <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                      {contact.email}
                    </TableCell>
                    <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                      {contact.phone || "-"}
                    </TableCell>
                    <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium max-w-xs truncate">
                      {contact.message}
                    </TableCell>
                    <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                      {contact.created_at ? new Date(contact.created_at).toLocaleDateString() : "-"}
                    </TableCell>
                    <TableCell className="border-2 border-gray-600 text-center p-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(contact.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="ml-1">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="p-8 min-h-[400px] bg-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Phone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No contacts yet</p>
                <p className="text-sm">Contact messages will appear here</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactUsContent;