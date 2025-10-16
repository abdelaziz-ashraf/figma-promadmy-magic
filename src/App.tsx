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
import Accreditations from "./pages/Accreditations";
import Services from "./pages/Services";
import AddServices from "./pages/AddServices";
import EditServices from "./pages/EditServices";
import FAQs from "./pages/FAQs";
import AddFAQ from "./pages/AddFAQ";
import EditFAQ from "./pages/EditFAQ";
import Testimonials from "./pages/Testimonials";
import ContactRequests from "./pages/ContactRequests";
import EmailRequests from "./pages/EmailRequests";
import AcademyInfo from "./pages/AcademyInfo";
import FreeVideos from "./pages/FreeVideos";
import AddFreeVideo from "./pages/AddFreeVideo";
import EditFreeVideo from "./pages/EditFreeVideo";
import Gallery from "./pages/Gallery";
import AddGallery from "./pages/AddGallery";
import EditGallery from "./pages/EditGallery";
import FreeArticles from "./pages/FreeArticles";
import AddFreeArticle from "./pages/AddFreeArticle";
import EditFreeArticle from "./pages/EditFreeArticle";
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
          <Route path="/accreditations" element={<Accreditations />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/add" element={<AddServices />} />
          <Route path="/services/edit/:id" element={<EditServices />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/faqs/add" element={<AddFAQ />} />
          <Route path="/faqs/edit/:id" element={<EditFAQ />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact-requests" element={<ContactRequests />} />
          <Route path="/email-requests" element={<EmailRequests />} />
          <Route path="/academy-info" element={<AcademyInfo />} />
          <Route path="/free-videos" element={<FreeVideos />} />
          <Route path="/free-videos/add" element={<AddFreeVideo />} />
          <Route path="/free-videos/edit/:id" element={<EditFreeVideo />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/add" element={<AddGallery />} />
          <Route path="/gallery/edit/:id" element={<EditGallery />} />
          <Route path="/free-articles" element={<FreeArticles />} />
          <Route path="/free-articles/add" element={<AddFreeArticle />} />
          <Route path="/free-articles/edit/:id" element={<EditFreeArticle />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
