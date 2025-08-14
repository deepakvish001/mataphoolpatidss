import { Star, Quote, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Gaurav Kumar',
      quote: "MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN gave me the platform and opportunities to enhance my career and change my life.",
      role: 'Software Developer',
      company: 'Tech Solutions Pvt Ltd',
      image: '/placeholder-avatar-1.jpg'
    },
    {
      name: 'Uttam Arya',
      quote: "Taking admission at MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN gave a new turn to my life. I learned a lot of things including discipline and etiquette.",
      role: 'Retail Manager',
      company: 'Fashion Hub',
      image: '/placeholder-avatar-2.jpg'
    },
    {
      name: 'Praveen Kumar',
      quote: "I am thankful to MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN for helping me secure a placement at a reputed IT company.",
      role: 'Systems Analyst',
      company: 'InfoTech Corp',
      image: '/placeholder-avatar-3.jpg'
    }
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-muted/5 via-background to-muted/5 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-r from-primary/4 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-l from-blue-500/3 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/15 via-primary/10 to-primary/5 border border-primary/25 rounded-full px-8 py-4 text-base mb-8 backdrop-blur-sm shadow-lg">
            <Star className="h-5 w-5 text-primary" />
            <span className="text-primary font-bold tracking-wide">Success Stories</span>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
            What Our <span className="bg-gradient-to-r from-primary via-blue-600 to-primary bg-clip-text text-transparent">Students Say</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            At MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN, we believe that every student has the potential to succeed. 
            Here are some inspiring stories from our graduates who are now <span className="text-primary font-semibold">industry leaders</span>.
          </p>
        </div>

        {/* Enhanced Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="card-branded hover-lift-brand group animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="icon-container-large group-hover:scale-110">
                  <Quote className="h-8 w-8 text-primary" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-primary hover:scale-110 transition-transform" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-center mb-8">
                <p className="text-muted-foreground leading-relaxed italic text-lg">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              {/* Student Info */}
              <div className="text-center border-t border-border/50 pt-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/15 to-primary/8 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-primary font-bold text-xl">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="font-bold text-foreground mb-2 text-shadow-brand">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-primary font-semibold mb-1">
                  {testimonial.role}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Success Stats */}
        <div className="gradient-border-brand mb-16">
          <div className="bg-gradient-to-r from-primary/8 via-primary/4 to-primary/8 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2 text-shadow-brand">Our Track Record</h3>
              <p className="text-muted-foreground">Real results that speak for themselves</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-3xl md:text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">95%</div>
                <div className="text-sm text-muted-foreground">Student Satisfaction</div>
              </div>
              <div className="group">
                <div className="text-3xl md:text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">88%</div>
                <div className="text-sm text-muted-foreground">Placement Rate</div>
              </div>
              <div className="group">
                <div className="text-3xl md:text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">₹25K+</div>
                <div className="text-sm text-muted-foreground">Average Starting Salary</div>
              </div>
              <div className="group">
                <div className="text-3xl md:text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">500+</div>
                <div className="text-sm text-muted-foreground">Partner Companies</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA */}
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-shadow-brand">
            Ready to Write Your <span className="text-primary">Success Story?</span>
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Join thousands of students who have transformed their careers with MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN. 
            Start your journey toward <span className="text-primary font-semibold">professional success</span> today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="btn-primary group">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="btn-secondary group">
              See More Success Stories
              <Star className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;