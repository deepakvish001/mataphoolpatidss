import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Menu, Upload, Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface MenuContent {
  id: string;
  course: string;
  upload_file_title: string;
  course_file?: string;
  date: string;
  notes?: string;
}

const MenuContentContent = () => {
  const {
    data: menuItems,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<MenuContent>({ tableName: 'menu_content' });

  useAdminRealTime({
    tableName: 'menu_content'
  });

  const [formData, setFormData] = useState({
    course: "",
    uploadFileTitle: "",
    uploadFile: null as File | null,
    date: new Date().toLocaleDateString('en-GB'),
    writeNote: ""
  });
  const [editingItem, setEditingItem] = useState<MenuContent | null>(null);

  const courses = [
    "PGDCA",
    "BCA", 
    "MCA",
    "DCA",
    "O Level",
    "CCC"
  ];

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInputChange('uploadFile', file);
    }
  };

  const handleUpload = async () => {
    if (!formData.course || !formData.uploadFileTitle.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editingItem) {
        // Update existing item
        await update(editingItem.id, {
          course: formData.course,
          upload_file_title: formData.uploadFileTitle.trim(),
          course_file: formData.uploadFile ? formData.uploadFile.name : editingItem.course_file,
          date: formData.date,
          notes: formData.writeNote
        });
        toast.success("Menu content updated successfully!");
        setEditingItem(null);
      } else {
        // Create new item
        const newMenuItem = {
          course: formData.course,
          upload_file_title: formData.uploadFileTitle.trim(),
          course_file: formData.uploadFile ? formData.uploadFile.name : "",
          date: formData.date,
          notes: formData.writeNote
        };
        await create(newMenuItem);
        toast.success("Menu content uploaded successfully!");
      }
      
      // Reset form
      setFormData({
        course: "",
        uploadFileTitle: "",
        uploadFile: null,
        date: new Date().toLocaleDateString('en-GB'),
        writeNote: ""
      });

      // Reset file input
      const fileInput = document.getElementById('menu-file') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      toast.error(editingItem ? "Failed to update menu content" : "Failed to upload menu content");
    }
  };

  const handleEdit = (item: MenuContent) => {
    setEditingItem(item);
    setFormData({
      course: item.course,
      uploadFileTitle: item.upload_file_title,
      uploadFile: null, // Reset file selection
      date: item.date,
      writeNote: item.notes || ""
    });
  };

  const handleReset = () => {
    setFormData({
      course: "",
      uploadFileTitle: "",
      uploadFile: null,
      date: new Date().toLocaleDateString('en-GB'),
      writeNote: ""
    });
    setEditingItem(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success("Menu item deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete menu item");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading menu content...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Add Menu Content Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-blue-600 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Menu className="h-6 w-6 text-white" />
            </div>
            <span>Add Menu Content</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Course */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Course
              </label>
              <Select value={formData.course} onValueChange={(value) => handleInputChange('course', value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Upload File Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Upload File Title
              </label>
              <Input
                value={formData.uploadFileTitle}
                onChange={(e) => handleInputChange('uploadFileTitle', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter file title"
              />
            </div>

            {/* Upload PDF */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Upload PDF
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    id="menu-file"
                    type="file"
                    accept=".pdf"
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
                  {formData.uploadFile ? formData.uploadFile.name : "No file chosen"}
                </span>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Date
              </label>
              <Input
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="DD/MM/YYYY"
              />
            </div>

            {/* Write Note */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Write Note
              </label>
              <Textarea
                value={formData.writeNote}
                onChange={(e) => handleInputChange('writeNote', e.target.value)}
                className="min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white resize-none"
                placeholder="Write your note here..."
              />
            </div>

            {/* Upload and Reset Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button
                onClick={handleUpload}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Upload className="h-5 w-5 mr-2" />
                {editingItem ? "Update Now" : "Upload Now"}
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

      {/* Menu Content List Table */}
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Actions</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Course</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Upload_file_name</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">course_file</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Date</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuItems.map((item, index) => (
                <TableRow key={item.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 p-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(item)}
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
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {item.course}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {item.upload_file_title}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {item.course_file || "-"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {item.date}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {item.notes || "-"}
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

export default MenuContentContent;