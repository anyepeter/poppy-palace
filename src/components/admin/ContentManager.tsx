import { useState } from 'react';
import { Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { SiteContent } from '@/types/siteContent';

interface ContentManagerProps {
  content: SiteContent;
  onSave: (content: SiteContent) => void;
}

export default function ContentManager({ content, onSave }: ContentManagerProps) {
  const [formData, setFormData] = useState<SiteContent>(content);
  const { toast } = useToast();

  const handleSave = () => {
    onSave(formData);
    toast({
      title: "Success",
      description: "Site content has been updated successfully!",
    });
  };

  return (
    <div className="space-y-8">
      {/* Home Page Content */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="text-2xl text-gradient">Home Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.home.hero.title}
                  onChange={(e) => setFormData({
                    ...formData,
                    home: {
                      ...formData.home,
                      hero: { ...formData.home.hero, title: e.target.value }
                    }
                  })}
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Textarea
                  value={formData.home.hero.subtitle}
                  onChange={(e) => setFormData({
                    ...formData,
                    home: {
                      ...formData.home,
                      hero: { ...formData.home.hero, subtitle: e.target.value }
                    }
                  })}
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Statistics</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setFormData({
                    ...formData,
                    home: {
                      ...formData.home,
                      stats: [...formData.home.stats, { number: '', label: '' }]
                    }
                  });
                }}
              >
                Add Stat
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {formData.home.stats.map((stat, index) => (
                <div key={index} className="space-y-2 relative">
                  <div className="grid grid-cols-[1fr,1fr,auto] gap-2">
                    <Input
                      placeholder="Number (e.g. 500+)"
                      value={stat.number}
                      onChange={(e) => {
                        const newStats = [...formData.home.stats];
                        newStats[index].number = e.target.value;
                        setFormData({
                          ...formData,
                          home: { ...formData.home, stats: newStats }
                        });
                      }}
                    />
                    <Input
                      placeholder="Label (e.g. Dogs Adopted)"
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...formData.home.stats];
                        newStats[index].label = e.target.value;
                        setFormData({
                          ...formData,
                          home: { ...formData.home, stats: newStats }
                        });
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => {
                        const newStats = formData.home.stats.filter((_, i) => i !== index);
                        setFormData({
                          ...formData,
                          home: { ...formData.home, stats: newStats }
                        });
                      }}
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="card-glass">
        <CardHeader>
          <CardTitle className="text-2xl text-gradient">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Phone</Label>
            <Input
              value={formData.contact.phone}
              onChange={(e) => setFormData({
                ...formData,
                contact: { ...formData.contact, phone: e.target.value }
              })}
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.contact.email}
              onChange={(e) => setFormData({
                ...formData,
                contact: { ...formData.contact, email: e.target.value }
              })}
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              value={formData.contact.address}
              onChange={(e) => setFormData({
                ...formData,
                contact: { ...formData.contact, address: e.target.value }
              })}
            />
          </div>
          <div>
            <Label>City, State ZIP</Label>
            <Input
              value={formData.contact.city}
              onChange={(e) => setFormData({
                ...formData,
                contact: { ...formData.contact, city: e.target.value }
              })}
            />
          </div>
          <div>
            <Label>Business Hours</Label>
            <Input
              value={formData.contact.hours}
              onChange={(e) => setFormData({
                ...formData,
                contact: { ...formData.contact, hours: e.target.value }
              })}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={handleSave} className="btn-hero px-8">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>
    </div>
  );
}
