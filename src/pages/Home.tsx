import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-dog-meadow.jpg';
import familyImage from '@/assets/family-dog.jpg';
import { HomeContent } from '@/types/siteContent';
import { defaultSiteContent } from '@/utils/siteContentDefaults';

export default function Home() {
  const [content, setContent] = useState<HomeContent>(defaultSiteContent.home);

  useEffect(() => {
    const savedContent = localStorage.getItem('poppy-paws-content');
    if (savedContent) {
      const parsed = JSON.parse(savedContent);
      setContent(parsed.home);
    }
  }, []);

  const featureIcons = [Heart, Users, Shield, Award];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-0" aria-label="Hero section">
        <div className="absolute inset-0 bg-animated-gradient"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="container mx-auto px-4 sm:px-6 z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {content.hero.title.split(' ').slice(0, -2).join(' ')}{' '}
                <span className="text-gradient">{content.hero.title.split(' ').slice(-2).join(' ')}</span>
              </motion.h1>
              
              <motion.p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-foreground font-light"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {content.hero.subtitle}
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link to="/adopt" className="w-full sm:w-auto">
                  <Button className="btn-hero text-base md:text-lg px-6 md:px-8 py-3 md:py-4 glow w-full">
                    Adopt Now
                    <Heart className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </Link>
                <Link to="/process" className="w-full sm:w-auto">
                  <Button className="btn-glass text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-64 sm:h-80 md:h-96 lg:h-[500px] flex items-center justify-center order-1 lg:order-2"
            >
              <div className="relative w-full h-full">
                <img 
                  src={heroImage} 
                  alt="Beautiful American Cocker Spaniel in meadow ready for adoption"
                  className="w-full h-full object-cover rounded-2xl md:rounded-3xl glass"
                  loading="eager"
                />
                <div className="hidden md:block absolute -bottom-4 -right-4 w-16 md:w-24 h-16 md:h-24 bg-gradient-warm rounded-full opacity-50 animate-pulse"></div>
                <div className="hidden md:block absolute -top-4 -left-4 w-12 md:w-16 h-12 md:h-16 bg-gradient-cool rounded-full opacity-40 animate-pulse delay-1000"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating elements - hidden on mobile */}
        <div className="hidden md:block absolute top-20 left-10 w-20 h-20 bg-poppy-pink/20 rounded-full animate-float"></div>
        <div className="hidden md:block absolute bottom-32 right-20 w-12 h-12 bg-poppy-blue/20 rounded-full animate-float delay-1000"></div>
        <div className="hidden md:block absolute top-1/2 right-10 w-8 h-8 bg-poppy-yellow/30 rounded-full animate-float delay-500"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 relative" aria-label="Adoption statistics">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {content.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="card-glass hover:glow cursor-pointer">
                  <CardContent className="p-4 md:p-6">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-1 md:mb-2">
                      {stat.number}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-foreground/70 font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-white/50 to-poppy-pink/10" aria-label="Why choose Poppy Paws">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Why Choose <span className="text-gradient">Poppy Paws</span>?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto px-4">
              We're more than just an adoption center. We're a community dedicated to creating 
              perfect matches between loving families and amazing poppies.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {content.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-colorful h-full group hover:glow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      {(() => {
                        const Icon = featureIcons[index];
                        return <Icon className="w-8 h-8 text-white" />;
                      })()}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-foreground/70">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 relative overflow-hidden" aria-label="Call to action">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${familyImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-poppy-peach/90 to-poppy-pink/90"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              {content.cta.title}
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              {content.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/adopt">
                <Button className="bg-white text-poppy-peach hover:bg-white/90 font-semibold px-8 py-4 rounded-full text-lg transform hover:-translate-y-1 transition-all duration-300 shadow-lg">
                  Browse Available Cocker Spaniels
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="border-2 border-white text-white hover:bg-white hover:text-poppy-peach font-semibold px-8 py-4 rounded-full text-lg transform hover:-translate-y-1 transition-all duration-300">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer with Admin Link */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-foreground/60">
              © 2024 Poppy Paws. All rights reserved.
            </p>
            <Link 
              to="/admin" 
              className="text-xs text-foreground/40 hover:text-foreground/60 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}