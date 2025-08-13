import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  return (
    <section id="work-with-us" className="section-padding bg-gradient-to-b from-muted/5 to-background relative overflow-hidden">
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
            <MessageSquare className="h-5 w-5 text-primary" />
            <span className="text-primary font-bold tracking-wide">Let's Connect</span>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6">
            Get in <span className="text-gradient-enhanced bg-clip-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Ready to start your skill development journey? Contact us today to learn more 
            about our training programs and placement opportunities that will transform your career.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20">
          {/* Enhanced Contact Information */}
          <div className="space-y-8">
            <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm border border-primary/20 rounded-3xl p-8 overflow-hidden">
              <div className="absolute top-4 right-4 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-foreground mb-8 text-gradient-enhanced bg-clip-text">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {/* Location */}
                  <div className="flex items-start space-x-6 bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 rounded-2xl p-6 hover:border-primary/20 transition-all duration-300 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <MapPin className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-3 text-lg">Our Location</h4>
                      <p className="text-muted-foreground leading-relaxed text-base">
                        D-87, Vyapar Marg, D Block, Sector 2,<br />
                        Noida - 201301, Uttar Pradesh
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-6 bg-gradient-to-r from-green-500/5 to-transparent border border-green-500/10 rounded-2xl p-6 hover:border-green-500/20 transition-all duration-300 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-3 text-lg">Call Us</h4>
                      <div className="space-y-2">
                        <p className="text-muted-foreground">
                          <a href="tel:01204282837" className="hover:text-primary transition-colors font-medium">
                            0120 428 2837
                          </a>
                        </p>
                        <p className="text-muted-foreground">
                          <a href="tel:01204570318" className="hover:text-primary transition-colors font-medium">
                            0120 457 0318
                          </a>
                        </p>
                        <p className="text-muted-foreground">
                          <a href="tel:+917007989716" className="hover:text-primary transition-colors font-medium">
                            +91 7007989716
                          </a>
                        </p>
                        <p className="text-muted-foreground">
                          <a href="tel:+919004362661" className="hover:text-primary transition-colors font-medium">
                            +91 9004362661
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-6 bg-gradient-to-r from-orange-500/5 to-transparent border border-orange-500/10 rounded-2xl p-6 hover:border-orange-500/20 transition-all duration-300 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-3 text-lg">Email Us</h4>
                      <div className="space-y-2">
                        <p className="text-muted-foreground">
                          <a href="mailto:jitmskillspvtltd@gmail.com" className="hover:text-primary transition-colors font-medium">
                            jitmskillspvtltd@gmail.com
                          </a>
                        </p>
                        <p className="text-muted-foreground">
                          <a href="mailto:info.mpdss@gmail.com" className="hover:text-primary transition-colors font-medium">
                            info.mpdss@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start space-x-6 bg-gradient-to-r from-blue-500/5 to-transparent border border-blue-500/10 rounded-2xl p-6 hover:border-blue-500/20 transition-all duration-300 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-3 text-lg">Business Hours</h4>
                      <div className="space-y-2">
                        <p className="text-muted-foreground font-medium">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="text-muted-foreground font-medium">Saturday: 9:00 AM - 2:00 PM</p>
                        <p className="text-muted-foreground font-medium">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Quick Actions */}
            <div className="relative bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent backdrop-blur-sm border border-orange-500/20 rounded-3xl p-8 overflow-hidden">
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-orange-500/5 rounded-full blur-xl"></div>
              <div className="relative z-10">
                <h4 className="font-bold text-foreground mb-6 text-xl text-gradient-enhanced bg-clip-text">Quick Actions</h4>
                <div className="space-y-4">
                  <Button className="w-full btn-primary group shadow-lg hover:shadow-xl">
                    <MessageSquare className="mr-3 h-5 w-5" />
                    Schedule a Call
                  </Button>
                  <Button variant="outline" className="w-full btn-secondary border-2 hover:border-primary/50">
                    Download Brochure
                  </Button>
                  <Button variant="outline" className="w-full btn-secondary border-2 hover:border-primary/50">
                    WhatsApp Us
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm border border-primary/20 rounded-3xl p-8 overflow-hidden">
            <div className="absolute top-4 right-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-foreground mb-8 text-gradient-enhanced bg-clip-text">
                Send us a Message
              </h3>
              
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-3">
                      First Name *
                    </label>
                    <Input 
                      placeholder="Enter your first name"
                      className="bg-background/50 border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 h-12 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-3">
                      Last Name *
                    </label>
                    <Input 
                      placeholder="Enter your last name"
                      className="bg-background/50 border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-3">
                    Email Address *
                  </label>
                  <Input 
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-background/50 border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-3">
                    Phone Number *
                  </label>
                  <Input 
                    type="tel"
                    placeholder="Enter your phone number"
                    className="bg-background/50 border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-3">
                    Course of Interest
                  </label>
                  <Input 
                    placeholder="Which course are you interested in?"
                    className="bg-background/50 border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-foreground mb-3">
                    Message *
                  </label>
                  <Textarea 
                    placeholder="Tell us about your requirements and how we can help you..."
                    rows={5}
                    className="bg-background/50 border-2 border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 rounded-xl resize-none"
                  />
                </div>

                <Button type="submit" className="w-full btn-primary group shadow-xl hover:shadow-2xl h-14 text-lg">
                  <Send className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
                
                <p className="text-sm text-muted-foreground text-center">
                  We'll get back to you within <span className="text-primary font-semibold">24 hours</span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;