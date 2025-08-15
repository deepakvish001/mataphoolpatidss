import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Edit, Trash2, Plus, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Course {
  id: string;
  course_name: string;
  course_sort_name: string;
  duration: string;
  fees: string;
  category: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

const CourseMasterContent = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    courseCategory: "",
    courseName: "",
    courseSortName: "",
    courseDuration: "",
    fees: "",
    status: "active" as "active" | "inactive"
  });
  const [formLoading, setFormLoading] = useState(false);

  // Static data for now since courses table doesn't exist yet
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "17",
      course_name: "Diploma in Computer Hardware and Networking",
      course_sort_name: "DCHN",
      duration: "12 months",
      fees: "15000",
      category: "12 Month",
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "18",
      course_name: "Advance Diploma In Computer Application(ADCA)",
      course_sort_name: "ADCA",
      duration: "12",
      fees: "4800",
      category: "12 Month",
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]);
  const [loading, setLoading] = useState(false);

  const courseCategories = [
    { value: "3-month", label: "3 Month" },
    { value: "6-month", label: "6 Month" },
    { value: "12-month", label: "12 Month" },
    { value: "1-year", label: "1 Year" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      courseCategory: "",
      courseName: "",
      courseSortName: "",
      courseDuration: "",
      fees: "",
      status: "active"
    });
    setEditingCourse(null);
  };

  const openEditDialog = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      courseCategory: course.category,
      courseName: course.course_name,
      courseSortName: course.course_sort_name,
      courseDuration: course.duration,
      fees: course.fees,
      status: course.status
    });
    setIsDialogOpen(true);
  };

  const validateForm = () => {
    if (!formData.courseCategory) {
      toast.error("Please select a course category");
      return false;
    }
    if (!formData.courseName.trim()) {
      toast.error("Course name is required");
      return false;
    }
    if (!formData.courseSortName.trim()) {
      toast.error("Course sort name is required");
      return false;
    }
    if (!formData.courseDuration.trim()) {
      toast.error("Course duration is required");
      return false;
    }
    if (!formData.fees.trim()) {
      toast.error("Fees is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setFormLoading(true);
    try {
      const courseData: Course = {
        id: editingCourse?.id || `course-${Date.now()}`,
        course_name: formData.courseName,
        course_sort_name: formData.courseSortName,
        duration: formData.courseDuration,
        fees: formData.fees,
        category: courseCategories.find(cat => cat.value === formData.courseCategory)?.label || formData.courseCategory,
        status: formData.status,
        created_at: editingCourse?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (editingCourse) {
        setCourses(prev => prev.map(course => 
          course.id === editingCourse.id ? courseData : course
        ));
        toast.success("🎉 Course updated instantly!");
      } else {
        setCourses(prev => [courseData, ...prev]);
        toast.success("🎉 Course added instantly!");
      }

      setIsDialogOpen(false);
      resetForm();
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("⚠️ Are you sure you want to delete this course?")) return;
    
    setCourses(prev => prev.filter(course => course.id !== id));
    toast.success("🗑️ Course deleted instantly!");
  };

  const refresh = () => {
    toast.success("Data refreshed!");
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading course data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span>Course Master</span>
            </CardTitle>
            <div className="flex space-x-3">
              <Button onClick={refresh} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm} className="bg-gradient-to-r from-green-600 to-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Course Category *</label>
                      <Select value={formData.courseCategory} onValueChange={(value) => handleInputChange('courseCategory', value)}>
                        <SelectTrigger disabled={formLoading}>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {courseCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Course Name *</label>
                      <Input
                        value={formData.courseName}
                        onChange={(e) => handleInputChange('courseName', e.target.value)}
                        placeholder="Enter course name"
                        disabled={formLoading}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Course Sort Name *</label>
                        <Input
                          value={formData.courseSortName}
                          onChange={(e) => handleInputChange('courseSortName', e.target.value)}
                          placeholder="Enter short name"
                          disabled={formLoading}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Duration *</label>
                        <Input
                          value={formData.courseDuration}
                          onChange={(e) => handleInputChange('courseDuration', e.target.value)}
                          placeholder="Enter duration"
                          disabled={formLoading}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Fees *</label>
                      <Input
                        value={formData.fees}
                        onChange={(e) => handleInputChange('fees', e.target.value)}
                        placeholder="Enter fees amount"
                        disabled={formLoading}
                      />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={formLoading}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit} disabled={formLoading}>
                        {formLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                        {editingCourse ? "Update" : "Create"} Course
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">Total courses: {courses.length}</p>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600">
                  <TableHead className="text-white font-bold">Actions</TableHead>
                  <TableHead className="text-white font-bold">Course Name</TableHead>
                  <TableHead className="text-white font-bold">Short Name</TableHead>
                  <TableHead className="text-white font-bold">Duration</TableHead>
                  <TableHead className="text-white font-bold">Fees</TableHead>
                  <TableHead className="text-white font-bold">Category</TableHead>
                  <TableHead className="text-white font-bold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course, index) => (
                  <TableRow key={course.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <TableCell className="p-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(course)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(course.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="p-4 font-medium">{course.course_name}</TableCell>
                    <TableCell className="p-4 font-medium">{course.course_sort_name}</TableCell>
                    <TableCell className="p-4">{course.duration}</TableCell>
                    <TableCell className="p-4">₹{course.fees}</TableCell>
                    <TableCell className="p-4">{course.category}</TableCell>
                    <TableCell className="p-4">
                      <Badge className={course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {course.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseMasterContent;