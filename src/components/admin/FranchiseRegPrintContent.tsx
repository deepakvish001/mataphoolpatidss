import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FranchiseRegPrintContent = () => {
  return (
    <div className="p-6 bg-white">
      {/* Header Section */}
      <div className="mb-4">
        <p className="text-blue-600 text-lg mb-4">Home</p>
        
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Franchise List</p>
          <div className="flex gap-2 items-center mb-4">
            <Input 
              type="text" 
              className="w-48 border border-gray-400"
              placeholder=""
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm">
              Submit
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2">
            Print Receipt
          </Button>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="border border-gray-300 p-6">
        {/* Header with Logo and Institute Info */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-pink-100 border-4 border-pink-500 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs font-bold text-pink-700">B.Soft</div>
              </div>
            </div>
          </div>
          
          <div className="text-center flex-1">
            <h2 className="text-xl font-bold text-blue-600 mb-2">B. Soft Computer & Technical Institute</h2>
            <p className="text-sm text-blue-500 mb-1">
              Near Union Bank Of India Bina Soft Educational & Welfare Society Vill & Post BILARIYAGAN J, AZAMGARH-276121
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm">infobinasoft@gmail.com</p>
          </div>
        </div>

        {/* Franchise Registration Print Form */}
        <div className="text-center mb-6">
          <h3 className="text-lg font-bold underline">Franchise_Reg_Print</h3>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex">
            <span className="font-medium w-48">State Name:</span>
            <span className="border-b border-gray-400 flex-1 min-h-[20px]"></span>
          </div>
          
          <div className="flex">
            <span className="font-medium w-48">City / Town / Village:</span>
            <span className="border-b border-gray-400 flex-1 min-h-[20px]"></span>
          </div>
          
          <div className="flex">
            <span className="font-medium w-48">District Name:</span>
            <span className="border-b border-gray-400 flex-1 min-h-[20px]"></span>
          </div>
          
          <div className="flex">
            <span className="font-medium w-48">Date.Of.Registration:</span>
            <span className="border-b border-gray-400 flex-1 min-h-[20px]"></span>
          </div>
          
          <div className="flex">
            <span className="font-medium w-48">Name of the Institute:</span>
            <span className="border-b border-gray-400 flex-1 min-h-[20px]"></span>
          </div>
          
          <div className="flex">
            <span className="font-medium w-48">Year of Establishment:</span>
            <span className="border-b border-gray-400 flex-1 min-h-[20px]"></span>
          </div>
          
          <div className="flex">
            <span className="font-medium w-48">Pin Code:</span>
            <span className="border-b border-gray-400 flex-1 min-h-[20px]"></span>
          </div>
          
          <div className="flex">
            <span className="font-medium w-48">Postal Address of the Institute:</span>
            <span className="border-b border-gray-400 flex-1 min-h-[20px]"></span>
          </div>
          
          <div className="flex">
            <span className="font-medium w-48">Phone1:</span>
            <span className="border-b border-gray-400 flex-1 min-h-[20px]"></span>
          </div>
          
          <div className="flex">
            <span className="font-medium w-48">Email Address:</span>
            <span className="border-b border-gray-400 flex-1 min-h-[20px]"></span>
          </div>
          
          <div className="flex">
            <span className="font-medium w-48">Name of the Centre Head:</span>
            <span className="border-b border-gray-400 flex-1 min-h-[20px]"></span>
          </div>
          
          <div className="flex">
            <span className="font-medium w-48">Designing / Position Hold:</span>
            <span className="border-b border-gray-400 flex-1 min-h-[20px]"></span>
          </div>
          
          <div className="mt-6 space-y-2">
            <div>
              <span className="font-medium">Franchise ID</span>
            </div>
            <div>
              <span className="font-medium">Franchise Password</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FranchiseRegPrintContent;