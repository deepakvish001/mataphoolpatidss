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
  HeadphonesIcon
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
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">Get In Touch</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Contact <span className="text-primary">Us</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Ready to transform your career with skill development? Our expert team at <span className="text-primary font-semibold">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span> is here to guide you towards success. Get in touch today!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="section-padding bg-gradient-to-r from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="card-hover text-center">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${method.bg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <method.icon className={`h-8 w-8 ${method.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{method.title}</h3>
                  <p className="text-muted-foreground mb-4">{method.description}</p>
                  <div className="space-y-2 mb-6">
                    {method.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className={`font-semibold ${method.color}`}>{detail}</p>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    {method.action}
                  </Button>
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
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Send Us a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>
              
              <Card className="card-premium">
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter your first name" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter your last name" className="mt-2" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter your email" className="mt-2" />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Enter your phone number" className="mt-2" />
                    </div>
                    
                    <div>
                      <Label htmlFor="program">Program of Interest</Label>
                      <Input id="program" placeholder="Which program interests you?" className="mt-2" />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Tell us how we can help you..." rows={5} className="mt-2" />
                    </div>
                    
                    <Button className="btn-primary w-full">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Office Details */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">Our Office</h2>
                <p className="text-muted-foreground">
                  Visit us at our registered office or connect with us through digital channels.
                </p>
              </div>
              
              {/* Address Card */}
              <Card className="card-premium mb-8">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Registered Office</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        <span className="font-semibold text-primary">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span><br />
                        Vill- Murarpatti, Post Lalganj,<br />
                        Tahsil Bairiya, Dist Ballia,<br />
                        (U.P.) 271216
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Official Details */}
              <div className="space-y-4 mb-8">
                {officeDetails.map((detail, index) => (
                  <Card key={index} className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <detail.icon className={`h-6 w-6 ${detail.color}`} />
                        <div>
                          <p className="text-sm text-muted-foreground">{detail.title}</p>
                          <p className="font-semibold text-foreground">{detail.value}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Services Quick Access */}
              <Card className="card-premium">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-foreground mb-6">What Can We Help You With?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {services.map((service, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/5 transition-colors">
                        <span className="text-xl">{service.icon}</span>
                        <span className="text-sm font-medium text-muted-foreground">{service.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gradient-to-r from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Quick answers to common queries</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="card-hover">
              <CardContent className="p-8">
                <h3 className="text-lg font-bold text-foreground mb-3">How do I enroll in a program?</h3>
                <p className="text-muted-foreground">Contact us through phone, email, or visit our office. Our counselors will guide you through the enrollment process and help you choose the right program.</p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-8">
                <h3 className="text-lg font-bold text-foreground mb-3">Are the programs government certified?</h3>
                <p className="text-muted-foreground">Yes, all our programs are government certified and aligned with NSDC standards. You'll receive recognized certificates upon completion.</p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-8">
                <h3 className="text-lg font-bold text-foreground mb-3">Do you provide placement assistance?</h3>
                <p className="text-muted-foreground">Absolutely! We have partnerships with 50+ companies and provide 100% placement assistance to all our trained candidates.</p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-8">
                <h3 className="text-lg font-bold text-foreground mb-3">What is the duration of training programs?</h3>
                <p className="text-muted-foreground">Program duration varies from 3 months to 1 year depending on the course. All programs include both theoretical and practical training components.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;