import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Leaf, Recycle, Factory, EyeOff, Eye } from "lucide-react";
import axios from "axios";

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState<"user" | "collection-point" | "factory">(
    "user"
  );
  const [error, setError] = useState("");
  const [language, setLanguage] = useState<"uz" | "ru" | "en">("uz");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
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
      login: "Kirish",
      register: "Ro'yxatdan o'tish",
      username: "Foydalanuvchi nomi",
      password: "Parol",
      fullName: "To'liq ism",
      phone: "Telefon",
      address: "Manzil",
      company: "Kompaniya nomi",
      userType: "Foydalanuvchi turi",
      submit: isLogin ? "Kirish" : "Ro'yxatdan o'tish",
      demo: "Demo uchun: Har qanday email va parol bilan kirishingiz mumkin",
      error: "Iltimos, barcha majburiy maydonlarni to'ldiring",
      success: "Ro'yxatdan o'tish muvaffaqiyatli!",
    },
    ru: {
      login: "Вход",
      register: "Регистрация",
      username: "Имя пользователя",
      password: "Пароль",
      fullName: "Полное имя",
      phone: "Телефон",
      address: "Адрес",
      company: "Название компании",
      userType: "Тип пользователя",
      submit: isLogin ? "Войти" : "Зарегистрироваться",
      demo: "Для демонстрации: Введите любые email и пароль",
      error: "Пожалуйста, заполните все поля",
      success: "Регистрация прошла успешно!",
    },
    en: {
      login: "Login",
      register: "Register",
      username: "Username",
      password: "Password",
      fullName: "Full Name",
      phone: "Phone",
      address: "Address",
      company: "Company Name",
      userType: "User Role",
      submit: isLogin ? "Login" : "Register",
      demo: "Demo: You can log in with any email and password",
      error: "Please fill in all required fields",
      success: "Registration successful!",
    },
  }[language];

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  if (isLogin) {
    if (!email || !password) {
      setError(t.error);
      return;
    }

    try {
      const res = await axios.post("http://192.168.137.1:3000/api/login", {
        login: email,
        password,
      });

      const data = res.data;

      if (data.status === "ok" && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("ecochain-username", email);

        if (role === "user") navigate("/user");
        else if (role === "collection-point") navigate("/collection-point");
        else if (role === "factory") navigate("/factory");
      } else {
        setError(data.message || "Login yoki parol noto‘g‘ri");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Xatolik yuz berdi (API ulanmagan)");
    }

  } else {
    // РЕГИСТРАЦИЯ
    if (!email || !password || !fullName || !phone || !address) {
      setError(t.error);
      return;
    }

    try {
      const res = await axios.post("http://192.168.137.1:3000/api/register", {
        login: email,
        password,
        fullname: fullName,
        phone,
        location: address,
      });

      const data = res.data;

      if (data.status === "ok") {
        alert(t.success);
        setEmail("");
        setPassword("");
        setFullName("");
        setPhone("");
        setAddress("");
        setCompanyName("");
        setRole("user");
        setIsLogin(true); // Переключиться обратно на login после успешной регистрации
      } else {
        setError(data.message || "Ro‘yxatdan o‘tishda xatolik");
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      setError("Ro‘yxatdan o‘tishda xatolik (API ulanmagan)");
    }
  }
};


  const getRoleDescription = (roleType: string) => {
    const desc = {
      uz: {
        user: "Oddiy foydalanuvchi - chiqindi yuborish",
        "collection-point": "Chiqindi qabul qilish punkti",
        factory: "Zavod/Ishlab chiqaruvchi",
      },
      ru: {
        user: "Обычный пользователь - отправка отходов",
        "collection-point": "Пункт приёма отходов",
        factory: "Завод / Производитель",
      },
      en: {
        user: "Regular user - send waste",
        "collection-point": "Waste collection point",
        factory: "Factory / Manufacturer",
      },
    };
    return desc[language][roleType as keyof typeof desc.uz];
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-eco-light to-eco-secondary/20 p-4">
      <Card className="w-full max-w-md relative">
        {/* Language selector in top-right corner */}
        <div className="absolute top-3 right-3 z-10">
          <Select
            value={language}
            onValueChange={(val) => setLanguage(val as any)}
          >
            <SelectTrigger className="w-20 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uz">O'zbekcha</SelectItem>
              <SelectItem value="ru">Русский</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-eco-dark">
            EcoChain Dashboard
          </CardTitle>
          <CardDescription>Eco solution system</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-2 mb-4 border p-1 rounded-md">
            <Button
              type="button"
              onClick={() => setIsLogin(true)}
              className={
                isLogin ? "bg-primary text-white" : "bg-muted text-black"
              }
            >
              {t.login}
            </Button>
            <Button
              type="button"
              onClick={() => setIsLogin(false)}
              className={
                !isLogin ? "bg-primary text-white" : "bg-muted text-black"
              }
            >
              {t.register}
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>{t.userType}</Label>
              <Select
                value={role}
                onValueChange={(value) => setRole(value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">
                    {getRoleDescription("user")}
                  </SelectItem>
                  <SelectItem value="collection-point">
                    {getRoleDescription("collection-point")}
                  </SelectItem>
                  <SelectItem value="factory">
                    {getRoleDescription("factory")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">{t.fullName}</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">{t.username}</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10" // чтобы у иконки было место
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t.phone}</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">{t.address}</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                {(role === "collection-point" || role === "factory") && (
                  <div className="space-y-2">
                    <Label htmlFor="companyName">{t.company}</Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                )}
              </>
            )}

            {error && (
              <div className="text-destructive text-sm text-center">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full">
              {t.submit}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {t.demo}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
