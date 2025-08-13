import { BookOpen, Briefcase, Award, Users, CheckCircle, ArrowRight, Shirt, ShoppingCart, Cpu, Heart, Utensils, Wheat, Code, Car } from 'lucide-react';
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
      description: 'Fashion Design, Garment Technology, Pattern Making',
      duration: '6-12 months',
      certification: 'NSDC Certified',
      icon: Shirt,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10'
    },
    {
      name: 'Organized Retail',
      description: 'Customer Service, Inventory Management, Sales Operations',
      duration: '3-6 months',
      certification: 'Industry Recognized',
      icon: ShoppingCart,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      name: 'Electronics & Hardware',
      description: 'PCB Assembly, Device Repair, Quality Testing',
      duration: '8-10 months',
      certification: 'Government Approved',
      icon: Cpu,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      name: 'Healthcare Services',
      description: 'Patient Care, Medical Equipment, Health & Safety',
      duration: '6-9 months',
      certification: 'Health Ministry Certified',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      name: 'Food Processing',
      description: 'Food Safety, Quality Control, Packaging Technology',
      duration: '4-8 months',
      certification: 'FSSAI Compliant',
      icon: Utensils,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      name: 'Agriculture & Allied',
      description: 'Organic Farming, Crop Management, Dairy Technology',
      duration: '6-12 months',
      certification: 'Agriculture Ministry Approved',
      icon: Wheat,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      name: 'IT & Software',
      description: 'Web Development, Database Management, Digital Marketing',
      duration: '8-12 months',
      certification: 'Industry Standard',
      icon: Code,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      name: 'Automotive Services',
      description: 'Vehicle Maintenance, Auto Electronics, Service Management',
      duration: '6-10 months',
      certification: 'Automotive Council Certified',
      icon: Car,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10'
    }
  ];

  return (
    <section id="training" className="section-padding bg-muted/10">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our <span className="text-primary">Training Programs</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Government certified training programs designed to enhance your employability 
            and provide multiple career opportunities
          </p>
        </div>

        {/* Training Areas */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Specialized Training Areas
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainingAreas.map((area, index) => (
              <div 
                key={area.name}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:glow-orange animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 ${area.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300`}>
                  <area.icon className={`h-6 w-6 ${area.color}`} />
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-foreground text-sm mb-2">{area.name}</h4>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{area.description}</p>
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-primary">{area.duration}</div>
                    <div className="text-xs text-muted-foreground">{area.certification}</div>
                  </div>
                </div>
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