import { useState, useEffect, useCallback } from 'react';
import { Category, CategoryFormData, ApiResponse } from '../types';
import { categoryApiService } from '../services/categoryApiService';

interface PaginationData {
  current_page: number;
  data: Category[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface CategoryStats {
  total: number;
  active: number;
  inactive: number;
}

export const useCategories = (page = 1, perPage = 15, search = '') => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoryApiService.getCategories(page, perPage, search);
      if (response.success && response.data) {
        const paginationData = response.data as PaginationData;
        setCategories(paginationData.data || []);
        setPagination(paginationData);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [page, perPage, search]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    pagination,
    refetch: fetchCategories,
  };
};

export const useCategory = (id: number) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategory = useCallback(async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await categoryApiService.getCategory(id);
      if (response.success && response.data) {
        setCategory(response.data as Category);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return {
    category,
    loading,
    error,
    refetch: fetchCategory,
  };
};

export const useCategoryMutations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCategory = async (data: CategoryFormData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoryApiService.createCategory(data);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id: number, data: CategoryFormData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoryApiService.updateCategory(id, data);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoryApiService.deleteCategory(id);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleCategoryStatus = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoryApiService.toggleCategoryStatus(id);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryStatus,
    loading,
    error,
  };
};

export const useActiveCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActiveCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoryApiService.getActiveCategories();
      if (response.success && response.data) {
        setCategories(response.data as Category[]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveCategories();
  }, [fetchActiveCategories]);

  return {
    categories,
    loading,
    error,
    refetch: fetchActiveCategories,
  };
};

export const useCategoryStats = () => {
  const [stats, setStats] = useState<CategoryStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoryApiService.getCategoryStats();
      if (response.success && response.data) {
        setStats(response.data as CategoryStats);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  };
};