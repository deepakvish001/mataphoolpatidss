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
      description: "Modern farming techniques and agricultural practices"
    },
    {
      name: "Healthcare",
      icon: Stethoscope,
      description: "Medical assistance and healthcare support services"
    },
    {
      name: "Media & Entertainment",
      icon: Camera,
      description: "Digital media production and entertainment industry skills"
    },
    {
      name: "Beauty and Wellness",
      icon: Sparkles,
      description: "Beauty therapy and wellness service expertise"
    },
    {
      name: "Apparel",
      icon: Shirt,
      description: "Garment manufacturing and fashion industry skills"
    }
  ];

  const commitments = [
    {
      title: "Lab Establishment",
      description: "Delivering and installing tools, machinery, and equipment to set up fully functional vocational training labs.",
      icon: Building2
    },
    {
      title: "Vocational Trainer Deployment",
      description: "Recruiting and deploying highly trained vocational trainers (VTs) to deliver practical and theoretical lessons to students.",
      icon: UserCheck
    },
    {
      title: "Monitoring Manpower Deployment",
      description: "Appointing dedicated personnel for the continuous monitoring and evaluation of the program's progress.",
      icon: Monitor
    },
    {
      title: "Guest Lectures",
      description: "Organizing expert-led guest sessions to provide insights into industry trends and real-world practices.",
      icon: Users
    },
    {
      title: "Industrial Visits",
      description: "Coordinating visits to industries to give students first-hand exposure to workplace environments and operations.",
      icon: Factory
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
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-primary/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.08),transparent_50%)]"></div>
        </div>
        
        <div className="relative py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-full px-6 py-3 mb-8 animate-fade-in">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">National Initiative</span>
              </div>
              
              {/* Main Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in leading-tight">
                National Skills Qualification Framework<br />
                <span className="text-gradient">(NSQF) Project</span>
              </h1>
              
              {/* Subtitle */}
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground mb-8 animate-fade-in">
                Empowering the Future of Work
              </h2>
              
              {/* Description */}
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed max-w-4xl mx-auto animate-fade-in">
                <span className="text-primary font-semibold">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span> is honoured to be a key partner in the Jharkhand Education Project Council (JEPC) and initiatives by other states to improve vocational education and skill development opportunities for students nationwide.
              </p>
              
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-4xl mx-auto animate-fade-in">
                This project is a significant step toward empowering students and aligning education with the evolving demands of the modern workforce.
              </p>
              
              {/* CTA Button */}
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                <Phone className="mr-2 h-5 w-5" />
                Contact Us Today
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
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <sector.icon className="h-10 w-10 text-primary" />
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
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <commitment.icon className="h-8 w-8 text-primary" />
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