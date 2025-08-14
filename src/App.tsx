import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          <Route path="/admin" element={<Admin />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
