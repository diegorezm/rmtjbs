import type { Company } from "~/features/company/types"

type Props = {
  data: Company
}
export function CompanyProfile({ data }: Props) {
  return (
    <>
      <div className="divider my-6" />
      <div className="w-full">
        <h3 className="font-semibold text-lg mb-2">Company Information</h3>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-600">Location</span>
          <span className="text-base font-semibold">{data.location}</span>
        </div>
      </div>
    </>
  )
}
