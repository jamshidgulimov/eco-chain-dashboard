import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { QrCode, Wallet, MapPin, Recycle, Scan, Package, TrendingUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const CollectionPointDashboard = () => {
  const { user, logout, updateBalance } = useAuth();
  const [qrCode, setQrCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleQrScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qrCode) return;

    setIsScanning(true);
    
    // Mock QR scanning process
    setTimeout(() => {
      const amount = Math.floor(Math.random() * 10000) + 2000; // 2000-12000 so'm
      updateBalance(amount);
      
      toast({
        title: "Chiqindi qabul qilindi!",
        description: `QR kod muvaffaqiyatli skanerlandi. +${amount.toLocaleString()} so'm`,
      });
      
      setQrCode('');
      setIsScanning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-light to-eco-secondary/10">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Recycle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-eco-dark">Qabul Punkti Dashboard</h1>
              <p className="text-muted-foreground">Xush kelibsiz, {user?.username}!</p>
            </div>
          </div>
          <Button variant="outline" onClick={logout}>
            Chiqish
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Balance and Info */}
          <div className="space-y-6">
            <Card>
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
                    <Package className="h-4 w-4" />
                    <span>Bugun qabul qilindi: 45 kg</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span>Bu oy: 1,250 kg</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Joylashuv
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">{user?.location}</p>
                <p className="text-muted-foreground mt-2">
                  Ish vaqti: 08:00 - 20:00
                </p>
              </CardContent>
            </Card>
          </div>

          {/* QR Scanner */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-primary" />
                QR Kod Skaneri
              </CardTitle>
              <CardDescription>
                Chiqindi qabul qilish uchun QR kodni skanerlang
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleQrScan} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    value={qrCode}
                    onChange={(e) => setQrCode(e.target.value)}
                    placeholder="QR kod ma'lumotini kiriting yoki skanerlang"
                    disabled={isScanning}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={!qrCode || isScanning}
                >
                  {isScanning ? (
                    <>
                      <Scan className="h-4 w-4 mr-2 animate-spin" />
                      Skanerlanyapti...
                    </>
                  ) : (
                    <>
                      <QrCode className="h-4 w-4 mr-2" />
                      QR kodni skanerlash
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Qo'llanma:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Foydalanuvchidan QR kodni ko'rsatishni so'rang</li>
                  <li>• QR kodni skanerlang yoki kodni qo'lda kiriting</li>
                  <li>• Chiqindi turi va miqdori avtomatik aniqlanadi</li>
                  <li>• To'lov avtomatik hisoblanadi</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Collections */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>So'nggi qabul qilishlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: '14:30', type: 'Plastik idishlar', weight: '3.2 kg', amount: '+6,400 so\'m' },
                { time: '13:45', type: 'Qog\'oz va karton', weight: '5.1 kg', amount: '+4,080 so\'m' },
                { time: '12:20', type: 'Metal qutichalar', weight: '2.8 kg', amount: '+8,400 so\'m' },
                { time: '11:15', type: 'Shisha idishlar', weight: '4.5 kg', amount: '+5,400 so\'m' }
              ].map((collection, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{collection.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {collection.time} - {collection.weight}
                    </p>
                  </div>
                  <span className="font-semibold text-success">{collection.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollectionPointDashboard;