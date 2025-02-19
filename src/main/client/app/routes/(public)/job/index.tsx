import { useJobPostQuery } from "~/features/jobs/api";
import type { Route } from "./+types/index";
import { Spinner } from "~/components/spinner";
import { Navigate, NavLink } from "react-router";
import { JobCard } from "~/features/jobs/components/job-card";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { useAuthContext } from "~/providers/auth-provider";
import { useApplicantsByJobQuery, useUpdateApplicationStatusMutation } from "~/features/applications/api";
import { AlertError } from "~/components/alert";
import type { JobApplicationStatus } from "~/features/applications/types";

export function meta() {
  return [{ title: "Job" }];
}

export default function JobPage({ params }: Route.MetaArgs) {
  const { jobId } = params;
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

  const {
    isError: isUpdateStatusError,
    error: updateStatusError,
    mutateAsync: updateStatus,
    isLoading: isUpdateStatusLoading
  } = useUpdateApplicationStatusMutation()

  const cloudflarePublicEndpoint =
    import.meta.env.VITE_CLOUDFLARE_PUBLIC_ENDPOINT ?? "";

  const handleStatusChange = async (applicationId: string, status: JobApplicationStatus) => {
    await updateStatus({
      applicationId,
      status
    })
  };

  if (isJobPostLoading || isUserLoading || isApplicantsLoading) {
    return <Spinner />;
  }

  if (isJobPostError) {
    return <Navigate to="/jobs/recommended" replace />;
  }

  return (
    <div className="w-full h-full space-y-6">
      <NavLink to="/jobs/recommended" className="btn btn-outline">
        <ArrowLeft className="size-4" />
      </NavLink>
      <div className="w-fit mx-auto">
        <JobCard
          job={jobPosts}
          userApplied={false}
          variant="expanded"
          isCompany={user?.role === "COMPANY"}
        />

        {isUpdateStatusError && <AlertError message={updateStatusError.message} />}

        <div className="divider my-6" />


        {!isApplicantsError && (
          <div>
            <h1 className="text-lg font-bold">Applicants</h1>
            <ul className="mt-2 space-y-4">
              {applicants.map((e) => (
                <li
                  key={e.id}
                  className="flex items-center gap-6 border border-neutral rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
                >
                  {/* Profile Picture */}
                  <div className="avatar">
                    <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={`${cloudflarePublicEndpoint}/${e.candidate.profilePictureKey}`}
                        alt={`${e.name}'s profile`}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = "/default-avatar.png";
                        }}
                      />
                    </div>
                  </div>

                  {/* Applicant Details */}
                  <div className="flex flex-col space-y-2 w-full justify-start">
                    <div className="flex flex-wrap justify-between items-center">
                      <p className="text-lg font-bold">{e.name}</p>
                      <div className="flex gap-4 items-center text-sm text-neutral">
                        <p className="flex items-center gap-2">
                          <Mail className="size-4" />
                          <a
                            href={`mailto:${e.email}`}
                            className="link link-primary"
                          >
                            {e.email}
                          </a>
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="size-4" />
                          {e.candidate.phone}
                        </p>
                      </div>
                    </div>

                    <a
                      href={`${cloudflarePublicEndpoint}/${e.candidate.resumeKey}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary text-sm flex items-center gap-2"
                    >
                      View Resume
                    </a>

                    <div className="flex items-center gap-4 mt-2">
                      <select
                        className="select select-bordered select-sm"
                        disabled={isUpdateStatusLoading}
                        onChange={(event) =>
                          handleStatusChange(e.id, event.target.value as JobApplicationStatus)
                        }
                        defaultValue={e.status}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="ACCEPTED">Accepted</option>
                        <option value="REJECTED">Rejected</option>
                      </select>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

