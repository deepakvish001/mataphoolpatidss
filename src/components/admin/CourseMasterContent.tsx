import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CourseMasterContent = () => {
  const { toast } = useToast();
  const [courseCategory, setCourseCategory] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseSortName, setCourseSortName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [fees, setFees] = useState("");
  
  const [courses, setCourses] = useState([
    {
      id: 17,
      courseName: "Diploma in Computer Hardware and Networking",
      courseSortName: "DCHN",
      courseDuration: "12 months",
      fees: "15000",
      category: "12 Month"
    },
    {
      id: 18,
      courseName: "Advance Diploma In Computer Application(ADCA)",
      courseSortName: "ADCA",
      courseDuration: "12",
      fees: "4800",
      category: "12 Month"
    },
    {
      id: 20,
      courseName: "Typing Hindi and English",
      courseSortName: "Typing H&E",
      courseDuration: "3 Months",
      fees: "2800",
      category: "3 Month"
    },
    {
      id: 24,
      courseName: "COC",
      courseSortName: "COMPUTER OPRETING COURSE",
      courseDuration: "90 DAYS",
      fees: "3000",
      category: "3 Month"
    },
    {
      id: 25,
      courseName: "OFFICE MANAGEMENT COURSE",
      courseSortName: "OMC",
      courseDuration: "6 MONTH",
      fees: "3000",
      category: "6 Month"
    },
    {
      id: 30,
      courseName: "Post Graduate Diploma In Computer Application (PGDCA)",
      courseSortName: "PGDCA",
      courseDuration: "12 Month",
      fees: "15000",
      category: "1 Year"
    }
  ]);

  const courseCategories = [
    { value: "3-month", label: "3 Month" },
    { value: "6-month", label: "6 Month" },
    { value: "12-month", label: "12 Month" },
    { value: "1-year", label: "1 Year" }
  ];

  const handleSave = () => {
    if (!courseCategory) {
      toast({
        title: "Error",
        description: "Please select a course category",
        variant: "destructive"
      });
      return;
    }

    if (!courseName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a course name",
        variant: "destructive"
      });
      return;
    }

    if (!courseSortName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a course sort name",
        variant: "destructive"
      });
      return;
    }

    if (!courseDuration.trim()) {
      toast({
        title: "Error",
        description: "Please enter course duration",
        variant: "destructive"
      });
      return;
    }

    if (!fees.trim()) {
      toast({
        title: "Error",
        description: "Please enter fees",
        variant: "destructive"
      });
      return;
    }

    const newCourse = {
      id: Math.max(...courses.map(c => c.id)) + 1,
      courseName,
      courseSortName,
      courseDuration,
      fees,
      category: courseCategories.find(cat => cat.value === courseCategory)?.label || courseCategory
    };

    setCourses(prev => [...prev, newCourse]);
    
    toast({
      title: "Success",
      description: "Course added successfully!",
      variant: "default"
    });

    setCourseCategory("");
    setCourseName("");
    setCourseSortName("");
    setCourseDuration("");
    setFees("");
  };

  const handleReset = () => {
    setCourseCategory("");
    setCourseName("");
    setCourseSortName("");
    setCourseDuration("");
    setFees("");
  };

  const handleDelete = (id: number) => {
    setCourses(prev => prev.filter(course => course.id !== id));
    toast({
      title: "Success",
      description: "Course deleted successfully!",
      variant: "default"
    });
  };

  return (
    <div className="space-y-8">
      {/* Course Master Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100 bg-gray-400">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span>Course Master</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Course Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Course Category
              </label>
              <Select value={courseCategory} onValueChange={setCourseCategory}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white">
                  <SelectValue placeholder="---------------Select---------------" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 rounded shadow-lg z-50">
                  {courseCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value} className="text-gray-700 hover:bg-gray-100">
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Enter Course Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Enter Course Name
              </label>
              <Input
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter course name"
              />
            </div>

            {/* Enter Course Sort Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Enter Course Sort Name
              </label>
              <Input
                value={courseSortName}
                onChange={(e) => setCourseSortName(e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter course sort name"
              />
            </div>

            {/* Course Duration */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Course Duration
              </label>
              <Input
                value={courseDuration}
                onChange={(e) => setCourseDuration(e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter course duration"
              />
            </div>

            {/* Fees */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Fees
              </label>
              <Input
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter fees"
              />
            </div>

            {/* Save and Reset Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Save
              </Button>
              <Button
                onClick={handleReset}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses Table */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="text-white font-bold text-center py-4">id</TableHead>
                <TableHead className="text-white font-bold text-center py-4">Course_Name</TableHead>
                <TableHead className="text-white font-bold text-center py-4">Course_Sort_Name</TableHead>
                <TableHead className="text-white font-bold text-center py-4">Course_Duration</TableHead>
                <TableHead className="text-white font-bold text-center py-4">Fees</TableHead>
                <TableHead className="text-white font-bold text-center py-4">Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id} className="hover:bg-gray-50">
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
                          onClick={() => handleDelete(course.id)}
                          className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="text-sm text-gray-700 font-medium ml-2">
                        {course.id}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {course.courseName}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {course.courseSortName}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {course.courseDuration}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {course.fees}
                  </TableCell>
                  <TableCell className="text-center p-4 text-gray-700 font-medium">
                    {course.category}
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

export default CourseMasterContent;