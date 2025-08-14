import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const StudentAdmitCardReportContent = () => {
  const { toast } = useToast();

  // Sample student admit card report data
  const [reportData] = useState([
    {
      id: 1,
      course: "ADCA",
      rollNumber: "20040",
      studentName: "Mr./श्रीGUPTESHWAR SINGH",
      motherName: "Mrs./श्रीमतीSHASHI PRABHA SINGH",
      fatherName: "Mr./श्रीRAVINDRA SINGH",
      examCenterCode: "",
      pwd: "",
      examCenterAddress: "",
      examDate: "",
      batch: "",
      reportingTime: "",
      gateClosingTime: "",
      examStartTime: "",
      examDuration: "",
      photo: "~/Offer_pic/"
    },
    {
      id: 2,
      course: "ADCA",
      rollNumber: "20043",
      studentName: "Mr./श्रीChote Lal Kumar",
      motherName: "Mrs./श्रीमतीDharmi Devi",
      fatherName: "Mr./श्रीVijay Prasad",
      examCenterCode: "SM11101",
      pwd: "",
      examCenterAddress: "Jiyanpur",
      examDate: "11/06/2019",
      batch: "M004",
      reportingTime: "10:00",
      gateClosingTime: "10:30",
      examStartTime: "11:00",
      examDuration: "90 Minute",
      photo: "~/Offer_pic/chotalal.jpg"
    }
  ]);

  const handleEdit = (id: number) => {
    toast({
      title: "Edit",
      description: `Edit student admit card report ID: ${id}`,
      variant: "default"
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete",
      description: `Delete student admit card report ID: ${id}`,
      variant: "destructive"
    });
  };

  return (
    <div className="w-full max-w-none bg-gray-200 min-h-screen">
      {/* Header */}
      <div className="bg-gray-400 px-6 py-4 border-b border-gray-500">
        <h1 className="text-xl font-medium text-gray-800">Student Admit Card Report</h1>
      </div>

      {/* Data Table */}
      <div className="px-8 py-6">
        <div className="border-2 border-gray-600 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[80px]">Course</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[80px]">Roll Number</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[150px]">Student_Name</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[150px]">Mother_Name</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[150px]">Father_Name</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[120px]">Exam_Center_Code</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[60px]">PWD</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[120px]">Exam_Center_Address</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">Exam_Date</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[80px]">Batch</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">Reporting_Time</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">Gate_Closing_Time</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">Exam_Start_Time</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">Exam_Duration</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">photo</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">
                      <div className="flex gap-1 mb-2">
                        <Button
                          variant="link"
                          onClick={() => handleEdit(item.id)}
                          className="p-0 h-auto text-blue-600 hover:text-blue-800 text-xs"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="link"
                          onClick={() => handleDelete(item.id)}
                          className="p-0 h-auto text-blue-600 hover:text-blue-800 text-xs"
                        >
                          Delete
                        </Button>
                      </div>
                      <div>{item.course}</div>
                    </td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.rollNumber}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.studentName}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.motherName}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.fatherName}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.examCenterCode}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.pwd}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.examCenterAddress}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.examDate}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.batch}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.reportingTime}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.gateClosingTime}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.examStartTime}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.examDuration}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.photo}</td>
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

export default StudentAdmitCardReportContent;