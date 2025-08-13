import { Target, Eye, CheckCircle, ArrowRight, Award, Users, Building, Globe, TrendingUp, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const features = [
    {
      text: 'NSDC Training Partner with Pan India Presence',
      detail: 'Certified by National Skill Development Corporation across 28+ states',
      icon: Building
    },
    {
      text: 'Expertise in 8+ Industry Sectors',
      detail: 'Apparel, Retail, Electronics, Healthcare, Food Processing, Agriculture & more',
      icon: Award
    },
    {
      text: 'Government Flagship Programs',
      detail: 'Active participation in DDUGKY, PMKVY, PMKK with 100% success rate',
      icon: Globe
    },
    {
      text: 'Free Training with Guaranteed Jobs',
      detail: 'No course fees + guaranteed placement assistance for all certified candidates',
      icon: Users
    },
    {
      text: '500+ Corporate Tie-ups',
      detail: 'Direct placement partnerships with top companies like TCS, Infosys, Amazon',
      icon: TrendingUp
    },
    {
      text: 'Advanced Learning Infrastructure',
      detail: 'State-of-the-art training centers in remote & difficult terrains',
      icon: BookOpen
    }
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-primary font-semibold">Since 2013</span>
              </div>
              
              <h2 className="text-4xl font-bold text-foreground">
                Welcome to <span className="text-primary">MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN stands as India's premier skill development institute, 
                pioneering transformative education since 2013. We have successfully established the nation's 
                largest network of Mega Skill Centres across challenging terrains including Jharkhand, Jammu & Kashmir, 
                Uttarakhand, and North-East States, bringing world-class training to underserved communities.
              </p>
              
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
                <p className="text-sm text-primary font-medium">
                  ✨ Recognized as the fastest-growing skill development organization with 5 lakh+ successful graduates
                </p>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg hover:border-primary/30 transition-all duration-300 animate-slide-in-left group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm mb-1">{feature.text}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.detail}</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary group">
                Know More About Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="btn-secondary">
                Call Us: 0120 428 2837
              </Button>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="space-y-8">
            {/* Vision Card */}
            <div className="card-premium group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    To emerge as the world's leading skill development ecosystem, training 10 lakh students 
                    annually across diverse sectors while fostering entrepreneurship, innovation, and sustainable 
                    economic growth for individuals and the nation.
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-primary">
                    <TrendingUp className="h-4 w-4" />
                    <span>Target: 10 Lakh+ Students by 2030</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="card-premium group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    To be the world's premier institute in skill training & entrepreneurship development, 
                    committed to delivering excellence in professional education that transforms students 
                    into skilled leaders with strong values, clear vision, and adaptable versatility.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center space-x-1 text-primary">
                      <CheckCircle className="h-3 w-3" />
                      <span>Quality Education</span>
                    </div>
                    <div className="flex items-center space-x-1 text-primary">
                      <CheckCircle className="h-3 w-3" />
                      <span>Industry Alignment</span>
                    </div>
                    <div className="flex items-center space-x-1 text-primary">
                      <CheckCircle className="h-3 w-3" />
                      <span>Value-based Learning</span>
                    </div>
                    <div className="flex items-center space-x-1 text-primary">
                      <CheckCircle className="h-3 w-3" />
                      <span>Global Standards</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values & Achievements */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Our Core Values</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Values that drive our commitment to excellence
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-card/50 rounded-lg">
                    <div className="text-lg font-bold text-primary">Excellence</div>
                    <div className="text-xs text-muted-foreground">in Education</div>
                  </div>
                  <div className="text-center p-3 bg-card/50 rounded-lg">
                    <div className="text-lg font-bold text-primary">Innovation</div>
                    <div className="text-xs text-muted-foreground">in Teaching</div>
                  </div>
                  <div className="text-center p-3 bg-card/50 rounded-lg">
                    <div className="text-lg font-bold text-primary">Integrity</div>
                    <div className="text-xs text-muted-foreground">in Practice</div>
                  </div>
                  <div className="text-center p-3 bg-card/50 rounded-lg">
                    <div className="text-lg font-bold text-primary">Impact</div>
                    <div className="text-xs text-muted-foreground">on Society</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;