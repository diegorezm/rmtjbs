import type { UserSafe } from "../auth/types";
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
  company: Company & {
    user: UserSafe
  }
}

export type JobPostingDTO = Omit<JobPosting, "createdAt" | "updatedAt" | "company" | "id">

export type UpdateJobPostingDTO = {
  data: JobPostingDTO,
  id: string
}
