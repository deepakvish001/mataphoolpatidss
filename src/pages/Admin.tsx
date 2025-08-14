import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Home, User, Building, Users, GraduationCap, Award, Clock, DollarSign, Crown, FileText, CreditCard, LogOut, Mail, Calendar, ChevronLeft, ChevronRight, Send, Star, Settings, Bell, Menu, Minimize2, X, ChevronDown, Key, Video, Building2, Image, MapPin, Map, BookOpen, Newspaper, FolderPlus, Eye, Target, MessageSquare, Phone, HelpCircle, UserPlus, UserCheck, Database, Shield, CheckCircle, Printer, FileOutput, Upload, Hash, FileCheck, Edit, BarChart, Receipt, Wallet, PlusCircle, Book, Scale, Calculator } from "lucide-react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import DashboardContent from "@/components/admin/DashboardContent";
import EditProfileContent from "@/components/admin/EditProfileContent";
import ChangePasswordContent from "@/components/admin/ChangePasswordContent";
import VideoContent from "@/components/admin/VideoContent";
import HeadOfficeContent from "@/components/admin/HeadOfficeContent";
import MenuContentContent from "@/components/admin/MenuContentContent";
import PhotoGalleryContent from "@/components/admin/PhotoGalleryContent";
import BankDetailsContent from "@/components/admin/BankDetailsContent";
import EmployeeMasterContent from "@/components/admin/EmployeeMasterContent";
import StateMasterContent from "@/components/admin/StateMasterContent";
import DistrictMasterContent from "@/components/admin/DistrictMasterContent";
import CourseMasterContent from "@/components/admin/CourseMasterContent";
import AddNewsContent from "@/components/admin/AddNewsContent";
import AddCourseCategoryContent from "@/components/admin/AddCourseCategoryContent";
import AddCompetitionCoursesContent from "@/components/admin/AddCompetitionCoursesContent";

const Admin = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<Set<number>>(new Set());
  const navigate = useNavigate();
  const location = useLocation();
  
  const getCurrentView = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/') return 'dashboard';
    if (path === '/admin/edit-profile') return 'edit-profile';
    if (path === '/admin/change-password') return 'change-password';
    if (path === '/admin/video') return 'video';
    if (path === '/admin/head-office') return 'head-office';
    if (path === '/admin/menu-content') return 'menu-content';
    if (path === '/admin/photo-gallery') return 'photo-gallery';
    if (path === '/admin/bank-details') return 'bank-details';
    if (path === '/admin/employee-master') return 'employee-master';
    if (path === '/admin/state-master') return 'state-master';
    if (path === '/admin/district-master') return 'district-master';
    if (path === '/admin/course-master') return 'course-master';
    if (path === '/admin/add-news') return 'add-news';
    if (path === '/admin/add-course-category') return 'add-course-category';
    if (path === '/admin/add-competition-courses') return 'add-competition-courses';
    return 'dashboard';
  };

  const currentView = getCurrentView();

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
        <div key={day} className="p-2 text-center hover:bg-green-600 cursor-pointer rounded text-sm font-medium">
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <div className={`${sidebarCollapsed ? 'p-2' : 'p-6'}`}>
            {!sidebarCollapsed && <div className="text-gray-400 text-xs font-semibold mb-4 uppercase tracking-wider">MAIN NAVIGATION</div>}
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <div key={index}>
                  <div 
                    className={`${sidebarCollapsed ? 'flex items-center justify-center p-4 relative group' : 'flex items-center space-x-4 p-3'} rounded-xl cursor-pointer transition-all duration-200 ${item.label === 'Dashboard' && currentView === 'dashboard' ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 shadow-lg' : 'hover:bg-gray-700/50 hover:shadow-md'}`}
                    onClick={() => {
                      if (item.label === 'Dashboard') {
                        navigate('/admin');
                      } else if (item.hasSubmenu && !sidebarCollapsed) {
                        toggleSubmenu(index);
                      }
                    }}
                  >
                    <item.icon className={`${sidebarCollapsed ? 'h-7 w-7' : 'h-5 w-5'} ${item.color || 'text-gray-400'} group-hover:scale-110 transition-transform duration-200 ${sidebarCollapsed ? 'mx-auto' : ''}`} />
                    {!sidebarCollapsed && (
                      <>
                        <span className={`text-sm font-medium ${item.label === 'Dashboard' && currentView === 'dashboard' ? 'text-white' : 'text-gray-300'} group-hover:text-white transition-colors duration-200`}>
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
                              navigate('/admin/edit-profile');
                            } else if (subItem.label === "Change Login Password") {
                              navigate('/admin/change-password');
                            } else if (subItem.label === "Video") {
                              navigate('/admin/video');
                            } else if (subItem.label === "Head Office") {
                              navigate('/admin/head-office');
                            } else if (subItem.label === "Menu Content") {
                              navigate('/admin/menu-content');
                            } else if (subItem.label === "Photo Gallery") {
                              navigate('/admin/photo-gallery');
                            } else if (subItem.label === "Add Bank Details") {
                              navigate('/admin/bank-details');
                            } else if (subItem.label === "EMP Master") {
                              navigate('/admin/employee-master');
                            } else if (subItem.label === "State Master") {
                              navigate('/admin/state-master');
                            } else if (subItem.label === "Distt Master") {
                              navigate('/admin/district-master');
                            } else if (subItem.label === "Course Master") {
                              navigate('/admin/course-master');
                            } else if (subItem.label === "Add News") {
                              navigate('/admin/add-news');
                            } else if (subItem.label === "Add Course Category") {
                              navigate('/admin/add-course-category');
                            } else if (subItem.label === "Add News & Event") {
                              navigate('/admin/add-competition-courses');
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
              {currentView === 'dashboard' ? 'Dashboard' : 
               currentView === 'edit-profile' ? 'Admin Profile' : 
               currentView === 'change-password' ? 'Change Password' : 
               currentView === 'video' ? 'Add Videos' : 
               currentView === 'head-office' ? 'Head Office Details' : 
               currentView === 'menu-content' ? 'Add Menu Content' : 
               currentView === 'photo-gallery' ? 'Add Photo To Gallery' : 
               currentView === 'bank-details' ? 'Add Bank Details' : 
               currentView === 'employee-master' ? 'Employee Master' : 
                currentView === 'state-master' ? 'State Master' : 
                currentView === 'district-master' ? 'District Master' : 
                currentView === 'course-master' ? 'Course Master' : 
                currentView === 'add-news' ? 'Add News' : 
                currentView === 'add-course-category' ? 'Add Course Category' : 
               currentView === 'add-competition-courses' ? 'Add Competition Courses' : 'Dashboard'}
            </h1>
            <p className="text-gray-600 font-medium mt-1">
              {currentView === 'dashboard' ? 'Control panel' : 
               currentView === 'edit-profile' ? 'Edit your profile information' : 
               currentView === 'change-password' ? 'Update your login password' : 
               currentView === 'video' ? 'Upload and manage videos' : 
               currentView === 'head-office' ? 'Manage head office information' : 
               currentView === 'menu-content' ? 'Upload and manage menu content' : 
               currentView === 'photo-gallery' ? 'Upload and manage gallery photos' : 
               currentView === 'bank-details' ? 'Manage bank account details' : 
               currentView === 'employee-master' ? 'Manage employee information' : 
                currentView === 'state-master' ? 'Manage state information' : 
                currentView === 'district-master' ? 'Manage district information' : 
                currentView === 'course-master' ? 'Manage course information' : 
                currentView === 'add-news' ? 'Manage news and announcements' : 
                currentView === 'add-course-category' ? 'Manage course categories' : 
               currentView === 'add-competition-courses' ? 'Manage competition courses and events' : 'Control panel'}
            </p>
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
          <Routes>
            <Route path="/" element={<DashboardContent />} />
            <Route path="/edit-profile" element={<EditProfileContent />} />
            <Route path="/change-password" element={<ChangePasswordContent />} />
            <Route path="/video" element={<VideoContent />} />
            <Route path="/head-office" element={<HeadOfficeContent />} />
            <Route path="/menu-content" element={<MenuContentContent />} />
            <Route path="/photo-gallery" element={<PhotoGalleryContent />} />
            <Route path="/bank-details" element={<BankDetailsContent />} />
            <Route path="/employee-master" element={<EmployeeMasterContent />} />
            <Route path="/state-master" element={<StateMasterContent />} />
            <Route path="/district-master" element={<DistrictMasterContent />} />
            <Route path="/course-master" element={<CourseMasterContent />} />
            <Route path="/add-news" element={<AddNewsContent />} />
            <Route path="/add-course-category" element={<AddCourseCategoryContent />} />
            <Route path="/add-competition-courses" element={<AddCompetitionCoursesContent />} />
          </Routes>
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
    </div>
  );
};

export default Admin;