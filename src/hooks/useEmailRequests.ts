import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/lib/api';
import { EmailRequest } from '@/types';

export const useEmailRequests = () => {
  return useQuery({
    queryKey: ['email-requests'],
    queryFn: () => apiService.getEmailRequests(),
  });
};

export const useEmailRequest = (id: string) => {
  return useQuery({
    queryKey: ['email-request', id],
    queryFn: () => apiService.getEmailRequest(id),
    enabled: !!id,
  });
};

export const useCreateEmailRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<EmailRequest>) => apiService.createEmailRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-requests'] });
    },
  });
};

export const useUpdateEmailRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<EmailRequest> }) => 
      apiService.updateEmailRequest(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['email-requests'] });
      queryClient.invalidateQueries({ queryKey: ['email-request', id] });
    },
  });
};

export const useDeleteEmailRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiService.deleteEmailRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-requests'] });
    },
  });
};
