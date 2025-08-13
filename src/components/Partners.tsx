import { Shield, Award, Handshake, Building2 } from 'lucide-react';

const Partners = () => {
  const governmentPartners = [
    {
      name: 'NSDC',
      fullName: 'National Skill Development Corporation',
      description: 'Apex body for skill development initiatives',
      benefits: 'Government recognized certification, Industry acceptance'
    },
    {
      name: 'DDUGKY',
      fullName: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana',
      description: 'Rural youth skill development program',
      benefits: 'Free training, Placement guarantee, Stipend support'
    },
    {
      name: 'PMKVY',
      fullName: 'Pradhan Mantri Kaushal Vikas Yojana',
      description: 'Flagship skill development scheme',
      benefits: 'Monetary rewards, Industry certification, Career guidance'
    },
    {
      name: 'NIESBUD',
      fullName: 'National Institute for Entrepreneurship and Small Business Development',
      description: 'Entrepreneurship development programs',
      benefits: 'Business skills, Startup support, Mentorship programs'
    },
    {
      name: 'NULM',
      fullName: 'National Urban Livelihoods Mission',
      description: 'Urban poor skill development',
      benefits: 'Urban job opportunities, Social security, Skill upgradation'
    },
    {
      name: 'MSDE',
      fullName: 'Ministry of Skill Development & Entrepreneurship',
      description: 'Government ministry oversight',
      benefits: 'Policy support, Quality assurance, National recognition'
    }
  ];

  const privatePartners = [
    { name: 'TCS', fullName: 'Tata Consultancy Services', sector: 'IT Services', roles: '1000+ openings' },
    { name: 'Infosys', fullName: 'Infosys Limited', sector: 'Technology', roles: '800+ positions' },
    { name: 'Wipro', fullName: 'Wipro Technologies', sector: 'IT Consulting', roles: '600+ vacancies' },
    { name: 'HCL', fullName: 'HCL Technologies', sector: 'Software', roles: '500+ jobs' },
    { name: 'Tech Mahindra', fullName: 'Tech Mahindra Ltd', sector: 'Telecom IT', roles: '400+ roles' },
    { name: 'Accenture', fullName: 'Accenture India', sector: 'Consulting', roles: '350+ positions' },
    { name: 'Amazon', fullName: 'Amazon India', sector: 'E-commerce', roles: '700+ openings' },
    { name: 'Flipkart', fullName: 'Flipkart Pvt Ltd', sector: 'Online Retail', roles: '300+ jobs' },
    { name: 'Reliance', fullName: 'Reliance Industries', sector: 'Conglomerate', roles: '900+ vacancies' },
    { name: 'ITC', fullName: 'ITC Limited', sector: 'FMCG', roles: '250+ positions' },
    { name: 'Airtel', fullName: 'Bharti Airtel', sector: 'Telecommunications', roles: '400+ roles' },
    { name: 'HDFC', fullName: 'HDFC Bank', sector: 'Banking', roles: '600+ openings' }
  ];

  const awards = [
    {
      title: 'Best Skill Development Institute 2023',
      authority: 'National Skill Development Agency',
      description: 'Outstanding contribution to skill development ecosystem'
    },
    {
      title: 'Excellence in Training Award',
      authority: 'Ministry of Skill Development',
      description: 'Innovative training methodologies and high success rates'
    },
    {
      title: 'NSDC Recognition Certificate',
      authority: 'National Skill Development Corporation',
      description: 'Certified training partner with quality assurance'
    },
    {
      title: 'Industry Partnership Excellence',
      authority: 'Confederation of Indian Industry',
      description: 'Outstanding collaboration with industry partners'
    },
    {
      title: 'Rural Development Impact Award',
      authority: 'Ministry of Rural Development',
      description: 'Significant impact on rural youth empowerment'
    },
    {
      title: 'Digital Innovation in Education',
      authority: 'Educational Technology Council',
      description: 'Pioneering use of technology in skill training'
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
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Building2 className="h-8 w-8 text-primary" />
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
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary font-bold text-sm">
                    {partner.name.substring(0, 2)}
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
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Award className="h-8 w-8 text-primary" />
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