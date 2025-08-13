import { TrendingUp, Users, Award, GraduationCap } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: TrendingUp,
      number: '13',
      suffix: '+',
      label: 'Years of Experience',
      description: 'Leading the industry since 2013',
    },
    {
      icon: Users,
      number: '900',
      suffix: '+',
      label: 'Expert Faculties',
      description: 'Certified trainers across India',
    },
    {
      icon: Award,
      number: '11',
      suffix: '',
      label: 'Awards',
      description: 'Industry recognition and excellence',
    },
    {
      icon: GraduationCap,
      number: '5',
      suffix: ' Lakhs+',
      label: 'Students Trained',
      description: 'Successful placements nationwide',
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="stats-card group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-6 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              
              <div className="text-4xl font-bold text-foreground mb-2">
                {stat.number}
                <span className="text-primary">{stat.suffix}</span>
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

        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center space-x-8 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl px-8 py-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Placement Assistance</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">Pan India</div>
              <div className="text-sm text-muted-foreground">Presence</div>
            </div>
            <div className="w-px h-8 bg-border"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">FREE</div>
              <div className="text-sm text-muted-foreground">Courses Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;