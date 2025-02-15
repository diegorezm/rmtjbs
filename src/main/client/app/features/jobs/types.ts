import type { Company } from "../company/types";

export type JobPosting = {
  id: string;
  title: string;
  description: string;
  salary?: number;
  skills?: string[];
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  company: {
    id: string,
    name: string,
    email: string,
    location: string,
    logoKey?: string,
    bannerKey: string
  }
}

export type JobPostingDTO = Omit<JobPosting, "createdAt" | "updatedAt">

export type UpdateJobPostingDTO = {
  data: JobPostingDTO,
  id: string
}
