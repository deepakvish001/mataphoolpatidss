import { MapPin, Phone, Mail, Clock, Send, MessageSquare, Download, Users, Award, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  return (
    <section id="work-with-us" className="section-padding bg-muted/10">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start your skill development journey? Contact us today to learn more 
            about our training programs and placement opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Corporate Headquarters</h4>
                    <p className="text-muted-foreground leading-relaxed mb-3">
                      D-87, Vyapar Marg, D Block, Sector 2,<br />
                      Noida - 201301, Uttar Pradesh, India
                    </p>
                    <div className="text-xs text-primary font-medium">
                      📍 Near Noida City Centre Metro Station
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Contact Numbers</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            <a href="tel:01204282837" className="hover:text-primary transition-colors">
                              0120 428 2837
                            </a>
                          </p>
                          <p className="text-xs text-muted-foreground">Primary Helpline</p>
                        </div>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Main</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            <a href="tel:01204570318" className="hover:text-primary transition-colors">
                              0120 457 0318
                            </a>
                          </p>
                          <p className="text-xs text-muted-foreground">Admissions</p>
                        </div>
                        <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded">Alt</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            <a href="tel:+917007989716" className="hover:text-primary transition-colors">
                              +91 7007989716
                            </a>
                          </p>
                          <p className="text-xs text-muted-foreground">Student Support</p>
                        </div>
                        <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-1 rounded">Mobile</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            <a href="tel:+919004362661" className="hover:text-primary transition-colors">
                              +91 9004362661
                            </a>
                          </p>
                          <p className="text-xs text-muted-foreground">Placement Cell</p>
                        </div>
                        <span className="text-xs bg-purple-500/10 text-purple-500 px-2 py-1 rounded">Jobs</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Email Support</h4>
                    <div className="space-y-2">
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <p className="text-sm font-medium text-foreground">
                          <a href="mailto:jitmskillspvtltd@gmail.com" className="hover:text-primary transition-colors">
                            jitmskillspvtltd@gmail.com
                          </a>
                        </p>
                        <p className="text-xs text-muted-foreground">General Inquiries & Course Information</p>
                      </div>
                      <div className="p-2 bg-muted/30 rounded-lg">
                        <p className="text-sm font-medium text-foreground">
                          <a href="mailto:info.mpdss@gmail.com" className="hover:text-primary transition-colors">
                            info.mpdss@gmail.com
                          </a>
                        </p>
                        <p className="text-xs text-muted-foreground">Admissions & Partnership Queries</p>
                      </div>
                      <div className="text-xs text-primary font-medium flex items-center space-x-1 mt-2">
                        <Clock className="h-3 w-3" />
                        <span>Response within 2-4 hours</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Operating Hours</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-muted/30 rounded-lg">
                        <span className="text-sm text-foreground">Monday - Friday</span>
                        <span className="text-sm font-medium text-primary">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted/30 rounded-lg">
                        <span className="text-sm text-foreground">Saturday</span>
                        <span className="text-sm font-medium text-primary">9:00 AM - 2:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-muted/30 rounded-lg">
                        <span className="text-sm text-foreground">Sunday</span>
                        <span className="text-sm font-medium text-red-500">Closed</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        ⚡ Emergency support available 24/7 for enrolled students
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card-premium">
              <h4 className="font-semibold text-foreground mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <Button className="w-full btn-primary group">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Free Counseling
                </Button>
                <Button variant="outline" className="w-full btn-secondary group">
                  <Download className="mr-2 h-5 w-5" />
                  Download Course Brochure
                </Button>
                <Button variant="outline" className="w-full btn-secondary group">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  WhatsApp Chat Support
                </Button>
                <Button variant="outline" className="w-full btn-secondary group">
                  <Users className="mr-2 h-5 w-5" />
                  Talk to Alumni
                </Button>
              </div>
              
              <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Award className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-primary">Free Career Guidance</p>
                    <p className="text-xs text-muted-foreground">Get personalized advice from our experts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-premium">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Send us a Message
            </h3>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <Input 
                    placeholder="Enter your first name"
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <Input 
                    placeholder="Enter your last name"
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input 
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <Input 
                  type="tel"
                  placeholder="Enter your phone number"
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Course of Interest
                </label>
                <Input 
                  placeholder="Which course are you interested in?"
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea 
                  placeholder="Tell us about your requirements..."
                  rows={4}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                />
              </div>

              <Button type="submit" className="w-full btn-primary group">
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;