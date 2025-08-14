import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const GenerateFranchiseCertificateContent = () => {
  return (
    <div className="p-6 bg-white">
      {/* Header Section */}
      <div className="mb-6">
        <p className="text-blue-600 text-lg mb-4">Home</p>
        
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Franchise ID</p>
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

      {/* Separator Line */}
      <div className="border-t border-gray-400 mb-8"></div>

      {/* Certificate Template */}
      <div className="text-center space-y-6 mt-16">
        <h2 className="text-2xl font-bold text-brown-800" style={{ color: '#8B4513' }}>
          This is to certify that
        </h2>
        
        <div className="space-y-4 text-xl font-semibold text-brown-800" style={{ color: '#8B4513' }}>
          <p>has been appointed as franchise by</p>
          <p className="text-2xl">Takniki Vikas Prashishan Sansthan</p>
          
          <div className="flex justify-center items-center gap-4">
            <span>From</span>
            <span className="border-b border-gray-600 w-24 inline-block"></span>
            <span>to</span>
            <span className="border-b border-gray-600 w-24 inline-block"></span>
            <span>for</span>
          </div>
          
          <p>operating</p>
          
          <div className="flex justify-center items-center gap-4">
            <span>in</span>
            <span className="border-b border-gray-600 w-32 inline-block"></span>
            <span>area, Located at</span>
          </div>
          
          <div className="mt-12">
            <p className="text-lg">Authoried Registration No. :-</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateFranchiseCertificateContent;