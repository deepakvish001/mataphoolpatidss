import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Mock data for student admit cards
const mockStudentData = [
  {
    id: "1",
    student_id: "STU001",
    student_name: "GUPTESHWAR SINGH",
    mothers_name: "SHASHI PRABHA SINGH",
    fathers_name: "RAVINDRA SINGH",
    course_name: "ADCA",
    roll_number: "20040",
    exam_center_code: "EC001",
    exam_center_address: "B. Soft Computer Institute, Azamgarh",
    exam_date: "2024-03-15",
    batch: "Morning",
    reporting_time: "09:00 AM",
    gate_closing_time: "09:30 AM",
    exam_start_time: "10:00 AM",
    exam_duration: "2 Hours",
    student_photo_url: "/lovable-uploads/393bdd79-f1d0-430f-8c0d-c10eb0d72005.png",
    pwd_status: "No",
    status: "active"
  },
  {
    id: "2",
    student_id: "STU002",
    student_name: "CHOTE LAL KUMAR",
    mothers_name: "DHARMI DEVI",
    fathers_name: "VIJAY PRASAD",
    course_name: "DCA",
    roll_number: "20043",
    exam_center_code: "EC002",
    exam_center_address: "Jiyanpur Center",
    exam_date: "2024-03-15",
    batch: "Morning",
    reporting_time: "10:00 AM",
    gate_closing_time: "10:30 AM",
    exam_start_time: "11:00 AM",
    exam_duration: "90 Minutes",
    student_photo_url: "/lovable-uploads/393bdd79-f1d0-430f-8c0d-c10eb0d72005.png",
    pwd_status: "No",
    status: "active"
  },
  {
    id: "3",
    student_id: "STU003",
    student_name: "RAJESH KUMAR",
    mothers_name: "SUNITA DEVI",
    fathers_name: "RAM PRASAD",
    course_name: "PGDCA",
    roll_number: "20045",
    exam_center_code: "EC003",
    exam_center_address: "Main Center, Azamgarh",
    exam_date: "2024-03-16",
    batch: "Evening",
    reporting_time: "02:00 PM",
    gate_closing_time: "02:30 PM",
    exam_start_time: "03:00 PM",
    exam_duration: "3 Hours",
    student_photo_url: "/lovable-uploads/393bdd79-f1d0-430f-8c0d-c10eb0d72005.png",
    pwd_status: "No",
    status: "active"
  }
];

type StudentAdmitCard = typeof mockStudentData[0];

const GenerateStudentAdmitCardContent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCard, setSelectedCard] = useState<StudentAdmitCard | null>(null);
  const [searchResults, setSearchResults] = useState<StudentAdmitCard[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchValue.trim()) {
      toast({
        title: "Error",
        description: "Please enter a student ID or roll number to search",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = mockStudentData.filter(student => 
        student.student_id.toLowerCase().includes(searchValue.toLowerCase()) ||
        student.roll_number.toLowerCase().includes(searchValue.toLowerCase()) ||
        student.student_name.toLowerCase().includes(searchValue.toLowerCase())
      );

      setSearchResults(results);
      setShowSearchResults(true);
      setLoading(false);

      if (results.length > 0) {
        toast({
          title: "Success",
          description: `Found ${results.length} student(s)`,
        });
      } else {
        toast({
          title: "No Results",
          description: "No students found with the given criteria",
          variant: "destructive"
        });
      }
    }, 500);
  };

  const handleSelectStudent = (card: StudentAdmitCard) => {
    setSelectedCard(card);
    setShowSearchResults(false);
    toast({
      title: "Student Selected",
      description: `Selected ${card.student_name} for admit card generation`,
    });
  };

  const handleGenerateAdmitCard = () => {
    if (!selectedCard) {
      toast({
        title: "Error",
        description: "Please search and select a student first",
        variant: "destructive"
      });
      return;
    }

    setGenerating(true);
    
    // Simulate generation process
    setTimeout(() => {
      toast({
        title: "Success",
        description: `Admit card generated successfully for ${selectedCard.student_name}`,
      });

      // Update the selected card status locally
      setSelectedCard({
        ...selectedCard,
        status: 'generated'
      });
      
      setGenerating(false);
    }, 1000);
  };

  const handlePrintAdmitCard = () => {
    if (!selectedCard) {
      toast({
        title: "Error",
        description: "Please generate an admit card first",
        variant: "destructive"
      });
      return;
    }
    window.print();
  };

  return (
    <div className="w-full max-w-none bg-gray-50 min-h-screen">
      {/* Header Navigation */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <a href="/admin" className="text-blue-600 hover:text-blue-800 font-medium">
            Home
          </a>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">Search Student</span>
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-60 h-8 border border-gray-300"
              placeholder="Enter Student ID, Roll Number, or Name"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 text-sm"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleGenerateAdmitCard}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2"
            disabled={!selectedCard || generating}
          >
            {generating ? "Generating..." : "Generate Admit Card"}
          </Button>
          <Button 
            onClick={handlePrintAdmitCard}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
            disabled={!selectedCard}
          >
            Print Admit Card
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {showSearchResults && searchResults.length > 0 && (
        <div className="px-6 py-4 bg-white border-b">
          <h3 className="text-lg font-semibold mb-3">Search Results:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((student) => (
              <Card key={student.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <p><strong>Name:</strong> {student.student_name}</p>
                    <p><strong>Roll No:</strong> {student.roll_number}</p>
                    <p><strong>Course:</strong> {student.course_name}</p>
                    <p><strong>Student ID:</strong> {student.student_id}</p>
                    <Button 
                      onClick={() => handleSelectStudent(student)}
                      className="w-full mt-2"
                      size="sm"
                    >
                      Select Student
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-6 py-8 max-w-5xl mx-auto">
        <div className="bg-white p-8 shadow-lg border">
          
          {/* Institute Header */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              B. Soft Computer & Technical Institute
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              Near Union Bank Of India Bina Soft Educational & Welfare Society Vill & Post BILARIYAGAN J, AZAMGARH-276121
            </p>
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              B. Soft Computer & Technical Institute EXAMINATION
            </h2>
            <h3 className="text-base font-bold text-gray-800 mb-6">
              CANDIDATE ADMIT CARD
            </h3>
          </div>

          {/* Candidate Information Table */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3 text-center">
              Name of the Candidate ( AS FILLED BY THE CANDIDATE IN OEAF)
            </p>
            
            <div className="flex gap-4">
              {/* Left side - Form fields */}
              <div className="flex-1">
                <table className="w-full border-2 border-gray-800">
                  <tbody>
                    <tr>
                      <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm w-1/3">
                        ROLL NO
                      </td>
                      <td className="border border-gray-800 px-3 py-3 text-sm">
                        {selectedCard?.roll_number || ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                        NAME
                      </td>
                      <td className="border border-gray-800 px-3 py-3 text-sm">
                        {selectedCard?.student_name || ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                        MOTHER'S NAME
                      </td>
                      <td className="border border-gray-800 px-3 py-3 text-sm">
                        {selectedCard?.mothers_name || ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                        FATHER'S NAME
                      </td>
                      <td className="border border-gray-800 px-3 py-3 text-sm">
                        {selectedCard?.fathers_name || ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                        EXAM CENTER CODE
                      </td>
                      <td className="border border-gray-800 px-3 py-3 text-sm">
                        {selectedCard?.exam_center_code || ""}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                        PWD :
                      </td>
                      <td className="border border-gray-800 px-3 py-3 text-sm">
                        {selectedCard?.pwd_status || ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Right side - Photo placeholder */}
              <div className="w-32">
                <div className="border-2 border-gray-800 h-40 bg-gray-50 flex items-center justify-center">
                  {selectedCard?.student_photo_url ? (
                    <img 
                      src={selectedCard.student_photo_url} 
                      alt="Student" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-4 h-4 border border-gray-400"></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Valid For Section */}
          <div className="text-center mb-6">
            <div className="border-2 border-gray-800 py-2 bg-gray-100">
              <p className="font-medium text-sm">
                VALID FOR ( Every Month Exam Cycle ) EXAMINATION ONLY
              </p>
            </div>
          </div>

          {/* Batch Schedule */}
          <div className="mb-6">
            <div className="border-2 border-gray-800 bg-gray-100 text-center py-2 mb-0">
              <h4 className="font-bold text-sm">BATCH SCHEDULE</h4>
            </div>
            
            <table className="w-full border-2 border-gray-800 border-t-0">
              <tbody>
                <tr>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm w-1/2">
                    EXAM CENTRE CODE:
                  </td>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                    EXAM DATE :
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-3 text-sm">
                    {selectedCard?.exam_center_code || ""}
                  </td>
                  <td className="border border-gray-800 px-3 py-3 text-sm">
                    {selectedCard?.exam_date || ""}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                    EXAM CENTRE ADDRESS:
                  </td>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                    BATCH :
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-3 text-sm">
                    {selectedCard?.exam_center_address || ""}
                  </td>
                  <td className="border border-gray-800 px-3 py-3 text-sm">
                    {selectedCard?.batch || ""}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm" colSpan={2}>
                    REPORTING TIME :
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-3 text-sm" colSpan={2}>
                    {selectedCard?.reporting_time || ""}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm" colSpan={2}>
                    GATE CLOSING TIME :
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-4 text-sm" colSpan={2}>
                    {selectedCard?.gate_closing_time || ""} - No candidate will be allowed to enter the examination center after the gate closing time.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm" colSpan={2}>
                    EXAM START TIME:
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-3 text-sm" colSpan={2}>
                    {selectedCard?.exam_start_time || ""}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm" colSpan={2}>
                    EXAM DURATION :
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-3 text-sm" colSpan={2}>
                    {selectedCard?.exam_duration || ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Instructions Footer */}
          <div className="text-center">
            <div className="border-2 border-gray-800 py-3 bg-gray-100">
              <p className="font-bold text-sm">
                INSTRUCTIONS TO BE FOLLOWED BY CANDIDATES AT B. Soft Computer & Technical Institute EXAMINATION
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateStudentAdmitCardContent;