import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Target, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddMissionContent = () => {
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  
  const [missions, setMissions] = useState([
    {
      id: 1,
      content: "Our mission is to provide quality education and training to empower individuals with the skills and knowledge needed to succeed in today's competitive world.",
      image: "mission-image.jpg"
    }
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
    }
  };

  const handleUpload = () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter content",
        variant: "destructive"
      });
      return;
    }

    const newMission = {
      id: Math.max(...missions.map(m => m.id)) + 1,
      content,
      image: selectedPhoto ? selectedPhoto.name : "No image"
    };

    setMissions(prev => [...prev, newMission]);
    
    toast({
      title: "Success",
      description: "Mission added successfully!",
      variant: "default"
    });

    setContent("");
    setSelectedPhoto(null);
    // Reset file input
    const fileInput = document.getElementById('missionPhotoInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleDelete = (id: number) => {
    setMissions(prev => prev.filter(mission => mission.id !== id));
    toast({
      title: "Success",
      description: "Mission deleted successfully!",
      variant: "default"
    });
  };

  return (
    <div className="space-y-8">
      {/* Add Mission Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-blue-600 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <span>Add Our Mission</span>
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
                className="min-h-[120px] border-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white resize-vertical"
                placeholder="Enter mission content"
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Photo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white">
                <input
                  id="missionPhotoInput"
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

            {/* Upload Button */}
            <div className="pt-4">
              <Button
                onClick={handleUpload}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Upload
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mission Table */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="text-white font-bold text-center py-4">Our Mission</TableHead>
                <TableHead className="text-white font-bold text-center py-4">IMAGE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {missions.map((mission) => (
                <TableRow key={mission.id} className="hover:bg-gray-50">
                  <TableCell className="p-4">
                    <div className="flex items-start space-x-2">
                      <div className="flex space-x-2">
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
                          onClick={() => handleDelete(mission.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="text-sm text-gray-700 font-medium ml-2 flex-1">
                        {mission.content}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center p-4">
                    <div className="w-16 h-12 bg-gray-800 border border-gray-300 mx-auto rounded flex items-center justify-center">
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

export default AddMissionContent;