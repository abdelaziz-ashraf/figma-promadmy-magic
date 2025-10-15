import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Instructor from "./pages/Instructor";
import AddInstructor from "./pages/AddInstructor";
import EditInstructor from "./pages/EditInstructor";
import Category from "./pages/Category";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import Courses from "./pages/Courses";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/instructor/add" element={<AddInstructor />} />
          <Route path="/instructor/edit/:id" element={<EditInstructor />} />
          <Route path="/categorys" element={<Category />} />
          <Route path="/categorys/add" element={<AddCategory />} />
          <Route path="/categorys/edit/:id" element={<EditCategory />} />
          <Route path="/courses" element={<Courses />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
