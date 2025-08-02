import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Страницы
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Дашборды по ролям
import UserDashboard from "./components/dashboards/UserDashboard";
import CollectionPointDashboard from "./components/dashboards/CollectionPointDashboard";
import FactoryDashboard from "./components/dashboards/FactoryDashboard";

// Анимация падающих лепестков
import FallingLeaves from "./components/FallingLeaves";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Лепестки на фоне всех страниц */}
          <FallingLeaves count={35} />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/user" element={<UserDashboard />} />
            <Route path="/collection-point" element={<CollectionPointDashboard />} />
            <Route path="/factory" element={<FactoryDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
