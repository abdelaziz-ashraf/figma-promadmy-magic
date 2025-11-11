import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import { FAQ } from '@/types';

export const useFAQs = () => {
  return useQuery({
    queryKey: ['faqs'],
    queryFn: () => apiService.getFAQs(),
  });
};

export const useFAQ = (id: string) => {
  return useQuery({
    queryKey: ['faq', id],
    queryFn: () => apiService.getFAQ(id),
    enabled: !!id,
  });
};

export const useCreateFAQ = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<FAQ>) => apiService.createFAQ(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
  });
};

export const useUpdateFAQ = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FAQ> }) => 
      apiService.updateFAQ(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      queryClient.invalidateQueries({ queryKey: ['faq', id] });
    },
  });
};

export const useDeleteFAQ = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiService.deleteFAQ(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    },
  });
};
