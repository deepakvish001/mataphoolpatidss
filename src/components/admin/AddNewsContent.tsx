import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Newspaper, Edit, Trash2, Loader2, Search, Upload, Calendar, TrendingUp, Users, FileText, Image } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface News {
  id: string;
  news_id: number;
  news_title: string;
  news_description: string;
  news_date: string;
  photo?: string;
}

const AddNewsContent = () => {
  const {
    data: news,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<News>({ tableName: 'news' });

  useAdminRealTime({
    tableName: 'news'
  });

  const [newsTitle, setNewsTitle] = useState("");
  const [newsDetails, setNewsDetails] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered news based on search
  const filteredNews = news.filter(item =>
    item.news_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.news_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics
  const totalNews = news.length;
  const recentNews = news.filter(item => {
    const newsDate = new Date(item.news_date);
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    return newsDate >= threeDaysAgo;
  }).length;
  const todayNews = news.filter(item => {
    const newsDate = new Date(item.news_date);
    const today = new Date();
    return newsDate.toDateString() === today.toDateString();
  }).length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!newsTitle.trim()) {
      toast.error("Please enter a news title");
      return;
    }

    if (!newsDetails.trim()) {
      toast.error("Please enter news details");
      return;
    }

    try {
      if (editingNews) {
        // Update existing news
        await update(editingNews.id, {
          news_title: newsTitle.trim(),
          news_description: newsDetails.trim(),
          photo: selectedImage ? selectedImage.name : editingNews.photo
        });
        toast.success("News updated successfully!");
        setEditingNews(null);
      } else {
        // Create new news
        const maxNewsId = news.length > 0 ? Math.max(...news.map(n => n.news_id)) : 0;
        const newNews = {
          news_id: maxNewsId + 1,
          news_title: newsTitle.trim(),
          news_description: newsDetails.trim(),
          news_date: new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
          }),
          photo: selectedImage ? selectedImage.name : "No file"
        };
        await create(newNews);
        toast.success("News added successfully!");
      }
      
      setNewsTitle("");
      setNewsDetails("");
      setSelectedImage(null);
      // Reset file input
      const fileInput = document.getElementById('imageInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      toast.error(editingNews ? "Failed to update news" : "Failed to add news");
    }
  };

  const handleEdit = (newsItem: News) => {
    setEditingNews(newsItem);
    setNewsTitle(newsItem.news_title);
    setNewsDetails(newsItem.news_description);
    setSelectedImage(null); // Reset image selection
  };

  const handleReset = () => {
    setNewsTitle("");
    setNewsDetails("");
    setSelectedImage(null);
    setEditingNews(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success("News deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete news");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading news...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total News</p>
                <p className="text-3xl font-bold">{totalNews}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <FileText className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Today's News</p>
                <p className="text-3xl font-bold">{todayNews}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Recent News</p>
                <p className="text-3xl font-bold">{recentNews}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">With Images</p>
                <p className="text-3xl font-bold">{news.filter(n => n.photo && n.photo !== "No file").length}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Image className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add News Form */}
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
          <CardTitle className="text-2xl font-bold flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Newspaper className="h-6 w-6" />
            </div>
            <span>{editingNews ? "Edit News" : "Add New News"}</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form Fields */}
            <div className="space-y-6">
              {/* News Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span>News Title</span>
                </label>
                <Input
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  className="h-12 border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-gray-700 font-medium bg-white/70 backdrop-blur-sm"
                  placeholder="Enter news title"
                />
              </div>

              {/* News Details */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Edit className="h-4 w-4 text-blue-600" />
                  <span>News Details</span>
                </label>
                <Textarea
                  value={newsDetails}
                  onChange={(e) => setNewsDetails(e.target.value)}
                  className="min-h-[120px] border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-gray-700 font-medium bg-white/70 backdrop-blur-sm resize-vertical"
                  placeholder="Enter news details"
                />
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Upload className="h-4 w-4 text-blue-600" />
                  <span>Upload Image</span>
                </label>
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 bg-blue-50/50 hover:bg-blue-50 transition-colors">
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <input
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="imageInput"
                      className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Click to upload image
                    </label>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    {selectedImage && (
                      <div className="mt-3 p-2 bg-green-100 rounded-lg">
                        <p className="text-sm text-green-700 font-medium">
                          ✓ {selectedImage.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit and Reset Buttons */}
          <div className="flex space-x-4 pt-8 border-t border-gray-200">
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
            >
              <Newspaper className="h-4 w-4" />
              <span>{editingNews ? "Update News" : "Publish News"}</span>
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

      {/* Search and News Table */}
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="text-xl font-bold flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <FileText className="h-5 w-5" />
              </div>
              <span>News Management ({filteredNews.length} items)</span>
            </CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search news..."
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
                <TableRow className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">ID</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Title</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Description</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Date</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Image</TableHead>
                  <TableHead className="text-white font-bold text-center py-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNews.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      {searchTerm ? "No news found matching your search." : "No news added yet."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredNews.map((item, index) => (
                    <TableRow key={item.id} className={`${index % 2 === 0 ? "bg-blue-50/50" : "bg-white"} hover:bg-blue-100/50 transition-colors`}>
                      <TableCell className="text-center p-4 text-gray-800 font-medium border-r border-gray-200">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-blue-700 font-bold text-sm">{item.news_id}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="font-medium text-gray-800 max-w-xs mx-auto">
                          {item.news_title}
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="text-gray-600 max-w-sm mx-auto truncate">
                          {item.news_description}
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="text-gray-600 text-sm">
                          {item.news_date}
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex justify-center">
                          {item.photo && item.photo !== "No file" ? (
                            <div className="w-10 h-10 bg-green-100 border-2 border-green-300 rounded-lg flex items-center justify-center">
                              <Image className="h-4 w-4 text-green-600" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center">
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
                            onClick={() => handleEdit(item)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
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

export default AddNewsContent;