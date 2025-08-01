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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import {
  Factory,
  Wallet,
  Send,
  Package,
  TrendingUp,
  ArrowRight,
  LogOut,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const translations = {
  uz: {
    dashboard: "Zavod Dashboard",
    welcome: "Xush kelibsiz",
    logout: "Chiqish",
    accepted: "Qabul qilingan",
    recycled: "Qayta ishlangan",
    dailyProfit: "Kunlik foyda",
    balance: "Hisobingiz",
    currentBalance: "Joriy balans",
    purchasedThisMonth: "Bu oy sotib olindi",
    totalSpent: "Jami sarflangan",
    transferTitle: "Qabul punktiga to'lov",
    transferDesc: "Chiqindi qabul qilish uchun to'lov yuboring",
    selectPoint: "Punktni tanlang",
    selectWaste: "Turni tanlang",
    amount: "To'lov miqdori (so'm)",
    sendPayment: "To'lov yuborish",
    ordersTitle: "Buyurtmalar va to'lovlar",
    received: "Qabul qilindi",
    pending: "Kutilmoqda",
  },
  ru: {
    dashboard: "Панель Завода",
    welcome: "Добро пожаловать",
    logout: "Выйти",
    accepted: "Принято",
    recycled: "Переработано",
    dailyProfit: "Ежедневная прибыль",
    balance: "Ваш счёт",
    currentBalance: "Текущий баланс",
    purchasedThisMonth: "Куплено в этом месяце",
    totalSpent: "Общие расходы",
    transferTitle: "Перевод в пункт приёма",
    transferDesc: "Отправьте оплату за переработку отходов",
    selectPoint: "Выберите пункт",
    selectWaste: "Выберите тип отходов",
    amount: "Сумма оплаты (сум)",
    sendPayment: "Отправить платёж",
    ordersTitle: "Заказы и платежи",
    received: "Принято",
    pending: "В ожидании",
  },
  en: {
    dashboard: "Factory Dashboard",
    welcome: "Welcome",
    logout: "Logout",
    accepted: "Accepted",
    recycled: "Recycled",
    dailyProfit: "Daily Profit",
    balance: "Your Balance",
    currentBalance: "Current Balance",
    purchasedThisMonth: "Purchased This Month",
    totalSpent: "Total Spent",
    transferTitle: "Transfer to Collection Point",
    transferDesc: "Send payment for collected waste",
    selectPoint: "Select Point",
    selectWaste: "Select Waste Type",
    amount: "Payment Amount (so'm)",
    sendPayment: "Send Payment",
    ordersTitle: "Orders & Payments",
    received: "Received",
    pending: "Pending",
  },
};

const FactoryDashboard = () => {
  const { user, logout, updateBalance } = useAuth();
  const [transfer, setTransfer] = useState({
    pointId: "",
    amount: "",
    wasteType: "",
  });
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("uz");
  const t = translations[language as "uz" | "ru" | "en"];

  useEffect(() => {
    const savedUsername = localStorage.getItem("ecochain-username");
    if (savedUsername) setUsername(savedUsername);
    const savedLang = localStorage.getItem("ecochain-lang");
    if (savedLang) setLanguage(savedLang);
  }, []);

  const navigate = useNavigate();

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(transfer.amount);
    if (!transfer.pointId || !amount) return;
    if (amount > (user?.balance || 0)) {
      toast({
        title: "Xatolik!",
        description: "Hisobda yetarli mablag' yo'q.",
        variant: "destructive",
      });
      return;
    }

    updateBalance(-amount);
    toast({
      title: t.sendPayment + "!",
      description: `${amount.toLocaleString()} so'm qabul punktiga yuborildi.`,
    });

    setTransfer({ pointId: "", amount: "", wasteType: "" });
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("ecochain-lang", lang);
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
              <h1 className="text-2xl font-bold text-eco-dark">{t.dashboard}</h1>
              <p className="text-muted-foreground">
                {t.welcome}, {username}!
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[120px]">
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

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-16 mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium opacity-90">
                  {t.accepted}
                </h3>
                <p className="text-2xl font-bold mt-1">470.8 kg</p>
              </div>
              <Package className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium opacity-90">
                  {t.recycled}
                </h3>
                <p className="text-2xl font-bold mt-1">447.0 kg</p>
              </div>
              <Factory className="w-8 h-8 opacity-80" />
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium opacity-90">
                  {t.dailyProfit}
                </h3>
                <p className="text-2xl font-bold mt-1">1,245,000 so'm</p>
              </div>
              <TrendingUp className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>

        {/* Balance + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white p-6 rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black">
                <Wallet className="h-5 w-5 text-black" />
                {t.balance}
              </CardTitle>
              <CardDescription>{t.currentBalance}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-4">
                53 546 000 so'm
              </div>
              <div className="space-y-3 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span>{t.purchasedThisMonth}: 2,850 kg</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>{t.totalSpent}: 2,450,000 so'm</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transfer Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                {t.transferTitle}
              </CardTitle>
              <CardDescription>{t.transferDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTransfer} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Punkt</Label>
                    <Select
                      value={transfer.pointId}
                      onValueChange={(val) =>
                        setTransfer((prev) => ({ ...prev, pointId: val }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t.selectPoint} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="point1">Toshkent #1</SelectItem>
                        <SelectItem value="point2">Toshkent #2</SelectItem>
                        <SelectItem value="point3">Toshkent #3</SelectItem>
                        <SelectItem value="point4">Samarqand #1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Chiqindi turi</Label>
                    <Select
                      value={transfer.wasteType}
                      onValueChange={(val) =>
                        setTransfer((prev) => ({ ...prev, wasteType: val }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t.selectWaste} />
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

                <div>
                  <Label>{t.amount}</Label>
                  <Input
                    type="number"
                    value={transfer.amount}
                    onChange={(e) =>
                      setTransfer((prev) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }
                    min={1000}
                    placeholder="1000"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!transfer.pointId || !transfer.amount}
                >
                  <Send className="h-4 w-4 mr-2" />
                  {t.sendPayment}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Orders */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{t.ordersTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  date: "2024-01-15",
                  point: "Toshkent #1",
                  type: "Plastik",
                  weight: "150 kg",
                  amount: "-225,000 so'm",
                  status: "Qabul qilindi",
                },
              ].map((order, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium">
                        {order.point} - {order.type}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.date} - {order.weight}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "Qabul qilindi"
                          ? "bg-success/10 text-success"
                          : "bg-yellow-500/10 text-yellow-600"
                      }`}
                    >
                      {order.status === "Qabul qilindi"
                        ? t.received
                        : t.pending}
                    </span>
                  </div>
                  <span className="font-semibold text-destructive">
                    {order.amount}
                  </span>
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
