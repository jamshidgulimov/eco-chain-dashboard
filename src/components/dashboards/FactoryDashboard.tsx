import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { Factory, Wallet, Send, Package, TrendingUp, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const FactoryDashboard = () => {
  const { user, logout, updateBalance } = useAuth();
  const [transfer, setTransfer] = useState({
    pointId: '',
    amount: '',
    wasteType: ''
  });

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transfer.pointId || !transfer.amount) return;

    const amount = parseInt(transfer.amount);
    if (amount > (user?.balance || 0)) {
      toast({
        title: "Xatolik!",
        description: "Hisobda yetarli mablag' yo'q.",
        variant: "destructive"
      });
      return;
    }

    updateBalance(-amount);
    toast({
      title: "To'lov yuborildi!",
      description: `${amount.toLocaleString()} so'm qabul punktiga yuborildi.`,
    });

    setTransfer({ pointId: '', amount: '', wasteType: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-light to-eco-secondary/10">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Factory className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-eco-dark">Zavod Dashboard</h1>
              <p className="text-muted-foreground">Xush kelibsiz, {user?.username}!</p>
            </div>
          </div>
          <Button variant="outline" onClick={logout}>
            Chiqish
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Balance */}
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
                  <span>Bu oy sotib olindi: 2,850 kg</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>Jami sarflangan: 2,450,000 so'm</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transfer Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                Qabul punktiga to'lov
              </CardTitle>
              <CardDescription>
                Chiqindi qabul qilish uchun to'lov yuboring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTransfer} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pointId">Qabul punkti</Label>
                    <Select 
                      value={transfer.pointId} 
                      onValueChange={(value) => setTransfer(prev => ({ ...prev, pointId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Punktni tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="point1">Toshkent #1 - Chilonzor tumani</SelectItem>
                        <SelectItem value="point2">Toshkent #2 - Yunusobod tumani</SelectItem>
                        <SelectItem value="point3">Toshkent #3 - Yashnobod tumani</SelectItem>
                        <SelectItem value="point4">Samarkand #1 - Markaz</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wasteType">Chiqindi turi</Label>
                    <Select 
                      value={transfer.wasteType} 
                      onValueChange={(value) => setTransfer(prev => ({ ...prev, wasteType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Turni tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plastic">Plastik</SelectItem>
                        <SelectItem value="paper">Qog'oz/Karton</SelectItem>
                        <SelectItem value="metal">Metal</SelectItem>
                        <SelectItem value="glass">Shisha</SelectItem>
                        <SelectItem value="mixed">Aralash</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">To'lov miqdori (so'm)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={transfer.amount}
                    onChange={(e) => setTransfer(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="Miqdorni kiriting"
                    min="1000"
                    max={user?.balance}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={!transfer.pointId || !transfer.amount}>
                  <Send className="h-4 w-4 mr-2" />
                  To'lov yuborish
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Purchase Orders */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Buyurtmalar va to'lovlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { 
                  date: '2024-01-15', 
                  point: 'Toshkent #1', 
                  type: 'Plastik', 
                  weight: '150 kg', 
                  amount: '-225,000 so\'m',
                  status: 'Qabul qilindi'
                },
                { 
                  date: '2024-01-14', 
                  point: 'Toshkent #2', 
                  type: 'Qog\'oz', 
                  weight: '200 kg', 
                  amount: '-160,000 so\'m',
                  status: 'Qabul qilindi'
                },
                { 
                  date: '2024-01-13', 
                  point: 'Samarkand #1', 
                  type: 'Metal', 
                  weight: '85 kg', 
                  amount: '-255,000 so\'m',
                  status: 'Kutilmoqda'
                }
              ].map((order, index) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium">{order.point} - {order.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.date} - {order.weight}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Qabul qilindi' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-yellow-500/10 text-yellow-600'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <span className="font-semibold text-destructive">{order.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FactoryDashboard;