import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";
import { Loader2, Edit, Trash2 } from "lucide-react";

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
    <div className="w-full max-w-none bg-gray-200 min-h-screen">
      {/* Header */}
      <div className="bg-gray-400 px-6 py-4 border-b border-gray-500">
        <h1 className="text-xl font-medium text-gray-800">Student Data</h1>
      </div>

      {/* Form Container */}
      <div className="px-8 py-6 space-y-6">
        
        {/* Title Of Data */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Title Of Data</label>
          <Input
            value={formData.titleOfData}
            onChange={(e) => handleInputChange('titleOfData', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
          />
        </div>

        {/* Details of Data */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Details of Data</label>
          <Textarea
            value={formData.detailsOfData}
            onChange={(e) => handleInputChange('detailsOfData', e.target.value)}
            className="w-full h-32 border-2 border-gray-400 bg-white resize-none"
          />
        </div>

        {/* Details of Courses */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Details of Courses</label>
          <Select value={formData.detailsOfCourses} onValueChange={(value) => handleInputChange('detailsOfCourses', value)}>
            <SelectTrigger className="w-full h-12 border-2 border-gray-400 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Advance Diploma In Computer Application(ADCA)">Advance Diploma In Computer Application(ADCA)</SelectItem>
              <SelectItem value="Diploma in Computer Application (DCA)">Diploma in Computer Application (DCA)</SelectItem>
              <SelectItem value="Post Graduate Diploma in Computer Application (PGDCA)">Post Graduate Diploma in Computer Application (PGDCA)</SelectItem>
              <SelectItem value="Diploma in Computer Hardware and Networking">Diploma in Computer Hardware and Networking</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Photo Upload */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Photo</label>
          <div className="border-2 border-gray-400 bg-white flex">
            <label className="bg-gray-100 hover:bg-gray-200 border-r border-gray-400 px-4 py-2 cursor-pointer text-sm font-medium text-gray-700">
              Choose file
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
            <span className="px-3 py-2 text-gray-500 text-sm flex-1">
              {formData.photoFile ? formData.photoFile.name : "No file chosen"}
            </span>
          </div>
        </div>

        {/* Date of Publish */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Date of Publish</label>
          <Input
            value={formData.dateOfPublish}
            onChange={(e) => handleInputChange('dateOfPublish', e.target.value)}
            className="w-full h-12 border-2 border-gray-400 bg-white"
            placeholder=""
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex space-x-4">
          <Button 
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 text-sm"
          >
            {editingStudent ? 'Update' : 'Submit'} Now
          </Button>
          
          {editingStudent && (
            <Button 
              onClick={handleReset}
              variant="outline"
              className="border-gray-600 text-gray-600 hover:bg-gray-50 px-6 py-2"
            >
              Cancel Edit
            </Button>
          )}
        </div>
      </div>

      {/* Data Table */}
      <div className="px-8 pb-6">
        <div className="border-2 border-gray-600 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border-2 border-gray-600 px-4 py-3 text-sm font-medium text-left min-w-[100px]">TITLE</th>
                  <th className="border-2 border-gray-600 px-4 py-3 text-sm font-medium text-left min-w-[200px]">DETAILS</th>
                  <th className="border-2 border-gray-600 px-4 py-3 text-sm font-medium text-left min-w-[150px]">DATE</th>
                  <th className="border-2 border-gray-600 px-4 py-3 text-sm font-medium text-left min-w-[250px]">CATEGORY</th>
                  <th className="border-2 border-gray-600 px-4 py-3 text-sm font-medium text-left min-w-[100px]">Photo</th>
                </tr>
              </thead>
              <tbody>
                {studentDataItems.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                    <td className="border-2 border-gray-600 px-4 py-3 text-xs">
                      <div className="flex gap-1 mb-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="font-medium">{item.title}</div>
                    </td>
                    <td className="border-2 border-gray-600 px-4 py-3 text-xs">{item.details}</td>
                    <td className="border-2 border-gray-600 px-4 py-3 text-xs">{item.publish_date}</td>
                    <td className="border-2 border-gray-600 px-4 py-3 text-xs">{item.course_category}</td>
                    <td className="border-2 border-gray-600 px-4 py-3">
                      <div className="w-16 h-12 border-2 border-gray-400 bg-gray-50 flex items-center justify-center">
                        {item.photo_url ? (
                          <img 
                            src={item.photo_url} 
                            alt="Student" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-4 h-4 border border-gray-400"></div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDataContent;