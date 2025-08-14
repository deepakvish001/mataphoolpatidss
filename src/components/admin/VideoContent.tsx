import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VideoContent = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [label, setLabel] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a video file to upload",
        variant: "destructive"
      });
      return;
    }

    if (!label.trim()) {
      toast({
        title: "Error", 
        description: "Please enter a label for the video",
        variant: "destructive"
      });
      return;
    }

    // Simulate upload process
    toast({
      title: "Success",
      description: "Video uploaded successfully!",
      variant: "default"
    });

    // Reset form
    setSelectedFile(null);
    setLabel("");
    // Reset file input
    const fileInput = document.getElementById('video-file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="p-8 border-b border-gray-100">
        <CardTitle className="text-2xl font-bold text-blue-600 flex items-center space-x-3">
          <div className="p-2 bg-blue-500 rounded-lg">
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
              Label
            </label>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-gray-700 font-medium bg-gray-50"
              placeholder="Enter video label"
            />
          </div>

          {/* Upload Button */}
          <div className="pt-4">
            <Button
              onClick={handleUpload}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
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
  );
};

export default VideoContent;