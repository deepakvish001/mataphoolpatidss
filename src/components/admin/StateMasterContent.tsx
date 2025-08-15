import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface StateMaster {
  id: string;
  city_id: number;
  city_name: string;
  created_date?: string;
}

const StateMasterContent = () => {
  const {
    data: states,
    loading,
    create,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<StateMaster>({ tableName: 'state_master' });

  useAdminRealTime({
    tableName: 'state_master',
    onInsert: refresh,
    onUpdate: refresh,
    onDelete: refresh
  });

  const [stateName, setStateName] = useState("");

  const handleSave = async () => {
    if (!stateName.trim()) {
      toast.error("Please enter a state name");
      return;
    }

    const maxCityId = states.length > 0 ? Math.max(...states.map(s => s.city_id)) : 0;
    const newState = {
      city_id: maxCityId + 1,
      city_name: stateName,
      created_date: new Date().toLocaleDateString()
    };

    try {
      await create(newState);
      setStateName("");
      toast.success("State added successfully!");
    } catch (error) {
      toast.error("Failed to add state");
    }
  };

  const handleReset = () => {
    setStateName("");
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success("State deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete state");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading states...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Actions</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">cityid</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">cityname</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">createddate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {states.map((state, index) => (
                <TableRow key={state.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
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
                        onClick={() => handleDelete(state.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {state.city_id}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {state.city_name}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {state.created_date || "-"}
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