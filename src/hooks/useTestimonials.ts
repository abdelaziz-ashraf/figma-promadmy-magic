import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import { Testimonial } from '@/types';

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: () => apiService.getTestimonials(),
  });
};

export const useTestimonial = (id: string) => {
  return useQuery({
    queryKey: ['testimonial', id],
    queryFn: () => apiService.getTestimonial(id),
    enabled: !!id,
  });
};

export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Testimonial>) => apiService.createTestimonial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Testimonial> }) => 
      apiService.updateTestimonial(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['testimonial', id] });
    },
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiService.deleteTestimonial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
    },
  });
};
