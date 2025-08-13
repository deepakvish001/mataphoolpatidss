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
    <section id="training" className="section-padding bg-gradient-to-br from-background via-muted/3 to-background">
      <div className="container-custom">
        {/* Ultra Premium Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/10 to-orange-500/10 border border-primary/20 rounded-full px-6 py-3 text-sm backdrop-blur-sm mb-8">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-primary font-bold tracking-wide">Training Excellence</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-foreground mb-6">
            Transformative 
            <br />
            <span className="bg-gradient-to-r from-primary via-orange-500 to-red-500 bg-clip-text text-transparent">
              Training Programs
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Government certified programs designed to enhance employability and unlock 
            <span className="text-foreground font-semibold"> multiple career opportunities</span> across industries
          </p>
        </div>

        {/* Ultra Premium Training Areas */}
        <div className="mb-20">
          <h3 className="text-3xl font-black text-foreground mb-12 text-center">
            Specialized Training <span className="text-primary">Domains</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trainingAreas.map((area, index) => (
              <div 
                key={area.name}
                className={`bg-gradient-to-br ${area.color} backdrop-blur-sm border border-border/30 rounded-2xl p-6 text-center hover:border-primary/25 transition-all duration-500 hover:scale-105 group`}
              >
                <div className={`w-16 h-16 ${area.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <area.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-bold text-foreground text-sm leading-tight">{area.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Ultra Premium Certification Benefits */}
        <div className="mb-20">
          <h3 className="text-3xl font-black text-foreground mb-12 text-center">
            Certification <span className="text-primary">Benefits</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificationBenefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className="bg-gradient-to-br from-muted/20 via-muted/10 to-transparent border border-border/30 rounded-3xl p-8 backdrop-blur-sm hover:border-primary/25 transition-all duration-500 group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary/15 to-orange-500/15 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-10 w-10 text-primary" />
                </div>
                <h4 className="text-xl font-black text-foreground mb-4">
                  {benefit.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Ultra Premium Placement Process */}
        <div className="bg-gradient-to-br from-primary/5 via-orange-500/3 to-blue-500/5 border border-primary/15 rounded-4xl p-12 backdrop-blur-sm">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-foreground mb-4">
              Placement <span className="text-primary">Process</span>
            </h3>
            <p className="text-xl text-muted-foreground">
              Your Journey to <span className="text-foreground font-semibold">Career Success</span>
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-primary-foreground font-black text-xl">1</span>
              </div>
              <h4 className="text-lg font-black text-foreground mb-3">Training</h4>
              <p className="text-muted-foreground leading-relaxed">Complete your certified training program with expert guidance</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-primary-foreground font-black text-xl">2</span>
              </div>
              <h4 className="text-lg font-black text-foreground mb-3">Assessment</h4>
              <p className="text-muted-foreground leading-relaxed">Pass comprehensive online and practical assessments</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-primary-foreground font-black text-xl">3</span>
              </div>
              <h4 className="text-lg font-black text-foreground mb-3">Certification</h4>
              <p className="text-muted-foreground leading-relaxed">Receive government recognized industry certificate</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-primary-foreground font-black text-xl">4</span>
              </div>
              <h4 className="text-lg font-black text-foreground mb-3">Placement</h4>
              <p className="text-muted-foreground leading-relaxed">Get 100% placement assistance and career support</p>
            </div>
          </div>
        </div>

        {/* Ultra Premium CTA Section */}
        <div className="text-center mt-20">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-foreground">
                Ready to Transform Your <span className="text-primary">Career</span>?
              </h3>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join thousands of successful professionals who have enhanced their skills and accelerated their careers 
                with <span className="text-foreground font-semibold">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="h-16 px-8 text-lg font-semibold bg-gradient-to-r from-primary via-orange-500 to-primary rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 group">
                Explore Training Programs
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-8 text-lg font-semibold border-2 border-primary/20 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all duration-500">
                Download Course Catalog
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;