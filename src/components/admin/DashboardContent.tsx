import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const DashboardContent = () => {
  const statCards = [{
    title: "Franchise Panel",
    percentage: "79%",
    color: "bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600",
    textColor: "text-white",
    shadowColor: "shadow-blue-500/20"
  }, {
    title: "Faculty Panel",
    percentage: "98%",
    color: "bg-gradient-to-br from-red-500 via-red-600 to-red-700",
    textColor: "text-white",
    shadowColor: "shadow-red-500/20"
  }, {
    title: "Students Panel",
    percentage: "94%",
    color: "bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600",
    textColor: "text-white",
    shadowColor: "shadow-orange-500/20"
  }, {
    title: "Total Collection",
    percentage: "98%",
    color: "bg-gradient-to-br from-pink-500 via-red-500 to-red-600",
    textColor: "text-white",
    shadowColor: "shadow-pink-500/20"
  }];

  const tasks = [{
    name: "Task #1",
    progress: 90,
    color: "bg-green-500"
  }, {
    name: "Task #2",
    progress: 70,
    color: "bg-blue-500"
  }, {
    name: "Task #3",
    progress: 60,
    color: "bg-orange-500"
  }, {
    name: "Task #4",
    progress: 40,
    color: "bg-red-500"
  }];

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {statCards.map((card, index) => (
          <Card key={index} className={`${card.color} ${card.textColor} border-0 shadow-2xl ${card.shadowColor} hover:shadow-3xl hover:scale-105 transition-all duration-300 ease-out overflow-hidden relative group`}>
            <CardContent className="p-8 relative z-10">
              <div className="text-5xl font-extrabold mb-3 drop-shadow-lg">{card.percentage}</div>
              <div className="text-xl font-semibold mb-6 opacity-90">{card.title}</div>
              <Button variant="outline" size="sm" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60 font-semibold px-6 py-2 rounded-xl backdrop-blur-sm transition-all duration-200">
                Open Now
                <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </CardContent>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
          </Card>
        ))}
      </div>

      {/* Tasks Progress */}
      <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
        <CardHeader className="p-6">
          <CardTitle className="flex items-center space-x-3 text-xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Tasks Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
              <span className="text-sm font-bold text-gray-700">{task.name}</span>
              <div className="flex items-center space-x-4">
                <div className="w-24 bg-gray-200 rounded-full h-3 shadow-inner">
                  <div className={`h-3 rounded-full ${task.color} shadow-sm transition-all duration-500 ease-out`} style={{width: `${task.progress}%`}}></div>
                </div>
                <span className="text-sm font-bold text-gray-700 min-w-[40px]">{task.progress}%</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardContent;