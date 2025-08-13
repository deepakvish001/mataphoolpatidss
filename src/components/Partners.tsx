import { Shield, Award, Handshake, Building2 } from 'lucide-react';

const Partners = () => {
  const governmentPartners = [
    'NSDC (National Skill Development Corporation)',
    'DDUGKY (Deen Dayal Upadhyaya Grameen Kaushalya Yojana)',
    'PMKVY (Pradhan Mantri Kaushal Vikas Yojana)',
    'NIESBUD (National Institute for Entrepreneurship and Small Business Development)',
    'NULM (National Urban Livelihoods Mission)',
    'Ministry of Skill Development & Entrepreneurship'
  ];

  const privatePartners = [
    'TCS (Tata Consultancy Services)',
    'Infosys Limited',
    'Wipro Technologies',
    'HCL Technologies',
    'Tech Mahindra',
    'Accenture India',
    'Amazon India',
    'Flipkart',
    'Reliance Industries',
    'ITC Limited',
    'Bharti Airtel',
    'HDFC Bank'
  ];

  const awards = [
    'Best Skill Development Institute 2023',
    'Excellence in Training Award',
    'NSDC Recognition Certificate',
    'Industry Partnership Excellence',
    'Rural Development Impact Award'
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
            JITM Skills is proud to be affiliated with leading government bodies and 
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
                key={partner}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center hover:border-primary/30 transition-all duration-300 hover:glow-orange animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-medium text-foreground text-sm leading-relaxed">
                  {partner}
                </h4>
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
                key={partner}
                className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg p-4 text-center hover:border-primary/30 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold text-sm">
                    {partner.split(' ')[0].substring(0, 2)}
                  </span>
                </div>
                <h4 className="font-medium text-foreground text-xs">
                  {partner}
                </h4>
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

          <div className="grid md:grid-cols-5 gap-6">
            {awards.map((award, index) => (
              <div 
                key={award}
                className="stats-card animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-medium text-foreground text-sm leading-relaxed">
                  {award}
                </h4>
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