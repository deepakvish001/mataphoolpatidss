import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Home, 
  User, 
  Building, 
  Users, 
  GraduationCap, 
  Award, 
  Clock, 
  DollarSign, 
  Crown, 
  FileText, 
  CreditCard, 
  LogOut,
  Mail,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Send,
  Star
} from "lucide-react";

const Admin = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: User, label: "Profile" },
    { icon: Building, label: "My Offices", hasSubmenu: true },
    { icon: Users, label: "Head Office" },
    { icon: GraduationCap, label: "Master", hasSubmenu: true },
    { icon: Users, label: "Student Master", hasSubmenu: true },
    { icon: Award, label: "Certificate & Marksheet", hasSubmenu: true },
    { icon: Clock, label: "Attendance Master", hasSubmenu: true },
    { icon: DollarSign, label: "Fees Master", hasSubmenu: true },
    { icon: Building, label: "Expense panel", hasSubmenu: true },
    { icon: Crown, label: "Franchise Master", hasSubmenu: true },
    { icon: FileText, label: "Franchise Certificate", hasSubmenu: true },
    { icon: CreditCard, label: "Payment Mode", hasSubmenu: true },
    { icon: LogOut, label: "LogOut" }
  ];

  const statCards = [
    { title: "Franchise Panel", percentage: "79%", color: "bg-gradient-to-r from-cyan-400 to-blue-500", textColor: "text-white" },
    { title: "Faculty Panel", percentage: "98%", color: "bg-gradient-to-r from-red-400 to-red-600", textColor: "text-white" },
    { title: "Students Panel", percentage: "94%", color: "bg-gradient-to-r from-orange-400 to-orange-600", textColor: "text-white" },
    { title: "Total Collection", percentage: "98%", color: "bg-gradient-to-r from-red-500 to-pink-600", textColor: "text-white" }
  ];

  const tasks = [
    { name: "Task #1", progress: 90 },
    { name: "Task #2", progress: 70 },
    { name: "Task #3", progress: 60 },
    { name: "Task #4", progress: 40 }
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

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
        <div key={day} className="p-2 text-center hover:bg-green-600 cursor-pointer rounded text-sm font-medium">
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-green-400 font-bold text-xl">BIMS SOFT</h1>
        </div>

        {/* Admin Profile */}
        <div className="p-4 border-b border-gray-700 flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6" />
          </div>
          <div>
            <div className="font-semibold">Admin</div>
            <div className="text-green-400 text-sm flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Online
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search..." 
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4">
          <div className="text-gray-400 text-sm font-semibold mb-3">MAIN NAVIGATION</div>
          <nav className="space-y-1">
            {sidebarItems.map((item, index) => (
              <div key={index} className={`flex items-center space-x-3 p-2 rounded cursor-pointer ${item.active ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>
                <item.icon className="h-4 w-4" />
                <span className="text-sm">{item.label}</span>
                {item.hasSubmenu && <ChevronLeft className="h-4 w-4 ml-auto" />}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Control panel</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Mail className="h-6 w-6 text-gray-600" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">3</Badge>
              </div>
              <div className="relative">
                <User className="h-6 w-6 text-gray-600" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center">11</Badge>
              </div>
              <div className="relative">
                <Users className="h-6 w-6 text-gray-600" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">2</Badge>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="font-semibold">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card, index) => (
              <Card key={index} className={`${card.color} ${card.textColor} border-0 shadow-lg`}>
                <CardContent className="p-6">
                  <div className="text-4xl font-bold mb-2">{card.percentage}</div>
                  <div className="text-lg font-medium mb-4">{card.title}</div>
                  <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/20">
                    Open Now
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Email */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <span>Quick Email</span>
                  </CardTitle>
                  <Star className="h-5 w-5 text-blue-500" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Email to:" />
                  <Input placeholder="Subject" />
                  <div className="border rounded-md">
                    <div className="border-b p-3 flex items-center space-x-2">
                      <select className="text-sm border-0 bg-transparent">
                        <option>Normal text</option>
                      </select>
                      <button className="font-bold px-2 py-1 hover:bg-gray-100 rounded">Bold</button>
                      <button className="italic px-2 py-1 hover:bg-gray-100 rounded">Italic</button>
                      <button className="underline px-2 py-1 hover:bg-gray-100 rounded">Underline</button>
                      <button className="text-sm px-2 py-1 hover:bg-gray-100 rounded">Small</button>
                    </div>
                    <Textarea 
                      placeholder="Message" 
                      className="min-h-[200px] border-0 resize-none focus:ring-0"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button className="bg-gray-600 hover:bg-gray-700">
                      Send
                      <Send className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Calendar */}
            <div>
              <Card className="shadow-lg bg-green-500 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Calendar</span>
                    </div>
                    <div className="flex space-x-1">
                      <button className="hover:bg-green-600 p-1 rounded">—</button>
                      <button className="hover:bg-green-600 p-1 rounded">×</button>
                    </div>
                  </CardTitle>
                  <div className="flex items-center justify-between">
                    <button className="hover:bg-green-600 p-1 rounded">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <span className="font-semibold">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                    <button className="hover:bg-green-600 p-1 rounded">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className="text-center text-sm font-semibold p-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendar()}
                  </div>
                </CardContent>
              </Card>

              {/* Tasks */}
              <Card className="mt-4 shadow-lg">
                <CardContent className="p-4 space-y-3">
                  {tasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{task.name}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={task.progress} className="w-20 h-2" />
                        <span className="text-sm text-gray-600">{task.progress}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t p-4 text-center text-sm text-gray-600">
          Copyright © 2020 <span className="text-blue-500">Utthan Social</span>. All rights reserved. Design By <span className="font-semibold">Vivek Yadav</span>
        </div>
      </div>
    </div>
  );
};

export default Admin;