import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import { FreeArticle } from '@/types';

export const useFreeArticles = () => {
  return useQuery({
    queryKey: ['free-articles'],
    queryFn: () => apiService.getFreeArticles(),
  });
};

export const useFreeArticle = (id: string) => {
  return useQuery({
    queryKey: ['free-article', id],
    queryFn: () => apiService.getFreeArticle(id),
    enabled: !!id,
  });
};

export const useCreateFreeArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<FreeArticle>) => apiService.createFreeArticle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['free-articles'] });
    },
  });
};

export const useUpdateFreeArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FreeArticle> }) => 
      apiService.updateFreeArticle(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['free-articles'] });
      queryClient.invalidateQueries({ queryKey: ['free-article', id] });
    },
  });
};

export const useDeleteFreeArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiService.deleteFreeArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['free-articles'] });
    },
  });
};
