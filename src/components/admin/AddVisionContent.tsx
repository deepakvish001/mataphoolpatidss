import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash2, Loader2, Search, Upload, TrendingUp, Users, FileText, Image } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface Vision {
  id: string;
  content: string;
  image?: string;
}

const AddVisionContent = () => {
  const {
    data: visions,
    loading,
    create,
    update,
    delete: deleteItem
  } = useOptimisticCrud<Vision>({ tableName: 'visions' });

  useAdminRealTime({
    tableName: 'visions'
  });

  const [content, setContent] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [editingVision, setEditingVision] = useState<Vision | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered visions based on search
  const filteredVisions = visions.filter(vision =>
    vision.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics
  const totalVisions = visions.length;
  const visionsWithImages = visions.filter(vision => vision.image && vision.image !== "No image").length;
  const recentVisions = visions.slice(-3).length; // Last 3 visions
  const activeVisions = totalVisions; // All visions are active

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
    }
  };

  const handleUpload = async () => {
    if (!content.trim()) {
      toast.error("Please enter vision content");
      return;
    }

    try {
      if (editingVision) {
        // Update existing vision
        await update(editingVision.id, {
          content: content.trim(),
          image: selectedPhoto ? selectedPhoto.name : editingVision.image
        });
        toast.success("Vision updated successfully!");
        setEditingVision(null);
      } else {
        // Create new vision
        const newVision = {
          content: content.trim(),
          image: selectedPhoto ? selectedPhoto.name : "No image"
        };
        await create(newVision);
        toast.success("Vision added successfully!");
      }
      
      setContent("");
      setSelectedPhoto(null);
      // Reset file input
      const fileInput = document.getElementById('visionPhotoInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      toast.error(editingVision ? "Failed to update vision" : "Failed to add vision");
    }
  };

  const handleEdit = (vision: Vision) => {
    setEditingVision(vision);
    setContent(vision.content);
    setSelectedPhoto(null); // Reset photo selection
  };

  const handleReset = () => {
    setContent("");
    setSelectedPhoto(null);
    setEditingVision(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success("Vision deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete vision");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading visions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Visions</p>
                <p className="text-3xl font-bold">{totalVisions}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Eye className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Active Visions</p>
                <p className="text-3xl font-bold">{activeVisions}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">With Images</p>
                <p className="text-3xl font-bold">{visionsWithImages}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Image className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Recent Added</p>
                <p className="text-3xl font-bold">{recentVisions}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Vision Form */}
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8">
          <CardTitle className="text-2xl font-bold flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Eye className="h-6 w-6" />
            </div>
            <span>{editingVision ? "Edit Vision" : "Add Our Vision"}</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Content Input */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-green-600" />
                  <span>Vision Content</span>
                </label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[200px] border-2 border-gray-300 focus:border-green-500 focus:ring-green-500/20 rounded-lg text-gray-700 font-medium bg-white/70 backdrop-blur-sm resize-vertical"
                  placeholder="Enter our organization's vision statement..."
                />
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Upload className="h-4 w-4 text-green-600" />
                  <span>Vision Image</span>
                </label>
                <div className="border-2 border-dashed border-green-300 rounded-lg p-6 bg-green-50/50 hover:bg-green-50 transition-colors">
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <input
                      id="visionPhotoInput"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="visionPhotoInput"
                      className="cursor-pointer text-green-600 hover:text-green-700 font-medium"
                    >
                      Click to upload vision image
                    </label>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    {selectedPhoto && (
                      <div className="mt-3 p-2 bg-green-100 rounded-lg">
                        <p className="text-sm text-green-700 font-medium">
                          ✓ {selectedPhoto.name}
                        </p>
                      </div>
                    )}
                    {!selectedPhoto && (
                      <div className="mt-3 p-2 bg-gray-100 rounded-lg">
                        <span className="text-sm text-gray-500">No file chosen</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-8 border-t border-gray-200">
            <Button
              onClick={handleUpload}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>{editingVision ? "Update Vision" : "Add Vision"}</span>
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 font-semibold px-8 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Reset Form</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Vision Table */}
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="text-xl font-bold flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Eye className="h-5 w-5" />
              </div>
              <span>Visions Management ({filteredVisions.length} items)</span>
            </CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search visions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/90 border-white/20 focus:border-white focus:ring-white/20"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                  <TableHead className="text-white font-bold text-center py-4 border-r border-green-500">Vision Content</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-green-500">Image</TableHead>
                  <TableHead className="text-white font-bold text-center py-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVisions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                      {searchTerm ? "No visions found matching your search." : "No visions added yet."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVisions.map((vision, index) => (
                    <TableRow key={vision.id} className={`${index % 2 === 0 ? "bg-green-50/50" : "bg-white"} hover:bg-green-100/50 transition-colors`}>
                      <TableCell className="p-4 border-r border-gray-200">
                        <div className="text-gray-800 max-w-md">
                          {vision.content}
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex justify-center">
                          {vision.image && vision.image !== "No image" ? (
                            <div className="w-12 h-10 bg-green-100 border-2 border-green-300 rounded-lg flex items-center justify-center">
                              <Image className="h-4 w-4 text-green-600" />
                            </div>
                          ) : (
                            <div className="w-12 h-10 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                              <span className="text-xs text-gray-400">No</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4">
                        <div className="flex space-x-2 justify-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(vision)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(vision.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
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

export default AddVisionContent;