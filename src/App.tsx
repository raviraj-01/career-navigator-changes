import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { UserResumesProvider } from "./contexts/UserResumesContext";
import { DashboardLayout } from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import ChatPage from "./pages/ChatPage";
import ResumesPage from "./pages/ResumesPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ResumeBuilderSelectPage from "./pages/ResumeBuilderSelectPage";
import PricingPage from "./pages/PricingPage";
import ProfilePage from "./pages/ProfilePage";
import DownloadPage from "./pages/DownloadPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <UserResumesProvider>
          <Routes>
            {/* Public pages without dashboard layout */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/builder-select" element={<ResumeBuilderSelectPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/download" element={<DownloadPage />} />
            
            {/* Protected Dashboard pages with layout */}
            <Route element={<ProtectedRoute><DashboardLayout><Index /></DashboardLayout></ProtectedRoute>} path="/dashboard" />
            <Route element={<ProtectedRoute><DashboardLayout><ChatPage /></DashboardLayout></ProtectedRoute>} path="/chat" />
            <Route element={<ProtectedRoute><DashboardLayout><ResumesPage /></DashboardLayout></ProtectedRoute>} path="/resumes" />
            <Route element={<ProtectedRoute><DashboardLayout><SettingsPage /></DashboardLayout></ProtectedRoute>} path="/settings" />
            <Route element={<ProtectedRoute><DashboardLayout><ProfilePage /></DashboardLayout></ProtectedRoute>} path="/profile" />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </UserResumesProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
