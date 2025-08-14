import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const VerificationContent = () => {
  const { toast } = useToast();

  // Sample student verification data based on the screenshot
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
      photo: "",
      certificate: "",
      marksheet: ""
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
      photo: "",
      certificate: "",
      marksheet: ""
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
      photo: "/lovable-uploads/65fbe569-1bb8-4005-93c9-b80a386cc5df.png",
      certificate: "",
      marksheet: ""
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
      photo: "/lovable-uploads/65fbe569-1bb8-4005-93c9-b80a386cc5df.png",
      certificate: "",
      marksheet: ""
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
      photo: "",
      certificate: "",
      marksheet: ""
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
      photo: "/lovable-uploads/65fbe569-1bb8-4005-93c9-b80a386cc5df.png",
      certificate: "",
      marksheet: ""
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
      photo: "/lovable-uploads/65fbe569-1bb8-4005-93c9-b80a386cc5df.png",
      certificate: "",
      marksheet: ""
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
      photo: "/lovable-uploads/65fbe569-1bb8-4005-93c9-b80a386cc5df.png",
      certificate: "",
      marksheet: ""
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
      photo: "",
      certificate: "",
      marksheet: ""
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
      photo: "/lovable-uploads/65fbe569-1bb8-4005-93c9-b80a386cc5df.png",
      certificate: "",
      marksheet: ""
    }
  ]);

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
        <h1 className="text-lg font-medium text-gray-800">Verification</h1>
      </div>

      {/* Verification Table */}
      <div className="border-2 border-gray-600 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[80px]">State</th>
                <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[80px]">Distt</th>
                <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[120px]">center_code</th>
                <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[130px]">Enrollment_no</th>
                <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[100px]">dob</th>
                <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[150px]">Name</th>
                <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[250px]">Course_Name</th>
                <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[100px]">Photo</th>
                <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[100px]">Certificate</th>
                <th className="border-2 border-gray-600 px-3 py-3 text-sm font-medium text-left min-w-[100px]">Marksheet</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                  <td className="border-2 border-gray-600 px-3 py-3 text-xs">
                    <Button
                      variant="link"
                      onClick={() => handleDelete(student.id)}
                      className="p-0 h-auto text-blue-600 hover:text-blue-800 text-xs mb-2"
                    >
                      Delete
                    </Button>
                    <div className="font-medium">{student.state}</div>
                  </td>
                  <td className="border-2 border-gray-600 px-3 py-3 text-xs">{student.district}</td>
                  <td className="border-2 border-gray-600 px-3 py-3 text-xs">{student.centerCode}</td>
                  <td className="border-2 border-gray-600 px-3 py-3 text-xs">{student.enrollmentNo}</td>
                  <td className="border-2 border-gray-600 px-3 py-3 text-xs">{student.dob}</td>
                  <td className="border-2 border-gray-600 px-3 py-3 text-xs">{student.name}</td>
                  <td className="border-2 border-gray-600 px-3 py-3 text-xs">{student.courseName}</td>
                  <td className="border-2 border-gray-600 px-3 py-3">
                    <div className="w-16 h-16 border-2 border-gray-400 bg-gray-50 flex items-center justify-center">
                      {student.photo ? (
                        <img 
                          src={student.photo} 
                          alt="Student" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-4 h-4 border border-gray-400"></div>
                      )}
                    </div>
                  </td>
                  <td className="border-2 border-gray-600 px-3 py-3">
                    <div className="w-16 h-16 border-2 border-gray-400 bg-gray-50 flex items-center justify-center">
                      {student.certificate ? (
                        <img 
                          src={student.certificate} 
                          alt="Certificate" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-4 h-4 border border-gray-400"></div>
                      )}
                    </div>
                  </td>
                  <td className="border-2 border-gray-600 px-3 py-3">
                    <div className="w-16 h-16 border-2 border-gray-400 bg-gray-50 flex items-center justify-center">
                      {student.marksheet ? (
                        <img 
                          src={student.marksheet} 
                          alt="Marksheet" 
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

      {/* Reference Number Footer */}
      <div className="mt-4">
        <div className="bg-blue-600 text-white text-center py-3 text-lg font-medium">
          {referenceNumber}
        </div>
      </div>
    </div>
  );
};

export default VerificationContent;