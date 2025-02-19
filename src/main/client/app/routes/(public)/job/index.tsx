import { useJobPostQuery } from "~/features/jobs/api";
import type { Route } from "./+types/index";
import { Spinner } from "~/components/spinner";
import { Navigate, NavLink, useNavigate } from "react-router";
import { JobCard } from "~/features/jobs/components/job-card";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import { useAuthContext } from "~/providers/auth-provider";
import { useApplicantsByJobQuery } from "~/features/applications/api";
import { ApplicationListItem } from "./_components/applicant";

export function meta() {
  return [{ title: "Job" }];
}

export default function JobPage({ params }: Route.MetaArgs) {
  const { jobId } = params;
  const navigation = useNavigate()
  const { isLoading: isUserLoading, user } = useAuthContext();
  const {
    isLoading: isJobPostLoading,
    isError: isJobPostError,
    data: jobPosts,
  } = useJobPostQuery(jobId);

  const {
    isLoading: isApplicantsLoading,
    isError: isApplicantsError,
    data: applicants,
  } = useApplicantsByJobQuery(jobId);

  if (isJobPostLoading || isUserLoading || isApplicantsLoading) {
    return <Spinner />;
  }

  if (isJobPostError) {
    return <Navigate to="/jobs/recommended" replace />;
  }

  if (user === null) {
    return <Navigate to="/auth/login" replace />;
  }

  const openDeleteDialog = () => { }
  const openEditDialog = () => { }

  return (
    <div className="w-full h-full space-y-6">
      <div className="w-full flex items-ceter justify-between">
        <button onClick={() => navigation(-1)} className="btn btn-outline">
          <ArrowLeft className="size-4" />
        </button>
        {user.role === "COMPANY" && user?.company?.id === jobPosts.company.id && (
          <div className="flex gap-x-4">
            <button className="btn btn-error">
              <Trash className="size-4" />
            </button>
            <button className="btn btn-primary">
              <Edit className="size-4" />
            </button>
          </div>
        )}
      </div>
      <div className="w-fit mx-auto">
        <JobCard
          job={jobPosts}
          userApplied={false}
          variant="expanded"
          isCompany={user?.role === "COMPANY"}
        />

        <div className="divider my-6" />

        {!isApplicantsError && (
          <div>
            <h1 className="text-lg font-bold">Applicants</h1>
            <ul className="mt-2 space-y-4">
              {applicants.length === 0 && (
                <li key="no-applicants">
                  <p>No applications!</p>
                </li>
              )}
              {applicants.map((applicant) => (
                <ApplicationListItem applicant={applicant} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

