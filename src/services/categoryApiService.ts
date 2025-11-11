import { Category, CategoryFormData, ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

class CategoryApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  async getCategories(page = 1, perPage = 15, search = ''): Promise<ApiResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
      ...(search && { search }),
    });

    const response = await fetch(`${API_BASE_URL}/admin/categories?${params}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async getCategory(id: number): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async createCategory(data: CategoryFormData): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/categories`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async updateCategory(id: number, data: CategoryFormData): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async deleteCategory(id: number): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async toggleCategoryStatus(id: number): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/categories/${id}/toggle-status`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async getActiveCategories(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/categories-active`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async getCategoryStats(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/categories-stats`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
}

export const categoryApiService = new CategoryApiService();
