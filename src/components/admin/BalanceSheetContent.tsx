import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BalanceSheetContent = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = () => {
    console.log("Search clicked", { startDate, endDate });
    // Add search logic here
  };

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

      {/* Balance Sheet Header */}
      <div className="px-4 py-6">
        <div className="bg-gray-300 px-6 py-4 mb-6">
          <h1 className="text-2xl font-bold text-green-600">Balance Sheet</h1>
        </div>

        {/* Filter Controls */}
        <div className="bg-gray-300 p-6 rounded mb-6">
          <div className="flex items-center gap-4">
            {/* Start Date */}
            <div>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Start Date"
                className="w-64 bg-white border border-gray-400 h-12 text-base"
              />
            </div>

            {/* End Date */}
            <div>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End Date"
                className="w-64 bg-white border border-gray-400 h-12 text-base"
              />
            </div>

            {/* Search Button */}
            <Button 
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 h-12 text-base font-medium"
            >
              search
            </Button>
          </div>
        </div>

        {/* Results Area - Empty for now */}
        <div className="bg-white rounded-lg shadow p-8 min-h-96">
          {/* This area would typically show the balance sheet data based on the search filters */}
          <div className="text-center text-gray-500 text-lg">
            No data found. Please select date range to view balance sheet.
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceSheetContent;