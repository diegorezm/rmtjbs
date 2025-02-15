import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '~/lib/axios';
import type { Page } from '../types';
import type { JobPosting, JobPostingDTO, UpdateJobPostingDTO } from './types';
import qs from "qs"

export const useJobPostsQuery = (params: {
  page?: number;
  q?: string;
}) => {
  return useQuery<Page<JobPosting>, Error>(
    ['jobPosts', params],
    async () => {
      const response = await api.get('/job-posts', {
        params: {
          page: params.page || 1,
          q: params.q,
        },
      });
      return response.data;
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useRecommendedJobPostsQuery = (params: {
  page?: number;
  q?: string;
  preferences: string[];
}) => {
  return useQuery<Page<JobPosting>, Error>(
    ['jobRecommendedPosts', params],
    async () => {
      const response = await api.get('/job-posts/recommended', {
        params: {
          page: params.page || 1,
          q: params.q,
          preferences: params.preferences
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
      });
      return response.data;
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useJobPostQuery = (id: string) => {
  return useQuery<JobPosting, Error>(
    ['jobPost', id],
    async () => {
      const response = await api.get(`/job-posts/${id}`);
      return response.data;
    },
    {
      enabled: !!id,
    }
  );
};

export const useSaveJobPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<null, Error, JobPostingDTO>(
    async (data) => {
      await api.post('/job-posts', data);
      return null
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['jobPosts']);
      },
    }
  );
};

export const useUpdateJobPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<null, Error, UpdateJobPostingDTO>(
    async ({ id, data }) => {
      await api.put(`/job-posts/${id}`, data);
      return null
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['jobPosts']);
        queryClient.invalidateQueries(['jobPost']);
      },
    }
  );
};
