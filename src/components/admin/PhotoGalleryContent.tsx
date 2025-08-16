import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Image, Upload, Trash2, Loader2, Search, TrendingUp, Calendar, BarChart3, Eye, Camera, Download, Edit, Star, Plus, ImageIcon, Users, Zap, Award, Heart } from "lucide-react";
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
    const thisMonth = galleryItems.filter(item => {
      if (!item.created_at) return false;
      const itemDate = new Date(item.created_at);
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
    }).length;
    
    return {
      total,
      withImages,
      withoutImages,
      thisMonth
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
      <Card className="border-0 shadow-lg bg-card">
        <CardContent className="p-12 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-purple-100 rounded-full">
              <Camera className="h-12 w-12 text-purple-600 animate-pulse" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Loading Photo Gallery</h3>
              <p className="text-muted-foreground">Please wait while we load your beautiful photos...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 mb-1">Total Photos</p>
                <p className="text-3xl font-bold text-purple-700">{stats.total}</p>
                <p className="text-xs text-purple-500 mt-1">Gallery collection</p>
              </div>
              <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 mb-1">With Images</p>
                <p className="text-3xl font-bold text-green-700">{stats.withImages}</p>
                <p className="text-xs text-green-500 mt-1">Ready to view</p>
              </div>
              <div className="p-3 bg-green-500 rounded-xl shadow-lg">
                <Eye className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 mb-1">This Month</p>
                <p className="text-3xl font-bold text-orange-700">{stats.thisMonth}</p>
                <p className="text-xs text-orange-500 mt-1">Recent uploads</p>
              </div>
              <div className="p-3 bg-orange-500 rounded-xl shadow-lg">
                <Calendar className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">Search Results</p>
                <p className="text-3xl font-bold text-blue-700">{filteredData.length}</p>
                <p className="text-xs text-blue-500 mt-1">Current filter</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                <Search className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Photo To Gallery Form */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-50 to-purple-50 border-t-4 border-t-purple-500">
        <CardHeader className="p-6 border-b bg-gradient-to-r from-purple-500 to-pink-600">
          <CardTitle className="text-xl font-semibold text-white flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Camera className="h-6 w-6 text-white" />
            </div>
            {editingItem ? 'Edit Photo' : 'Add Photo To Gallery'}
            {editingItem && (
              <Badge variant="secondary" className="ml-auto bg-white/20 text-white border-white/30">
                Editing Mode
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Title */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-purple-500" />
                Photo Title *
              </label>
              <Input
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="h-12 border-2 border-purple-200 hover:border-purple-400 rounded-lg bg-purple-50/50 focus:bg-white transition-all"
                placeholder="Enter descriptive photo title"
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-3 lg:col-span-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Upload className="h-4 w-4 text-pink-500" />
                Upload Photo
              </label>
              <div className="border-2 border-dashed border-pink-200 rounded-xl p-8 bg-pink-50/50 hover:border-pink-400 transition-all">
                <div className="flex flex-col items-center justify-center space-y-4">
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
                      className="h-12 px-8 border-2 border-pink-300 hover:border-pink-500 bg-white hover:bg-pink-50 text-pink-700 font-semibold rounded-lg shadow-sm"
                    >
                      <Camera className="h-5 w-5 mr-2" />
                      Choose Photo
                    </Button>
                  </div>
                  
                  {formData.photo ? (
                    <div className="flex items-center gap-3 bg-white rounded-lg p-4 border border-pink-200 shadow-sm">
                      <div className="p-2 bg-pink-100 rounded-lg">
                        <ImageIcon className="h-5 w-5 text-pink-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-pink-700">
                          {formData.photo.name}
                        </p>
                        <p className="text-xs text-pink-500">
                          {(formData.photo.size / 1024 / 1024).toFixed(1)} MB
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs text-pink-600 border-pink-300 bg-pink-50">
                        Ready to upload
                      </Badge>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="p-4 bg-pink-100 rounded-full w-fit mx-auto mb-3">
                        <Camera className="h-8 w-8 text-pink-500" />
                      </div>
                      <p className="text-sm font-medium text-pink-600 mb-1">Drop your photo here or click to browse</p>
                      <p className="text-xs text-pink-500">Supports: JPG, PNG, GIF, WEBP</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  <Badge variant="outline" className="text-xs text-purple-600 border-purple-200 bg-purple-50">
                    <ImageIcon className="h-3 w-3 mr-1" />
                    JPG
                  </Badge>
                  <Badge variant="outline" className="text-xs text-pink-600 border-pink-200 bg-pink-50">
                    <ImageIcon className="h-3 w-3 mr-1" />
                    PNG
                  </Badge>
                  <Badge variant="outline" className="text-xs text-orange-600 border-orange-200 bg-orange-50">
                    <ImageIcon className="h-3 w-3 mr-1" />
                    GIF
                  </Badge>
                  <Badge variant="outline" className="text-xs text-blue-600 border-blue-200 bg-blue-50">
                    <ImageIcon className="h-3 w-3 mr-1" />
                    WEBP
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Button */}
          <div className="flex gap-4 pt-8 border-t border-gray-100">
            <Button
              onClick={handleUpload}
              className="h-12 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Upload className="h-5 w-5 mr-2" />
              {editingItem ? "Update Photo" : "Upload Photo"}
            </Button>
            <Button
              onClick={() => {
                setFormData({ title: "", photo: null });
                setEditingItem(null);
                const fileInput = document.getElementById('gallery-file') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
              }}
              variant="outline"
              className="h-12 px-8 border-2 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition-all duration-200"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Form
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter Controls */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-slate-50 border-l-4 border-l-indigo-500">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500" />
              <Input
                placeholder="Search photos by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-2 border-indigo-200 hover:border-indigo-400 rounded-lg bg-white focus:bg-white shadow-sm"
              />
            </div>
            <div className="w-full lg:w-64">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12 border-2 border-indigo-200 hover:border-indigo-400 rounded-lg bg-white shadow-sm">
                  <TrendingUp className="h-5 w-5 mr-2 text-indigo-500" />
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent className="border-2 border-indigo-200">
                  <SelectItem value="newest" className="hover:bg-indigo-50">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-indigo-500" />
                      Newest First
                    </div>
                  </SelectItem>
                  <SelectItem value="oldest" className="hover:bg-indigo-50">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-indigo-500" />
                      Oldest First
                    </div>
                  </SelectItem>
                  <SelectItem value="title" className="hover:bg-indigo-50">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-indigo-500" />
                      By Title
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Photo Gallery Table */}
      <Card className="border-0 shadow-2xl bg-white border-t-4 border-t-gradient-to-r from-purple-500 to-pink-500">
        <CardHeader className="p-6 border-b bg-gradient-to-r from-purple-500 to-pink-600">
          <CardTitle className="text-xl font-semibold text-white flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Camera className="h-6 w-6 text-white" />
            </div>
            Photo Gallery Collection
            <div className="flex gap-2 ml-auto">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {filteredData.length} Showing
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {stats.total} Total
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredData.length === 0 ? (
            <div className="p-16 text-center bg-gradient-to-b from-purple-50 to-pink-50">
              <div className="p-4 bg-purple-100 rounded-full w-fit mx-auto mb-6">
                <Camera className="h-16 w-16 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-purple-800 mb-3">No photos found</h3>
              <p className="text-purple-600 mb-6 max-w-md mx-auto">
                {searchTerm ? 
                  "Try adjusting your search terms to find the perfect photo." : 
                  "Start building your stunning photo gallery by uploading your first image."
                }
              </p>
              <Button
                onClick={() => {
                  setFormData({ title: "", photo: null });
                  setEditingItem(null);
                }}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Upload First Photo
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-slate-100 to-gray-100 border-b-2 border-gray-200">
                    <TableHead className="w-32 text-center font-semibold text-gray-700 py-4">
                      <Users className="h-4 w-4 mx-auto mb-1" />
                      Actions
                    </TableHead>
                    <TableHead className="min-w-[250px] font-semibold text-gray-700 py-4">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-purple-500" />
                        Photo Title
                      </div>
                    </TableHead>
                    <TableHead className="w-40 text-center font-semibold text-gray-700 py-4">
                      <div className="flex items-center gap-2 justify-center">
                        <Camera className="h-4 w-4 text-pink-500" />
                        Preview
                      </div>
                    </TableHead>
                    <TableHead className="w-32 text-center font-semibold text-gray-700 py-4">
                      <div className="flex items-center gap-2 justify-center">
                        <Calendar className="h-4 w-4 text-orange-500" />
                        Added
                      </div>
                    </TableHead>
                    <TableHead className="w-28 text-center font-semibold text-gray-700 py-4">
                      <Award className="h-4 w-4 mx-auto" />
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item, index) => (
                    <TableRow 
                      key={item.id} 
                      className={`
                        hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 
                        transition-all duration-200 border-b border-gray-100
                        ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                      `}
                    >
                      <TableCell className="text-center py-6">
                        <div className="flex gap-2 justify-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingItem(item);
                              setFormData({
                                title: item.title,
                                photo: null
                              });
                            }}
                            className="h-9 w-9 p-0 text-purple-600 hover:text-purple-800 hover:bg-purple-100 rounded-lg transition-all"
                            title="Edit photo"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            className="h-9 w-9 p-0 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all"
                            title="Delete photo"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          {item.image_url && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(item.image_url, '_blank')}
                              className="h-9 w-9 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-all"
                              title="View full size"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <ImageIcon className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-semibold text-gray-800 leading-tight">
                              {item.title}
                            </p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span className="text-xs text-gray-500">Gallery Item</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-6">
                        <div className="flex justify-center">
                          {item.image_url ? (
                            <div className="relative group">
                              <img
                                src={item.image_url}
                                alt={item.title}
                                className="w-20 h-16 object-cover rounded-xl border-2 border-pink-200 shadow-sm group-hover:shadow-lg transition-all duration-200"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-xl transition-all duration-200 flex items-center justify-center">
                                <Eye className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                          ) : (
                            <div className="w-20 h-16 bg-gradient-to-br from-gray-100 to-gray-200 border-2 border-gray-300 rounded-xl flex items-center justify-center">
                              <div className="text-center">
                                <ImageIcon className="h-5 w-5 text-gray-400 mx-auto mb-1" />
                                <span className="text-xs text-gray-500 font-medium">No Image</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-6">
                        <div className="flex flex-col items-center gap-1">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <Calendar className="h-4 w-4 text-orange-600" />
                          </div>
                          <span className="text-xs font-semibold text-orange-700">
                            {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Unknown'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-6">
                        <div className="flex flex-col items-center gap-2">
                          <Badge 
                            variant={item.image_url ? "default" : "outline"}
                            className={`text-xs font-semibold px-3 py-1 ${
                              item.image_url 
                                ? 'bg-green-100 text-green-800 border-green-300' 
                                : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                            }`}
                          >
                            {item.image_url ? (
                              <div className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                Ready
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <Upload className="h-3 w-3" />
                                Pending
                              </div>
                            )}
                          </Badge>
                        </div>
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