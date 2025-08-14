import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageSquare, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddDirectorMessageContent = () => {
  const { toast } = useToast();
  const [directorMessage, setDirectorMessage] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "We as B.Soft Computer and technical Institute family started our journey in the field of computer education since 7th Nov 2002 as a double room institution having infrastructure of 5 celron computers with a vision to serve the citizen of Azamgarh in Information technology as at that time there was a major technological phase change going on in all over the world and the threat of year 2000 was also ahead and eastern part of up specially purvanchal lacks information very much. one can say that IT in these eastern up is just is in its womb phase . . Now today due to our hard work and team sprite we have developed into highly infrastructure institute over more than 35 computer having space over 5000 sqft having different branches in different blocks of Azamgarh as well as in others cities too and our development is going on . We have affiliation with CCC course from Nielit. We as B.Soft family are very thankful to the people of Azamgarh as well as other cities ti show their belief in us With Thanks & Regards *Director Minhajuddin Kausar",
      photo: "director-photo.jpg"
    }
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
    }
  };

  const handleUpload = () => {
    if (!directorMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter director message",
        variant: "destructive"
      });
      return;
    }

    const newMessage = {
      id: Math.max(...messages.map(m => m.id)) + 1,
      message: directorMessage,
      photo: selectedPhoto ? selectedPhoto.name : "No photo"
    };

    setMessages(prev => [...prev, newMessage]);
    
    toast({
      title: "Success",
      description: "Director message added successfully!",
      variant: "default"
    });

    setDirectorMessage("");
    setSelectedPhoto(null);
    // Reset file input
    const fileInput = document.getElementById('directorPhotoInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleDelete = (id: number) => {
    setMessages(prev => prev.filter(message => message.id !== id));
    toast({
      title: "Success",
      description: "Director message deleted successfully!",
      variant: "default"
    });
  };

  return (
    <div className="space-y-8">
      {/* Add Director Message Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-blue-600 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <span>Add Director Message</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Director Message */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Director Message
              </label>
              <Textarea
                value={directorMessage}
                onChange={(e) => setDirectorMessage(e.target.value)}
                className="min-h-[120px] border-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white resize-vertical"
                placeholder="Enter director message"
              />
            </div>

            {/* Director Photo Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Director Photo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white">
                <input
                  id="directorPhotoInput"
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

      {/* Director Messages Table */}
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Director Message</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Director Photo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message, index) => (
                <TableRow key={message.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 p-4">
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
                          onClick={() => handleDelete(message.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="text-sm text-gray-700 font-medium ml-2 flex-1 leading-relaxed">
                        {message.message}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4">
                    <div className="w-16 h-16 bg-gray-200 border-2 border-gray-400 mx-auto rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">Director</span>
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

export default AddDirectorMessageContent;