import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const GenerateStudentAdmitCardContent = () => {
  const [searchValue, setSearchValue] = useState("");

  const handlePrintReceipt = () => {
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
            <span className="text-gray-700 font-medium">Students List</span>
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-40 h-8 border border-gray-300"
              placeholder=""
            />
            <Button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 text-sm border border-gray-300">
              Submit
            </Button>
          </div>
        </div>
        <Button 
          onClick={handlePrintReceipt}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
        >
          Print Receipt
        </Button>
      </div>

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
              B. Soft Computer & Technical Institute ' ' EXAMINATION
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
                      <td className="border border-gray-800 px-3 py-3"></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                        NAME
                      </td>
                      <td className="border border-gray-800 px-3 py-3"></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                        MOTHER'S NAME
                      </td>
                      <td className="border border-gray-800 px-3 py-3"></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                        FATHER'S NAME
                      </td>
                      <td className="border border-gray-800 px-3 py-3"></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                        EXAM CENTER CODE
                      </td>
                      <td className="border border-gray-800 px-3 py-3"></td>
                    </tr>
                    <tr>
                      <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm">
                        PWD :
                      </td>
                      <td className="border border-gray-800 px-3 py-3"></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Right side - Photo placeholder */}
              <div className="w-32">
                <div className="border-2 border-gray-800 h-40 bg-gray-50 flex items-center justify-center">
                  <div className="w-4 h-4 border border-gray-400"></div>
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
                  <td className="border border-gray-800 px-3 py-3"></td>
                  <td className="border border-gray-800 px-3 py-3"></td>
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
                  <td className="border border-gray-800 px-3 py-3"></td>
                  <td className="border border-gray-800 px-3 py-3"></td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm" colSpan={2}>
                    REPORTING TIME :
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-3" colSpan={2}></td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm" colSpan={2}>
                    GATE CLOSING TIME :
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-4 text-sm" colSpan={2}>
                    No candidate will be allowed to enter the examination center after the gate closing time.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm" colSpan={2}>
                    EXAM START TIME:
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-3" colSpan={2}></td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-2 bg-gray-100 font-medium text-sm" colSpan={2}>
                    EXAM DURATION :
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 px-3 py-3" colSpan={2}></td>
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