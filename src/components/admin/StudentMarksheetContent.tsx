import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const StudentMarksheetContent = () => {
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
      <div className="px-4 py-6 max-w-6xl mx-auto">
        <div className="bg-gray-300 p-6 border-2 border-gray-600 shadow-xl">
          
          {/* Header Section with Logo */}
          <div className="flex items-start justify-between mb-8">
            <div className="text-left">
              <div className="font-bold text-black text-base">Enroll. Number</div>
              <div className="border-b-2 border-black w-40 h-6 mt-2"></div>
            </div>
            
            {/* Center Logo */}
            <div className="flex-shrink-0 mx-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 border-4 border-pink-700 flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <div className="text-xs font-bold text-white leading-tight">B SOFT</div>
                  <div className="text-xs text-white leading-none">Computer &</div>
                  <div className="text-xs text-white leading-none">Technical</div>
                  <div className="text-xs text-white leading-none">Institute</div>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-bold text-black text-base">Sl. No.</div>
              <div className="border-b-2 border-black w-40 h-6 mt-2"></div>
            </div>
          </div>

          {/* Institute Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-700 mb-4 tracking-wider">
              B.SOFT COMPUTER & TECHNICAL INSTITUTE
            </h1>
            <div className="text-sm text-black mb-2 leading-tight">
              <span className="font-medium">Registered NGO DARPAN ID AAYOGRegd. No. </span>
              <span className="text-red-600 font-bold">UP/2011/0044943</span>
            </div>
            <div className="text-sm text-black mb-2 leading-tight">
              <span className="font-medium">Regd. with : Society Regd. No. : </span>
              <span className="text-red-600 font-bold">AZ-13610</span>
            </div>
            <div className="text-sm text-black mb-6 leading-tight">
              <span className="font-medium">ISO 9001:2015 CERTIFIED/No.- </span>
              <span className="text-red-600 font-bold">UQ-252016790</span>
            </div>
            <div className="text-pink-600 font-bold text-lg mb-12 tracking-wide">
              (AwardedtoUndertheManagement)
            </div>
          </div>

          {/* Photo placeholder positioned on right */}
          <div className="flex justify-end mb-8">
            <div className="w-24 h-32 border-2 border-black bg-white flex items-center justify-center">
              <div className="w-5 h-5 border border-gray-500"></div>
            </div>
          </div>

          {/* Certificate Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-red-600 tracking-wider">
              CERTIFICATE-CUM-MARKS SHEET
            </h2>
          </div>

          {/* Certificate Text */}
          <div className="mb-8 text-sm leading-relaxed">
            <p className="mb-3">
              This is to certify that according to organization{" "}
              <span className="border-b-2 border-black inline-block w-40 h-4 align-bottom"></span>
            </p>
            <p className="mb-3">
              Son/Daughter of Mr. and Mrs.{" "}
              <span className="border-b-2 border-black inline-block w-40 h-4 align-bottom"></span>
            </p>
            <p className="mb-3">has passed one year Course examination held in</p>
            <p className="mb-3">from</p>
            <p className="mb-6">Center Code: . His/Her grading in Individual Papers are given below.</p>
          </div>

          {/* Grades Awarded Table */}
          <div className="mb-8">
            <div className="text-center mb-4">
              <h3 className="text-blue-700 font-bold text-xl tracking-wider">GRADES AWARDED</h3>
            </div>
            
            <table className="w-full border-2 border-black border-collapse bg-white text-sm">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border-2 border-black px-3 py-2 font-bold text-center">Subjects</th>
                  <th className="border-2 border-black px-3 py-2 font-bold text-center">Max.Theory Marks</th>
                  <th className="border-2 border-black px-3 py-2 font-bold text-center">Max.Practical Marks</th>
                  <th className="border-2 border-black px-3 py-2 font-bold text-center">Obtain Theory Marks.</th>
                  <th className="border-2 border-black px-3 py-2 font-bold text-center">Obtain Practical Marks.</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border-2 border-black px-3 py-2 font-bold text-center">Total</td>
                  <td className="border-2 border-black px-3 py-2 text-center">0</td>
                  <td className="border-2 border-black px-3 py-2 text-center">0</td>
                  <td className="border-2 border-black px-3 py-2 text-center">0</td>
                  <td className="border-2 border-black px-3 py-2 text-center">0</td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border-2 border-black px-3 py-2 font-bold text-center">Grand Total</td>
                  <td className="border-2 border-black px-3 py-2 text-center">0</td>
                  <td className="border-2 border-black px-3 py-2 text-center"></td>
                  <td className="border-2 border-black px-3 py-2 text-center">0</td>
                  <td className="border-2 border-black px-3 py-2 text-center"></td>
                </tr>
                <tr className="bg-white">
                  <td className="border-2 border-black px-3 py-2 font-bold text-center">Percentage (%)</td>
                  <td className="border-2 border-black px-3 py-2 text-center">
                    <span className="text-red-600 font-bold">0 %</span>
                  </td>
                  <td className="border-2 border-black px-3 py-2 text-center"></td>
                  <td className="border-2 border-black px-3 py-2 text-center"></td>
                  <td className="border-2 border-black px-3 py-2 text-center"></td>
                </tr>
                <tr className="bg-gray-100">
                  <td className="border-2 border-black px-3 py-2 font-bold text-center">Grade</td>
                  <td className="border-2 border-black px-3 py-2 text-center"></td>
                  <td className="border-2 border-black px-3 py-2 text-center"></td>
                  <td className="border-2 border-black px-3 py-2 text-center"></td>
                  <td className="border-2 border-black px-3 py-2 text-center"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Legend of Grades and Signature Section */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <div className="font-bold text-sm mb-3">LEGEND OF GRADES</div>
              <div className="text-sm leading-relaxed">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div>S : 85% & Above</div>
                  <div>A : 75%-84%</div>
                  <div>C : 55%-64%</div>
                  <div>D : 50%-54%</div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
                  <div>B : 65%-74%</div>
                  <div></div>
                  <div>F : Less than 50% - Fail</div>
                  <div></div>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="w-24 h-16 border-2 border-black bg-white ml-auto mb-2 flex items-center justify-center">
                <div className="w-5 h-5 border border-gray-500"></div>
              </div>
              <div className="font-bold text-sm">Digitally signed by</div>
              <div className="border-b-2 border-black w-32 h-4 ml-auto mt-1"></div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="grid grid-cols-3 gap-8 mb-6">
            <div>
              <div className="font-bold text-sm mb-2">Issue Date :</div>
              <div className="border-b-2 border-black w-full h-5"></div>
            </div>
            <div>
              <div className="font-bold text-sm mb-2">Place :</div>
              <div className="border-b-2 border-black w-full h-5"></div>
            </div>
            <div className="text-center">
              <div className="font-bold text-sm">SECRETARY/DIRECTOR</div>
            </div>
          </div>

          {/* Verification Link */}
          <div className="text-center text-sm mb-4 leading-tight">
            <span className="font-medium">This Diploma may be Verified at </span>
            <span className="text-blue-700 underline font-medium">www.binasoftedu.org.in</span>
            <span className="font-medium"> using the diploma holder's enrollment number</span>
          </div>

          {/* Head Office Address */}
          <div className="text-center text-sm leading-tight">
            <div className="font-bold">Head Office Address - Near Union Bank Of India Bina Soft Educational & Welfare Society Vill & Post BILARIYAGAN J, AZAMGARH-276121</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMarksheetContent;