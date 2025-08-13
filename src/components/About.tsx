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
                Welcome to <span className="text-primary">JITM Skills</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                JITM Skills Private Limited is a pioneer in the field of Skill Training and has been 
                successfully running skill development programs on PAN India basis since 2013. We have 
                developed India's largest Mega Skill Centre in difficult and remote areas like Jharkhand, 
                J&K, Uttarakhand, and North-East States.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
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
                  <p className="text-muted-foreground leading-relaxed">
                    To train 10 lakh students per year in different skills and to empower them with 
                    the ability to provide professional services, and create wealth for themselves 
                    and for the nation.
                  </p>
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
                  <p className="text-muted-foreground leading-relaxed">
                    To be world's premium institute in skill training & entrepreneurship development, 
                    committed to providing the best possible professional, skill oriented education that 
                    empowers students to become leaders with values, vision & versatility.
                  </p>
                </div>
              </div>
            </div>

            {/* Achievement Highlight */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Who We Are</div>
                <p className="text-muted-foreground">
                  Pioneer in skill training with expertise in providing professional education 
                  that develops students as self-dependent leaders
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