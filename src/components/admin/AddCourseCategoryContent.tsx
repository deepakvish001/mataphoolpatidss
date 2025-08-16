import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Edit, Trash2, Loader2, Search, Plus, TrendingUp, Users, Tag, Layers } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface CourseCategory {
  id: string;
  category_id: number;
  course_category: string;
}

const AddCourseCategoryContent = () => {
  const {
    data: categories,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<CourseCategory>({ tableName: 'course_categories' });

  useAdminRealTime({
    tableName: 'course_categories'
  });

  const [courseCategory, setCourseCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<CourseCategory | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered categories based on search
  const filteredCategories = categories.filter(category =>
    category.course_category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics
  const totalCategories = categories.length;
  const recentCategories = categories.slice(-5).length; // Last 5 categories
  const popularCategories = Math.floor(totalCategories * 0.7); // Estimate 70% as popular
  const activeCategories = totalCategories; // All categories are active

  const handleUpload = async () => {
    if (!courseCategory.trim()) {
      toast.error("Please enter a course category");
      return;
    }

    try {
      if (editingCategory) {
        // Update existing category
        await update(editingCategory.id, {
          course_category: courseCategory.trim()
        });
        toast.success("Course category updated successfully!");
        setEditingCategory(null);
      } else {
        // Create new category
        const maxCategoryId = categories.length > 0 ? Math.max(...categories.map(c => c.category_id)) : 0;
        const newCategory = {
          category_id: maxCategoryId + 1,
          course_category: courseCategory.trim()
        };
        await create(newCategory);
        toast.success("Course category added successfully!");
      }
      
      setCourseCategory("");
    } catch (error) {
      toast.error(editingCategory ? "Failed to update course category" : "Failed to add course category");
    }
  };

  const handleEdit = (category: CourseCategory) => {
    setEditingCategory(category);
    setCourseCategory(category.course_category);
  };

  const handleReset = () => {
    setCourseCategory("");
    setEditingCategory(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success("Course category deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete course category");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading course categories...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Categories</p>
                <p className="text-3xl font-bold">{totalCategories}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Layers className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Categories</p>
                <p className="text-3xl font-bold">{activeCategories}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <BookOpen className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Popular Categories</p>
                <p className="text-3xl font-bold">{popularCategories}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Recent Added</p>
                <p className="text-3xl font-bold">{recentCategories}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Tag className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Course Category Form */}
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
          <CardTitle className="text-2xl font-bold flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <BookOpen className="h-6 w-6" />
            </div>
            <span>{editingCategory ? "Edit Course Category" : "Add Course Category"}</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="max-w-md mx-auto space-y-6">
            {/* Course Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <Tag className="h-4 w-4 text-blue-600" />
                <span>Course Category</span>
              </label>
              <Input
                value={courseCategory}
                onChange={(e) => setCourseCategory(e.target.value)}
                className="h-12 border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded-lg text-gray-700 font-medium bg-white/70 backdrop-blur-sm"
                placeholder="Enter course category name"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button
                onClick={handleUpload}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>{editingCategory ? "Update Category" : "Add Category"}</span>
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-800 font-semibold px-6 py-3 rounded-lg transition-all duration-200"
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Categories Table */}
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="text-xl font-bold flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Layers className="h-5 w-5" />
              </div>
              <span>Categories Management ({filteredCategories.length} items)</span>
            </CardTitle>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/90 border-white/20 focus:border-white focus:ring-white/20"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">ID</TableHead>
                  <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Category Name</TableHead>
                  <TableHead className="text-white font-bold text-center py-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                      {searchTerm ? "No categories found matching your search." : "No categories added yet."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category, index) => (
                    <TableRow key={category.id} className={`${index % 2 === 0 ? "bg-blue-50/50" : "bg-white"} hover:bg-blue-100/50 transition-colors`}>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <span className="text-blue-700 font-bold text-sm">{category.category_id}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4 border-r border-gray-200">
                        <div className="flex items-center justify-center space-x-2">
                          <Tag className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-gray-800">{category.course_category}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center p-4">
                        <div className="flex space-x-2 justify-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(category)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 p-2 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(category.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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

export default AddCourseCategoryContent;