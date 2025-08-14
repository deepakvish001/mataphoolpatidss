import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const StudentEditingContent = () => {
  const studentData = [
    {
      id: 1,
      applicantName: "Mr./Vivek",
      fatherName: "Mr./ggggig",
      mother: "Mrs./gytytgfgff",
      gender: "Male",
      dob: "03/05/1990",
      category: "NULL",
      occupation: "NULL",
      phoneStd: "+918840908715",
      mobile: "+918840908715",
      email: "technical@gmail.com",
      address: "Hardoi",
      cityName: "Hardoi",
      state: "Uttar Pradesh",
      district: "Hardoi",
      pincode: "221090",
      qualification: "B.A.",
      passingYear: "2009",
      appliedAs: "Student",
      courseCategory: "Computer Course",
      courseName: "Diploma in Computer Application (DCA)",
      courseFees: "14500",
      franchiseCenterName: "Institute of Computer Training Centre, Numaish Chauraha, Hardoi",
      franchiseId: "UP/HDI/ICTC/0002",
      aadharNumber: "543456456646565",
      photo: "~/Offer_pic/P.jpg",
      signature: "~/Offer_pic/S.jpg",
      thumbImpression: "~/Offer_pic/T.jpg",
      studentId: "TCI/HDI/ADCA/1",
      studentPassword: "58741",
      approve: false,
      status: "NULL",
      payment: "NULL"
    },
    {
      id: 2,
      applicantName: "Mr./VIVEK YADAV",
      fatherName: "Mr./NA",
      mother: "Mrs./NA",
      gender: "Male",
      dob: "12/07/2020",
      category: "General/सामान्य",
      occupation: "20/10/1997",
      phoneStd: "",
      mobile: "+919690283407",
      email: "AS@GMAIL.COM",
      address: "LUCKNOW",
      cityName: "LUCKNOW",
      state: "UP",
      district: "Azamgarh",
      pincode: "223223",
      qualification: "Other",
      passingYear: "2029",
      appliedAs: "12 Month",
      courseCategory: "",
      courseName: "Diploma in Computer Application",
      courseFees: "6000",
      franchiseCenterName: "Ravi Kumar Gupta",
      franchiseId: "SM11101",
      aadharNumber: "354564653434565",
      photo: "~/Offer_pic/599-5990202_rm-clipart copy.jpg",
      signature: "",
      thumbImpression: "",
      studentId: "",
      studentPassword: "",
      approve: false,
      status: "",
      payment: ""
    },
    {
      id: 3,
      applicantName: "Mr./ Aurangzeb Ahmad",
      fatherName: "Mr./ Ajaj Ahmad",
      mother: "Mrs./ Farzana",
      gender: "Male",
      dob: "09/07/1998",
      category: "General/सामान्य",
      occupation: "20/09/2020",
      phoneStd: "",
      mobile: "+919794224055",
      email: "sr920111@gmail.com",
      address: "bachhuapar",
      cityName: "azamgarh",
      state: "Uttar Pradesh",
      district: "",
      pincode: "276141",
      qualification: "10th Pass",
      passingYear: "2010",
      appliedAs: "",
      courseCategory: "",
      courseName: "Diploma in Computer Hardware and Networking",
      courseFees: "15000",
      franchiseCenterName: "",
      franchiseId: "SM11101",
      aadharNumber: "539177029237",
      photo: "~/Offer_pic/",
      signature: "~/Offer_pic/",
      thumbImpression: "~/Offer_pic/",
      studentId: "",
      studentPassword: "",
      approve: false,
      status: "",
      payment: ""
    },
    {
      id: 4,
      applicantName: "Mr./VIVEK YADAV",
      fatherName: "Mr./NA",
      mother: "Mrs./NA",
      gender: "Male",
      dob: "12/07/2020",
      category: "Other Backward Class/अन्य पिछडा वर्ग",
      occupation: "20/10/1997",
      phoneStd: "",
      mobile: "+919690283407",
      email: "AS@GMAIL.COM",
      address: "LUCKNOW",
      cityName: "LUCKNOW",
      state: "UP",
      district: "Azamgarh",
      pincode: "223223",
      qualification: "Other",
      passingYear: "2029",
      appliedAs: "12 Month",
      courseCategory: "",
      courseName: "Diploma in Computer Application",
      courseFees: "6000",
      franchiseCenterName: "Ravi Kumar Gupta",
      franchiseId: "SM11101",
      aadharNumber: "354564653434565",
      photo: "~/Offer_pic/599-5990202_rm-clipart copy.jpg",
      signature: "",
      thumbImpression: "",
      studentId: "",
      studentPassword: "",
      approve: false,
      status: "",
      payment: ""
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Basic Information Table */}
      <div className="overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Student Basic Information</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">id</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">applicant_name</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">father_name</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">mother</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">gender</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">dob</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">category</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">occupation</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">phone_std</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">mobile</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">email</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student, index) => (
              <tr key={student.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-400 px-2 py-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <Edit className="h-3 w-3 text-blue-600" />
                    </Button>
                    <span>Edit {student.id}</span>
                  </div>
                </td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.applicantName}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.fatherName}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.mother}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.gender}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.dob}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.category}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.occupation}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.phoneStd}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.mobile}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Address and Course Information Table */}
      <div className="overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Address & Course Information</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">address</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">city_name</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">state</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">district</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">pincode</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">qualification</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">passing_year</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">applied_as</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">course_category</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">course_name</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">course_fees</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">franchise_center</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student, index) => (
              <tr key={`addr-${student.id}`} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.address}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.cityName}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.state}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.district}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.pincode}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.qualification}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.passingYear}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.appliedAs}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.courseCategory}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.courseName}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.courseFees}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.franchiseCenterName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Franchise and Document Information Table */}
      <div className="overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Franchise & Document Information</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">franchise_center_name</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">franchise_id</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">aadhar_number</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">photo</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">signature</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">thumb_impression</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">student_id</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student, index) => (
              <tr key={`doc-${student.id}`} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.franchiseCenterName}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.franchiseId}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.aadharNumber}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.photo}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.signature}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.thumbImpression}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.studentId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student Status and Payment Information Table */}
      <div className="overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Student Status & Payment Information</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">aadhar_number</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">photo</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">signature</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">thumb_impression</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">student_id</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">student_password</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">Approve</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">status</th>
              <th className="border border-gray-400 px-2 py-3 text-left font-semibold text-xs">payment</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student, index) => (
              <tr key={`status-${student.id}`} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.aadharNumber}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.photo}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.signature}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.thumbImpression}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.studentId}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.studentPassword}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs text-center">
                  <Checkbox checked={student.approve} />
                </td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.status}</td>
                <td className="border border-gray-400 px-2 py-3 text-xs">{student.payment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentEditingContent;