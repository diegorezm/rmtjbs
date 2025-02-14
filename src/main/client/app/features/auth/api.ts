import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '~/lib/axios';
import type { LoginDTO, LoginResponseDTO, RegisterCandidateDTO, RegisterCompanyDTO, UserSafe } from './types';
import { AUTH_TOKEN_KEY } from './constants';

export const useLoginMutation = () =>
  useMutation<LoginResponseDTO, Error, LoginDTO>(async (data: LoginDTO) => {
    const response = await api.post('/auth/login', data);
    console.log(response)
    return response.data;
  },
    {
      onSuccess: (data) => {
        localStorage.setItem(AUTH_TOKEN_KEY, data.tokenDTO.token)
        localStorage.setItem(AUTH_TOKEN_KEY + "-exp", data.tokenDTO.token)
      }
    }
  );

export const useLogoutMutation = () => {
  return () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(AUTH_TOKEN_KEY + "-exp")
  }
}

export const useRegisterCompanyMutation = () =>
  useMutation<null, Error, RegisterCompanyDTO>(async (data: RegisterCompanyDTO) => {
    await api.post('/auth/register/company', data);
    return null
  });

export const useRegisterCandidateMutation = () =>
  useMutation<null, Error, RegisterCandidateDTO>(async (data: RegisterCandidateDTO) => {
    await api.post('/auth/register/candidate', data);
    return null
  });

export const useFetchCurrentUser = () =>
  useQuery<UserSafe, Error>(['currentUser'], async () => {
    const response = await api.get('/auth/me');
    return response.data;
  });

