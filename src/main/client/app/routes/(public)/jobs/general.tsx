import type { Route } from "./+types/general";
import { useJobPostsQuery } from "~/features/jobs/api";
import { AlertError } from "~/components/alert";
import { JobCard } from "~/features/jobs/components/job-card";
import { Pagination } from "~/components/pagination";
import { useSearchParams } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Remote jobs" },
    { name: "description", content: "Find your jobs here!" },
  ];
}

export default function JobsPage() {
  const [getSearchParams, setSearchParams] = useSearchParams()
  const q = getSearchParams.get("q") ?? ""
  const page = Number.parseInt(getSearchParams.get("page") || "0") ?? 0

  const { data, isLoading, isError, error } = useJobPostsQuery({
    q,
    page,
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

