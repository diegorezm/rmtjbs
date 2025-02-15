import type { Route } from "./+types/recommended";
import { useRecommendedJobPostsQuery } from "~/features/jobs/api";
import { AlertError } from "~/components/alert";
import { JobCard } from "~/features/jobs/components/job-card";
import { Pagination } from "~/components/pagination";
import { useSearchParams } from "react-router";
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

  const getPreferences = () => {
    if (user?.role === "CANDIDATE") return user.candidate.jobPreferences
    return []
  }

  const { data, isLoading, isError, error } = useRecommendedJobPostsQuery({
    q,
    page,
    preferences: getPreferences()
  })

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (
    <>
      {isError ? <AlertError message={error.message} /> : (
        <div className="max-w-4xl mx-auto grid gap-6">
          {data.content.map((e, i) => (
            <JobCard job={e} key={i} />
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

