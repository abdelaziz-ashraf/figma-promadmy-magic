import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import { ContactRequest } from '@/types';

export const useContactRequests = () => {
  return useQuery({
    queryKey: ['contact-requests'],
    queryFn: () => apiService.getContactRequests(),
  });
};

export const useContactRequest = (id: string) => {
  return useQuery({
    queryKey: ['contact-request', id],
    queryFn: () => apiService.getContactRequest(id),
    enabled: !!id,
  });
};

export const useCreateContactRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<ContactRequest>) => apiService.createContactRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-requests'] });
    },
  });
};

export const useUpdateContactRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ContactRequest> }) => 
      apiService.updateContactRequest(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['contact-requests'] });
      queryClient.invalidateQueries({ queryKey: ['contact-request', id] });
    },
  });
};

export const useDeleteContactRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiService.deleteContactRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-requests'] });
    },
  });
};
