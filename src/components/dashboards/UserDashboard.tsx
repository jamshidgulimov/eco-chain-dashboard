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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import {
  Wallet,
  Upload,
  Camera,
  MapPin,
  Leaf,
  Recycle,
  Award,
  LogOut,
} from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const UserDashboard = () => {
  const { logout } = useAuth();
  const [uploadData, setUploadData] = useState({
    description: "",
    location: "",
    image: null as File | null,
    video: null as File | null,
  });
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState<"uz" | "ru" | "en">("uz");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDate, setCardDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("ecochain-username");
    if (savedUsername) setUsername(savedUsername);

    const savedLang = localStorage.getItem("ecochain-lang") as
      | "uz"
      | "ru"
      | "en";
    if (savedLang) setLanguage(savedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem("ecochain-lang", language);
  }, [language]);

  const t = {
    uz: {
      dashboard: "Foydalanuvchi Dashboard",
      welcome: "Xush kelibsiz",
      logout: "Chiqish",
      balance: "Hisobingiz",
      currentBalance: "Joriy balans",
      points: "Eco Points",
      weight: "Yuborilgan chiqindilar",
      sendWaste: "Chiqindi yuborish",
      wasteDesc: "Chiqindi haqida ma'lumot va rasmlar yuboring",
      uploadImage: "Rasm yuklash",
      uploadVideo: "Video yuklash",
      location: "Joylashuv",
      send: "Pulni yechish",
      locationPlaceholder: "Chiqindi joylashgan manzilni kiriting",
      comment: "Izoh",
      commentPlaceholder: "Chiqindi haqida qo'shimcha ma'lumot...",
      submit: "Yuborish",
      recent: "So'nggi faoliyat",
      cardDate: "Amal qilish muddati (MM/YY)",
      mapLanguage: "Yig'indi punktlari xaritasi"
    },
    ru: {
      dashboard: "Панель пользователя",
      welcome: "Добро пожаловать",
      logout: "Выйти",
      balance: "Ваш баланс",
      currentBalance: "Текущий баланс",
      points: "Эко Баллы",
      weight: "Отправленные отходы",
      sendWaste: "Отправка отходов",
      wasteDesc: "Отправьте информацию и изображения об отходах",
      uploadImage: "Загрузить изображение",
      send: "Вывести средства",
      uploadVideo: "Загрузить видео",
      location: "Локация",
      locationPlaceholder: "Введите адрес отходов",
      comment: "Комментарий",
      commentPlaceholder: "Дополнительная информация об отходах...",
      submit: "Отправить",
      recent: "Последняя активность",
      cardDate: "Срок действия (ММ/ГГ)",
      mapLanguage: "Карта пунктов приёма"
    },
    en: {
      dashboard: "User Dashboard",
      welcome: "Welcome",
      logout: "Logout",
      balance: "Your Balance",
      currentBalance: "Current Balance",
      points: "Eco Points",
      weight: "Waste Sent",
      sendWaste: "Send Waste",
      send: "Send to Card",
      wasteDesc: "Send info and media about the waste",
      uploadImage: "Upload Image",
      uploadVideo: "Upload Video",
      location: "Location",
      locationPlaceholder: "Enter waste location",
      comment: "Comment",
      commentPlaceholder: "Additional information about waste...",
      submit: "Submit",
      recent: "Recent Activity",
      cardDate: "Validity period (MM/YY)",
      mapLanguage: "Map of collection points"
    },
  }[language];

  const handleFileUpload = (type: "image" | "video", file: File) => {
    setUploadData((prev) => ({ ...prev, [type]: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "✅",
      description: "Chiqindi yuborildi / Waste sent!",
    });

    setUploadData({
      description: "",
      location: "",
      image: null,
      video: null,
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
              <h1 className="text-2xl font-bold text-eco-dark">
                {t.dashboard}
              </h1>
              <p className="text-muted-foreground">
                {t.welcome}, {username}!
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2 w-30 sm:w-auto">
            <Select
              value={language}
              onValueChange={(val) => setLanguage(val as any)}
            >
              <SelectTrigger className="w-full sm:w-24 h-9 text-sm">
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
              className="w-full sm:w-auto"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              {t.logout}
              <LogOut className="ml-1 w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Balance Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-primary" />
                {t.balance}
              </CardTitle>
              <CardDescription>{t.currentBalance}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-4">
                248 000 so'm
              </div>
              <div className="space-y-3 mb-20">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Award className="h-4 w-4" />
                  <span>{t.points}: 150</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Recycle className="h-4 w-4" />
                  <span>{t.weight}: 12 kg</span>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full text-lg mt-20">{t.send}</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Kartaga pul yechish</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="cardNumber">
                        Karta raqami (16 raqam)
                      </Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(e.target.value.replace(/\D/g, ""))
                        }
                        maxLength={16}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="cardDate">{t.cardDate}</Label>
                      <Input
                        id="cardDate"
                        type="text"
                        inputMode="numeric"
                        placeholder="MM/YY"
                        className="w-28"
                        value={cardDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, "");

                          if (value.length >= 3) {
                            value = value.slice(0, 2) + "/" + value.slice(2, 4);
                          }

                          setCardDate(value);
                        }}
                        maxLength={5}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      onClick={() => {
                        if (!cardNumber || !cardDate) {
                          toast({
                            title: "⚠️",
                            description: "Ma'lumotlar to‘liq emas",
                          });
                          return;
                        }

                        toast({
                          title: "✅ So'rov yuborildi",
                          description: "Pul yechish so‘rovi qabul qilindi!",
                        });

                        setCardNumber("");
                        setCardDate("");
                      }}
                    >
                      Yuborish
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Upload Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                {t.sendWaste}
              </CardTitle>
              <CardDescription>{t.wasteDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image" className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      {t.uploadImage}
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload("image", file);
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video" className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      {t.uploadVideo}
                    </Label>
                    <Input
                      id="video"
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload("video", file);
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {t.location}
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    value={uploadData.location}
                    onChange={(e) =>
                      setUploadData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    placeholder={t.locationPlaceholder}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{t.comment}</Label>
                  <Textarea
                    id="description"
                    value={uploadData.description}
                    onChange={(e) =>
                      setUploadData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder={t.commentPlaceholder}
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full text-lg">
                  {t.submit}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{t.recent}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  date: "2024-01-15",
                  action: "Plastik chiqindi yuborildi",
                  amount: "+5,000 so'm",
                },
                {
                  date: "2024-01-12",
                  action: "Qog'oz chiqindi yuborildi",
                  amount: "+3,500 so'm",
                },
                {
                  date: "2024-01-10",
                  action: "Metal chiqindi yuborildi",
                  amount: "+8,000 so'm",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 rounded-lg bg-muted/50"
                >
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.date}
                    </p>
                  </div>
                  <span className="font-semibold text-success">
                    {activity.amount}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2 mt-6">
          <CardHeader>
            <CardTitle>{t.mapLanguage}</CardTitle>
          </CardHeader>
          <CardContent>
            <YMaps>
              <Map
                defaultState={{
                  center: [41.2995, 69.2401], // Ташкент
                  zoom: 11,
                }}
                width="100%"
                height="400px"
              >
                {/* Пример Placemark */}
                <Placemark geometry={[41.3055, 69.2461]} />
              </Map>
            </YMaps>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
