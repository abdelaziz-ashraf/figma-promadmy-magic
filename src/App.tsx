import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./pages/Login";
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
import Students from "./pages/admin/Students";
import Coupons from "./pages/admin/Coupons";
import AddCoupon from "./pages/admin/AddCoupon";
import EditCoupon from "./pages/admin/EditCoupon";
import Certificates from "./pages/admin/Certificates";
import Payment from "./pages/admin/Payment";
import NotFound from "./pages/NotFound";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorCourses from "./pages/instructor/InstructorCourses";
import AddInstructorCourse from "./pages/instructor/AddInstructorCourse";
import CourseDetails from "./pages/instructor/CourseDetails";
import InstructorProfile from "./pages/instructor/InstructorProfile";
import IncomingQuestions from "./pages/instructor/IncomingQuestions";
import QuestionDetails from "./pages/instructor/QuestionDetails";
import InstructorCertificates from "./pages/instructor/InstructorCertificates";
import InstructorPayment from "./pages/instructor/InstructorPayment";
import StudentDashboard from "./pages/student/StudentDashboard";
import MyCourses from "./pages/student/MyCourses";
import Wishlist from "./pages/student/Wishlist";
import SentQuestions from "./pages/student/SentQuestions";
import StudentPayment from "./pages/student/StudentPayment";
import StudentProfile from "./pages/student/StudentProfile";
import StudentQuestionDetails from "./pages/student/QuestionDetails";
import CoursePlayer from "./pages/student/CoursePlayer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin/" element={<Dashboard />} />
          {/* <Route path="/admin/" element={<ProtectedRoute requiredRole="admin"><Dashboard /></ProtectedRoute>} /> */}
          <Route path="/admin/instructor" element={<ProtectedRoute requiredRole="admin"><Instructor /></ProtectedRoute>} />
          <Route path="/admin/instructor/add" element={<ProtectedRoute requiredRole="admin"><AddInstructor /></ProtectedRoute>} />
          <Route path="/admin/instructor/edit/:id" element={<ProtectedRoute requiredRole="admin"><EditInstructor /></ProtectedRoute>} />
          <Route path="/admin/categorys" element={<ProtectedRoute requiredRole="admin"><Category /></ProtectedRoute>} />
          <Route path="/admin/categorys/add" element={<ProtectedRoute requiredRole="admin"><AddCategory /></ProtectedRoute>} />
          <Route path="/admin/categorys/edit/:id" element={<ProtectedRoute requiredRole="admin"><EditCategory /></ProtectedRoute>} />
          <Route path="/admin/courses" element={<ProtectedRoute requiredRole="admin"><Courses /></ProtectedRoute>} />
          <Route path="/admin/accreditations" element={<ProtectedRoute requiredRole="admin"><Accreditations /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute requiredRole="admin"><Services /></ProtectedRoute>} />
          <Route path="/admin/services/add" element={<ProtectedRoute requiredRole="admin"><AddServices /></ProtectedRoute>} />
          <Route path="/admin/services/edit/:id" element={<ProtectedRoute requiredRole="admin"><EditServices /></ProtectedRoute>} />
          <Route path="/admin/faqs" element={<ProtectedRoute requiredRole="admin"><FAQs /></ProtectedRoute>} />
          <Route path="/admin/faqs/add" element={<ProtectedRoute requiredRole="admin"><AddFAQ /></ProtectedRoute>} />
          <Route path="/admin/faqs/edit/:id" element={<ProtectedRoute requiredRole="admin"><EditFAQ /></ProtectedRoute>} />
          <Route path="/admin/testimonials" element={<ProtectedRoute requiredRole="admin"><Testimonials /></ProtectedRoute>} />
          <Route path="/admin/contact-requests" element={<ProtectedRoute requiredRole="admin"><ContactRequests /></ProtectedRoute>} />
          <Route path="/admin/email-requests" element={<ProtectedRoute requiredRole="admin"><EmailRequests /></ProtectedRoute>} />
          <Route path="/admin/academy-info" element={<ProtectedRoute requiredRole="admin"><AcademyInfo /></ProtectedRoute>} />
          <Route path="/admin/free-videos" element={<ProtectedRoute requiredRole="admin"><FreeVideos /></ProtectedRoute>} />
          <Route path="/admin/free-videos/add" element={<ProtectedRoute requiredRole="admin"><AddFreeVideo /></ProtectedRoute>} />
          <Route path="/admin/free-videos/edit/:id" element={<ProtectedRoute requiredRole="admin"><EditFreeVideo /></ProtectedRoute>} />
          <Route path="/admin/gallery" element={<ProtectedRoute requiredRole="admin"><Gallery /></ProtectedRoute>} />
          <Route path="/admin/gallery/add" element={<ProtectedRoute requiredRole="admin"><AddGallery /></ProtectedRoute>} />
          <Route path="/admin/gallery/edit/:id" element={<ProtectedRoute requiredRole="admin"><EditGallery /></ProtectedRoute>} />
           <Route path="/admin/free-articles" element={<ProtectedRoute requiredRole="admin"><FreeArticles /></ProtectedRoute>} />
           <Route path="/admin/free-articles/add" element={<ProtectedRoute requiredRole="admin"><AddFreeArticle /></ProtectedRoute>} />
           <Route path="/admin/free-articles/edit/:id" element={<ProtectedRoute requiredRole="admin"><EditFreeArticle /></ProtectedRoute>} />
           <Route path="/admin/students" element={<ProtectedRoute requiredRole="admin"><Students /></ProtectedRoute>} />
           <Route path="/admin/coupons" element={<ProtectedRoute requiredRole="admin"><Coupons /></ProtectedRoute>} />
           <Route path="/admin/coupons/add" element={<ProtectedRoute requiredRole="admin"><AddCoupon /></ProtectedRoute>} />
           <Route path="/admin/coupons/edit/:id" element={<ProtectedRoute requiredRole="admin"><EditCoupon /></ProtectedRoute>} />
           <Route path="/admin/certificates" element={<ProtectedRoute requiredRole="admin"><Certificates /></ProtectedRoute>} />
           <Route path="/admin/payment" element={<ProtectedRoute requiredRole="admin"><Payment /></ProtectedRoute>} />
          
           {/* Instructor Routes */}
           <Route path="/instructor" element={<ProtectedRoute requiredRole="instructor"><InstructorDashboard /></ProtectedRoute>} />
           <Route path="/instructor/courses" element={<ProtectedRoute requiredRole="instructor"><InstructorCourses /></ProtectedRoute>} />
           <Route path="/instructor/courses/add" element={<ProtectedRoute requiredRole="instructor"><AddInstructorCourse /></ProtectedRoute>} />
           <Route path="/instructor/courses/:id" element={<ProtectedRoute requiredRole="instructor"><CourseDetails /></ProtectedRoute>} />
           <Route path="/instructor/incoming-questions" element={<ProtectedRoute requiredRole="instructor"><IncomingQuestions /></ProtectedRoute>} />
           <Route path="/instructor/question/:id" element={<ProtectedRoute requiredRole="instructor"><QuestionDetails /></ProtectedRoute>} />
           <Route path="/instructor/certificates" element={<ProtectedRoute requiredRole="instructor"><InstructorCertificates /></ProtectedRoute>} />
           <Route path="/instructor/payment" element={<ProtectedRoute requiredRole="instructor"><InstructorPayment /></ProtectedRoute>} />
           <Route path="/instructor/profile" element={<ProtectedRoute requiredRole="instructor"><InstructorProfile /></ProtectedRoute>} />
           
           {/* Student Routes */}
           <Route path="/student" element={<ProtectedRoute requiredRole="student"><StudentDashboard /></ProtectedRoute>} />
           <Route path="/student/courses" element={<ProtectedRoute requiredRole="student"><MyCourses /></ProtectedRoute>} />
           <Route path="/student/course/:id" element={<ProtectedRoute requiredRole="student"><CoursePlayer /></ProtectedRoute>} />
           <Route path="/student/wishlist" element={<ProtectedRoute requiredRole="student"><Wishlist /></ProtectedRoute>} />
           <Route path="/student/questions" element={<ProtectedRoute requiredRole="student"><SentQuestions /></ProtectedRoute>} />
           <Route path="/student/question/:id" element={<ProtectedRoute requiredRole="student"><StudentQuestionDetails /></ProtectedRoute>} />
           <Route path="/student/payment" element={<ProtectedRoute requiredRole="student"><StudentPayment /></ProtectedRoute>} />
           <Route path="/student/profile" element={<ProtectedRoute requiredRole="student"><StudentProfile /></ProtectedRoute>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
