import { BookOpen, Briefcase, Award, Users, CheckCircle, ArrowRight, Scissors, ShoppingCart, Cpu, Heart, ChefHat, Tractor, Code, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Services = () => {
  const certificationBenefits = [
    {
      icon: Briefcase,
      title: 'Multiple Career Opportunities',
      description: 'Access to diverse job roles across various industries'
    },
    {
      icon: BookOpen,
      title: 'E-Content & Syllabus',
      description: 'Digital learning materials and comprehensive curriculum'
    },
    {
      icon: CheckCircle,
      title: 'Industry Preferred Certificate',
      description: 'Government recognized certifications valued by employers'
    },
    {
      icon: Users,
      title: '100% Placement Assistance',
      description: 'Dedicated support for job placement and career guidance'
    },
    {
      icon: Award,
      title: 'Training by Certified Trainers',
      description: 'Learn from industry experts and certified professionals'
    },
    {
      icon: BookOpen,
      title: 'Online Assessment',
      description: 'Digital evaluation and progress tracking system'
    }
  ];

  const trainingAreas = [
    {
      name: 'Apparel Manufacturing',
      icon: Scissors,
      color: 'from-pink-500/20 to-purple-500/20',
      iconBg: 'bg-pink-500/10'
    },
    {
      name: 'Organized Retail',
      icon: ShoppingCart,
      color: 'from-blue-500/20 to-cyan-500/20',
      iconBg: 'bg-blue-500/10'
    },
    {
      name: 'Electronics & Hardware',
      icon: Cpu,
      color: 'from-green-500/20 to-emerald-500/20',
      iconBg: 'bg-green-500/10'
    },
    {
      name: 'Healthcare Services',
      icon: Heart,
      color: 'from-red-500/20 to-rose-500/20',
      iconBg: 'bg-red-500/10'
    },
    {
      name: 'Food Processing',
      icon: ChefHat,
      color: 'from-orange-500/20 to-amber-500/20',
      iconBg: 'bg-orange-500/10'
    },
    {
      name: 'Agriculture & Allied Services',
      icon: Tractor,
      color: 'from-lime-500/20 to-green-500/20',
      iconBg: 'bg-lime-500/10'
    },
    {
      name: 'IT & Software Development',
      icon: Code,
      color: 'from-violet-500/20 to-purple-500/20',
      iconBg: 'bg-violet-500/10'
    },
    {
      name: 'Automotive Services',
      icon: Car,
      color: 'from-slate-500/20 to-gray-500/20',
      iconBg: 'bg-slate-500/10'
    }
  ];

  return (
    <section id="training" className="section-padding bg-gradient-to-b from-muted/5 to-background relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-500/3 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/20 to-orange-500/20 border border-primary/30 rounded-full px-6 py-3 text-sm backdrop-blur-sm mb-6">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-primary font-bold tracking-wide">Professional Training</span>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            Our <span className="text-gradient-enhanced bg-clip-text">Training Programs</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Government certified training programs designed to enhance your employability 
            and provide multiple career opportunities across diverse industries
          </p>
        </div>

        {/* Enhanced Training Areas */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Specialized <span className="text-gradient-enhanced bg-clip-text">Training Areas</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive skill development across high-demand sectors
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trainingAreas.map((area, index) => (
              <div 
                key={area.name}
                className={`relative bg-gradient-to-br ${area.color} backdrop-blur-sm border border-primary/20 rounded-2xl p-6 text-center hover:border-primary/40 transition-all duration-300 hover:scale-105 group overflow-hidden`}
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 ${area.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <area.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground text-sm leading-tight">{area.name}</h4>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/30 rounded-tr-lg"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-primary/30 rounded-bl-lg"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Certification Benefits */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Certification <span className="text-gradient-enhanced bg-clip-text">Benefits</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Unlock your potential with MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN's comprehensive certification program
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificationBenefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm border border-primary/20 rounded-3xl p-8 group hover:border-primary/30 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                
                <div className="relative z-10">
                  <div className="w-18 h-18 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <benefit.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-4">
                    {benefit.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {benefit.description}
                  </p>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-xl"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Placement Process */}
        <div className="card-premium">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN Placement Process
            </h3>
            <p className="text-lg text-muted-foreground">
              Unlocking Your Career Potential
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold">1</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Training</h4>
              <p className="text-sm text-muted-foreground">Complete your certified training program</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold">2</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Assessment</h4>
              <p className="text-sm text-muted-foreground">Pass online and practical assessments</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold">3</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Certification</h4>
              <p className="text-sm text-muted-foreground">Receive government recognized certificate</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold">4</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Placement</h4>
              <p className="text-sm text-muted-foreground">Get 100% placement assistance</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Enhance your skills and take your career to the next level with MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary group">
              Explore Training Programs
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="btn-secondary">
              Download Course Catalog
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;