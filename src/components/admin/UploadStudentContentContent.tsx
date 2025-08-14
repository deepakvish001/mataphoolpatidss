import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const UploadStudentContentContent = () => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    file: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({ ...prev, file }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.date) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Success",
      description: "Student content uploaded successfully!",
      variant: "default"
    });

    // Reset form
    setFormData({
      title: "",
      date: "",
      file: null
    });
  };

  return (
    <div className="w-full max-w-none bg-gray-200 min-h-screen">
      {/* Header */}
      <div className="bg-gray-400 px-6 py-4 border-b border-gray-500">
        <h1 className="text-xl font-medium text-gray-800">Upload Student Content</h1>
      </div>

      {/* Form Container */}
      <div className="px-8 py-12 max-w-2xl">
        
        {/* Enter Title */}
        <div className="mb-8">
          <Input
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full h-14 border-2 border-gray-500 bg-white text-base px-4"
            placeholder="Enter Title"
          />
        </div>

        {/* Date */}
        <div className="mb-12">
          <Input
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className="w-full h-14 border-2 border-gray-500 bg-white text-base px-4"
            placeholder="Date"
          />
        </div>

        {/* File Upload */}
        <div className="mb-12">
          <div className="mb-4">
            <label className="text-base font-medium text-gray-700">File Upload</label>
          </div>
          <div className="border-2 border-gray-500 bg-white flex h-14">
            <label className="bg-gray-100 hover:bg-gray-200 border-r-2 border-gray-500 px-4 py-3 cursor-pointer text-base font-medium text-gray-700 flex items-center">
              Choose file
              <input
                type="file"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
            <span className="px-4 py-3 text-gray-500 text-base flex-1 flex items-center">
              {formData.file ? formData.file.name : "No file chosen"}
            </span>
          </div>
        </div>

        {/* Register Button */}
        <div className="text-center">
          <Button 
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 text-base rounded-none"
          >
            REGISTER NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadStudentContentContent;