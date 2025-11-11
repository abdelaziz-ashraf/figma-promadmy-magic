import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import { FreeVideo } from '@/types';

export const useFreeVideos = () => {
  return useQuery({
    queryKey: ['free-videos'],
    queryFn: () => apiService.getFreeVideos(),
  });
};

export const useFreeVideo = (id: string) => {
  return useQuery({
    queryKey: ['free-video', id],
    queryFn: () => apiService.getFreeVideo(id),
    enabled: !!id,
  });
};

export const useCreateFreeVideo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<FreeVideo>) => apiService.createFreeVideo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['free-videos'] });
    },
  });
};

export const useUpdateFreeVideo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<FreeVideo> }) => 
      apiService.updateFreeVideo(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['free-videos'] });
      queryClient.invalidateQueries({ queryKey: ['free-video', id] });
    },
  });
};

export const useDeleteFreeVideo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiService.deleteFreeVideo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['free-videos'] });
    },
  });
};
