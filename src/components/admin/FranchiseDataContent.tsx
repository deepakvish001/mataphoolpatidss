import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, Image } from "lucide-react";

const FranchiseDataContent = () => {
  const franchiseData = [
    {
      id: 1,
      title: "Fees chrt",
      details: "jk",
      date: "31/05/2018 00:00:00",
      category: "0",
      file: true
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Form Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title Of Data</label>
          <Input 
            type="text" 
            className="w-full border-2 border-gray-400"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Details of Data</label>
          <Textarea 
            className="w-full border-2 border-gray-400 h-24"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Details of Franchise</label>
          <Select>
            <SelectTrigger className="w-full border-2 border-gray-400">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
              <SelectItem value="franchise1">Franchise 1</SelectItem>
              <SelectItem value="franchise2">Franchise 2</SelectItem>
              <SelectItem value="franchise3">Franchise 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Documents</label>
          <Input 
            type="file" 
            className="w-full border-2 border-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Date of Publish</label>
          <Input 
            type="text" 
            className="w-full border-2 border-gray-400"
            placeholder=""
          />
        </div>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
          Submit Now
        </Button>
      </div>

      {/* Table Section */}
      <div className="mt-8">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-teal-700 text-white">
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Title</th>
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Details</th>
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Date</th>
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Category</th>
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold">File</th>
              </tr>
            </thead>
            <tbody>
              {franchiseData.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-400 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="p-1 h-auto">
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1 h-auto">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                      <span className="ml-2">{item.title}</span>
                    </div>
                  </td>
                  <td className="border border-gray-400 px-4 py-3">{item.details}</td>
                  <td className="border border-gray-400 px-4 py-3">{item.date}</td>
                  <td className="border border-gray-400 px-4 py-3">{item.category}</td>
                  <td className="border border-gray-400 px-4 py-3">
                    {item.file && (
                      <Image className="h-6 w-6 text-gray-500" />
                    )}
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

export default FranchiseDataContent;