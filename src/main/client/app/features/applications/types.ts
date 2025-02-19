import type { Candidate } from "../candidate/types"
import type { JobPosting } from "../jobs/types"

export type JobApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED"

export type JobApplication = {
  id: string,
  candidate: Candidate,
  jobPosting: JobPosting,
  appliedAt: string,
  status: JobApplicationStatus
}

export type JobApplicationResponseDTO = {
  id: string,
  candidate: Candidate,
  name: string,
  email: string,
  status: JobApplicationStatus
}
