import type { CandidateDTO } from "../candidate/types";
import type { CompanyDTO } from "../company/types";

export type User = {
  email: string,
  password: string,
  name: string,
  createdAt: string,
  updatedAt: string
}

export type TokenDTO = { token: string, expiresAt: string }

export type UserSafe = Omit<User, "password">

export type LoginResponseDTO = {
  user: UserSafe;
  tokenDTO: TokenDTO
}

export type RegisterDTO = Omit<User, "createdAt" | "updatedAt">

export type LoginDTO = Omit<RegisterDTO, "name">

export type RegisterCompanyDTO = {
  userDTO: RegisterDTO;
  companyDTO: CompanyDTO
}

export type RegisterCandidateDTO = {
  userDTO: RegisterDTO;
  candidateDTO: CandidateDTO
}
