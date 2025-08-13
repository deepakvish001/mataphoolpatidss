import { Award, Users, MapPin, Phone, Mail, Calendar, Target, Eye, User, Building2, GraduationCap, Trophy, Briefcase, Star, Search, CheckCircle, Sparkles, Globe, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
  const stats = [
    { icon: Calendar, number: "25+", label: "Years of Experience", gradient: "from-blue-500 to-blue-600" },
    { icon: Users, number: "600+", label: "Expert Faculties", gradient: "from-green-500 to-green-600" },
    { icon: Award, number: "15+", label: "National Awards", gradient: "from-purple-500 to-purple-600" },
    { icon: GraduationCap, number: "15 Lakhs+", label: "Students Empowered", gradient: "from-primary to-orange-600" }
  ];

  const achievements = [
    "Excellence in Skill Development 2023",
    "Best Training Partner Award - NSDC",
    "Outstanding Placement Record Recognition",
    "Innovation in Rural Training Programs",
    "Digital Learning Excellence Award"
  ];

  const centers = [
    { state: "HIMACHAL PRADESH", district: "KULLU", name: "PMKY MATA PHOOLPATI KULLU", address: "Kullu, Himachal Pradesh-175126" },
    { state: "UTTAR PRADESH", district: "KUSHI NAGAR", name: "PMKY MATA PHOOLPATI KUSHI NAGAR", address: "N.H. 28 Hansraj Hospital Kushinagar 274402" },
    { state: "PUNJAB", district: "KAPURTHALA", name: "PMKY MATA PHOOLPATI KAPURTHALA", address: "Aman Nagar, Kapurthala Punjab -144601" },
    { state: "RAJASTHAN", district: "PALI", name: "PMKY MATA PHOOLPATI PALI", address: "DEV KUNG PALI, NAYA GAON, PALI, RAJASTHAN-306401" },
    { state: "PUNJAB", district: "PATHANKOT", name: "PMKY MATA PHOOLPATI PATHANKOT", address: "Dhangu Road Ptk Veer Bhan 25790 Pathankot-145001" },
    { state: "PUNJAB", district: "HOSHIARPUR", name: "PMKY MATA PHOOLPATI HOSHIARPUR", address: "Maharaja Complex Jalandher Road hoshiarpur Punjab 146001" },
    { state: "HIMACHAL PRADESH", district: "HAMIRPUR", name: "PMKY MATA PHOOLPATI HAMIRPUR", address: "near kangara central cooperative bank doshadha opposite police line hamirpur 177001" },
    { state: "BIHAR", district: "BANKA", name: "PMKY MATA PHOOLPATI BANKA", address: "Maha-Laxmi Tower,Dhaka Mod Banka Pin code- 813102" },
    { state: "UTTAR PRADESH", district: "MAU", name: "PMKY MATA PHOOLPATI MAU", address: "Sahadatpura, Maunath Bhanjan(MAU) 275101" },
    { state: "JHARKHAND", district: "KODERMA", name: "PMKY MATA PHOOLPATI KODERMA", address: "Jhumri PO Karma Dist Koderma Jharkhand 825409" },
    { state: "ASSAM", district: "BARPETA", name: "PMKY MATA PHOOLPATI BARPETA", address: "Barpeta Raod simlaguri near Assam oil petrol Pump NH 31 Barpeta Assam 781313" },
    { state: "BIHAR", district: "MADHEPURA", name: "PMYK MATA PHOOLPATI MADHEPURA", address: "BMPS educational building, in front of agriculture research center Jai Najrang Fuels Madhepura BIhar 852113" },
    { state: "KERALA", district: "KOZHIKODE", name: "PMYK MATA PHOOLPATI KOZHIKODE", address: "pilathattathil avilora P.O koduvaly kerala 673572" },
    { state: "DELHI", district: "South East", name: "PMYK MATA PHOOLPATI South East", address: "Plot No 3 Lal Kiran Bhawan Meethapur Chowk Meethapur Badarpur New Delhi 110044" },
    { state: "ARUNACHAL PRADESH", district: "LOWER SIANG", name: "PMYK MATA PHOOLPATI LOWER SIANG", address: "Near Forest Gate Lipu Po+P.S Likabali District Lower Siang Arunachal Pradesh 791125" },
    { state: "HIMACHAL PRADESH", district: "KINNAUR", name: "PMYK MATA PHOOLPATI KINNAUR", address: "First floor of Near HP PWD rest house, Reckong Peo, Distt: Kinnaur ,Himachal Pradesh,172107" },
    { state: "MIZORAM", district: "CHAMPHAI", name: "PMYK MATA PHOOLPATI CHAMPHAI", address: "CHP 61 vilage vaihmun police station distruct champhai state mizoram 796321" },
    { state: "KERALA", district: "WAYANAD", name: "PMYK MATA PHOOLPATI WAYANAD", address: "Royal Centre Near New Bus Stand Kalpetta Wayanad" },
    { state: "KERALA", district: "KANNUR", name: "PMYK MATA PHOOLPATI KANNUR", address: "Bldg No 17/489-B & 17/489-C kannan arcade puthiyatheru kannur 670011" },
    { state: "KERALA", district: "KASARAGOD", name: "PMYK MATA PHOOLPATI KASARAGOD", address: "Sy No R.S.No 82/1B2A 5A 5C 5B1 Of Kasaragod Village in Kasarangod Taluk Dis Kerala 560025" },
    { state: "GUJARAT", district: "JUNAGADH", name: "PMKY MATA PHOOLPATI JUNAGADH", address: "Merry Gold-4, 4th Floor, Shop No-4 Gandhari Vadi, Joshipura, Village -Junagadh, Taluka- Junagadh, District- Junagadh, Gujarat - 362001" },
    { state: "BIHAR", district: "KHAGARIA", name: "PMKY MATA PHOOLPATI KHAGARIA", address: "Yashoda Nagar Khagaria U Khagaria Bihar-851204" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Clean & Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-muted/5 to-background">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,127,0,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(255,127,0,0.05)_50%,transparent_60%)]" />
        
        <div className="container-custom relative z-10 py-32">
          <div className="max-w-6xl mx-auto text-center space-y-16">
            
            {/* Clean Header Badge */}
            <div className="inline-flex items-center space-x-3 bg-primary/10 border border-primary/20 rounded-full px-8 py-4 backdrop-blur-sm">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary font-semibold text-lg">About Our Institution</span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </div>

            {/* Clean Title Design */}
            <div className="space-y-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="block text-foreground">MATA PHOOLPATI DEVI</span>
                <span className="block text-gradient bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
                  SHIKSHAN SANSTHAN
                </span>
              </h1>
              
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-2xl md:text-3xl text-muted-foreground font-medium">
                  Pioneering Excellence in <span className="text-primary font-bold">Skill Development</span>
                </p>
                <p className="text-xl text-muted-foreground/80 leading-relaxed">
                  Where students discover their potential, develop world-class skills, and build successful careers 
                  through comprehensive training programs designed for the modern industry.
                </p>
              </div>
            </div>

            {/* Clean Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center space-y-3">
                <div className="text-5xl font-bold text-primary">25+</div>
                <div className="text-muted-foreground font-medium">Years of Excellence</div>
                <div className="w-16 h-0.5 bg-primary/30 mx-auto rounded-full" />
              </div>
              <div className="text-center space-y-3">
                <div className="text-5xl font-bold text-green-500">15L+</div>
                <div className="text-muted-foreground font-medium">Students Trained</div>
                <div className="w-16 h-0.5 bg-green-500/30 mx-auto rounded-full" />
              </div>
              <div className="text-center space-y-3">
                <div className="text-5xl font-bold text-blue-500">22+</div>
                <div className="text-muted-foreground font-medium">States Covered</div>
                <div className="w-16 h-0.5 bg-blue-500/30 mx-auto rounded-full" />
              </div>
              <div className="text-center space-y-3">
                <div className="text-5xl font-bold text-purple-500">95%</div>
                <div className="text-muted-foreground font-medium">Success Rate</div>
                <div className="w-16 h-0.5 bg-purple-500/30 mx-auto rounded-full" />
              </div>
            </div>

            {/* Clean CTA Section */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <GraduationCap className="mr-3 h-6 w-6" />
                Explore Our Programs
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary/30 text-primary hover:bg-primary/5 px-10 py-4 rounded-xl font-semibold transition-all duration-300">
                <Phone className="mr-3 h-5 w-5" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;