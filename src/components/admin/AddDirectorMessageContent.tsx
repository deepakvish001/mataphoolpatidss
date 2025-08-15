import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface DirectorMessage {
  id: string;
  message: string;
  photo?: string;
}

const AddDirectorMessageContent = () => {
  const {
    data: messages,
    loading,
    create,
    update,
    delete: deleteItem
  } = useOptimisticCrud<DirectorMessage>({ tableName: 'director_messages' });

  useAdminRealTime({
    tableName: 'director_messages'
  });

  const [directorMessage, setDirectorMessage] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [editingMessage, setEditingMessage] = useState<DirectorMessage | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedPhoto(file);
    }
  };

  const handleUpload = async () => {
    if (!directorMessage.trim()) {
      toast.error("Please enter director message");
      return;
    }

    try {
      if (editingMessage) {
        // Update existing message
        await update(editingMessage.id, {
          message: directorMessage.trim(),
          photo: selectedPhoto ? selectedPhoto.name : editingMessage.photo
        });
        toast.success("Director message updated successfully!");
        setEditingMessage(null);
      } else {
        // Create new message
        const newMessage = {
          message: directorMessage.trim(),
          photo: selectedPhoto ? selectedPhoto.name : "No photo"
        };
        await create(newMessage);
        toast.success("Director message added successfully!");
      }
      
      setDirectorMessage("");
      setSelectedPhoto(null);
      // Reset file input
      const fileInput = document.getElementById('directorPhotoInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      toast.error(editingMessage ? "Failed to update director message" : "Failed to add director message");
    }
  };

  const handleEdit = (message: DirectorMessage) => {
    setEditingMessage(message);
    setDirectorMessage(message.message);
    setSelectedPhoto(null); // Reset photo selection
  };

  const handleReset = () => {
    setDirectorMessage("");
    setSelectedPhoto(null);
    setEditingMessage(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success("Director message deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete director message");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading director messages...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Add Director Message Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-purple-600 flex items-center space-x-3">
            <div className="p-2 bg-purple-500 rounded-lg">
              <User className="h-6 w-6 text-white" />
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
                className="min-h-[120px] border-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded text-gray-700 font-medium bg-white resize-vertical"
                placeholder="Enter director message"
              />
            </div>

            {/* Director Photo */}
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

            {/* Upload and Reset Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button
                onClick={handleUpload}
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {editingMessage ? "Update" : "Upload"}
              </Button>
              <Button
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Reset
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
              <TableRow className="bg-purple-600 hover:bg-purple-600">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Director Message</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Director Photo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message, index) => (
                <TableRow key={message.id} className={index % 2 === 0 ? "bg-purple-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 p-4">
                    <div className="flex items-start space-x-2">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(message)}
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
                      <span className="text-sm text-gray-700 font-medium ml-2 flex-1">
                        {message.message}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4">
                    <div className="w-16 h-12 bg-gray-800 border-2 border-gray-400 mx-auto rounded flex items-center justify-center">
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

export default AddDirectorMessageContent;