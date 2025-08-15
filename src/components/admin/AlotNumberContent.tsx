import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Edit, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface AlotNumber {
  id: string;
  student_id: string;
  course_name: string;
  theory_max_marks?: string;
  practical_max_marks?: string;
  obtain_theory_marks?: string;
  obtain_practical_marks?: string;
  student_name?: string;
  student_father_name?: string;
  student_mother_name?: string;
  course_examination_date?: string;
  center_name?: string;
  center_code?: string;
  issue_date?: string;
  place?: string;
  student_photo_url?: string;
  director_signature_url?: string;
}

const AlotNumberContent = () => {
  const {
    data: alotNumbers,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<AlotNumber>({ tableName: 'alot_numbers' });

  useAdminRealTime({
    tableName: 'alot_numbers'
  });

  const [formData, setFormData] = useState({
    studentsId: "",
    courseName: "",
    theoryMaxMarks: "",
    practicalMaxMarks: "",
    obtainTheoryMarks: "",
    obtainPracticalMarks: "",
    studentId: "BSOFT3004482",
    studentName: "",
    studentFatherName: "",
    studentMotherName: "",
    courseExaminationDate: "",
    centerName: "",
    centerCode: "",
    issueDate: "",
    place: "",
    studentPhoto: null as File | null,
    directorSignature: null as File | null
  });

  const [editingAlot, setEditingAlot] = useState<AlotNumber | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmitNow = async () => {
    if (!formData.studentsId) {
      toast.error("Please enter Students ID");
      return;
    }

    // Set the student ID in the form
    setFormData(prev => ({ ...prev, studentId: formData.studentsId }));
    toast.success("Students ID submitted successfully!");
  };

  const handleAddNow = () => {
    if (!formData.courseName || !formData.theoryMaxMarks || !formData.practicalMaxMarks || 
        !formData.obtainTheoryMarks || !formData.obtainPracticalMarks) {
      toast.error("Please fill in all marks fields");
      return;
    }
    toast.success("Marks data added successfully!");
  };

  const handleFinalSubmit = async () => {
    if (!formData.studentsId || !formData.courseName || !formData.studentName) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      if (editingAlot) {
        await update(editingAlot.id, {
          student_id: formData.studentsId,
          course_name: formData.courseName,
          theory_max_marks: formData.theoryMaxMarks,
          practical_max_marks: formData.practicalMaxMarks,
          obtain_theory_marks: formData.obtainTheoryMarks,
          obtain_practical_marks: formData.obtainPracticalMarks,
          student_name: formData.studentName,
          student_father_name: formData.studentFatherName,
          student_mother_name: formData.studentMotherName,
          course_examination_date: formData.courseExaminationDate,
          center_name: formData.centerName,
          center_code: formData.centerCode,
          issue_date: formData.issueDate,
          place: formData.place,
          student_photo_url: formData.studentPhoto ? formData.studentPhoto.name : undefined,
          director_signature_url: formData.directorSignature ? formData.directorSignature.name : undefined
        });
        toast.success("Alot number updated successfully!");
      } else {
        await create({
          student_id: formData.studentsId,
          course_name: formData.courseName,
          theory_max_marks: formData.theoryMaxMarks,
          practical_max_marks: formData.practicalMaxMarks,
          obtain_theory_marks: formData.obtainTheoryMarks,
          obtain_practical_marks: formData.obtainPracticalMarks,
          student_name: formData.studentName,
          student_father_name: formData.studentFatherName,
          student_mother_name: formData.studentMotherName,
          course_examination_date: formData.courseExaminationDate,
          center_name: formData.centerName,
          center_code: formData.centerCode,
          issue_date: formData.issueDate,
          place: formData.place,
          student_photo_url: formData.studentPhoto ? formData.studentPhoto.name : null,
          director_signature_url: formData.directorSignature ? formData.directorSignature.name : null
        });
        toast.success("Alot number created successfully!");
      }

      handleReset();
    } catch (error) {
      toast.error(`Failed to ${editingAlot ? 'update' : 'create'} alot number`);
    }
  };

  const handleEdit = (alot: AlotNumber) => {
    setEditingAlot(alot);
    setFormData({
      studentsId: alot.student_id,
      courseName: alot.course_name,
      theoryMaxMarks: alot.theory_max_marks || "",
      practicalMaxMarks: alot.practical_max_marks || "",
      obtainTheoryMarks: alot.obtain_theory_marks || "",
      obtainPracticalMarks: alot.obtain_practical_marks || "",
      studentId: alot.student_id,
      studentName: alot.student_name || "",
      studentFatherName: alot.student_father_name || "",
      studentMotherName: alot.student_mother_name || "",
      courseExaminationDate: alot.course_examination_date || "",
      centerName: alot.center_name || "",
      centerCode: alot.center_code || "",
      issueDate: alot.issue_date || "",
      place: alot.place || "",
      studentPhoto: null,
      directorSignature: null
    });
  };

  const handleReset = () => {
    setEditingAlot(null);
    setFormData({
      studentsId: "",
      courseName: "",
      theoryMaxMarks: "",
      practicalMaxMarks: "",
      obtainTheoryMarks: "",
      obtainPracticalMarks: "",
      studentId: "BSOFT3004482",
      studentName: "",
      studentFatherName: "",
      studentMotherName: "",
      courseExaminationDate: "",
      centerName: "",
      centerCode: "",
      issueDate: "",
      place: "",
      studentPhoto: null,
      directorSignature: null
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success("Alot number deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete alot number");
    }
  };

  if (loading) {
    return (
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardContent className="p-8 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading alot numbers...</p>
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
              <FileText className="h-6 w-6 text-white" />
            </div>
            <span>Alot Number</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="space-y-8">
            {/* Alot Number Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-700">Student ID Entry</h2>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Input
                    value={formData.studentsId}
                    onChange={(e) => handleInputChange('studentsId', e.target.value)}
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                    placeholder="Enter Students ID"
                  />
                </div>
                <Button 
                  onClick={handleSubmitNow}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 h-12"
                >
                  Submit Now
                </Button>
              </div>
            </div>

            {/* Course Selection and Marks */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Course & Marks Details</h3>
              <div className="flex gap-4">
                <Select value={formData.courseName} onValueChange={(value) => handleInputChange('courseName', value)}>
                  <SelectTrigger className="w-80 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white">
                    <SelectValue placeholder="Select Course Name" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADCA">Advance Diploma In Computer Application(ADCA)</SelectItem>
                    <SelectItem value="DCA">Diploma in Computer Application (DCA)</SelectItem>
                    <SelectItem value="PGDCA">Post Graduate Diploma in Computer Application (PGDCA)</SelectItem>
                    <SelectItem value="DCHN">Diploma in Computer Hardware and Networking</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <Input
                  value={formData.theoryMaxMarks}
                  onChange={(e) => handleInputChange('theoryMaxMarks', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Theory Max Marks"
                />
                <Input
                  value={formData.practicalMaxMarks}
                  onChange={(e) => handleInputChange('practicalMaxMarks', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Practical Max Marks"
                />
                <Input
                  value={formData.obtainTheoryMarks}
                  onChange={(e) => handleInputChange('obtainTheoryMarks', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Obtain Theory Marks"
                />
                <Input
                  value={formData.obtainPracticalMarks}
                  onChange={(e) => handleInputChange('obtainPracticalMarks', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Obtain Practical Marks"
                />
              </div>

              <div>
                <Button 
                  onClick={handleAddNow}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-2"
                >
                  Add Now
                </Button>
              </div>
            </div>

            {/* Student Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Student Information</h3>
              <div className="grid grid-cols-4 gap-4">
                <Input
                  value={formData.studentId}
                  onChange={(e) => handleInputChange('studentId', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-gray-100"
                  placeholder="Student ID"
                  readOnly
                />
                <Input
                  value={formData.studentName}
                  onChange={(e) => handleInputChange('studentName', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Student Name"
                />
                <Input
                  value={formData.studentFatherName}
                  onChange={(e) => handleInputChange('studentFatherName', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Student Father Name"
                />
                <Input
                  value={formData.studentMotherName}
                  onChange={(e) => handleInputChange('studentMotherName', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Student Mother Name"
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <Input
                  value={formData.courseExaminationDate}
                  onChange={(e) => handleInputChange('courseExaminationDate', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Course Examination Date"
                />
                <Input
                  value={formData.centerName}
                  onChange={(e) => handleInputChange('centerName', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Center Name"
                />
                <Input
                  value={formData.centerCode}
                  onChange={(e) => handleInputChange('centerCode', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Center Code"
                />
                <Input
                  value={formData.issueDate}
                  onChange={(e) => handleInputChange('issueDate', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Issue Date"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  value={formData.place}
                  onChange={(e) => handleInputChange('place', e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
                  placeholder="Place"
                />
              </div>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-2 gap-8">
              {/* Student Photo Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Student Photo Upload</label>
                <div className="border border-gray-300 rounded bg-white flex h-12">
                  <label className="bg-gray-100 hover:bg-gray-200 border-r border-gray-300 px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 flex items-center">
                    Choose file
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange('studentPhoto', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                  <span className="px-3 py-2 text-gray-500 text-sm flex-1 flex items-center">
                    {formData.studentPhoto ? formData.studentPhoto.name : "No file chosen"}
                  </span>
                </div>
              </div>

              {/* Director Signature */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Director Signature</label>
                <div className="border border-gray-300 rounded bg-white flex h-12">
                  <label className="bg-gray-100 hover:bg-gray-200 border-r border-gray-300 px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 flex items-center">
                    Choose file
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange('directorSignature', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                  <span className="px-3 py-2 text-gray-500 text-sm flex-1 flex items-center">
                    {formData.directorSignature ? formData.directorSignature.name : "No file chosen"}
                  </span>
                </div>
              </div>
            </div>

            {/* Final Submit */}
            <div className="pt-4">
            <div className="flex space-x-4">
              <Button 
                onClick={handleFinalSubmit}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-3 rounded shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {editingAlot ? 'Update' : 'Final Submit'}
              </Button>
              
              {editingAlot && (
                <Button 
                  onClick={handleReset}
                  variant="outline"
                  className="border-gray-600 text-gray-600 hover:bg-gray-50 px-6 py-3"
                >
                  Cancel Edit
                </Button>
              )}
            </div>
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
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Student ID</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Course Name</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Student Name</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Theory Marks</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Practical Marks</TableHead>
                <TableHead className="border-2 border-gray-600 text-white font-bold text-center py-4">Center Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alotNumbers.map((alot, index) => (
                <TableRow key={alot.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                  <TableCell className="border-2 border-gray-600 p-4">
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(alot)}
                        className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(alot.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {alot.student_id}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {alot.course_name}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {alot.student_name || "N/A"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {alot.obtain_theory_marks || "N/A"}/{alot.theory_max_marks || "N/A"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {alot.obtain_practical_marks || "N/A"}/{alot.practical_max_marks || "N/A"}
                  </TableCell>
                  <TableCell className="border-2 border-gray-600 text-center p-4 text-gray-700 font-medium">
                    {alot.center_name || "N/A"}
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

export default AlotNumberContent;