import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const SearchByStudentDataContent = () => {
  const { toast } = useToast();
  
  const [studentId, setStudentId] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Sample comprehensive student data based on the screenshots
  const sampleStudentData = [
    {
      id: 1,
      applicant_name: "Mr./श्री Vivek",
      father_name: "Mr./श्री गगगजग",
      mother: "Mrs./श्रीमती gytytgfgff",
      gender: "Male",
      dob: "03/05/1990",
      category: "NULL",
      occupation: "NULL",
      phone_std: "+918840908715",
      mobile: "+918840908715",
      email: "technical@gmail.com",
      address: "Hardoi",
      city_name: "Hardoi",
      state: "Uttar Pradesh",
      district: "Hardoi",
      pincode: "221090",
      qualification: "B.A.",
      passing_year: "2009",
      applied_as: "Student",
      course_category: "Computer Course",
      course_name: "Diploma in Computer Application (DCA)",
      course_fees: "14500",
      franchise_center_name: "Institute of Computer Training Centre, Numaish Chauraha, Hardoi",
      franchise_id: "UP/HDI/ICTC/0002",
      aadhar_number: "543456456646565654",
      photo: "~/Offer_pic/P.jpg",
      signature: "~/Offer_pic/S.jpg",
      thumb_impression: "~/Offer_pic/T.jpg",
      student_id: "TCI/HDI/ADCA/1",
      student_password: "58741",
      approve: false,
      status: "NULL",
      payment: "NULL"
    },
    {
      id: 2,
      applicant_name: "Mr./श्री VIVEK YADAV",
      father_name: "Mr./श्री NA",
      mother: "Mrs./श्रीमती NA",
      gender: "Male",
      dob: "12/07/2020",
      category: "General/सामान्य",
      occupation: "20/10/1997",
      phone_std: "",
      mobile: "+919690283407",
      email: "AS@GMAIL.COM",
      address: "LUCKNOW",
      city_name: "LUCKNOW",
      state: "UP",
      district: "Azamgarh",
      pincode: "223223",
      qualification: "Other",
      passing_year: "2029",
      applied_as: "",
      course_category: "12 Month",
      course_name: "Diploma in Computer Application",
      course_fees: "6000",
      franchise_center_name: "Ravi Kumar Gupta",
      franchise_id: "SM11101",
      aadhar_number: "343546546534355645",
      photo: "~/Offer_pic/599-5990202_rm-clipart copy.jpg",
      signature: "",
      thumb_impression: "",
      student_id: "",
      student_password: "",
      approve: false,
      status: "",
      payment: ""
    },
    {
      id: 3,
      applicant_name: "Mr./ Aurangzeb Ahmad",
      father_name: "Mr./ Ajaj Ahmad",
      mother: "Mrs./ Farzana",
      gender: "Male",
      dob: "09/07/1998",
      category: "General/सामान्य",
      occupation: "20/09/2020",
      phone_std: "",
      mobile: "+919794224055",
      email: "sr920111@gmail.com",
      address: "bachhuapar",
      city_name: "azamgarh",
      state: "Uttar Pradesh",
      district: "",
      pincode: "276141",
      qualification: "10th Pass",
      passing_year: "2010",
      applied_as: "",
      course_category: "",
      course_name: "Diploma in Computer Hardware and Networking",
      course_fees: "15000",
      franchise_center_name: "",
      franchise_id: "SM11101",
      aadhar_number: "539177029237",
      photo: "~/Offer_pic/",
      signature: "~/Offer_pic/",
      thumb_impression: "~/Offer_pic/",
      student_id: "",
      student_password: "",
      approve: false,
      status: "",
      payment: ""
    }
  ];

  const handleSearch = () => {
    if (!studentId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a Student ID to search",
        variant: "destructive"
      });
      return;
    }

    // Simulate search - in real app this would be an API call
    const results = sampleStudentData.filter(student => 
      student.id.toString().includes(studentId) || 
      student.student_id.includes(studentId) ||
      student.applicant_name.toLowerCase().includes(studentId.toLowerCase())
    );

    if (results.length === 0) {
      // If no exact match, show all sample data for demo
      setSearchResults(sampleStudentData);
    } else {
      setSearchResults(results);
    }
    
    setShowResults(true);
    
    toast({
      title: "Search Complete",
      description: `Found ${results.length || sampleStudentData.length} student record(s)`,
      variant: "default"
    });
  };

  const handleApprovalChange = (studentId: number, approved: boolean) => {
    setSearchResults(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, approve: approved }
          : student
      )
    );
  };

  return (
    <div className="w-full max-w-none bg-white">
      {/* Header */}
      <div className="bg-gray-400 px-4 py-3 mb-4 border border-gray-500">
        <h1 className="text-lg font-medium text-gray-800">Search By Student Data</h1>
      </div>

      {/* Home Link */}
      <div className="mb-4">
        <a href="/admin" className="text-blue-600 hover:text-blue-800 text-sm underline">
          Home
        </a>
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700 min-w-[100px]">
            Students ID
          </label>
          <div className="flex gap-2">
            <Input
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Enter Student ID"
              className="w-80 border-2 border-gray-400"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>

      {/* Results Table */}
      {showResults && (
        <div className="border-2 border-gray-600 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[3000px]">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[40px]">id</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[150px]">applicant_name</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[130px]">father_name</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[130px]">mother</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[70px]">gender</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[100px]">dob</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[100px]">category</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[100px]">occupation</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[120px]">phone_std</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[120px]">mobile</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[180px]">email</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[120px]">address</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[100px]">city_name</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[80px]">state</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[80px]">district</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[80px]">pincode</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[120px]">qualification</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[110px]">passing_year</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[100px]">applied_as</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[130px]">course_category</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[200px]">course_name</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[100px]">course_fees</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[250px]">franchise_center_name</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[120px]">franchise_id</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[150px]">aadhar_number</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[200px]">photo</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[120px]">signature</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[140px]">thumb_impression</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[120px]">student_id</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[140px]">student_password</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[80px]">Approve</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[80px]">status</th>
                  <th className="border-2 border-gray-600 px-2 py-2 text-sm font-medium text-left min-w-[80px]">payment</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((student, index) => (
                  <tr key={student.id} className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.id}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.applicant_name}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.father_name}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.mother}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.gender}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.dob}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.category}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.occupation}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.phone_std}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.mobile}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.email}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.address}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.city_name}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.state}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.district}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.pincode}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.qualification}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.passing_year}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.applied_as}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.course_category}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.course_name}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.course_fees}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.franchise_center_name}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.franchise_id}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.aadhar_number}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.photo}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.signature}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.thumb_impression}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.student_id}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.student_password}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-center">
                      <Checkbox
                        checked={student.approve}
                        onCheckedChange={(checked) => handleApprovalChange(student.id, checked as boolean)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.status}</td>
                    <td className="border-2 border-gray-600 px-2 py-2 text-xs">{student.payment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!showResults && (
        <div className="text-center py-8 text-gray-500">
          <p>Enter a Student ID and click Submit to search for student data</p>
        </div>
      )}
    </div>
  );
};

export default SearchByStudentDataContent;