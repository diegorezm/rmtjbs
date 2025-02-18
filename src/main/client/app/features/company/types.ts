export type Company = {
  id: string
  location: string
  description?: string
  bannerKey?: string
  logoKey?: string
}

export type CompanyDTO = Omit<Company, "id">
