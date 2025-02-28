import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/axios';
import type { LoginDTO, LoginResponseDTO, RegisterCandidateDTO, RegisterCompanyDTO, User } from './types';

import { AUTH_TOKEN_KEY } from './constants';

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  return useMutation<LoginResponseDTO, Error, LoginDTO>(async (data: LoginDTO) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
    {
      onSuccess: (data) => {
        localStorage.setItem(AUTH_TOKEN_KEY, data.tokenDTO.token)
        localStorage.setItem(AUTH_TOKEN_KEY + "-exp", data.tokenDTO.token)
        queryClient.invalidateQueries(["currentUser"])
      }
    }
  );
}

export const logoutFn = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(AUTH_TOKEN_KEY + "-exp")
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  return () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_TOKEN_KEY + "-exp")
    queryClient.invalidateQueries(["currentUser"])
  }
}

export const useRegisterCompanyMutation = () =>
  useMutation<null, Error, RegisterCompanyDTO>(async (data) => {
    await api.post('/auth/register/company', data);
    return null
  });

export const useRegisterCandidateMutation = () =>
  useMutation<null, Error, RegisterCandidateDTO>(async (data) => {
    await api.post('/auth/register/candidate', data);
    return null
  });


export const useFetchCurrentUser = () =>
  useQuery<User, Error>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await api.get('/auth/me');
      return response.data;
    }
  })

