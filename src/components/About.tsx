import { Target, Eye, CheckCircle, ArrowRight, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const features = [
    'NSDC Training Partner with Pan India Presence',
    'Expertise in Apparel, Retail, Electronics, Healthcare',
    'Food Processing and Agriculture Training',
    'Government Projects: DDUGKY, PMKVY, PMKK',
    'Free Courses with Job Training',
    'Placement Assistance to Trained Candidates'
  ];

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/3 to-orange-500/3 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/20 to-orange-500/20 border border-primary/30 rounded-full px-6 py-3 text-sm backdrop-blur-sm">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-primary font-bold tracking-wide">Empowering India Since 2013</span>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black leading-tight">
                Welcome to 
                <br />
                <span className="text-gradient-enhanced bg-clip-text">MATA PHOOLPATI DEVI</span>
                <br />
                <span className="text-foreground">SHIKSHAN SANSTHAN</span>
              </h2>
              
              <div className="space-y-4">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Pioneer in the field of <span className="text-gradient font-bold bg-primary/10 px-2 py-1 rounded-lg">Skill Training</span> 
                  with PAN India presence since <span className="text-primary font-bold">2013</span>.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We've developed India's largest Mega Skill Centres in challenging terrains like 
                  <span className="text-primary font-semibold"> Jharkhand, J&K, Uttarakhand, and North-East States</span>.
                </p>
              </div>
            </div>

            {/* Enhanced Features List */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground mb-6">What Makes Us Different</h3>
              <div className="grid grid-cols-1 gap-4">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-4 bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 rounded-2xl p-4 hover:border-primary/20 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-muted-foreground font-medium leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
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

          {/* Enhanced Vision & Mission Cards */}
          <div className="space-y-8">
            {/* Vision Card */}
            <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm border border-primary/20 rounded-3xl p-8 group hover:border-primary/30 transition-all duration-300 overflow-hidden">
              <div className="absolute top-4 right-4 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
              <div className="relative z-10">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 text-gradient-enhanced bg-clip-text">Our Vision</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      To train <span className="text-primary font-bold">10 lakh students per year</span> in different skills and 
                      empower them with professional services capability, creating wealth for themselves and the nation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="relative bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent backdrop-blur-sm border border-orange-500/20 rounded-3xl p-8 group hover:border-orange-500/30 transition-all duration-300 overflow-hidden">
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-orange-500/5 rounded-full blur-xl"></div>
              <div className="relative z-10">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 text-gradient-enhanced bg-clip-text">Our Mission</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      To be the world's <span className="text-primary font-bold">premium institute</span> in skill training & 
                      entrepreneurship development, empowering students to become leaders with values, vision & versatility.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Highlight */}
            <div className="relative bg-gradient-to-r from-primary/15 via-orange-500/10 to-primary/15 border-2 border-primary/30 rounded-3xl p-8 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1)_0%,transparent_70%)] rounded-3xl"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Award className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-3xl font-black text-gradient-enhanced bg-clip-text mb-4">Who We Are</h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
                  Pioneer in skill training with expertise in providing professional education 
                  that develops students as <span className="text-primary font-bold">self-dependent leaders</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;