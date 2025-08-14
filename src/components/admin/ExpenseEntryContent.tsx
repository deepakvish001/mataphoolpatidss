import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ExpenseEntryContent = () => {
  const [serviceName, setServiceName] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [givenTo, setGivenTo] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [expenseData] = useState([
    {
      id: 1,
      serviceName: "Petrol",
      expenseName: "NA",
      quantity: "2",
      givenTo: "200",
      description: "NA",
      date: "2020-02-03"
    },
    {
      id: 2,
      serviceName: "NA",
      expenseName: "book",
      quantity: "10",
      givenTo: "12500",
      description: "NA",
      date: "2020-01-02"
    },
    {
      id: 3,
      serviceName: "tea",
      expenseName: "client visit",
      quantity: "2",
      givenTo: "200",
      description: "web meeting",
      date: "06/12/2020"
    },
    {
      id: 4,
      serviceName: "Petrol",
      expenseName: "alok",
      quantity: "1L",
      givenTo: "HI",
      description: "N/A",
      date: "29/12/2020"
    }
  ]);

  const handleSubmit = () => {
    console.log("Submit clicked", { 
      serviceName, 
      expenseName, 
      quantity, 
      givenTo, 
      description, 
      date 
    });
    // Add submit logic here
  };

  const handleReset = () => {
    setServiceName("");
    setExpenseName("");
    setQuantity("");
    setGivenTo("");
    setDescription("");
    setDate("");
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
          <h1 className="text-2xl font-bold text-green-600">Expense Entry</h1>
        </div>

        {/* Form */}
        <div className="bg-gray-200 p-8 rounded max-w-4xl mb-8">
          <div className="space-y-6">
            {/* Service Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Name *
              </label>
              <Select value={serviceName} onValueChange={setServiceName}>
                <SelectTrigger className="w-full bg-white border border-gray-400 h-12 text-base">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="tea">Tea</SelectItem>
                  <SelectItem value="office-supplies">Office Supplies</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Expense Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expense Name *
              </label>
              <Input
                type="text"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                className="w-full bg-white border border-gray-400 h-12 text-base"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <Input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-white border border-gray-400 h-12 text-base"
              />
            </div>

            {/* Given To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Given To *
              </label>
              <Input
                type="text"
                value={givenTo}
                onChange={(e) => setGivenTo(e.target.value)}
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
                className="w-full bg-white border border-gray-400 min-h-[100px] text-base"
                rows={4}
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

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500">
                <th className="text-white font-bold text-center px-4 py-4 text-base border border-gray-300">
                  Service Name
                </th>
                <th className="text-white font-bold text-center px-4 py-4 text-base border border-gray-300">
                  Expense Name
                </th>
                <th className="text-white font-bold text-center px-4 py-4 text-base border border-gray-300">
                  Quantity
                </th>
                <th className="text-white font-bold text-center px-4 py-4 text-base border border-gray-300">
                  Given To
                </th>
                <th className="text-white font-bold text-center px-4 py-4 text-base border border-gray-300">
                  Description
                </th>
                <th className="text-white font-bold text-center px-4 py-4 text-base border border-gray-300">
                  date
                </th>
              </tr>
            </thead>
            <tbody>
              {expenseData.map((expense, index) => (
                <tr key={expense.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-4 py-3 text-center text-base">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="link" 
                          className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal text-sm"
                        >
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="link" 
                          className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal text-sm"
                        >
                          Delete
                        </Button>
                      </div>
                      <span className="font-medium">{expense.serviceName}</span>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-base">
                    {expense.expenseName}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-base">
                    {expense.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-base">
                    {expense.givenTo}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-base">
                    {expense.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center text-base">
                    {expense.date}
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

export default ExpenseEntryContent;