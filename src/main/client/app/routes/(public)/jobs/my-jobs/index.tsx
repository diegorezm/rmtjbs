import { useMyJobPostsQuery } from "~/features/jobs/api"
import { useAuthContext } from "~/providers/auth-provider"
import { Navigate, useSearchParams } from "react-router"
import { Spinner } from "~/components/spinner"
import { AlertError } from "~/components/alert"
import { JobCard } from "~/features/jobs/components/job-card"
import { Pagination } from "~/components/pagination"

export function meta({ }) {
  return [
    {
      title: "My jobs"
    }
  ]
}

export default function MyJobsPage() {
  const { user } = useAuthContext()
  const [getSearchParams, setSearchParams] = useSearchParams()
  const q = getSearchParams.get("q") ?? ""
  const page = Number.parseInt(getSearchParams.get("page") || "0") ?? 0

  if (!user || user.role !== "COMPANY") {
    return <Navigate to="/" replace />
  }

  const { data, isLoading, isError, error } = useMyJobPostsQuery({
    id: user.company.id,
    page,
    q
  })

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <AlertError message={error.message} />
  }

  return (
    <div className="max-w-4xl mx-auto grid gap-6">
      {data.content.length === 0 && <p className="text-2xl font-bold">No jobs yet!</p>}
      {data.content.map((e, i) => (
        <JobCard job={e} key={i} userApplied={false} isCompany={true} />
      ))}
      {data.content.length > 0 && (
        <Pagination totalPages={data.page.totalPages} page={page} onPageChange={(newPage) => {
          setSearchParams({ q, page: newPage.toString() })
        }} />
      )}
    </div>
  )
}
