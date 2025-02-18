import type { JobApplication } from "../applications/types"

export type Candidate = {
  id: string,
  phone: string,
  jobPreferences: string[],
  applications: JobApplication[],
  resumeKey?: string,
  profilePictureKey?: string
}

export type CandidateDTO = Omit<Candidate, "id" | "applications">
