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
  Zap,
  Sparkles,
  Rocket,
  TrendingUp,
  CircleDot,
  Gift,
  Badge,
  Gem,
  Flame,
  Layers,
  Network,
  Puzzle,
  Fingerprint,
  Eye,
  ChevronRight,
  GraduationCap
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-primary/60">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full animate-ping"></div>
            <div className="absolute top-40 right-32 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-white/25 rounded-full animate-bounce"></div>
            <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 right-20 w-3 h-3 bg-white/35 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-6xl mx-auto">
            {/* Floating Badge */}
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 mb-8 hover:scale-105 transition-transform duration-300">
              <Sparkles className="h-6 w-6 text-white animate-pulse" />
              <span className="text-white font-semibold text-lg">Strategic Partnerships</span>
              <Rocket className="h-6 w-6 text-white animate-bounce" />
            </div>
            
            {/* Main Heading with Gradient Text */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="text-white">Our</span>{' '}
              <span className="bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent animate-pulse">
                Esteemed
              </span>{' '}
              <span className="text-white">Partners</span>
            </h1>
            
            {/* Enhanced Description */}
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-5xl mx-auto font-light">
              <span className="font-bold bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
                MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN
              </span>{' '}
              is proudly affiliated with leading private companies and government bodies, creating a robust ecosystem for skill development and placement opportunities across diverse industry sectors.
            </p>
            
            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl px-8 py-4 text-lg font-semibold">
                <Phone className="mr-3 h-6 w-6" />
                Partner With Us
                <ChevronRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-md hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold"
              >
                <Mail className="mr-3 h-6 w-6" />
                View Opportunities
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>

            {/* Partnership Stats Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 animate-pulse">500+</div>
                <div className="text-white/80 font-medium">Partner Companies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 animate-pulse" style={{ animationDelay: '0.5s' }}>25+</div>
                <div className="text-white/80 font-medium">Government Bodies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 animate-pulse" style={{ animationDelay: '1s' }}>15+</div>
                <div className="text-white/80 font-medium">Industry Sectors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 animate-pulse" style={{ animationDelay: '1.5s' }}>100%</div>
                <div className="text-white/80 font-medium">Placement Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-8 border-2 border-white/50 rounded-full flex items-center justify-center">
            <ArrowRight className="h-4 w-4 text-white rotate-90" />
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZG90cyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSJoc2woMjE1IDEwMCUgNjAlIC8gMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkb3RzKSIvPjwvc3ZnPg==')] opacity-50"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-primary/10 backdrop-blur-md border border-primary/20 rounded-full px-6 py-3 mb-6">
              <TrendingUp className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-primary font-semibold">Partnership Impact</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Achievements in{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Numbers
              </span>
            </h2>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden bg-card/80 backdrop-blur-md border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <CardContent className="p-8 text-center relative">
                  {/* Floating Background Element */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                  
                  {/* Icon Container */}
                  <div className={`relative w-20 h-20 ${stat.bg} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <stat.icon className={`h-10 w-10 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-primary/10 rounded-full h-2 mb-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    ></div>
                  </div>
                  
                  {/* Number with Counter Animation */}
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-3">
                    {stat.number}
                  </div>
                  
                  {/* Label */}
                  <div className="text-muted-foreground font-semibold text-lg">{stat.label}</div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute bottom-2 left-2">
                    <CircleDot className="h-4 w-4 text-primary/30 animate-pulse" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <Sparkles className="h-4 w-4 text-accent/40 animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Private Partners Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/3 to-background">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-40 right-20 w-48 h-48 bg-accent/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-md border border-primary/20 rounded-full px-8 py-4 mb-8">
              <Building2 className="h-6 w-6 text-primary animate-pulse" />
              <span className="text-primary font-bold text-lg">Industry Leaders</span>
              <Gem className="h-6 w-6 text-accent animate-pulse" />
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
              Esteemed{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                Private Partners
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              <span className="font-bold text-primary">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span> is proudly affiliated with industry-leading private companies, ensuring exceptional placement opportunities across diverse sectors.
            </p>
          </div>
          
          {/* Enhanced Partners Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {privatePartners.map((partner, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden bg-card/90 backdrop-blur-md border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center relative">
                  {/* Floating Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Icon Container with Animation */}
                  <div className={`relative w-20 h-20 ${partner.bg} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{partner.icon}</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                  </div>
                  
                  {/* Company Name */}
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {partner.name}
                  </h3>
                  
                  {/* Sector Badge */}
                  <div className={`inline-flex items-center space-x-2 px-4 py-2 ${partner.bg} rounded-full mb-4`}>
                    <Layers className={`h-4 w-4 ${partner.color}`} />
                    <span className={`text-sm font-semibold ${partner.color}`}>{partner.sector}</span>
                  </div>
                  
                  {/* Premium Badge */}
                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="h-4 w-4 text-yellow-500 fill-current animate-pulse" 
                          style={{ animationDelay: `${star * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium mt-2 block">Premium Partner</span>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4">
                    <Badge className="h-5 w-5 text-primary/30 group-hover:text-primary/60 transition-colors duration-300" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Network className="h-4 w-4 text-accent/40 group-hover:text-accent/80 transition-colors duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Partnership CTA */}
          <div className="text-center mt-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold px-12 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <Handshake className="mr-3 h-6 w-6" />
              Join Our Partner Network
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Government Partners Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImhleGFnb24iIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cG9seWdvbiBwb2ludHM9IjUwIDEwIDkwIDMwIDkwIDcwIDUwIDkwIDEwIDcwIDEwIDMwIiBmaWxsPSJub25lIiBzdHJva2U9ImhzbCgyMTUgMTAwJSA2MCUgLyAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjaGV4YWdvbikiLz48L3N2Zz4=')] opacity-30"></div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-32 left-16 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-32 right-16 w-56 h-56 bg-gradient-to-br from-accent/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-xl border border-primary/30 rounded-full px-8 py-4 mb-8">
              <Crown className="h-6 w-6 text-primary animate-pulse" />
              <span className="text-primary font-bold text-lg">Government Excellence</span>
              <Shield className="h-6 w-6 text-accent animate-pulse" />
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
              Your Gateway to{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Government Certification
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-5xl mx-auto leading-relaxed">
              <span className="font-bold text-primary">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span> is proudly affiliated with prestigious government bodies, providing certified training programs and guaranteed placement opportunities with complete government backing.
            </p>
          </div>
          
          {/* Enhanced Government Partners Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {governmentPartners.map((partner, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden bg-card/95 backdrop-blur-xl border-2 border-primary/30 hover:border-primary/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl rounded-3xl"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-10 relative">
                  {/* Premium Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  
                  {/* Government Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent rounded-full p-2">
                    <Shield className="h-4 w-4 text-white" />
                  </div>
                  
                  <div className="flex items-start space-x-6 relative">
                    {/* Enhanced Icon Container */}
                    <div className={`w-20 h-20 ${partner.bg} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl relative overflow-hidden`}>
                      <partner.icon className={`h-10 w-10 ${partner.color} relative z-10`} />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-accent/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    <div className="flex-1">
                      {/* Organization Name */}
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {partner.name}
                      </h3>
                      
                      {/* Full Name */}
                      <p className="text-muted-foreground leading-relaxed mb-4">{partner.fullName}</p>
                      
                      {/* Certification Badge */}
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm text-primary font-semibold">Certified Partner</span>
                        </div>
                      </div>
                      
                      {/* Government Verification */}
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Fingerprint className="h-4 w-4 text-accent" />
                        <span>Government Verified</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="mt-6 w-full bg-primary/10 rounded-full h-1 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    ></div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute bottom-4 right-4">
                    <Eye className="h-4 w-4 text-primary/30 group-hover:text-primary/60 transition-colors duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Government Partnership CTA */}
          <div className="text-center mt-20">
            <div className="inline-flex flex-col items-center space-y-6">
              <div className="text-lg text-muted-foreground font-medium">
                Experience Government-Backed Excellence
              </div>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary via-accent to-primary hover:scale-105 transition-all duration-300 text-white font-bold px-16 py-6 rounded-full shadow-2xl text-xl"
              >
                <Crown className="mr-4 h-7 w-7" />
                Get Government Certification
                <ArrowRight className="ml-4 h-7 w-7" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Partnership Benefits Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iY2lyY2xlcyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyIiBmaWxsPSJub25lIiBzdHJva2U9ImhzbCgyMTUgMTAwJSA2MCUgLyAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjY2lyY2xlcykiLz48L3N2Zz4=')] opacity-40"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Premium Card Container */}
            <Card className="relative overflow-hidden bg-card/95 backdrop-blur-xl border-2 border-primary/30 rounded-3xl shadow-2xl">
              <CardContent className="p-16">
                {/* Section Header */}
                <div className="text-center mb-16">
                  <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-md border border-primary/30 rounded-full px-8 py-4 mb-8">
                    <Target className="h-6 w-6 text-primary animate-pulse" />
                    <span className="text-primary font-bold text-lg">Partnership Excellence</span>
                    <Gift className="h-6 w-6 text-accent animate-pulse" />
                  </div>
                  
                  <h3 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                    Why Partners{' '}
                    <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                      Choose Us
                    </span>
                  </h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  {/* Benefits Content */}
                  <div className="space-y-8">
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                      Our comprehensive training programs and industry-aligned curriculum ensure that our graduates are job-ready and contribute effectively from day one.
                    </p>
                    
                    {/* Enhanced Benefits List */}
                    <div className="space-y-6">
                      {[
                        { text: "Industry-ready skilled workforce", icon: Users },
                        { text: "Reduced training and onboarding costs", icon: TrendingUp },
                        { text: "Continuous skill upgradation support", icon: Rocket },
                        { text: "Access to diverse talent pool", icon: Globe },
                        { text: "Government certification and compliance", icon: Shield }
                      ].map((benefit, index) => (
                        <div 
                          key={index}
                          className="flex items-center space-x-4 group hover:scale-105 transition-transform duration-300"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <benefit.icon className="h-6 w-6 text-primary" />
                          </div>
                          <span className="text-lg text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                            {benefit.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-8">
                      <Button 
                        size="lg"
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold px-12 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-xl"
                      >
                        <Handshake className="mr-3 h-6 w-6" />
                        Start Partnership Journey
                        <ChevronRight className="ml-3 h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Partnership Opportunities Panel */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-xl rounded-3xl p-10 border-2 border-primary/20 relative overflow-hidden">
                      {/* Floating Background Elements */}
                      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl animate-pulse"></div>
                      <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
                      
                      <div className="relative z-10 text-center">
                        {/* Animated Icon */}
                        <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl flex items-center justify-center mx-auto mb-8 hover:scale-110 transition-transform duration-300">
                          <Handshake className="h-12 w-12 text-primary animate-pulse" />
                        </div>
                        
                        <h4 className="text-3xl font-bold text-foreground mb-8">Partnership Opportunities</h4>
                        
                        {/* Opportunities List */}
                        <div className="space-y-6">
                          {[
                            { text: "Recruitment Partnerships", icon: Users },
                            { text: "Skill Development Programs", icon: Puzzle },
                            { text: "Industry Collaborations", icon: Network },
                            { text: "Training Partnerships", icon: GraduationCap }
                          ].map((opportunity, index) => (
                            <div 
                              key={index}
                              className="flex items-center justify-between p-4 bg-card/50 backdrop-blur-md rounded-2xl border border-primary/20 hover:border-primary/40 hover:scale-105 transition-all duration-300 group"
                              style={{ animationDelay: `${index * 0.15}s` }}
                            >
                              <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                                  <opportunity.icon className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                                  {opportunity.text}
                                </span>
                              </div>
                              <ChevronRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          ))}
                        </div>
                        
                        <Button className="w-full mt-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold py-4 rounded-full hover:scale-105 transition-all duration-300">
                          <Flame className="mr-3 h-5 w-5" />
                          Become a Partner
                          <ArrowRight className="ml-3 h-5 w-5" />
                        </Button>
                      </div>
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