import { 
  Users, 
  Target, 
  BookOpen, 
  Award, 
  Globe, 
  Heart, 
  Shield, 
  Droplets, 
  Leaf, 
  Building, 
  UserCheck,
  Crown,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  ArrowRight,
  Calendar,
  ClipboardList,
  Monitor,
  Scale,
  TrendingUp,
  MessageSquare,
  DollarSign,
  Computer,
  Gavel
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const RashtriyaGramSwarajAbhiyan = () => {
  const objectives = [
    {
      icon: Users,
      title: "Capacity Building",
      description: "Enhance the capabilities of PRIs, functionaries, and other stakeholders through comprehensive capacity building and training on various skills."
    },
    {
      icon: Target,
      title: "Participatory Development",
      description: "Promote inclusive and participatory development process, reflecting the needs and aspirations of the local community."
    },
    {
      icon: Globe,
      title: "SDG Implementation",
      description: "Empower Panchayati Raj Institutions (PRIs) to effectively implement Sustainable Development Goals (SDGs) at the grassroots level."
    },
    {
      icon: Monitor,
      title: "Technology Integration",
      description: "Leveraging emerging technologies to our training sessions and ensuring timely delivery of all learning materials."
    },
    {
      icon: Crown,
      title: "Governance Enhancement",
      description: "Train Elected Representatives to develop their governance capabilities, capacity building, enhance capability of panchayats, revenue generation capabilities."
    }
  ];

  const lsdgs = [
    { name: "POVERTY FREE VILLAGE", icon: DollarSign },
    { name: "HEALTHY VILLAGE", icon: Heart },
    { name: "CHILD-FRIENDLY VILLAGE", icon: Users },
    { name: "WATER SUFFICIENT VILLAGE", icon: Droplets },
    { name: "CLEAN AND GREEN VILLAGE", icon: Leaf },
    { name: "SELF-SUFFICIENT VILLAGE", icon: Building },
    { name: "SOCIALLY SECURED VILLAGE", icon: Shield },
    { name: "VILLAGE WITH GOOD GOVERNANCE", icon: Crown },
    { name: "WOMEN FRIENDLY VILLAGE", icon: UserCheck }
  ];

  const specializedTrainings = [
    {
      number: "01",
      title: "Financial Management related Trainings:",
      description: "Provide specialized training to representatives at the State, District, and Block levels on the following topics:",
      topics: "GeM /PFMS /FRA/ (Own Source Revenue (OSR) Strategies / MIS through various digital portals & platforms / Contract Management",
      issues: ["Rural unemployment", "Rural Financing", "Skilling", "Rural Technology", "Eco-system for MSME"],
      icon: DollarSign
    },
    {
      number: "02",
      title: "IT Based Trainings:",
      description: "MIS /AI /TMP /SPATIAL Planning / Digital Literacy / E-Governance",
      icon: Computer
    },
    {
      number: "03",
      title: "Governance & Legal Laws:",
      description: "Provide comprehensive knowledge and understanding of all legal laws to all representatives.",
      topics: "Women Rights / Children Rights / Scheduled Tribes & Scheduled Area / PESA related special provisions",
      icon: Gavel
    },
    {
      number: "04",
      title: "Planning & Development Strategies:",
      description: "Rural Area Development Plan Formulation and Implementation (RADPFI)",
      topics: "SHG-PRI Convergence, Carbon Neutrality",
      icon: TrendingUp
    },
    {
      number: "05",
      title: "Organisational Behaviour:",
      description: "Leadership, Communication, Team Building, Negotiation Skills",
      icon: MessageSquare
    }
  ];

  const phases = [
    {
      phase: "Phase 1",
      title: "Needs Assessment & Planning",
      items: [
        "Identify: PRI training needs & locations.",
        "Develop: Customized training curriculum & batching.",
        "Plan: Diverse training methodologies (PPTs, discussions, etc.)."
      ]
    },
    {
      phase: "Phase 2",
      title: "Delivery & Implementation",
      items: [
        "Train-the-Trainer (TOT): Equip master trainers.",
        "Conduct: Accessible & inclusive training sessions.",
        "Leverage: Technology (digital platforms, AI, etc.).",
        "Organize: Exposure visits & evening cultural programs."
      ]
    },
    {
      phase: "Phase 3",
      title: "Post-Training Support & Feedback",
      items: [
        "Provide: Continuous support (mentorship, coaching).",
        "Facilitate: Knowledge sharing & experience exchange.",
        "Assess: Long-term impact on PRI performance.",
        "Track: Attendance, feedback, and post-training performance."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-primary/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary)/0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,hsl(var(--primary)/0.05)_50%,transparent_60%)]"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-primary/5 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-primary/8 rounded-full blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="relative z-10 py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center space-y-12">
              {/* Enhanced Badge */}
              <div className="inline-flex items-center gap-3 bg-card/80 backdrop-blur-lg border border-border rounded-full px-8 py-4 shadow-2xl animate-fade-in">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <Crown className="h-6 w-6 text-primary" />
                <span className="text-sm font-bold text-foreground tracking-wide">GOVERNMENT INITIATIVE</span>
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              </div>
              
              {/* Enhanced Main Title */}
              <div className="space-y-8">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 animate-fade-in leading-tight tracking-tight">
                  TRAINING UNDER REVAMPED<br />
                  <span className="text-gradient bg-gradient-to-r from-primary via-orange-500 to-primary bg-clip-text text-transparent animate-pulse">
                    RASHTIYA GRAM SWARAJ ABHIYAN
                  </span>
                </h1>
                
                {/* Enhanced Subtitle */}
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-muted-foreground animate-fade-in">
                    Panchayati Raj Training by
                  </h2>
                  <div className="text-xl md:text-2xl font-semibold text-primary bg-primary/10 rounded-2xl px-8 py-4 inline-block border border-primary/20">
                    MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN
                  </div>
                </div>
              </div>
              
              {/* Enhanced Description */}
              <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-medium">
                  Empowering Elected Representatives across <span className="text-primary font-bold">29 Constitutional Subjects</span> under Article 243(G) and the 11th Schedule
                </p>
                <p className="text-lg text-muted-foreground/80 leading-relaxed">
                  Integrating Sustainable Development Goals (SDGs) to enhance local governance effectiveness and build stronger democratic institutions at the grassroots level.
                </p>
              </div>
              
              {/* Enhanced Stats Grid */}
              <div className="grid md:grid-cols-3 gap-8 mb-12 animate-fade-in">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-card/60 backdrop-blur-lg border border-border rounded-3xl p-8 hover:bg-card/80 transition-all duration-500 transform group-hover:scale-105">
                    <div className="text-4xl md:text-5xl font-black text-primary mb-3">465,300</div>
                    <div className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Training Man-days Completed</div>
                    <div className="w-full h-1 bg-primary/20 rounded-full mt-4">
                      <div className="w-4/5 h-full bg-gradient-to-r from-primary to-orange-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-400/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-card/60 backdrop-blur-lg border border-border rounded-3xl p-8 hover:bg-card/80 transition-all duration-500 transform group-hover:scale-105">
                    <div className="text-4xl md:text-5xl font-black text-green-500 mb-3">29</div>
                    <div className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Constitutional Subjects</div>
                    <div className="w-full h-1 bg-green-500/20 rounded-full mt-4">
                      <div className="w-full h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-400/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-card/60 backdrop-blur-lg border border-border rounded-3xl p-8 hover:bg-card/80 transition-all duration-500 transform group-hover:scale-105">
                    <div className="text-4xl md:text-5xl font-black text-blue-500 mb-3">6+</div>
                    <div className="text-sm font-bold text-muted-foreground uppercase tracking-wide">States Covered</div>
                    <div className="w-full h-1 bg-blue-500/20 rounded-full mt-4">
                      <div className="w-3/4 h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced CTA Button */}
              <div className="space-y-6 animate-fade-in">
                <Button size="lg" className="group relative bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white px-12 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 font-bold text-lg">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-all duration-500"></div>
                  <div className="relative flex items-center gap-3">
                    <Phone className="h-6 w-6" />
                    Contact Us Today
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Button>
                
                <div className="flex items-center justify-center gap-8 text-muted-foreground/60 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Expert Training</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Multilingual Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Nationwide Coverage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Training Approach Section */}
      <section className="section-padding bg-gradient-to-r from-background to-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-lg shadow-2xl hover:shadow-3xl transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <CardContent className="relative p-8 md:p-16">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-3 bg-primary/10 border border-primary/20 rounded-full px-6 py-3">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <span className="text-primary font-bold">Our Methodology</span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
                        Comprehensive Training <span className="text-primary">Approach</span>
                      </h3>
                    </div>
                    
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      We utilize engaging and diverse methodologies including presentations, group discussions, audio-visual modules, field visits, role-playing, case studies, and debates.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-muted-foreground font-medium">Hindi, English & Regional Languages</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-muted-foreground font-medium">Interactive Learning Methods</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-muted-foreground font-medium">Real-world Case Studies</span>
                      </div>
                    </div>
                    
                    <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)]"></div>
                      <div className="relative text-center space-y-4">
                        <div className="text-4xl md:text-5xl font-black text-primary">465,300</div>
                        <p className="text-muted-foreground font-medium leading-relaxed">
                          Man-days of comprehensive PRI training delivered across Uttarakhand, Haryana, Himachal Pradesh, Jharkhand, Andhra Pradesh and expanding to more states
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl blur-xl"></div>
                    <div className="relative bg-gradient-to-br from-card to-card/80 rounded-3xl p-10 border border-border shadow-2xl transform hover:scale-105 transition-all duration-500">
                      <div className="text-center space-y-8">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg"></div>
                          <Crown className="relative h-20 w-20 text-primary mx-auto" />
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-2xl md:text-3xl font-black text-foreground">Constitutional Coverage</h4>
                          <p className="text-muted-foreground font-medium">29 subjects under Article 243(G) & 11th Schedule of Indian Constitution</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div className="text-center space-y-2">
                            <div className="text-3xl font-black text-primary">29</div>
                            <div className="text-sm text-muted-foreground font-medium">Subjects</div>
                          </div>
                          <div className="text-center space-y-2">
                            <div className="text-3xl font-black text-green-500">100%</div>
                            <div className="text-sm text-muted-foreground font-medium">Coverage</div>
                          </div>
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

      {/* Objectives Section */}
      <section className="section-padding bg-gradient-to-b from-background to-muted/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">Our Mission</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Training Objectives</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive goals driving our PRI training initiatives across the nation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <objective.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">{objective.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{objective.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Training Categories Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">BROAD TRAINING CATEGORIES</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* General Orientation */}
            <Card className="card-premium">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">GENERAL ORIENTATION TRAININGS FOR ERS</h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    In this category, we explain all the functions of PRIs covering 29 Subjects, mentioned under Article 243(G) & 11th Schedule of the Constitution of India by incorporating LSDGs to enhance effectiveness of local governance.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We make sure that the information is delivered to the Elected Representatives in a clear and engaging manner through PPTs, group discussions, audio & video modules, exposure visits, role-play, case studies, debates etc.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    To ensure maximum accessibility, We deliver content in Hindi, English, or the appropriate regional/vernacular language.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Refresher Programme */}
            <Card className="card-premium">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ClipboardList className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">REFRESHER PROGRAMME TRAININGS FOR ERS</h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    We prepare questionnaires and surveys to evaluate participants understanding of key concepts and functions covered in the orientation program. Trainers and coordinators will be available to assist participants in completing these assessments.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We facilitate group discussions and ask open-ended questions on specific topics to assess participants knowledge retention and critical thinking skills.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We also present real-world case studies related to local governance challenges and encourage participants to propose innovative solutions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* LSDG Section */}
      <section className="section-padding bg-gradient-to-b from-muted/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8">
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">Global Goals</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Thematic Training</h2>
            <h3 className="text-2xl font-semibold text-primary mb-4">Localization of Sustainable Development Goals (LSDGs)</h3>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Empowering villages through comprehensive development programs aligned with global sustainability goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lsdgs.map((lsdg, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <lsdg.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">{lsdg.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Trainings Section */}
      <section className="section-padding bg-gradient-to-b from-background to-muted/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-primary font-semibold">Expert Training</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Specialized Training Programs</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Comprehensive training modules designed to build expertise in critical governance areas
            </p>
          </div>
          
          <div className="space-y-8">
            {specializedTrainings.map((training, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80">
                <CardContent className="p-8 md:p-10">
                  <div className="flex items-start space-x-8">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <training.icon className="h-10 w-10 text-primary" />
                      </div>
                      <div className="text-4xl font-bold text-primary text-center mt-4 opacity-60">{training.number}</div>
                    </div>
                    
                    <div className="flex-1 space-y-6">
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{training.title}</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">{training.description}</p>
                      
                      {training.topics && (
                        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
                          <p className="text-muted-foreground font-medium">{training.topics}</p>
                        </div>
                      )}
                      
                      {training.issues && (
                        <div className="space-y-4">
                          <h4 className="font-bold text-foreground text-lg">Key Focus Areas:</h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {training.issues.map((issue, issueIndex) => (
                              <div key={issueIndex} className="flex items-center space-x-3 p-3 bg-card/30 rounded-lg">
                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                                <span className="text-muted-foreground">{issue}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Work Plan Section */}
      <section className="section-padding bg-gradient-to-r from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">WORK PLAN</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="card-hover">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">Location</h3>
                <p className="text-muted-foreground">Prioritize accessibility, infrastructure, and trainee convenience.</p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <ClipboardList className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">Needs Assessment</h3>
                <p className="text-muted-foreground">Survey PRIs to identify knowledge gaps and training needs.</p>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardContent className="p-6">
                <Calendar className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-bold text-foreground mb-2">Calendar</h3>
                <p className="text-muted-foreground">Create a training calendar based on identified needs.</p>
              </CardContent>
            </Card>
          </div>

          {/* Training Phases */}
          <div className="space-y-8">
            {phases.map((phase, index) => (
              <Card key={index} className="card-premium">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">{phase.phase}: {phase.title}</h3>
                      <div className="space-y-2">
                        {phase.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RashtriyaGramSwarajAbhiyan;