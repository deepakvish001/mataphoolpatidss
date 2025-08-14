import { useState } from "react";
import { Button } from "@/components/ui/button";

const FeesReportContent = () => {
  const [feesData] = useState([
    {
      id: 17,
      receipt: "ReceiptNo 14",
      date: "2019-06-06",
      student: "--Select Student Name--",
      feefor: "450",
      totalfee: "600",
      feepaid: "200",
      freedue: "400",
      other: "Diploma in Computer Application",
      frmid: "SM11101",
      frmname: "Ravi Kumar Gupta"
    },
    {
      id: 18,
      receipt: "ReceiptNo 1",
      date: "2019-10-08",
      student: "vivek",
      feefor: "TE111031",
      totalfee: "500000",
      feepaid: "24000",
      freedue: "476000",
      other: "BTech",
      frmid: "FRN111052",
      frmname: "Pushpatechnosoft"
    },
    {
      id: 19,
      receipt: "ReceiptNo 2",
      date: "2019-10-05",
      student: "vivek",
      feefor: "TE111032",
      totalfee: "500000",
      feepaid: "35000",
      freedue: "465000",
      other: "BTech",
      frmid: "FRN111052",
      frmname: "Pushpatechnosoft"
    },
    {
      id: 20,
      receipt: "ReceiptNo 4",
      date: "09/01/2021",
      student: "--Select Student Name--",
      feefor: "001",
      totalfee: "4000",
      feepaid: "200",
      freedue: "3800",
      other: "ADCA",
      frmid: "SM11101",
      frmname: "SM11101"
    },
    {
      id: 21,
      receipt: "ReceiptNo 5",
      date: "30/12/2020",
      student: "Mr./₹TBINASOFT",
      feefor: "20016",
      totalfee: "4800",
      feepaid: "2000",
      freedue: "2800",
      other: "ADCA",
      frmid: "SM11101",
      frmname: "SM11101"
    }
  ]);

  return (
    <div className="w-full max-w-none bg-gray-50 min-h-screen">
      {/* Header Navigation */}
      <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <a href="/admin" className="text-blue-600 hover:text-blue-800 font-medium">
            Home
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Fees Report Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full border-collapse border-2 border-gray-800">
            <thead>
              <tr className="bg-blue-500">
                <th className="text-white font-bold text-center border-2 border-gray-800 px-3 py-3 text-sm min-w-[120px]">
                  Edit Delete
                </th>
                <th className="text-white font-bold text-center border-2 border-gray-800 px-3 py-3 text-sm min-w-[60px]">
                  id
                </th>
                <th className="text-white font-bold text-center border-2 border-gray-800 px-3 py-3 text-sm min-w-[100px]">
                  Receipt
                </th>
                <th className="text-white font-bold text-center border-2 border-gray-800 px-3 py-3 text-sm min-w-[100px]">
                  Date
                </th>
                <th className="text-white font-bold text-center border-2 border-gray-800 px-3 py-3 text-sm min-w-[150px]">
                  Student
                </th>
                <th className="text-white font-bold text-center border-2 border-gray-800 px-3 py-3 text-sm min-w-[80px]">
                  feefor
                </th>
                <th className="text-white font-bold text-center border-2 border-gray-800 px-3 py-3 text-sm min-w-[90px]">
                  Totalfee
                </th>
                <th className="text-white font-bold text-center border-2 border-gray-800 px-3 py-3 text-sm min-w-[80px]">
                  feepaid
                </th>
                <th className="text-white font-bold text-center border-2 border-gray-800 px-3 py-3 text-sm min-w-[80px]">
                  freedue
                </th>
                <th className="text-white font-bold text-center border-2 border-gray-800 px-3 py-3 text-sm min-w-[200px]">
                  other
                </th>
                <th className="text-white font-bold text-center border-2 border-gray-800 px-3 py-3 text-sm min-w-[100px]">
                  frmid
                </th>
                <th className="text-white font-bold text-center border-2 border-gray-800 px-3 py-3 text-sm min-w-[150px]">
                  frmname
                </th>
              </tr>
            </thead>
            <tbody>
              {feesData.map((fee, index) => (
                <tr key={fee.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                  <td className="border-2 border-gray-800 px-3 py-3 text-center text-sm">
                    <div className="flex gap-2 justify-center">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs px-3 py-1 h-7 border-gray-400"
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs px-3 py-1 h-7 border-gray-400"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                  <td className="border-2 border-gray-800 px-3 py-3 text-center text-sm font-medium">
                    {fee.id}
                  </td>
                  <td className="border-2 border-gray-800 px-3 py-3 text-center text-sm">
                    {fee.receipt}
                  </td>
                  <td className="border-2 border-gray-800 px-3 py-3 text-center text-sm">
                    {fee.date}
                  </td>
                  <td className="border-2 border-gray-800 px-3 py-3 text-center text-sm">
                    {fee.student}
                  </td>
                  <td className="border-2 border-gray-800 px-3 py-3 text-center text-sm">
                    {fee.feefor}
                  </td>
                  <td className="border-2 border-gray-800 px-3 py-3 text-center text-sm font-medium">
                    {fee.totalfee}
                  </td>
                  <td className="border-2 border-gray-800 px-3 py-3 text-center text-sm font-medium">
                    {fee.feepaid}
                  </td>
                  <td className="border-2 border-gray-800 px-3 py-3 text-center text-sm font-medium">
                    {fee.freedue}
                  </td>
                  <td className="border-2 border-gray-800 px-3 py-3 text-center text-sm">
                    {fee.other}
                  </td>
                  <td className="border-2 border-gray-800 px-3 py-3 text-center text-sm">
                    {fee.frmid}
                  </td>
                  <td className="border-2 border-gray-800 px-3 py-3 text-center text-sm">
                    {fee.frmname}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeesReportContent;