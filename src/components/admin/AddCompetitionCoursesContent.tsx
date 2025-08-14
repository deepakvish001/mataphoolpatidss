import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddCompetitionCoursesContent = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  
  const [competitions, setCompetitions] = useState([
    {
      id: 1,
      title: "WELCOME TO B. SOFT",
      description: "NA",
      date: "18/05/2020",
      file: "logo.png"
    }
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title",
        variant: "destructive"
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description",
        variant: "destructive"
      });
      return;
    }

    if (!date.trim()) {
      toast({
        title: "Error",
        description: "Please enter a date",
        variant: "destructive"
      });
      return;
    }

    const newCompetition = {
      id: Math.max(...competitions.map(c => c.id)) + 1,
      title,
      description,
      date,
      file: selectedImage ? selectedImage.name : "No file"
    };

    setCompetitions(prev => [...prev, newCompetition]);
    
    toast({
      title: "Success",
      description: "Competition course added successfully!",
      variant: "default"
    });

    setTitle("");
    setDescription("");
    setDate("");
    setSelectedImage(null);
    // Reset file input
    const fileInput = document.getElementById('competitionImageInput') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleDelete = (id: number) => {
    setCompetitions(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Success",
      description: "Competition course deleted successfully!",
      variant: "default"
    });
  };

  return (
    <div className="space-y-8">
      {/* Add Competition Courses Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100 bg-gray-400">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <span>Add Competition Courses</span>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter title"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white resize-vertical"
                placeholder="Enter description"
              />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Date
              </label>
              <Input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter date"
                type="date"
              />
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white">
                <input
                  id="competitionImageInput"
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
                {!selectedImage && (
                  <div className="mt-2">
                    <span className="bg-gray-600 text-white px-3 py-1 rounded text-sm">
                      No file chosen
                    </span>
                  </div>
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

      {/* Competition Courses Table */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="text-white font-bold text-center py-4">Title</TableHead>
                <TableHead className="text-white font-bold text-center py-4">Description</TableHead>
                <TableHead className="text-white font-bold text-center py-4">Date</TableHead>
                <TableHead className="text-white font-bold text-center py-4">File</TableHead>
                <TableHead className="text-white font-bold text-center py-4">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {competitions.map((item) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {item.title}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {item.description}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {item.date}
                  </TableCell>
                  <TableCell className="text-center p-4">
                    <div className="w-12 h-12 bg-gray-200 border border-gray-300 mx-auto rounded-full flex items-center justify-center">
                      <span className="text-xs text-gray-500">IMG</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center p-4">
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
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

export default AddCompetitionCoursesContent;