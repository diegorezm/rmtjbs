export type Candidate = {
  id: string,
  phone: string,
  jobPreferences: string[],
  resumeKey?: string,
  profilePictureKey?: string
}

export type CandidateDTO = Omit<Candidate, "id">
