import { Award, Users, MapPin, Phone, Mail, Calendar, Target, Eye, User, Building2, GraduationCap, Trophy, Briefcase, Star, Search, CheckCircle, Sparkles, Globe, Heart } from 'lucide-react';
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
      
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-muted/10 to-primary/10">
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large floating elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-l from-blue-500/15 to-purple-500/15 rounded-full blur-2xl" style={{ animation: 'float 6s ease-in-out infinite' }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-bounce" style={{ animationDuration: '3s' }} />
          <div className="absolute top-1/6 right-1/6 w-32 h-32 bg-primary/30 rounded-full blur-xl animate-pulse" style={{ animationDuration: '2s' }} />
          <div className="absolute bottom-1/6 left-1/6 w-48 h-48 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-2xl" style={{ animation: 'float 5s ease-in-out infinite reverse' }} />
          
          {/* Floating icons */}
          <div className="absolute top-1/3 left-1/5 animate-bounce" style={{ animationDuration: '3s', animationDelay: '0.5s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-orange-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <GraduationCap className="h-8 w-8 text-primary/60" />
            </div>
          </div>
          <div className="absolute bottom-1/3 right-1/5 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Trophy className="h-6 w-6 text-blue-500/60" />
            </div>
          </div>
          <div className="absolute top-2/3 left-1/3 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1.5s' }}>
            <div className="w-14 h-14 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Users className="h-7 w-7 text-green-500/60" />
            </div>
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,127,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,127,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Enhanced Badge */}
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 border border-primary/40 rounded-full px-10 py-5 mb-12 backdrop-blur-md shadow-2xl hover:glow-orange transition-all duration-500 group">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse group-hover:scale-125 transition-transform" />
              <Building2 className="h-7 w-7 text-primary group-hover:rotate-12 transition-transform" />
              <span className="text-primary font-bold text-xl tracking-wide">PIONEERING EXCELLENCE SINCE 2013</span>
              <Sparkles className="h-6 w-6 text-primary animate-pulse group-hover:rotate-12 transition-transform" />
              <div className="w-4 h-4 bg-gradient-to-r from-primary to-orange-500 rounded-full animate-pulse group-hover:scale-125 transition-transform" />
            </div>
            
            {/* Enhanced Main Title */}
            <div className="mb-12">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif font-black leading-none mb-6">
                <span className="block text-gradient bg-gradient-to-r from-foreground via-foreground/95 to-muted-foreground bg-clip-text text-transparent animate-fade-in">
                  MATA PHOOLPATI DEVI
                </span>
                <span className="block text-gradient bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent mt-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  SHIKSHAN SANSTHAN
                </span>
              </h1>
              
              {/* Decorative line */}
              <div className="flex items-center justify-center space-x-4 mt-8 mb-8">
                <div className="w-20 h-1 bg-gradient-to-r from-transparent to-primary rounded-full" />
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-orange-500 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-white" />
                </div>
                <div className="w-20 h-1 bg-gradient-to-l from-transparent to-primary rounded-full" />
              </div>
            </div>
            
            {/* Enhanced Subtitle */}
            <div className="max-w-5xl mx-auto mb-16">
              <p className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-muted-foreground leading-tight mb-8">
                Where Students Come to <span className="text-gradient bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent font-bold">Succeed</span>
              </p>
              <p className="text-xl md:text-2xl text-muted-foreground/90 leading-relaxed font-light">
                Empowering youth with <span className="text-primary font-bold text-2xl md:text-3xl">ABILITY</span>, 
                transforming lives through comprehensive skill development, and creating tomorrow's industry leaders across India
              </p>
            </div>
            
            {/* Enhanced CTA Section */}
            <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-16">
              <Button className="group relative overflow-hidden bg-gradient-to-r from-primary to-orange-500 text-white text-xl px-12 py-6 rounded-2xl font-bold shadow-2xl hover:scale-105 transition-all duration-500 border-0">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center space-x-3">
                  <GraduationCap className="h-7 w-7 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Download Brochure</span>
                  <Sparkles className="h-6 w-6 group-hover:scale-125 transition-transform duration-300" />
                </div>
              </Button>
              
              <Button variant="outline" className="group bg-transparent border-2 border-primary/50 text-primary hover:bg-primary/10 text-xl px-12 py-6 rounded-2xl font-bold shadow-xl hover:scale-105 transition-all duration-500 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Contact Us Now</span>
                </div>
              </Button>
            </div>
            
            {/* Achievement Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">25+</div>
                <div className="text-sm md:text-base text-muted-foreground font-semibold">Years Excellence</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-green-500 mb-2 group-hover:scale-110 transition-transform duration-300">15L+</div>
                <div className="text-sm md:text-base text-muted-foreground font-semibold">Students Trained</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2 group-hover:scale-110 transition-transform duration-300">22+</div>
                <div className="text-sm md:text-base text-muted-foreground font-semibold">States Covered</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-purple-500 mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
                <div className="text-sm md:text-base text-muted-foreground font-semibold">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* WHO WE ARE Section */}
      <section className="section-padding bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8">
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">Our Story</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">WHO WE</span>
              <span className="text-primary"> ARE</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Pioneering skill development across India with innovation, dedication, and excellence
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Main Content with Enhanced Design */}
            <div className="space-y-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative card-premium hover:glow-orange transition-all duration-700 group-hover:scale-[1.02] border-primary/20">
                  <div className="flex items-start space-x-6 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Star className="h-8 w-8 text-primary group-hover:rotate-12 transition-transform" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-serif font-bold text-foreground mb-4 group-hover:text-primary transition-colors">Our Foundation</h3>
                      <div className="w-32 h-1.5 bg-gradient-to-r from-primary via-orange-500 to-primary rounded-full" />
                    </div>
                  </div>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    <span className="text-primary font-bold text-2xl">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span> stands as a 
                    <span className="text-gradient bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent font-semibold"> pioneer in skill training</span>, 
                    providing comprehensive, free, and placement-linked training across diverse sectors including apparel, retail, 
                    electronics, healthcare, food processing, and agriculture. As a certified NSDC Training Partner with 
                    pan-India presence, we've successfully orchestrated transformative projects like DDUGKY, PMKVY, PMKK, and beyond.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-green-500/5 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative card-premium hover:glow-orange transition-all duration-700 group-hover:scale-[1.02] border-green-500/20">
                  <div className="flex items-start space-x-6 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500/30 to-green-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-8 w-8 text-green-500 group-hover:rotate-12 transition-transform" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-serif font-bold text-foreground mb-4 group-hover:text-green-500 transition-colors">Our Impact</h3>
                      <div className="w-32 h-1.5 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-full" />
                    </div>
                  </div>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    We've architected India's <span className="text-green-500 font-bold">largest Mega Skill Centres</span> in the most 
                    challenging terrains—Jharkhand, J&K, Uttarakhand, and North-East States. Our strategic ecosystem includes 
                    comprehensive partnerships ensuring <span className="text-primary font-semibold">100% job training and placement assistance</span> 
                    for every trained candidate.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative card-premium hover:glow-orange transition-all duration-700 group-hover:scale-[1.02] border-blue-500/20">
                  <div className="flex items-start space-x-6 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/30 to-blue-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Globe className="h-8 w-8 text-blue-500 group-hover:rotate-12 transition-transform" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-serif font-bold text-foreground mb-4 group-hover:text-blue-500 transition-colors">Our Excellence</h3>
                      <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full" />
                    </div>
                  </div>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Today, we stand among India's <span className="text-blue-500 font-bold">forefront skill training organizations</span>, 
                    creating measurable impact across students and society. Our comprehensive approach bridges the gap between 
                    industry requirements and skilled workforce, fostering both <span className="text-primary font-semibold">employment and entrepreneurship</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Stats & Highlights */}
            <div className="space-y-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                <div className="relative card-premium bg-gradient-to-br from-primary/15 via-primary/8 to-transparent border-primary/30 hover:glow-orange">
                  <div className="text-center mb-12">
                    <div className="w-28 h-28 bg-gradient-to-br from-primary via-orange-500 to-primary rounded-full flex items-center justify-center mx-auto mb-8 enhanced-glow group-hover:scale-110 transition-transform duration-500">
                      <Heart className="h-14 w-14 text-white" />
                    </div>
                    <h3 className="text-4xl font-serif font-bold text-foreground mb-6">
                      <span className="text-gradient bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">Our Mission</span>
                    </h3>
                    <div className="w-32 h-1.5 bg-gradient-to-r from-primary via-orange-500 to-primary rounded-full mx-auto mb-10" />
                    <p className="text-2xl text-muted-foreground leading-relaxed">
                      Empowering youth to serve society, grow economically, and lead transformative lives through 
                      <span className="text-primary font-bold"> world-class skill development programs</span>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-10 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/8 border border-primary/30 hover:glow-orange transition-all duration-500 group">
                  <div className="text-6xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform">15L+</div>
                  <div className="text-lg text-muted-foreground font-semibold">Students Empowered</div>
                  <div className="w-20 h-1 bg-gradient-to-r from-primary to-orange-500 rounded-full mx-auto mt-4" />
                </div>
                
                <div className="text-center p-10 rounded-2xl bg-gradient-to-br from-green-500/15 to-green-500/8 border border-green-500/30 hover:glow-orange transition-all duration-500 group">
                  <div className="text-6xl font-bold text-green-500 mb-4 group-hover:scale-110 transition-transform">22+</div>
                  <div className="text-lg text-muted-foreground font-semibold">States Covered</div>
                  <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mt-4" />
                </div>
                
                <div className="text-center p-10 rounded-2xl bg-gradient-to-br from-blue-500/15 to-blue-500/8 border border-blue-500/30 hover:glow-orange transition-all duration-500 group">
                  <div className="text-6xl font-bold text-blue-500 mb-4 group-hover:scale-110 transition-transform">95%</div>
                  <div className="text-lg text-muted-foreground font-semibold">Success Rate</div>
                  <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-4" />
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative card-premium border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-purple-500/5 hover:glow-orange">
                  <div className="text-center">
                    <Trophy className="h-16 w-16 text-purple-500 mx-auto mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                    <h4 className="text-3xl font-serif font-bold text-foreground mb-6">Excellence Recognition</h4>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6" />
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      Recognized as one of India's <span className="text-purple-500 font-bold">premier skill training organizations</span> 
                      with measurable impact on students, industries, and society at large.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section-padding relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-muted/10 to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8">
              <Award className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-primary font-semibold">Excellence in Numbers</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">Decades of</span>
              <span className="text-primary block">EXCELLENCE</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our remarkable journey of transforming lives through comprehensive skill development and education
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:scale-105 transition-all duration-500 hover:glow-orange">
                <CardContent className="p-8 text-center relative z-10">
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className={`w-20 h-20 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <stat.icon className="h-10 w-10 text-white" />
                  </div>
                  
                  <div className="text-5xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-semibold text-lg">
                    {stat.label}
                  </div>
                  
                  {/* Hover effect indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="section-padding bg-gradient-to-br from-background via-muted/10 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">Our Direction</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-gradient bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">VISION &</span>
              <span className="text-primary"> MISSION</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Vision */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative card-premium border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent hover:glow-orange">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center flex-shrink-0 glow-orange">
                    <Eye className="h-12 w-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-foreground mb-6">
                      <span className="text-gradient bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">VISION</span>
                    </h3>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-8" />
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      To train <span className="text-primary font-bold">10 lakh students per year</span> in different skills and 
                      empower them with the ability to provide professional services, creating wealth for themselves 
                      and for the nation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative card-premium border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent hover:glow-orange">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center flex-shrink-0 glow-orange">
                    <Target className="h-12 w-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-foreground mb-6">
                      <span className="text-gradient bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">MISSION</span>
                    </h3>
                    <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto mb-8" />
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      To be the <span className="text-primary font-bold">world's premium institute</span> in skill training & 
                      entrepreneurship development, providing professional education that empowers students as 
                      leaders with values, vision & versatility.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Management Section */}
      <section className="section-padding relative overflow-hidden bg-gradient-to-br from-muted/5 via-background to-primary/5">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-muted/10" />
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl" style={{ animationDuration: '4s' }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-8 py-4 mb-8 backdrop-blur-sm">
              <User className="h-6 w-6 text-primary" />
              <span className="text-primary font-bold text-lg">Leadership Excellence</span>
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            </div>
            
            <h2 className="text-6xl md:text-7xl font-serif font-bold mb-8">
              <span className="text-gradient bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">OUR</span>
              <span className="text-primary block">MANAGEMENT</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Visionary leaders driving <span className="text-primary font-semibold">educational excellence</span> and 
              transforming the landscape of skill development across India
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Director Profile */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-700" />
              <Card className="relative border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl hover:glow-orange transition-all duration-700 group-hover:scale-[1.02]">
                <CardContent className="p-12">
                  <div className="text-center mb-10">
                    <div className="relative mb-8">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto glow-orange group-hover:scale-110 transition-transform duration-500">
                        <User className="h-16 w-16 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary to-orange-500 rounded-full flex items-center justify-center">
                        <Star className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-serif font-bold text-foreground mb-2 group-hover:text-blue-500 transition-colors duration-300">
                      Prof. Yogesh Kumar
                    </h3>
                    <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-2 mb-6">
                      <Briefcase className="h-4 w-4 text-blue-500" />
                      <span className="text-blue-500 font-bold text-lg">DIRECTOR & FOUNDER</span>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto" />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <GraduationCap className="h-4 w-4 text-blue-500" />
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        <span className="text-primary font-semibold">25+ years</span> of pioneering experience in skill development initiatives, 
                        transforming lives across India since 1989.
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Trophy className="h-4 w-4 text-blue-500" />
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        <span className="text-primary font-semibold">Ph.D. in Physics</span> from University of Delhi with expertise 
                        in PMKVY, PMKK, UKSDM, and numerous government initiatives.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* COO Profile */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-600/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-700" />
              <Card className="relative border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl hover:glow-orange transition-all duration-700 group-hover:scale-[1.02]">
                <CardContent className="p-12">
                  <div className="text-center mb-10">
                    <div className="relative mb-8">
                      <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto glow-orange group-hover:scale-110 transition-transform duration-500">
                        <Briefcase className="h-16 w-16 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary to-orange-500 rounded-full flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-serif font-bold text-foreground mb-2 group-hover:text-green-500 transition-colors duration-300">
                      Mr. Manav Chauhan
                    </h3>
                    <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-6 py-2 mb-6">
                      <Target className="h-4 w-4 text-green-500" />
                      <span className="text-green-500 font-bold text-lg">CHIEF OPERATING OFFICER</span>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mx-auto" />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <Building2 className="h-4 w-4 text-green-500" />
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        <span className="text-primary font-semibold">Next-generation entrepreneur</span> leading operational excellence 
                        with innovative profit center verticals and strategic implementation.
                      </p>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        <span className="text-primary font-semibold">Expert implementation</span> of DDU-GKY, PMKK, MANAS, 
                        NULM, and PMKVY schemes with proven track record.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Hall of Fame Section */}
      <section className="section-padding relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-primary/5 to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-2xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-8 py-4 mb-8 backdrop-blur-sm">
              <Trophy className="h-6 w-6 text-primary animate-pulse" />
              <span className="text-primary font-bold text-lg">Recognition & Awards</span>
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            </div>
            
            <h2 className="text-6xl md:text-7xl font-bold mb-8">
              <span className="text-gradient bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">HALL OF</span>
              <span className="text-primary block">FAME</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              A testament to our <span className="text-primary font-semibold">unwavering dedication</span> to excellence. 
              Each accolade represents our commitment to world-class education and innovation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {achievements.map((achievement, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:scale-105 transition-all duration-500 hover:glow-orange">
                <CardContent className="p-10 text-center relative z-10">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg glow-orange">
                    <Star className="h-10 w-10 text-white group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                    {achievement}
                  </h3>
                  
                  {/* Award year indicator */}
                  <div className="mt-4 text-sm text-muted-foreground font-medium">
                    Excellence Award
                  </div>
                  
                  {/* Hover effect line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Centers Section */}
      <section className="section-padding relative overflow-hidden bg-gradient-to-br from-background via-muted/5 to-primary/10">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-primary/10 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-transparent rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-full px-8 py-4 mb-8 backdrop-blur-sm">
              <Globe className="h-6 w-6 text-primary animate-pulse" />
              <span className="text-primary font-bold text-lg">Pan India Network</span>
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            
            <h2 className="text-6xl md:text-7xl font-serif font-bold mb-8">
              <span className="text-gradient bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">OUR</span>
              <span className="text-primary block">CENTRES</span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed">
              Strategically located across <span className="text-primary font-bold">22+ states</span> to bring 
              world-class skill training to every corner of India
            </p>
            
            <Button className="btn-primary group text-lg px-10 py-4 morphing-button">
              <Phone className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
              Connect With Us Today
            </Button>
          </div>

          {/* Enhanced Centers Grid */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:glow-orange transition-all duration-300">
                <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-500 mb-2">22+</div>
                <div className="text-muted-foreground font-semibold">States Covered</div>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-600/5 border border-green-500/20 hover:glow-orange transition-all duration-300">
                <Building2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-green-500 mb-2">50+</div>
                <div className="text-muted-foreground font-semibold">Active Centers</div>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:glow-orange transition-all duration-300">
                <Users className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <div className="text-3xl font-bold text-purple-500 mb-2">1000+</div>
                <div className="text-muted-foreground font-semibold">Daily Students</div>
              </div>
              
              <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-orange-600/5 border border-primary/20 hover:glow-orange transition-all duration-300">
                <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground font-semibold">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Enhanced Centers Table */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl blur-xl" />
            <div className="relative bg-gradient-to-br from-card/80 to-card/40 border border-border/50 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-primary/20 p-6">
                <div className="flex items-center justify-center space-x-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">Training Centers Across India</h3>
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                </div>
              </div>
              
              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-gradient-to-r from-muted/50 to-muted/30 backdrop-blur-sm border-b border-border/50">
                    <tr>
                      <th className="px-8 py-6 text-left text-sm font-bold text-foreground uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>State</span>
                        </div>
                      </th>
                      <th className="px-8 py-6 text-left text-sm font-bold text-foreground uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-primary" />
                          <span>District</span>
                        </div>
                      </th>
                      <th className="px-8 py-6 text-left text-sm font-bold text-foreground uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="h-4 w-4 text-primary" />
                          <span>Centre Name</span>
                        </div>
                      </th>
                      <th className="px-8 py-6 text-left text-sm font-bold text-foreground uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>Address</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {centers.map((center, index) => (
                      <tr key={index} className="hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all duration-300 group">
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-primary rounded-full group-hover:animate-pulse" />
                            <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                              {center.state}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-muted-foreground font-semibold group-hover:text-foreground transition-colors">
                            {center.district}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-primary font-bold text-sm group-hover:text-orange-500 transition-colors">
                            {center.name}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-muted-foreground text-sm group-hover:text-foreground transition-colors">
                            {center.address}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Enhanced Contact Section */}
          <div className="mt-20 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <Card className="relative card-premium border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent hover:glow-orange">
                <CardContent className="p-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 glow-orange group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Connect With Us</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-3 bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-3">
                      <Phone className="h-5 w-5 text-blue-500" />
                      <span className="text-primary font-bold text-lg">0120 428 2837</span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-3">
                      <Phone className="h-5 w-5 text-blue-500" />
                      <span className="text-primary font-bold text-lg">0120 457 0318</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <Card className="relative card-premium border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent hover:glow-orange">
                <CardContent className="p-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8 glow-orange group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Email Us</h3>
                  <div className="flex items-center justify-center space-x-3 bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3">
                    <Mail className="h-5 w-5 text-green-500" />
                    <span className="text-primary font-bold text-lg break-all">
                      mataphoolpatideviorg@gmail.com
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;