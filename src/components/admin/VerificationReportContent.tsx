import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VerificationReportContent = () => {
  const { toast } = useToast();

  // Sample student verification report data based on the screenshot
  const [students] = useState([
    {
      id: 1,
      state: "Delhi",
      district: "PHASE1",
      centerCode: "123",
      enrollmentNo: "455",
      dob: "12/12/2018",
      name: "VIVEK",
      courseName: "Diploma in Computer Application",
      photo: "~/Offer_pic/adchn.jpg",
      certificate: "~/Offer_pic/alison_courseware_intro_599.jpg",
      marksheet: "~/Offer_pic/refrigeration-and-air-conditioning.jpg"
    },
    {
      id: 2,
      state: "Uttar Pradesh",
      district: "Azamgarh",
      centerCode: "",
      enrollmentNo: "",
      dob: "",
      name: "",
      courseName: "ADCA",
      photo: "~/Offer_pic/",
      certificate: "~/Offer_pic/",
      marksheet: "~/Offer_pic/"
    },
    {
      id: 3,
      state: "Uttar Pradesh",
      district: "Mau",
      centerCode: "SM11101",
      enrollmentNo: "20070",
      dob: "12/08/2007",
      name: "Vineet Pandey",
      courseName: "Advance Diploma In Computer Application (ADCA)",
      photo: "~/Offer_pic/VINEET PANDEY.jpg",
      certificate: "~/Offer_pic/",
      marksheet: "~/Offer_pic/vineet pandey adca.pdf"
    },
    {
      id: 4,
      state: "Uttar Pradesh",
      district: "Mau",
      centerCode: "SM11101",
      enrollmentNo: "20051",
      dob: "07/07/1998",
      name: "Km Jyoti",
      courseName: "Advance Diploma In Computer Application (ADCA)",
      photo: "~/Offer_pic/jyoti photo.jpg",
      certificate: "~/Offer_pic/",
      marksheet: "~/Offer_pic/jyoti marksheet.pdf"
    },
    {
      id: 5,
      state: "0",
      district: "Azamgarh",
      centerCode: "SM11101",
      enrollmentNo: "20072",
      dob: "",
      name: "Ranvijay Yadav",
      courseName: "Advance Diploma In Computer Application (ADCA)",
      photo: "~/Offer_pic/",
      certificate: "~/Offer_pic/",
      marksheet: "~/Offer_pic/"
    },
    {
      id: 6,
      state: "Uttar Pradesh",
      district: "Mau",
      centerCode: "SM11101",
      enrollmentNo: "20074",
      dob: "14/03/2002",
      name: "ADITYA KUMAR",
      courseName: "Advance Diploma In Computer Application (ADCA)",
      photo: "~/Offer_pic/ADITYA.jpeg",
      certificate: "~/Offer_pic/",
      marksheet: "~/Offer_pic/ar.pdf"
    },
    {
      id: 7,
      state: "Uttar Pradesh",
      district: "AMBEDAKAR NAGAR",
      centerCode: "SM11101",
      enrollmentNo: "BSOFT300375",
      dob: "05/07/1988",
      name: "SURABHI SINGH",
      courseName: "Advance Diploma In Computer Application (ADCA)",
      photo: "~/Offer_pic/SURABHI SINGH.jpeg",
      certificate: "~/Offer_pic/",
      marksheet: "~/Offer_pic/SURABHI.pdf"
    },
    {
      id: 8,
      state: "Uttar Pradesh",
      district: "Azamgarh",
      centerCode: "SM11101",
      enrollmentNo: "20085",
      dob: "12/11/2000",
      name: "Shrinath Yadav",
      courseName: "Advance Diploma In Computer Application (ADCA)",
      photo: "~/Offer_pic/shrinath.jpeg",
      certificate: "~/Offer_pic/",
      marksheet: "~/Offer_pic/shrinath.pdf"
    },
    {
      id: 9,
      state: "Uttar Pradesh",
      district: "Mau",
      centerCode: "SM11101",
      enrollmentNo: "20098",
      dob: "03/01/2005",
      name: "BAJARANGI RAJBHAR",
      courseName: "Advance Diploma In Computer Application (ADCA)",
      photo: "~/Offer_pic/bajrangi.jpeg",
      certificate: "~/Offer_pic/",
      marksheet: "~/Offer_pic/"
    },
    {
      id: 10,
      state: "Uttar Pradesh",
      district: "Mau",
      centerCode: "SM11101",
      enrollmentNo: "200104",
      dob: "02/02/2003",
      name: "ROSHAN RAJBHAR",
      courseName: "Advance Diploma In Computer Application (ADCA)",
      photo: "~/Offer_pic/roshan rajbhar.jpeg",
      certificate: "~/Offer_pic/",
      marksheet: "~/Offer_pic/ROSHAN.pdf"
    }
  ]);

  const handleEdit = (studentId: number) => {
    toast({
      title: "Edit Student",
      description: `Opening edit form for student ID ${studentId}`,
      variant: "default"
    });
  };

  const handleDelete = (studentId: number) => {
    toast({
      title: "Delete Student",
      description: `Delete action for student ID ${studentId}`,
      variant: "destructive"
    });
  };

  const referenceNumber = "1234567";

  return (
    <div className="w-full max-w-none bg-white">
      {/* Header */}
      <div className="bg-gray-400 px-4 py-3 mb-4 border border-gray-500">
        <h1 className="text-lg font-medium text-gray-800">Verification Report</h1>
      </div>

      {/* Verification Report Table */}
      <div className="border-0 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[1800px]">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border-2 border-white px-3 py-3 text-sm font-medium text-left min-w-[80px]">State</th>
                <th className="border-2 border-white px-3 py-3 text-sm font-medium text-left min-w-[80px]">Distt</th>
                <th className="border-2 border-white px-3 py-3 text-sm font-medium text-left min-w-[120px]">center_code</th>
                <th className="border-2 border-white px-3 py-3 text-sm font-medium text-left min-w-[130px]">Enrollment_no</th>
                <th className="border-2 border-white px-3 py-3 text-sm font-medium text-left min-w-[100px]">dob</th>
                <th className="border-2 border-white px-3 py-3 text-sm font-medium text-left min-w-[150px]">Name</th>
                <th className="border-2 border-white px-3 py-3 text-sm font-medium text-left min-w-[280px]">Course_Name</th>
                <th className="border-2 border-white px-3 py-3 text-sm font-medium text-left min-w-[200px]">Photo</th>
                <th className="border-2 border-white px-3 py-3 text-sm font-medium text-left min-w-[200px]">Certificate</th>
                <th className="border-2 border-white px-3 py-3 text-sm font-medium text-left min-w-[250px]">Marksheet</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                  <td className="border-0 px-3 py-3 text-xs">
                    <div className="flex gap-1 mb-2">
                      <Button
                        variant="link"
                        onClick={() => handleEdit(student.id)}
                        className="p-0 h-auto text-blue-600 hover:text-blue-800 text-xs"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => handleDelete(student.id)}
                        className="p-0 h-auto text-blue-600 hover:text-blue-800 text-xs"
                      >
                        Delete
                      </Button>
                    </div>
                    <div>{student.state}</div>
                  </td>
                  <td className="border-0 px-3 py-3 text-xs">{student.district}</td>
                  <td className="border-0 px-3 py-3 text-xs">{student.centerCode}</td>
                  <td className="border-0 px-3 py-3 text-xs">{student.enrollmentNo}</td>
                  <td className="border-0 px-3 py-3 text-xs">{student.dob}</td>
                  <td className="border-0 px-3 py-3 text-xs">{student.name}</td>
                  <td className="border-0 px-3 py-3 text-xs">{student.courseName}</td>
                  <td className="border-0 px-3 py-3 text-xs break-all">{student.photo}</td>
                  <td className="border-0 px-3 py-3 text-xs break-all">{student.certificate}</td>
                  <td className="border-0 px-3 py-3 text-xs break-all">{student.marksheet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reference Number Footer */}
      <div className="mt-4">
        <div className="bg-blue-600 text-white text-center py-3 text-lg font-medium">
          {referenceNumber}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-4">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Export Report
        </Button>
        <Button variant="outline" className="border-gray-400">
          Print Report
        </Button>
        <Button variant="outline" className="border-gray-400">
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default VerificationReportContent;