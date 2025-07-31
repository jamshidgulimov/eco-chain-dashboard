import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Leaf, Recycle, Factory } from 'lucide-react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    const success = login(username, password, role);
    if (!success) {
      setError('Kirish ma\'lumotlari noto\'g\'ri');
    }
  };

  const getRoleIcon = (roleType: UserRole) => {
    switch (roleType) {
      case 'user': return <Leaf className="h-5 w-5" />;
      case 'collection-point': return <Recycle className="h-5 w-5" />;
      case 'factory': return <Factory className="h-5 w-5" />;
    }
  };

  const getRoleDescription = (roleType: UserRole) => {
    switch (roleType) {
      case 'user': return 'Oddiy foydalanuvchi - chiqindi yuborish';
      case 'collection-point': return 'Chiqindi qabul qilish punkti';
      case 'factory': return 'Zavod/Ishlab chiqaruvchi';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-eco-light to-eco-secondary/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-eco-dark">EcoChain Dashboard</CardTitle>
          <CardDescription>
            Ekologiya muammolarini hal qilish tizimi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Foydalanuvchi turi</Label>
              <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">
                    <div className="flex items-center gap-2">
                      {getRoleIcon('user')}
                      <div>
                        <div className="font-medium">Foydalanuvchi</div>
                        <div className="text-xs text-muted-foreground">
                          {getRoleDescription('user')}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="collection-point">
                    <div className="flex items-center gap-2">
                      {getRoleIcon('collection-point')}
                      <div>
                        <div className="font-medium">Qabul punkti</div>
                        <div className="text-xs text-muted-foreground">
                          {getRoleDescription('collection-point')}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="factory">
                    <div className="flex items-center gap-2">
                      {getRoleIcon('factory')}
                      <div>
                        <div className="font-medium">Zavod</div>
                        <div className="text-xs text-muted-foreground">
                          {getRoleDescription('factory')}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Foydalanuvchi nomi</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Foydalanuvchi nomini kiriting"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Parol</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolni kiriting"
              />
            </div>

            {error && (
              <div className="text-destructive text-sm text-center">{error}</div>
            )}

            <Button type="submit" className="w-full">
              Kirish
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Demo uchun: Har qanday foydalanuvchi nomi va parol bilan kirishingiz mumkin
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;