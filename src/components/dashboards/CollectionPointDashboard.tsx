import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import {
  QrCode,
  Wallet,
  MapPin,
  Recycle,
  Scan,
  Package,
  TrendingUp,
  LogOut,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const CollectionPointDashboard = () => {
  const { user, logout, updateBalance } = useAuth();
  const [qrCode, setQrCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState<"uz" | "ru" | "en">("uz");

  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("ecochain-username");
    if (savedUsername) setUsername(savedUsername);

    const savedLang = localStorage.getItem("ecochain-lang") as "uz" | "ru" | "en";
    if (savedLang) setLanguage(savedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem("ecochain-lang", language);
  }, [language]);

  const t = {
    uz: {
      dashboard: "Qabul Punkti Dashboard",
      welcome: "Xush kelibsiz",
      logout: "Chiqish",
      balance: "Hisobingiz",
      currentBalance: "Joriy balans",
      receivedToday: "Bugun qabul qilindi",
      receivedMonth: "Bu oy",
      location: "Joylashuv",
      hours: "Ish vaqti: 08:00 - 20:00",
      scanTitle: "QR Kod Skaneri",
      scanDesc: "Chiqindi qabul qilish uchun QR kodni skanerlang",
      scanBtn: "QR kodni skanerlash",
      scanning: "Skanerlanyapti...",
      guide: "Qo'llanma",
      guide1: "• Foydalanuvchidan QR kodni ko'rsatishni so'rang",
      guide2: "• QR kodni skanerlang yoki kodni qo'lda kiriting",
      guide3: "• Chiqindi turi va miqdori avtomatik aniqlanadi",
      guide4: "• To'lov avtomatik hisoblanadi",
      recent: "So'nggi qabul qilishlar",
    },
    ru: {
      dashboard: "Панель Пункта Приема",
      welcome: "Добро пожаловать",
      logout: "Выйти",
      balance: "Ваш Баланс",
      currentBalance: "Текущий Баланс",
      receivedToday: "Сегодня принято",
      receivedMonth: "В этом месяце",
      location: "Локация",
      hours: "Часы работы: 08:00 - 20:00",
      scanTitle: "Сканер QR-Кода",
      scanDesc: "Сканируйте QR-код для приёма отходов",
      scanBtn: "Сканировать QR-код",
      scanning: "Сканируется...",
      guide: "Инструкция",
      guide1: "• Попросите пользователя показать QR-код",
      guide2: "• Отсканируйте или введите код вручную",
      guide3: "• Тип и вес определяются автоматически",
      guide4: "• Оплата рассчитывается автоматически",
      recent: "Последние приёмы",
    },
    en: {
      dashboard: "Collection Point Dashboard",
      welcome: "Welcome",
      logout: "Logout",
      balance: "Your Balance",
      currentBalance: "Current Balance",
      receivedToday: "Received Today",
      receivedMonth: "This Month",
      location: "Location",
      hours: "Working hours: 08:00 - 20:00",
      scanTitle: "QR Code Scanner",
      scanDesc: "Scan a QR code to accept waste",
      scanBtn: "Scan QR Code",
      scanning: "Scanning...",
      guide: "Guide",
      guide1: "• Ask user to show the QR code",
      guide2: "• Scan or enter manually",
      guide3: "• Waste type and weight are auto-detected",
      guide4: "• Payment is calculated automatically",
      recent: "Recent Collections",
    },
  }[language];

  const handleQrScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qrCode) return;

    setIsScanning(true);
    setTimeout(() => {
      const amount = Math.floor(Math.random() * 10000) + 2000;
      updateBalance(amount);
      toast({
        title: "✅",
        description: `${amount.toLocaleString()} so'm qo'shildi`,
      });
      setQrCode("");
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
              <h1 className="text-2xl font-bold text-eco-dark">{t.dashboard}</h1>
              <p className="text-muted-foreground">
                {t.welcome}, {username}!
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Select value={language} onValueChange={(val) => setLanguage(val as any)}>
              <SelectTrigger className="w-24 h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uz">O'zbekcha</SelectItem>
                <SelectItem value="ru">Русский</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              {t.logout}
              <LogOut/>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Balance and Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  {t.balance}
                </CardTitle>
                <CardDescription>{t.currentBalance}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary mb-4">
                  10 500 000 so'm
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="h-4 w-4" />
                    <span>{t.receivedToday}: 45 kg</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span>{t.receivedMonth}: 1,250 kg</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {t.location}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">{user?.location}</p>
                <p className="text-muted-foreground mt-2">{t.hours}</p>
              </CardContent>
            </Card>
          </div>

          {/* QR Scanner */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-primary" />
                {t.scanTitle}
              </CardTitle>
              <CardDescription>{t.scanDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleQrScan} className="space-y-4">
                <Input
                  type="text"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                  placeholder="QR code..."
                  disabled={isScanning}
                />
                <Button type="submit" className="w-full" disabled={!qrCode || isScanning}>
                  {isScanning ? (
                    <>
                      <Scan className="h-4 w-4 mr-2 animate-spin" />
                      {t.scanning}
                    </>
                  ) : (
                    <>
                      <QrCode className="h-4 w-4 mr-2" />
                      {t.scanBtn}
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">{t.guide}:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>{t.guide1}</li>
                  <li>{t.guide2}</li>
                  <li>{t.guide3}</li>
                  <li>{t.guide4}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Collections */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{t.recent}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: "14:30", type: "Plastik idishlar", weight: "3.2 kg", amount: "+6,400 so'm" },
                { time: "13:45", type: "Qog'oz va karton", weight: "5.1 kg", amount: "+4,080 so'm" },
                { time: "12:20", type: "Metal qutichalar", weight: "2.8 kg", amount: "+8,400 so'm" },
                { time: "11:15", type: "Shisha idishlar", weight: "4.5 kg", amount: "+5,400 so'm" },
              ].map((collection, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
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
