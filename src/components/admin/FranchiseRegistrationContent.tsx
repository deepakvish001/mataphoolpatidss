import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building, Edit, Trash2, Loader2, FileText, Users, CheckCircle, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";

interface FranchiseRegistration {
  id: string;
  franchise_type: string;
  institute_sort_name: string;
  institute_full_name: string;
  year_of_establishment: string;
  postal_address: string;
  pin_code: string;
  city_town_village?: string;
  state_name: string;
  district_name: string;
  state_sort_name: string;
  district_sort_name: string;
  date_of_registration: string;
  mobile_country_code: string;
  mobile_number: string;
  email: string;
  centre_head_name: string;
  designation: string;
  head_state: string;
  head_district: string;
  head_postal_address: string;
  head_pin_code: string;
  head_mobile_number: string;
  head_email: string;
  head_date_of_birth?: string;
  gender?: string;
  educational_qualification?: string;
  experience?: string;
  marital_status?: string;
  religion?: string;
  infrastructure_data?: any;
  internet_connectivity?: string;
  connectivity_type?: string;
  internet_speed?: string;
  number_of_servers?: string;
  server_remark?: string;
  operating_system?: string;
  os_remark?: string;
  antivirus?: string;
  antivirus_remark?: string;
  printers_scanner?: string;
  printer_remark?: string;
  power_backup?: string;
  power_remark?: string;
  type_of_faculties?: string;
  number_of_faculties?: string;
  faculty_indicate?: string;
  documents?: any;
  status: string;
  approval_status: string;
  created_at: string;
}

const FranchiseRegistrationContent = () => {
  const {
    data: franchiseRegistrations,
    loading,
    create,
    update,
    delete: deleteItem,
    refresh
  } = useOptimisticCrud<FranchiseRegistration>({ 
    tableName: 'franchise_registrations',
    orderBy: { column: 'created_at', ascending: false }
  });

  useAdminRealTime({
    tableName: 'franchise_registrations'
  });

  // Institute Information
  const [franchiseType, setFranchiseType] = useState("");
  const [instituteSortName, setInstituteSortName] = useState("");
  const [instituteFullName, setInstituteFullName] = useState("");
  const [yearOfEstablishment, setYearOfEstablishment] = useState("");
  const [postalAddress, setPostalAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [cityTownVillage, setCityTownVillage] = useState("");
  const [stateName, setStateName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [stateSortName, setStateSortName] = useState("");
  const [districtSortName, setDistrictSortName] = useState("");
  const [dateOfRegistration, setDateOfRegistration] = useState("");
  const [mobileCountryCode, setMobileCountryCode] = useState("+91");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");

  // Centre Head Information
  const [centreHeadName, setCentreHeadName] = useState("");
  const [designation, setDesignation] = useState("");
  const [headState, setHeadState] = useState("");
  const [headDistrict, setHeadDistrict] = useState("");
  const [headPostalAddress, setHeadPostalAddress] = useState("");
  const [headPinCode, setHeadPinCode] = useState("");
  const [headMobileNumber, setHeadMobileNumber] = useState("");
  const [headEmail, setHeadEmail] = useState("");
  const [headDateOfBirth, setHeadDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [educationalQualification, setEducationalQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [religion, setReligion] = useState("");

  // Infrastructure Facility
  const [infrastructureData, setInfrastructureData] = useState({
    directorRoom: { indicate: "", numberOfRoom: "", remark: "" },
    officeRoom: { indicate: "", numberOfRoom: "", remark: "" },
    theoryRoom: { indicate: "", numberOfRoom: "", remark: "" },
    practicalRoom: { indicate: "", numberOfRoom: "", remark: "" },
    staffRoom: { indicate: "", numberOfRoom: "", remark: "" },
    library: { indicate: "", numberOfRoom: "", remark: "" },
    reception: { indicate: "", numberOfRoom: "", remark: "" },
    waitingRoom: { indicate: "", numberOfRoom: "", remark: "" },
    toilet: { indicate: "", numberOfRoom: "", remark: "" },
    anyOtherRoom: { indicate: "", numberOfRoom: "", remark: "" }
  });

  // Connectivity & Software
  const [internetConnectivity, setInternetConnectivity] = useState("");
  const [connectivityType, setConnectivityType] = useState("");
  const [internetSpeed, setInternetSpeed] = useState("0.00 mb/second");
  const [numberOfServers, setNumberOfServers] = useState("");
  const [serverRemark, setServerRemark] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [osRemark, setOsRemark] = useState("");
  const [antivirus, setAntivirus] = useState("");
  const [antivirusRemark, setAntivirusRemark] = useState("");
  const [printersScanner, setPrintersScanner] = useState("");
  const [printerRemark, setPrinterRemark] = useState("");
  const [powerBackup, setPowerBackup] = useState("");
  const [powerRemark, setPowerRemark] = useState("");

  // Faculty Details
  const [typeOfFaculties, setTypeOfFaculties] = useState("");
  const [numberOfFaculties, setNumberOfFaculties] = useState("");
  const [facultyIndicate, setFacultyIndicate] = useState("");

  // Upload Documents
  const [documents, setDocuments] = useState({
    headPhoto: null,
    aadharCard: null,
    tradeLicense: null,
    labRoomPhoto: null,
    officeRoomPhoto: null,
    frontSidePhoto: null,
    lastQualification: null
  });

  // Declaration
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = async () => {
    if (!franchiseType || !instituteSortName || !instituteFullName || !yearOfEstablishment || 
        !postalAddress || !pinCode || !stateName || !districtName || !dateOfRegistration || 
        !mobileNumber || !email || !centreHeadName || !designation || !acceptTerms) {
      toast.error("Please fill in all required fields and accept terms");
      return;
    }

    try {
      await create({
        franchise_type: franchiseType,
        institute_sort_name: instituteSortName,
        institute_full_name: instituteFullName,
        year_of_establishment: yearOfEstablishment,
        postal_address: postalAddress,
        pin_code: pinCode,
        city_town_village: cityTownVillage,
        state_name: stateName,
        district_name: districtName,
        state_sort_name: stateSortName,
        district_sort_name: districtSortName,
        date_of_registration: dateOfRegistration,
        mobile_country_code: mobileCountryCode,
        mobile_number: mobileNumber,
        email: email,
        centre_head_name: centreHeadName,
        designation: designation,
        head_state: headState,
        head_district: headDistrict,
        head_postal_address: headPostalAddress,
        head_pin_code: headPinCode,
        head_mobile_number: headMobileNumber,
        head_email: headEmail,
        head_date_of_birth: headDateOfBirth,
        gender: gender,
        educational_qualification: educationalQualification,
        experience: experience,
        marital_status: maritalStatus,
        religion: religion,
        infrastructure_data: infrastructureData,
        internet_connectivity: internetConnectivity,
        connectivity_type: connectivityType,
        internet_speed: internetSpeed,
        number_of_servers: numberOfServers,
        server_remark: serverRemark,
        operating_system: operatingSystem,
        os_remark: osRemark,
        antivirus: antivirus,
        antivirus_remark: antivirusRemark,
        printers_scanner: printersScanner,
        printer_remark: printerRemark,
        power_backup: powerBackup,
        power_remark: powerRemark,
        type_of_faculties: typeOfFaculties,
        number_of_faculties: numberOfFaculties,
        faculty_indicate: facultyIndicate,
        documents: documents,
        status: 'pending',
        approval_status: 'pending'
      });

      handleReset();
      toast.success("Franchise registration submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit franchise registration");
    }
  };

  const handleReset = () => {
    setFranchiseType("");
    setInstituteSortName("");
    setInstituteFullName("");
    setYearOfEstablishment("");
    setPostalAddress("");
    setPinCode("");
    setCityTownVillage("");
    setStateName("");
    setDistrictName("");
    setStateSortName("");
    setDistrictSortName("");
    setDateOfRegistration("");
    setMobileCountryCode("+91");
    setMobileNumber("");
    setEmail("");
    setCentreHeadName("");
    setDesignation("");
    setHeadState("");
    setHeadDistrict("");
    setHeadPostalAddress("");
    setHeadPinCode("");
    setHeadMobileNumber("");
    setHeadEmail("");
    setHeadDateOfBirth("");
    setGender("");
    setEducationalQualification("");
    setExperience("");
    setMaritalStatus("");
    setReligion("");
    setInfrastructureData({
      directorRoom: { indicate: "", numberOfRoom: "", remark: "" },
      officeRoom: { indicate: "", numberOfRoom: "", remark: "" },
      theoryRoom: { indicate: "", numberOfRoom: "", remark: "" },
      practicalRoom: { indicate: "", numberOfRoom: "", remark: "" },
      staffRoom: { indicate: "", numberOfRoom: "", remark: "" },
      library: { indicate: "", numberOfRoom: "", remark: "" },
      reception: { indicate: "", numberOfRoom: "", remark: "" },
      waitingRoom: { indicate: "", numberOfRoom: "", remark: "" },
      toilet: { indicate: "", numberOfRoom: "", remark: "" },
      anyOtherRoom: { indicate: "", numberOfRoom: "", remark: "" }
    });
    setInternetConnectivity("");
    setConnectivityType("");
    setInternetSpeed("0.00 mb/second");
    setNumberOfServers("");
    setServerRemark("");
    setOperatingSystem("");
    setOsRemark("");
    setAntivirus("");
    setAntivirusRemark("");
    setPrintersScanner("");
    setPrinterRemark("");
    setPowerBackup("");
    setPowerRemark("");
    setTypeOfFaculties("");
    setNumberOfFaculties("");
    setFacultyIndicate("");
    setDocuments({
      headPhoto: null,
      aadharCard: null,
      tradeLicense: null,
      labRoomPhoto: null,
      officeRoomPhoto: null,
      frontSidePhoto: null,
      lastQualification: null
    });
    setAcceptTerms(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this registration?")) return;
    
    try {
      await deleteItem(id);
      toast.success("Registration deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete registration");
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-none bg-gradient-to-br from-background via-background/95 to-secondary/10 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading franchise registrations...</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalRegistrations = franchiseRegistrations?.length || 0;
  const pendingRegistrations = franchiseRegistrations?.filter(reg => reg.approval_status === 'pending').length || 0;
  const approvedRegistrations = franchiseRegistrations?.filter(reg => reg.approval_status === 'approved').length || 0;
  const thisMonthRegistrations = franchiseRegistrations?.filter(reg => {
    const regDate = new Date(reg.created_at);
    const now = new Date();
    return regDate.getMonth() === now.getMonth() && regDate.getFullYear() === now.getFullYear();
  }).length || 0;

  const updateInfrastructure = (roomType: string, field: string, value: string) => {
    setInfrastructureData(prev => ({
      ...prev,
      [roomType]: {
        ...prev[roomType as keyof typeof prev],
        [field]: value
      }
    }));
  };

  return (
    <div className="w-full max-w-none bg-gradient-to-br from-background via-background/95 to-secondary/10 min-h-screen">
      {/* Statistics Dashboard */}
      <div className="px-6 -mt-6 relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-muted to-muted/80 text-muted-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Registrations</p>
                  <p className="text-3xl font-bold text-foreground">{totalRegistrations}</p>
                </div>
                <div className="p-3 rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                  <p className="text-3xl font-bold text-foreground">{pendingRegistrations}</p>
                </div>
                <div className="p-3 rounded-full bg-amber-500/10">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-3xl font-bold text-foreground">{approvedRegistrations}</p>
                </div>
                <div className="p-3 rounded-full bg-green-500/10">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-3xl font-bold text-foreground">{thisMonthRegistrations}</p>
                </div>
                <div className="p-3 rounded-full bg-blue-500/10">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 max-w-7xl mx-auto space-y-8">
        <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-background/95 backdrop-blur-sm">
          
          {/* Institute Information */}
          <div className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium border-b-2 border-border rounded-t-lg">
            Institute Information
          </div>
          
          <div className="p-6 space-y-6">
            {/* Franchise Type */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-secondary/50 text-secondary-foreground p-3 rounded-md">
                Franchise Type *
              </label>
              <div className="col-span-2">
                <Select value={franchiseType} onValueChange={setFranchiseType}>
                  <SelectTrigger className="w-full border-input bg-background/60">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="type1">Type 1</SelectItem>
                    <SelectItem value="type2">Type 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Name of the Institute */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-secondary/50 text-secondary-foreground p-3 rounded-md">
                Name of the Institute *
              </label>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <Input
                  placeholder="Please Enter Institute Sort Name"
                  value={instituteSortName}
                  onChange={(e) => setInstituteSortName(e.target.value)}
                  className="border-input bg-background/60"
                />
                <Input
                  placeholder="Please Enter Institute Full Name"
                  value={instituteFullName}
                  onChange={(e) => setInstituteFullName(e.target.value)}
                  className="border-input bg-background/60"
                />
              </div>
            </div>

            {/* Year of Establishment */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-pink-100 p-3">
                Year of Establishment *
              </label>
              <div className="col-span-2">
                <Select value={yearOfEstablishment} onValueChange={setYearOfEstablishment}>
                  <SelectTrigger className="w-full border-gray-400">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2020">2020</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Postal Address */}
            <div className="grid grid-cols-3 items-start gap-4">
              <label className="text-sm font-medium bg-pink-100 p-3">
                Postal Address of the Institute *
              </label>
              <div className="col-span-2">
                <Textarea
                  value={postalAddress}
                  onChange={(e) => setPostalAddress(e.target.value)}
                  className="border-gray-400 min-h-[80px]"
                />
              </div>
            </div>

            {/* Pin Code */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-pink-100 p-3">
                Pin Code *
              </label>
              <div className="col-span-2">
                <Input
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="border-gray-400"
                />
              </div>
            </div>

            {/* City / Town / Village */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-pink-100 p-3">
                City / Town / Village
              </label>
              <div className="col-span-2">
                <Input
                  value={cityTownVillage}
                  onChange={(e) => setCityTownVillage(e.target.value)}
                  className="border-gray-400"
                />
              </div>
            </div>

            {/* State Name & District Name */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-pink-100 p-3">
                State Name & District Name *
              </label>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <Select value={stateName} onValueChange={setStateName}>
                  <SelectTrigger className="border-gray-400">
                    <SelectValue placeholder="----------Select State--------------" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                    <SelectItem value="bihar">Bihar</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={districtName} onValueChange={setDistrictName}>
                  <SelectTrigger className="border-gray-400">
                    <SelectValue placeholder="-------------Select Distt--------------" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="azamgarh">Azamgarh</SelectItem>
                    <SelectItem value="lucknow">Lucknow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* State Sort Name & District Sort Name */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-pink-100 p-3">
                State Sort Name & District Sort Name *
              </label>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <Input
                  placeholder="Please Enter State Sort Name"
                  value={stateSortName}
                  onChange={(e) => setStateSortName(e.target.value)}
                  className="border-gray-400"
                />
                <Input
                  placeholder="Please Enter District Sort Name"
                  value={districtSortName}
                  onChange={(e) => setDistrictSortName(e.target.value)}
                  className="border-gray-400"
                />
              </div>
            </div>

            {/* Date Of Registration */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-pink-100 p-3">
                Date.Of.Registration * (dd/Mon/yyyy)
              </label>
              <div className="col-span-2">
                <Input
                  type="date"
                  value={dateOfRegistration}
                  onChange={(e) => setDateOfRegistration(e.target.value)}
                  className="border-gray-400"
                />
              </div>
            </div>

            {/* Mobile */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-pink-100 p-3">
                Mobile *
              </label>
              <div className="col-span-2 grid grid-cols-4 gap-4">
                <Select value={mobileCountryCode} onValueChange={setMobileCountryCode}>
                  <SelectTrigger className="border-gray-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="+91">+91</SelectItem>
                    <SelectItem value="+1">+1</SelectItem>
                  </SelectContent>
                </Select>
                <div className="col-span-3">
                  <Input
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="border-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-pink-100 p-3">
                Email *
              </label>
              <div className="col-span-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Information About Centre Head */}
          <div className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium border-b-2 border-border">
            Information About Centre Head
          </div>

          <div className="p-6 space-y-6">
            {/* Name of the Centre Head */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-yellow-100 p-3">
                Name of the Centre Head *
              </label>
              <div className="col-span-2">
                <Input
                  value={centreHeadName}
                  onChange={(e) => setCentreHeadName(e.target.value)}
                  className="border-gray-400"
                />
              </div>
            </div>

            {/* Designing / Position Hold */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-yellow-100 p-3">
                Designing / Position Hold *
              </label>
              <div className="col-span-2">
                <Input
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="border-gray-400"
                />
              </div>
            </div>

            {/* State */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-yellow-100 p-3">
                State *
              </label>
              <div className="col-span-2">
                <Select value={headState} onValueChange={setHeadState}>
                  <SelectTrigger className="border-gray-400">
                    <SelectValue placeholder="-------------Select State-------------" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                    <SelectItem value="bihar">Bihar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* District */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-yellow-100 p-3">
                District *
              </label>
              <div className="col-span-2">
                <Select value={headDistrict} onValueChange={setHeadDistrict}>
                  <SelectTrigger className="border-gray-400">
                    <SelectValue placeholder="-------------Select Distt-------------" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="azamgarh">Azamgarh</SelectItem>
                    <SelectItem value="lucknow">Lucknow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Postal Address of the Centre Head */}
            <div className="grid grid-cols-3 items-start gap-4">
              <label className="text-sm font-medium bg-yellow-100 p-3">
                Postal Address of the Centre Head *
              </label>
              <div className="col-span-2">
                <Textarea
                  value={headPostalAddress}
                  onChange={(e) => setHeadPostalAddress(e.target.value)}
                  className="border-gray-400 min-h-[80px]"
                />
              </div>
            </div>

            {/* Pin Code & Mobile Number */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-yellow-100 p-3">
                Pin Code & Mobile Number *
              </label>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <Input
                  placeholder="Enter Pin Code"
                  value={headPinCode}
                  onChange={(e) => setHeadPinCode(e.target.value)}
                  className="border-gray-400"
                />
                <Input
                  placeholder="Enter Mobile Number"
                  value={headMobileNumber}
                  onChange={(e) => setHeadMobileNumber(e.target.value)}
                  className="border-gray-400"
                />
              </div>
            </div>

            {/* Email & Date of Birth */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-yellow-100 p-3">
                Email & Date of Birth of the Centre Head *
              </label>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <Input
                  placeholder="Enter Email-ID"
                  value={headEmail}
                  onChange={(e) => setHeadEmail(e.target.value)}
                  className="border-gray-400"
                />
                <Input
                  placeholder="Enter Birth of the Centre Head"
                  value={headDateOfBirth}
                  onChange={(e) => setHeadDateOfBirth(e.target.value)}
                  className="border-gray-400"
                />
              </div>
            </div>

            {/* Gender */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-yellow-100 p-3">
                Gender *
              </label>
              <div className="col-span-2">
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="border-gray-400">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Educational Qualification */}
            <div className="grid grid-cols-3 items-start gap-4">
              <label className="text-sm font-medium bg-yellow-100 p-3">
                Educational Qualification of the Centre Head *
              </label>
              <div className="col-span-2">
                <Textarea
                  value={educationalQualification}
                  onChange={(e) => setEducationalQualification(e.target.value)}
                  className="border-gray-400 min-h-[80px]"
                />
              </div>
            </div>

            {/* Experience */}
            <div className="grid grid-cols-3 items-start gap-4">
              <label className="text-sm font-medium bg-yellow-100 p-3">
                Experience of the Centre Head *
              </label>
              <div className="col-span-2">
                <Textarea
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="border-gray-400 min-h-[80px]"
                />
              </div>
            </div>

            {/* Marital Status & Religion */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-yellow-100 p-3">
                Marital Status & Religion of the Centre Head *
              </label>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <Select value={maritalStatus} onValueChange={setMaritalStatus}>
                  <SelectTrigger className="border-gray-400">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={religion} onValueChange={setReligion}>
                  <SelectTrigger className="border-gray-400">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hindu">Hindu</SelectItem>
                    <SelectItem value="muslim">Muslim</SelectItem>
                    <SelectItem value="christian">Christian</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Available Infrastructure Facility */}
          <div className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium border-b-2 border-border">
            Available Infrastructure Facility of the Centre
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-2 border-gray-800">
                <thead>
                  <tr>
                    <th className="bg-blue-200 border-2 border-gray-800 px-4 py-3 text-green-600 font-bold text-left">
                      Room Type
                    </th>
                    <th className="bg-blue-200 border-2 border-gray-800 px-4 py-3 text-green-600 font-bold">
                      Indicate
                    </th>
                    <th className="bg-blue-200 border-2 border-gray-800 px-4 py-3 text-green-600 font-bold">
                      Number Of Room
                    </th>
                    <th className="bg-blue-200 border-2 border-gray-800 px-4 py-3 text-green-600 font-bold">
                      Quantitative Data Remark
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { key: 'directorRoom', label: 'Director Room *' },
                    { key: 'officeRoom', label: 'Office Room *' },
                    { key: 'theoryRoom', label: 'Theory Room *' },
                    { key: 'practicalRoom', label: 'Practical Room *' },
                    { key: 'staffRoom', label: 'Staff Room *' },
                    { key: 'library', label: 'Library *' },
                    { key: 'reception', label: 'Reception *' },
                    { key: 'waitingRoom', label: 'Waiting Room *' },
                    { key: 'toilet', label: 'Toilet *' },
                    { key: 'anyOtherRoom', label: 'Any Other Room *' }
                  ].map((room, index) => (
                    <tr key={room.key} className={index % 2 === 0 ? "bg-blue-100" : "bg-white"}>
                      <td className="border-2 border-gray-800 px-4 py-3 font-medium">
                        {room.label}
                      </td>
                      <td className="border-2 border-gray-800 px-4 py-3">
                        <Select 
                          value={infrastructureData[room.key as keyof typeof infrastructureData].indicate}
                          onValueChange={(value) => updateInfrastructure(room.key, 'indicate', value)}
                        >
                          <SelectTrigger className="border-gray-400">
                            <SelectValue placeholder="Select Indicate" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="yes">Yes</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="border-2 border-gray-800 px-4 py-3">
                        <Select 
                          value={infrastructureData[room.key as keyof typeof infrastructureData].numberOfRoom}
                          onValueChange={(value) => updateInfrastructure(room.key, 'numberOfRoom', value)}
                        >
                          <SelectTrigger className="border-gray-400">
                            <SelectValue placeholder="Select Number Of Room" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1</SelectItem>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="border-2 border-gray-800 px-4 py-3">
                        <Input
                          placeholder="Remark"
                          value={infrastructureData[room.key as keyof typeof infrastructureData].remark}
                          onChange={(e) => updateInfrastructure(room.key, 'remark', e.target.value)}
                          className="border-gray-400"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Connectivity & Software */}
          <div className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium border-b-2 border-border">
            Connectivity & Software of the Centre
          </div>

          <div className="p-6 space-y-6">
            {/* Internet Connectivity */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-gray-200 p-3">
                Internet Connectivity *
              </label>
              <div className="col-span-2 grid grid-cols-3 gap-4">
                <Select value={internetConnectivity} onValueChange={setInternetConnectivity}>
                  <SelectTrigger className="border-gray-400">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={connectivityType} onValueChange={setConnectivityType}>
                  <SelectTrigger className="border-gray-400">
                    <SelectValue placeholder="Select Connectivity Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="broadband">Broadband</SelectItem>
                    <SelectItem value="wifi">WiFi</SelectItem>
                    <SelectItem value="mobile">Mobile Data</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={internetSpeed}
                  onChange={(e) => setInternetSpeed(e.target.value)}
                  className="border-gray-400"
                />
              </div>
            </div>

            {/* Number Of Servers */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-gray-200 p-3">
                Number Of Servers *
              </label>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <Select value={numberOfServers} onValueChange={setNumberOfServers}>
                  <SelectTrigger className="border-gray-400">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Remark"
                  value={serverRemark}
                  onChange={(e) => setServerRemark(e.target.value)}
                  className="border-gray-400"
                />
              </div>
            </div>

            {/* Operating system */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-gray-200 p-3">
                Operating system *
              </label>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <Select value={operatingSystem} onValueChange={setOperatingSystem}>
                  <SelectTrigger className="border-gray-400">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="windows">Windows</SelectItem>
                    <SelectItem value="linux">Linux</SelectItem>
                    <SelectItem value="mac">Mac</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Remark"
                  value={osRemark}
                  onChange={(e) => setOsRemark(e.target.value)}
                  className="border-gray-400"
                />
              </div>
            </div>

            {/* Antivirus */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-gray-200 p-3">
                Antivirus *
              </label>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <Select value={antivirus} onValueChange={setAntivirus}>
                  <SelectTrigger className="border-gray-400">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Remark"
                  value={antivirusRemark}
                  onChange={(e) => setAntivirusRemark(e.target.value)}
                  className="border-gray-400"
                />
              </div>
            </div>

            {/* Printers Scanner */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-gray-200 p-3">
                Printers Scanner *
              </label>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <Select value={printersScanner} onValueChange={setPrintersScanner}>
                  <SelectTrigger className="border-gray-400">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Remark"
                  value={printerRemark}
                  onChange={(e) => setPrinterRemark(e.target.value)}
                  className="border-gray-400"
                />
              </div>
            </div>

            {/* Power Backup */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-gray-200 p-3">
                Power Backup *
              </label>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <Select value={powerBackup} onValueChange={setPowerBackup}>
                  <SelectTrigger className="border-gray-400">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Remark"
                  value={powerRemark}
                  onChange={(e) => setPowerRemark(e.target.value)}
                  className="border-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Faculty Details */}
          <div className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium border-b-2 border-border">
            Faculty Details (Please see eligibility in the Guidelines):
          </div>

          <div className="p-6 space-y-6">
            {/* Type of Faculties */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-cyan-100 p-3">
                Type of Faculties *
              </label>
              <div className="col-span-2">
                <Select value={typeOfFaculties} onValueChange={setTypeOfFaculties}>
                  <SelectTrigger className="border-gray-400">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Number of Faculties */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-cyan-100 p-3">
                Number of Faculties *
              </label>
              <div className="col-span-2">
                <Input
                  value={numberOfFaculties}
                  onChange={(e) => setNumberOfFaculties(e.target.value)}
                  className="border-gray-400"
                />
              </div>
            </div>

            {/* Indicate */}
            <div className="grid grid-cols-3 items-center gap-4">
              <label className="text-sm font-medium bg-cyan-100 p-3">
                Indicate *
              </label>
              <div className="col-span-2">
                <Select value={facultyIndicate} onValueChange={setFacultyIndicate}>
                  <SelectTrigger className="border-gray-400">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="experienced">Experienced</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Upload Documents */}
          <div className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium border-b-2 border-border">
            Upload Documents
          </div>

          <div className="p-6 space-y-6">
            {[
              { key: 'headPhoto', label: 'Colour Passport Size Photograph of the Head *', bg: 'bg-yellow-200' },
              { key: 'aadharCard', label: 'Aadhar Card of The Institute Head *', bg: 'bg-yellow-200' },
              { key: 'tradeLicense', label: 'Trade License / Registration Certificate of The Institute *', bg: 'bg-yellow-200' },
              { key: 'labRoomPhoto', label: 'Colour Photograph of Lab Room *', bg: 'bg-yellow-200' },
              { key: 'officeRoomPhoto', label: 'Colour Photograph of Office Room *', bg: 'bg-yellow-200' },
              { key: 'frontSidePhoto', label: 'Colour Photograph of Front Side of The Institute *', bg: 'bg-yellow-200' },
              { key: 'lastQualification', label: 'Upload Last Qualification *', bg: 'bg-green-200' }
            ].map((doc) => (
              <div key={doc.key} className="grid grid-cols-3 items-center gap-4">
                <label className={`text-sm font-medium ${doc.bg} p-3`}>
                  {doc.label}
                </label>
                <div className="col-span-2">
                  <Input
                    type="file"
                    className="border-gray-400"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setDocuments(prev => ({ ...prev, [doc.key]: file }));
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Declaration */}
          <div className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium border-b-2 border-border">
            Declaration
          </div>

          <div className="p-6">
            <div className="bg-green-200 p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                />
                <label htmlFor="terms" className="text-sm font-medium">
                  * I read the Terms & Conditions
                </label>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={handleSubmit}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-base font-medium"
                >
                  Submit Now
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-base font-medium"
                >
                  Reset Now
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Franchise Registrations Table */}
        {franchiseRegistrations && franchiseRegistrations.length > 0 && (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-background/95 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/50">
              <CardTitle className="text-xl font-bold text-foreground flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building className="h-5 w-5 text-primary" />
                </div>
                <span>Franchise Registrations</span>
                <span className="ml-auto text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                  {totalRegistrations} total
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                      <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Actions</TableHead>
                      <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Institute</TableHead>
                      <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Type</TableHead>
                      <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Centre Head</TableHead>
                      <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Contact</TableHead>
                      <TableHead className="text-white font-bold text-center py-4 border-r border-blue-500">Status</TableHead>
                      <TableHead className="text-white font-bold text-center py-4">Approval</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {franchiseRegistrations.map((registration, index) => (
                      <TableRow key={registration.id} className={`${index % 2 === 0 ? "bg-blue-50/50" : "bg-white"} hover:bg-blue-100/50 transition-colors`}>
                        <TableCell className="p-4 border-r border-border/50">
                          <div className="flex justify-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-primary hover:text-primary-foreground hover:bg-primary/10"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(registration.id)}
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-center p-4 border-r border-border/50">
                          <div>
                            <div className="font-semibold text-foreground">{registration.institute_sort_name}</div>
                            <div className="text-sm text-muted-foreground truncate max-w-[200px]">{registration.institute_full_name}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center p-4 border-r border-border/50 font-medium text-foreground">
                          {registration.franchise_type}
                        </TableCell>
                        <TableCell className="text-center p-4 border-r border-border/50">
                          <div>
                            <div className="font-medium text-foreground">{registration.centre_head_name}</div>
                            <div className="text-sm text-muted-foreground">{registration.designation}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center p-4 border-r border-border/50">
                          <div>
                            <div className="text-sm text-foreground">{registration.email}</div>
                            <div className="text-sm text-muted-foreground">{registration.mobile_number}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center p-4 border-r border-border/50">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            registration.status === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                            registration.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {registration.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-center p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            registration.approval_status === 'pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                            registration.approval_status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {registration.approval_status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {(!franchiseRegistrations || franchiseRegistrations.length === 0) && (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-background/95 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-muted/20 rounded-full">
                  <Building className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">No registrations found</h3>
                  <p className="text-muted-foreground">Submit your first franchise registration to get started.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FranchiseRegistrationContent;