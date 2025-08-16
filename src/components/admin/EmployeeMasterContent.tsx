import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Edit, Trash2, Loader2, Search, TrendingUp, UserCheck, UserX, BarChart3, IndianRupee } from "lucide-react";
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
        <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
                <p className="text-3xl font-bold text-primary">{stats.total}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-success/5 to-success/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-3xl font-bold text-success">{stats.active}</p>
              </div>
              <div className="p-3 bg-success/10 rounded-full">
                <UserCheck className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-warning/5 to-warning/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inactive</p>
                <p className="text-3xl font-bold text-warning">{stats.inactive}</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-full">
                <UserX className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-accent/5 to-accent/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Salary</p>
                <p className="text-3xl font-bold text-accent">₹{stats.avgSalary.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-accent/10 rounded-full">
                <IndianRupee className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Master Form */}
      <Card className="border-0 shadow-xl bg-card">
        <CardHeader className="p-6 border-b">
          <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Employee ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Employee ID
              </label>
              <Input
                value={formData.employeeId}
                onChange={(e) => handleInputChange('employeeId', e.target.value)}
                className="h-11 bg-muted"
                readOnly
              />
            </div>

            {/* Employee Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Employee Password
              </label>
              <Input
                value={formData.employeePassword}
                onChange={(e) => handleInputChange('employeePassword', e.target.value)}
                className="h-11 bg-muted"
                readOnly
              />
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Full Name *
              </label>
              <Input
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="h-11"
                placeholder="Enter full name"
              />
            </div>

            {/* Father Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Father Name
              </label>
              <Input
                value={formData.fatherName}
                onChange={(e) => handleInputChange('fatherName', e.target.value)}
                className="h-11"
                placeholder="Enter father name"
              />
            </div>

            {/* Contact No */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Contact No *
              </label>
              <Input
                value={formData.contactNo}
                onChange={(e) => handleInputChange('contactNo', e.target.value)}
                className="h-11"
                placeholder="Enter contact number"
              />
            </div>

            {/* Email ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email ID *
              </label>
              <Input
                type="email"
                value={formData.emailId}
                onChange={(e) => handleInputChange('emailId', e.target.value)}
                className="h-11"
                placeholder="Enter email address"
              />
            </div>

            {/* Country */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Country
              </label>
              <Input
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="h-11 bg-muted"
                readOnly
              />
            </div>

            {/* State */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                State
              </label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="---Please Select---" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* District */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                District
              </label>
              <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="---Please Select---" />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Pincode */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Pincode
              </label>
              <Input
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                className="h-11"
                placeholder="Enter pincode"
              />
            </div>

            {/* Salary */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Salary
              </label>
              <Input
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                className="h-11"
                placeholder="Enter salary"
              />
            </div>

            {/* Registration Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Registration Date
              </label>
              <Input
                type="date"
                value={formData.registrationDate}
                onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                className="h-11"
              />
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Address
              </label>
              <Textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="min-h-[80px] resize-none"
                placeholder="Enter address"
              />
            </div>

            {/* Other Details */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Other Details
              </label>
              <Textarea
                value={formData.otherDetails}
                onChange={(e) => handleInputChange('otherDetails', e.target.value)}
                className="min-h-[80px] resize-none"
                placeholder="Enter other details"
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-foreground">
                Photo Upload
              </label>
              <div className="border border-border rounded-lg p-4 bg-background">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      id="employee-photo-file"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Button
                      variant="outline"
                      className="h-10"
                    >
                      Choose file
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formData.photoUpload ? formData.photoUpload.name : "No file chosen"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit and Reset Buttons */}
          <div className="flex gap-4 pt-6">
            <Button onClick={handleSubmit} className="h-11 px-8">
              {editingEmployee ? 'Update Employee' : 'Add Employee'}
            </Button>
            <Button variant="outline" onClick={handleReset} className="h-11 px-8">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter Controls */}
      <Card className="border-0 shadow-lg bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees by name, ID, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40 h-11">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48 h-11">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="name">By Name</SelectItem>
                <SelectItem value="salary">By Salary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employee Master Table */}
      <Card className="border-0 shadow-xl bg-card">
        <CardHeader className="p-6 border-b">
          <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            Employee Master
            <Badge variant="secondary" className="ml-auto">
              {filteredData.length} {filteredData.length === 1 ? 'Employee' : 'Employees'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredData.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No employees found</h3>
              <p className="text-muted-foreground">
                {searchTerm ? "Try adjusting your search terms" : "Start by adding your first employee"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Actions</TableHead>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead className="w-24">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(employee)}
                            className="h-8 w-8 p-0 text-primary hover:text-primary hover:bg-primary/10"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(employee.id)}
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {employee.employee_id}
                      </TableCell>
                      <TableCell className="font-medium">
                        {employee.full_name}
                      </TableCell>
                      <TableCell className="text-sm">
                        {employee.contact_no}
                      </TableCell>
                      <TableCell className="text-sm">
                        {employee.email_id}
                      </TableCell>
                      <TableCell className="text-sm">
                        {employee.state || 'N/A'}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {employee.salary ? `₹${parseFloat(employee.salary).toLocaleString()}` : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={employee.status === 'active' ? "default" : "secondary"}>
                          {employee.status || 'Active'}
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
