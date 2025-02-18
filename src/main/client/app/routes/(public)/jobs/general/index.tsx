import type { Route } from "./+types/index";
import { useJobPostsQuery } from "~/features/jobs/api";
import { AlertError } from "~/components/alert";
import { JobCard } from "~/features/jobs/components/job-card";
import { Pagination } from "~/components/pagination";
import { Navigate, useSearchParams } from "react-router";
import { useCandidateApplicationsQuery } from "~/features/applications/api";
import { useAuthContext } from "~/providers/auth-provider";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Remote jobs" },
    { name: "description", content: "Find your jobs here!" },
  ];
}

export default function JobsPage() {
  const { user } = useAuthContext()
  const [getSearchParams, setSearchParams] = useSearchParams()
  const q = getSearchParams.get("q") ?? ""
  const page = Number.parseInt(getSearchParams.get("page") || "0") ?? 0

  if (user?.role !== "CANDIDATE") {
    return <Navigate to="/" replace />
  }

  const { data, isLoading, isError, error } = useJobPostsQuery({
    q,
    page,
  })

  const { isLoading: isApplicationsLoading, data: userApplications } = useCandidateApplicationsQuery()

  if (isLoading || isApplicationsLoading) {
    return (
      <div className="w-full h-full flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  const applications = new Set(userApplications?.map((application) => application.jobPosting.id))

  return (
    <>
      {isError ? <AlertError message={error.message} /> : (
        <div className="max-w-4xl mx-auto grid gap-6">
          {data.content.map((e, i) => (
            <JobCard job={e} key={i} userApplied={applications.has(e.id)} />
          ))}
          {data.content.length > 0 && (
            <Pagination totalPages={data.page.totalPages} page={page} onPageChange={(newPage) => {
              setSearchParams({ q, page: newPage.toString() })
            }} />
          )}
        </div>
      )}
    </>
  );
}

