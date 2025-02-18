import { Building2, MapPin } from "lucide-react"
import type { JobPosting } from "../types"
import { useApplyToJobMutation } from "~/features/applications/api"
import { AlertError } from "~/components/alert"

type Props = {
  job: JobPosting,
  userApplied: boolean
}
export function JobCard({ job, userApplied }: Props) {
  const { isError, isLoading, error, mutateAsync } = useApplyToJobMutation()

  const onClick = async () => {
    await mutateAsync({
      jobId: job.id
    })
  }

  return (
    <div className="card bg-base-100 shadow-md p-4 rounded-lg border border-neutral">
      {job.company.bannerKey && (
        <div className="mb-4">
          <img src={job.company.bannerKey} alt={`${job.company.user.name} Banner`} className="rounded-lg w-full h-24 object-cover" />
        </div>
      )}

      <div className="flex flex-col gap-2">
        {/* Job Title */}
        <h2 className="text-xl font-bold text-primary">{job.title}</h2>

        {/* Company Info */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Building2 className="size-4" />
          <span>{job.company.user.name}</span>
          <MapPin className="size-4" />
          <span>{job.company.location}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600" dangerouslySetInnerHTML={{
          __html: job.description
        }}></p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-2">

          {job.skills !== undefined && job.skills.map((skill, index) => (
            <span key={index} className="badge badge-outline text-sm">{skill}</span>
          ))}
        </div>

        {/* Salary */}
        {job.salary && (
          <p className="text-sm text-gray-700 font-semibold mt-2">💰 ${job.salary.toLocaleString()} / year</p>
        )}

        <div className="mt-4">
          <button className="btn btn-primary w-full" disabled={userApplied || isLoading} onClick={onClick}>
            {userApplied ? "Already applied" : "Apply now"}
          </button>
        </div>
      </div>
      {isError && <AlertError message={error.message} />}
    </div>
  )

}
