import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const OpeningBalanceContent = () => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log("Submit clicked", { amount, date, description });
    // Add submit logic here
  };

  const handleReset = () => {
    setAmount("");
    setDate("");
    setDescription("");
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

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-green-600">Opening Balance</h1>
        </div>

        {/* Form */}
        <div className="bg-gray-200 p-8 rounded max-w-4xl">
          <div className="space-y-6">
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount *
              </label>
              <Input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-white border border-gray-400 h-12 text-base"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white border border-gray-400 h-12 text-base"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-white border border-gray-400 min-h-[150px] text-base"
                rows={6}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Button 
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base font-medium"
              >
                SUBMIT
              </Button>
              <Button 
                onClick={handleReset}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base font-medium"
              >
                RESET
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningBalanceContent;