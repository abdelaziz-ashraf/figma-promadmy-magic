import {
  User,
  Category,
  Instructor,
  Course,
  Service,
  FAQ,
  Testimonial,
  ContactRequest,
  EmailRequest,
  FreeVideo,
  FreeArticle,
  Gallery,
  Accreditation,
  ApiResponse,
} from '@/types';

const API_BASE_URL = 'http://localhost:8000/api';

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('token');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.token) {
      this.token = response.token;
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  }

  async logout() {
    const response = await this.request('/logout', {
      method: 'POST',
    });

    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    return response;
  }

  async getMe() {
    return this.request('/me');
  }

  // Categories
  async getCategories() {
    return this.request('/categories');
  }

  async getCategory(id: string) {
    return this.request(`/categories/${id}`);
  }

  async createCategory(data: Partial<Category>) {
    return this.request('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCategory(id: string, data: Partial<Category>) {
    return this.request(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(id: string) {
    return this.request(`/categories/${id}`, {
      method: 'DELETE',
    });
  }

  // Instructors
  async getInstructors() {
    return this.request('/instructors');
  }

  async getInstructor(id: string) {
    return this.request(`/instructors/${id}`);
  }

  async createInstructor(data: Partial<Instructor>) {
    return this.request('/instructors', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateInstructor(id: string, data: Partial<Instructor>) {
    return this.request(`/instructors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteInstructor(id: string) {
    return this.request(`/instructors/${id}`, {
      method: 'DELETE',
    });
  }

  // Courses
  async getCourses() {
    return this.request('/courses');
  }

  async getCourse(id: string) {
    return this.request(`/courses/${id}`);
  }

  async createCourse(data: Partial<Course>) {
    return this.request('/courses', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCourse(id: string, data: Partial<Course>) {
    return this.request(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCourse(id: string) {
    return this.request(`/courses/${id}`, {
      method: 'DELETE',
    });
  }

  // Services
  async getServices() {
    return this.request('/services');
  }

  async getService(id: string) {
    return this.request(`/services/${id}`);
  }

  async createService(data: Partial<Service>) {
    return this.request('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(id: string, data: Partial<Service>) {
    return this.request(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteService(id: string) {
    return this.request(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  // FAQs
  async getFAQs() {
    return this.request('/faqs');
  }

  async getFAQ(id: string) {
    return this.request(`/faqs/${id}`);
  }

  async createFAQ(data: Partial<FAQ>) {
    return this.request('/faqs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateFAQ(id: string, data: Partial<FAQ>) {
    return this.request(`/faqs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteFAQ(id: string) {
    return this.request(`/faqs/${id}`, {
      method: 'DELETE',
    });
  }

  // Testimonials
  async getTestimonials() {
    return this.request('/testimonials');
  }

  async getTestimonial(id: string) {
    return this.request(`/testimonials/${id}`);
  }

  async createTestimonial(data: Partial<Testimonial>) {
    return this.request('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTestimonial(id: string, data: Partial<Testimonial>) {
    return this.request(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTestimonial(id: string) {
    return this.request(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact Requests
  async getContactRequests() {
    return this.request('/contact-requests');
  }

  async getContactRequest(id: string) {
    return this.request(`/contact-requests/${id}`);
  }

  async createContactRequest(data: Partial<ContactRequest>) {
    return this.request('/contact-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateContactRequest(id: string, data: Partial<ContactRequest>) {
    return this.request(`/contact-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteContactRequest(id: string) {
    return this.request(`/contact-requests/${id}`, {
      method: 'DELETE',
    });
  }

  // Email Requests
  async getEmailRequests() {
    return this.request('/email-requests');
  }

  async getEmailRequest(id: string) {
    return this.request(`/email-requests/${id}`);
  }

  async createEmailRequest(data: Partial<EmailRequest>) {
    return this.request('/email-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateEmailRequest(id: string, data: Partial<EmailRequest>) {
    return this.request(`/email-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteEmailRequest(id: string) {
    return this.request(`/email-requests/${id}`, {
      method: 'DELETE',
    });
  }

  // Free Videos
  async getFreeVideos() {
    return this.request('/free-videos');
  }

  async getFreeVideo(id: string) {
    return this.request(`/free-videos/${id}`);
  }

  async createFreeVideo(data: Partial<FreeVideo>) {
    return this.request('/free-videos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateFreeVideo(id: string, data: Partial<FreeVideo>) {
    return this.request(`/free-videos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteFreeVideo(id: string) {
    return this.request(`/free-videos/${id}`, {
      method: 'DELETE',
    });
  }

  // Free Articles
  async getFreeArticles() {
    return this.request('/free-articles');
  }

  async getFreeArticle(id: string) {
    return this.request(`/free-articles/${id}`);
  }

  async createFreeArticle(data: Partial<FreeArticle>) {
    return this.request('/free-articles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateFreeArticle(id: string, data: Partial<FreeArticle>) {
    return this.request(`/free-articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteFreeArticle(id: string) {
    return this.request(`/free-articles/${id}`, {
      method: 'DELETE',
    });
  }

  // Gallery
  async getGallery() {
    return this.request('/gallery');
  }

  async getGalleryItem(id: string) {
    return this.request(`/gallery/${id}`);
  }

  async createGalleryItem(data: Partial<Gallery>) {
    return this.request('/gallery', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateGalleryItem(id: string, data: Partial<Gallery>) {
    return this.request(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteGalleryItem(id: string) {
    return this.request(`/gallery/${id}`, {
      method: 'DELETE',
    });
  }

  // Accreditations
  async getAccreditations() {
    return this.request('/accreditations');
  }

  async getAccreditation(id: string) {
    return this.request(`/accreditations/${id}`);
  }

  async createAccreditation(data: Partial<Accreditation>) {
    return this.request('/accreditations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAccreditation(id: string, data: Partial<Accreditation>) {
    return this.request(`/accreditations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteAccreditation(id: string) {
    return this.request(`/accreditations/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService(API_BASE_URL);
export default apiService;
