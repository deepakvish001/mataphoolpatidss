import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash2, Loader2 } from "lucide-react";
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
      {/* Add Vision Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-green-600 flex items-center space-x-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <span>Add Our Vision</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Content */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Content
              </label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] border-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded text-gray-700 font-medium bg-white resize-vertical"
                placeholder="Enter vision content"
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Photo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white">
                <input
                  id="visionPhotoInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="text-gray-700"
                />
                {selectedPhoto && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {selectedPhoto.name}
                  </p>
                )}
                {!selectedPhoto && (
                  <p className="text-sm text-gray-500 mt-2">
                    No file chosen
                  </p>
                )}
              </div>
            </div>

            {/* Upload and Reset Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button
                onClick={handleUpload}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {editingVision ? "Update" : "Upload"}
              </Button>
              <Button
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vision Table */}
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-green-600 hover:bg-green-600">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Our Vision</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">IMAGE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visions.map((vision, index) => (
                <TableRow key={vision.id} className={index % 2 === 0 ? "bg-green-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 p-4">
                    <div className="flex items-start space-x-2">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(vision)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(vision.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="text-sm text-gray-700 font-medium ml-2 flex-1">
                        {vision.content}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4">
                    <div className="w-16 h-12 bg-gray-800 border-2 border-gray-400 mx-auto rounded flex items-center justify-center">
                      <span className="text-xs text-white">IMG</span>
                    </div>
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

export default AddVisionContent;