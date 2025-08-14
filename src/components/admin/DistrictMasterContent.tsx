import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DistrictMasterContent = () => {
  const { toast } = useToast();
  const [selectedState, setSelectedState] = useState("");
  const [districtName, setDistrictName] = useState("");
  
  const [districts, setDistricts] = useState([
    {
      siteid: 10,
      cityid: 16,
      sitename: "Azamgarh",
      createddate: ""
    },
    {
      siteid: 11,
      cityid: 16,
      sitename: "Mau",
      createddate: ""
    },
    {
      siteid: 12,
      cityid: 16,
      sitename: "BALIYA",
      createddate: ""
    },
    {
      siteid: 13,
      cityid: 16,
      sitename: "AMBEDAKAR NAGAR",
      createddate: ""
    },
    {
      siteid: 14,
      cityid: 16,
      sitename: "Deoria",
      createddate: ""
    },
    {
      siteid: 15,
      cityid: 16,
      sitename: "Faizabad",
      createddate: ""
    },
    {
      siteid: 16,
      cityid: 16,
      sitename: "Faizabad",
      createddate: ""
    },
    {
      siteid: 17,
      cityid: 16,
      sitename: "Sant Ravidas Nagar",
      createddate: ""
    },
    {
      siteid: 18,
      cityid: 16,
      sitename: "VARANASI",
      createddate: ""
    },
    {
      siteid: 19,
      cityid: 16,
      sitename: "VARANASI",
      createddate: ""
    }
  ]);

  const states = [
    { value: "16", label: "Uttar Pradesh" },
    { value: "17", label: "Bihar" },
    { value: "18", label: "Madhya Pradesh" }
  ];

  const handleSave = () => {
    if (!selectedState) {
      toast({
        title: "Error",
        description: "Please select a state",
        variant: "destructive"
      });
      return;
    }

    if (!districtName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a district name",
        variant: "destructive"
      });
      return;
    }

    const newDistrict = {
      siteid: Math.max(...districts.map(d => d.siteid)) + 1,
      cityid: parseInt(selectedState),
      sitename: districtName,
      createddate: new Date().toLocaleDateString()
    };

    setDistricts(prev => [...prev, newDistrict]);
    
    toast({
      title: "Success",
      description: "District added successfully!",
      variant: "default"
    });

    setSelectedState("");
    setDistrictName("");
  };

  const handleReset = () => {
    setSelectedState("");
    setDistrictName("");
  };

  const handleDelete = (siteid: number) => {
    setDistricts(prev => prev.filter(district => district.siteid !== siteid));
    toast({
      title: "Success",
      description: "District deleted successfully!",
      variant: "default"
    });
  };

  return (
    <div className="space-y-8">
      {/* District Master Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100 bg-gray-400">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <span>Distt Master</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Select State */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Select State
              </label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white">
                  <SelectValue placeholder="--Select State--" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 rounded shadow-lg z-50">
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value} className="text-gray-700 hover:bg-gray-100">
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* District Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Distt Name
              </label>
              <Input
                value={districtName}
                onChange={(e) => setDistrictName(e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter district name"
              />
            </div>

            {/* Save and Reset Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Save
              </Button>
              <Button
                onClick={handleReset}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Districts Table */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-red-800 hover:bg-red-800">
                <TableHead className="text-white font-bold text-center py-4">siteid</TableHead>
                <TableHead className="text-white font-bold text-center py-4">cityid</TableHead>
                <TableHead className="text-white font-bold text-center py-4">sitename</TableHead>
                <TableHead className="text-white font-bold text-center py-4">createddate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {districts.map((district) => (
                <TableRow key={district.siteid} className="hover:bg-gray-50">
                  <TableCell className="p-4">
                    <div className="flex items-center space-x-2">
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
                          onClick={() => handleDelete(district.siteid)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="text-sm text-gray-700 font-medium ml-2">
                        {district.siteid}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {district.cityid}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {district.sitename}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {district.createddate || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center">
        <div className="bg-yellow-400 px-4 py-2 rounded text-gray-800 font-medium">
          12
        </div>
      </div>
    </div>
  );
};

export default DistrictMasterContent;