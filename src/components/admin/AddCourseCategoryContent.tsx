import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Edit, Trash2, Loader2 } from "lucide-react";
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
      {/* Add Course Category Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-blue-600 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span>Add Course Category</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Course Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Course Category
              </label>
              <Input
                value={courseCategory}
                onChange={(e) => setCourseCategory(e.target.value)}
                className="h-12 border-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter course category"
              />
            </div>

            {/* Upload Button */}
            <div className="pt-4">
              <Button
                onClick={handleUpload}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {editingCategory ? "Update" : "Upload"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories Table */}
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Actions</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">id</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Course Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category, index) => (
                <TableRow key={category.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 p-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {category.category_id}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {category.course_category}
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

export default AddCourseCategoryContent;