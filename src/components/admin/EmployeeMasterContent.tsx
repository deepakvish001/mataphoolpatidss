import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Edit, 
  Trash2, 
  Loader2, 
  Search, 
  TrendingUp, 
  UserCheck, 
  UserX, 
  BarChart3, 
  IndianRupee,
  Plus,
  Filter,
  RefreshCw,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Camera,
  Upload,
  Building,
  Home,
  CreditCard,
  Shield,
  Activity,
  Hash,
  IdCard,
  Lock
} from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface Employee {
  id: string;
  employee_id: string;
  employee_password: string;
  full_name: string;
  father_name?: string;
  contact_no: string;
  email_id: string;
  country?: string;
  state?: string;
  district?: string;
  address?: string;
  other_details?: string;
  pincode?: string;
  salary?: string;
  registration_date?: string;
  photo_url?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

const EmployeeMasterContent = () => {
  const {
    data: employees,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<Employee>({ tableName: 'employees' });

  useAdminRealTime({
    tableName: 'employees'
  });
  
  const [formData, setFormData] = useState({
    employeeId: "EMP021",
    employeePassword: "Bdcid021",
    fullName: "",
    fatherName: "",
    contactNo: "",
    emailId: "",
    country: "India",
    state: "",
    district: "",
    address: "",
    otherDetails: "",
    pincode: "",
    salary: "",
    registrationDate: "",
    photoUpload: null as File | null
  });

  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const districts = [
    "Agra", "Allahabad", "Azamgarh", "Bareilly", "Ghaziabad", "Gorakhpur",
    "Kanpur", "Lucknow", "Meerut", "Moradabad", "Saharanpur", "Varanasi"
  ];

  // Statistics calculation
  const stats = useMemo(() => {
    const total = employees.length;
    const active = employees.filter(emp => emp.status === 'active').length;
    const inactive = total - active;
    const avgSalary = employees.reduce((sum, emp) => sum + parseFloat(emp.salary || '0'), 0) / (total || 1);
    
    return {
      total,
      active,
      inactive,
      avgSalary: Math.round(avgSalary)
    };
  }, [employees]);

  // Filtered and sorted data
  const filteredData = useMemo(() => {
    let filtered = employees.filter(employee => {
      const matchesSearch = 
        employee.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employee_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (employee.contact_no && employee.contact_no.includes(searchTerm));
      
      const matchesStatus = statusFilter === "all" || employee.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sort data
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateB - dateA;
        });
        break;
      case "oldest":
        filtered.sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
          return dateA - dateB;
        });
        break;
      case "name":
        filtered.sort((a, b) => a.full_name.localeCompare(b.full_name));
        break;
      case "salary":
        filtered.sort((a, b) => parseFloat(b.salary || '0') - parseFloat(a.salary || '0'));
        break;
      default:
        break;
    }

    return filtered;
  }, [employees, searchTerm, statusFilter, sortBy]);

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleInputChange('photoUpload', file);
    }
  };

  const handleSubmit = async () => {
    if (editingEmployee) {
      await handleUpdate();
      return;
    }

    if (!formData.fullName.trim() || !formData.contactNo.trim() || !formData.emailId.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newEmployee = {
      employee_id: formData.employeeId,
      employee_password: formData.employeePassword,
      full_name: formData.fullName,
      father_name: formData.fatherName,
      contact_no: formData.contactNo,
      email_id: formData.emailId,
      country: formData.country,
      state: formData.state,
      district: formData.district,
      address: formData.address,
      other_details: formData.otherDetails,
      pincode: formData.pincode,
      salary: formData.salary,
      registration_date: formData.registrationDate,
      photo_url: formData.photoUpload ? formData.photoUpload.name : null,
      status: 'active'
    };

    try {
      await create(newEmployee);
      handleReset();
      toast.success("Employee added successfully!");
    } catch (error) {
      toast.error("Failed to add employee");
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      employeeId: employee.employee_id,
      employeePassword: employee.employee_password,
      fullName: employee.full_name,
      fatherName: employee.father_name || "",
      contactNo: employee.contact_no,
      emailId: employee.email_id,
      country: employee.country || "India",
      state: employee.state || "",
      district: employee.district || "",
      address: employee.address || "",
      otherDetails: employee.other_details || "",
      pincode: employee.pincode || "",
      salary: employee.salary || "",
      registrationDate: employee.registration_date || "",
      photoUpload: null
    });
  };

  const handleUpdate = async () => {
    if (!editingEmployee) return;
    
    if (!formData.fullName.trim() || !formData.contactNo.trim() || !formData.emailId.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedEmployee = {
      employee_id: formData.employeeId,
      employee_password: formData.employeePassword,
      full_name: formData.fullName,
      father_name: formData.fatherName,
      contact_no: formData.contactNo,
      email_id: formData.emailId,
      country: formData.country,
      state: formData.state,
      district: formData.district,
      address: formData.address,
      other_details: formData.otherDetails,
      pincode: formData.pincode,
      salary: formData.salary,
      registration_date: formData.registrationDate,
      photo_url: formData.photoUpload ? formData.photoUpload.name : null,
      status: 'active'
    };

    try {
      await update(editingEmployee.id, updatedEmployee);
      setEditingEmployee(null);
      handleReset();
      toast.success("Employee updated successfully!");
    } catch (error) {
      toast.error("Failed to update employee");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    
    try {
      await deleteItem(id);
      toast.success("Employee deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete employee");
    }
  };

  const handleReset = () => {
    setFormData({
      employeeId: "EMP021",
      employeePassword: "Bdcid021",
      fullName: "",
      fatherName: "",
      contactNo: "",
      emailId: "",
      country: "India",
      state: "",
      district: "",
      address: "",
      otherDetails: "",
      pincode: "",
      salary: "",
      registrationDate: "",
      photoUpload: null
    });
    setEditingEmployee(null);

    // Reset file input
    const fileInput = document.getElementById('employee-photo-file') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  if (loading) {
    return (
      <Card className="border-0 shadow-lg bg-card">
        <CardContent className="p-12 flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading employees...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Employees</p>
                <p className="text-3xl font-bold">{stats.total}</p>
                <p className="text-xs text-blue-200 mt-1">Registered staff</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active Employees</p>
                <p className="text-3xl font-bold">{stats.active}</p>
                <p className="text-xs text-green-200 mt-1">Currently working</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <UserCheck className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Inactive</p>
                <p className="text-3xl font-bold">{stats.inactive}</p>
                <p className="text-xs text-orange-200 mt-1">Not working</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <UserX className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Average Salary</p>
                <p className="text-3xl font-bold">₹{stats.avgSalary.toLocaleString()}</p>
                <p className="text-xs text-purple-200 mt-1">Monthly average</p>
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <IndianRupee className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Master Form */}
      <Card className="shadow-lg border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-background">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500 text-white rounded-lg">
              <Plus className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-emerald-700 dark:text-emerald-300">
                {editingEmployee ? 'Edit Employee Details' : 'Add New Employee'}
              </CardTitle>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                {editingEmployee ? "Update employee information" : "Enter comprehensive employee details for registration"}
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Employee ID */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <IdCard className="h-4 w-4" />
                Employee ID
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-4 w-4" />
                <Input
                  value={formData.employeeId}
                  onChange={(e) => handleInputChange('employeeId', e.target.value)}
                  className="pl-10 bg-gray-100 dark:bg-gray-800 border-blue-200 focus:border-blue-400"
                  readOnly
                />
              </div>
            </div>

            {/* Employee Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-red-700 dark:text-red-300">
                <Lock className="h-4 w-4" />
                Employee Password
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 h-4 w-4" />
                <Input
                  value={formData.employeePassword}
                  onChange={(e) => handleInputChange('employeePassword', e.target.value)}
                  className="pl-10 bg-gray-100 dark:bg-gray-800 border-red-200 focus:border-red-400"
                  readOnly
                />
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-green-700 dark:text-green-300">
                <User className="h-4 w-4" />
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
                <Input
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter full name"
                  className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                />
              </div>
            </div>

            {/* Father Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-purple-700 dark:text-purple-300">
                <Users className="h-4 w-4" />
                Father Name
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 h-4 w-4" />
                <Input
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  placeholder="Enter father name"
                  className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
            </div>

            {/* Contact No */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-orange-700 dark:text-orange-300">
                <Phone className="h-4 w-4" />
                Contact No *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 h-4 w-4" />
                <Input
                  value={formData.contactNo}
                  onChange={(e) => handleInputChange('contactNo', e.target.value)}
                  placeholder="Enter contact number"
                  className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                />
              </div>
            </div>

            {/* Email ID */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Mail className="h-4 w-4" />
                Email ID *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 h-4 w-4" />
                <Input
                  type="email"
                  value={formData.emailId}
                  onChange={(e) => handleInputChange('emailId', e.target.value)}
                  placeholder="Enter email address"
                  className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                <Building className="h-4 w-4" />
                Country
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500 h-4 w-4" />
                <Input
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="pl-10 bg-gray-100 dark:bg-gray-800 border-indigo-200 focus:border-indigo-400"
                  readOnly
                />
              </div>
            </div>

            {/* State */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-pink-700 dark:text-pink-300">
                <MapPin className="h-4 w-4" />
                State
              </label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                <SelectTrigger className="border-pink-200 focus:border-pink-400">
                  <SelectValue placeholder="---Please Select---" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-pink-500" />
                        {state}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* District */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-teal-700 dark:text-teal-300">
                <MapPin className="h-4 w-4" />
                District
              </label>
              <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                <SelectTrigger className="border-teal-200 focus:border-teal-400">
                  <SelectValue placeholder="---Please Select---" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-teal-500" />
                        {district}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Pincode */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
                <Hash className="h-4 w-4" />
                Pincode
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500 h-4 w-4" />
                <Input
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  placeholder="Enter pincode"
                  className="pl-10 border-cyan-200 focus:border-cyan-400 focus:ring-cyan-400"
                />
              </div>
            </div>

            {/* Salary */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
                <CreditCard className="h-4 w-4" />
                Salary
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-500 h-4 w-4" />
                <Input
                  value={formData.salary}
                  onChange={(e) => handleInputChange('salary', e.target.value)}
                  placeholder="Enter salary amount"
                  className="pl-10 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
                />
              </div>
            </div>

            {/* Registration Date */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-violet-700 dark:text-violet-300">
                <Calendar className="h-4 w-4" />
                Registration Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-violet-500 h-4 w-4" />
                <Input
                  type="date"
                  value={formData.registrationDate}
                  onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                  className="pl-10 border-violet-200 focus:border-violet-400 focus:ring-violet-400"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-amber-700 dark:text-amber-300">
                <Home className="h-4 w-4" />
                Address
              </label>
              <div className="relative">
                <Home className="absolute left-3 top-3 text-amber-500 h-4 w-4" />
                <Textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="pl-10 min-h-[80px] resize-none border-amber-200 focus:border-amber-400 focus:ring-amber-400"
                  placeholder="Enter complete address"
                />
              </div>
            </div>

            {/* Other Details */}
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Activity className="h-4 w-4" />
                Other Details
              </label>
              <div className="relative">
                <Activity className="absolute left-3 top-3 text-slate-500 h-4 w-4" />
                <Textarea
                  value={formData.otherDetails}
                  onChange={(e) => handleInputChange('otherDetails', e.target.value)}
                  className="pl-10 min-h-[80px] resize-none border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  placeholder="Enter additional details"
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold flex items-center gap-2 text-rose-700 dark:text-rose-300">
                <Camera className="h-4 w-4" />
                Employee Photo
              </label>
              <div className="relative border-2 border-dashed border-rose-300 rounded-lg p-6 bg-rose-50/50 dark:bg-rose-950/20 hover:border-rose-400 transition-colors">
                <input
                  id="employee-photo-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  <Upload className="h-8 w-8 text-rose-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-rose-700 dark:text-rose-300">
                    {formData.photoUpload ? formData.photoUpload.name : "Click to upload employee photo"}
                  </p>
                  <p className="text-xs text-rose-600 dark:text-rose-400 mt-1">
                    Drag & drop or click to browse (PNG, JPG, JPEG)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit and Reset Buttons */}
          <div className="flex gap-4 pt-6 border-t border-emerald-200">
            <Button 
              onClick={handleSubmit} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              size="lg"
            >
              {editingEmployee ? (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Update Employee
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Employee
                </>
              )}
            </Button>
            <Button variant="outline" onClick={handleReset} size="lg">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Form
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter Controls */}
      <Card className="shadow-lg border-l-4 border-l-indigo-500 bg-gradient-to-r from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-background">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500 text-white rounded-lg">
              <Search className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">Search & Filter Employees</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-indigo-500" />
              <Input
                placeholder="Search employees by name, ID, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-400"
              />
            </div>
            <div className="flex gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40 border-indigo-200 focus:border-indigo-400">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      All Status
                    </div>
                  </SelectItem>
                  <SelectItem value="active">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-green-500" />
                      Active
                    </div>
                  </SelectItem>
                  <SelectItem value="inactive">
                    <div className="flex items-center gap-2">
                      <UserX className="h-4 w-4 text-orange-500" />
                      Inactive
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 border-indigo-200 focus:border-indigo-400">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      Newest First
                    </div>
                  </SelectItem>
                  <SelectItem value="oldest">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      Oldest First
                    </div>
                  </SelectItem>
                  <SelectItem value="name">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-purple-500" />
                      By Name
                    </div>
                  </SelectItem>
                  <SelectItem value="salary">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-4 w-4 text-emerald-500" />
                      By Salary
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refresh()}
                className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Master Table */}
      <Card className="shadow-lg border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50/50 to-white dark:from-purple-950/20 dark:to-background">
        <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-transparent dark:from-purple-950/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500 text-white rounded-lg">
              <Users className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl font-semibold text-purple-700 dark:text-purple-300">
                Employee Master Registry
              </CardTitle>
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  Complete employee database with {filteredData.length} registered staff members
                </p>
                <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">
                  {filteredData.length} {filteredData.length === 1 ? 'Employee' : 'Employees'}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredData.length === 0 ? (
            <div className="p-12 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                    {searchTerm ? "No employees found" : "No employees available"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    {searchTerm ? "Try adjusting your search criteria or filters" : "Start by adding your first employee using the form above"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                  <TableRow className="border-b-2 border-purple-200">
                    <TableHead className="w-[120px] font-semibold text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-purple-500" />
                        Actions
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[120px] font-semibold text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <IdCard className="h-4 w-4 text-blue-500" />
                        Employee ID
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[180px] font-semibold text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-green-500" />
                        Name
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[140px] font-semibold text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-orange-500" />
                        Contact
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[200px] font-semibold text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-blue-500" />
                        Email
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[120px] font-semibold text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-pink-500" />
                        State
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[120px] font-semibold text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-emerald-500" />
                        Salary
                      </div>
                    </TableHead>
                    <TableHead className="w-[100px] font-semibold text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-indigo-500" />
                        Status
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((employee, index) => (
                    <TableRow 
                      key={employee.id} 
                      className={`hover:bg-purple-50/50 dark:hover:bg-purple-950/20 transition-colors ${
                        index % 2 === 0 ? 'bg-white dark:bg-background' : 'bg-gray-50/50 dark:bg-gray-950/30'
                      }`}
                    >
                      <TableCell className="py-4">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(employee)}
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            title="Edit employee"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(employee.id)}
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            title="Delete employee"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                            <IdCard className="h-3 w-3 text-blue-600" />
                          </div>
                          <span className="font-mono text-sm font-medium">{employee.employee_id}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-green-100 dark:bg-green-900/30 rounded">
                            <User className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-gray-100">{employee.full_name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-orange-100 dark:bg-orange-900/30 rounded">
                            <Phone className="h-3 w-3 text-orange-600" />
                          </div>
                          <span className="font-mono text-sm">{employee.contact_no}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                            <Mail className="h-3 w-3 text-blue-600" />
                          </div>
                          <span className="text-sm text-gray-700 dark:text-gray-300">{employee.email_id}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-pink-100 dark:bg-pink-900/30 rounded">
                            <MapPin className="h-3 w-3 text-pink-600" />
                          </div>
                          <span className="text-sm">{employee.state || 'N/A'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-emerald-100 dark:bg-emerald-900/30 rounded">
                            <IndianRupee className="h-3 w-3 text-emerald-600" />
                          </div>
                          <span className="text-sm font-medium">
                            {employee.salary ? `₹${parseFloat(employee.salary).toLocaleString()}` : 'N/A'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge 
                          variant={employee.status === 'active' ? "default" : "secondary"}
                          className={`${
                            employee.status === 'active' 
                              ? 'bg-green-100 text-green-800 border-green-200' 
                              : 'bg-orange-100 text-orange-800 border-orange-200'
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            {employee.status === 'active' ? (
                              <UserCheck className="h-3 w-3" />
                            ) : (
                              <UserX className="h-3 w-3" />
                            )}
                            {employee.status || 'Active'}
                          </div>
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeMasterContent;
