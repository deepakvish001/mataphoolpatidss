import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2 } from "lucide-react";

const MakeFranchiseCertificateContent = () => {
  const certificateData = [
    {
      id: 1,
      centerName: "s tech",
      formDate: "01/03/2020",
      toDate: "05/03/2020",
      cityName: "Lucknow",
      centerId: "up/lok/st/0001",
      area: "up",
      operating: "Computer"
    },
    {
      id: 2,
      centerName: "Bina Soft Educational and Welfare Society",
      formDate: "30/12/2020",
      toDate: "30/12/2020",
      cityName: "azamgarh",
      centerId: "SM11101",
      area: "bilariyaganj",
      operating: "22/12/2020"
    },
    {
      id: 3,
      centerName: "B.Soft Computer & Technical Institute",
      formDate: "01/01/2018",
      toDate: "01/01/2025",
      cityName: "Azamgarh",
      centerId: "UP/AZM/B.Soft/0007",
      area: "Jiyanpur",
      operating: ""
    },
    {
      id: 4,
      centerName: "Bright Soft Computer Institute",
      formDate: "25/12/2024",
      toDate: "25/12/2030",
      cityName: "Azamgarh",
      centerId: "UP/Azm/B.Soft /000220",
      area: "Bilariyaganj",
      operating: ""
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gray-300 p-4 rounded">
        <h2 className="text-lg font-semibold text-gray-800">Make Franchise Certificate</h2>
      </div>

      {/* Form Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Franchise Institute Name</label>
          <Select>
            <SelectTrigger className="w-full border-2 border-gray-400">
              <SelectValue placeholder="-----Select Study Center------" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
              <SelectItem value="center1">Study Center 1</SelectItem>
              <SelectItem value="center2">Study Center 2</SelectItem>
              <SelectItem value="center3">Study Center 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Date From</label>
          <Input 
            type="text" 
            className="w-full border-2 border-gray-400"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Date To</label>
          <Input 
            type="text" 
            className="w-full border-2 border-gray-400"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">City Name</label>
          <Input 
            type="text" 
            className="w-full border-2 border-gray-400"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Area</label>
          <Input 
            type="text" 
            className="w-full border-2 border-gray-400"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Franchise ID</label>
          <Input 
            type="text" 
            className="w-full border-2 border-gray-400"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">For Operating</label>
          <Input 
            type="text" 
            className="w-full border-2 border-gray-400"
            placeholder=""
          />
        </div>

        <div className="text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 border-2 border-blue-800">
            Submit Now
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-8">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Center_Name</th>
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Form_Date</th>
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold">To_Date</th>
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold">City_Name</th>
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Center_ID</th>
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Area</th>
                <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Operating</th>
              </tr>
            </thead>
            <tbody>
              {certificateData.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-400 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="p-1 h-auto">
                        <Edit className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-1 h-auto">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                      <span className="ml-2">{item.centerName}</span>
                    </div>
                  </td>
                  <td className="border border-gray-400 px-4 py-3">{item.formDate}</td>
                  <td className="border border-gray-400 px-4 py-3">{item.toDate}</td>
                  <td className="border border-gray-400 px-4 py-3">{item.cityName}</td>
                  <td className="border border-gray-400 px-4 py-3">{item.centerId}</td>
                  <td className="border border-gray-400 px-4 py-3">{item.area}</td>
                  <td className="border border-gray-400 px-4 py-3">{item.operating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MakeFranchiseCertificateContent;