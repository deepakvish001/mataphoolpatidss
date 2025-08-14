import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ReadyMarksheetContent = () => {
  const { toast } = useToast();

  // Sample marksheet data based on screenshots
  const [marksheetData] = useState([
    {
      id: 77,
      studentId: "20041",
      courseName: "ADCA",
      semYear: "12 Month",
      subject: "C & C++",
      theoryMarks: "50",
      practicalMarks: "50",
      obtainTheoryMarks: "27",
      obtainPracticalMarks: "31",
      issueDate: "25/05/2017",
      place: "BILARIYAGAN J",
      studentName: "Mr./श्री RAHUL SINGH",
      studentFname: "Mr./श्री RADHESHYAM SINGH",
      studentMname: "Mrs./श्रीमती PUSHPA SINGH",
      studentVerificationNo: "BSOFT30061",
      examinationDate: "13/03/2017",
      centerName: "Bina Soft Educational and Welfare Society",
      centerCode: "SM11101",
      photo: "/lovable-uploads/d0bc963a-a6ea-48ad-b989-0c23c7b8d97e.png"
    },
    {
      id: 80,
      studentId: "20041",
      courseName: "ADCA",
      semYear: "12 Month",
      subject: "Page Maker",
      theoryMarks: "50",
      practicalMarks: "50",
      obtainTheoryMarks: "23",
      obtainPracticalMarks: "34",
      issueDate: "25/05/2017",
      place: "BILARIYAGAN J",
      studentName: "Mr./श्री RAHUL SINGH",
      studentFname: "Mr./श्री RADHESHYAM SINGH",
      studentMname: "Mrs./श्रीमती PUSHPA SINGH",
      studentVerificationNo: "BSOFT30061",
      examinationDate: "13/03/2017",
      centerName: "Bina Soft Educational and Welfare Society",
      centerCode: "SM11101",
      photo: "/lovable-uploads/d0bc963a-a6ea-48ad-b989-0c23c7b8d97e.png"
    },
    {
      id: 82,
      studentId: "20041",
      courseName: "ADCA",
      semYear: "12 Month",
      subject: "Corel Draw",
      theoryMarks: "50",
      practicalMarks: "50",
      obtainTheoryMarks: "29",
      obtainPracticalMarks: "26",
      issueDate: "25/05/2017",
      place: "BILARIYAGAN J",
      studentName: "Mr./श्री RAHUL SINGH",
      studentFname: "Mr./श्री RADHESHYAM SINGH",
      studentMname: "Mrs./श्रीमती PUSHPA SINGH",
      studentVerificationNo: "BSOFT30061",
      examinationDate: "13/03/2017",
      centerName: "Bina Soft Educational and Welfare Society",
      centerCode: "SM11101",
      photo: "/lovable-uploads/d0bc963a-a6ea-48ad-b989-0c23c7b8d97e.png"
    },
    {
      id: 83,
      studentId: "20047",
      courseName: "ADCA",
      semYear: "12 Month",
      subject: "Fundamental (DOS)",
      theoryMarks: "50",
      practicalMarks: "50",
      obtainTheoryMarks: "45",
      obtainPracticalMarks: "48",
      issueDate: "25/05/2017",
      place: "BILARIYAGAN J",
      studentName: "Mr./श्री SHIVAM SINGH",
      studentFname: "Mr./श्री ARVIND SINGH",
      studentMname: "Mrs./श्रीमती MAMATA SINGH",
      studentVerificationNo: "BSOFT30083",
      examinationDate: "13/03/2017",
      centerName: "Bina Soft Educational and Welfare Society",
      centerCode: "SM11101",
      photo: "/lovable-uploads/d0bc963a-a6ea-48ad-b989-0c23c7b8d97e.png"
    },
    {
      id: 92,
      studentId: "20047",
      courseName: "ADCA",
      semYear: "12 Month",
      subject: "Photoshop",
      theoryMarks: "50",
      practicalMarks: "50",
      obtainTheoryMarks: "38",
      obtainPracticalMarks: "34",
      issueDate: "25/05/2017",
      place: "BILARIYAGAN J",
      studentName: "Mr./श्री SHIVAM SINGH",
      studentFname: "Mr./श्री ARVIND SINGH",
      studentMname: "Mrs./श्रीमती MAMATA SINGH",
      studentVerificationNo: "BSOFT30083",
      examinationDate: "13/03/2017",
      centerName: "Bina Soft Educational and Welfare Society",
      centerCode: "SM11101",
      photo: "/lovable-uploads/d0bc963a-a6ea-48ad-b989-0c23c7b8d97e.png"
    },
    {
      id: 93,
      studentId: "20047",
      courseName: "ADCA",
      semYear: "12 Month",
      subject: "Corel Draw",
      theoryMarks: "50",
      practicalMarks: "50",
      obtainTheoryMarks: "39",
      obtainPracticalMarks: "37",
      issueDate: "25/05/2017",
      place: "BILARIYAGAN J",
      studentName: "Mr./श्री SHIVAM SINGH",
      studentFname: "Mr./श्री ARVIND SINGH",
      studentMname: "Mrs./श्रीमती MAMATA SINGH",
      studentVerificationNo: "BSOFT30083",
      examinationDate: "13/03/2017",
      centerName: "Bina Soft Educational and Welfare Society",
      centerCode: "SM11101",
      photo: "/lovable-uploads/d0bc963a-a6ea-48ad-b989-0c23c7b8d97e.png"
    },
    {
      id: 95,
      studentId: "20049",
      courseName: "ADCA",
      semYear: "12 Month",
      subject: "Windows XP",
      theoryMarks: "50",
      practicalMarks: "50",
      obtainTheoryMarks: "39",
      obtainPracticalMarks: "38",
      issueDate: "20/02/2021",
      place: "Jiyanpur",
      studentName: "Mr./श्री Abhay Hans",
      studentFname: "Mr./श्री Ram",
      studentMname: "Mrs./श्रीमती Shobha",
      studentVerificationNo: "BSOFT30094",
      examinationDate: "12/02/2021",
      centerName: "Bina Soft Educational and Welfare Society",
      centerCode: "SM11101",
      photo: "/lovable-uploads/d0bc963a-a6ea-48ad-b989-0c23c7b8d97e.png"
    }
  ]);

  const handleDelete = (id: number) => {
    toast({
      title: "Delete",
      description: `Delete marksheet record ID: ${id}`,
      variant: "destructive"
    });
  };

  return (
    <div className="w-full max-w-none bg-gray-200 min-h-screen">
      {/* Header */}
      <div className="bg-gray-400 px-6 py-4 border-b border-gray-500">
        <h1 className="text-xl font-medium text-gray-800">All Student Marksheet</h1>
      </div>

      {/* Data Table */}
      <div className="px-8 py-6">
        <div className="border-2 border-gray-600 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[60px]">id</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[80px]">student_id</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">coursename</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[80px]">sem_year</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[120px]">subject</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">theory_marks</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">practical_marks</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[120px]">obtain_theory_marks</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[120px]">obtain_practical_marks</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">issue_date</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">place</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[150px]">student_name</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[150px]">student_fname</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[150px]">student_mname</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[120px]">student_varification_no</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">examintion_date</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[150px]">center_name</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[100px]">center_code</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[80px]">Photo</th>
                </tr>
              </thead>
              <tbody>
                {marksheetData.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">
                      <div className="mb-1">
                        <Button
                          variant="link"
                          onClick={() => handleDelete(item.id)}
                          className="p-0 h-auto text-blue-600 hover:text-blue-800 text-xs"
                        >
                          Delete
                        </Button>
                      </div>
                      <div>{item.id}</div>
                    </td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.studentId}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.courseName}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.semYear}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.subject}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.theoryMarks}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.practicalMarks}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.obtainTheoryMarks}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.obtainPracticalMarks}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.issueDate}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.place}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.studentName}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.studentFname}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.studentMname}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.studentVerificationNo}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.examinationDate}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.centerName}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.centerCode}</td>
                    <td className="border-2 border-gray-600 px-2 py-3">
                      <div className="w-12 h-12 border border-gray-400 bg-blue-600 flex items-center justify-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-sm"></div>
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

export default ReadyMarksheetContent;