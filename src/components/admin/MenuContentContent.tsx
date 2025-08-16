import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Menu, Upload, Edit, Trash2, Loader2, Search, Filter, BookOpen, Calendar, FileText, Download, Plus } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");

  const courses = [
    "PGDCA - Post Graduate Diploma in Computer Application",
    "BCA - Bachelor of Computer Applications", 
    "MCA - Master of Computer Applications",
    "DCA - Diploma in Computer Application",
    "ADCA - Advanced Diploma in Computer Application",
    "O Level - NIELIT O Level",
    "CCC - Course on Computer Concepts",
    "DCHN - Diploma in Computer Hardware & Networking",
    "Web Development",
    "Digital Marketing",
    "Graphic Design",
    "Data Entry Operations"
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

  // Filter and search functionality
  const filteredMenuItems = useMemo(() => {
    let filtered = menuItems || [];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.upload_file_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply course filter
    if (courseFilter !== "all") {
      filtered = filtered.filter(item => 
        item.course.toLowerCase().includes(courseFilter.toLowerCase())
      );
    }

    return filtered;
  }, [menuItems, searchTerm, courseFilter]);

  const getFileIcon = (fileName?: string) => {
    if (!fileName) return <FileText className="h-4 w-4 text-gray-400" />;
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'xls':
      case 'xlsx':
        return <FileText className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
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
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Content</p>
                <p className="text-3xl font-bold">{menuItems?.length || 0}</p>
              </div>
              <BookOpen className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">With Files</p>
                <p className="text-3xl font-bold">
                  {menuItems?.filter(item => item.course_file).length || 0}
                </p>
              </div>
              <FileText className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">This Month</p>
                <p className="text-3xl font-bold">
                  {menuItems?.filter(item => {
                    const itemDate = new Date(item.date.split('/').reverse().join('-'));
                    const currentMonth = new Date().getMonth();
                    return itemDate.getMonth() === currentMonth;
                  }).length || 0}
                </p>
              </div>
              <Calendar className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Filtered Results</p>
                <p className="text-3xl font-bold">{filteredMenuItems.length}</p>
              </div>
              <Filter className="h-12 w-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Menu Content Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Menu className="h-6 w-6 text-white" />
            </div>
            <span>{editingItem ? 'Edit Menu Content' : 'Add New Menu Content'}</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Course *</label>
              <Select value={formData.course} onValueChange={(value) => handleInputChange('course', value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
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
              <label className="text-sm font-medium text-gray-700">Upload File Title *</label>
              <Input
                value={formData.uploadFileTitle}
                onChange={(e) => handleInputChange('uploadFileTitle', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter descriptive file title"
              />
            </div>

            {/* Upload File */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Upload File</label>
              <div className="border border-gray-300 rounded p-4 bg-white">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      id="menu-file"
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button
                      variant="outline"
                      className="h-10 px-6 border-gray-300 hover:bg-gray-50 font-medium text-gray-700"
                    >
                      Choose File
                    </Button>
                  </div>
                  <span className="text-gray-500 font-medium">
                    {formData.uploadFile ? formData.uploadFile.name : "No file chosen"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date</label>
              <Input
                type="date"
                value={formData.date.split('/').reverse().join('-')}
                onChange={(e) => {
                  const dateValue = e.target.value;
                  const formattedDate = dateValue.split('-').reverse().join('/');
                  handleInputChange('date', formattedDate);
                }}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
              />
            </div>

            {/* Write Note */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Notes/Description</label>
              <Textarea
                value={formData.writeNote}
                onChange={(e) => handleInputChange('writeNote', e.target.value)}
                className="min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white resize-none"
                placeholder="Add detailed description or notes about this content..."
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-8">
            <Button
              onClick={handleUpload}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Upload className="h-5 w-5 mr-2" />
              {editingItem ? "Update Content" : "Upload Content"}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-gray-300 text-gray-600 hover:bg-gray-50 px-8 py-3 rounded-lg"
            >
              Reset Form
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by title, course, or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="pgdca">PGDCA</SelectItem>
                  <SelectItem value="bca">BCA</SelectItem>
                  <SelectItem value="mca">MCA</SelectItem>
                  <SelectItem value="dca">DCA</SelectItem>
                  <SelectItem value="adca">ADCA</SelectItem>
                  <SelectItem value="o level">O Level</SelectItem>
                  <SelectItem value="ccc">CCC</SelectItem>
                  <SelectItem value="dchn">DCHN</SelectItem>
                  <SelectItem value="web development">Web Development</SelectItem>
                  <SelectItem value="digital marketing">Digital Marketing</SelectItem>
                  <SelectItem value="graphic design">Graphic Design</SelectItem>
                  <SelectItem value="data entry">Data Entry</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Content Table */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-6 border-b border-gray-100">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center justify-between">
            <span>Menu Content Library ({filteredMenuItems.length})</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Total: {menuItems?.length || 0}
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <th className="border border-blue-400 px-6 py-4 text-sm font-semibold text-left">Actions</th>
                  <th className="border border-blue-400 px-6 py-4 text-sm font-semibold text-left">Course</th>
                  <th className="border border-blue-400 px-6 py-4 text-sm font-semibold text-left">Title</th>
                  <th className="border border-blue-400 px-6 py-4 text-sm font-semibold text-left">File</th>
                  <th className="border border-blue-400 px-6 py-4 text-sm font-semibold text-left">Date</th>
                  <th className="border border-blue-400 px-6 py-4 text-sm font-semibold text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredMenuItems.map((item, index) => (
                  <tr key={item.id} className={`hover:bg-blue-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                    <td className="border border-gray-200 px-6 py-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="border border-gray-200 px-6 py-4">
                      <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                        {item.course.split(' - ')[0] || item.course}
                      </Badge>
                    </td>
                    <td className="border border-gray-200 px-6 py-4">
                      <div className="font-semibold text-gray-800">{item.upload_file_title}</div>
                    </td>
                    <td className="border border-gray-200 px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getFileIcon(item.course_file)}
                        <span className="text-sm text-gray-600">
                          {item.course_file || "No file"}
                        </span>
                        {item.course_file && (
                          <Button variant="ghost" size="sm" className="p-1">
                            <Download className="h-3 w-3 text-gray-500" />
                          </Button>
                        )}
                      </div>
                    </td>
                    <td className="border border-gray-200 px-6 py-4">
                      <div className="text-sm text-gray-600">{item.date}</div>
                    </td>
                    <td className="border border-gray-200 px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {item.notes || "-"}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredMenuItems.length === 0 && (
                  <tr>
                    <td colSpan={6} className="border border-gray-200 px-6 py-12 text-center">
                      <div className="text-gray-500">
                        {searchTerm || courseFilter !== "all" 
                          ? "No content matches your search criteria" 
                          : "No menu content found"}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuContentContent;