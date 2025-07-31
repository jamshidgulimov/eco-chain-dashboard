import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { Wallet, Upload, Camera, MapPin, Leaf, Recycle, Award } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [uploadData, setUploadData] = useState({
    description: '',
    location: '',
    image: null as File | null,
    video: null as File | null
  });

  const handleFileUpload = (type: 'image' | 'video', file: File) => {
    setUploadData(prev => ({ ...prev, [type]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    toast({
      title: "Chiqindi yuborildi!",
      description: "Sizning chiqindingiz muvaffaqiyatli yuborildi. Balans yangilanadi.",
    });
    
    // Reset form
    setUploadData({
      description: '',
      location: '',
      image: null,
      video: null
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-light to-eco-secondary/10">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-eco-dark">Foydalanuvchi Dashboard</h1>
              <p className="text-muted-foreground">Xush kelibsiz, {user?.username}!</p>
            </div>
          </div>
          <Button variant="outline" onClick={logout}>
            Chiqish
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Balance Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                Hisobingiz
              </CardTitle>
              <CardDescription>Joriy balans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-4">
                {user?.balance.toLocaleString()} so'm
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="h-4 w-4" />
                  <span>Eco Points: 150</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Recycle className="h-4 w-4" />
                  <span>Yuborilgan chiqindilar: 12 kg</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upload Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Chiqindi yuborish
              </CardTitle>
              <CardDescription>
                Chiqindi haqida ma'lumot va rasmlar yuboring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image" className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Rasm yuklash
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('image', file);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video" className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Video yuklash
                    </Label>
                    <Input
                      id="video"
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload('video', file);
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Joylashuv
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    value={uploadData.location}
                    onChange={(e) => setUploadData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Chiqindi joylashgan manzilni kiriting"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Izoh</Label>
                  <Textarea
                    id="description"
                    value={uploadData.description}
                    onChange={(e) => setUploadData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Chiqindi haqida qo'shimcha ma'lumot..."
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Chiqindi yuborish
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>So'nggi faoliyat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: '2024-01-15', action: 'Plastik chiqindi yuborildi', amount: '+5,000 so\'m' },
                { date: '2024-01-12', action: 'Qog\'oz chiqindi yuborildi', amount: '+3,500 so\'m' },
                { date: '2024-01-10', action: 'Metal chiqindi yuborildi', amount: '+8,000 so\'m' }
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                  <span className="font-semibold text-success">{activity.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;