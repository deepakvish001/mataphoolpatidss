import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Trash2, Loader2, Search, Mail, Users, Calendar, MessageSquare, Clock } from "lucide-react";
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
    tableName: 'contact_us'
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Filtered contacts based on search
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (contact.phone && contact.phone.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate statistics
  const totalContacts = contacts.length;
  const recentContacts = contacts.filter(contact => {
    if (!contact.created_at) return false;
    const contactDate = new Date(contact.created_at);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return contactDate >= threeDaysAgo;
  }).length;
  const todayContacts = contacts.filter(contact => {
    if (!contact.created_at) return false;
    const contactDate = new Date(contact.created_at);
    const today = new Date();
    return contactDate.toDateString() === today.toDateString();
  }).length;
  const contactsWithPhone = contacts.filter(contact => contact.phone && contact.phone.trim() !== "").length;

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
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Contacts</p>
                <p className="text-3xl font-bold">{totalContacts}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Today's Contacts</p>
                <p className="text-3xl font-bold">{todayContacts}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Recent Contacts</p>
                <p className="text-3xl font-bold">{recentContacts}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">With Phone</p>
                <p className="text-3xl font-bold">{contactsWithPhone}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Phone className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Contacts Table */}
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="text-xl font-bold flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Phone className="h-5 w-5" />
              </div>
              <span>Contact Management ({filteredContacts.length} items)</span>
            </CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/90 border-white/20 focus:border-white focus:ring-white/20"
              />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {filteredContacts.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Name</TableHead>
                    <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Email</TableHead>
                    <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Phone</TableHead>
                    <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Message</TableHead>
                    <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Date</TableHead>
                    <TableHead className="text-white font-bold text-center py-4">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact, index) => (
                    <TableRow key={contact.id} className={`${index % 2 === 0 ? "bg-blue-50/50" : "bg-white"} hover:bg-blue-100/50 transition-colors`}>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex items-center justify-center space-x-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-gray-800">{contact.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex items-center justify-center space-x-2">
                          <Mail className="h-4 w-4 text-green-600" />
                          <span className="text-gray-700">{contact.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex items-center justify-center space-x-2">
                          <Phone className="h-4 w-4 text-purple-600" />
                          <span className="text-gray-700">{contact.phone || "-"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex items-center justify-center space-x-2">
                          <MessageSquare className="h-4 w-4 text-orange-600" />
                          <span className="text-gray-700 max-w-xs truncate">{contact.message}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex items-center justify-center space-x-2">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="text-gray-700 text-sm">
                            {contact.created_at ? new Date(contact.created_at).toLocaleDateString() : "-"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(contact.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="p-8 min-h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-500">
                {searchTerm ? (
                  <>
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No contacts found</p>
                    <p className="text-sm">Try adjusting your search terms</p>
                  </>
                ) : (
                  <>
                    <Phone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No contacts yet</p>
                    <p className="text-sm">Contact messages will appear here</p>
                  </>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactUsContent;