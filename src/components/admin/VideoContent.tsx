import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Video, Upload, Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface VideoData {
  id: string;
  label: string;
  video_url?: string;
  file_name?: string;
  file_size?: number;
  file_type?: string;
}

const VideoContent = () => {
  const {
    data: videos,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<VideoData>({ tableName: 'videos' });

  useAdminRealTime({
    tableName: 'videos'
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [label, setLabel] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a video file to upload");
      return;
    }

    if (!label.trim()) {
      toast.error("Please enter a label for the video");
      return;
    }

    try {
      await create({
        label: label,
        file_name: selectedFile.name,
        file_size: selectedFile.size,
        file_type: selectedFile.type,
        video_url: null // In a real app, you'd upload to storage and get URL
      });

      // Reset form
      setSelectedFile(null);
      setLabel("");
      // Reset file input
      const fileInput = document.getElementById('video-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
      toast.success("Video uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload video");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success("Video deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete video");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading videos...</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Upload Form Card */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Video className="h-6 w-6 text-white" />
            </div>
            <span>Add Videos</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* File Upload */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    id="video-file"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button
                    variant="outline"
                    className="h-12 px-6 border-gray-300 hover:bg-gray-50 font-medium text-gray-700"
                  >
                    Choose file
                  </Button>
                </div>
                <span className="text-gray-500 font-medium">
                  {selectedFile ? selectedFile.name : "No file chosen"}
                </span>
              </div>
            </div>

            {/* Label */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Label *
              </label>
              <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter video label"
              />
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

            {/* File Info */}
            {selectedFile && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <h4 className="text-sm font-medium text-blue-800 mb-2">Selected File:</h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <div>• Name: {selectedFile.name}</div>
                  <div>• Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</div>
                  <div>• Type: {selectedFile.type}</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Videos Table Card */}
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Actions</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Label</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">File Name</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">File Size</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">File Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {videos.map((video, index) => (
                <TableRow key={video.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 p-4">
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(video.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {video.label}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {video.file_name || "N/A"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {video.file_size ? `${(video.file_size / (1024 * 1024)).toFixed(2)} MB` : "N/A"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {video.file_type || "N/A"}
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

export default VideoContent;