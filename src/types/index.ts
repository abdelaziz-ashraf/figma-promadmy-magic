// Types for PMA Academy Frontend

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string;
  bio?: string;
  avatar?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Instructor {
  id: number;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  specialization?: string;
  experience_years?: number;
  avatar?: string;
  social_links?: Record<string, string>;
  is_active: boolean;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: number;
  title: string;
  description?: string;
  content?: string;
  price: number;
  duration?: string;
  level?: string;
  image?: string;
  video_url?: string;
  is_published: boolean;
  category_id?: number;
  instructor_id?: number;
  user_id?: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  name: string;
  description?: string;
  price: number;
  icon?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position?: string;
  company?: string;
  content: string;
  rating: number;
  avatar?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactRequest {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status?: string;
  created_at: string;
  updated_at: string;
}

export interface EmailRequest {
  id: number;
  email: string;
  status?: string;
  created_at: string;
  updated_at: string;
}

export interface FreeVideo {
  id: number;
  title: string;
  description?: string;
  video_url?: string;
  thumbnail?: string;
  duration?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FreeArticle {
  id: number;
  title: string;
  content?: string;
  excerpt?: string;
  image?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Gallery {
  id: number;
  title: string;
  description?: string;
  image?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Accreditation {
  id: number;
  name: string;
  description?: string;
  image?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  user?: User;
  token?: string;
}

// Form Data Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface CategoryFormData {
  name: string;
  description?: string;
  icon?: string;
  is_active?: boolean;
}

export interface InstructorFormData {
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  specialization?: string;
  experience_years?: number;
  avatar?: string;
  social_links?: Record<string, string>;
  is_active?: boolean;
  user_id?: number;
}

export interface CourseFormData {
  title: string;
  description?: string;
  content?: string;
  price: number;
  duration?: string;
  level?: string;
  image?: string;
  video_url?: string;
  is_published?: boolean;
  category_id?: number;
  instructor_id?: number;
  user_id?: number;
}
