import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Printer, Search, Users, GraduationCap, User, Phone, TrendingUp, Calendar, IdCard, Clock } from "lucide-react";

const StudentRegPrintContent = () => {
  const [searchValue, setSearchValue] = useState("");

  const handlePrintReceipt = () => {
    window.print();
  };

  // Enhanced statistics data with trends
  const stats = [
    { 
      label: "Total Registrations", 
      value: "2,847", 
      trend: "+12.5%",
      icon: Users, 
      color: "primary",
      subtitle: "This month"
    },
    { 
      label: "Active Students", 
      value: "2,634", 
      trend: "+8.3%",
      icon: GraduationCap, 
      color: "accent",
      subtitle: "Currently enrolled"
    },
    { 
      label: "Pending Approvals", 
      value: "213", 
      trend: "-5.2%",
      icon: Clock, 
      color: "secondary",
      subtitle: "Awaiting review"
    },
    { 
      label: "Print Requests", 
      value: "156", 
      trend: "+22.1%",
      icon: Printer, 
      color: "muted",
      subtitle: "Today"
    }
  ];

  const getStatCardClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:border-primary/30";
      case "accent":
        return "bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20 hover:border-accent/30";
      case "secondary":
        return "bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20 hover:border-secondary/30";
      case "muted":
        return "bg-gradient-to-br from-muted/30 to-muted/10 border-muted-foreground/20 hover:border-muted-foreground/30";
      default:
        return "bg-gradient-to-br from-muted/10 to-muted/5 border-border hover:border-border/60";
    }
  };

  const getIconClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "text-primary";
      case "accent":
        return "text-accent";
      case "secondary":
        return "text-secondary";
      case "muted":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_70%)]" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      {/* Enhanced Modern Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-lg">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 shadow-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                    Student Registration Print
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">Generate and manage registration certificates</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10 w-72 bg-background/50 border-border/40 focus:border-primary/40 focus:bg-background shadow-sm"
                  placeholder="Search student records..."
                />
              </div>
              <Button 
                variant="outline" 
                className="border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 shadow-sm"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button 
                onClick={handlePrintReceipt}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-6"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Certificate
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative px-8 py-8">
        {/* Enhanced Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className={`group transition-all duration-500 hover:shadow-xl hover:scale-105 ${getStatCardClasses(stat.color)} backdrop-blur-sm`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-2 group-hover:text-foreground transition-colors">{stat.label}</p>
                    <p className="text-3xl font-bold mb-1 group-hover:scale-105 transition-transform origin-left">{stat.value}</p>
                    <p className="text-xs text-muted-foreground opacity-80">{stat.subtitle}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className={`p-3 rounded-xl ${getIconClasses(stat.color)} group-hover:scale-110 transition-all duration-300`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-medium transition-all duration-300 ${
                      stat.trend.startsWith('+') 
                        ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' 
                        : 'bg-red-500/10 text-red-600 border border-red-500/20'
                    } group-hover:scale-105`}>
                      <TrendingUp className={`h-3 w-3 ${
                        stat.trend.startsWith('+') ? 'rotate-0' : 'rotate-180'
                      }`} />
                      {stat.trend}
                    </div>
                  </div>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      stat.color === 'primary' ? 'bg-primary' :
                      stat.color === 'accent' ? 'bg-accent' :
                      stat.color === 'secondary' ? 'bg-secondary' :
                      'bg-muted-foreground'
                    }`}
                    style={{ width: `${Math.random() * 40 + 60}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Main Registration Form */}
        <Card className="group shadow-2xl bg-gradient-to-br from-card via-card/95 to-card/90 border-border/40 hover:shadow-3xl transition-all duration-500 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-primary/15 via-primary/8 to-primary/5 border-b border-border/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
            <div className="relative flex items-center justify-between">
              <CardTitle className="text-2xl font-bold flex items-center gap-3 group-hover:scale-105 transition-transform">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Student Registration Certificate
                  </span>
                  <p className="text-sm font-normal text-muted-foreground mt-1">Official academic document</p>
                </div>
              </CardTitle>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 px-3 py-1">
                  ✓ Verified
                </Badge>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                  Official Document
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            {/* Institute Header */}
            <div className="flex items-center justify-between mb-12 pb-8 border-b border-border/20">
              {/* Logo */}
              <div className="flex-shrink-0">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border-4 border-primary/30 flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <div className="text-sm font-bold text-primary">B SOFT</div>
                    <div className="text-xs text-primary/80">Computer &</div>
                    <div className="text-xs text-primary/80">Technical</div>
                    <div className="text-xs text-primary/80">Institute</div>
                  </div>
                </div>
              </div>

              {/* Institute Details */}
              <div className="flex-1 text-center px-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-3">
                  B SOFT Computer & Technical Institute
                </h1>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  Near Union Bank Of India Bina Soft Educational & Welfare Society<br />
                  Vill & Post BILARIYAGAN J, AZAMGARH-276121
                </p>
              </div>

              {/* Contact Info */}
              <div className="flex-shrink-0 text-right">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>infobinasoft@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-2">Student Registration Details</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column */}
                <div className="space-y-8">
                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
                      <User className="h-4 w-4 text-primary" />
                      Student Name
                    </label>
                    <div className="border-b-2 border-dotted border-border/60 h-10 bg-gradient-to-r from-muted/30 to-muted/10 rounded-sm hover:border-primary/40 transition-colors shadow-inner"></div>
                  </div>

                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      Course Category
                    </label>
                    <div className="border-b-2 border-dotted border-border/60 h-10 bg-gradient-to-r from-muted/30 to-muted/10 rounded-sm hover:border-primary/40 transition-colors shadow-inner"></div>
                  </div>

                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
                      <FileText className="h-4 w-4 text-primary" />
                      Course Name
                    </label>
                    <div className="border-b-2 border-dotted border-border/60 h-10 bg-gradient-to-r from-muted/30 to-muted/10 rounded-sm hover:border-primary/40 transition-colors shadow-inner"></div>
                  </div>

                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
                      <User className="h-4 w-4 text-primary" />
                      Father's Name
                    </label>
                    <div className="border-b-2 border-dotted border-border/60 h-10 bg-gradient-to-r from-muted/30 to-muted/10 rounded-sm hover:border-primary/40 transition-colors shadow-inner"></div>
                  </div>

                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
                      <User className="h-4 w-4 text-primary" />
                      Mother's Name
                    </label>
                    <div className="border-b-2 border-dotted border-border/60 h-10 bg-gradient-to-r from-muted/30 to-muted/10 rounded-sm hover:border-primary/40 transition-colors shadow-inner"></div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
                      <IdCard className="h-4 w-4 text-primary" />
                      Study Center Code
                    </label>
                    <div className="border-b-2 border-dotted border-border/60 h-10 bg-gradient-to-r from-muted/30 to-muted/10 rounded-sm hover:border-primary/40 transition-colors shadow-inner"></div>
                  </div>

                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
                      <Calendar className="h-4 w-4 text-primary" />
                      Date of Birth
                    </label>
                    <div className="border-b-2 border-dotted border-border/60 h-10 bg-gradient-to-r from-muted/30 to-muted/10 rounded-sm hover:border-primary/40 transition-colors shadow-inner"></div>
                  </div>

                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
                      <Phone className="h-4 w-4 text-primary" />
                      Mobile Number
                    </label>
                    <div className="border-b-2 border-dotted border-border/60 h-10 bg-gradient-to-r from-muted/30 to-muted/10 rounded-sm hover:border-primary/40 transition-colors shadow-inner"></div>
                  </div>

                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
                      <IdCard className="h-4 w-4 text-primary" />
                      Student ID
                    </label>
                    <div className="border-b-2 border-dotted border-border/60 h-10 bg-gradient-to-r from-muted/30 to-muted/10 rounded-sm hover:border-primary/40 transition-colors shadow-inner"></div>
                  </div>

                  {/* Student Photo Placeholder */}
                  <div className="space-y-3 group">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2 group-hover:text-primary transition-colors">
                      <User className="h-4 w-4 text-primary" />
                      Student Photo
                    </label>
                    <div className="w-32 h-40 border-2 border-dashed border-border/60 rounded-lg bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center hover:border-primary/40 transition-colors">
                      <div className="text-center">
                        <User className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">Passport Size</p>
                        <p className="text-xs text-muted-foreground">Photo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Footer */}
            <div className="mt-16 space-y-8">
              {/* Signature Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border/20">
                <div className="text-center space-y-4">
                  <div className="h-16 border-b border-dotted border-border/60"></div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Student Signature</p>
                    <p className="text-xs text-muted-foreground">Date: ___________</p>
                  </div>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="h-16 border-b border-dotted border-border/60"></div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Center Coordinator</p>
                    <p className="text-xs text-muted-foreground">Signature & Stamp</p>
                  </div>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="h-16 border-b border-dotted border-border/60"></div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Director</p>
                    <p className="text-xs text-muted-foreground">B SOFT Institute</p>
                  </div>
                </div>
              </div>

              {/* Document Information */}
              <div className="bg-gradient-to-r from-muted/20 via-muted/10 to-muted/20 p-6 rounded-lg border border-border/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Document ID:</span>
                      <span className="font-medium">REG-2024-{Math.random().toString().substr(2, 6)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Issue Date:</span>
                      <span className="font-medium">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Valid Until:</span>
                      <span className="font-medium">{new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Registration Fee:</span>
                      <span className="font-medium">₹ ____________</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Mode:</span>
                      <span className="font-medium">____________</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Receipt No:</span>
                      <span className="font-medium">____________</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Footer */}
              <div className="text-center pt-4 border-t border-border/10">
                <p className="text-sm text-muted-foreground mb-2">
                  This is an official registration certificate issued by B SOFT Computer & Technical Institute
                </p>
                <p className="text-xs text-muted-foreground">
                  For verification, contact: infobinasoft@gmail.com | Visit: www.bsoftinstitute.com
                </p>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">Verified & Authenticated</span>
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