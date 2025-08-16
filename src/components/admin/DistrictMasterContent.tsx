import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Edit, 
  Trash2, 
  Loader2, 
  Search, 
  Plus, 
  RefreshCw, 
  Activity, 
  Building, 
  Calendar, 
  Hash, 
  Globe, 
  BarChart3,
  TrendingUp,
  Filter,
  Building2,
  Map
} from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");

  const states = [
    { value: "16", label: "Uttar Pradesh" },
    { value: "17", label: "Bihar" },
    { value: "18", label: "Madhya Pradesh" },
    { value: "19", label: "West Bengal" },
    { value: "20", label: "Maharashtra" },
    { value: "21", label: "Karnataka" },
    { value: "22", label: "Tamil Nadu" },
    { value: "23", label: "Gujarat" },
    { value: "24", label: "Rajasthan" },
    { value: "25", label: "Haryana" }
  ];

  // Statistics calculation
  const stats = useMemo(() => {
    const total = districts.length;
    const byState = districts.reduce((acc, district) => {
      const stateId = district.city_id.toString();
      acc[stateId] = (acc[stateId] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostPopularState = Object.entries(byState).reduce((max, [stateId, count]) => {
      return count > max.count ? { stateId, count } : max;
    }, { stateId: "", count: 0 });

    const recentlyAdded = districts.filter(district => {
      if (!district.created_date) return false;
      const createdDate = new Date(district.created_date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return createdDate >= thirtyDaysAgo;
    }).length;
    
    return {
      total,
      uniqueStates: Object.keys(byState).length,
      mostPopularState: states.find(s => s.value === mostPopularState.stateId)?.label || "N/A",
      recentlyAdded
    };
  }, [districts, states]);

  // Filtered data
  const filteredDistricts = useMemo(() => {
    return districts.filter(district =>
      district.site_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      district.site_id.toString().includes(searchTerm) ||
      district.city_id.toString().includes(searchTerm) ||
      states.find(s => s.value === district.city_id.toString())?.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [districts, searchTerm, states]);

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
    if (!confirm("Are you sure you want to delete this district?")) return;
    
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
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Districts</p>
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-xs text-blue-200 mt-1">Registered districts</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Building2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Unique States</p>
                <p className="text-3xl font-bold">{stats.uniqueStates}</p>
                <p className="text-xs text-green-200 mt-1">States covered</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Map className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Top State</p>
                <p className="text-lg font-bold truncate">{stats.mostPopularState}</p>
                <p className="text-xs text-purple-200 mt-1">Most districts</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <BarChart3 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Recent Additions</p>
                <p className="text-3xl font-bold">{stats.recentlyAdded}</p>
                <p className="text-xs text-orange-200 mt-1">Last 30 days</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* District Master Form */}
      <Card className="shadow-lg border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-background">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500 text-white rounded-lg">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-emerald-700 dark:text-emerald-300">
                {editingDistrict ? 'Edit District Details' : 'Add New District'}
              </CardTitle>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                {editingDistrict ? "Update district information" : "Enter district details for registration"}
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Select State */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Globe className="h-4 w-4" />
                Select State *
              </label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="border-blue-200 focus:border-blue-400">
                  <SelectValue placeholder="--Select State--" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      <div className="flex items-center gap-2">
                        <Map className="h-4 w-4 text-blue-500" />
                        {state.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* District Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <Building2 className="h-4 w-4" />
                District Name *
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
                <Input
                  value={districtName}
                  onChange={(e) => setDistrictName(e.target.value)}
                  placeholder="Enter district name (e.g., Agra)"
                  className="pl-10 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-emerald-200">
            <Button 
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              size="lg"
            >
              {editingDistrict ? (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Update District
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add District
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleReset} size="lg">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Form
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search Section */}
      <Card className="shadow-lg border-l-4 border-l-indigo-500 bg-gradient-to-r from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-background">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500 text-white rounded-lg">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Search Districts</h3>
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500 h-4 w-4" />
              <Input
                placeholder="Search by district name, ID, state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refresh()}
              className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Districts Table */}
      <Card className="shadow-lg border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50/50 to-white dark:from-purple-950/20 dark:to-background">
        <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-950/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500 text-white rounded-lg">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-semibold text-purple-700 dark:text-purple-300">
                District Master Registry
              </CardTitle>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Complete district database with {filteredDistricts.length} entries
                </p>
                <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">
                  {filteredDistricts.length} of {districts.length} districts
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                <TableRow className="border-b-2 border-purple-200">
                  <TableHead className="w-[120px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-purple-500" />
                      Actions
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-blue-500" />
                      Site ID
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Map className="h-4 w-4 text-green-500" />
                      State
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[200px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-emerald-500" />
                      District Name
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[150px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-orange-500" />
                      Created Date
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDistricts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                          <Building2 className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                            {searchTerm ? "No districts found" : "No districts available"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                            {searchTerm 
                              ? "Try adjusting your search criteria" 
                              : "Start by adding your first district using the form above"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDistricts.map((district, index) => (
                    <TableRow 
                      key={district.id} 
                      className={`hover:bg-purple-50/50 dark:hover:bg-purple-950/20 transition-colors ${
                        index % 2 === 0 ? 'bg-white dark:bg-background' : 'bg-gray-50/50 dark:bg-gray-950/30'
                      }`}
                    >
                      <TableCell className="py-4">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(district)}
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            title="Edit district"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(district.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Delete district"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                            <Hash className="h-3 w-3 text-blue-600" />
                          </div>
                          <span className="font-mono text-sm font-medium">{district.site_id}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded">
                            <Map className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-sm font-medium">
                            {states.find(s => s.value === district.city_id.toString())?.label || `State ${district.city_id}`}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-emerald-100 dark:bg-emerald-900/30 rounded">
                            <Building2 className="h-3 w-3 text-emerald-600" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-gray-100">{district.site_name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-orange-100 dark:bg-orange-900/30 rounded">
                            <Calendar className="h-3 w-3 text-orange-600" />
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {district.created_date || "N/A"}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DistrictMasterContent;