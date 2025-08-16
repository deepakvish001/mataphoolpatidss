import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";
import { Loader2, Edit, Trash2, Search, Filter, BookOpen, Calendar, Image as ImageIcon } from "lucide-react";

interface StudentData {
  id: string;
  title: string;
  details: string;
  course_category: string;
  photo_url?: string;
  publish_date: string;
}

const StudentDataContent = () => {
  const {
    data: studentDataItems,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<StudentData>({ 
    tableName: 'student_data',
    orderBy: { column: 'created_at', ascending: false }
  });

  useAdminRealTime({
    tableName: 'student_data'
  });
  
  const [formData, setFormData] = useState({
    titleOfData: "",
    detailsOfData: "",
    detailsOfCourses: "Advance Diploma In Computer Application(ADCA)",
    photoFile: null as File | null,
    dateOfPublish: ""
  });

  const [editingStudent, setEditingStudent] = useState<StudentData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, photoFile: file }));
  };

  const handleSubmit = async () => {
    if (!formData.titleOfData || !formData.detailsOfData) {
      toast.error("Please fill in required fields");
      return;
    }

    const studentDataItem = {
      title: formData.titleOfData,
      details: formData.detailsOfData,
      course_category: formData.detailsOfCourses,
      photo_url: formData.photoFile ? URL.createObjectURL(formData.photoFile) : "",
      publish_date: formData.dateOfPublish || new Date().toLocaleDateString()
    };

    try {
      if (editingStudent) {
        await update(editingStudent.id, studentDataItem);
        toast.success("Student data updated successfully!");
      } else {
        await create(studentDataItem);
        toast.success("Student data submitted successfully!");
      }
      
      handleReset();
    } catch (error) {
      toast.error(`Failed to ${editingStudent ? 'update' : 'submit'} student data`);
    }
  };

  const handleEdit = (student: StudentData) => {
    setEditingStudent(student);
    setFormData({
      titleOfData: student.title,
      detailsOfData: student.details,
      detailsOfCourses: student.course_category,
      photoFile: null,
      dateOfPublish: student.publish_date
    });
  };

  const handleReset = () => {
    setEditingStudent(null);
    setFormData({
      titleOfData: "",
      detailsOfData: "",
      detailsOfCourses: "Advance Diploma In Computer Application(ADCA)",
      photoFile: null,
      dateOfPublish: ""
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    try {
      await deleteItem(id);
      toast.success("Student data deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete student data");
    }
  };

  // Filter and search functionality
  const filteredData = useMemo(() => {
    let filtered = studentDataItems || [];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter(item => item.course_category === filterCategory);
    }

    return filtered;
  }, [studentDataItems, searchTerm, filterCategory]);

  const courseCategories = [
    "Advance Diploma In Computer Application(ADCA)",
    "Diploma in Computer Application (DCA)", 
    "Post Graduate Diploma in Computer Application (PGDCA)",
    "Diploma in Computer Hardware and Networking"
  ];

  if (loading) {
    return (
      <div className="w-full max-w-none bg-gray-200 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading student data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Records</p>
                <p className="text-3xl font-bold">{studentDataItems?.length || 0}</p>
              </div>
              <BookOpen className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">This Month</p>
                <p className="text-3xl font-bold">
                  {studentDataItems?.filter(item => {
                    const itemDate = new Date(item.publish_date);
                    const currentMonth = new Date().getMonth();
                    return itemDate.getMonth() === currentMonth;
                  }).length || 0}
                </p>
              </div>
              <Calendar className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">With Photos</p>
                <p className="text-3xl font-bold">
                  {studentDataItems?.filter(item => item.photo_url).length || 0}
                </p>
              </div>
              <ImageIcon className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Filtered Results</p>
                <p className="text-3xl font-bold">{filteredData.length}</p>
              </div>
              <Filter className="h-12 w-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Form */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span>{editingStudent ? 'Edit Student Data' : 'Add New Student Data'}</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title Of Data */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Title Of Data*</label>
              <Input
                value={formData.titleOfData}
                onChange={(e) => handleInputChange('titleOfData', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
                placeholder="Enter title of the data"
              />
            </div>

            {/* Course Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Course Category*</label>
              <Select value={formData.detailsOfCourses} onValueChange={(value) => handleInputChange('detailsOfCourses', value)}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                  {courseCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Details of Data */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Details of Data*</label>
              <Textarea
                value={formData.detailsOfData}
                onChange={(e) => handleInputChange('detailsOfData', e.target.value)}
                className="min-h-[100px] border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white resize-none"
                placeholder="Enter detailed description of the student data"
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Photo Upload</label>
              <div className="border border-gray-300 rounded p-4 bg-white">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button
                      variant="outline"
                      className="h-10 px-4 border-gray-300 hover:bg-gray-50 font-medium text-gray-700"
                    >
                      Choose File
                    </Button>
                  </div>
                  <span className="text-gray-500 font-medium">
                    {formData.photoFile ? formData.photoFile.name : "No file chosen"}
                  </span>
                </div>
              </div>
            </div>

            {/* Date of Publish */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date of Publish</label>
              <Input
                type="date"
                value={formData.dateOfPublish}
                onChange={(e) => handleInputChange('dateOfPublish', e.target.value)}
                className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded text-gray-700 font-medium bg-white"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-8">
            <Button 
              onClick={handleSubmit}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {editingStudent ? 'Update Data' : 'Submit Data'}
            </Button>
            
            {editingStudent && (
              <Button 
                onClick={handleReset}
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50 px-8 py-3 rounded-lg"
              >
                Cancel Edit
              </Button>
            )}
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
                placeholder="Search by title or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded"
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 rounded">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                  <SelectItem value="all">All Categories</SelectItem>
                  {courseCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.split('(')[0].trim()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-6 border-b border-gray-100">
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center justify-between">
            <span>Student Data Records ({filteredData.length})</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Total: {studentDataItems?.length || 0}
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <th className="border border-blue-400 px-6 py-4 text-sm font-semibold text-left">Actions</th>
                  <th className="border border-blue-400 px-6 py-4 text-sm font-semibold text-left">Title</th>
                  <th className="border border-blue-400 px-6 py-4 text-sm font-semibold text-left">Details</th>
                  <th className="border border-blue-400 px-6 py-4 text-sm font-semibold text-left">Category</th>
                  <th className="border border-blue-400 px-6 py-4 text-sm font-semibold text-left">Date</th>
                  <th className="border border-blue-400 px-6 py-4 text-sm font-semibold text-left">Photo</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
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
                      <div className="font-semibold text-gray-800">{item.title}</div>
                    </td>
                    <td className="border border-gray-200 px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {item.details}
                      </div>
                    </td>
                    <td className="border border-gray-200 px-6 py-4">
                      <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                        {item.course_category.split('(')[0].trim()}
                      </Badge>
                    </td>
                    <td className="border border-gray-200 px-6 py-4">
                      <div className="text-sm text-gray-600">{item.publish_date}</div>
                    </td>
                    <td className="border border-gray-200 px-6 py-4">
                      <div className="w-16 h-12 border border-gray-300 bg-gray-50 rounded flex items-center justify-center overflow-hidden">
                        {item.photo_url ? (
                          <img 
                            src={item.photo_url} 
                            alt="Student data" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={6} className="border border-gray-200 px-6 py-12 text-center">
                      <div className="text-gray-500">
                        {searchTerm || filterCategory !== "all" 
                          ? "No records match your search criteria" 
                          : "No student data records found"}
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

export default StudentDataContent;