import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Award, MapPin, Calendar, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Dog } from '@/types/siteContent';
import { dogApi } from '@/utils/api';

interface DogsManagerProps {
  dogs: Dog[];
  onSave: (dogs: Dog[]) => void;
}

const initialDogData: Dog = {
  id: 0,
  name: '',
  breed: '',
  age: '',
  size: 'Medium',
  personality: [],
  description: '',
  images: [],
  location: '',
  isSponsored: false,
};

export default function DogsManager({ dogs, onSave }: DogsManagerProps) {
  const [editingDog, setEditingDog] = useState<Dog | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Dog>(initialDogData);
  const [personalityInput, setPersonalityInput] = useState('');
  const [uploadingImages, setUploadingImages] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    const newImages: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast({
            title: "Invalid File",
            description: `${file.name} is not an image file`,
            variant: "destructive",
          });
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "File Too Large",
            description: `${file.name} is larger than 5MB`,
            variant: "destructive",
          });
          continue;
        }

        // Convert to base64
        const reader = new FileReader();
        const imageData = await new Promise<string>((resolve, reject) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        newImages.push(imageData);
      }

      setFormData({
        ...formData,
        images: [...formData.images, ...newImages]
      });

      toast({
        title: "Success",
        description: `${newImages.length} image(s) uploaded successfully`,
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload one or more images",
        variant: "destructive",
      });
    } finally {
      setUploadingImages(false);
      // Reset file input
      e.target.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({ ...initialDogData, id: Date.now() });
    setPersonalityInput('');
  };

  const handleEdit = (dog: Dog) => {
    setEditingDog(dog);
    setFormData({ ...dog });
    setPersonalityInput(dog.personality.join(', '));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.breed || !formData.age) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (Name, Breed, Age)",
        variant: "destructive",
      });
      return;
    }

    if (formData.images.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one image",
        variant: "destructive",
      });
      return;
    }

    const personalityArray = personalityInput
      .split(',')
      .map(trait => trait.trim())
      .filter(trait => trait.length > 0);

    const updatedDog = {
      ...formData,
      personality: personalityArray,
    };

    try {
      if (isCreating) {
        await dogApi.create(updatedDog);
        toast({
          title: "Success",
          description: `${updatedDog.name} has been added successfully!`,
        });
      } else {
        await dogApi.update(updatedDog.id, updatedDog);
        toast({
          title: "Success",
          description: `${updatedDog.name} has been updated successfully!`,
        });
      }

      // Refresh the dogs list
      const updatedDogs = await dogApi.getAll();
      onSave(updatedDogs);
      
      setIsCreating(false);
      setEditingDog(null);
      setFormData(initialDogData);
      setPersonalityInput('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save dog. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    const dogToDelete = dogs.find(dog => dog.id === id);
    if (window.confirm(`Are you sure you want to delete ${dogToDelete?.name}?`)) {
      try {
        await dogApi.delete(id);
        const updatedDogs = await dogApi.getAll();
        onSave(updatedDogs);
        toast({
          title: "Success",
          description: `${dogToDelete?.name} has been deleted.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete dog. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingDog(null);
    setFormData(initialDogData);
    setPersonalityInput('');
  };

  return (
    <div>
      {!isCreating && !editingDog && (
        <div className="mb-8 text-center">
          <Button onClick={handleCreate} className="btn-hero">
            <Plus className="w-5 h-5 mr-2" />
            Add New Puppy
          </Button>
        </div>
      )}

      {(isCreating || editingDog) && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Card className="card-glass max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-gradient">
                {isCreating ? 'Add New Puppy' : `Edit ${editingDog?.name}`}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Puppy's name"
                  />
                </div>
                <div>
                  <Label htmlFor="breed">Breed *</Label>
                  <Input
                    id="breed"
                    value={formData.breed}
                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                    placeholder="Puppy's breed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="e.g., 2 years"
                  />
                </div>
                <div>
                  <Label htmlFor="size">Size</Label>
                  <select
                    id="size"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-input bg-background"
                  >
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., San Francisco, CA"
                />
              </div>

              <div>
                <Label htmlFor="personality">Personality Traits</Label>
                <Input
                  id="personality"
                  value={personalityInput}
                  onChange={(e) => setPersonalityInput(e.target.value)}
                  placeholder="Friendly, Energetic, Loyal (comma separated)"
                />
              </div>

              <div>
                <Label htmlFor="images">Puppy Images *</Label>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <label 
                      htmlFor="image-upload" 
                      className="flex-1 cursor-pointer"
                    >
                      <div className="border-2 border-dashed border-input rounded-lg p-6 hover:border-primary transition-colors text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-foreground/50" />
                        <p className="text-sm font-medium mb-1">
                          {uploadingImages ? 'Uploading...' : 'Click to upload images'}
                        </p>
                        <p className="text-xs text-foreground/50">
                          Select multiple images (Max 5MB each)
                        </p>
                      </div>
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImages}
                    />
                  </div>

                  {/* Image Preview Grid */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {formData.images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          {index === 0 && (
                            <div className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
                              Main
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tell us about this puppy's personality and story..."
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="sponsored"
                  checked={formData.isSponsored}
                  onChange={(e) => setFormData({ ...formData, isSponsored: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="sponsored">Sponsored</Label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button onClick={handleSave} className="flex-1 btn-hero">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline" className="flex-1">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dogs.map((dog, index) => (
          <motion.div
            key={dog.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="card-colorful group hover:glow overflow-hidden h-full">
              <div className="relative">
                <img
                  src={(dog.images && dog.images.length > 0) ? dog.images[0] : '/src/assets/dogs-grid.jpg'}
                  alt={dog.name}
                  className="w-full h-48 object-cover"
                />
                {dog.images && dog.images.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" />
                    {dog.images.length}
                  </div>
                )}
                {dog.isSponsored && (
                  <Badge className="absolute top-2 left-2 bg-gradient-warm text-white">
                    <Award className="w-3 h-3 mr-1" />
                    Sponsored
                  </Badge>
                )}
                
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    size="icon"
                    onClick={() => handleEdit(dog)}
                    className="rounded-full bg-blue-500 hover:bg-blue-600 text-white w-8 h-8"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    onClick={() => handleDelete(dog.id)}
                    className="rounded-full bg-red-500 hover:bg-red-600 text-white w-8 h-8"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gradient">{dog.name}</h3>
                  <Badge variant="outline" className="text-sm">
                    {dog.size}
                  </Badge>
                </div>
                <div className="flex items-center text-foreground/70 text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {dog.age} • {dog.breed}
                </div>
                {dog.location && (
                  <div className="flex items-center text-foreground/70 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {dog.location}
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-foreground/70 mb-3 text-sm line-clamp-2">{dog.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {dog.personality.map((trait) => (
                    <Badge key={trait} variant="secondary" className="text-xs">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {dogs.length === 0 && !isCreating && (
        <Card className="card-glass max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Puppies Yet</h3>
            <p className="text-foreground/70 mb-4">
              Start by adding your first puppy to the adoption list.
            </p>
            <Button onClick={handleCreate} className="btn-hero">
              Add First Puppy
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
