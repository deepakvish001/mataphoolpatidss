import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Image, Upload, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PhotoGalleryContent = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    photo: null as File | null
  });

  const [galleryItems, setGalleryItems] = useState([
    {
      id: 1,
      title: "hhj",
      imageUrl: "/lovable-uploads/e0268324-767d-4546-ae7a-82269bfbe1d4.png"
    }
  ]);

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

  const handleUpload = () => {
    if (!formData.title.trim() || !formData.photo) {
      toast({
        title: "Error",
        description: "Please fill in the title and select a photo",
        variant: "destructive"
      });
      return;
    }

    // Create a URL for the uploaded file (in a real app, this would be uploaded to a server)
    const imageUrl = URL.createObjectURL(formData.photo);

    const newGalleryItem = {
      id: Date.now(),
      title: formData.title,
      imageUrl: imageUrl
    };

    setGalleryItems(prev => [...prev, newGalleryItem]);
    
    toast({
      title: "Success",
      description: "Photo uploaded to gallery successfully!",
      variant: "default"
    });

    // Reset form
    setFormData({
      title: "",
      photo: null
    });

    // Reset file input
    const fileInput = document.getElementById('gallery-file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleDelete = (id: number) => {
    setGalleryItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Success",
      description: "Photo deleted from gallery successfully!",
      variant: "default"
    });
  };

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
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-500 hover:bg-blue-500">
                <TableHead className="text-white font-bold text-center py-4 w-24">Delete</TableHead>
                <TableHead className="text-white font-bold text-center py-4">Title</TableHead>
                <TableHead className="text-white font-bold text-center py-4">IMAGE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {galleryItems.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="text-center p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {item.title}
                  </TableCell>
                  <TableCell className="text-center p-4">
                    <div className="flex justify-center">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-24 h-16 object-cover rounded border border-gray-200"
                      />
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