import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Home, User, Building, Users, GraduationCap, Award, Clock, DollarSign, Crown, FileText, CreditCard, LogOut, Mail, Calendar, ChevronLeft, ChevronRight, Send, Star, Settings, Bell, Menu, Minimize2, X, ChevronDown, Key, Video, Building2, Image, MapPin, Map, BookOpen, Newspaper, FolderPlus, Eye, Target, MessageSquare, Phone, HelpCircle, UserPlus, UserCheck, Database, Shield, CheckCircle, Printer, FileOutput, Upload, Hash, FileCheck, Edit, BarChart, Receipt, Wallet, PlusCircle, Book, Scale, Calculator } from "lucide-react";
const Admin = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Set<number>>(new Set());

  const toggleSubmenu = (index: number) => {
    const newOpenSubmenus = new Set(openSubmenus);
    if (newOpenSubmenus.has(index)) {
      newOpenSubmenus.delete(index);
    } else {
      newOpenSubmenus.add(index);
    }
    setOpenSubmenus(newOpenSubmenus);
  };

  const sidebarItems = [{
    icon: Home,
    label: "Dashboard",
    active: true,
    color: "text-blue-400"
  }, {
    icon: User,
    label: "Profile",
    color: "text-green-400",
    hasSubmenu: true,
    submenuItems: [
      { label: "Edit My Profile", icon: User },
      { label: "Change Login Password", icon: Key },
      { label: "Video", icon: Video }
    ]
  }, {
    icon: Building,
    label: "My Offices",
    hasSubmenu: true,
    color: "text-purple-400",
    submenuItems: [
      { label: "Head Office", icon: Building2 }
    ]
  }, {
    icon: GraduationCap,
    label: "Master",
    hasSubmenu: true,
    color: "text-pink-400",
    submenuItems: [
      { label: "Master", icon: Settings },
      { label: "Menu Content", icon: Menu },
      { label: "Photo Gallery", icon: Image },
      { label: "Add Bank Details", icon: CreditCard },
      { label: "EMP Master", icon: Users },
      { label: "State Master", icon: MapPin },
      { label: "Distt Master", icon: Map },
      { label: "Course Master", icon: BookOpen },
      { label: "Add News", icon: Newspaper },
      { label: "Add Course Category", icon: FolderPlus },
      { label: "Add News & Event", icon: Calendar },
      { label: "Add Vision", icon: Eye },
      { label: "Add Mission", icon: Target },
      { label: "Add Director Message", icon: MessageSquare },
      { label: "Contact Us", icon: Phone },
      { label: "Enquiry", icon: HelpCircle }
    ]
  }, {
    icon: Users,
    label: "Student Master",
    hasSubmenu: true,
    color: "text-cyan-400",
    submenuItems: [
      { label: "Student Master", icon: GraduationCap },
      { label: "Student Registration", icon: UserPlus },
      { label: "Student Approval", icon: UserCheck },
      { label: "Student Management", icon: Users },
      { label: "Search By Student Data", icon: Search },
      { label: "Student Verification", icon: Shield },
      { label: "Verification", icon: CheckCircle },
      { label: "Verification Report", icon: FileText },
      { label: "Student Data", icon: Database },
      { label: "Student Reg. Print", icon: Printer },
      { label: "Make Student Admit Card", icon: CreditCard },
      { label: "Student Admit Card Report", icon: FileText },
      { label: "Generate Student Admit Card", icon: FileOutput },
      { label: "Upload Student Content", icon: Upload }
    ]
  }, {
    icon: Award,
    label: "Certificate & Marksheet",
    hasSubmenu: true,
    color: "text-yellow-400",
    submenuItems: [
      { label: "Course Subject", icon: BookOpen },
      { label: "Alot Number", icon: Hash },
      { label: "Ready Markseet", icon: FileCheck },
      { label: "Report", icon: FileText },
      { label: "Edit CRT", icon: Edit },
      { label: "Student Markseet", icon: Award }
    ]
  }, {
    icon: Clock,
    label: "Attendance Master",
    hasSubmenu: true,
    color: "text-red-400",
    submenuItems: [
      { label: "Student Attandance", icon: Clock },
      { label: "Student Att. Report", icon: BarChart }
    ]
  }, {
    icon: DollarSign,
    label: "Fees Master",
    hasSubmenu: true,
    color: "text-green-400",
    submenuItems: [
      { label: "Class Fees", icon: DollarSign },
      { label: "Fees Reports", icon: Receipt },
      { label: "Fees Management", icon: Wallet },
      { label: "Fees Print", icon: Printer }
    ]
  }, {
    icon: Building,
    label: "Expense panel",
    hasSubmenu: true,
    color: "text-indigo-400",
    submenuItems: [
      { label: "Expense Master", icon: Receipt },
      { label: "Expense Entry", icon: PlusCircle },
      { label: "Day Book", icon: Book },
      { label: "Opening Balance", icon: Scale },
      { label: "Balance Sheet", icon: Calculator }
    ]
  }, {
    icon: Crown,
    label: "Franchise Master",
    hasSubmenu: true,
    color: "text-amber-400",
    submenuItems: [
      { label: "Registration", icon: UserPlus },
      { label: "Franchise Management", icon: Building },
      { label: "Approval", icon: CheckCircle },
      { label: "Franchise Data", icon: Database },
      { label: "Franchise Reg. Print", icon: Printer },
      { label: "Franchise Upload", icon: Upload },
      { label: "View Franchise Support", icon: HelpCircle }
    ]
  }, {
    icon: FileText,
    label: "Franchise Certificate",
    hasSubmenu: true,
    color: "text-teal-400",
    submenuItems: [
      { label: "Make Franchise Certificate", icon: Award },
      { label: "Generate Franchise Certificat", icon: FileOutput }
    ]
  }, {
    icon: CreditCard,
    label: "Payment Mode",
    hasSubmenu: true,
    color: "text-rose-400",
    submenuItems: [
      { label: "Payment Section", icon: CreditCard },
      { label: "Reporting", icon: BarChart },
      { label: "Student_Editing", icon: Edit }
    ]
  }, {
    icon: LogOut,
    label: "LogOut",
    color: "text-gray-400"
  }];
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
      days.push(<div key={day} className="p-2 text-center hover:bg-green-600 cursor-pointer rounded text-sm font-medium">
          {day}
        </div>);
    }
    return days;
  };
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-72'} bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl transition-all duration-300 ease-in-out fixed left-0 top-0 h-full z-40 flex flex-col overflow-visible`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-700/50 bg-gray-800/50">
          <div className="flex items-center justify-between">
            <h1 className={`text-green-400 font-bold text-2xl bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent ${sidebarCollapsed ? 'hidden' : 'block'}`}>
              BIMS SOFT
            </h1>
            {sidebarCollapsed && <div className="text-green-400 font-bold text-lg">BS</div>}
            <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="text-gray-400 hover:text-white hover:bg-gray-700/50">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Admin Profile */}
        

        {/* Search */}
        {!sidebarCollapsed}

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <div className={`${sidebarCollapsed ? 'p-2' : 'p-6'}`}>
            {!sidebarCollapsed && <div className="text-gray-400 text-xs font-semibold mb-4 uppercase tracking-wider">MAIN NAVIGATION</div>}
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <div key={index}>
                  <div 
                    className={`${sidebarCollapsed ? 'flex items-center justify-center p-4 relative group' : 'flex items-center space-x-4 p-3'} rounded-xl cursor-pointer transition-all duration-200 ${item.active ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 shadow-lg' : 'hover:bg-gray-700/50 hover:shadow-md'}`}
                    onClick={() => item.hasSubmenu && !sidebarCollapsed && toggleSubmenu(index)}
                  >
                    <item.icon className={`${sidebarCollapsed ? 'h-7 w-7' : 'h-5 w-5'} ${item.color || 'text-gray-400'} group-hover:scale-110 transition-transform duration-200 ${sidebarCollapsed ? 'mx-auto' : ''}`} />
                    {!sidebarCollapsed && (
                      <>
                        <span className={`text-sm font-medium ${item.active ? 'text-white' : 'text-gray-300'} group-hover:text-white transition-colors duration-200`}>
                          {item.label}
                        </span>
                        {item.hasSubmenu && (
                          <ChevronDown 
                            className={`h-4 w-4 ml-auto text-gray-400 group-hover:text-white transition-all duration-200 ${
                              openSubmenus.has(index) ? 'rotate-180' : ''
                            }`} 
                          />
                        )}
                      </>
                    )}
                    {sidebarCollapsed && (
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                        {item.label}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Submenu Items */}
                  {item.hasSubmenu && item.submenuItems && !sidebarCollapsed && openSubmenus.has(index) && (
                    <div className="ml-8 mt-2 space-y-1 border-l-2 border-gray-600/50 pl-4">
                      {item.submenuItems.map((subItem, subIndex) => (
                        <div 
                          key={subIndex}
                          className="flex items-center space-x-3 p-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700/30 rounded-lg cursor-pointer transition-all duration-200"
                          onClick={() => {
                            if (subItem.label === "Edit My Profile") {
                              window.location.href = "/edit-profile";
                            }
                          }}
                        >
                          <subItem.icon className="h-4 w-4 text-gray-500" />
                          <span>{subItem.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col ${sidebarCollapsed ? 'ml-20' : 'ml-72'} transition-all duration-300`}>
        {/* Top Bar */}
        <div className="bg-white/80 backdrop-blur-sm shadow-xl border-b border-gray-200 p-6 flex items-center justify-between fixed top-0 right-0 left-0 z-30" style={{
        left: sidebarCollapsed ? '80px' : '288px'
      }}>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600 font-medium mt-1">Control panel</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="relative group cursor-pointer">
                <Mail className="h-7 w-7 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold flex items-center justify-center shadow-lg animate-pulse">
                  3
                </Badge>
              </div>
              <div className="relative group cursor-pointer">
                <Bell className="h-7 w-7 text-gray-600 group-hover:text-orange-600 transition-colors duration-200" />
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                  11
                </Badge>
              </div>
              <div className="relative group cursor-pointer">
                <Users className="h-7 w-7 text-gray-600 group-hover:text-red-600 transition-colors duration-200" />
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                  2
                </Badge>
              </div>
              <div className="h-8 w-px bg-gray-300 mx-2"></div>
              <div className="flex items-center space-x-3 cursor-pointer group">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-200"></div>
                <div>
                  <span className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200">Admin</span>
                  <div className="text-xs text-gray-500">Administrator</div>
                </div>
                <Settings className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-8 bg-gradient-to-br from-gray-50 to-white mt-24 overflow-y-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {statCards.map((card, index) => <Card key={index} className={`${card.color} ${card.textColor} border-0 shadow-2xl ${card.shadowColor} hover:shadow-3xl hover:scale-105 transition-all duration-300 ease-out overflow-hidden relative group`}>
                <CardContent className="p-8 relative z-10">
                  <div className="text-5xl font-extrabold mb-3 drop-shadow-lg">{card.percentage}</div>
                  <div className="text-xl font-semibold mb-6 opacity-90">{card.title}</div>
                  <Button variant="outline" size="sm" className="border-white/40 bg-white/10 text-white hover:bg-white/20 hover:border-white/60 font-semibold px-6 py-2 rounded-xl backdrop-blur-sm transition-all duration-200">
                    Open Now
                    <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </CardContent>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
              </Card>)}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Email */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between p-8 border-b border-gray-100">
                  <CardTitle className="flex items-center space-x-3 text-2xl font-bold text-gray-800">
                    <div className="p-2 bg-blue-500 rounded-lg shadow-lg">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Quick Email</span>
                  </CardTitle>
                  <Star className="h-6 w-6 text-blue-500 hover:text-yellow-500 transition-colors duration-200 cursor-pointer" />
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <Input placeholder="Email to:" className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl text-gray-700 font-medium" />
                  <Input placeholder="Subject" className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl text-gray-700 font-medium" />
                  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="border-b border-gray-200 p-4 bg-gray-50 flex items-center space-x-3">
                      <select className="text-sm border-0 bg-transparent font-medium text-gray-700 focus:outline-none">
                        <option>Normal text</option>
                      </select>
                      <button className="font-bold px-3 py-2 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-gray-700">Bold</button>
                      <button className="italic px-3 py-2 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-gray-700">Italic</button>
                      <button className="underline px-3 py-2 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-gray-700">Underline</button>
                      <button className="text-sm px-3 py-2 hover:bg-gray-200 rounded-lg transition-colors duration-200 text-gray-700">Small</button>
                    </div>
                    <Textarea placeholder="Message" className="min-h-[240px] border-0 resize-none focus:ring-0 text-gray-700 font-medium p-6 placeholder-gray-400" />
                  </div>
                  <div className="flex justify-end">
                    <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                      Send
                      <Send className="h-5 w-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Calendar */}
            <div>
              <Card className="shadow-2xl bg-gradient-to-br from-emerald-500 via-green-500 to-green-600 text-white border-0 overflow-hidden hover:shadow-3xl transition-all duration-300">
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm shadow-lg">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xl font-bold">Calendar</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="hover:bg-white/20 p-2 rounded-lg transition-colors duration-200 backdrop-blur-sm">
                        <Minimize2 className="h-4 w-4" />
                      </button>
                      <button className="hover:bg-white/20 p-2 rounded-lg transition-colors duration-200 backdrop-blur-sm">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </CardTitle>
                  <div className="flex items-center justify-between mt-4">
                    <button className="hover:bg-white/20 p-3 rounded-xl transition-all duration-200 backdrop-blur-sm hover:scale-110">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <span className="font-bold text-lg">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                    <button className="hover:bg-white/20 p-3 rounded-xl transition-all duration-200 backdrop-blur-sm hover:scale-110">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <div key={day} className="text-center text-sm font-bold p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                        {day}
                      </div>)}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {renderCalendar()}
                  </div>
                </CardContent>
              </Card>

              {/* Tasks */}
              <Card className="mt-6 shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-300">
                <CardHeader className="p-6">
                  <CardTitle className="flex items-center space-x-3 text-xl font-bold text-gray-800">
                    <div className="p-2 bg-purple-500 rounded-lg shadow-lg">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Tasks Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  {tasks.map((task, index) => <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      <span className="text-sm font-bold text-gray-700">{task.name}</span>
                      <div className="flex items-center space-x-4">
                        <div className="w-24 bg-gray-200 rounded-full h-3 shadow-inner">
                          <div className={`h-3 rounded-full ${task.color} shadow-sm transition-all duration-500 ease-out`} style={{
                        width: `${task.progress}%`
                      }}></div>
                        </div>
                        <span className="text-sm font-bold text-gray-700 min-w-[40px]">{task.progress}%</span>
                      </div>
                    </div>)}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700 p-6 text-center shadow-2xl">
          <div className="text-sm text-gray-300 font-medium">
            Copyright © 2020 <span className="text-blue-400 font-bold hover:text-blue-300 transition-colors duration-200 cursor-pointer">Utthan Social</span>. All rights reserved. 
          </div>
          <div className="text-xs text-gray-400 mt-2">
            Design By <span className="font-bold text-purple-400 hover:text-purple-300 transition-colors duration-200 cursor-pointer">Vivek Yadav</span>
          </div>
        </div>
      </div>
    </div>;
};
export default Admin;