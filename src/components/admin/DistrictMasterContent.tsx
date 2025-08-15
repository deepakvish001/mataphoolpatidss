import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface DistrictMaster {
  id: string;
  site_id: number;
  city_id: number;
  site_name: string;
  created_date?: string;
}

const DistrictMasterContent = () => {
  const {
    data: districts,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<DistrictMaster>({ tableName: 'district_master' });

  useAdminRealTime({
    tableName: 'district_master'
  });

  const [selectedState, setSelectedState] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [editingDistrict, setEditingDistrict] = useState<DistrictMaster | null>(null);

  const states = [
    { value: "16", label: "Uttar Pradesh" },
    { value: "17", label: "Bihar" },
    { value: "18", label: "Madhya Pradesh" }
  ];

  const handleSave = async () => {
    if (!selectedState) {
      toast.error("Please select a state");
      return;
    }

    if (!districtName.trim()) {
      toast.error("Please enter a district name");
      return;
    }

    try {
      if (editingDistrict) {
        // Update existing district
        await update(editingDistrict.id, {
          city_id: parseInt(selectedState),
          site_name: districtName.trim()
        });
        toast.success("District updated successfully!");
        setEditingDistrict(null);
      } else {
        // Create new district
        const maxSiteId = districts.length > 0 ? Math.max(...districts.map(d => d.site_id)) : 0;
        const newDistrict = {
          site_id: maxSiteId + 1,
          city_id: parseInt(selectedState),
          site_name: districtName.trim(),
          created_date: new Date().toLocaleDateString()
        };
        await create(newDistrict);
        toast.success("District added successfully!");
      }
      
      setSelectedState("");
      setDistrictName("");
    } catch (error) {
      toast.error(editingDistrict ? "Failed to update district" : "Failed to add district");
    }
  };

  const handleReset = () => {
    setSelectedState("");
    setDistrictName("");
    setEditingDistrict(null);
  };

  const handleEdit = (district: DistrictMaster) => {
    setEditingDistrict(district);
    setSelectedState(district.city_id.toString());
    setDistrictName(district.site_name);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success("District deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete district");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading districts...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

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
                {editingDistrict ? "Update" : "Save"}
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
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-red-800 hover:bg-red-800">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Actions</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">siteid</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">cityid</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">sitename</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">createddate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {districts.map((district, index) => (
                <TableRow key={district.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 p-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(district)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(district.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {district.site_id}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {district.city_id}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {district.site_name}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {district.created_date || "-"}
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
          {Math.ceil(districts.length / 10)}
        </div>
      </div>
    </div>
  );
};

export default DistrictMasterContent;