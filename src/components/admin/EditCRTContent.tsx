import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const EditCRTContent = () => {
  const { toast } = useToast();

  // Sample edit CRT data based on screenshots
  const [crtData] = useState([
    {
      id: 77,
      studentId: "20041",
      coursename: "ADCA",
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
      photo: "~/Offer_pic/IMG-20200208-WA0005.jpg",
      directSign: "~/Offer_pic/signature.jpg"
    },
    {
      id: 80,
      studentId: "20041",
      coursename: "ADCA",
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
      photo: "~/Offer_pic/IMG-20200208-WA0005.jpg",
      directSign: "~/Offer_pic/signature.jpg"
    },
    {
      id: 82,
      studentId: "20041",
      coursename: "ADCA",
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
      photo: "~/Offer_pic/IMG-20200208-WA0005.jpg",
      directSign: "~/Offer_pic/signature.jpg"
    },
    {
      id: 83,
      studentId: "20047",
      coursename: "ADCA",
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
      photo: "~/Offer_pic/IMG-20200907-WA0022 (1).jpg",
      directSign: "~/Offer_pic/signature.jpg"
    }
  ]);

  const handleEdit = (id: number) => {
    toast({
      title: "Edit",
      description: `Edit CRT record ID: ${id}`,
      variant: "default"
    });
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Delete",
      description: `Delete CRT record ID: ${id}`,
      variant: "destructive"
    });
  };

  return (
    <div className="w-full max-w-none bg-gray-200 min-h-screen">
      {/* Header */}
      <div className="bg-gray-400 px-6 py-4 border-b border-gray-500">
        <h1 className="text-xl font-medium text-gray-800">Edit CRT</h1>
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
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[150px]">photo</th>
                  <th className="border-2 border-gray-600 px-2 py-3 text-xs font-medium text-left min-w-[150px]">direct_sign</th>
                </tr>
              </thead>
              <tbody>
                {crtData.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">
                      <div className="flex gap-1 mb-1">
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
                      <div>{item.id}</div>
                    </td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.studentId}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.coursename}</td>
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
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.photo}</td>
                    <td className="border-2 border-gray-600 px-2 py-3 text-xs">{item.directSign}</td>
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

export default EditCRTContent;