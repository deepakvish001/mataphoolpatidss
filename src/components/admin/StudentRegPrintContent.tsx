import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Printer, Search, Users, GraduationCap, User, Phone } from "lucide-react";

const StudentRegPrintContent = () => {
  const [searchValue, setSearchValue] = useState("");

  const handlePrintReceipt = () => {
    window.print();
  };

  // Sample statistics data
  const stats = [
    { label: "Total Registrations", value: "2,847", icon: Users, color: "primary" },
    { label: "Active Students", value: "2,634", icon: GraduationCap, color: "accent" },
    { label: "Pending Approvals", value: "213", icon: FileText, color: "secondary" },
    { label: "Print Requests", value: "156", icon: Printer, color: "muted" }
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Modern Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Student Registration Print
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10 w-64 bg-background/50 border-border/40 focus:border-primary/40 focus:bg-background"
                  placeholder="Search students..."
                />
              </div>
              <Button variant="outline" className="border-border/40 hover:border-primary/40">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button 
                onClick={handlePrintReceipt}
                className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Receipt
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className={`transition-all duration-300 hover:shadow-lg ${getStatCardClasses(stat.color)}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${getIconClasses(stat.color)}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Registration Form */}
        <Card className="shadow-xl bg-gradient-to-br from-card to-card/50 border-border/40">
          <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b border-border/40">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <GraduationCap className="h-6 w-6 text-primary" />
                Student Registration Certificate
              </CardTitle>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                Official Document
              </Badge>
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
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Student Name
                    </label>
                    <div className="border-b-2 border-dotted border-border/60 h-8 bg-muted/20 rounded-sm"></div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      Course Category
                    </label>
                    <div className="border-b-2 border-dotted border-border/60 h-8 bg-muted/20 rounded-sm"></div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Course Name
                    </label>
                    <div className="border-b-2 border-dotted border-border/60 h-8 bg-muted/20 rounded-sm"></div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Father's Name
                    </label>
                    <div className="border-b-2 border-dotted border-border/60 h-8 bg-muted/20 rounded-sm"></div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Mother's Name
                    </label>
                    <div className="border-b-2 border-dotted border-border/60 h-8 bg-muted/20 rounded-sm"></div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Study Center Code
                    </label>
                    <div className="border-b-2 border-dotted border-border/60 h-8 bg-muted/20 rounded-sm"></div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Date of Birth
                    </label>
                    <div className="border-b-2 border-dotted border-border/60 h-8 bg-muted/20 rounded-sm"></div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      Mobile Number
                    </label>
                    <div className="border-b-2 border-dotted border-border/60 h-8 bg-muted/20 rounded-sm"></div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Student ID
                    </label>
                    <div className="border-b-2 border-dotted border-border/60 h-8 bg-muted/20 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-border/20 text-center">
              <p className="text-sm text-muted-foreground">
                This is an official registration document generated by B SOFT Computer & Technical Institute
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegPrintContent;