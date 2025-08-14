import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StateMasterContent = () => {
  const { toast } = useToast();
  const [stateName, setStateName] = useState("");
  
  const [states, setStates] = useState([
    {
      cityid: 16,
      cityname: "Uttar Pradesh",
      createddate: ""
    },
    {
      cityid: 17,
      cityname: "Bihar", 
      createddate: ""
    },
    {
      cityid: 18,
      cityname: "Madhya Pradesh",
      createddate: ""
    }
  ]);

  const handleSave = () => {
    if (!stateName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a state name",
        variant: "destructive"
      });
      return;
    }

    const newState = {
      cityid: Math.max(...states.map(s => s.cityid)) + 1,
      cityname: stateName,
      createddate: new Date().toLocaleDateString()
    };

    setStates(prev => [...prev, newState]);
    
    toast({
      title: "Success",
      description: "State added successfully!",
      variant: "default"
    });

    setStateName("");
  };

  const handleReset = () => {
    setStateName("");
  };

  const handleDelete = (cityid: number) => {
    setStates(prev => prev.filter(state => state.cityid !== cityid));
    toast({
      title: "Success",
      description: "State deleted successfully!",
      variant: "default"
    });
  };

  return (
    <div className="space-y-8">
      {/* State Master Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100 bg-gray-400">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <span>State Master</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* State Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                State Name
              </label>
              <Input
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter state name"
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

      {/* States Table */}
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-red-800 hover:bg-red-800">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">cityid</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">cityname</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">createddate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {states.map((state, index) => (
                <TableRow key={state.cityid} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 p-4">
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
                          onClick={() => handleDelete(state.cityid)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="text-sm text-gray-700 font-medium ml-2">
                        {state.cityid}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {state.cityname}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {state.createddate || "-"}
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

export default StateMasterContent;