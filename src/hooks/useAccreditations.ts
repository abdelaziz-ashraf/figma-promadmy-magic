import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import { Accreditation } from '@/types';

export const useAccreditations = () => {
  return useQuery({
    queryKey: ['accreditations'],
    queryFn: () => apiService.getAccreditations(),
  });
};

export const useAccreditation = (id: string) => {
  return useQuery({
    queryKey: ['accreditation', id],
    queryFn: () => apiService.getAccreditation(id),
    enabled: !!id,
  });
};

export const useCreateAccreditation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Accreditation>) => apiService.createAccreditation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accreditations'] });
    },
  });
};

export const useUpdateAccreditation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Accreditation> }) => 
      apiService.updateAccreditation(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['accreditations'] });
      queryClient.invalidateQueries({ queryKey: ['accreditation', id] });
    },
  });
};

export const useDeleteAccreditation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiService.deleteAccreditation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accreditations'] });
    },
  });
};
