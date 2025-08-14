import { Button } from "@/components/ui/button";
import { Edit, Trash2, Download } from "lucide-react";

const FranchiseUploadContent = () => {
  const uploadData = [
    {
      id: 1,
      centerCode: "",
      message: "",
      date: "01/01/1900 00:00:00",
      downloadFile: "See"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-teal-700 text-white">
              <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Center Code</th>
              <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Message</th>
              <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Date</th>
              <th className="border border-gray-400 px-4 py-3 text-left font-semibold">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  DownloadFile
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {uploadData.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-400 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                    <span className="ml-2">Edit Delete</span>
                  </div>
                </td>
                <td className="border border-gray-400 px-4 py-3">{item.message}</td>
                <td className="border border-gray-400 px-4 py-3">{item.date}</td>
                <td className="border border-gray-400 px-4 py-3">
                  <Button variant="link" className="text-blue-600 p-0 h-auto">
                    {item.downloadFile}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FranchiseUploadContent;