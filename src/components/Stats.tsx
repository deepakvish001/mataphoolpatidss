import { TrendingUp, Users, Award, GraduationCap } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: TrendingUp,
      number: '13',
      suffix: '+',
      label: 'Years of Experience',
      description: 'Leading the industry since 2013',
      color: 'from-blue-500/20 to-cyan-500/20',
      iconBg: 'bg-blue-500/10'
    },
    {
      icon: Users,
      number: '900',
      suffix: '+',
      label: 'Expert Faculties',
      description: 'Certified trainers across India',
      color: 'from-green-500/20 to-emerald-500/20',
      iconBg: 'bg-green-500/10'
    },
    {
      icon: Award,
      number: '11',
      suffix: '',
      label: 'Awards',
      description: 'Industry recognition and excellence',
      color: 'from-orange-500/20 to-amber-500/20',
      iconBg: 'bg-orange-500/10'
    },
    {
      icon: GraduationCap,
      number: '5',
      suffix: ' Lakhs+',
      label: 'Students Trained',
      description: 'Successful placements nationwide',
      color: 'from-purple-500/20 to-violet-500/20',
      iconBg: 'bg-purple-500/10'
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-background via-muted/5 to-background">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/20 to-orange-500/20 border border-primary/30 rounded-full px-6 py-3 text-sm backdrop-blur-sm mb-6">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-primary font-bold tracking-wide">Impact & Excellence</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            Our Impact in <span className="text-gradient-enhanced bg-clip-text">Numbers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Over a decade of excellence in skill development and training across India, 
            transforming lives and building careers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className={`relative bg-gradient-to-br ${stat.color} backdrop-blur-sm border border-primary/20 rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 hover:border-primary/40 group overflow-hidden`}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.iconBg} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                
                <div className="text-5xl font-black text-gradient-enhanced bg-clip-text mb-3">
                  {stat.number}
                  <span className="text-primary">{stat.suffix}</span>
                </div>
                
                <h3 className="text-lg font-bold text-foreground mb-3 tracking-wide">
                  {stat.label}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
              </div>
              
              {/* Decorative corner elements */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-xl"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/20 rounded-bl-xl"></div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="relative bg-gradient-to-r from-primary/10 via-orange-500/10 to-primary/10 backdrop-blur-sm border border-primary/30 rounded-3xl p-10 shadow-2xl">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1)_0%,transparent_70%)] rounded-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-foreground mb-8">Why Choose MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN?</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-3xl font-black text-primary">100%</span>
                  </div>
                  <h4 className="font-bold text-foreground mb-2">Placement Assistance</h4>
                  <p className="text-sm text-muted-foreground">Guaranteed job placement support for all graduates</p>
                </div>
                
                <div className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-lg font-black text-primary">PAN</span>
                  </div>
                  <h4 className="font-bold text-foreground mb-2">India Presence</h4>
                  <p className="text-sm text-muted-foreground">Training centers across all states and regions</p>
                </div>
                
                <div className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-black text-primary">FREE</span>
                  </div>
                  <h4 className="font-bold text-foreground mb-2">Courses Available</h4>
                  <p className="text-sm text-muted-foreground">Government-sponsored free training programs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;