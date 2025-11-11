import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import { Gallery } from '@/types';

export const useGallery = () => {
  return useQuery({
    queryKey: ['gallery'],
    queryFn: () => apiService.getGallery(),
  });
};

export const useGalleryItem = (id: string) => {
  return useQuery({
    queryKey: ['gallery-item', id],
    queryFn: () => apiService.getGalleryItem(id),
    enabled: !!id,
  });
};

export const useCreateGalleryItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Gallery>) => apiService.createGalleryItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
  });
};

export const useUpdateGalleryItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Gallery> }) => 
      apiService.updateGalleryItem(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      queryClient.invalidateQueries({ queryKey: ['gallery-item', id] });
    },
  });
};

export const useDeleteGalleryItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiService.deleteGalleryItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
  });
};
