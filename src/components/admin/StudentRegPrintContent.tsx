import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Printer, 
  Search, 
  Users, 
  GraduationCap, 
  User, 
  Phone, 
  Calendar,
  MapPin,
  Mail,
  Award,
  Download,
  Eye,
  Clock,
  Building
} from "lucide-react";

const StudentRegPrintContent = () => {
  const [searchValue, setSearchValue] = useState("");

  const handlePrintReceipt = () => {
    window.print();
  };

  const handlePreview = () => {
    // Preview functionality
    console.log("Preview document");
  };

  const handleDownload = () => {
    // Download functionality
    console.log("Download document");
  };

  // Enhanced statistics data
  const stats = [
    { 
      label: "Total Registrations", 
      value: "2,847", 
      icon: Users, 
      color: "primary",
      trend: "+12.5%",
      description: "New registrations this month"
    },
    { 
      label: "Active Students", 
      value: "2,634", 
      icon: GraduationCap, 
      color: "accent",
      trend: "+8.3%",
      description: "Currently enrolled students"
    },
    { 
      label: "Certificates Issued", 
      value: "1,847", 
      icon: Award, 
      color: "secondary",
      trend: "+15.2%",
      description: "Certificates printed today"
    },
    { 
      label: "Print Queue", 
      value: "156", 
      icon: Clock, 
      color: "muted",
      trend: "-5.1%",
      description: "Pending print requests"
    }
  ];

  const getStatCardClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-gradient-to-br from-primary/15 to-primary/5 border-primary/30 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20";
      case "accent":
        return "bg-gradient-to-br from-accent/15 to-accent/5 border-accent/30 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20";
      case "secondary":
        return "bg-gradient-to-br from-secondary/15 to-secondary/5 border-secondary/30 hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/20";
      case "muted":
        return "bg-gradient-to-br from-muted/30 to-muted/10 border-muted-foreground/30 hover:border-muted-foreground/50 hover:shadow-lg";
      default:
        return "bg-gradient-to-br from-muted/10 to-muted/5 border-border hover:border-border/60";
    }
  };

  const getIconClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "text-primary bg-primary/10 p-2 rounded-lg";
      case "accent":
        return "text-accent bg-accent/10 p-2 rounded-lg";
      case "secondary":
        return "text-secondary bg-secondary/10 p-2 rounded-lg";
      case "muted":
        return "text-muted-foreground bg-muted/20 p-2 rounded-lg";
      default:
        return "text-muted-foreground bg-muted/10 p-2 rounded-lg";
    }
  };

  const getTrendColor = (trend: string) => {
    return trend.startsWith('+') ? 'text-green-600' : 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Enhanced Header with Actions */}
      <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-xl border-b border-border/40 shadow-sm">
        <div className="px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                    Student Registration Print
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">Generate and manage student registration certificates</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10 w-72 bg-background/60 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-200"
                  placeholder="Search by student name or ID..."
                />
              </div>
              <Button variant="outline" className="border-border/50 hover:border-primary/50 transition-colors">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Separator orientation="vertical" className="h-8" />
              <Button 
                onClick={handlePreview}
                variant="outline"
                className="border-border/50 hover:border-accent/50 transition-colors"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button 
                onClick={handleDownload}
                variant="outline"
                className="border-border/50 hover:border-secondary/50 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button 
                onClick={handlePrintReceipt}
                className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Certificate
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Enhanced Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className={`transition-all duration-300 hover:scale-105 cursor-pointer ${getStatCardClasses(stat.color)}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${getTrendColor(stat.trend)}`}>
                        {stat.trend}
                      </span>
                      <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                  </div>
                  <stat.icon className={`h-10 w-10 ${getIconClasses(stat.color)}`} />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Registration Certificate */}
        <Card className="shadow-2xl bg-gradient-to-br from-card via-card/95 to-card/90 border-border/50 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 border-b border-border/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    Student Registration Certificate
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Official academic registration document</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-primary/15 text-primary border-primary/30 px-4 py-2">
                  <FileText className="h-3 w-3 mr-1" />
                  Official Document
                </Badge>
                <Badge variant="outline" className="border-accent/30 text-accent px-4 py-2">
                  <Clock className="h-3 w-3 mr-1" />
                  Generated Today
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-10">
            {/* Enhanced Institute Header */}
            <div className="flex items-center justify-between mb-16 pb-10 border-b-2 border-dashed border-border/30">
              {/* Logo */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 via-primary/15 to-primary/10 border-4 border-primary/40 flex items-center justify-center shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full"></div>
                    <div className="text-center relative z-10">
                      <div className="text-lg font-bold text-primary">B SOFT</div>
                      <div className="text-xs text-primary/90 leading-tight">Computer &</div>
                      <div className="text-xs text-primary/90 leading-tight">Technical</div>
                      <div className="text-xs text-primary/90 leading-tight">Institute</div>
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Enhanced Institute Details */}
              <div className="flex-1 text-center px-12">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-4 leading-tight">
                  B SOFT Computer & Technical Institute
                </h1>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm leading-relaxed">
                      Near Union Bank Of India, Bina Soft Educational & Welfare Society
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Building className="h-4 w-4 text-primary" />
                    <span className="text-sm leading-relaxed">
                      Vill & Post BILARIYAGAN J, AZAMGARH-276121
                    </span>
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Accredited Institution</span>
                </div>
              </div>

              {/* Enhanced Contact Info */}
              <div className="flex-shrink-0 space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>infobinasoft@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+91 XXXXX XXXXX</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Est. 2020</span>
                </div>
              </div>
            </div>

            {/* Enhanced Registration Form */}
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-3">Student Registration Details</h2>
                <p className="text-muted-foreground mb-4">Complete academic enrollment information</p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="w-8 h-1 bg-primary rounded-full"></div>
                  <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
                  <div className="w-8 h-1 bg-primary/30 rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Enhanced Left Column */}
                <div className="space-y-10">
                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                      <div className="p-1 bg-primary/10 rounded">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      Student Full Name
                    </label>
                    <div className="relative">
                      <div className="border-b-2 border-dotted border-border/60 group-hover:border-primary/40 h-10 bg-gradient-to-r from-muted/20 to-muted/10 rounded-sm transition-colors duration-200"></div>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
                    </div>
                  </div>

                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                      <div className="p-1 bg-accent/10 rounded">
                        <GraduationCap className="h-4 w-4 text-accent" />
                      </div>
                      Course Category
                    </label>
                    <div className="relative">
                      <div className="border-b-2 border-dotted border-border/60 group-hover:border-accent/40 h-10 bg-gradient-to-r from-muted/20 to-muted/10 rounded-sm transition-colors duration-200"></div>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></div>
                    </div>
                  </div>

                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                      <div className="p-1 bg-secondary/10 rounded">
                        <FileText className="h-4 w-4 text-secondary" />
                      </div>
                      Course Name
                    </label>
                    <div className="relative">
                      <div className="border-b-2 border-dotted border-border/60 group-hover:border-secondary/40 h-10 bg-gradient-to-r from-muted/20 to-muted/10 rounded-sm transition-colors duration-200"></div>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></div>
                    </div>
                  </div>

                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                      <div className="p-1 bg-primary/10 rounded">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      Father's Name
                    </label>
                    <div className="relative">
                      <div className="border-b-2 border-dotted border-border/60 group-hover:border-primary/40 h-10 bg-gradient-to-r from-muted/20 to-muted/10 rounded-sm transition-colors duration-200"></div>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
                    </div>
                  </div>

                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                      <div className="p-1 bg-accent/10 rounded">
                        <User className="h-4 w-4 text-accent" />
                      </div>
                      Mother's Name
                    </label>
                    <div className="relative">
                      <div className="border-b-2 border-dotted border-border/60 group-hover:border-accent/40 h-10 bg-gradient-to-r from-muted/20 to-muted/10 rounded-sm transition-colors duration-200"></div>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Right Column */}
                <div className="space-y-10">
                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                      <div className="p-1 bg-secondary/10 rounded">
                        <Building className="h-4 w-4 text-secondary" />
                      </div>
                      Study Center Code
                    </label>
                    <div className="relative">
                      <div className="border-b-2 border-dotted border-border/60 group-hover:border-secondary/40 h-10 bg-gradient-to-r from-muted/20 to-muted/10 rounded-sm transition-colors duration-200"></div>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></div>
                    </div>
                  </div>

                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                      <div className="p-1 bg-primary/10 rounded">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      Date of Birth
                    </label>
                    <div className="relative">
                      <div className="border-b-2 border-dotted border-border/60 group-hover:border-primary/40 h-10 bg-gradient-to-r from-muted/20 to-muted/10 rounded-sm transition-colors duration-200"></div>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
                    </div>
                  </div>

                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                      <div className="p-1 bg-accent/10 rounded">
                        <Phone className="h-4 w-4 text-accent" />
                      </div>
                      Mobile Number
                    </label>
                    <div className="relative">
                      <div className="border-b-2 border-dotted border-border/60 group-hover:border-accent/40 h-10 bg-gradient-to-r from-muted/20 to-muted/10 rounded-sm transition-colors duration-200"></div>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></div>
                    </div>
                  </div>

                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                      <div className="p-1 bg-secondary/10 rounded">
                        <FileText className="h-4 w-4 text-secondary" />
                      </div>
                      Student ID
                    </label>
                    <div className="relative">
                      <div className="border-b-2 border-dotted border-border/60 group-hover:border-secondary/40 h-10 bg-gradient-to-r from-muted/20 to-muted/10 rounded-sm transition-colors duration-200"></div>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></div>
                    </div>
                  </div>

                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                      <div className="p-1 bg-primary/10 rounded">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      Registration Date
                    </label>
                    <div className="relative">
                      <div className="border-b-2 border-dotted border-border/60 group-hover:border-primary/40 h-10 bg-gradient-to-r from-muted/20 to-muted/10 rounded-sm transition-colors duration-200"></div>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Footer */}
            <div className="mt-16 pt-10 border-t-2 border-dashed border-border/30">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="w-16 h-0.5 bg-primary mx-auto mb-4"></div>
                  <p className="text-sm font-medium text-foreground">Student Signature</p>
                  <p className="text-xs text-muted-foreground">Date: ___________</p>
                </div>
                <div className="space-y-2">
                  <div className="w-16 h-0.5 bg-accent mx-auto mb-4"></div>
                  <p className="text-sm font-medium text-foreground">Center Head Signature</p>
                  <p className="text-xs text-muted-foreground">Date: ___________</p>
                </div>
                <div className="space-y-2">
                  <div className="w-16 h-0.5 bg-secondary mx-auto mb-4"></div>
                  <p className="text-sm font-medium text-foreground">Official Seal</p>
                  <p className="text-xs text-muted-foreground">Institution Stamp</p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This is an official registration document generated by B SOFT Computer & Technical Institute.<br />
                  For verification, please contact us at infobinasoft@gmail.com or visit our campus.
                </p>
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span>Document ID: REG-{Date.now()}</span>
                  <span>•</span>
                  <span>Generated: {new Date().toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Valid from: {new Date().getFullYear()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegPrintContent;