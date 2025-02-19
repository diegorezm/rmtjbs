import { Building2, MapPin } from "lucide-react";
import type { JobPosting } from "../types";
import { useApplyToJobMutation } from "~/features/applications/api";
import { AlertError } from "~/components/alert";
import type { JobApplicationStatus } from "~/features/applications/types";
import { NavLink } from "react-router";
import { ApplicationStatus } from "./job-status";

type Props = {
  job: JobPosting;
  userApplied: boolean;
  status?: JobApplicationStatus;
  variant?: "small" | "expanded";
  isCompany?: boolean
};

export function JobCard({ job, userApplied, status, isCompany = false, variant = "small" }: Props) {
  const { isError, isLoading, error, mutateAsync } = useApplyToJobMutation();

  const onClick = async () => {
    await mutateAsync({
      jobId: job.id,
    });
  };

  const isExpanded = variant === "expanded"

  return (
    <div className={`card bg-base-100  rounded-lg ${!isExpanded && 'p-4 border border-neutral shadow-md'}`}>
      {job.company.bannerKey && (
        <div className="mb-4">
          <img
            src={job.company.bannerKey}
            alt={`${job.company.user.name} Banner`}
            className="rounded-lg w-full h-24 object-cover"
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        {isExpanded ? (
          <span className="text-lg text-primary font-bold">{job.title}</span>
        ) : (
          <NavLink
            to={`/job/${job.id}`}
            className="text-xl font-bold link-primary hover:underline"
          >
            {job.title}
          </NavLink>
        )}

        {/* Company Info */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Building2 className="size-4" />
          <span>{job.company.user.name}</span>
          <MapPin className="size-4" />
          <span>{job.company.location}</span>
        </div>

        {/* Small version */}
        {variant === "small" && (
          <>
            {/* Brief Description */}
            <p className="text-sm text-gray-600 line-clamp-2">
              {job.description.replace(/(<([^>]+)>)/gi, "") /* Strip HTML tags */}
            </p>

            {/* Salary */}
            {job.salary && (
              <p className="text-sm text-gray-700 font-semibold mt-2">
                💰 ${job.salary.toLocaleString()} / year
              </p>
            )}
          </>
        )}

        {/* Expanded version */}
        {isExpanded && (
          <>
            {/* Full Description */}
            <p
              className="text-sm text-gray-600"
              dangerouslySetInnerHTML={{
                __html: job.description,
              }}
            ></p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mt-2">
              {job.skills !== undefined &&
                job.skills.map((skill, index) => (
                  <span key={index} className="badge badge-outline text-sm">
                    {skill}
                  </span>
                ))}
            </div>

            {/* Salary */}
            {job.salary && (
              <p className="text-sm text-gray-700 font-semibold mt-2">
                💰 ${job.salary.toLocaleString()} / year
              </p>
            )}

          </>
        )}

        {status !== undefined && <ApplicationStatus status={status} />}
        {!isCompany && (
          <div className="mt-4">
            <button
              className={`btn btn-primary ${!isExpanded ? 'w-full' : 'w-2/3'}`}
              disabled={userApplied || isLoading}
              onClick={onClick}
            >
              {userApplied ? "Already applied" : "Apply now"}
            </button>
          </div>
        )}
      </div>
      {isError && <AlertError message={error.message} />}
    </div>
  );
}

