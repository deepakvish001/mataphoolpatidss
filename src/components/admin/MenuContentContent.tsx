import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Menu, Upload, Edit, Trash2, Loader2, Search, Filter, BookOpen, Calendar, FileText, Download, Plus, GraduationCap, Users, Target, TrendingUp, Star, Award, Book, Video, Image, Presentation, Sheet, FileIcon } from "lucide-react";
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
    if (!fileName) return <FileIcon className="h-5 w-5 text-muted-foreground" />;
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'xls':
      case 'xlsx':
        return <Sheet className="h-5 w-5 text-green-500" />;
      case 'ppt':
      case 'pptx':
        return <Presentation className="h-5 w-5 text-orange-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <Image className="h-5 w-5 text-purple-500" />;
      case 'mp4':
      case 'avi':
        return <Video className="h-5 w-5 text-pink-500" />;
      default:
        return <FileIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getCourseIcon = (courseName: string) => {
    const course = courseName.toLowerCase();
    if (course.includes('pgdca') || course.includes('mca') || course.includes('bca')) {
      return <GraduationCap className="h-5 w-5 text-blue-500" />;
    }
    if (course.includes('dca') || course.includes('adca')) {
      return <Book className="h-5 w-5 text-green-500" />;
    }
    if (course.includes('o level') || course.includes('ccc')) {
      return <Award className="h-5 w-5 text-purple-500" />;
    }
    if (course.includes('web') || course.includes('digital') || course.includes('graphic')) {
      return <Target className="h-5 w-5 text-orange-500" />;
    }
    return <BookOpen className="h-5 w-5 text-primary" />;
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
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">Total Content</p>
                <p className="text-3xl font-bold text-blue-700">{menuItems?.length || 0}</p>
                <p className="text-xs text-blue-500 mt-1">All learning materials</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-xl shadow-lg">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 mb-1">With Files</p>
                <p className="text-3xl font-bold text-green-700">
                  {menuItems?.filter(item => item.course_file).length || 0}
                </p>
                <p className="text-xs text-green-500 mt-1">Downloadable resources</p>
              </div>
              <div className="p-3 bg-green-500 rounded-xl shadow-lg">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 mb-1">This Month</p>
                <p className="text-3xl font-bold text-purple-700">
                  {menuItems?.filter(item => {
                    const itemDate = new Date(item.date.split('/').reverse().join('-'));
                    const currentMonth = new Date().getMonth();
                    return itemDate.getMonth() === currentMonth;
                  }).length || 0}
                </p>
                <p className="text-xs text-purple-500 mt-1">Recent additions</p>
              </div>
              <div className="p-3 bg-purple-500 rounded-xl shadow-lg">
                <Calendar className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100 border-l-4 border-l-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 mb-1">Filtered Results</p>
                <p className="text-3xl font-bold text-orange-700">{filteredMenuItems.length}</p>
                <p className="text-xs text-orange-500 mt-1">Current search results</p>
              </div>
              <div className="p-3 bg-orange-500 rounded-xl shadow-lg">
                <Filter className="h-8 w-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Menu Content Form */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-50 to-blue-50 border-t-4 border-t-blue-500">
        <CardHeader className="p-6 border-b bg-gradient-to-r from-blue-500 to-indigo-600">
          <CardTitle className="text-xl font-semibold text-white flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Menu className="h-6 w-6 text-white" />
            </div>
            {editingItem ? 'Edit Menu Content' : 'Add New Menu Content'}
            {editingItem && (
              <Badge variant="secondary" className="ml-auto bg-white/20 text-white border-white/30">
                Editing Mode
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Course */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-blue-500" />
                Course *
              </label>
              <Select value={formData.course} onValueChange={(value) => handleInputChange('course', value)}>
                <SelectTrigger className="h-12 border-2 border-blue-200 hover:border-blue-400 rounded-lg bg-blue-50/50 focus:bg-white transition-all">
                  <div className="flex items-center gap-2">
                    {formData.course && getCourseIcon(formData.course)}
                    <SelectValue placeholder="Select Course" />
                  </div>
                </SelectTrigger>
                <SelectContent className="border-2 border-blue-200">
                  {courses.map((course) => (
                    <SelectItem key={course} value={course} className="hover:bg-blue-50">
                      <div className="flex items-center gap-2">
                        {getCourseIcon(course)}
                        <span>{course}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Upload File Title */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="h-4 w-4 text-green-500" />
                Upload File Title *
              </label>
              <Input
                value={formData.uploadFileTitle}
                onChange={(e) => handleInputChange('uploadFileTitle', e.target.value)}
                className="h-12 border-2 border-green-200 hover:border-green-400 rounded-lg bg-green-50/50 focus:bg-white transition-all"
                placeholder="Enter descriptive file title"
              />
            </div>

            {/* Upload File */}
            <div className="space-y-3 lg:col-span-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Upload className="h-4 w-4 text-purple-500" />
                Upload File
              </label>
              <div className="border-2 border-dashed border-purple-200 rounded-xl p-6 bg-purple-50/50 hover:border-purple-400 transition-all">
                <div className="flex items-center justify-center space-x-4">
                  <div className="relative">
                    <input
                      id="menu-file"
                      type="file"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.mp4,.avi"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button
                      variant="outline"
                      className="h-12 px-6 border-2 border-purple-300 hover:border-purple-500 bg-white hover:bg-purple-50 text-purple-700 font-semibold rounded-lg shadow-sm"
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      Choose File
                    </Button>
                  </div>
                  <div className="flex-1">
                    {formData.uploadFile ? (
                      <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-purple-200">
                        {getFileIcon(formData.uploadFile.name)}
                        <span className="text-sm font-medium text-purple-700">
                          {formData.uploadFile.name}
                        </span>
                        <Badge variant="outline" className="text-xs text-purple-600 border-purple-300">
                          {(formData.uploadFile.size / 1024 / 1024).toFixed(1)} MB
                        </Badge>
                      </div>
                    ) : (
                      <p className="text-sm text-purple-600 font-medium">No file chosen</p>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs text-red-600 border-red-200 bg-red-50">
                    <FileText className="h-3 w-3 mr-1" />
                    PDF
                  </Badge>
                  <Badge variant="outline" className="text-xs text-blue-600 border-blue-200 bg-blue-50">
                    <FileText className="h-3 w-3 mr-1" />
                    DOC/DOCX
                  </Badge>
                  <Badge variant="outline" className="text-xs text-orange-600 border-orange-200 bg-orange-50">
                    <Presentation className="h-3 w-3 mr-1" />
                    PPT/PPTX
                  </Badge>
                  <Badge variant="outline" className="text-xs text-green-600 border-green-200 bg-green-50">
                    <Sheet className="h-3 w-3 mr-1" />
                    XLS/XLSX
                  </Badge>
                  <Badge variant="outline" className="text-xs text-purple-600 border-purple-200 bg-purple-50">
                    <Image className="h-3 w-3 mr-1" />
                    Images
                  </Badge>
                  <Badge variant="outline" className="text-xs text-pink-600 border-pink-200 bg-pink-50">
                    <Video className="h-3 w-3 mr-1" />
                    Videos
                  </Badge>
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-orange-500" />
                Date
              </label>
              <Input
                type="date"
                value={formData.date.split('/').reverse().join('-')}
                onChange={(e) => {
                  const dateValue = e.target.value;
                  const formattedDate = dateValue.split('-').reverse().join('/');
                  handleInputChange('date', formattedDate);
                }}
                className="h-12 border-2 border-orange-200 hover:border-orange-400 rounded-lg bg-orange-50/50 focus:bg-white transition-all"
              />
            </div>

            {/* Write Note */}
            <div className="space-y-3 lg:col-span-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Edit className="h-4 w-4 text-indigo-500" />
                Notes/Description
              </label>
              <Textarea
                value={formData.writeNote}
                onChange={(e) => handleInputChange('writeNote', e.target.value)}
                className="min-h-[120px] resize-none border-2 border-indigo-200 hover:border-indigo-400 rounded-lg bg-indigo-50/50 focus:bg-white transition-all"
                placeholder="Add detailed description, learning objectives, or instructions about this content..."
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-8 border-t border-gray-100">
            <Button
              onClick={handleUpload}
              className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Upload className="h-5 w-5 mr-2" />
              {editingItem ? "Update Content" : "Upload Content"}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="h-12 px-8 border-2 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition-all duration-200"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Reset Form
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-slate-50 border-l-4 border-l-indigo-500">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-500" />
              <Input
                placeholder="Search by title, course, or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-2 border-indigo-200 hover:border-indigo-400 rounded-lg bg-white focus:bg-white shadow-sm"
              />
            </div>
            <div className="w-full lg:w-80">
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="h-12 border-2 border-indigo-200 hover:border-indigo-400 rounded-lg bg-white shadow-sm">
                  <Filter className="h-5 w-5 mr-2 text-indigo-500" />
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent className="border-2 border-indigo-200">
                  <SelectItem value="all" className="hover:bg-indigo-50">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-indigo-500" />
                      All Courses
                    </div>
                  </SelectItem>
                  <SelectItem value="pgdca" className="hover:bg-blue-50">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-blue-500" />
                      PGDCA
                    </div>
                  </SelectItem>
                  <SelectItem value="bca" className="hover:bg-blue-50">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-blue-500" />
                      BCA
                    </div>
                  </SelectItem>
                  <SelectItem value="mca" className="hover:bg-blue-50">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-blue-500" />
                      MCA
                    </div>
                  </SelectItem>
                  <SelectItem value="dca" className="hover:bg-green-50">
                    <div className="flex items-center gap-2">
                      <Book className="h-4 w-4 text-green-500" />
                      DCA
                    </div>
                  </SelectItem>
                  <SelectItem value="adca" className="hover:bg-green-50">
                    <div className="flex items-center gap-2">
                      <Book className="h-4 w-4 text-green-500" />
                      ADCA
                    </div>
                  </SelectItem>
                  <SelectItem value="o level" className="hover:bg-purple-50">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-purple-500" />
                      O Level
                    </div>
                  </SelectItem>
                  <SelectItem value="ccc" className="hover:bg-purple-50">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-purple-500" />
                      CCC
                    </div>
                  </SelectItem>
                  <SelectItem value="dchn" className="hover:bg-orange-50">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-orange-500" />
                      DCHN
                    </div>
                  </SelectItem>
                  <SelectItem value="web development" className="hover:bg-orange-50">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-orange-500" />
                      Web Development
                    </div>
                  </SelectItem>
                  <SelectItem value="digital marketing" className="hover:bg-orange-50">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-orange-500" />
                      Digital Marketing
                    </div>
                  </SelectItem>
                  <SelectItem value="graphic design" className="hover:bg-orange-50">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-orange-500" />
                      Graphic Design
                    </div>
                  </SelectItem>
                  <SelectItem value="data entry" className="hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      Data Entry
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Content Table */}
      <Card className="border-0 shadow-2xl bg-white border-t-4 border-t-gradient-to-r from-blue-500 to-indigo-500">
        <CardHeader className="p-6 border-b bg-gradient-to-r from-blue-500 to-indigo-600">
          <CardTitle className="text-xl font-semibold text-white flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            Menu Content Library
            <div className="flex gap-2 ml-auto">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {filteredMenuItems.length} Showing
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {menuItems?.length || 0} Total
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          {filteredMenuItems.length === 0 ? (
            <div className="p-16 text-center bg-gradient-to-b from-blue-50 to-indigo-50">
              <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto mb-6">
                <BookOpen className="h-16 w-16 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">No content found</h3>
              <p className="text-blue-600 mb-6 max-w-md mx-auto">
                {searchTerm || courseFilter !== "all" ? 
                  "Try adjusting your search or filter criteria to find what you're looking for." : 
                  "Start building your content library by adding your first educational material."
                }
              </p>
              <Button
                onClick={handleReset}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add First Content
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-slate-100 to-gray-100 border-b-2 border-gray-200">
                    <TableHead className="w-28 text-center font-semibold text-gray-700 py-4">
                      <Users className="h-4 w-4 mx-auto mb-1" />
                      Actions
                    </TableHead>
                    <TableHead className="min-w-[280px] font-semibold text-gray-700 py-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-blue-500" />
                        Course
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[220px] font-semibold text-gray-700 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-500" />
                        Content Title
                      </div>
                    </TableHead>
                    <TableHead className="w-40 text-center font-semibold text-gray-700 py-4">
                      <div className="flex items-center gap-2 justify-center">
                        <Upload className="h-4 w-4 text-purple-500" />
                        File
                      </div>
                    </TableHead>
                    <TableHead className="w-32 text-center font-semibold text-gray-700 py-4">
                      <div className="flex items-center gap-2 justify-center">
                        <Calendar className="h-4 w-4 text-orange-500" />
                        Date
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[300px] font-semibold text-gray-700 py-4">
                      <div className="flex items-center gap-2">
                        <Edit className="h-4 w-4 text-indigo-500" />
                        Notes & Description
                      </div>
                    </TableHead>
                    <TableHead className="w-24 text-center font-semibold text-gray-700 py-4">
                      <TrendingUp className="h-4 w-4 mx-auto" />
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMenuItems.map((item, index) => (
                    <TableRow 
                      key={item.id} 
                      className={`
                        hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 
                        transition-all duration-200 border-b border-gray-100
                        ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                      `}
                    >
                      <TableCell className="text-center py-4">
                        <div className="flex gap-1 justify-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(item)}
                            className="h-9 w-9 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-all"
                            title="Edit content"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            className="h-9 w-9 p-0 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all"
                            title="Delete content"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg mt-1">
                            {getCourseIcon(item.course)}
                          </div>
                          <div className="space-y-1 flex-1">
                            <p className="font-semibold text-sm text-blue-800 leading-tight">
                              {item.course.split(' - ')[0]}
                            </p>
                            <p className="text-xs text-blue-600 leading-tight line-clamp-2">
                              {item.course.split(' - ')[1] || 'Professional Course'}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="space-y-2">
                          <p className="font-semibold text-sm text-gray-800 leading-tight line-clamp-2">
                            {item.upload_file_title}
                          </p>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span className="text-xs text-gray-500">Educational Content</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            {getFileIcon(item.course_file)}
                          </div>
                          {item.course_file ? (
                            <div className="space-y-1">
                              <span className="text-xs font-semibold text-purple-700 block truncate max-w-24" title={item.course_file}>
                                {item.course_file.length > 12 ? 
                                  `${item.course_file.substring(0, 9)}...` : 
                                  item.course_file
                                }
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-full p-1 text-xs text-purple-600 hover:text-purple-800 hover:bg-purple-100 rounded"
                                title="Download file"
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-500 font-medium">No file</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <div className="flex flex-col items-center gap-1">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <Calendar className="h-4 w-4 text-orange-600" />
                          </div>
                          <span className="text-xs font-semibold text-orange-700">
                            {item.date}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="max-w-[300px]">
                          {item.notes ? (
                            <div className="space-y-2">
                              <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                                {item.notes.length > 150 ? 
                                  `${item.notes.substring(0, 150)}...` : 
                                  item.notes
                                }
                              </p>
                              <div className="flex items-center gap-1">
                                <Edit className="h-3 w-3 text-indigo-500" />
                                <span className="text-xs text-indigo-600 font-medium">
                                  {item.notes.length} characters
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-gray-400">
                              <Edit className="h-4 w-4" />
                              <span className="text-xs italic">No description added</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center py-4">
                        <div className="flex flex-col items-center gap-2">
                          <Badge 
                            variant={item.course_file ? "default" : "outline"}
                            className={`text-xs font-semibold px-3 py-1 ${
                              item.course_file 
                                ? 'bg-green-100 text-green-800 border-green-300' 
                                : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                            }`}
                          >
                            {item.course_file ? (
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3" />
                                Complete
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <Upload className="h-3 w-3" />
                                Pending
                              </div>
                            )}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuContentContent;