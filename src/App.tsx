import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import About from "./pages/About";
import RashtriyaGramSwarajAbhiyan from "./pages/RashtriyaGramSwarajAbhiyan";
import NSQF from "./pages/NSQF";
import AAIOE from "./pages/AAIOE";
import EntrepreneurshipDevelopment from "./pages/EntrepreneurshipDevelopment";
import Partners from "./pages/Partners";
import ContactUs from "./pages/ContactUs";
import DonationPage from "./pages/Donation";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import UserDashboard from "./pages/UserDashboard";
import { UserLayout } from "./components/user/UserLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ErrorBoundary>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/rashtiya-gram-swaraj-abhiyan" element={<RashtriyaGramSwarajAbhiyan />} />
              <Route path="/nsqf" element={<NSQF />} />
              <Route path="/aaioe" element={<AAIOE />} />
              <Route path="/entrepreneurship-development" element={<EntrepreneurshipDevelopment />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/donation" element={<DonationPage />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/auth/reset-password" element={<ResetPassword />} />
              <Route 
                path="/admin/*" 
                element={
                  <AuthGuard requiredRole="admin">
                    <ErrorBoundary>
                      <Admin />
                    </ErrorBoundary>
                  </AuthGuard>
                } 
              />
              <Route 
                path="/user/*" 
                element={
                  <AuthGuard requiredRole="user">
                    <ErrorBoundary>
                      <UserLayout>
                        <Routes>
                          <Route index element={<UserDashboard />} />
                          <Route path="dashboard" element={<UserDashboard />} />
                          <Route path="profile" element={<UserProfile />} />
                        </Routes>
                      </UserLayout>
                    </ErrorBoundary>
                  </AuthGuard>
                } 
              />
              {/* Redirect auth route to login for consistency */}
              <Route path="/auth" element={<Navigate to="/login" replace />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ErrorBoundary>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
