import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GraduationCap, Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface ClassFees {
  id: string;
  course_type: string;
  board_university?: string;
  course_name: string;
  student_cv?: string;
  duration?: string;
  fees_entry: string;
}

const ClassFeesContent = () => {
  const {
    data: classFees,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<ClassFees>({ tableName: 'class_fees' });

  useAdminRealTime({
    tableName: 'class_fees'
  });

  const [courseType, setCourseType] = useState("Computer Courses");
  const [boardUniversity, setBoardUniversity] = useState("");
  const [courseName, setCourseName] = useState("");
  const [studentCV, setStudentCV] = useState("");
  const [duration, setDuration] = useState("");
  const [feesEntry, setFeesEntry] = useState("");

  const handleReset = () => {
    setCourseType("Computer Courses");
    setBoardUniversity("");
    setCourseName("");
    setStudentCV("");
    setDuration("");
    setFeesEntry("");
  };

  const handleInsertData = async () => {
    if (!courseType || !courseName || !feesEntry) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      await create({
        course_type: courseType,
        board_university: boardUniversity || null,
        course_name: courseName,
        student_cv: studentCV || null,
        duration: duration || null,
        fees_entry: feesEntry
      });

      handleReset();
      toast.success("Class fees data added successfully!");
    } catch (error) {
      toast.error("Failed to add class fees data");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success("Class fees deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete class fees");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading class fees data...</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Form Card */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span>Student Class Fees</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* Course Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Type *
              </label>
              <Select value={courseType} onValueChange={setCourseType}>
                <SelectTrigger className="w-full h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Courses">Computer Courses</SelectItem>
                  <SelectItem value="Programming Courses">Programming Courses</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Board or University */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Board or University
                </label>
                <Input
                  type="text"
                  value={boardUniversity}
                  onChange={(e) => setBoardUniversity(e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Enter board/university"
                />
              </div>

              {/* Course Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Name *
                </label>
                <Select value={courseName} onValueChange={setCourseName}>
                  <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic-computer">Basic Computer Course</SelectItem>
                    <SelectItem value="advanced-computer">Advanced Computer Course</SelectItem>
                    <SelectItem value="programming">Programming Fundamentals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Student CV */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Student CV
                </label>
                <Input
                  type="text"
                  value={studentCV}
                  onChange={(e) => setStudentCV(e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Enter student CV"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <Input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Enter duration"
                />
              </div>

              {/* Fees Entry */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fees Entry *
                </label>
                <Input
                  type="text"
                  value={feesEntry}
                  onChange={(e) => setFeesEntry(e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Enter fees amount"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                onClick={handleInsertData}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Insert Data
              </Button>
              <Button 
                onClick={handleReset}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table Card */}
      <Card className="shadow-2xl border-2 border-gray-600 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-600 hover:bg-blue-600">
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Actions</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Course Type</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Board/University</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Course Name</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Student CV</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Duration</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Fees Entry</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classFees.map((fee, index) => (
                <TableRow key={fee.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 p-4">
                    <div className="flex justify-center space-x-2">
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
                        onClick={() => handleDelete(fee.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {fee.course_type}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {fee.board_university || "N/A"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {fee.course_name}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {fee.student_cv || "N/A"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {fee.duration || "N/A"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    ₹{fee.fees_entry}
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

export default ClassFeesContent;