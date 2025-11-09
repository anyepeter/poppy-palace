import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import AdminLogin from '@/components/AdminLogin';
import DogsManager from '@/components/admin/DogsManager';
import ContentManager from '@/components/admin/ContentManager';
import AdminStats from '@/components/admin/AdminStats';
import { Dog, SiteContent } from '@/types/siteContent';
import { defaultSiteContent } from '@/utils/siteContentDefaults';

export default function Admin() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check authentication on component mount
  useEffect(() => {
    const authStatus = localStorage.getItem('poppy-paws-admin-auth');
    setIsAuthenticated(authStatus === 'true');
    setIsLoading(false);
  }, []);

  // Load dogs and content from API
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const loadData = async () => {
      try {
        // Load dogs
        const dogsResponse = await fetch('/api/dogs');
        if (dogsResponse.ok) {
          const dogsData = await dogsResponse.json();
          const formattedDogs = dogsData.map((dog: any) => ({
            ...dog,
            isSponsored: dog.is_sponsored
          }));
          setDogs(formattedDogs);
        }

        // Load content
        const contentResponse = await fetch('/api/content');
        if (contentResponse.ok) {
          const contentData = await contentResponse.json();
          if (Object.keys(contentData).length > 0) {
            setSiteContent(contentData);
          }
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        toast({
          title: "Error",
          description: "Failed to load data from server.",
          variant: "destructive"
        });
      }
    };

    loadData();
  }, [isAuthenticated, toast]);

  const saveDogs = async (updatedDogs: Dog[]) => {
    setDogs(updatedDogs);
    // API calls are handled in DogsManager component
  };

  const saveContent = async (updatedContent: SiteContent) => {
    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContent),
      });

      if (response.ok) {
        setSiteContent(updatedContent);
        toast({
          title: "Success",
          description: "Content updated successfully.",
        });
      } else {
        throw new Error('Failed to save content');
      }
    } catch (error) {
      console.error('Failed to save content:', error);
      toast({
        title: "Error",
        description: "Failed to save content.",
        variant: "destructive"
      });
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('poppy-paws-admin-auth');
    setIsAuthenticated(false);
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  // Show loading or login screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  // If not authenticated, show login (after all hooks are called)
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6">
                Admin <span className="text-gradient">Panel</span>
              </h1>
              <p className="text-sm sm:text-base md:text-xl text-foreground/70 max-w-3xl md:mx-0 mx-auto px-4 md:px-0">
                Manage dogs available for adoption. Add new dogs, edit existing ones, or remove adopted pets.
              </p>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="flex items-center gap-2 mx-auto md:mx-0 md:mt-0"
              size="sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </motion.div>

        {/* Statistics Dashboard */}
        <AdminStats dogs={dogs} />

        {/* Tabs for different admin sections */}
        <Tabs defaultValue="puppies" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6 md:mb-8">
            <TabsTrigger value="puppies" className="text-sm md:text-base">Puppies</TabsTrigger>
            <TabsTrigger value="content" className="text-sm md:text-base">Site Content</TabsTrigger>
          </TabsList>
          
          <TabsContent value="puppies">
            <DogsManager dogs={dogs} onSave={saveDogs} />
          </TabsContent>
          
          <TabsContent value="content">
            <ContentManager content={siteContent} onSave={saveContent} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}