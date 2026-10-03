import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

// Lazy-load secondary pages to avoid bloat on the main animation entry point
const NotFound = lazy(() => import("./pages/NotFound"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Documentation = lazy(() => import("./pages/Documentation"));
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminRegister = lazy(() => import("./pages/admin/Register"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const ProjectForm = lazy(() => import("./pages/admin/ProjectForm"));
const AdminRoute = lazy(() => import("./components/AdminRoute"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground font-mono text-sm">
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-foreground animate-ping" />
      <span>Loading...</span>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/projects/new" element={<AdminRoute><ProjectForm /></AdminRoute>} />
            <Route path="/admin/projects/:id/edit" element={<AdminRoute><ProjectForm /></AdminRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
