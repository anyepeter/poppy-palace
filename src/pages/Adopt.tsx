import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Heart, MapPin, Calendar, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dog } from '@/types/siteContent';
import dogsGridImage from '@/assets/dogs-grid.jpg';

export default function Adopt() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedAge, setSelectedAge] = useState('All');
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [imageIndexes, setImageIndexes] = useState<{ [key: number]: number }>({});

  // Load dogs from localStorage
  useEffect(() => {
    const savedDogs = localStorage.getItem('poppy-paws-dogs');
    if (savedDogs) {
      const parsedDogs = JSON.parse(savedDogs);
      setDogs(parsedDogs);
      // Initialize image indexes
      const indexes: { [key: number]: number } = {};
      parsedDogs.forEach((dog: Dog) => {
        indexes[dog.id] = 0;
      });
      setImageIndexes(indexes);
    } else {
      // Fallback data if no dogs in localStorage
      const fallbackDogs: Dog[] = [
        {
          id: 1,
          name: "Luna",
          breed: "Golden Retriever",
          age: "2 years",
          size: "Large",
          personality: ["Friendly", "Energetic", "Loyal"],
          description: "Luna is a beautiful golden retriever who loves playing fetch and swimming. She's great with kids and other dogs!",
          images: [dogsGridImage],
          location: "San Francisco, CA",
          isSponsored: true
        },
        {
          id: 2,
          name: "Max",
          breed: "Corgi",
          age: "3 years",
          size: "Medium",
          personality: ["Playful", "Smart", "Gentle"],
          description: "Max is an adorable corgi with the sweetest personality. He loves cuddles and is perfect for apartment living.",
          images: [dogsGridImage],
          location: "Los Angeles, CA",
          isSponsored: false
        }
      ];
      setDogs(fallbackDogs);
      setImageIndexes({ 1: 0, 2: 0 });
    }
  }, []);

  const nextImage = (dogId: number, totalImages: number) => {
    setImageIndexes(prev => ({
      ...prev,
      [dogId]: (prev[dogId] + 1) % totalImages
    }));
  };

  const prevImage = (dogId: number, totalImages: number) => {
    setImageIndexes(prev => ({
      ...prev,
      [dogId]: prev[dogId] === 0 ? totalImages - 1 : prev[dogId] - 1
    }));
  };

  const filteredDogs = dogs.filter(dog => {
    const matchesSearch = dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dog.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSize = selectedSize === 'All' || dog.size === selectedSize;
    const matchesAge = selectedAge === 'All' || dog.age.includes(selectedAge);
    
    return matchesSearch && matchesSize && matchesAge;
  });

  return (
    <main className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Available <span className="text-gradient">American Cocker Spaniels</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto px-4">
            Each of our American Cocker Spaniels has a unique personality and story. Find the perfect companion
            who will bring endless joy and love to your family.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <Card className="card-glass">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col gap-4">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5" />
                  <Input
                    placeholder="Search by name or breed..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 py-3 rounded-full border-0 bg-white/50 focus:bg-white/80 transition-all duration-300 w-full"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-foreground/70" />
                    <span className="text-sm font-medium text-foreground/70">Filters:</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1">
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="px-4 py-2 rounded-full bg-white/50 border-0 focus:bg-white/80 transition-all duration-300 flex-1"
                    >
                      <option value="All">All Sizes</option>
                      <option value="Small">Small</option>
                      <option value="Medium">Medium</option>
                      <option value="Large">Large</option>
                    </select>
                    
                    <select
                      value={selectedAge}
                      onChange={(e) => setSelectedAge(e.target.value)}
                      className="px-4 py-2 rounded-full bg-white/50 border-0 focus:bg-white/80 transition-all duration-300 flex-1"
                    >
                      <option value="All">All Ages</option>
                      <option value="1">Puppy (1 year)</option>
                      <option value="2">Young (2-3 years)</option>
                      <option value="4">Adult (4+ years)</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dogs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {filteredDogs.map((dog, index) => (
            <motion.div
              key={dog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="card-colorful group hover:glow overflow-hidden h-full">
                <div className="relative">
                  <img
                    src={(dog.images && dog.images.length > 0) ? dog.images[imageIndexes[dog.id] || 0] : dogsGridImage}
                    alt={`${dog.name} - Image ${(imageIndexes[dog.id] || 0) + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Image Navigation */}
                  {dog.images && dog.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          prevImage(dog.id, dog.images.length);
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          nextImage(dog.id, dog.images.length);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      
                      {/* Image indicators */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {dog.images.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === (imageIndexes[dog.id] || 0)
                                ? 'bg-white w-4'
                                : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  {dog.isSponsored && (
                    <Badge className="absolute top-4 left-4 bg-gradient-warm text-white">
                      <Award className="w-3 h-3 mr-1" />
                      Sponsored
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4">
                    <Button
                      size="icon"
                      className="rounded-full bg-white/90 hover:bg-white text-poppy-peach hover:scale-110 transition-all duration-300"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gradient">{dog.name}</h3>
                    <Badge variant="outline" className="text-sm">
                      {dog.size}
                    </Badge>
                  </div>
                  <div className="flex items-center text-foreground/70 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {dog.age} • {dog.breed}
                  </div>
                  <div className="flex items-center text-foreground/70 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {dog.location}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-foreground/70 mb-4 line-clamp-3">{dog.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dog.personality.map((trait) => (
                      <Badge key={trait} variant="secondary" className="text-xs">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button className="w-full btn-hero group-hover:glow">
                    Meet {dog.name}
                    <Heart className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredDogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Card className="card-glass max-w-md mx-auto">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No Cocker Spaniels Found</h3>
                <p className="text-foreground/70 mb-4">
                  Try adjusting your search criteria to find more American Cocker Spaniels.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSize('All');
                    setSelectedAge('All');
                  }}
                  className="btn-hero"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </main>
  );
}