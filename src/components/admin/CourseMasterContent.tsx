import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Edit, 
  Trash2, 
  Plus, 
  Loader2, 
  Search, 
  RefreshCw, 
  Activity, 
  Calendar, 
  DollarSign, 
  Hash, 
  Globe, 
  BarChart3,
  TrendingUp,
  Filter,
  GraduationCap,
  Clock,
  IndianRupee,
  Users,
  Award,
  Building
} from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface Course {
  id: string;
  course_name: string;
  course_sort_name: string;
  duration: string;
  fees: string;
  category: string;
  status: 'active' | 'inactive';
}

const CourseMasterContent = () => {
  const {
    data: courses,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<Course>({ tableName: 'course_master' });

  useAdminRealTime({
    tableName: 'course_master'
  });

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
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const courseCategories = [
    { value: "3-month", label: "3 Month" },
    { value: "6-month", label: "6 Month" },
    { value: "12-month", label: "12 Month" },
    { value: "1-year", label: "1 Year" },
    { value: "certification", label: "Certification" },
    { value: "diploma", label: "Diploma" }
  ];

  // Statistics calculation
  const stats = useMemo(() => {
    const total = courses.length;
    const active = courses.filter(course => course.status === 'active').length;
    const inactive = total - active;
    const avgFees = courses.reduce((sum, course) => sum + parseFloat(course.fees || '0'), 0) / (total || 1);
    
    const categoryStats = courses.reduce((acc, course) => {
      acc[course.category] = (acc[course.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostPopularCategory = Object.entries(categoryStats).reduce((max, [category, count]) => {
      return count > max.count ? { category, count } : max;
    }, { category: "N/A", count: 0 });
    
    return {
      total,
      active,
      inactive,
      avgFees: Math.round(avgFees),
      mostPopularCategory: mostPopularCategory.category
    };
  }, [courses]);

  // Filtered data
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = 
        course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.course_sort_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.duration.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || course.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [courses, searchTerm, statusFilter, categoryFilter]);

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
      courseCategory: courseCategories.find(cat => cat.label === course.category)?.value || course.category,
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
      const courseData = {
        course_name: formData.courseName,
        course_sort_name: formData.courseSortName,
        duration: formData.courseDuration,
        fees: formData.fees,
        category: courseCategories.find(cat => cat.value === formData.courseCategory)?.label || formData.courseCategory,
        status: formData.status
      };

      if (editingCourse) {
        await update(editingCourse.id, courseData);
        toast.success("Course updated successfully!");
      } else {
        await create(courseData);
        toast.success("Course added successfully!");
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error(editingCourse ? "Failed to update course" : "Failed to add course");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("⚠️ Are you sure you want to delete this course?")) return;
    
    try {
      await deleteItem(id);
      toast.success("Course deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete course");
    }
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
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Courses</p>
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-xs text-blue-200 mt-1">All programs</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <GraduationCap className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Courses</p>
                <p className="text-3xl font-bold">{stats.active}</p>
                <p className="text-xs text-green-200 mt-1">Currently available</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <BookOpen className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Average Fees</p>
                <p className="text-3xl font-bold">₹{stats.avgFees.toLocaleString()}</p>
                <p className="text-xs text-purple-200 mt-1">Course pricing</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <IndianRupee className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Top Category</p>
                <p className="text-lg font-bold truncate">{stats.mostPopularCategory}</p>
                <p className="text-xs text-orange-200 mt-1">Popular choice</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Award className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card className="shadow-lg border-l-4 border-l-indigo-500 bg-gradient-to-r from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-background">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500 text-white rounded-lg">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Search & Filter Courses</h3>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500 h-4 w-4" />
              <Input
                placeholder="Search courses by name, category, duration..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
              />
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] border-indigo-200 focus:border-indigo-400">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-gray-500" />
                      All Status
                    </div>
                  </SelectItem>
                  <SelectItem value="active">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-green-500" />
                      Active
                    </div>
                  </SelectItem>
                  <SelectItem value="inactive">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-orange-500" />
                      Inactive
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[160px] border-indigo-200 focus:border-indigo-400">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-gray-500" />
                      All Categories
                    </div>
                  </SelectItem>
                  {courseCategories.map((category) => (
                    <SelectItem key={category.value} value={category.label}>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-purple-500" />
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refresh()}
                className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Master Table */}
      <Card className="shadow-lg border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50/50 to-white dark:from-purple-950/20 dark:to-background">
        <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-950/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 text-white rounded-lg">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-purple-700 dark:text-purple-300">
                  Course Master Registry
                </CardTitle>
                <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
                  Complete course database with {filteredCourses.length} programs
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">
                {filteredCourses.length} of {courses.length} courses
              </Badge>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm} className="bg-gradient-to-r from-green-600 to-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500 text-white rounded-lg">
                        <Plus className="h-5 w-5" />
                      </div>
                      <DialogTitle className="text-green-700">
                        {editingCourse ? "Edit Course Details" : "Add New Course"}
                      </DialogTitle>
                    </div>
                  </DialogHeader>
                  <div className="space-y-6 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold flex items-center gap-2 text-blue-700">
                        <Award className="h-4 w-4" />
                        Course Category *
                      </label>
                      <Select value={formData.courseCategory} onValueChange={(value) => handleInputChange('courseCategory', value)}>
                        <SelectTrigger disabled={formLoading} className="border-blue-200 focus:border-blue-400">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {courseCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              <div className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-purple-500" />
                                {category.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold flex items-center gap-2 text-green-700">
                        <GraduationCap className="h-4 w-4" />
                        Course Name *
                      </label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                        <Input
                          value={formData.courseName}
                          onChange={(e) => handleInputChange('courseName', e.target.value)}
                          placeholder="Enter course name (e.g., Computer Fundamentals)"
                          disabled={formLoading}
                          className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold flex items-center gap-2 text-purple-700">
                          <Hash className="h-4 w-4" />
                          Course Sort Name *
                        </label>
                        <div className="relative">
                          <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 h-4 w-4" />
                          <Input
                            value={formData.courseSortName}
                            onChange={(e) => handleInputChange('courseSortName', e.target.value)}
                            placeholder="Enter short name (e.g., CF)"
                            disabled={formLoading}
                            className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold flex items-center gap-2 text-orange-700">
                          <Clock className="h-4 w-4" />
                          Duration *
                        </label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 h-4 w-4" />
                          <Input
                            value={formData.courseDuration}
                            onChange={(e) => handleInputChange('courseDuration', e.target.value)}
                            placeholder="Enter duration (e.g., 3 months)"
                            disabled={formLoading}
                            className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold flex items-center gap-2 text-emerald-700">
                        <IndianRupee className="h-4 w-4" />
                        Fees *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
                        <Input
                          value={formData.fees}
                          onChange={(e) => handleInputChange('fees', e.target.value)}
                          placeholder="Enter fees amount (e.g., 5000)"
                          disabled={formLoading}
                          className="pl-10 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={formLoading}>
                        Cancel
                      </Button>
                      <Button onClick={handleSubmit} disabled={formLoading} className="bg-emerald-600 hover:bg-emerald-700">
                        {formLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : (
                          editingCourse ? <Edit className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />
                        )}
                        {editingCourse ? "Update" : "Create"} Course
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                <TableRow className="border-b-2 border-purple-200">
                  <TableHead className="w-[120px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-purple-500" />
                      Actions
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[250px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-green-500" />
                      Course Name
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[130px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-purple-500" />
                      Short Name
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-500" />
                      Duration
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[120px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-emerald-500" />
                      Fees
                    </div>
                  </TableHead>
                  <TableHead className="min-w-[130px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-blue-500" />
                      Category
                    </div>
                  </TableHead>
                  <TableHead className="w-[100px] font-semibold text-gray-700 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-indigo-500" />
                      Status
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                          <GraduationCap className="h-8 w-8 text-gray-400" />
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                            {searchTerm || statusFilter !== "all" || categoryFilter !== "all" ? "No courses found" : "No courses available"}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                            {searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                              ? "Try adjusting your search criteria or filters" 
                              : "Start by adding your first course using the button above"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCourses.map((course, index) => (
                    <TableRow 
                      key={course.id} 
                      className={`hover:bg-purple-50/50 dark:hover:bg-purple-950/20 transition-colors ${
                        index % 2 === 0 ? 'bg-white dark:bg-background' : 'bg-gray-50/50 dark:bg-gray-950/30'
                      }`}
                    >
                      <TableCell className="py-4">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(course)}
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            title="Edit course"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(course.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Delete course"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded">
                            <GraduationCap className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-gray-100">{course.course_name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-purple-100 dark:bg-purple-900/30 rounded">
                            <Hash className="h-3 w-3 text-purple-600" />
                          </div>
                          <span className="font-mono text-sm font-medium">{course.course_sort_name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-orange-100 dark:bg-orange-900/30 rounded">
                            <Clock className="h-3 w-3 text-orange-600" />
                          </div>
                          <span className="text-sm">{course.duration}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-emerald-100 dark:bg-emerald-900/30 rounded">
                            <IndianRupee className="h-3 w-3 text-emerald-600" />
                          </div>
                          <span className="text-sm font-medium">₹{parseFloat(course.fees).toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                            <Award className="h-3 w-3 text-blue-600" />
                          </div>
                          <span className="text-sm">{course.category}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge 
                          variant={course.status === 'active' ? "default" : "secondary"}
                          className={`${
                            course.status === 'active' 
                              ? 'bg-green-100 text-green-800 border-green-200' 
                              : 'bg-gray-100 text-gray-800 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            {course.status === 'active' ? (
                              <BookOpen className="h-3 w-3" />
                            ) : (
                              <Users className="h-3 w-3" />
                            )}
                            {course.status}
                          </div>
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseMasterContent;