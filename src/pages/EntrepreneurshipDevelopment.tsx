import { 
  Lightbulb,
  Award,
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  Target,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
  Trophy,
  BookOpen,
  HandHeart,
  Eye,
  Briefcase,
  BarChart3,
  Rocket,
  Star,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const EntrepreneurshipDevelopment = () => {
  const prizes = [
    { position: "1st Prize", amount: "₹5,000", color: "text-yellow-600", bg: "bg-yellow-50", icon: Trophy },
    { position: "2nd Prize", amount: "₹3,000", color: "text-gray-600", bg: "bg-gray-50", icon: Award },
    { position: "3rd Prize", amount: "₹2,000", color: "text-orange-600", bg: "bg-orange-50", icon: Star }
  ];

  const steps = [
    {
      step: "01",
      title: "1st Handholding Session",
      description: "Initial guidance and support to kickstart your entrepreneurial journey with personalized mentoring.",
      icon: HandHeart,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      step: "02",
      title: "2nd Handholding Session",
      description: "Follow-up support session to address challenges and refine your business approach.",
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      step: "03",
      title: "Review Workshop",
      description: "Comprehensive review of your progress with feedback and strategic improvements.",
      icon: Eye,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      step: "04",
      title: "Project Management",
      description: "Professional project management guidance to ensure successful implementation.",
      icon: Briefcase,
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      step: "05",
      title: "Mudra Workshop",
      description: "Specialized workshop on Mudra loan facilitation and financial planning.",
      icon: DollarSign,
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    }
  ];

  const features = [
    {
      title: "Mudra Facilitation Cell",
      description: "Dedicated cell with personal monitoring and mentoring by Prof. Yogesh Kumar, Director, MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN",
      icon: Building2,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Idea Generation Competition",
      description: "Competitions for self-employment at each Skill India training centre with attractive cash prizes",
      icon: Lightbulb,
      color: "text-yellow-600",
      bg: "bg-yellow-50"
    },
    {
      title: "Sales & Marketing Training",
      description: "Special training provided to trainees who show interest in entrepreneurship development",
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      title: "Practical Product Experience",
      description: "Different products of ₹1000/- provided to trainees for real market experience and profit making",
      icon: BarChart3,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      title: "Project Reports",
      description: "Small project reports of viable projects developed for entrepreneurial ventures",
      icon: BookOpen,
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      title: "Incubation Centre",
      description: "Dedicated space at each PMKK Centre providing office facilities, sourcing, market analysis and sales support",
      icon: Rocket,
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6">
                <Rocket className="h-5 w-5 text-primary" />
                <span className="text-primary font-semibold">Innovation & Growth</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                ENTREPRENEURSHIP <br />
                <span className="text-primary">DEVELOPMENT</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                <span className="text-primary font-semibold">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span> has established a dedicated Mudra Facilitation cell with personal monitoring and mentoring by Prof. Yogesh Kumar, Director. We organize comprehensive entrepreneurship development programs to nurture and support aspiring entrepreneurs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-primary">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Start Your Journey
                </Button>
                <Button variant="outline" className="btn-secondary">
                  <Phone className="mr-2 h-5 w-5" />
                  Get Guidance
                </Button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
              <div className="text-center">
                <Building2 className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-4">Complete Entrepreneurship Ecosystem</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Mentoring</span>
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Funding Support</span>
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Market Access</span>
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Incubation</span>
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Section */}
      <section className="section-padding bg-gradient-to-r from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Idea Generation Competition</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We organize idea generation competitions for self-employment at each Skill India training centre with attractive cash prizes to encourage innovation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {prizes.map((prize, index) => (
              <Card key={index} className="card-hover text-center">
                <CardContent className="p-8">
                  <div className={`w-20 h-20 ${prize.bg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <prize.icon className={`h-10 w-10 ${prize.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{prize.position}</h3>
                  <div className={`text-3xl font-bold ${prize.color} mb-4`}>{prize.amount}</div>
                  <p className="text-muted-foreground">Cash prize for innovative ideas</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="card-premium">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Practical Market Experience</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Special Sales & Marketing Training is provided to the trainees who show interest in entrepreneurship. Different products of ₹1,000/- are provided to the trainees, and they sell and earn profit by marketing these products. This develops a habit of profit making.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Hands-on sales experience</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Real profit generation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">Marketing skill development</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
                  <div className="text-center">
                    <DollarSign className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-foreground mb-4">Product Investment</h4>
                    <div className="text-3xl font-bold text-primary mb-2">₹1,000</div>
                    <p className="text-muted-foreground">Per trainee for practical experience</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Comprehensive Support System</h2>
            <p className="text-xl text-muted-foreground">End-to-end entrepreneurship development ecosystem</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mb-6`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5-Step Process Section */}
      <section className="section-padding bg-gradient-to-r from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Your 5-Step Partner for Entrepreneurship Development</h2>
            <p className="text-xl text-muted-foreground">Trainer Success through structured guidance and support</p>
          </div>
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <Card key={index} className="card-premium">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-8">
                    <div className="flex-shrink-0">
                      <div className={`w-20 h-20 ${step.bg} rounded-2xl flex items-center justify-center mb-4`}>
                        <step.icon className={`h-10 w-10 ${step.color}`} />
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{step.step}</div>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <ArrowRight className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Incubation Center Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="card-premium">
              <CardContent className="p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                      <Building2 className="h-4 w-4 text-primary" />
                      <span className="text-primary font-semibold">Innovation Hub</span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-foreground mb-6">Incubation Centre Development</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      <span className="text-primary font-semibold">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span> has developed small project reports of viable projects. For each PMKK Centre, we are developing a space for an incubation centre.
                    </p>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                      This centre not only works as the common office of all the new entrepreneurs but also provides them sourcing, market analysis and sales support.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Common office space for entrepreneurs</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Sourcing and procurement support</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Market analysis and research</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        <span className="text-muted-foreground">Sales and marketing assistance</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
                    <div className="text-center">
                      <Rocket className="h-16 w-16 text-primary mx-auto mb-6" />
                      <h4 className="text-2xl font-bold text-foreground mb-4">Complete Ecosystem</h4>
                      
                      <div className="grid grid-cols-2 gap-6">
                        <div className="text-center">
                          <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
                          <div className="text-sm text-muted-foreground">Innovation</div>
                        </div>
                        <div className="text-center">
                          <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                          <div className="text-sm text-muted-foreground">Growth</div>
                        </div>
                        <div className="text-center">
                          <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                          <div className="text-sm text-muted-foreground">Community</div>
                        </div>
                        <div className="text-center">
                          <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                          <div className="text-sm text-muted-foreground">Success</div>
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

export default EntrepreneurshipDevelopment;