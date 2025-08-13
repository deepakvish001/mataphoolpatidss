import { 
  Award, Users, MapPin, Phone, Mail, Calendar, Target, Eye, User, Building2, 
  GraduationCap, Trophy, Briefcase, Star, Search, CheckCircle, ArrowRight,
  Zap, Heart, Shield, Globe, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const About = () => {
  const stats = [
    { icon: Calendar, number: "25", label: "Years of Experience", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Users, number: "600", label: "Faculties", color: "text-green-600", bg: "bg-green-50" },
    { icon: Award, number: "11", label: "Awards", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: GraduationCap, number: "15 Lakhs+", label: "Students Taught", color: "text-orange-600", bg: "bg-orange-50" }
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
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">Established Since 2013</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 font-serif">
              MATA PHOOLPATI DEVI <br />
              <span className="text-gradient">SHIKSHAN SANSTHAN</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Where Students Come to Succeed - Empowering with <span className="text-primary font-semibold">ABILITY</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary group">
                <GraduationCap className="mr-2 h-5 w-5" />
                Download Brochure
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="btn-secondary group">
                <Phone className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-serif">WHO WE ARE</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-primary-600 mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Pioneering excellence in skill development education</p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <Card className="card-premium shadow-strong">
              <CardContent className="p-12 md:p-16">
                <div className="space-y-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center shadow-medium">
                      <Award className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground font-serif">Our Legacy</h3>
                      <p className="text-primary">Excellence in Education Since 2013</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    <span className="text-primary font-semibold">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span> is a pioneer in the field of skill training, providing free and placement-linked training in a variety of sectors, including apparel, organized retail, electronics, healthcare, food processing, and agriculture. We are an NSDC Training Partner with a pan-India presence, and we have successfully conducted various skill training projects, including DDUGKY, DDUKK, PMKVY, PMKK, ESD&P NIESBUD, NULM Jharkhand, NULM Gujarat, NULM Haryana, and MAEF.
                  </p>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN has tie-ups with various organizations to provide job training and placement assistance to trained candidates. We have also developed India's largest Mega Skill Centre in difficult and remote areas like Jharkhand, J&K, Uttarakhand, and the North-East States.
                  </p>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Today, MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN is one of India's forefront skill training organizations. Our trainings have a measurable and notable impact on students and society at large. We help students for employment and self-employment, and our industries get trained and skilled manpower.
                  </p>
                  
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8">
                    <div className="flex items-center space-x-4">
                      <Heart className="h-12 w-12 text-primary" />
                      <div>
                        <h4 className="text-xl font-bold text-foreground mb-2">Our Impact</h4>
                        <p className="text-muted-foreground">
                          MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN works to empower youth to serve society socially, grow economically, and lead healthy lives. We have already trained more than <span className="text-primary font-semibold">1,00,000 students</span> in various skill sectors since we started our operations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section-padding bg-gradient-to-r from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Decades of Excellence in Education</h2>
            <p className="text-xl text-muted-foreground">Our journey of transforming lives through skill development</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="card-hover text-center">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Vision */}
            <div className="card-premium">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">VISION</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To train 10 lakh students per year in different skills and to empower them with the ability to provide professional services, and create wealth for themselves and for the nation.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="card-premium">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">MISSION</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To be world's premium institute in skill training & entrepreneurship development, committed to providing the best possible professional, skill oriented education that empowers students, develop them as leaders, self-dependent, values, vision & versatility oriented.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Management Section */}
      <section className="section-padding bg-gradient-to-r from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">OUR MANAGEMENT</h2>
            <p className="text-xl text-muted-foreground">Experienced leaders driving educational excellence</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Director Profile */}
            <Card className="card-premium">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Prof. Yogesh Kumar</h3>
                  <div className="text-primary font-semibold text-lg">DIRECTOR</div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  Prof. Yogesh Kumar is Director and Founder of MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN and possesses more than 25 years of experience in skill development initiatives. Prof. Yogesh Kumar graduated from the prestigious Hindu College, University of Delhi (1981) followed by a Ph.D. in Characterization of Silicon, Department of Physics & Astrophysics, University of Delhi. He started skill initiatives from April 1989 and has successfully completed various schemes including PMKVY, PMKK, UKSDM, and many more.
                </p>
              </CardContent>
            </Card>

            {/* COO Profile */}
            <Card className="card-premium">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Mr. Manav Chauhan</h3>
                  <div className="text-primary font-semibold text-lg">COO</div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  Manav Chauhan is next generation entrepreneur who leads MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN as Chief Operating Officer. He has successfully rolled out various profit centre verticals and his vast experience in project development, management and implementation helped in capacity building & sustainability. He has successfully implemented various schemes including DDU-GKY, PMKK, MANAS, NULM, and PMKVY.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Hall of Fame Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6">
              <Trophy className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">Recognition & Awards</span>
            </div>
            
            <h2 className="text-4xl font-bold text-foreground mb-6">HALL OF FAME</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A testament to our unwavering dedication to excellence, this section showcases the esteemed awards and accolades that adorn our illustrious journey. Each accolade is a beacon of our commitment to providing world-class education and fostering innovation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="card-hover text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{achievement}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Centers Section */}
      <section className="section-padding bg-gradient-to-r from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">Pan India Presence</span>
            </div>
            
            <h2 className="text-4xl font-bold text-foreground mb-6">OUR CENTRES</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We encourage you to contact one of our centers today to learn more about how we can help you achieve your entrepreneurship development goals.
            </p>
            
            <Button className="btn-primary">
              <Phone className="mr-2 h-5 w-5" />
              Contact Now
            </Button>
          </div>

          {/* Centers Table */}
          <div className="bg-card border rounded-2xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary/5 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">State</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">District</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Centre Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {centers.map((center, index) => (
                    <tr key={index} className="hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="font-medium text-foreground">{center.state}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-medium">{center.district}</td>
                      <td className="px-6 py-4">
                        <span className="text-primary font-semibold">{center.name}</span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{center.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <Card className="card-premium">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Call Us</h3>
                <div className="space-y-2">
                  <p className="text-muted-foreground">Primary: <span className="text-primary font-semibold">0120 428 2837</span></p>
                  <p className="text-muted-foreground">Alternate: <span className="text-primary font-semibold">0120 457 0318</span></p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">Email Us</h3>
                <p className="text-muted-foreground">
                  <span className="text-primary font-semibold">mataphoolpatideviorg@gmail.com</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;