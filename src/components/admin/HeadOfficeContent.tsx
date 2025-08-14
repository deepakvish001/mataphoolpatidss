import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HeadOfficeContent = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    address: "",
    contactNumber: "",
    email: ""
  });

  const [headOffices, setHeadOffices] = useState([
    {
      id: 1,
      address: "Near Union Bank Of India ------------------------------------Vill & Post - Bilariyaganj, Dist- Azamgarh, Uttar Pradesh - 276121 -------------------------------- www.binasoftedu.org.in",
      phone: "7007939906",
      email: "infobinasoft@gmail.com"
    }
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.address.trim() || !formData.contactNumber.trim() || !formData.email.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const newOffice = {
      id: Date.now(),
      address: formData.address,
      phone: formData.contactNumber,
      email: formData.email
    };

    setHeadOffices(prev => [...prev, newOffice]);
    
    toast({
      title: "Success",
      description: "Head Office details added successfully!",
      variant: "default"
    });

    // Reset form
    setFormData({
      address: "",
      contactNumber: "",
      email: ""
    });
  };

  const handleDelete = (id: number) => {
    setHeadOffices(prev => prev.filter(office => office.id !== id));
    toast({
      title: "Success",
      description: "Head Office deleted successfully!",
      variant: "default"
    });
  };

  return (
    <div className="space-y-8">
      {/* Add Head Office Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100 bg-gray-200">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <span>Add Head Office Details</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Head Office Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Head Office Address
              </label>
              <Textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white resize-none"
                placeholder="Enter head office address"
              />
            </div>

            {/* Contact Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <Input
                value={formData.contactNumber}
                onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter contact number"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter email address"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Submit Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Head Office List Table */}
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Address</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Phone</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Email-ID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {headOffices.map((office, index) => (
                <TableRow key={office.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 p-4">
                    <div className="flex items-start space-x-2">
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
                          onClick={() => handleDelete(office.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="text-sm text-gray-700 leading-relaxed">
                        {office.address}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {office.phone}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {office.email}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeadOfficeContent;