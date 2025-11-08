import { motion } from 'framer-motion';
import { Heart, Users, Home, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import familyImage from '@/assets/family-dog.jpg';

export default function About() {
  const navigate = useNavigate();
  
  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Every poppy receives individual attention, medical care, and love from our dedicated team of volunteers and veterinarians."
    },
    {
      icon: Users,
      title: "Perfect Matches",
      description: "We take time to understand both our poppies and potential families to ensure lifelong, happy relationships."
    },
    {
      icon: Home,
      title: "Forever Homes",
      description: "Our goal is not just adoption, but creating permanent, loving homes where poppies can thrive for life."
    },
    {
      icon: Trophy,
      title: "Ongoing Support",
      description: "We provide continuous guidance and support to families, ensuring successful transitions and happy lives."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & Director",
      description: "Sarah founded Poppy Paws in 2015 with a mission to rescue and rehome dogs in need.",
      experience: "15+ years"
    },
    {
      name: "Dr. Michael Chen",
      role: "Chief Veterinarian",
      description: "Dr. Chen ensures all our poppies receive the best medical care and health screenings.",
      experience: "12+ years"
    },
    {
      name: "Emma Rodriguez",
      role: "Adoption Specialist",
      description: "Emma helps match families with their perfect companions through careful assessment.",
      experience: "8+ years"
    },
    {
      name: "James Wilson",
      role: "Volunteer Coordinator",
      description: "James manages our amazing team of volunteers who make everything possible.",
      experience: "6+ years"
    }
  ];

  return (
    <main className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-16">
      {/* Hero Section */}
      <section className="py-12 md:py-20 relative overflow-hidden" aria-label="About us hero">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${familyImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-poppy-blue/90 to-poppy-lavender/90"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              American Cocker Spaniel <span className="text-yellow-200">Rescue</span> & Adoption
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90 leading-relaxed px-4">
              At Poppy Paws, we specialize in American Cocker Spaniel rescue and adoption. 
              Since 2015, we've been dedicated to matching these gentle, affectionate dogs 
              with loving families who understand and appreciate this wonderful breed.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 md:mt-8"
            >
              <Button 
                onClick={() => navigate('/adopt')}
                size="lg"
                className="bg-gradient-warm hover:opacity-90 text-white px-8 py-6 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Adopt Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20" aria-label="Our story">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Our <span className="text-gradient">Story</span>
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  Poppy Paws began with a focus on American Cocker Spaniels after our founder, 
                  Sarah Johnson, rescued Poppy, a beautiful buff-colored Cocker Spaniel who had been abandoned. 
                  Recognizing the breed's unique needs and wonderful qualities, we became specialists in Cocker Spaniel rescue.
                </p>
                <p>
                  American Cocker Spaniels are known for their sweet disposition, expressive eyes, and silky coats. 
                  These medium-sized sporting dogs make excellent family companions and adapt well to various living 
                  situations when given proper care and attention.
                </p>
                <p>
                  We're not just an adoption center—we're a community of American Cocker Spaniel enthusiasts, 
                  breed experts, veterinarians, and families who believe every Cocker deserves a loving home 
                  where their gentle nature and loyal companionship can flourish.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="card-colorful">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gradient">Why "Poppy Paws"?</h3>
                    <p className="text-foreground/70 leading-relaxed">
                      Our name comes from Poppy, a rescued American Cocker Spaniel with a beautiful 
                      buff coat who inspired our founder to start this journey. Just like the vibrant 
                      poppy flower, these wonderful dogs bring color, joy, and beauty into every life they touch.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-white/50 to-poppy-pink/10" aria-label="Core values">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Our <span className="text-gradient">Core Values</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              These principles guide everything we do, from rescue to rehoming, 
              ensuring the best outcomes for both American Cocker Spaniels and their families.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-colorful h-full group hover:glow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20" aria-label="Our team">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Meet Our <span className="text-gradient">Amazing Team</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Our dedicated professionals and volunteers work tirelessly to ensure 
              every American Cocker Spaniel receives the specialized care and love they deserve.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-glass hover:glow group">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold text-white">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                    <p className="text-poppy-peach font-medium text-sm mb-2">{member.role}</p>
                    <p className="text-foreground/70 text-sm mb-3 leading-relaxed">{member.description}</p>
                    <div className="inline-block px-3 py-1 bg-gradient-warm rounded-full text-white text-xs font-medium">
                      {member.experience}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-poppy-peach/20 to-poppy-pink/20" aria-label="Our impact">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              Our <span className="text-gradient">Impact</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 mb-8 md:mb-12 max-w-3xl mx-auto px-2">
              Every number represents a life transformed, a family completed, 
              and a community made stronger through the power of love and compassion.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {[
                { number: "500+", label: "Cocker Spaniels Saved", description: "American Cocker Spaniels rescued and rehomed" },
                { number: "98%", label: "Success Rate", description: "Successful long-term adoptions" },
                { number: "15+", label: "Years Experience", description: "Specializing in the breed" },
                { number: "20+", label: "Partner Vets", description: "Cocker Spaniel health specialists" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="card-colorful hover:glow group">
                    <CardContent className="p-4 sm:p-6 text-center">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                        {stat.number}
                      </h3>
                      <p className="font-semibold mb-1 text-sm sm:text-base">{stat.label}</p>
                      <p className="text-foreground/70 text-xs sm:text-sm">{stat.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}