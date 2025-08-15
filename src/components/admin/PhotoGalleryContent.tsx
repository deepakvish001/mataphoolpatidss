import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Image, Upload, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface PhotoGallery {
  id: string;
  title: string;
  image_url?: string;
}

const PhotoGalleryContent = () => {
  const {
    data: galleryItems,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<PhotoGallery>({ tableName: 'photo_gallery' });

  useAdminRealTime({
    tableName: 'photo_gallery'
  });

  const [formData, setFormData] = useState({
    title: "",
    photo: null as File | null
  });
  const [editingItem, setEditingItem] = useState<PhotoGallery | null>(null);

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInputChange('photo', file);
    }
  };

  const handleUpload = async () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    const imageUrl = formData.photo ? URL.createObjectURL(formData.photo) : "";

    const newGalleryItem = {
      title: formData.title,
      image_url: imageUrl
    };

    try {
      await create(newGalleryItem);
      
      // Reset form
      setFormData({
        title: "",
        photo: null
      });

      // Reset file input
      const fileInput = document.getElementById('gallery-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      toast.success("Photo uploaded to gallery successfully!");
    } catch (error) {
      toast.error("Failed to upload photo");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success("Photo deleted from gallery successfully!");
    } catch (error) {
      toast.error("Failed to delete photo");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading photo gallery...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Add Photo To Gallery Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-blue-600 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Image className="h-6 w-6 text-white" />
            </div>
            <span>Add Photo To Gallery</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Title
              </label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter photo title"
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Photo
              </label>
              <div className="border border-gray-300 rounded p-4 bg-white">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      id="gallery-file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button
                      variant="outline"
                      className="h-10 px-4 border-gray-300 hover:bg-gray-50 font-medium text-gray-700"
                    >
                      Choose file
                    </Button>
                  </div>
                  <span className="text-gray-500 font-medium">
                    {formData.photo ? formData.photo.name : "No file chosen"}
                  </span>
                </div>
              </div>
            </div>

            {/* Upload Button */}
            <div className="pt-4">
              <Button
                onClick={handleUpload}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Upload className="h-5 w-5 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Gallery Table */}
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-500 hover:bg-blue-500">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4 w-24">Delete</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Title</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">IMAGE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {galleryItems.map((item, index) => (
                <TableRow key={item.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 text-center p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {item.title}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4">
                    <div className="flex justify-center">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-24 h-16 object-cover rounded border border-gray-200"
                        />
                      ) : (
                        <div className="w-24 h-16 bg-gray-200 border border-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-500">No Image</span>
                        </div>
                      )}
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

export default PhotoGalleryContent;