import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "~/lib/axios";
import type { JobApplication, JobApplicationResponseDTO, JobApplicationStatus } from "./types";

export const useApplyToJobMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { jobId: string }>(
    async ({ jobId }) => {
      await api.post(`/job-application/apply/${jobId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["candidateApplications"]);
        queryClient.invalidateQueries(["jobApplications"]);
        queryClient.invalidateQueries(["currentUser"]);
      },
    }
  );
};


export const useUpdateApplicationStatusMutation = () => {
  const queryClient = useQueryClient()
  return useMutation<void, Error, { applicationId: string, status: JobApplicationStatus }>(
    async ({ applicationId, status }) => {
      await api.put(`/job-application/application/${applicationId}`, {
        status
      });
    },
    {
      onSuccess: (_, params) => {
        queryClient.invalidateQueries(["jobApplications"])
        queryClient.invalidateQueries([params.applicationId])
      }
    }
  );
};

export const useCandidateApplicationsQuery = () =>
  useQuery<JobApplication[], Error>(
    ["candidateApplications"],
    async () => {
      const { data } = await api.get("/job-application/candidate");
      return data;
    },
    {
      staleTime: 1000 * 60 * 5,
    }
  );

export const useApplicantsByJobQuery = (jobId: string) =>
  useQuery<JobApplicationResponseDTO[], Error>(
    ["jobApplications", jobId],
    async () => {
      const { data } = await api.get(`/job-application/job/${jobId}`);
      return data;
    },
    {
      enabled: !!jobId,
      staleTime: 1000 * 60 * 5,
    }
  );
