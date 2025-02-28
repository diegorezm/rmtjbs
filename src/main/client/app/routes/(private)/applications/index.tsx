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

  if (userApplications?.length === 0) {
    return (
      <h1 className="text-2xl font-bold text-center">No applications found!</h1>
    )
  }

  return (
    <div className="space-y-6 p-4">
      {userApplications?.map((e) => (
        <JobCard userApplied={true} job={e.jobPosting} status={e.status} key={e.id} />
      ))}
    </div>
  )
}
