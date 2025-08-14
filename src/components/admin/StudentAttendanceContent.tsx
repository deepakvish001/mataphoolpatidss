import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const StudentAttendanceContent = () => {
  const [selectedFranchise, setSelectedFranchise] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

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

      {/* All Students Header */}
      <div className="px-4 py-6">
        <div className="bg-gray-300 px-6 py-4 mb-6">
          <h1 className="text-2xl font-bold text-green-600">All Students</h1>
        </div>

        {/* Main Content */}
        <div className="bg-gray-300 p-8 rounded">
          {/* Filter Controls */}
          <div className="flex items-center justify-center gap-6 mb-8">
            {/* Select Franchise ID */}
            <div className="min-w-64">
              <Select value={selectedFranchise} onValueChange={setSelectedFranchise}>
                <SelectTrigger className="w-full bg-white border border-gray-400 h-12 text-base">
                  <SelectValue placeholder="Select Franchise ID" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="franchise1">Franchise 001</SelectItem>
                  <SelectItem value="franchise2">Franchise 002</SelectItem>
                  <SelectItem value="franchise3">Franchise 003</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Select Course */}
            <div className="min-w-64">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full bg-white border border-gray-400 h-12 text-base">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="course1">Computer Basics</SelectItem>
                  <SelectItem value="course2">Advanced Computer Course</SelectItem>
                  <SelectItem value="course3">Programming Fundamentals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 h-12 text-base font-medium">
              search
            </Button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-3 h-12 text-base font-medium">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceContent;