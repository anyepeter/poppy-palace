import { motion } from 'framer-motion';
import { Search, FileText, Heart, Home, CheckCircle, Phone, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Process() {
  const steps = [
    {
      icon: Search,
      title: "Browse & Find",
      description: "Explore our available poppies and find one that captures your heart. Use our filters to find the perfect match for your lifestyle.",
      duration: "15-30 minutes",
      color: "from-poppy-peach to-poppy-pink"
    },
    {
      icon: FileText,
      title: "Submit Application",
      description: "Complete our comprehensive adoption application. We'll ask about your experience, living situation, and preferences.",
      duration: "30-45 minutes",
      color: "from-poppy-pink to-poppy-blue"
    },
    {
      icon: Phone,
      title: "Phone Interview",
      description: "Our adoption specialists will call to discuss your application and answer any questions you might have.",
      duration: "20-30 minutes",
      color: "from-poppy-blue to-poppy-lavender"
    },
    {
      icon: Home,
      title: "Home Visit",
      description: "We'll visit your home to ensure it's safe and suitable for your chosen poppy. This helps us make the best match!",
      duration: "1-2 hours",
      color: "from-poppy-lavender to-poppy-yellow"
    },
    {
      icon: Heart,
      title: "Meet & Greet",
      description: "Spend quality time with your chosen poppy at our facility. Bring the whole family to see if it's a perfect match!",
      duration: "1-2 hours",
      color: "from-poppy-yellow to-poppy-peach"
    },
    {
      icon: CheckCircle,
      title: "Finalize Adoption",
      description: "Complete the adoption paperwork, pay the adoption fee, and take your new family member home!",
      duration: "30-60 minutes",
      color: "from-poppy-peach to-poppy-pink"
    }
  ];

  const requirements = [
    {
      title: "Age Requirement",
      description: "Must be 21 years or older to adopt",
      icon: Calendar
    },
    {
      title: "Valid ID",
      description: "Government-issued photo identification required",
      icon: FileText
    },
    {
      title: "Housing",
      description: "Stable housing with landlord permission if renting",
      icon: Home
    },
    {
      title: "Family Agreement",
      description: "All household members must agree to the adoption",
      icon: Users
    }
  ];

  const fees = [
    { category: "Puppies (Under 1 year)", fee: "$500", includes: "Spay/neuter, vaccinations, microchip, health check" },
    { category: "Adult Dogs (1-7 years)", fee: "$350", includes: "Spay/neuter, vaccinations, microchip, health check" },
    { category: "Senior Dogs (7+ years)", fee: "$200", includes: "Spay/neuter, vaccinations, microchip, health check" },
    { category: "Special Needs", fee: "$150", includes: "All medical care, ongoing support resources" }
  ];

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
              American Cocker Spaniel Adoption <span className="text-gradient">Process</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto px-4">
              Our specialized adoption process ensures the perfect match between 
              American Cocker Spaniels and their forever families. Here's what to expect on your 
              journey to finding your new Cocker companion.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Steps Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-4 md:mb-6">
              Simple <span className="text-gradient">6-Step Process</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto px-4">
              Our streamlined process ensures every adoption is successful and every 
              American Cocker Spaniel finds their perfect forever home.
            </p>
          </motion.div>

          <div className="space-y-6 md:space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-full">
                  <Card className="card-colorful hover:glow group">
                    <CardHeader className="pb-3 md:pb-4">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                          <step.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 mb-1">
                            <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base flex-shrink-0">
                              {index + 1}
                            </div>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-poppy-peach font-medium text-sm md:text-base">{step.duration}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm md:text-base text-foreground/70 leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-gradient-to-r from-white/50 to-poppy-pink/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Adoption <span className="text-gradient">Requirements</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              To ensure the best outcomes for our American Cocker Spaniels, we have a few basic 
              requirements for all potential adopters.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {requirements.map((req, index) => (
              <motion.div
                key={req.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-glass h-full hover:glow group">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <req.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{req.title}</h3>
                    <p className="text-foreground/70 text-sm">{req.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Adoption Fees Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Adoption <span className="text-gradient">Fees</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Our adoption fees help cover the cost of specialized medical care, grooming, food, shelter, 
              and preparation for each American Cocker Spaniel's journey to their forever home.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {fees.map((fee, index) => (
              <motion.div
                key={fee.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-colorful hover:glow group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">{fee.category}</h3>
                      <div className="text-2xl font-bold text-gradient group-hover:scale-110 transition-transform duration-300">
                        {fee.fee}
                      </div>
                    </div>
                    <p className="text-foreground/70 text-sm">{fee.includes}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-poppy-peach/20 to-poppy-pink/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Your <span className="text-gradient">Adoption Journey</span>?
            </h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-3xl mx-auto">
              Take the first step towards finding your perfect American Cocker Spaniel companion. 
              Browse our available dogs or get in touch with any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/adopt">
                <Button className="btn-hero text-lg px-8 py-4 glow">
                  Browse Available Cocker Spaniels
                  <Heart className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="btn-glass text-lg px-8 py-4">
                  Ask Questions
                  <Phone className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}