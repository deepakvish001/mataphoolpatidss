import { Shield, Award, Handshake, Building2, Globe, Users, GraduationCap, BookOpen, MapPin, Briefcase, Trophy, Star, Medal, Crown } from 'lucide-react';

const Partners = () => {
  const governmentPartners = [
    {
      name: 'NSDC (National Skill Development Corporation)',
      icon: GraduationCap,
      color: 'from-blue-500/20 to-indigo-500/20',
      iconBg: 'bg-blue-500/10'
    },
    {
      name: 'DDUGKY (Deen Dayal Upadhyaya Grameen Kaushalya Yojana)',
      icon: Users,
      color: 'from-green-500/20 to-emerald-500/20',
      iconBg: 'bg-green-500/10'
    },
    {
      name: 'PMKVY (Pradhan Mantri Kaushal Vikas Yojana)',
      icon: BookOpen,
      color: 'from-orange-500/20 to-amber-500/20',
      iconBg: 'bg-orange-500/10'
    },
    {
      name: 'NIESBUD (National Institute for Entrepreneurship and Small Business Development)',
      icon: Briefcase,
      color: 'from-purple-500/20 to-violet-500/20',
      iconBg: 'bg-purple-500/10'
    },
    {
      name: 'NULM (National Urban Livelihoods Mission)',
      icon: MapPin,
      color: 'from-red-500/20 to-rose-500/20',
      iconBg: 'bg-red-500/10'
    },
    {
      name: 'Ministry of Skill Development & Entrepreneurship',
      icon: Shield,
      color: 'from-teal-500/20 to-cyan-500/20',
      iconBg: 'bg-teal-500/10'
    }
  ];

  const privatePartners = [
    { name: 'TCS (Tata Consultancy Services)', emoji: '💻', sector: 'IT Services' },
    { name: 'Infosys Limited', emoji: '🌐', sector: 'Technology' },
    { name: 'Wipro Technologies', emoji: '⚡', sector: 'IT Solutions' },
    { name: 'HCL Technologies', emoji: '🔧', sector: 'Tech Services' },
    { name: 'Tech Mahindra', emoji: '📱', sector: 'Digital Solutions' },
    { name: 'Accenture India', emoji: '🎯', sector: 'Consulting' },
    { name: 'Amazon India', emoji: '📦', sector: 'E-commerce' },
    { name: 'Flipkart', emoji: '🛒', sector: 'Online Retail' },
    { name: 'Reliance Industries', emoji: '🏭', sector: 'Conglomerate' },
    { name: 'ITC Limited', emoji: '🏢', sector: 'Consumer Goods' },
    { name: 'Bharti Airtel', emoji: '📡', sector: 'Telecommunications' },
    { name: 'HDFC Bank', emoji: '🏦', sector: 'Banking' }
  ];

  const awards = [
    {
      name: 'Best Skill Development Institute 2023',
      icon: Crown,
      color: 'from-yellow-500/20 to-amber-500/20',
      iconBg: 'bg-yellow-500/10'
    },
    {
      name: 'Excellence in Training Award',
      icon: Trophy,
      color: 'from-blue-500/20 to-indigo-500/20',
      iconBg: 'bg-blue-500/10'
    },
    {
      name: 'NSDC Recognition Certificate',
      icon: Medal,
      color: 'from-green-500/20 to-emerald-500/20',
      iconBg: 'bg-green-500/10'
    },
    {
      name: 'Industry Partnership Excellence',
      icon: Star,
      color: 'from-purple-500/20 to-violet-500/20',
      iconBg: 'bg-purple-500/10'
    },
    {
      name: 'Rural Development Impact Award',
      icon: Award,
      color: 'from-red-500/20 to-rose-500/20',
      iconBg: 'bg-red-500/10'
    }
  ];

  return (
    <section id="affiliates" className="section-padding bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
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
            <Handshake className="h-5 w-5 text-primary" />
            <span className="text-primary font-bold tracking-wide">Trusted Partnerships</span>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            Our <span className="text-gradient-enhanced bg-clip-text">Partnerships</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN is proud to collaborate with leading government bodies and 
            industry giants for comprehensive skill development and guaranteed placement assistance
          </p>
        </div>

        {/* Enhanced Government Partnerships */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-full px-6 py-3 text-sm backdrop-blur-sm mb-6">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-primary font-bold tracking-wide">Government Certifications</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Your Gateway to <span className="text-gradient-enhanced bg-clip-text">Government Certification</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Officially recognized by leading government institutions for skill development excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {governmentPartners.map((partner, index) => (
              <div 
                key={partner.name}
                className={`relative bg-gradient-to-br ${partner.color} backdrop-blur-sm border border-primary/20 rounded-3xl p-8 text-center hover:border-primary/40 transition-all duration-300 hover:scale-105 group overflow-hidden`}
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                
                <div className="relative z-10">
                  <div className={`w-20 h-20 ${partner.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform border border-primary/20`}>
                    <partner.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground text-base leading-relaxed">
                    {partner.name}
                  </h4>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-xl"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Private Partnerships */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full px-6 py-3 text-sm backdrop-blur-sm mb-6">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="text-primary font-bold tracking-wide">Industry Partners</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Esteemed <span className="text-gradient-enhanced bg-clip-text">Private Placement Partners</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Collaborating with India's top corporations to provide exceptional career opportunities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {privatePartners.map((partner, index) => (
              <div 
                key={partner.name}
                className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm border border-primary/20 rounded-2xl p-6 text-center hover:border-primary/40 transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border border-primary/20">
                    <span className="text-3xl">{partner.emoji}</span>
                  </div>
                  <h4 className="font-bold text-foreground text-xs mb-2 leading-tight">
                    {partner.name}
                  </h4>
                  <p className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded-full inline-block">
                    {partner.sector}
                  </p>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-primary/30 rounded-tr-lg"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Awards Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 rounded-full px-6 py-3 text-sm backdrop-blur-sm mb-6">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-primary font-bold tracking-wide">Hall of Fame</span>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Awards & <span className="text-gradient-enhanced bg-clip-text">Recognition</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A testament to our unwavering dedication to excellence in skill development and training across India
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {awards.map((award, index) => (
              <div 
                key={award.name}
                className={`relative bg-gradient-to-br ${award.color} backdrop-blur-sm border border-primary/20 rounded-3xl p-6 text-center hover:border-primary/40 transition-all duration-300 hover:scale-105 group overflow-hidden`}
              >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                
                <div className="relative z-10">
                  <div className={`w-18 h-18 ${award.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border border-primary/20`}>
                    <award.icon className="h-9 w-9 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground text-sm leading-relaxed">
                    {award.name}
                  </h4>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary/20 rounded-tr-xl"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Partnership Stats */}
        <div className="relative bg-gradient-to-r from-primary/15 via-orange-500/10 to-primary/15 border-2 border-primary/30 rounded-3xl p-10 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1)_0%,transparent_70%)] rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-foreground mb-4">Partnership Impact</h3>
              <p className="text-muted-foreground text-lg">Building bridges to success across the nation</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl font-black text-primary">500+</span>
                </div>
                <h4 className="font-bold text-foreground mb-2">Partner Companies</h4>
                <p className="text-sm text-muted-foreground">Industry collaborations nationwide</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl font-black text-primary">25+</span>
                </div>
                <h4 className="font-bold text-foreground mb-2">Government Programs</h4>
                <p className="text-sm text-muted-foreground">Official training partnerships</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl font-black text-primary">15+</span>
                </div>
                <h4 className="font-bold text-foreground mb-2">States Covered</h4>
                <p className="text-sm text-muted-foreground">Pan-India presence</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl font-black text-primary">100%</span>
                </div>
                <h4 className="font-bold text-foreground mb-2">Placement Support</h4>
                <p className="text-sm text-muted-foreground">Guaranteed career assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;