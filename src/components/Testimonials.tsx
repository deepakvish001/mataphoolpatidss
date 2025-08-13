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
    <section className="section-padding bg-gradient-to-b from-background via-muted/5 to-background relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/3 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/20 to-orange-500/20 border border-primary/30 rounded-full px-6 py-3 text-sm backdrop-blur-sm mb-6">
            <Star className="h-5 w-5 text-primary" />
            <span className="text-primary font-bold tracking-wide">Success Stories</span>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            What Our <span className="text-gradient-enhanced bg-clip-text">Students Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            At MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN, we believe that every student has the potential to succeed. 
            Here are some inspiring stories from our graduates who transformed their careers.
          </p>
        </div>

        {/* Enhanced Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm border border-primary/20 rounded-3xl p-8 group hover:border-primary/30 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
              
              <div className="relative z-10">
                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Quote className="h-8 w-8 text-primary" />
                  </div>
                </div>

                {/* Stars */}
                <div className="flex justify-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-center mb-8">
                  <p className="text-muted-foreground leading-relaxed italic text-lg">
                    "{testimonial.quote}"
                  </p>
                </blockquote>

                {/* Student Info */}
                <div className="text-center border-t border-border/30 pt-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-orange-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-primary font-black text-xl">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h4 className="font-bold text-foreground mb-2 text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-primary font-bold mb-1 bg-primary/10 px-3 py-1 rounded-full inline-block">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-muted-foreground font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>
              
              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-xl"></div>
            </div>
          ))}
        </div>

        {/* Enhanced Success Stats */}
        <div className="relative bg-gradient-to-r from-primary/15 via-orange-500/10 to-primary/15 border-2 border-primary/30 rounded-3xl p-10 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.1)_0%,transparent_70%)] rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-foreground mb-4">Our Success Metrics</h3>
              <p className="text-muted-foreground text-lg">Numbers that reflect our commitment to excellence</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl font-black text-primary">95%</span>
                </div>
                <h4 className="font-bold text-foreground mb-2">Student Satisfaction</h4>
                <p className="text-sm text-muted-foreground">Exceptional learning experience</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl font-black text-primary">88%</span>
                </div>
                <h4 className="font-bold text-foreground mb-2">Placement Rate</h4>
                <p className="text-sm text-muted-foreground">Successfully placed graduates</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-black text-primary">₹25K+</span>
                </div>
                <h4 className="font-bold text-foreground mb-2">Starting Salary</h4>
                <p className="text-sm text-muted-foreground">Average monthly income</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl font-black text-primary">500+</span>
                </div>
                <h4 className="font-bold text-foreground mb-2">Partner Companies</h4>
                <p className="text-sm text-muted-foreground">Industry collaborations</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with MATA PHOOLPATI DEVI SHIKSHAN SANSTHAN. 
            Start your journey toward professional success today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-primary group">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="btn-secondary">
              See More Success Stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;