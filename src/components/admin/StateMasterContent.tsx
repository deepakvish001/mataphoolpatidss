import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  Filter
} from "lucide-react";
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
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<StateMaster>({ tableName: 'state_master' });

  useAdminRealTime({
    tableName: 'state_master'
  });

  const [stateName, setStateName] = useState("");
  const [editingState, setEditingState] = useState<StateMaster | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Statistics calculation
  const stats = useMemo(() => {
    const total = states.length;
    const recentlyAdded = states.filter(state => {
      if (!state.created_date) return false;
      const createdDate = new Date(state.created_date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return createdDate >= thirtyDaysAgo;
    }).length;
    
    return {
      total,
      recentlyAdded,
      oldestEntry: states.length > 0 ? Math.min(...states.map(s => s.city_id)) : 0,
      newestEntry: states.length > 0 ? Math.max(...states.map(s => s.city_id)) : 0
    };
  }, [states]);

  // Filtered data
  const filteredStates = useMemo(() => {
    return states.filter(state =>
      state.city_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      state.city_id.toString().includes(searchTerm)
    );
  }, [states, searchTerm]);

  const handleSave = async () => {
    if (!stateName.trim()) {
      toast.error("Please enter a state name");
      return;
    }

    try {
      if (editingState) {
        // Update existing state
        await update(editingState.id, {
          city_name: stateName.trim(),
        });
        toast.success("State updated successfully!");
        setEditingState(null);
      } else {
        // Create new state
        const maxCityId = states.length > 0 ? Math.max(...states.map(s => s.city_id)) : 0;
        const newState = {
          city_id: maxCityId + 1,
          city_name: stateName.trim(),
          created_date: new Date().toLocaleDateString()
        };
        await create(newState);
        toast.success("State added successfully!");
      }
      
      setStateName("");
    } catch (error) {
      toast.error(editingState ? "Failed to update state" : "Failed to add state");
    }
  };

  const handleReset = () => {
    setStateName("");
    setEditingState(null);
  };

  const handleEdit = (state: StateMaster) => {
    setEditingState(state);
    setStateName(state.city_name);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this state?")) return;
    
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
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total States</p>
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-xs text-blue-200 mt-1">Registered states</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <MapPin className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Recent Additions</p>
                <p className="text-3xl font-bold">{stats.recentlyAdded}</p>
                <p className="text-xs text-green-200 mt-1">Last 30 days</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Oldest Entry</p>
                <p className="text-3xl font-bold">#{stats.oldestEntry}</p>
                <p className="text-xs text-purple-200 mt-1">First state ID</p>
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
                <p className="text-orange-100 text-sm font-medium">Latest Entry</p>
                <p className="text-3xl font-bold">#{stats.newestEntry}</p>
                <p className="text-xs text-orange-200 mt-1">Recent state ID</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Activity className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* State Master Form */}
      <Card className="shadow-lg border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-background">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500 text-white rounded-lg">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-emerald-700 dark:text-emerald-300">
                {editingState ? 'Edit State Details' : 'Add New State'}
              </CardTitle>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                {editingState ? "Update state information" : "Enter state details for registration"}
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
              <Globe className="h-4 w-4" />
              State Name *
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
              <Input
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                placeholder="Enter state name (e.g., Uttar Pradesh)"
                className="pl-10 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-emerald-200">
            <Button 
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              size="lg"
            >
              {editingState ? (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Update State
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add State
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
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Search States</h3>
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500 h-4 w-4" />
              <Input
                placeholder="Search by state name or ID..."
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

      {/* States Table */}
      <Card className="shadow-lg border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50/50 to-white dark:from-purple-950/20 dark:to-background">
        <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-950/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500 text-white rounded-lg">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-semibold text-purple-700 dark:text-purple-300">
                State Master Registry
              </CardTitle>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Complete state database with {filteredStates.length} entries
                </p>
                <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">
                  {filteredStates.length} of {states.length} states
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
                      State ID
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[200px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-green-500" />
                      State Name
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
                {filteredStates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                          <MapPin className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                            {searchTerm ? "No states found" : "No states available"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                            {searchTerm 
                              ? "Try adjusting your search criteria" 
                              : "Start by adding your first state using the form above"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStates.map((state, index) => (
                    <TableRow 
                      key={state.id} 
                      className={`hover:bg-purple-50/50 dark:hover:bg-purple-950/20 transition-colors ${
                        index % 2 === 0 ? 'bg-white dark:bg-background' : 'bg-gray-50/50 dark:bg-gray-950/30'
                      }`}
                    >
                      <TableCell className="py-4">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(state)}
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            title="Edit state"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(state.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Delete state"
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
                          <span className="font-mono text-sm font-medium">{state.city_id}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded">
                            <Globe className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-gray-100">{state.city_name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-orange-100 dark:bg-orange-900/30 rounded">
                            <Calendar className="h-3 w-3 text-orange-600" />
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {state.created_date || "N/A"}
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

export default StateMasterContent;