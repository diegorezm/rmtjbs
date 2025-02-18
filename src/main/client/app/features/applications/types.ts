import type { Candidate } from "../candidate/types"
import type { JobPosting } from "../jobs/types"

export type JobApplication = {
  id: string,
  candidate: Candidate,
  jobPosting: JobPosting,
  appliedAt: string
}
