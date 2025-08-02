import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  ScanBarcodeIcon,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const CollectionPointDashboard = () => {
  const { user, logout } = useAuth();
  const [qrCode, setQrCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState<"uz" | "ru" | "en">("uz");
  const [scannedUser, setScannedUser] = useState<null | {
    id: string;
    fullName: string;
    phone: string;
    balance: number;
  }>(null);
  const [materialType, setMaterialType] = useState("");
  const [weight, setWeight] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [collections, setCollections] = useState<
    Array<{
      time: string;
      type: string;
      weight: string;
      amount: string;
    }>
  >([]);
  const [userLocation, setUserLocation] = useState<string>("");
  const [pointBalance, setPointBalance] = useState<number>(10500000);
  const [totalWeight, setTotalWeight] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("ecochain-username");
    if (savedUsername) setUsername(savedUsername);

    const savedLang = localStorage.getItem("ecochain-lang") as
      | "uz"
      | "ru"
      | "en";
    if (savedLang) setLanguage(savedLang);

    const savedCollections = localStorage.getItem("ecochain-collections");
    if (savedCollections) setCollections(JSON.parse(savedCollections));

    const savedBalance = localStorage.getItem("ecochain-balance");
    if (savedBalance) setPointBalance(parseInt(savedBalance));

    const savedWeight = localStorage.getItem("ecochain-weight");
    if (savedWeight) setTotalWeight(parseFloat(savedWeight));
  }, []);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("ecochain-username");
        if (!token || !username) return;

        const response = await fetch("http://192.168.137.1:3000/api/allusers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        const foundUser = result?.users?.find((u: any) => u.login === username);
        if (foundUser?.location) setUserLocation(foundUser.location);
      } catch (error) {
        console.error("Failed to fetch user location:", error);
      }
    };
    fetchUserLocation();
  }, []);

  useEffect(() => {
    localStorage.setItem("ecochain-lang", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("ecochain-collections", JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem("ecochain-balance", pointBalance.toString());
  }, [pointBalance]);

  useEffect(() => {
    localStorage.setItem("ecochain-weight", totalWeight.toString());
  }, [totalWeight]);

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
      scanTitle: "Foydalanuvchi qidirish",
      scanDesc:
        "Chiqindi qabul qilish uchun Foydalanuvchi qidiring yoki QR kodni skanerlang",
      scanBtn: "Foydalanuvchi topish",
      scanning: "Qidiryapti...",
      recent: "So'nggi qabul qilishlar",
      materialTypes: {
        plastik: "Plastik (idish, paketlar)",
        metall: "Metall",
        shisha: "Shisha idishlar",
        qogoz: "Qog'oz",
      },
    },
    ru: {
      dashboard: "Панель Пункта Приёма",
      welcome: "Добро пожаловать",
      logout: "Выйти",
      balance: "Ваш баланс",
      currentBalance: "Текущий баланс",
      receivedToday: "Принято сегодня",
      receivedMonth: "За этот месяц",
      location: "Местоположение",
      hours: "Часы работы: 08:00 - 20:00",
      scanTitle: "Поиск пользователя",
      scanDesc:
        "Для приёма отходов найдите пользователя или отсканируйте QR-код",
      scanBtn: "Найти пользователя",
      scanning: "Поиск...",
      recent: "Последние приёмы",
      materialTypes: {
        plastik: "Пластик (бутылки, пакеты)",
        metall: "Металл",
        shisha: "Стеклянные бутылки",
        qogoz: "Бумага",
      },
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
      scanTitle: "Search User",
      scanDesc: "Search for a user or scan a QR code to receive waste",
      scanBtn: "Find User",
      scanning: "Searching...",
      recent: "Recent Receivings",
      materialTypes: {
        plastik: "Plastic (bottles, bags)",
        metall: "Metal",
        shisha: "Glass bottles",
        qogoz: "Paper",
      },
    },
  }[language];

  const isCountBased = materialType === "shisha";
  const pricePerUnit = isCountBased ? 500 : 2000;
  const total = (isCountBased ? count : weight) * pricePerUnit;

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-light to-eco-secondary/10">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-primary/10">
              <Recycle className="h-6 w-6 text-primary" />
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
          <div className="flex gap-3">
            <Select
              value={language}
              onValueChange={(val) => setLanguage(val as any)}
            >
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
              {t.logout} <LogOut />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  {pointBalance.toLocaleString()} so'm
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="h-4 w-4" />
                    <span>
                      {t.receivedToday}: {totalWeight}{" "}
                      {isCountBased ? "dona" : "kg"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span>
                      {t.receivedMonth}: {totalWeight}{" "}
                      {isCountBased ? "dona" : "kg"}
                    </span>
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
                {/* <p className="text-lg font-medium">{user?.location}</p> */}
                <p className="text-lg font-medium">{userLocation || "—"}</p>
                <p className="text-muted-foreground mt-2">{t.hours}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="h-5 w-5 text-primary" />
                {t.scanTitle}
              </CardTitle>
              <CardDescription>{t.scanDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsScanning(true);
                  setTimeout(() => {
                    setScannedUser({
                      id: "123456",
                      fullName: "Alisher Kasymov",
                      phone: "+998 90 123 45 67",
                      balance: 12500,
                    });
                    setIsScanning(false);
                  }, 1000);
                }}
                className="space-y-4"
              >
                <div className="relative">
                  <Input
                    type="text"
                    value={qrCode}
                    onChange={(e) => setQrCode(e.target.value)}
                    placeholder="Foydalanuvchi QRcode / ID orqali qidirish"
                    disabled={isScanning}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-primary"
                    onClick={() => {
                      // сюда позже добавим вызов камеры
                    }}
                  >
                    <ScanBarcodeIcon className="h-4 w-4" />
                  </button>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!qrCode || isScanning}
                >
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

              {scannedUser && (
                <div className="mt-6 space-y-4">
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle>👤 {scannedUser.fullName}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p>
                        <strong>ID:</strong> {scannedUser.id}
                      </p>
                      <p>
                        <strong>📱:</strong> {scannedUser.phone}
                      </p>
                      <p>
                        <strong>💰 Баланс:</strong> {scannedUser.balance} so'm
                      </p>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select onValueChange={setMaterialType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chiqindi turini tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plastik">
                          Plastik (idish, paketlar)
                        </SelectItem>
                        <SelectItem value="metall">Metall</SelectItem>
                        <SelectItem value="shisha">Shisha idishlar</SelectItem>
                        <SelectItem value="qogoz">Qog'oz</SelectItem>
                      </SelectContent>
                    </Select>

                    {isCountBased ? (
                      <Input
                        type="number"
                        placeholder="Soni (dona)"
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value))}
                      />
                    ) : (
                      <Input
                        type="number"
                        placeholder="Massasi (kg)"
                        value={weight}
                        onChange={(e) => setWeight(parseFloat(e.target.value))}
                      />
                    )}
                  </div>

                  <div className="text-right text-sm text-muted-foreground">
                    Narx: {pricePerUnit} so'm/{isCountBased ? "dona" : "kg"} ×{" "}
                    {isCountBased ? count : weight} ={" "}
                    <strong>{total} so'm</strong>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => {
                      const transactionWeight = isCountBased ? count : weight;
                      const newCollection = {
                        time: getCurrentTime(),
                        type: t.materialTypes[materialType] || materialType,
                        weight: isCountBased ? `${count} dona` : `${weight} kg`,
                        amount: `-${total.toLocaleString()} so'm`,
                      };

                      // Обновляем список коллекций
                      setCollections(
                        [newCollection, ...collections].slice(0, 10)
                      );

                      // Уменьшаем баланс пункта
                      setPointBalance((prev) => prev - total);

                      // Обновляем общий вес
                      setTotalWeight((prev) => prev + transactionWeight);

                      // Показываем уведомление
                      toast({
                        title: "✅ To'lov amalga oshirildi",
                        description: `${total} so'm ${scannedUser?.fullName} ga o'tkazildi.`,
                      });

                      // Сброс
                      setScannedUser(null);
                      setQrCode("");
                      setWeight(0);
                      setCount(0);
                      setMaterialType("");
                    }}
                  >
                    To'lovni amalga oshirish
                  </Button>
                </div>
              )}
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
              {collections.map((collection, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-3 rounded-lg bg-muted/50"
                >
                  <div>
                    <p className="font-medium">{collection.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {collection.time} - {collection.weight}
                    </p>
                  </div>
                  <span className="font-semibold text-success">
                    {collection.amount}
                  </span>
                </div>
              ))}
              {collections.length === 0 && (
                <p className="text-center text-muted-foreground">
                  Hozircha qabul qilishlar yo'q
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CollectionPointDashboard;
