import { Target, Eye, CheckCircle, ArrowRight } from 'lucide-react';
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
    <section id="about" className="section-padding bg-gradient-to-br from-background via-muted/5 to-background">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Ultra Premium Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/10 to-orange-500/10 border border-primary/20 rounded-full px-6 py-3 text-sm backdrop-blur-sm">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-primary font-bold tracking-wide">Established 2013</span>
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-foreground">
                Pioneering 
                <br />
                <span className="bg-gradient-to-r from-primary via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Skill Development
                </span>
              </h2>
              
              <div className="space-y-6">
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                  Leading India's largest <span className="text-foreground font-semibold">Mega Skill Centre</span> network, 
                  transforming lives across remote regions.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  From Jharkhand to J&K, Uttarakhand to North-East States – we've built a 
                  <span className="text-primary font-semibold"> nationwide ecosystem</span> of excellence in skill training 
                  and professional development.
                </p>
              </div>
            </div>

            {/* Premium Features Grid */}
            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-4 bg-gradient-to-r from-muted/30 to-transparent border border-border/30 rounded-2xl p-4 backdrop-blur-sm hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-primary to-orange-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                Discover Our Story
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold border-2 border-primary/20 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all duration-300">
                Contact: 0120 428 2837
              </Button>
            </div>
          </div>

          {/* Ultra Premium Vision & Mission */}
          <div className="space-y-8">
            {/* Vision Card */}
            <div className="bg-gradient-to-br from-primary/8 via-primary/4 to-transparent border border-primary/15 rounded-3xl p-8 backdrop-blur-sm hover:border-primary/25 transition-all duration-500 group">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-foreground">Our Vision</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To train <span className="text-primary font-bold">10 lakh students per year</span> in different skills, 
                    empowering them to provide professional services and create wealth for themselves and the nation.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="bg-gradient-to-br from-orange-500/8 via-orange-500/4 to-transparent border border-orange-500/15 rounded-3xl p-8 backdrop-blur-sm hover:border-orange-500/25 transition-all duration-500 group">
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-orange-500" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-foreground">Our Mission</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To be the <span className="text-orange-500 font-bold">world's premier institute</span> in skill training 
                    & entrepreneurship development, empowering students to become leaders with values, vision & versatility.
                  </p>
                </div>
              </div>
            </div>

            {/* Achievement Highlight */}
            <div className="bg-gradient-to-br from-blue-500/8 via-blue-500/4 to-transparent border border-blue-500/15 rounded-3xl p-8 backdrop-blur-sm">
              <div className="text-center space-y-4">
                <h3 className="text-3xl font-black bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Excellence Since 2013
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
                  Pioneer in skill training with expertise in providing professional education 
                  that develops students as <span className="text-foreground font-semibold">self-dependent leaders</span>
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