import { 
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  User,
  Building2,
  Globe,
  CheckCircle,
  ArrowRight,
  FileText,
  Shield,
  Info,
  Calendar,
  HeadphonesIcon,
  Sparkles,
  Rocket,
  TrendingUp,
  Star,
  Award,
  Target,
  Users,
  Heart,
  Zap,
  Gift,
  Crown,
  Gem,
  Flame,
  ChevronRight,
  Eye,
  Network,
  CircleDot,
  Layers,
  Badge,
  Fingerprint
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const ContactUs = () => {
  const contactMethods = [
    {
      title: "Call Us",
      description: "Speak directly with our experts",
      icon: Phone,
      details: ["+91 7007989716", "+91 9004362661"],
      color: "text-green-600",
      bg: "bg-green-50",
      action: "Call Now"
    },
    {
      title: "Email Us",
      description: "Send us your queries",
      icon: Mail,
      details: ["info.mpdss@gmail.com"],
      color: "text-blue-600",
      bg: "bg-blue-50",
      action: "Send Email"
    },
    {
      title: "Visit Our Website",
      description: "Explore our complete offerings",
      icon: Globe,
      details: ["www.mataphoolpatidss.in"],
      color: "text-purple-600",
      bg: "bg-purple-50",
      action: "Visit Website"
    },
    {
      title: "Office Hours",
      description: "Monday - Saturday",
      icon: Clock,
      details: ["9:00 AM - 6:00 PM"],
      color: "text-orange-600",
      bg: "bg-orange-50",
      action: "Plan Visit"
    }
  ];

  const officeDetails = [
    {
      title: "GST Number",
      value: "09AAXAM0981E1Z3",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "PAN Number", 
      value: "AAXAM0981E",
      icon: Shield,
      color: "text-green-600"
    },
    {
      title: "Registration Number",
      value: "BAL/10760/2019-2020",
      icon: Building2,
      color: "text-purple-600"
    }
  ];

  const services = [
    { name: "Skill Development Programs", icon: "🎓" },
    { name: "Government Training Schemes", icon: "🏛️" },
    { name: "Placement Assistance", icon: "💼" },
    { name: "Entrepreneurship Development", icon: "🚀" },
    { name: "Career Guidance", icon: "🎯" },
    { name: "Industry Partnerships", icon: "🤝" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
          
          {/* Floating Contact Icons */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-3 h-3 bg-white/20 rounded-full animate-ping"></div>
            <div className="absolute top-40 right-32 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-white/25 rounded-full animate-bounce"></div>
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 right-20 w-2 h-2 bg-white/35 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-6xl mx-auto">
            {/* Floating Badge */}
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 mb-8 hover:scale-105 transition-transform duration-300">
              <MessageSquare className="h-6 w-6 text-white animate-pulse" />
              <span className="text-white font-semibold text-lg">Get In Touch</span>
              <Heart className="h-6 w-6 text-white animate-pulse" />
            </div>
            
            {/* Main Heading with Gradient Text */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight">
              <span className="text-white">Contact</span>{' '}
              <span className="bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent animate-pulse">
                Us
              </span>
            </h1>
            
            {/* Enhanced Description */}
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-5xl mx-auto font-light">
              Ready to transform your career with skill development? Our expert team at{' '}
              <span className="font-bold bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
                MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN
              </span>{' '}
              is here to guide you towards success. Get in touch today!
            </p>
            
            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl px-10 py-4 text-lg font-semibold">
                <Phone className="mr-3 h-6 w-6" />
                Call Us Now
                <ChevronRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-md hover:scale-105 transition-all duration-300 px-10 py-4 text-lg font-semibold"
              >
                <Mail className="mr-3 h-6 w-6" />
                Send Message
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>

            {/* Quick Contact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 animate-pulse">24/7</div>
                <div className="text-white/80 font-medium">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 animate-pulse" style={{ animationDelay: '0.5s' }}>24hrs</div>
                <div className="text-white/80 font-medium">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 animate-pulse" style={{ animationDelay: '1s' }}>100%</div>
                <div className="text-white/80 font-medium">Query Resolution</div>
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

      {/* Enhanced Contact Methods Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZG90cyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIxIiBmaWxsPSJoc2woMjE1IDEwMCUgNjAlIC8gMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkb3RzKSIvPjwvc3ZnPg==')] opacity-50"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-primary/10 backdrop-blur-md border border-primary/20 rounded-full px-8 py-4 mb-8">
              <Zap className="h-6 w-6 text-primary animate-pulse" />
              <span className="text-primary font-bold text-lg">Multiple Ways to Connect</span>
              <Network className="h-6 w-6 text-accent animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Choose Your{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Preferred Method
              </span>
            </h2>
          </div>

          {/* Enhanced Contact Methods Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden bg-card/90 backdrop-blur-md border-2 border-primary/20 hover:border-primary/40 transition-all duration-500 hover:scale-105 hover:shadow-2xl text-center"
              >
                <CardContent className="p-10 relative">
                  {/* Floating Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Icon Container with Animation */}
                  <div className={`relative w-20 h-20 ${method.bg} rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    <method.icon className={`h-10 w-10 ${method.color} group-hover:scale-110 transition-transform duration-300`} />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {method.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">{method.description}</p>
                  
                  {/* Contact Details */}
                  <div className="space-y-3 mb-8">
                    {method.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className={`inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full`}>
                        <Star className="h-4 w-4 text-primary" />
                        <span className={`font-semibold ${method.color} text-sm`}>{detail}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Action Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300"
                  >
                    <ChevronRight className="mr-2 h-4 w-4" />
                    {method.action}
                  </Button>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4">
                    <Badge className="h-5 w-5 text-primary/30 group-hover:text-primary/60 transition-colors duration-300" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <CircleDot className="h-4 w-4 text-accent/40 group-hover:text-accent/80 transition-colors duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Office Details */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
      {/* Enhanced Contact Form Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="absolute inset-0">
            <div className="absolute top-32 left-16 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-32 right-16 w-56 h-56 bg-gradient-to-br from-accent/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Enhanced Contact Form */}
            <div>
              <div className="mb-12">
                <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-md border border-primary/20 rounded-full px-6 py-3 mb-6">
                  <Send className="h-5 w-5 text-primary animate-pulse" />
                  <span className="text-primary font-semibold">Send Message</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Let's Start{' '}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Conversation
                  </span>
                </h2>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Fill out the form below and we'll get back to you within 24 hours with personalized guidance for your career journey.
                </p>
              </div>
              
              <Card className="relative overflow-hidden bg-card/95 backdrop-blur-xl border-2 border-primary/30 rounded-3xl shadow-2xl">
                <CardContent className="p-10">
                  {/* Premium Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50 rounded-3xl"></div>
                  
                  <form className="space-y-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="firstName" className="text-foreground font-semibold">First Name</Label>
                        <Input 
                          id="firstName" 
                          placeholder="Enter your first name" 
                          className="h-12 bg-background/50 backdrop-blur-md border-primary/20 focus:border-primary/40 rounded-xl" 
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="lastName" className="text-foreground font-semibold">Last Name</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Enter your last name" 
                          className="h-12 bg-background/50 backdrop-blur-md border-primary/20 focus:border-primary/40 rounded-xl" 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-foreground font-semibold">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Enter your email" 
                        className="h-12 bg-background/50 backdrop-blur-md border-primary/20 focus:border-primary/40 rounded-xl" 
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-foreground font-semibold">Phone Number</Label>
                      <Input 
                        id="phone" 
                        placeholder="Enter your phone number" 
                        className="h-12 bg-background/50 backdrop-blur-md border-primary/20 focus:border-primary/40 rounded-xl" 
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="program" className="text-foreground font-semibold">Program of Interest</Label>
                      <Input 
                        id="program" 
                        placeholder="Which program interests you?" 
                        className="h-12 bg-background/50 backdrop-blur-md border-primary/20 focus:border-primary/40 rounded-xl" 
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="message" className="text-foreground font-semibold">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us how we can help you transform your career..." 
                        rows={6} 
                        className="bg-background/50 backdrop-blur-md border-primary/20 focus:border-primary/40 rounded-xl resize-none" 
                      />
                    </div>
                    
                    <Button className="w-full h-14 bg-gradient-to-r from-primary via-accent to-primary hover:scale-105 transition-all duration-300 text-white font-bold text-lg rounded-xl shadow-xl">
                      <Send className="mr-3 h-6 w-6" />
                      Send Message
                      <Sparkles className="ml-3 h-6 w-6" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Office Details */}
            <div className="space-y-8">
              <div className="mb-12">
                <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-md border border-primary/20 rounded-full px-6 py-3 mb-6">
                  <Building2 className="h-5 w-5 text-primary animate-pulse" />
                  <span className="text-primary font-semibold">Our Office</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Visit Our{' '}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Campus
                  </span>
                </h2>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Visit us at our registered office or connect with us through digital channels for immediate assistance.
                </p>
              </div>
              
              {/* Enhanced Address Card */}
              <Card className="relative overflow-hidden bg-card/95 backdrop-blur-xl border-2 border-primary/30 rounded-3xl shadow-xl">
                <CardContent className="p-10">
                  {/* Premium Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50 rounded-3xl"></div>
                  
                  <div className="flex items-start space-x-6 relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">Registered Office</h3>
                      <div className="space-y-2">
                        <p className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                          MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN
                        </p>
                        <p className="text-muted-foreground leading-relaxed text-lg">
                          Vill- Murarpatti, Post Lalganj,<br />
                          Tahsil Bairiya, Dist Ballia,<br />
                          (U.P.) 271216
                        </p>
                      </div>
                      
                      {/* Direction Button */}
                      <Button 
                        className="mt-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-full hover:scale-105 transition-all duration-300"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Get Directions
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Official Details */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground mb-6">Official Information</h3>
                {officeDetails.map((detail, index) => (
                  <Card 
                    key={index} 
                    className="group relative overflow-hidden bg-card/90 backdrop-blur-md border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 rounded-2xl"
                  >
                    <CardContent className="p-8">
                      {/* Floating Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                      
                      <div className="flex items-center space-x-6 relative z-10">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                          <detail.icon className={`h-6 w-6 ${detail.color}`} />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground font-medium mb-1">{detail.title}</p>
                          <p className="font-bold text-foreground text-lg group-hover:text-primary transition-colors duration-300">{detail.value}</p>
                        </div>
                        
                        {/* Verification Badge */}
                        <div className="ml-auto">
                          <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            <CheckCircle className="h-4 w-4" />
                            <span>Verified</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Enhanced Services Quick Access */}
              <Card className="relative overflow-hidden bg-card/95 backdrop-blur-xl border-2 border-primary/30 rounded-3xl shadow-xl">
                <CardContent className="p-10">
                  {/* Premium Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50 rounded-3xl"></div>
                  
                  <div className="relative z-10">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-foreground mb-4">What Can We Help You With?</h3>
                      <p className="text-muted-foreground">Our comprehensive services designed for your success</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {services.map((service, index) => (
                        <div 
                          key={index} 
                          className="group flex items-center space-x-4 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">{service.icon}</span>
                          </div>
                          <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{service.name}</span>
                          <ChevronRight className="h-5 w-5 text-primary ml-auto group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      ))}
                    </div>
                    
                    {/* Contact CTA */}
                    <div className="text-center mt-10">
                      <Button 
                        size="lg" 
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold px-12 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-xl"
                      >
                        <Phone className="mr-3 h-6 w-6" />
                        Schedule Consultation
                        <Calendar className="ml-3 h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iY2lyY2xlcyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIyIiBmaWxsPSJub25lIiBzdHJva2U9ImhzbCgyMTUgMTAwJSA2MCUgLyAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjY2lyY2xlcykiLz48L3N2Zz4=')] opacity-40"></div>
          
          {/* Floating Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-16 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-40 right-20 w-48 h-48 bg-accent/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-xl border border-primary/30 rounded-full px-8 py-4 mb-8">
              <Info className="h-6 w-6 text-primary animate-pulse" />
              <span className="text-primary font-bold text-lg">Quick Answers</span>
              <Target className="h-6 w-6 text-accent animate-pulse" />
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-8 leading-tight">
              Frequently{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Asked Questions
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Quick answers to common queries about our programs and services
            </p>
          </div>
          
          {/* Enhanced FAQ Grid */}
          <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
            {[
              {
                question: "How do I enroll in a program?",
                answer: "Contact us through phone, email, or visit our office. Our counselors will guide you through the enrollment process and help you choose the right program.",
                icon: Users
              },
              {
                question: "Are the programs government certified?",
                answer: "Yes, all our programs are government certified and aligned with NSDC standards. You'll receive recognized certificates upon completion.",
                icon: Award
              },
              {
                question: "Do you provide placement assistance?",
                answer: "Absolutely! We have partnerships with 50+ companies and provide 100% placement assistance to all our trained candidates.",
                icon: Rocket
              },
              {
                question: "What is the duration of training programs?",
                answer: "Program duration varies from 3 months to 1 year depending on the course. All programs include both theoretical and practical training components.",
                icon: Clock
              }
            ].map((faq, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden bg-card/95 backdrop-blur-xl border-2 border-primary/30 hover:border-primary/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl rounded-3xl"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-10 relative">
                  {/* Premium Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                  
                  {/* FAQ Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <faq.icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  {/* Question */}
                  <h3 className="text-xl font-bold text-foreground mb-6 group-hover:text-primary transition-colors duration-300 leading-relaxed">
                    {faq.question}
                  </h3>
                  
                  {/* Answer */}
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {faq.answer}
                  </p>
                  
                  {/* Progress Indicator */}
                  <div className="mt-8 w-full bg-primary/10 rounded-full h-1 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-out"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    ></div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-6 right-6">
                    <Fingerprint className="h-5 w-5 text-primary/30 group-hover:text-primary/60 transition-colors duration-300" />
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <Layers className="h-4 w-4 text-accent/40 group-hover:text-accent/80 transition-colors duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-20">
            <div className="inline-flex flex-col items-center space-y-6">
              <div className="text-lg text-muted-foreground font-medium">
                Still have questions? We're here to help!
              </div>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary via-accent to-primary hover:scale-105 transition-all duration-300 text-white font-bold px-16 py-6 rounded-full shadow-2xl text-xl"
              >
                <HeadphonesIcon className="mr-4 h-7 w-7" />
                Contact Our Support Team
                <ArrowRight className="ml-4 h-7 w-7" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;