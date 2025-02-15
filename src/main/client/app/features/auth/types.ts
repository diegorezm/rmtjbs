import type { Candidate, CandidateDTO } from "../candidate/types";
import type { Company, CompanyDTO } from "../company/types";

export type AuthUser = {
  email: string,
  password: string,
  name: string,
  role: "CANDIDATE" | "COMPANY" | "ADMIN",
  createdAt: string,
  updatedAt: string
}

export type TokenDTO = { token: string, expiresAt: string }

type UserSafe = Omit<AuthUser, "password">

// I LOVE TYPESCRIPT 
export type User = UserSafe & { candidate: Candidate, company: null, role: "CANDIDATE" } | UserSafe & { candidate: null, company: Company, role: "COMPANY" }

export type LoginResponseDTO = {
  user: User;
  tokenDTO: TokenDTO
}

export type RegisterDTO = Omit<AuthUser, "createdAt" | "updatedAt" | "role">

export type LoginDTO = Omit<RegisterDTO, "name">

export type RegisterCompanyDTO = {
  userDTO: RegisterDTO;
  companyDTO: CompanyDTO
}

export type RegisterCandidateDTO = {
  userDTO: RegisterDTO;
  candidateDTO: CandidateDTO
}

