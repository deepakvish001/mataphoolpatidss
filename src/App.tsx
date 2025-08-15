import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthGuard from "@/components/AuthGuard";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Donation from "./pages/Donation";
import Partners from "./pages/Partners";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Unauthorized from "./pages/Unauthorized";
import RashtriyaGramSwarajAbhiyan from "./pages/RashtriyaGramSwarajAbhiyan";
import NSQF from "./pages/NSQF";
import AAIOE from "./pages/AAIOE";
import EntrepreneurshipDevelopment from "./pages/EntrepreneurshipDevelopment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

// Separate component to handle conditional navigation
const AppContent = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Routes>
        {/* Public routes with navigation */}
        <Route path="/" element={<LayoutWithNavigation><Index /></LayoutWithNavigation>} />
        <Route path="/about" element={<LayoutWithNavigation><About /></LayoutWithNavigation>} />
        <Route path="/contact" element={<LayoutWithNavigation><ContactUs /></LayoutWithNavigation>} />
        <Route path="/donation" element={<LayoutWithNavigation><Donation /></LayoutWithNavigation>} />
        <Route path="/partners" element={<LayoutWithNavigation><Partners /></LayoutWithNavigation>} />
        <Route path="/rashtiya-gram-swaraj-abhiyan" element={<LayoutWithNavigation><RashtriyaGramSwarajAbhiyan /></LayoutWithNavigation>} />
        <Route path="/nsqf" element={<LayoutWithNavigation><NSQF /></LayoutWithNavigation>} />
        <Route path="/aaioe" element={<LayoutWithNavigation><AAIOE /></LayoutWithNavigation>} />
        <Route path="/entrepreneurship-development" element={<LayoutWithNavigation><EntrepreneurshipDevelopment /></LayoutWithNavigation>} />
        
        {/* Auth routes without navigation */}
        <Route 
          path="/login" 
          element={
            <AuthGuard requireAuth={false}>
              <Login />
            </AuthGuard>
          } 
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Admin routes without navigation */}
        <Route 
          path="/admin/*" 
          element={
            <AuthGuard requireAuth={true} requireRole="admin">
              <Admin />
            </AuthGuard>
          } 
        />
        
        {/* 404 with navigation */}
        <Route path="*" element={<LayoutWithNavigation><NotFound /></LayoutWithNavigation>} />
      </Routes>
    </div>
  );
};

// Layout wrapper for pages that need navigation
const LayoutWithNavigation = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default App;