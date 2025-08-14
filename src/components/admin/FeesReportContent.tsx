import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-500 text-white">
                <TableHead className="text-white font-bold text-center border border-gray-300 px-2 py-3 text-sm">
                  Edit Delete
                </TableHead>
                <TableHead className="text-white font-bold text-center border border-gray-300 px-2 py-3 text-sm">
                  id
                </TableHead>
                <TableHead className="text-white font-bold text-center border border-gray-300 px-2 py-3 text-sm">
                  Receipt
                </TableHead>
                <TableHead className="text-white font-bold text-center border border-gray-300 px-2 py-3 text-sm">
                  Date
                </TableHead>
                <TableHead className="text-white font-bold text-center border border-gray-300 px-2 py-3 text-sm">
                  Student
                </TableHead>
                <TableHead className="text-white font-bold text-center border border-gray-300 px-2 py-3 text-sm">
                  feefor
                </TableHead>
                <TableHead className="text-white font-bold text-center border border-gray-300 px-2 py-3 text-sm">
                  Totalfee
                </TableHead>
                <TableHead className="text-white font-bold text-center border border-gray-300 px-2 py-3 text-sm">
                  feepaid
                </TableHead>
                <TableHead className="text-white font-bold text-center border border-gray-300 px-2 py-3 text-sm">
                  freedue
                </TableHead>
                <TableHead className="text-white font-bold text-center border border-gray-300 px-2 py-3 text-sm">
                  other
                </TableHead>
                <TableHead className="text-white font-bold text-center border border-gray-300 px-2 py-3 text-sm">
                  frmid
                </TableHead>
                <TableHead className="text-white font-bold text-center border border-gray-300 px-2 py-3 text-sm">
                  frmname
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feesData.map((fee) => (
                <TableRow key={fee.id} className="hover:bg-gray-50">
                  <TableCell className="border border-gray-300 px-2 py-2 text-center text-sm">
                    <div className="flex gap-1 justify-center">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs px-2 py-1 h-6"
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs px-2 py-1 h-6"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="border border-gray-300 px-2 py-2 text-center text-sm">
                    {fee.id}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-2 py-2 text-center text-sm">
                    {fee.receipt}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-2 py-2 text-center text-sm">
                    {fee.date}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-2 py-2 text-center text-sm">
                    {fee.student}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-2 py-2 text-center text-sm">
                    {fee.feefor}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-2 py-2 text-center text-sm">
                    {fee.totalfee}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-2 py-2 text-center text-sm">
                    {fee.feepaid}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-2 py-2 text-center text-sm">
                    {fee.freedue}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-2 py-2 text-center text-sm">
                    {fee.other}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-2 py-2 text-center text-sm">
                    {fee.frmid}
                  </TableCell>
                  <TableCell className="border border-gray-300 px-2 py-2 text-center text-sm">
                    {fee.frmname}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default FeesReportContent;