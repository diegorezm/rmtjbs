import { useJobPostQuery } from "~/features/jobs/api"
import type { Route } from "../jobs/[id]/+types/index"
import { Spinner } from "~/components/spinner"
import { Navigate, NavLink } from "react-router"
import { JobCard } from "~/features/jobs/components/job-card"
import { ArrowLeft } from "lucide-react"
export default function JobPage({ params }: Route.MetaArgs) {
  const { jobId } = params
  const { isLoading, isError, data } = useJobPostQuery(jobId)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <Navigate to="/jobs/recommended" replace />;
  }

  return (
    <div className="w-full h-full space-y-6">
      <NavLink to="/jobs/recommended" className="btn btn-outline">
        <ArrowLeft className="size-4" />
      </NavLink>
      <div className="w-fit mx-auto">
        <JobCard job={data} userApplied={false} variant="expanded" />
      </div>
    </div>
  )
}
