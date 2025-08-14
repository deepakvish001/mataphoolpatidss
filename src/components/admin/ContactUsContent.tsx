import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone } from "lucide-react";

const ContactUsContent = () => {
  return (
    <div className="space-y-8">
      {/* My All Contacts Header */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-8 border-b border-gray-100 bg-gray-400">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center space-x-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <span>My All Contacts</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-8 min-h-[400px] bg-gray-100">
          {/* Empty content area matching the screenshot */}
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            {/* This area is intentionally empty to match the screenshot */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactUsContent;