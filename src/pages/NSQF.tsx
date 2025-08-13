import { 
  GraduationCap,
  Target,
  Users,
  Monitor,
  Building2,
  Award,
  CheckCircle,
  Phone,
  MapPin,
  Calendar,
  Eye,
  Briefcase,
  Stethoscope,
  Camera,
  Sparkles,
  Shirt,
  Wheat,
  BookOpen,
  UserCheck,
  Factory
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const NSQF = () => {
  const sectors = [
    {
      name: "Agriculture",
      icon: Wheat,
      color: "text-green-600",
      bg: "bg-green-50",
      description: "Modern farming techniques and agricultural practices"
    },
    {
      name: "Healthcare",
      icon: Stethoscope,
      color: "text-red-600",
      bg: "bg-red-50", 
      description: "Medical assistance and healthcare support services"
    },
    {
      name: "Media & Entertainment",
      icon: Camera,
      color: "text-purple-600",
      bg: "bg-purple-50",
      description: "Digital media production and entertainment industry skills"
    },
    {
      name: "Beauty and Wellness",
      icon: Sparkles,
      color: "text-pink-600",
      bg: "bg-pink-50",
      description: "Beauty therapy and wellness service expertise"
    },
    {
      name: "Apparel",
      icon: Shirt,
      color: "text-blue-600",
      bg: "bg-blue-50",
      description: "Garment manufacturing and fashion industry skills"
    }
  ];

  const commitments = [
    {
      title: "Lab Establishment",
      description: "Delivering and installing tools, machinery, and equipment to set up fully functional vocational training labs.",
      icon: Building2,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Vocational Trainer Deployment",
      description: "Recruiting and deploying highly trained vocational trainers (VTs) to deliver practical and theoretical lessons to students.",
      icon: UserCheck,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      title: "Monitoring Manpower Deployment",
      description: "Appointing dedicated personnel for the continuous monitoring and evaluation of the program's progress.",
      icon: Monitor,
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      title: "Guest Lectures",
      description: "Organizing expert-led guest sessions to provide insights into industry trends and real-world practices.",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      title: "Industrial Visits",
      description: "Coordinating visits to industries to give students first-hand exposure to workplace environments and operations.",
      icon: Factory,
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    }
  ];

  const stats = [
    { number: "480+", label: "Schools Equipped", icon: Building2 },
    { number: "29", label: "States Covered", icon: MapPin },
    { number: "5", label: "Key Sectors", icon: Target },
    { number: "100%", label: "Industry Ready", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">National Initiative</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              National Skills Qualification Framework
              <br />
              <span className="text-primary">(NSQF) Project</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-8">
              Empowering the Future of Work
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-4xl mx-auto">
              <span className="text-primary font-semibold">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span> is honoured to be a key partner in the Jharkhand Education Project Council (JEPC) and initiatives by other states to improve vocational education and skill development opportunities for students nationwide. The program aims to prepare young learners for industry-specific roles by equipping them with practical, job-ready skills.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-4xl mx-auto">
              This project is a significant step toward empowering students and aligning education with the evolving demands of the modern workforce.
            </p>
            
            <Button className="btn-primary">
              <Phone className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
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
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Infrastructure Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">State-of-the-Art Lab Infrastructure</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              As part of the project, we have established state-of-the-art Labs in 480+ schools. These labs are equipped with advanced tools, materials, and infrastructure, ensuring students receive hands-on training in high-demand sectors.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <Card key={index} className="card-hover group">
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 ${sector.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <sector.icon className={`h-10 w-10 ${sector.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{sector.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{sector.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Commitments Section */}
      <section className="section-padding bg-gradient-to-r from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Our Implementation Commitments</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              <span className="text-primary font-semibold">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span> is committed to ensuring the seamless implementation of this project through comprehensive support and services.
            </p>
          </div>
          
          <div className="space-y-8">
            {commitments.map((commitment, index) => (
              <Card key={index} className="card-premium">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className={`w-16 h-16 ${commitment.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <commitment.icon className={`h-8 w-8 ${commitment.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-4">{commitment.title}</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">{commitment.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="card-premium">
              <CardContent className="p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                      <Award className="h-4 w-4 text-primary" />
                      <span className="text-primary font-semibold">Partnership Excellence</span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-foreground mb-6">Key Partner in Educational Transformation</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      Our collaboration with Jharkhand Education Project Council (JEPC) and various state governments demonstrates our commitment to transforming vocational education across India.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Industry-aligned curriculum development</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Hands-on practical training approach</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Continuous monitoring and evaluation</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Industry exposure and networking</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
                    <div className="text-center">
                      <Building2 className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h4 className="text-2xl font-bold text-foreground mb-4">Future-Ready Infrastructure</h4>
                      <p className="text-muted-foreground mb-6">
                        Advanced labs equipped with cutting-edge technology to prepare students for tomorrow's challenges.
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">480+</div>
                          <div className="text-sm text-muted-foreground">Schools</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">5</div>
                          <div className="text-sm text-muted-foreground">Sectors</div>
                        </div>
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

export default NSQF;