import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignRight, RotateCcw, Image, Home, User, Mail } from "lucide-react";

const DashboardContent = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7, 1)); // August 2025

  const statCards = [
    {
      title: "Franchise Panel",
      percentage: "79%",
      color: "bg-gradient-to-br from-cyan-400 to-cyan-600",
    },
    {
      title: "Faculty Panel", 
      percentage: "98%",
      color: "bg-gradient-to-br from-red-500 to-red-600",
    },
    {
      title: "Students Panel",
      percentage: "94%", 
      color: "bg-gradient-to-br from-orange-400 to-orange-500",
    },
    {
      title: "Total Collection",
      percentage: "98%",
      color: "bg-gradient-to-br from-red-400 to-pink-500",
    }
  ];

  const tasks = [
    { name: "Task #1", progress: 90, color: "bg-green-500" },
    { name: "Task #2", progress: 70, color: "bg-green-500" },
    { name: "Task #3", progress: 60, color: "bg-green-500" },
    { name: "Task #4", progress: 40, color: "bg-green-500" }
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div key={day} className="p-2 text-center hover:bg-green-700 cursor-pointer rounded text-sm font-medium text-white">
          {day}
        </div>
      );
    }
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Card key={index} className={`${card.color} text-white border-0 shadow-lg overflow-hidden relative`}>
            <CardContent className="p-6">
              <div className="text-4xl font-bold mb-2">{card.percentage}</div>
              <div className="text-lg font-medium mb-4">{card.title}</div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60 font-medium"
              >
                Open Now
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
            {/* Decorative background shapes */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 translate-x-8"></div>
          </Card>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Email */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Quick Email</span>
                <div className="ml-auto">
                  <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">
                    ×
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <Input placeholder="Email to:" className="w-full" />
              <Input placeholder="Subject" className="w-full" />
              
              {/* Rich Text Editor Toolbar */}
              <div className="flex items-center space-x-2 p-2 bg-gray-50 border rounded">
                <select className="text-sm border-0 bg-transparent">
                  <option>Normal text</option>
                </select>
                <div className="h-4 w-px bg-gray-300"></div>
                <Button variant="ghost" size="sm"><Bold className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><Italic className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><Underline className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm" className="text-sm">Small</Button>
                <Button variant="ghost" size="sm" className="text-xl">"</Button>
                <Button variant="ghost" size="sm"><List className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><ListOrdered className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><AlignLeft className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><AlignRight className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><RotateCcw className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><Image className="h-4 w-4" /></Button>
              </div>
              
              <Textarea 
                placeholder="Message" 
                className="min-h-[200px] resize-none"
              />
              
              <div className="flex justify-end">
                <Button className="bg-gray-600 hover:bg-gray-700">
                  Send
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar and Tasks */}
        <div className="space-y-6">
          {/* Calendar */}
          <Card className="shadow-lg">
            <CardHeader className="bg-green-500 text-white">
              <CardTitle className="flex items-center justify-between">
                <span>📅 Calendar</span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-green-600">≡</Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-green-600">-</Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-green-600">×</Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="bg-green-500 text-white p-4">
                <div className="flex items-center justify-between mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white hover:bg-green-600"
                    onClick={() => navigateMonth('prev')}
                  >
                    «
                  </Button>
                  <span className="font-bold text-lg">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-white hover:bg-green-600"
                    onClick={() => navigateMonth('next')}
                  >
                    »
                  </Button>
                </div>
                
                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="text-center text-sm font-bold p-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1">
                  {renderCalendar()}
                </div>
              </div>
              
              {/* Task Progress */}
              <div className="p-4 space-y-3">
                {tasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{task.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${task.color}`} 
                          style={{width: `${task.progress}%`}}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 min-w-[35px]">
                        {task.progress}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;