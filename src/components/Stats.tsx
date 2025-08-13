import { TrendingUp, Users, Award, GraduationCap, MapPin, Building, Clock, CheckCircle } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: TrendingUp,
      number: '13',
      suffix: '+',
      label: 'Years of Excellence',
      description: 'Pioneering skill development since 2013',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Users,
      number: '900',
      suffix: '+',
      label: 'Expert Faculties',
      description: 'Certified trainers & industry professionals',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: Award,
      number: '25',
      suffix: '+',
      label: 'Industry Awards',
      description: 'National & international recognition',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      icon: GraduationCap,
      number: '5',
      suffix: ' Lakhs+',
      label: 'Success Stories',
      description: 'Students placed in top companies',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
  ];

  const additionalStats = [
    {
      icon: MapPin,
      number: '28',
      suffix: '+',
      label: 'States Covered',
      description: 'Pan India presence with 150+ centers',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      icon: Building,
      number: '500',
      suffix: '+',
      label: 'Corporate Partners',
      description: 'Direct placement tie-ups',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10'
    },
    {
      icon: Clock,
      number: '24/7',
      suffix: '',
      label: 'Support System',
      description: 'Student guidance & mentorship',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      icon: CheckCircle,
      number: '100',
      suffix: '%',
      label: 'Placement Rate',
      description: 'Guaranteed job assistance',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10'
    },
  ];

  return (
    <section className="section-padding bg-muted/20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Impact in <span className="text-primary">Numbers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Over a decade of excellence in skill development and training across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="stats-card group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bgColor} rounded-xl mb-6 group-hover:scale-110 transition-all duration-300`}>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
              
              <div className="text-4xl font-bold text-foreground mb-2">
                {stat.number}
                <span className={stat.color}>{stat.suffix}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {stat.label}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalStats.map((stat, index) => (
            <div 
              key={stat.label}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 text-center hover:border-primary/30 transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${(index + 4) * 0.1}s` }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.bgColor} rounded-lg mb-4 group-hover:scale-110 transition-all duration-300`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.number}
                <span className={stat.color}>{stat.suffix}</span>
              </div>
              
              <h4 className="text-sm font-semibold text-foreground mb-1">
                {stat.label}
              </h4>
              
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key Highlights */}
        <div className="mt-16">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">FREE</div>
              <div className="text-sm font-medium text-foreground mb-1">Training Programs</div>
              <div className="text-xs text-muted-foreground">No fees for government certified courses</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">100%</div>
              <div className="text-sm font-medium text-foreground mb-1">Placement Assistance</div>
              <div className="text-xs text-muted-foreground">Guaranteed job support for all graduates</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">Pan India</div>
              <div className="text-sm font-medium text-foreground mb-1">Network</div>
              <div className="text-xs text-muted-foreground">Presence across all major states</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;