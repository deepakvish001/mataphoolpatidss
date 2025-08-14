import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Newspaper, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddNewsContent = () => {
  const { toast } = useToast();
  const [newsTitle, setNewsTitle] = useState("");
  const [newsDetails, setNewsDetails] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  
  const [news, setNews] = useState([
    {
      newsId: 23,
      newsTitle: "WELCOME TO B. SOFT",
      newsDescription: "B.Soft Computer and Technical Institute",
      newsDate: "May 1 2021 12:00AM",
      photo: "image.jpg"
    }
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = () => {
    if (!newsTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a news title",
        variant: "destructive"
      });
      return;
    }

    if (!newsDetails.trim()) {
      toast({
        title: "Error",
        description: "Please enter news details",
        variant: "destructive"
      });
      return;
    }

    const newNews = {
      newsId: Math.max(...news.map(n => n.newsId)) + 1,
      newsTitle,
      newsDescription: newsDetails,
      newsDate: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
      }),
      photo: selectedImage ? selectedImage.name : "No file"
    };

    setNews(prev => [...prev, newNews]);
    
    toast({
      title: "Success",
      description: "News added successfully!",
      variant: "default"
    });

    setNewsTitle("");
    setNewsDetails("");
    setSelectedImage(null);
    // Reset file input
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleDelete = (newsId: number) => {
    setNews(prev => prev.filter(item => item.newsId !== newsId));
    toast({
      title: "Success",
      description: "News deleted successfully!",
      variant: "default"
    });
  };

  return (
    <div className="space-y-8">
      {/* Add News Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100 bg-gray-400">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Newspaper className="h-6 w-6 text-white" />
            </div>
            <span>My All News</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* News Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                News Title
              </label>
              <Input
                value={newsTitle}
                onChange={(e) => setNewsTitle(e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter news title"
              />
            </div>

            {/* News Details */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                News Details
              </label>
              <Textarea
                value={newsDetails}
                onChange={(e) => setNewsDetails(e.target.value)}
                className="min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white resize-vertical"
                placeholder="Enter news details"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white">
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="text-gray-700"
                />
                {selectedImage && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {selectedImage.name}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Submit Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* News Table */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="text-white font-bold text-center py-4">news_id</TableHead>
                <TableHead className="text-white font-bold text-center py-4">News_Title</TableHead>
                <TableHead className="text-white font-bold text-center py-4">News_Description</TableHead>
                <TableHead className="text-white font-bold text-center py-4">News_Date</TableHead>
                <TableHead className="text-white font-bold text-center py-4">Photo</TableHead>
                <TableHead className="text-white font-bold text-center py-4">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {news.map((item) => (
                <TableRow key={item.newsId} className="hover:bg-gray-50">
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {item.newsId}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {item.newsTitle}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {item.newsDescription}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {item.newsDate}
                  </TableCell>
                  <TableCell className="text-center p-4">
                    <div className="w-8 h-8 bg-gray-200 border border-gray-300 mx-auto rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">IMG</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center p-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item.newsId)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="ml-1">Delete</span>
                    </Button>
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

export default AddNewsContent;