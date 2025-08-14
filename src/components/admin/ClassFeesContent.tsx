import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ClassFeesContent = () => {
  const [courseType, setCourseType] = useState("Computer Courses");
  const [boardUniversity, setBoardUniversity] = useState("");
  const [courseName, setCourseName] = useState("");
  const [studentCV, setStudentCV] = useState("");
  const [duration, setDuration] = useState("");
  const [feesEntry, setFeesEntry] = useState("");

  const handleReset = () => {
    setCourseType("Computer Courses");
    setBoardUniversity("");
    setCourseName("");
    setStudentCV("");
    setDuration("");
    setFeesEntry("");
  };

  const handleInsertData = () => {
    console.log("Insert data clicked");
    // Add insert data logic here
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

      {/* Student Class Fees Header */}
      <div className="px-4 py-6">
        <div className="bg-gray-300 px-6 py-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Student Class Fees</h1>
        </div>

        {/* Main Content */}
        <div className="bg-gray-300 p-8 rounded max-w-4xl">
          <div className="space-y-6">
            {/* Course Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Type
              </label>
              <Select value={courseType} onValueChange={setCourseType}>
                <SelectTrigger className="w-full bg-white border border-gray-400 h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Computer Courses">Computer Courses</SelectItem>
                  <SelectItem value="Programming Courses">Programming Courses</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Board or University */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Board or University
              </label>
              <Input
                type="text"
                value={boardUniversity}
                onChange={(e) => setBoardUniversity(e.target.value)}
                className="w-full bg-white border border-gray-400 h-12 text-base"
              />
            </div>

            {/* Course Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Name
              </label>
              <Select value={courseName} onValueChange={setCourseName}>
                <SelectTrigger className="w-full bg-white border border-gray-400 h-12 text-base">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic-computer">Basic Computer Course</SelectItem>
                  <SelectItem value="advanced-computer">Advanced Computer Course</SelectItem>
                  <SelectItem value="programming">Programming Fundamentals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Student CV */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student CV
              </label>
              <Input
                type="text"
                value={studentCV}
                onChange={(e) => setStudentCV(e.target.value)}
                className="w-full bg-white border border-gray-400 h-12 text-base"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <Input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-white border border-gray-400 h-12 text-base"
              />
            </div>

            {/* Fees Entry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fees Entry
              </label>
              <Input
                type="text"
                value={feesEntry}
                onChange={(e) => setFeesEntry(e.target.value)}
                className="w-full bg-white border border-gray-400 h-12 text-base"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                onClick={handleInsertData}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 text-base"
              >
                Insert Data
              </Button>
              <Button 
                onClick={handleReset}
                variant="outline"
                className="bg-gray-500 hover:bg-gray-600 text-white border-gray-500 px-6 py-2 text-base"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassFeesContent;