import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const StudentRegPrintContent = () => {
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
      <div className="px-6 py-8 max-w-4xl mx-auto">
        <Card className="bg-white p-8 shadow-lg">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-pink-100 border-4 border-pink-300 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs font-bold text-pink-600">B SOFT</div>
                  <div className="text-xs text-pink-500">Computer & Technical</div>
                  <div className="text-xs text-pink-500">Institute</div>
                </div>
              </div>
            </div>

            {/* Institute Details */}
            <div className="flex-1 text-center px-8">
              <h1 className="text-2xl font-bold text-blue-600 mb-2">
                B SOFT Computer & Technical Institute
              </h1>
              <p className="text-sm text-gray-600 mb-1">
                Near Union Bank Of India Bina Soft Educational & Welfare Society Vill & Post BILARIYAGAN J, AZAMGARH-276121
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex-shrink-0 text-right">
              <p className="text-sm text-gray-600">infobinasoft@gmail.com</p>
            </div>
          </div>

          {/* Student Registration Print Form */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-lg font-bold text-center mb-8 underline">
              Student_Reg_Print
            </h2>

            <div className="grid grid-cols-2 gap-x-16 gap-y-6">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="flex items-center">
                  <label className="text-sm font-medium text-gray-700 w-32">Name :</label>
                  <div className="border-b border-gray-300 flex-1 h-6"></div>
                </div>

                <div className="flex items-center">
                  <label className="text-sm font-medium text-gray-700 w-32">Course Category :</label>
                  <div className="border-b border-gray-300 flex-1 h-6"></div>
                </div>

                <div className="flex items-center">
                  <label className="text-sm font-medium text-gray-700 w-32">Course Name :</label>
                  <div className="border-b border-gray-300 flex-1 h-6"></div>
                </div>

                <div className="flex items-center">
                  <label className="text-sm font-medium text-gray-700 w-32">Father's Name</label>
                  <div className="border-b border-gray-300 flex-1 h-6"></div>
                </div>

                <div className="flex items-center">
                  <label className="text-sm font-medium text-gray-700 w-32">Mother's Name</label>
                  <div className="border-b border-gray-300 flex-1 h-6"></div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="flex items-center">
                  <label className="text-sm font-medium text-gray-700 w-32">Study Center Code:</label>
                  <div className="border-b border-gray-300 flex-1 h-6"></div>
                </div>

                <div className="flex items-center">
                  <label className="text-sm font-medium text-gray-700 w-32">Date of Birth :</label>
                  <div className="border-b border-gray-300 flex-1 h-6"></div>
                </div>

                <div className="flex items-center">
                  <label className="text-sm font-medium text-gray-700 w-32">Mobile No. :</label>
                  <div className="border-b border-gray-300 flex-1 h-6"></div>
                </div>

                <div className="flex items-center">
                  <label className="text-sm font-medium text-gray-700 w-32">Student ID :</label>
                  <div className="border-b border-gray-300 flex-1 h-6"></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegPrintContent;