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
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/4 to-transparent rounded-full blur-2xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Content */}
          <div className="space-y-8">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 border border-primary/25 rounded-full px-8 py-4 text-base backdrop-blur-sm shadow-lg">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-primary font-bold tracking-wide">Excellence Since 2023</span>
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-foreground">
                Welcome to <br />
                <span className="bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent animate-gradient-x">
                  MATA PHOOLPATI DEVI
                </span><br />
                <span className="text-primary text-shadow-brand">SHIKSHAN SANSTHAN</span>
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                India's <span className="text-primary font-bold">leading pioneer</span> in skill training excellence, 
                transforming lives through <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent font-bold">professional education</span> since inception. 
                With <span className="text-primary font-semibold">5+ years of experience</span>, we have successfully 
                <span className="text-primary font-semibold"> empowered 25,000+ students</span> across India with our 
                <span className="text-primary font-semibold">100+ expert faculties</span>.
              </p>
            </div>

            {/* Enhanced Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-card via-card to-secondary/20 border border-border/30 hover:border-primary/20 transition-all duration-300 animate-slide-in-left hover-lift-brand group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="icon-container group-hover:scale-110">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium group-hover:text-primary transition-colors">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="btn-primary group">
                Know More About Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="btn-secondary group">
                <span>Call Us: 0120 428 2837</span>
              </Button>
            </div>
          </div>

          {/* Enhanced Vision & Mission Cards */}
          <div className="space-y-8">
            {/* Vision Card */}
            <div className="card-branded hover-lift-brand group">
              <div className="flex items-start space-x-6">
                <div className="icon-container-large group-hover:scale-110">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4 text-shadow-brand">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To train <span className="text-primary font-semibold">5000 Thousand students per year</span> in different skills and empower them with 
                    the ability to provide professional services, creating wealth for themselves 
                    and for the nation.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="card-branded hover-lift-brand group">
              <div className="flex items-start space-x-6">
                <div className="icon-container-large group-hover:scale-110">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4 text-shadow-brand">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To be world's <span className="text-primary font-semibold">premium institute</span> in skill training & entrepreneurship development, 
                    committed to providing the best possible professional, skill oriented education that 
                    empowers students to become leaders with values, vision & versatility.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Achievement Highlight */}
            <div className="gradient-border-brand">
              <div className="bg-gradient-to-r from-primary/8 via-primary/4 to-primary/8 rounded-2xl p-8 text-center">
                <div className="text-3xl font-black text-primary mb-4 text-shadow-brand">Our Impact</div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-2xl font-bold text-primary">5+</div>
                    <div className="text-xs text-muted-foreground">Years</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">25K+</div>
                    <div className="text-xs text-muted-foreground">Students</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">100+</div>
                    <div className="text-xs text-muted-foreground">Faculties</div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Pioneer in skill training delivering professional education excellence across India
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