import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EnquiryContent = () => {
  const { toast } = useToast();
  
  const [enquiries, setEnquiries] = useState([
    {
      id: 1,
      firstName: "minhajuddin",
      lastName: "Kausar",
      email: "a@gfmail.com",
      phone: "9415834947",
      state: "uttarpradesh",
      city: "",
      organization: "",
      address: ""
    },
    {
      id: 2,
      firstName: "VINEET",
      lastName: "PANDEY",
      email: "vineetpand66@gmail.com",
      phone: "7458002780",
      state: "UTTARPARADESH",
      city: "",
      organization: "",
      address: ""
    },
    {
      id: 3,
      firstName: "1",
      lastName: "1",
      email: "1",
      phone: "1",
      state: "1",
      city: "",
      organization: "",
      address: ""
    },
    {
      id: 4,
      firstName: "1",
      lastName: "1",
      email: "1",
      phone: "1",
      state: "1",
      city: "",
      organization: "",
      address: ""
    },
    {
      id: 5,
      firstName: "1",
      lastName: "1",
      email: "1",
      phone: "1",
      state: "1",
      city: "",
      organization: "",
      address: ""
    },
    {
      id: 6,
      firstName: "1",
      lastName: "1",
      email: "1",
      phone: "1",
      state: "1",
      city: "",
      organization: "",
      address: ""
    },
    {
      id: 7,
      firstName: "8lboShqP",
      lastName: "1",
      email: "1",
      phone: "1",
      state: "1",
      city: "",
      organization: "",
      address: ""
    },
    {
      id: 8,
      firstName: "-1 OR 2+51-51-1=0+0+0+1 --",
      lastName: "1",
      email: "1",
      phone: "1",
      state: "1",
      city: "",
      organization: "",
      address: ""
    },
    {
      id: 9,
      firstName: "-1 OR 2+911-911-1=0+0+0+1",
      lastName: "1",
      email: "1",
      phone: "1",
      state: "1",
      city: "",
      organization: "",
      address: ""
    },
    {
      id: 10,
      firstName: "-1' OR 2+373-373-1=0+0+0+1 --",
      lastName: "1",
      email: "1",
      phone: "1",
      state: "1",
      city: "",
      organization: "",
      address: ""
    }
  ]);

  const handleDelete = (id: number) => {
    setEnquiries(prev => prev.filter(enquiry => enquiry.id !== id));
    toast({
      title: "Success",
      description: "Enquiry deleted successfully!",
      variant: "default"
    });
  };

  return (
    <div className="space-y-8">
      {/* Enquiry Table */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
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
                <TableHead className="text-white font-bold text-center py-4">First Name</TableHead>
                <TableHead className="text-white font-bold text-center py-4">Last Name</TableHead>
                <TableHead className="text-white font-bold text-center py-4">Email</TableHead>
                <TableHead className="text-white font-bold text-center py-4">Phone</TableHead>
                <TableHead className="text-white font-bold text-center py-4">State</TableHead>
                <TableHead className="text-white font-bold text-center py-4">City</TableHead>
                <TableHead className="text-white font-bold text-center py-4">Organization</TableHead>
                <TableHead className="text-white font-bold text-center py-4">Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enquiries.map((enquiry) => (
                <TableRow key={enquiry.id} className="hover:bg-gray-50">
                  <TableCell className="p-4">
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
                        {enquiry.firstName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {enquiry.lastName}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {enquiry.email}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {enquiry.phone}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {enquiry.state}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {enquiry.city || "-"}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {enquiry.organization || "-"}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
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
          12345678910...
        </div>
      </div>
    </div>
  );
};

export default EnquiryContent;