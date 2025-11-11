import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import { Instructor } from '@/types';

export const useInstructors = () => {
  return useQuery({
    queryKey: ['instructors'],
    queryFn: () => apiService.getInstructors(),
  });
};

export const useInstructor = (id: string) => {
  return useQuery({
    queryKey: ['instructor', id],
    queryFn: () => apiService.getInstructor(id),
    enabled: !!id,
  });
};

export const useCreateInstructor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Instructor>) => apiService.createInstructor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructors'] });
    },
  });
};

export const useUpdateInstructor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Instructor> }) => 
      apiService.updateInstructor(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['instructors'] });
      queryClient.invalidateQueries({ queryKey: ['instructor', id] });
    },
  });
};

export const useDeleteInstructor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiService.deleteInstructor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructors'] });
    },
  });
};
