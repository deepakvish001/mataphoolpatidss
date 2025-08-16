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
        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Content</p>
                <p className="text-3xl font-bold text-primary">{menuItems?.length || 0}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-success/5 to-success/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">With Files</p>
                <p className="text-3xl font-bold text-success">
                  {menuItems?.filter(item => item.course_file).length || 0}
                </p>
              </div>
              <div className="p-3 bg-success/10 rounded-full">
                <FileText className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/5 to-accent/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-3xl font-bold text-accent">
                  {menuItems?.filter(item => {
                    const itemDate = new Date(item.date.split('/').reverse().join('-'));
                    const currentMonth = new Date().getMonth();
                    return itemDate.getMonth() === currentMonth;
                  }).length || 0}
                </p>
              </div>
              <div className="p-3 bg-accent/10 rounded-full">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-warning/5 to-warning/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Filtered Results</p>
                <p className="text-3xl font-bold text-warning">{filteredMenuItems.length}</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-full">
                <Filter className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Menu Content Form */}
      <Card className="border-0 shadow-xl bg-card">
        <CardHeader className="p-6 border-b">
          <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Menu className="h-5 w-5 text-primary-foreground" />
            </div>
            {editingItem ? 'Edit Menu Content' : 'Add New Menu Content'}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Course */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Course *</label>
              <Select value={formData.course} onValueChange={(value) => handleInputChange('course', value)}>
                <SelectTrigger className="h-11">
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
              <label className="text-sm font-medium text-foreground">Upload File Title *</label>
              <Input
                value={formData.uploadFileTitle}
                onChange={(e) => handleInputChange('uploadFileTitle', e.target.value)}
                className="h-11"
                placeholder="Enter descriptive file title"
              />
            </div>

            {/* Upload File */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Upload File</label>
              <div className="border border-border rounded-lg p-4 bg-background">
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
                      className="h-10"
                    >
                      Choose File
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formData.uploadFile ? formData.uploadFile.name : "No file chosen"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Date</label>
              <Input
                type="date"
                value={formData.date.split('/').reverse().join('-')}
                onChange={(e) => {
                  const dateValue = e.target.value;
                  const formattedDate = dateValue.split('-').reverse().join('/');
                  handleInputChange('date', formattedDate);
                }}
                className="h-11"
              />
            </div>

            {/* Write Note */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-foreground">Notes/Description</label>
              <Textarea
                value={formData.writeNote}
                onChange={(e) => handleInputChange('writeNote', e.target.value)}
                className="min-h-[120px] resize-none"
                placeholder="Add detailed description or notes about this content..."
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              onClick={handleUpload}
              className="h-11 px-8"
            >
              <Upload className="h-4 w-4 mr-2" />
              {editingItem ? "Update Content" : "Upload Content"}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="h-11 px-8"
            >
              Reset Form
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Card className="border-0 shadow-lg bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, course, or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="h-11">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
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
      <Card className="border-0 shadow-xl bg-card">
        <CardHeader className="p-6 border-b">
          <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Menu className="h-5 w-5 text-primary-foreground" />
            </div>
            Menu Content Library
            <Badge variant="secondary" className="ml-auto">
              {filteredMenuItems.length} of {menuItems?.length || 0} items
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          {filteredMenuItems.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No content found</h3>
              <p className="text-muted-foreground">
                {searchTerm || courseFilter !== "all" ? "Try adjusting your search or filter criteria" : "Start by adding your first menu content"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Actions</TableHead>
                    <TableHead className="min-w-[200px]">Course</TableHead>
                    <TableHead className="min-w-[180px]">File Title</TableHead>
                    <TableHead className="w-32">File</TableHead>
                    <TableHead className="w-28">Date</TableHead>
                    <TableHead className="min-w-[250px]">Notes</TableHead>
                    <TableHead className="w-20">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMenuItems.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(item)}
                            className="h-8 w-8 p-0 text-primary hover:text-primary hover:bg-primary/10"
                            title="Edit content"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            title="Delete content"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-sm leading-tight">
                            {item.course.split(' - ')[0]}
                          </p>
                          <p className="text-xs text-muted-foreground leading-tight">
                            {item.course.split(' - ')[1] || ''}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium text-sm leading-tight">
                            {item.upload_file_title}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getFileIcon(item.course_file)}
                          <div className="flex flex-col">
                            {item.course_file ? (
                              <>
                                <span className="text-xs font-medium truncate max-w-24" title={item.course_file}>
                                  {item.course_file.length > 15 ? 
                                    `${item.course_file.substring(0, 12)}...` : 
                                    item.course_file
                                  }
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-fit p-1 text-xs text-primary hover:text-primary hover:bg-primary/10"
                                  title="Download file"
                                >
                                  <Download className="h-3 w-3" />
                                </Button>
                              </>
                            ) : (
                              <span className="text-xs text-muted-foreground">No file</span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs font-medium">
                            {item.date}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[250px]">
                          {item.notes ? (
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                              {item.notes.length > 100 ? 
                                `${item.notes.substring(0, 100)}...` : 
                                item.notes
                              }
                            </p>
                          ) : (
                            <span className="text-xs text-muted-foreground italic">No notes</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={item.course_file ? "default" : "outline"}
                          className="text-xs"
                        >
                          {item.course_file ? "Complete" : "Pending"}
                        </Badge>
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