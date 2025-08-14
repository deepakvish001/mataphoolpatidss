import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddCourseCategoryContent = () => {
  const { toast } = useToast();
  const [courseCategory, setCourseCategory] = useState("");
  
  const [categories, setCategories] = useState([
    {
      id: 2,
      courseCategory: "3 Month"
    },
    {
      id: 3,
      courseCategory: "6 Months"
    },
    {
      id: 4,
      courseCategory: "12 Month"
    },
    {
      id: 5,
      courseCategory: "18 Month"
    },
    {
      id: 6,
      courseCategory: "24 Month"
    },
    {
      id: 8,
      courseCategory: "3 month"
    },
    {
      id: 9,
      courseCategory: "1 Year"
    },
    {
      id: 11,
      courseCategory: "12 Months"
    }
  ]);

  const handleUpload = () => {
    if (!courseCategory.trim()) {
      toast({
        title: "Error",
        description: "Please enter a course category",
        variant: "destructive"
      });
      return;
    }

    const newCategory = {
      id: Math.max(...categories.map(c => c.id)) + 1,
      courseCategory: courseCategory
    };

    setCategories(prev => [...prev, newCategory]);
    
    toast({
      title: "Success",
      description: "Course category added successfully!",
      variant: "default"
    });

    setCourseCategory("");
  };

  const handleDelete = (id: number) => {
    setCategories(prev => prev.filter(category => category.id !== id));
    toast({
      title: "Success",
      description: "Course category deleted successfully!",
      variant: "default"
    });
  };

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
                Upload
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Categories Table */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="text-white font-bold text-center py-4">id</TableHead>
                <TableHead className="text-white font-bold text-center py-4">Course Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id} className="hover:bg-gray-50">
                  <TableCell className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-2">
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
                          onClick={() => handleDelete(category.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="text-sm text-gray-700 font-medium ml-2">
                        {category.id}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {category.courseCategory}
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