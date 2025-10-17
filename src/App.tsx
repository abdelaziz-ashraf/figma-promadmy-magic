import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Instructor from "./pages/admin/Instructor";
import AddInstructor from "./pages/admin/AddInstructor";
import EditInstructor from "./pages/admin/EditInstructor";
import Category from "./pages/admin/Category";
import AddCategory from "./pages/admin/AddCategory";
import EditCategory from "./pages/admin/EditCategory";
import Courses from "./pages/admin/Courses";
import Accreditations from "./pages/admin/Accreditations";
import Services from "./pages/admin/Services";
import AddServices from "./pages/admin/AddServices";
import EditServices from "./pages/admin/EditServices";
import FAQs from "./pages/admin/FAQs";
import AddFAQ from "./pages/admin/AddFAQ";
import EditFAQ from "./pages/admin/EditFAQ";
import Testimonials from "./pages/admin/Testimonials";
import ContactRequests from "./pages/admin/ContactRequests";
import EmailRequests from "./pages/admin/EmailRequests";
import AcademyInfo from "./pages/admin/AcademyInfo";
import FreeVideos from "./pages/admin/FreeVideos";
import AddFreeVideo from "./pages/admin/AddFreeVideo";
import EditFreeVideo from "./pages/admin/EditFreeVideo";
import Gallery from "./pages/admin/Gallery";
import AddGallery from "./pages/admin/AddGallery";
import EditGallery from "./pages/admin/EditGallery";
import FreeArticles from "./pages/admin/FreeArticles";
import AddFreeArticle from "./pages/admin/AddFreeArticle";
import EditFreeArticle from "./pages/admin/EditFreeArticle";
import NotFound from "./pages/NotFound";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorCourses from "./pages/instructor/InstructorCourses";
import AddInstructorCourse from "./pages/instructor/AddInstructorCourse";

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
          
          {/* Instructor Routes */}
          <Route path="/instructor" element={<InstructorDashboard />} />
          <Route path="/instructor/courses" element={<InstructorCourses />} />
          <Route path="/instructor/courses/add" element={<AddInstructorCourse />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
