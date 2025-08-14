import { Checkbox } from "@/components/ui/checkbox";

const FranchiseApprovalContent = () => {
  const franchiseData = [
    {
      id: 1,
      approved: false,
      franchiseId: "SM11101",
      password: "58741",
      state: "Uttar Pradesh",
      district: "fdfsdf",
      address: "daligarij faizabad road",
      nameOfInstitute: "Bina Soft Educational and Welfare Society",
      establishment: "Bina Soft Educational and Welfare Society",
      postOffice: "332",
      pincode: "226020",
      postalAdd: "daligarij faizabad road",
      mobileNo: "+91+91727578196",
      dateReg: "",
      approvedStatus: ""
    },
    {
      id: 2,
      approved: false,
      franchiseId: "UP/AZAMGARH/A.SOFT/0002",
      password: "35352",
      state: "Uttar Pradesh",
      district: "Azamgarh",
      address: "AZAMGARH",
      nameOfInstitute: "A.SOFT COMPUTER INFO-TECH INSTITUTE",
      establishment: "2010",
      postOffice: "276138",
      pincode: "276138",
      postalAdd: "VILL & POST-MALTARI AZAMGARH (UP)",
      mobileNo: "+918115919153",
      dateReg: "",
      approvedStatus: ""
    },
    {
      id: 3,
      approved: false,
      franchiseId: "UP/AZAMGARH/A.SOFT/0003",
      password: "35353",
      state: "Uttar Pradesh",
      district: "Azamgarh",
      address: "AZAMGARH",
      nameOfInstitute: "A.SOFT COMPUTER INFO-TECH INSTITUTE",
      establishment: "2010",
      postOffice: "276138",
      pincode: "276138",
      postalAdd: "VILL & POST-MALTARI AZAMGARH (UP)",
      mobileNo: "+918115919153",
      dateReg: "",
      approvedStatus: ""
    },
    {
      id: 4,
      approved: false,
      franchiseId: "AMH/UP/A.SOFT/0004",
      password: "35354",
      state: "Uttar Pradesh",
      district: "Azamgarh",
      address: "AZAMGARH",
      nameOfInstitute: "A.SOFT COMPUTER INFO-TECH INSTITUTE",
      establishment: "2011",
      postOffice: "276138",
      pincode: "276138",
      postalAdd: "VILL,& POST-MALTARI AZAMGARH UP",
      mobileNo: "+918115919153, 9454868605",
      dateReg: "",
      approvedStatus: ""
    },
    {
      id: 5,
      approved: false,
      franchiseId: "AMH/UP/A.SOFT/0005",
      password: "35355",
      state: "Uttar Pradesh",
      district: "Azamgarh",
      address: "AZAMGARH",
      nameOfInstitute: "A.SOFT COMPUTER INFO-TECH INSTITUTE",
      establishment: "2011",
      postOffice: "276138",
      pincode: "276138",
      postalAdd: "VILL,& POST-MALTARI AZAMGARH UP",
      mobileNo: "+918115919153, 9454868605",
      dateReg: "",
      approvedStatus: ""
    },
    {
      id: 6,
      approved: false,
      franchiseId: "UP/AMH/A.soft/0006",
      password: "35356",
      state: "Uttar Pradesh",
      district: "Azamgarh",
      address: "Azamgarh",
      nameOfInstitute: "A.soft Computer Info-Tech Institute",
      establishment: "2011",
      postOffice: "276238",
      pincode: "276238",
      postalAdd: "Vill & Post ,- Maltari Azamgarh",
      mobileNo: "+918115919153 , 9454868605",
      dateReg: "",
      approvedStatus: ""
    },
    {
      id: 7,
      approved: true,
      franchiseId: "UP/AZM/B.Soft/0007",
      password: "35357",
      state: "Uttar Pradesh",
      district: "Azamgarh",
      address: "Jiyanpur",
      nameOfInstitute: "B.Soft Computer & Technical Institute",
      establishment: "B.Soft Computer & Technical Institute",
      postOffice: "276138",
      pincode: "276138",
      postalAdd: "Basupar Bankat Jiyanpur",
      mobileNo: "+91+91+91919795337194",
      dateReg: "",
      approvedStatus: ""
    },
    {
      id: 8,
      approved: false,
      franchiseId: "IxbfYeaa/lxbfYeaa/lxbfYeaa/0008",
      password: "35358",
      state: "0",
      district: "0",
      address: "San Francisco",
      nameOfInstitute: "lxbfYeaa",
      establishment: "Select One",
      postOffice: "94102",
      pincode: "94102",
      postalAdd: "3137 Laguna Street",
      mobileNo: "+91987-65-4329",
      dateReg: "",
      approvedStatus: ""
    },
    {
      id: 9,
      approved: false,
      franchiseId: "lxbfYeaa/lxbfYeaa/lxbfYeaa/0009",
      password: "35359",
      state: "0",
      district: "0",
      address: "San Francisco",
      nameOfInstitute: "lxbfYeaa",
      establishment: "Select One",
      postOffice: "94102",
      pincode: "94102",
      postalAdd: "3137 Laguna Street",
      mobileNo: "+91987-65-4329",
      dateReg: "",
      approvedStatus: ""
    },
    {
      id: 10,
      approved: false,
      franchiseId: "lxbfYeaa/lxbfYeaa/lxbfYeaa/00010",
      password: "353510",
      state: "0",
      district: "0",
      address: "San Francisco",
      nameOfInstitute: "lxbfYeaa",
      establishment: "Select One",
      postOffice: "94102",
      pincode: "94102",
      postalAdd: "3137 Laguna Street",
      mobileNo: "+91987-65-4329",
      dateReg: "",
      approvedStatus: ""
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Management of Franchise</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-2 border-gray-400">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[80px]">Approved</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[200px]">Franchise_id</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[100px]">Password</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[100px]">State</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[100px]">District</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[120px]">Address</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[200px]">Name of Institute</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[150px]">Estibilishment</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[100px]">Post Office</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[100px]">Pincode</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[150px]">Postal Add</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[150px]">Mobile No.</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[100px]">Date_Reg</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[100px]">Approved</th>
            </tr>
          </thead>
          <tbody>
            {franchiseData.map((franchise, index) => (
              <tr key={franchise.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border-2 border-gray-400 px-2 py-3 text-center">
                  <Checkbox checked={franchise.approved} />
                </td>
                <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.franchiseId}</td>
                <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.password}</td>
                <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.state}</td>
                <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.district}</td>
                <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.address}</td>
                <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.nameOfInstitute}</td>
                <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.establishment}</td>
                <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.postOffice}</td>
                <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.pincode}</td>
                <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.postalAdd}</td>
                <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.mobileNo}</td>
                <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.dateReg}</td>
                <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.approvedStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-muted-foreground">
        12345678910...
      </div>
    </div>
  );
};

export default FranchiseApprovalContent;