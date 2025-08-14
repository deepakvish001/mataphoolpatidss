import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

const FranchiseManagementContent = () => {
  const franchiseData = [
    {
      sNo: 1,
      franchiseId: "SM11101",
      password: "58741",
      centerName: "Bina Soft Educational and Welfare Society",
      mobile: "+91+91727578196",
      email: "astronomer.ravi@gmail.com",
      centerHead: "Ravi Kumar"
    },
    {
      sNo: 2,
      franchiseId: "UP/AZAMGARH/A.SOFT/0002",
      password: "35352",
      centerName: "A.SOFT COMPUTER INFO-TECH INSTITUTE",
      mobile: "+918115919153",
      email: "asoftzone23@gmail.com",
      centerHead: "MOHD ATIF"
    },
    {
      sNo: 3,
      franchiseId: "UP/AZAMGARH/A.SOFT/0003",
      password: "35353",
      centerName: "A.SOFT COMPUTER INFO-TECH INSTITUTE",
      mobile: "+918115919153",
      email: "asoftzone23@gmail.com",
      centerHead: "MOHD ATIF"
    },
    {
      sNo: 4,
      franchiseId: "AMH/UP/A.SOFT/0004",
      password: "35354",
      centerName: "A.SOFT COMPUTER INFO-TECH INSTITUTE",
      mobile: "+918115919153, 9454868605",
      email: "asoftzone23@gmail.com",
      centerHead: "MOHD ATIF"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">Total record found - Label</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-2 border-gray-400">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border-2 border-gray-400 px-4 py-3 text-left font-semibold min-w-[80px]">S.No</th>
              <th className="border-2 border-gray-400 px-4 py-3 text-left font-semibold min-w-[80px]">Edit</th>
              <th className="border-2 border-gray-400 px-4 py-3 text-left font-semibold min-w-[200px]">Franchise_ID</th>
              <th className="border-2 border-gray-400 px-4 py-3 text-left font-semibold min-w-[150px]">Franchise_Password</th>
              <th className="border-2 border-gray-400 px-4 py-3 text-left font-semibold min-w-[250px]">Center_Name</th>
              <th className="border-2 border-gray-400 px-4 py-3 text-left font-semibold min-w-[180px]">Mobile_Number</th>
              <th className="border-2 border-gray-400 px-4 py-3 text-left font-semibold min-w-[200px]">Email_ID</th>
              <th className="border-2 border-gray-400 px-4 py-3 text-left font-semibold min-w-[200px]">Name_Of_Center_Head</th>
            </tr>
          </thead>
          <tbody>
            {franchiseData.map((franchise, index) => (
              <tr key={franchise.sNo} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border-2 border-gray-400 px-4 py-3 font-medium">{franchise.sNo}</td>
                <td className="border-2 border-gray-400 px-4 py-3">
                  <Button variant="ghost" size="sm" className="p-1 h-auto">
                    <Edit className="h-4 w-4 text-green-600" />
                  </Button>
                </td>
                <td className="border-2 border-gray-400 px-4 py-3 font-medium">{franchise.franchiseId}</td>
                <td className="border-2 border-gray-400 px-4 py-3 font-medium">{franchise.password}</td>
                <td className="border-2 border-gray-400 px-4 py-3 font-medium">{franchise.centerName}</td>
                <td className="border-2 border-gray-400 px-4 py-3 font-medium">{franchise.mobile}</td>
                <td className="border-2 border-gray-400 px-4 py-3 font-medium">{franchise.email}</td>
                <td className="border-2 border-gray-400 px-4 py-3 font-medium">{franchise.centerHead}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FranchiseManagementContent;