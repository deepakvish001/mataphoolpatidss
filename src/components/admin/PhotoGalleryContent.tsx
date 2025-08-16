import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image, Upload, Trash2, Loader2, Search, TrendingUp, Calendar, BarChart3, Eye } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface PhotoGallery {
  id: string;
  title: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Statistics calculation
  const stats = useMemo(() => {
    const total = galleryItems.length;
    const withImages = galleryItems.filter(item => item.image_url).length;
    const withoutImages = total - withImages;
    
    return {
      total,
      withImages,
      withoutImages
    };
  }, [galleryItems]);

  // Filtered and sorted data
  const filteredData = useMemo(() => {
    let filtered = galleryItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort data
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case "oldest":
        filtered.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateA - dateB;
        });
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [galleryItems, searchTerm, sortBy]);

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
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Photos</p>
                <p className="text-3xl font-bold text-primary">{stats.total}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Image className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-success/5 to-success/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">With Images</p>
                <p className="text-3xl font-bold text-success">{stats.withImages}</p>
              </div>
              <div className="p-3 bg-success/10 rounded-full">
                <Eye className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-warning/5 to-warning/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Without Images</p>
                <p className="text-3xl font-bold text-warning">{stats.withoutImages}</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-full">
                <BarChart3 className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Photo To Gallery Form */}
      <Card className="border-0 shadow-xl bg-card">
        <CardHeader className="p-6 border-b">
          <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Upload className="h-5 w-5 text-primary-foreground" />
            </div>
            Add Photo To Gallery
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Title
              </label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="h-11"
                placeholder="Enter photo title"
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Photo
              </label>
              <div className="border border-border rounded-lg p-4 bg-background">
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
                      className="h-10"
                    >
                      Choose file
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formData.photo ? formData.photo.name : "No file chosen"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Button */}
          <div className="pt-6">
            <Button
              onClick={handleUpload}
              className="h-11 px-8"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter Controls */}
      <Card className="border-0 shadow-lg bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search photos by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48 h-11">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="title">By Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Photo Gallery Table */}
      <Card className="border-0 shadow-xl bg-card">
        <CardHeader className="p-6 border-b">
          <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Image className="h-5 w-5 text-primary-foreground" />
            </div>
            Photo Gallery
            <Badge variant="secondary" className="ml-auto">
              {filteredData.length} {filteredData.length === 1 ? 'Photo' : 'Photos'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredData.length === 0 ? (
            <div className="p-12 text-center">
              <Image className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No photos found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try adjusting your search terms" : "Start by uploading your first photo"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Actions</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="w-32">Image</TableHead>
                    <TableHead className="w-24">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.title}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-16 h-12 object-cover rounded-lg border"
                            />
                          ) : (
                            <div className="w-16 h-12 bg-muted border rounded-lg flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">No Image</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.image_url ? "default" : "outline"}>
                          {item.image_url ? "Has Image" : "No Image"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoGalleryContent;