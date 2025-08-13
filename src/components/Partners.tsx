import { Shield, Award, Handshake, Building2, Crown, Users, Briefcase, GraduationCap, MapPin, Building, Trophy, Medal, Star, CheckCircle, Zap, Globe } from 'lucide-react';

const Partners = () => {
  const governmentPartners = [
    {
      name: 'NSDC',
      fullName: 'National Skill Development Corporation',
      description: 'Apex body for skill development initiatives',
      benefits: 'Government recognized certification, Industry acceptance',
      icon: Crown,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      name: 'DDUGKY',
      fullName: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana',
      description: 'Rural youth skill development program',
      benefits: 'Free training, Placement guarantee, Stipend support',
      icon: Users,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      name: 'PMKVY',
      fullName: 'Pradhan Mantri Kaushal Vikas Yojana',
      description: 'Flagship skill development scheme',
      benefits: 'Monetary rewards, Industry certification, Career guidance',
      icon: GraduationCap,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      name: 'NIESBUD',
      fullName: 'National Institute for Entrepreneurship and Small Business Development',
      description: 'Entrepreneurship development programs',
      benefits: 'Business skills, Startup support, Mentorship programs',
      icon: Briefcase,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      name: 'NULM',
      fullName: 'National Urban Livelihoods Mission',
      description: 'Urban poor skill development',
      benefits: 'Urban job opportunities, Social security, Skill upgradation',
      icon: Building,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-500/10'
    },
    {
      name: 'MSDE',
      fullName: 'Ministry of Skill Development & Entrepreneurship',
      description: 'Government ministry oversight',
      benefits: 'Policy support, Quality assurance, National recognition',
      icon: Shield,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    }
  ];

  const privatePartners = [
    { name: 'TCS', fullName: 'Tata Consultancy Services', sector: 'IT Services', roles: '1000+ openings', icon: '💼', color: 'text-blue-600' },
    { name: 'Infosys', fullName: 'Infosys Limited', sector: 'Technology', roles: '800+ positions', icon: '💻', color: 'text-green-600' },
    { name: 'Wipro', fullName: 'Wipro Technologies', sector: 'IT Consulting', roles: '600+ vacancies', icon: '⚡', color: 'text-purple-600' },
    { name: 'HCL', fullName: 'HCL Technologies', sector: 'Software', roles: '500+ jobs', icon: '🔧', color: 'text-red-600' },
    { name: 'Tech Mahindra', fullName: 'Tech Mahindra Ltd', sector: 'Telecom IT', roles: '400+ roles', icon: '📱', color: 'text-orange-600' },
    { name: 'Accenture', fullName: 'Accenture India', sector: 'Consulting', roles: '350+ positions', icon: '📊', color: 'text-indigo-600' },
    { name: 'Amazon', fullName: 'Amazon India', sector: 'E-commerce', roles: '700+ openings', icon: '📦', color: 'text-yellow-600' },
    { name: 'Flipkart', fullName: 'Flipkart Pvt Ltd', sector: 'Online Retail', roles: '300+ jobs', icon: '🛒', color: 'text-blue-500' },
    { name: 'Reliance', fullName: 'Reliance Industries', sector: 'Conglomerate', roles: '900+ vacancies', icon: '🏭', color: 'text-green-500' },
    { name: 'ITC', fullName: 'ITC Limited', sector: 'FMCG', roles: '250+ positions', icon: '🏢', color: 'text-brown-500' },
    { name: 'Airtel', fullName: 'Bharti Airtel', sector: 'Telecommunications', roles: '400+ roles', icon: '📡', color: 'text-red-500' },
    { name: 'HDFC', fullName: 'HDFC Bank', sector: 'Banking', roles: '600+ openings', icon: '🏦', color: 'text-blue-700' }
  ];

  const awards = [
    {
      title: 'Best Skill Development Institute 2023',
      authority: 'National Skill Development Agency',
      description: 'Outstanding contribution to skill development ecosystem',
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      title: 'Excellence in Training Award',
      authority: 'Ministry of Skill Development',
      description: 'Innovative training methodologies and high success rates',
      icon: Medal,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'NSDC Recognition Certificate',
      authority: 'National Skill Development Corporation',
      description: 'Certified training partner with quality assurance',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Industry Partnership Excellence',
      authority: 'Confederation of Indian Industry',
      description: 'Outstanding collaboration with industry partners',
      icon: Handshake,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Rural Development Impact Award',
      authority: 'Ministry of Rural Development',
      description: 'Significant impact on rural youth empowerment',
      icon: MapPin,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    },
    {
      title: 'Digital Innovation in Education',
      authority: 'Educational Technology Council',
      description: 'Pioneering use of technology in skill training',
      icon: Zap,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    }
  ];

  return (
    <section id="affiliates" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our <span className="text-primary">Partnerships</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN is proud to be affiliated with leading government bodies and 
            private companies for comprehensive skill development and placement assistance
          </p>
        </div>

        {/* Government Partnerships */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm mb-4">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-primary font-semibold">Government Certifications</span>
            </div>
            <h3 className="text-2xl font-semibold text-foreground">
              Your Gateway to Government Certification
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {governmentPartners.map((partner, index) => (
              <div 
                key={partner.name}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:glow-orange animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${partner.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300`}>
                  <partner.icon className={`h-8 w-8 ${partner.color}`} />
                </div>
                <div className="text-center space-y-2">
                  <h4 className="font-bold text-foreground text-lg">{partner.name}</h4>
                  <h5 className="text-xs text-muted-foreground font-medium">{partner.fullName}</h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">{partner.description}</p>
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-primary font-medium">{partner.benefits}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Private Partnerships */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm mb-4">
              <Handshake className="h-4 w-4 text-primary" />
              <span className="text-primary font-semibold">Industry Partners</span>
            </div>
            <h3 className="text-2xl font-semibold text-foreground">
              Esteemed Private Placement Partners
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {privatePartners.map((partner, index) => (
              <div 
                key={partner.name}
                className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg p-4 hover:border-primary/30 transition-all duration-300 animate-fade-in group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300 border border-primary/20">
                  <span className="text-lg">
                    {partner.icon}
                  </span>
                </div>
                <div className="text-center space-y-1">
                  <h4 className="font-bold text-foreground text-sm">{partner.name}</h4>
                  <p className="text-xs text-muted-foreground">{partner.sector}</p>
                  <p className="text-xs text-primary font-medium">{partner.roles}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards Section */}
        <div>
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm mb-4">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-primary font-semibold">Hall of Fame</span>
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Awards & Recognition
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A testament to our unwavering dedication to excellence in skill development and training
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <div 
                key={award.title}
                className="stats-card animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${award.bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300`}>
                  <award.icon className={`h-8 w-8 ${award.color}`} />
                </div>
                <div className="text-center space-y-2">
                  <h4 className="font-semibold text-foreground text-sm leading-relaxed">
                    {award.title}
                  </h4>
                  <p className="text-xs text-primary font-medium">{award.authority}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Stats */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Partner Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Government Programs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">States Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Placement Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;