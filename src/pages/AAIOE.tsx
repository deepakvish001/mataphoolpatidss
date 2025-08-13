import { 
  Brain,
  BookOpen,
  Users,
  Lightbulb,
  Network,
  Award,
  Target,
  Globe,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  Bot,
  Code,
  Cpu,
  Database,
  FileText,
  Handshake,
  Search,
  TrendingUp,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const AAIOE = () => {
  const stats = [
    { number: "21", label: "Published Books", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { number: "55", label: "AI/ML Experts", icon: Users, color: "text-green-600", bg: "bg-green-50" },
    { number: "100%", label: "Industry Focused", icon: Target, color: "text-purple-600", bg: "bg-purple-50" },
    { number: "∞", label: "Innovation Potential", icon: Lightbulb, color: "text-orange-600", bg: "bg-orange-50" }
  ];

  const benefits = [
    {
      title: "Collaborative Research Opportunities",
      description: "Work alongside industry experts and academic leaders on transformative AI and ML projects that shape the future.",
      icon: Search,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Cutting-Edge Knowledge Resources",
      description: "Gain exclusive access to the latest research papers, publications, and insights that keep you ahead in the field.",
      icon: FileText,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      title: "Joint Initiatives and Projects",
      description: "Partner with organizations and experts to co-create AI-powered solutions that address real-world industry challenges.",
      icon: Handshake,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      title: "Skill Development Programs",
      description: "Access specialized workshops, training, and certifications tailored to equip members with advanced technical and leadership skills.",
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      title: "Professional Networking",
      description: "Build meaningful connections with peers, innovators, and thought leaders, opening doors to collaboration and new opportunities.",
      icon: Network,
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    {
      title: "Global Recognition",
      description: "Enhance your professional profile by being part of a prestigious association recognized for its contributions to AI and ML advancements.",
      icon: Award,
      color: "text-red-600",
      bg: "bg-red-50"
    }
  ];

  const features = [
    {
      title: "Pioneering Knowledge and Innovation",
      subtitle: "Thought Leaders in AI",
      description: "With 21 published books on AI and ML, authored by an inhouse team of experts, MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN is setting the benchmark for thought leadership in these transformative fields. Furthermore, the institution is actively writing additional books to empower students, working professionals, and organizations by providing cutting-edge insights and practical knowledge.",
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Unparalleled Expertise",
      subtitle: "Industry Veterans",
      description: "MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN is powered by a team of 55 seasoned experts with vast real-world experience in Artificial Intelligence and Machine Learning. These industry veterans are innovators who bring their hands-on expertise, cutting-edge knowledge, and practical insights into every course and collaboration.",
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      title: "Innovative Learning Programs",
      subtitle: "Future-Ready Skills",
      description: "MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN offers robust online courses designed to equip individuals with the tools and skills necessary to excel in today's AI-driven industries.",
      icon: Cpu,
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-6xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6">
              <Brain className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">AI & ML Excellence</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Association of Artificial Intelligence <br />
              for <span className="text-primary">Organizations and Experts</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-8">
              MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN: Shaping the Future of Artificial Intelligence and Machine Learning
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-5xl mx-auto">
              Artificial Intelligence and Machine Learning are transforming industries, reshaping careers, and redefining innovation. At the helm of this revolution stands <span className="text-primary font-semibold">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span>, a leading institution known for its exceptional contributions to AI and ML education, research, and collaboration.
            </p>
            
            <Button className="btn-primary">
              <Phone className="mr-2 h-5 w-5" />
              Join AAIOE
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

      {/* Features Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {features.map((feature, index) => (
              <Card key={index} className="card-premium">
                <CardContent className="p-8 md:p-12">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className={index % 2 === 0 ? 'order-1' : 'order-2'}>
                      <div className={`w-20 h-20 ${feature.bg} rounded-2xl flex items-center justify-center mb-6`}>
                        <feature.icon className={`h-10 w-10 ${feature.color}`} />
                      </div>
                      <h3 className="text-3xl font-bold text-foreground mb-4">{feature.title}</h3>
                      <h4 className="text-xl font-semibold text-primary mb-6">{feature.subtitle}</h4>
                      <p className="text-lg text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                    
                    <div className={`${index % 2 === 0 ? 'order-2' : 'order-1'} bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20`}>
                      <div className="text-center">
                        <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">AI Innovation</span>
                            <span className="text-primary font-bold">Advanced</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Research Impact</span>
                            <span className="text-primary font-bold">High</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Industry Connect</span>
                            <span className="text-primary font-bold">Strong</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AAIOE Platform Section */}
      <section className="section-padding bg-gradient-to-r from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6">
              <Network className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">Collaborative Platform</span>
            </div>
            
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Association of Artificial Intelligence for Organizations and Experts (AAIOE):
            </h2>
            <h3 className="text-2xl font-semibold text-primary mb-8">A Catalyst for Collaboration and Progress</h3>
            
            <div className="max-w-4xl mx-auto">
              <Card className="card-premium">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mr-4">
                      <Code className="h-8 w-8 text-primary" />
                    </div>
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Database className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    <span className="text-primary font-semibold">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span> in collaboration with various Start-ups and Industry Experts has established the Association of Artificial Intelligence for Organizations and Experts (AAIOE). It is a unique platform to connect businesses, researchers, and professionals with shared goals of driving innovation and success in AI and ML.
                  </p>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    This thriving community enables members to lead advancements in these fields while benefiting from:
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${benefit.bg} rounded-2xl flex items-center justify-center mb-6`}>
                    <benefit.icon className={`h-8 w-8 ${benefit.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="card-premium">
              <CardContent className="p-12">
                <div className="text-center">
                  <div className="inline-flex items-center space-x-4 mb-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Zap className="h-10 w-10 text-primary" />
                    </div>
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Bot className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  
                  <h2 className="text-4xl font-bold text-foreground mb-6">AAIOE is not just a platform</h2>
                  <p className="text-2xl text-primary font-semibold mb-8">
                    It is a movement driving impactful change in Artificial Intelligence, creating pathways for groundbreaking innovation and success
                  </p>
                  
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 mb-8">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      <span className="text-primary font-semibold">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span> has become synonymous with excellence, innovation, and expertise in Artificial Intelligence and Machine Learning. Through its relentless commitment to advancing education and research, <span className="text-primary font-semibold">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span> inspires professionals, organizations, and academic institutions to join forces in creating a smarter, AI-driven future.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="btn-primary">
                      <Network className="mr-2 h-5 w-5" />
                      Join AAIOE Community
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button variant="outline" className="btn-secondary">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Explore AI Programs
                    </Button>
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

export default AAIOE;