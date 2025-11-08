import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Heart, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ContactInfo } from '@/types/siteContent';
import { defaultSiteContent } from '@/utils/siteContentDefaults';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    interestedDog: '',
    adoptionReason: ''
  });
  const [contactData, setContactData] = useState<ContactInfo>(defaultSiteContent.contact);
  const { toast } = useToast();

  useEffect(() => {
    const savedContent = localStorage.getItem('poppy-paws-content');
    if (savedContent) {
      const parsed = JSON.parse(savedContent);
      setContactData(parsed.contact);
    }
  }, []);

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: contactData.phone,
      subtitle: "Call us anytime!",
      color: "from-poppy-peach to-poppy-pink"
    },
    {
      icon: Mail,
      title: "Email",
      details: contactData.email,
      subtitle: "We reply within 24 hours",
      color: "from-poppy-pink to-poppy-blue"
    },
    {
      icon: MapPin,
      title: "Location",
      details: contactData.address,
      subtitle: contactData.city,
      color: "from-poppy-blue to-poppy-lavender"
    },
    {
      icon: Clock,
      title: "Hours",
      details: contactData.hours.split(',')[0],
      subtitle: contactData.hours.split(',')[1] || "",
      color: "from-poppy-lavender to-poppy-yellow"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours. Thank you for your interest in adoption!",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      interestedDog: '',
      adoptionReason: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-16">
      {/* Header */}
      <header className="py-12 md:py-20 bg-gradient-to-r from-poppy-blue/20 to-poppy-lavender/20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto px-4">
              Have questions about American Cocker Spaniel adoption? Want to learn more about a specific dog? 
              We're here to help you find your perfect Cocker companion.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Contact Info Cards */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="card-colorful hover:glow group text-center">
                  <CardContent className="p-4 md:p-6">
                    <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${info.color} rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2">{info.title}</h3>
                    <p className="font-medium text-foreground/90 mb-1 text-xs md:text-base break-words">{info.details}</p>
                    <p className="text-xs md:text-sm text-foreground/70 hidden sm:block">{info.subtitle}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Contact Section */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="card-glass">
                <CardHeader>
                  <h2 className="text-2xl font-bold text-gradient mb-2">Send us a Message</h2>
                  <p className="text-foreground/70">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                          className="rounded-xl border-0 bg-white/50 focus:bg-white/80 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address *</label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                          className="rounded-xl border-0 bg-white/50 focus:bg-white/80 transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        className="rounded-xl border-0 bg-white/50 focus:bg-white/80 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Interested in a specific Cocker Spaniel?</label>
                      <Input
                        name="interestedDog"
                        value={formData.interestedDog}
                        onChange={handleInputChange}
                        placeholder="Enter dog's name if known"
                        className="rounded-xl border-0 bg-white/50 focus:bg-white/80 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Why are you interested in adoption?</label>
                      <Textarea
                        name="adoptionReason"
                        value={formData.adoptionReason}
                        onChange={handleInputChange}
                        placeholder="Tell us about your family, living situation, and what you're looking for in a companion..."
                        rows={3}
                        className="rounded-xl border-0 bg-white/50 focus:bg-white/80 transition-all duration-300 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Additional Message *</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us how we can help you or ask any questions..."
                        rows={4}
                        required
                        className="rounded-xl border-0 bg-white/50 focus:bg-white/80 transition-all duration-300 resize-none"
                      />
                    </div>

                    <Button type="submit" className="w-full btn-hero glow">
                      Send Message
                      <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <Card className="card-colorful overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-poppy-blue/30 to-poppy-lavender/30 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-poppy-blue mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-poppy-blue mb-2">Visit Our Location</h3>
                    <p className="text-foreground/70">
                      {contactData.address}<br />
                      {contactData.city}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Quick Contact */}
              <Card className="card-glass">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Need Immediate Help?</h3>
                      <p className="text-foreground/70 text-sm">We're here for you</p>
                    </div>
                  </div>
                  <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
                    If you have urgent questions about adoption or need immediate assistance, 
                    don't hesitate to call us directly. Our team is always ready to help!
                  </p>
                  <div className="space-y-2">
                    <Button className="w-full btn-glass justify-start">
                      <Phone className="w-4 h-4 mr-2" />
                      Call {contactData.phone}
                    </Button>
                    <Button className="w-full btn-glass justify-start">
                      <Mail className="w-4 h-4 mr-2" />
                      Email {contactData.email}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="card-colorful">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gradient">Quick FAQ</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-foreground/90">How long does the adoption process take?</p>
                      <p className="text-foreground/70">Typically 1-2 weeks from application to adoption.</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground/90">Can I visit before applying?</p>
                      <p className="text-foreground/70">Yes! We encourage visits during our open hours.</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground/90">Do you provide post-adoption support?</p>
                      <p className="text-foreground/70">Absolutely! We offer lifetime support for all adoptions.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}