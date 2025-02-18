import { useCandidateApplicationsQuery } from "~/features/applications/api"
import { JobCard } from "~/features/jobs/components/job-card"

export function meta() {
  return [
    { title: "Applications" }
  ]
}

export default function ApplicationsPage() {

  const { isLoading: isApplicationsLoading, data: userApplications } = useCandidateApplicationsQuery()

  if (isApplicationsLoading) {
    return (
      <div className="w-full h-full flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }
  return (
    <div className="space-y-6">
      {userApplications?.map((e) => (
        <JobCard userApplied={true} job={e.jobPosting} status={e.status} />
      ))}
    </div>
  )
}
