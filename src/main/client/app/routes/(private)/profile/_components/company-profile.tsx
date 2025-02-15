import type { Company } from "~/features/company/types"

type Props = {
  data: Company
}
export function CompanyProfile({ data }: Props) {
  return (
    <div>
      {data.location}
    </div>
  )
}
