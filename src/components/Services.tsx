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
    <section id="training" className="section-padding bg-muted/10">
      <div className="container-custom">
        {/* Ultra Premium Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/20 to-orange-400/10 border border-primary/30 rounded-full px-6 py-3 text-base mb-8 backdrop-blur-sm">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-primary font-bold tracking-wide">Professional Excellence</span>
          </div>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-8 leading-tight">
            Our <span className="text-gradient-enhanced bg-clip-text">Training</span><br />
            <span className="text-primary">Programs</span>
          </h2>
          <p className="text-2xl md:text-3xl text-muted-foreground max-w-4xl mx-auto font-light leading-relaxed">
            <span className="text-primary font-bold">Government certified</span> training programs engineered to 
            <span className="text-gradient font-bold"> transform careers</span> and unlock unlimited opportunities
          </p>
        </div>

        {/* Training Areas */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Specialized Training Areas
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trainingAreas.map((area, index) => (
              <div 
                key={area.name}
                className={`bg-gradient-to-br ${area.color} backdrop-blur-sm border border-border/50 rounded-xl p-4 text-center hover:border-primary/30 transition-all duration-300 hover:scale-105 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 ${area.iconBg} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <area.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium text-foreground text-sm">{area.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Certification Benefits */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN Certification Benefits
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificationBenefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className="card-premium group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  {benefit.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
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