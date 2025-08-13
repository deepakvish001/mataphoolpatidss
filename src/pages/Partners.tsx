import { 
  Building2,
  Award,
  Handshake,
  Target,
  Users,
  Globe,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  Star,
  Crown,
  Shield,
  Briefcase,
  Truck,
  ShoppingBag,
  Car,
  Utensils,
  Shirt,
  Laptop,
  Hotel,
  Home,
  Coffee,
  Pizza,
  ShoppingCart,
  Gamepad2,
  Monitor,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Partners = () => {
  const privatePartners = [
    { name: "Swiggy", icon: "🍽️", sector: "Food Delivery", color: "text-orange-600", bg: "bg-orange-50" },
    { name: "OYO", icon: "🏨", sector: "Hospitality", color: "text-red-600", bg: "bg-red-50" },
    { name: "Amazon Logistics", icon: "📦", sector: "E-commerce & Logistics", color: "text-yellow-600", bg: "bg-yellow-50" },
    { name: "Maruti Suzuki", icon: "🚗", sector: "Automotive", color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Myntra", icon: "👕", sector: "Fashion E-commerce", color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Tanishq", icon: "💎", sector: "Jewelry & Luxury", color: "text-yellow-600", bg: "bg-yellow-50" },
    { name: "Vardhman Group", icon: "🏭", sector: "Textiles", color: "text-green-600", bg: "bg-green-50" },
    { name: "Portea", icon: "🏥", sector: "Healthcare", color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Big Bazaar", icon: "🛒", sector: "Retail", color: "text-red-600", bg: "bg-red-50" },
    { name: "Domino's", icon: "🍕", sector: "Food & Beverage", color: "text-red-600", bg: "bg-red-50" },
    { name: "Aditya Birla Group", icon: "🏢", sector: "Conglomerate", color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Barbeque Nation", icon: "🍖", sector: "Restaurant Chain", color: "text-orange-600", bg: "bg-orange-50" },
    { name: "Cogent", icon: "💻", sector: "BPO & Software", color: "text-indigo-600", bg: "bg-indigo-50" },
    { name: "Devyani International", icon: "🍔", sector: "QSR Chain", color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Cinepolis", icon: "🎬", sector: "Entertainment", color: "text-pink-600", bg: "bg-pink-50" },
    { name: "Tandem Data Processing", icon: "📊", sector: "Data Processing", color: "text-cyan-600", bg: "bg-cyan-50" },
    { name: "Aathava Garments", icon: "👔", sector: "Apparel Manufacturing", color: "text-emerald-600", bg: "bg-emerald-50" },
    { name: "Infotech", icon: "⚙️", sector: "IT Services", color: "text-slate-600", bg: "bg-slate-50" }
  ];

  const governmentPartners = [
    { name: "NSDC", fullName: "National Skill Development Corporation", icon: Award, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "PMKVY", fullName: "Pradhan Mantri Kaushal Vikas Yojana", icon: Target, color: "text-green-600", bg: "bg-green-50" },
    { name: "Ministry of Textiles", fullName: "Government of India", icon: Shirt, color: "text-purple-600", bg: "bg-purple-50" },
    { name: "NIELIT", fullName: "National Institute of Electronics & IT", icon: Monitor, color: "text-indigo-600", bg: "bg-indigo-50" },
    { name: "NTPC", fullName: "National Thermal Power Corporation", icon: Zap, color: "text-yellow-600", bg: "bg-yellow-50" },
    { name: "RSLDC", fullName: "Rajasthan Skill & Livelihood Development Corporation", icon: Building2, color: "text-orange-600", bg: "bg-orange-50" },
    { name: "Uttarakhand Skill Development Mission", fullName: "Government of Uttarakhand", icon: Crown, color: "text-emerald-600", bg: "bg-emerald-50" },
    { name: "JSDHMS", fullName: "Jharkhand Skill Development & Human Resource", icon: Users, color: "text-red-600", bg: "bg-red-50" },
    { name: "Urban Development", fullName: "Government Schemes", icon: Home, color: "text-cyan-600", bg: "bg-cyan-50" },
    { name: "NIESBUD", fullName: "National Institute for Entrepreneurship", icon: Briefcase, color: "text-pink-600", bg: "bg-pink-50" },
    { name: "Ministry of Minority Affairs", fullName: "Government of India", icon: Shield, color: "text-slate-600", bg: "bg-slate-50" },
    { name: "Aajeevika", fullName: "Rural Livelihood Mission", icon: Globe, color: "text-teal-600", bg: "bg-teal-50" }
  ];

  const stats = [
    { number: "50+", label: "Private Partners", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
    { number: "25+", label: "Government Bodies", icon: Award, color: "text-green-600", bg: "bg-green-50" },
    { number: "15+", label: "Industry Sectors", icon: Target, color: "text-purple-600", bg: "bg-purple-50" },
    { number: "100%", label: "Placement Support", icon: CheckCircle, color: "text-orange-600", bg: "bg-orange-50" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6">
              <Handshake className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">Strategic Partnerships</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Our <span className="text-primary">Esteemed Partners</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-4xl mx-auto">
              <span className="text-primary font-semibold">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span> is proud to be affiliated with leading private companies and government bodies, creating a robust ecosystem for skill development and placement opportunities across diverse industry sectors.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary">
                <Phone className="mr-2 h-5 w-5" />
                Partner With Us
              </Button>
              <Button variant="outline" className="btn-secondary">
                <Mail className="mr-2 h-5 w-5" />
                View Opportunities
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-r from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="card-hover text-center">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Private Partners Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Esteemed Private Placement Partners</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN is proud to be affiliated with a number of leading private companies, ensuring excellent placement opportunities across various industry sectors.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {privatePartners.map((partner, index) => (
              <Card key={index} className="card-hover group">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${partner.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-2xl">{partner.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{partner.name}</h3>
                  <p className={`text-sm font-medium ${partner.color} mb-2`}>{partner.sector}</p>
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-muted-foreground">Premium Partner</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Government Partners Section */}
      <section className="section-padding bg-gradient-to-r from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6">
              <Crown className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">Government Collaboration</span>
            </div>
            
            <h2 className="text-4xl font-bold text-foreground mb-6">Your Gateway to Government Certification and Placement</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN is proud to be affiliated with following government bodies, providing certified training programs and guaranteed placement opportunities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {governmentPartners.map((partner, index) => (
              <Card key={index} className="card-premium group">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 ${partner.bg} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <partner.icon className={`h-8 w-8 ${partner.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">{partner.name}</h3>
                      <p className="text-muted-foreground leading-relaxed">{partner.fullName}</p>
                      <div className="flex items-center space-x-2 mt-3">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm text-primary font-medium">Certified Partner</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="card-premium">
              <CardContent className="p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                      <Target className="h-4 w-4 text-primary" />
                      <span className="text-primary font-semibold">Partnership Benefits</span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-foreground mb-6">Why Partners Choose Us</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                      Our comprehensive training programs and industry-aligned curriculum ensure that our graduates are job-ready and contribute effectively from day one.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Industry-ready skilled workforce</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Reduced training and onboarding costs</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Continuous skill upgradation support</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Access to diverse talent pool</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Government certification and compliance</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
                    <div className="text-center">
                      <Handshake className="h-16 w-16 text-primary mx-auto mb-6" />
                      <h4 className="text-2xl font-bold text-foreground mb-4">Partnership Opportunities</h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Recruitment Partnerships</span>
                          <ArrowRight className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Skill Development Programs</span>
                          <ArrowRight className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Industry Collaborations</span>
                          <ArrowRight className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Training Partnerships</span>
                          <ArrowRight className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      
                      <Button className="btn-primary mt-6 w-full">
                        <Handshake className="mr-2 h-5 w-5" />
                        Become a Partner
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partners;