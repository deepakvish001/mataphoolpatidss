import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, UserCheck, FileText, Printer, Users, GraduationCap, Calendar, Award, Building, MapPin, Phone, Mail, CreditCard, User } from "lucide-react";

const StudentRegPrintContent = () => {
  const [searchValue, setSearchValue] = useState("");

  const handlePrintReceipt = () => {
    window.print();
  };

  // Mock statistics data
  const stats = {
    totalRegistrations: 1247,
    thisMonth: 89,
    verified: 1198,
    pending: 49
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/5 p-6">
      <div className="w-full max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <span>Student Registration Print</span>
          </h1>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm font-medium">Total Registrations</p>
                  <p className="text-3xl font-bold">{stats.totalRegistrations}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-accent-foreground/80 text-sm font-medium">This Month</p>
                  <p className="text-3xl font-bold">{stats.thisMonth}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-foreground/80 text-sm font-medium">Verified Students</p>
                  <p className="text-3xl font-bold">{stats.verified}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <UserCheck className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-muted to-muted/80 text-muted-foreground shadow-elegant border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground/80 text-sm font-medium">Pending Review</p>
                  <p className="text-3xl font-bold text-foreground">{stats.pending}</p>
                </div>
                <div className="p-3 bg-background/20 rounded-full">
                  <Award className="h-6 w-6 text-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Action Controls */}
        <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-6">
                <a href="/admin" className="text-primary hover:text-primary/80 font-medium flex items-center space-x-2 transition-colors">
                  <Building className="h-4 w-4" />
                  <span>Home</span>
                </a>
                <div className="flex items-center space-x-4">
                  <span className="text-foreground font-medium flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Students List</span>
                  </span>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="pl-10 w-64 border-border/40 bg-background focus:border-primary/50 focus:ring-primary/20"
                      placeholder="Search students..."
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg">
                    <Search className="h-4 w-4 mr-2" />
                    Submit
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handlePrintReceipt}
                className="bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary text-secondary-foreground shadow-lg px-6"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Receipt
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Registration Print Form */}
        <Card className="shadow-elegant border-0 bg-card/90 backdrop-blur-sm overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-primary-foreground p-8">
            <CardTitle className="text-2xl font-bold flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-background/20 rounded-lg backdrop-blur-sm">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <span>B SOFT Computer & Technical Institute</span>
              </div>
              <Badge className="bg-background/20 text-primary-foreground border-background/30">
                Registration Form
              </Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-8">
            {/* Institute Header */}
            <div className="flex items-center justify-between mb-8">
              {/* Logo */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border-4 border-primary/30 flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <div className="text-xs font-bold text-primary">B SOFT</div>
                    <div className="text-xs text-primary/80">Computer & Technical</div>
                    <div className="text-xs text-primary/80">Institute</div>
                  </div>
                </div>
              </div>

              {/* Institute Details */}
              <div className="flex-1 text-center px-8">
                <h1 className="text-2xl font-bold text-primary mb-2">
                  B SOFT Computer & Technical Institute
                </h1>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground mb-1">
                  <MapPin className="h-4 w-4" />
                  <p>Near Union Bank Of India Bina Soft Educational & Welfare Society Vill & Post BILARIYAGAN J, AZAMGARH-276121</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex-shrink-0 text-right space-y-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <p>infobinasoft@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Student Registration Form */}
            <div className="border-t border-border/40 pt-8">
              <h2 className="text-lg font-bold text-center mb-8 underline text-foreground flex items-center justify-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Student Registration Print</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                {/* Left Column */}
                <div className="space-y-8">
                  <div className="group">
                    <div className="flex items-center hover:bg-accent/20 p-3 rounded-lg transition-colors">
                      <User className="h-4 w-4 text-primary mr-3" />
                      <label className="text-sm font-medium text-foreground w-32">Name :</label>
                      <div className="border-b border-border/60 flex-1 h-6 hover:border-primary/40 transition-colors"></div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center hover:bg-accent/20 p-3 rounded-lg transition-colors">
                      <GraduationCap className="h-4 w-4 text-primary mr-3" />
                      <label className="text-sm font-medium text-foreground w-32">Course Category :</label>
                      <div className="border-b border-border/60 flex-1 h-6 hover:border-primary/40 transition-colors"></div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center hover:bg-accent/20 p-3 rounded-lg transition-colors">
                      <Award className="h-4 w-4 text-primary mr-3" />
                      <label className="text-sm font-medium text-foreground w-32">Course Name :</label>
                      <div className="border-b border-border/60 flex-1 h-6 hover:border-primary/40 transition-colors"></div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center hover:bg-accent/20 p-3 rounded-lg transition-colors">
                      <User className="h-4 w-4 text-primary mr-3" />
                      <label className="text-sm font-medium text-foreground w-32">Father's Name :</label>
                      <div className="border-b border-border/60 flex-1 h-6 hover:border-primary/40 transition-colors"></div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center hover:bg-accent/20 p-3 rounded-lg transition-colors">
                      <User className="h-4 w-4 text-primary mr-3" />
                      <label className="text-sm font-medium text-foreground w-32">Mother's Name :</label>
                      <div className="border-b border-border/60 flex-1 h-6 hover:border-primary/40 transition-colors"></div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  <div className="group">
                    <div className="flex items-center hover:bg-accent/20 p-3 rounded-lg transition-colors">
                      <Building className="h-4 w-4 text-primary mr-3" />
                      <label className="text-sm font-medium text-foreground w-32">Study Center Code :</label>
                      <div className="border-b border-border/60 flex-1 h-6 hover:border-primary/40 transition-colors"></div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center hover:bg-accent/20 p-3 rounded-lg transition-colors">
                      <Calendar className="h-4 w-4 text-primary mr-3" />
                      <label className="text-sm font-medium text-foreground w-32">Date of Birth :</label>
                      <div className="border-b border-border/60 flex-1 h-6 hover:border-primary/40 transition-colors"></div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center hover:bg-accent/20 p-3 rounded-lg transition-colors">
                      <Phone className="h-4 w-4 text-primary mr-3" />
                      <label className="text-sm font-medium text-foreground w-32">Mobile No. :</label>
                      <div className="border-b border-border/60 flex-1 h-6 hover:border-primary/40 transition-colors"></div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-center hover:bg-accent/20 p-3 rounded-lg transition-colors">
                      <CreditCard className="h-4 w-4 text-primary mr-3" />
                      <label className="text-sm font-medium text-foreground w-32">Student ID :</label>
                      <div className="border-b border-border/60 flex-1 h-6 hover:border-primary/40 transition-colors"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Signature Section */}
              <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/40">
                <div className="text-center">
                  <div className="border-b border-border/60 pb-2 mb-2 h-16"></div>
                  <p className="text-sm font-medium text-foreground">Student Signature</p>
                </div>
                <div className="text-center">
                  <div className="border-b border-border/60 pb-2 mb-2 h-16"></div>
                  <p className="text-sm font-medium text-foreground">Parent/Guardian Signature</p>
                </div>
                <div className="text-center">
                  <div className="border-b border-border/60 pb-2 mb-2 h-16"></div>
                  <p className="text-sm font-medium text-foreground">Institute Signature</p>
                </div>
              </div>

              {/* Footer Information */}
              <div className="mt-12 pt-8 border-t border-border/40 bg-accent/10 p-6 rounded-lg">
                <div className="grid grid-cols-2 gap-8 text-sm text-muted-foreground">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Document Details:</h4>
                    <p>• This is an official registration document</p>
                    <p>• Valid for academic purposes</p>
                    <p>• Keep this document safe for future reference</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Verification Code:</h4>
                    <div className="bg-background p-3 rounded border border-border/40 font-mono text-center">
                      REG-{new Date().getFullYear()}-{Math.random().toString(36).substr(2, 6).toUpperCase()}
                    </div>
                  </div>
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