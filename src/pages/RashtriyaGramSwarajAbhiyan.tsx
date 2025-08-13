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
                <Crown className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">Government Initiative</span>
              </div>
              
              {/* Main Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in leading-tight">
                TRAINING UNDER REVAMPED<br />
                <span className="text-gradient">RASHTIYA GRAM SWARAJ ABHIYAN</span>
              </h1>
              
              {/* Subtitle */}
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground mb-8 animate-fade-in">
                Panchayati Raj Training by MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN
              </h2>
              
              {/* Description */}
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-4xl mx-auto animate-fade-in">
                This project aims to educate Elected Representatives on the functions of Panchayati Raj Institutions (PRIs) across 29 subjects listed in Article 243(G) and the 11th Schedule of the Indian Constitution. We will integrate Sustainable Development Goals (SDGs) to enhance the effectiveness of local governance.
              </p>
              
              {/* Stats Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-10 animate-fade-in">
                <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 hover:bg-card/80 transition-all duration-300">
                  <div className="text-3xl font-bold text-primary mb-2">465,300</div>
                  <div className="text-sm text-muted-foreground">Training Man-days Completed</div>
                </div>
                <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 hover:bg-card/80 transition-all duration-300">
                  <div className="text-3xl font-bold text-primary mb-2">29</div>
                  <div className="text-sm text-muted-foreground">Constitutional Subjects Covered</div>
                </div>
                <div className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-6 hover:bg-card/80 transition-all duration-300">
                  <div className="text-3xl font-bold text-primary mb-2">6+</div>
                  <div className="text-sm text-muted-foreground">States Covered</div>
                </div>
              </div>
              
              {/* CTA Button */}
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
                <Phone className="mr-2 h-5 w-5" />
                Contact Us Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Training Approach Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="card-premium">
              <CardContent className="p-8 md:p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-6">Our Training Methodology</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      To effectively communicate this information, we utilize a variety of engaging methods, including presentations, group discussions, audio-visual modules, field visits, role-playing, case studies, and debates. Content is delivered in Hindi, English, and appropriate regional/vernacular languages.
                    </p>
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">465,300</div>
                        <p className="text-muted-foreground">
                          Man-days of PRI training completed across Uttarakhand, Haryana, Himachal Pradesh, Jharkhand, Andhra Pradesh and more states
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
                    <div className="text-center">
                      <Crown className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-foreground mb-2">Comprehensive Coverage</h4>
                      <p className="text-muted-foreground">29 subjects under Article 243(G) & 11th Schedule of Indian Constitution</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="section-padding bg-gradient-to-r from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">Our Objective</h2>
            <p className="text-xl text-muted-foreground">Objectives of our PRI Training Projects</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((objective, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <objective.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{objective.title}</h3>
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
      <section className="section-padding bg-gradient-to-r from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">THEMATIC TRAINING</h2>
            <h3 className="text-2xl font-semibold text-primary mb-4">LOCALIZATION OF SUSTAINABLE DEVELOPMENT GOALS (LSDGS)</h3>
            <p className="text-xl text-muted-foreground">Embark on a journey of global recognition with our comprehensive suite of certifications.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lsdgs.map((lsdg, index) => (
              <Card key={index} className="card-hover text-center group">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <lsdg.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{lsdg.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Trainings Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-6">SPECIALIZED TRAININGS</h2>
          </div>
          
          <div className="space-y-8">
            {specializedTrainings.map((training, index) => (
              <Card key={index} className="card-premium">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                        <training.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold text-primary text-center mt-2">{training.number}</div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-foreground mb-4">{training.title}</h3>
                      <p className="text-lg text-muted-foreground mb-4">{training.description}</p>
                      
                      {training.topics && (
                        <p className="text-muted-foreground mb-4">{training.topics}</p>
                      )}
                      
                      {training.issues && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Issues to be tackled:</h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {training.issues.map((issue, issueIndex) => (
                              <div key={issueIndex} className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-primary" />
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