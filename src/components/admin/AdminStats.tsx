import { motion } from 'framer-motion';
import { Dog, Heart, MapPin, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Dog as DogType } from '@/types/siteContent';

interface AdminStatsProps {
  dogs: DogType[];
}

export default function AdminStats({ dogs }: AdminStatsProps) {
  // Calculate statistics
  const totalPuppies = dogs.length;
  const sponsoredPuppies = dogs.filter(dog => dog.isSponsored).length;
  
  // Count by size
  const sizeBreakdown = dogs.reduce((acc, dog) => {
    acc[dog.size] = (acc[dog.size] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Count unique locations
  const uniqueLocations = new Set(dogs.map(dog => dog.location).filter(Boolean)).size;

  const stats = [
    {
      icon: Dog,
      label: 'Total Puppies',
      value: totalPuppies,
      description: 'Available for adoption',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Award,
      label: 'Sponsored',
      value: sponsoredPuppies,
      description: 'Featured puppies',
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10'
    },
    {
      icon: Heart,
      label: 'By Size',
      value: `${sizeBreakdown.Small || 0}/${sizeBreakdown.Medium || 0}/${sizeBreakdown.Large || 0}`,
      description: 'Small / Medium / Large',
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10'
    },
    {
      icon: MapPin,
      label: 'Locations',
      value: uniqueLocations,
      description: 'Different areas',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="card-glass hover:glow transition-all duration-300">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl md:text-3xl font-bold text-gradient">
                    {stat.value}
                  </p>
                  <p className="text-sm md:text-base font-semibold text-foreground">
                    {stat.label}
                  </p>
                  <p className="text-xs md:text-sm text-foreground/60">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
