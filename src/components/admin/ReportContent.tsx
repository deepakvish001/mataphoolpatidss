import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const ReportContent = () => {
  const { toast } = useToast();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (!searchValue.trim()) {
      toast({
        title: "Error",
        description: "Please enter search criteria",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Search",
      description: `Searching for: ${searchValue}`,
      variant: "default"
    });
  };

  return (
    <div className="w-full max-w-none bg-gray-200 min-h-screen">
      {/* Header */}
      <div className="bg-gray-400 px-6 py-4 border-b border-gray-500">
        <h1 className="text-xl font-medium text-gray-800">Certificate & Marksheet</h1>
      </div>

      {/* Search Container */}
      <div className="px-8 py-6">
        <div className="flex gap-4 items-center">
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-96 h-12 border-2 border-gray-400 bg-white"
            placeholder=""
          />
          <Button 
            onClick={handleSearch}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium px-6 py-3 h-12 border border-gray-500"
          >
            Search Now
          </Button>
        </div>
      </div>

      {/* Empty Content Area */}
      <div className="px-8 pb-6">
        <div className="bg-white min-h-96 border-2 border-gray-300">
          {/* Empty space for search results */}
        </div>
      </div>
    </div>
  );
};

export default ReportContent;