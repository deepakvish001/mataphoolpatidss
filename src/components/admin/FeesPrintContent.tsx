import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FeesPrintContent = () => {
  const [searchValue, setSearchValue] = useState("");

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleSubmit = () => {
    console.log("Submit clicked");
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
            <Button 
              onClick={handleSubmit}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 text-sm border border-gray-300"
            >
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
        <div className="bg-white p-8 border shadow-lg">
          
          {/* Header Section with Logo */}
          <div className="flex items-start justify-between mb-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 border-4 border-pink-700 flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <div className="text-sm font-bold text-white leading-tight">B.Soft</div>
                  <div className="text-xs text-white leading-none">Computer &</div>
                  <div className="text-xs text-white leading-none">Technical</div>
                  <div className="text-xs text-white leading-none">Institute</div>
                </div>
              </div>
            </div>

            {/* Institute Header */}
            <div className="flex-1 text-center ml-8">
              <h1 className="text-3xl font-bold text-blue-600 mb-4 tracking-wider">
                B. Soft Computer & Technical Institute
              </h1>
              <div className="text-sm text-gray-700 mb-2">
                Near Union Bank Of India Bina Soft Educational & Welfare Society Vill & Post BILARIYAGAN J, AZAMGARH-276121
              </div>
              <div className="text-sm text-gray-700 mb-8">
                infobinasoft@gmail.com
              </div>
            </div>
          </div>

          {/* Receipt Title */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-gray-800 underline">
              Student Fee Receipt
            </h2>
          </div>

          {/* Receipt Details */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="flex">
                <span className="font-medium text-gray-700 w-24">Receipt ID:</span>
                <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-700 w-24">Name:</span>
                <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-700 w-24">Course:</span>
                <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
              </div>
              <div className="flex">
                <span className="font-medium text-gray-700 w-24">Student ID:</span>
                <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="flex">
                <span className="font-medium text-gray-700 w-16">Date:</span>
                <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
              </div>
            </div>
          </div>

          {/* Fee Details */}
          <div className="space-y-4 mb-12">
            <div className="flex">
              <span className="font-medium text-gray-700 w-24">Total fee:</span>
              <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-700 w-24">Fee Paid:</span>
              <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-700 w-24">Fee Due:</span>
              <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
            </div>
          </div>

          {/* Office Sign */}
          <div className="flex">
            <span className="font-medium text-gray-700 w-24">Office sign:</span>
            <span className="border-b border-gray-400 flex-1 min-h-[1.5rem]"></span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FeesPrintContent;