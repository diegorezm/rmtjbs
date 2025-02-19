import { Mail, Phone } from "lucide-react";
import { AlertError } from "~/components/alert";
import { useUpdateApplicationStatusMutation } from "~/features/applications/api";
import type { JobApplicationResponseDTO, JobApplicationStatus } from "~/features/applications/types";

export function ApplicationListItem({ applicant }: { applicant: JobApplicationResponseDTO }) {
  const cloudflarePublicEndpoint =
    import.meta.env.VITE_CLOUDFLARE_PUBLIC_ENDPOINT ?? "";

  const {
    isError: isUpdateStatusError,
    error: updateStatusError,
    mutateAsync: updateStatus,
    isLoading: isUpdateStatusLoading
  } = useUpdateApplicationStatusMutation()

  const handleStatusChange = async (applicationId: string, status: JobApplicationStatus) => {
    await updateStatus({
      applicationId,
      status
    })
  };

  return (
    <li
      className="flex items-center gap-6 border border-neutral rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
    >
      {/* Profile Picture */}
      <div className="avatar">
        <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img
            src={`${cloudflarePublicEndpoint}/${applicant.candidate.profilePictureKey}`}
            alt={`${applicant.name}'s profile`}
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
          <p className="text-lg font-bold">{applicant.name}</p>
          <div className="flex gap-4 items-center text-sm text-neutral">
            <p className="flex items-center gap-2">
              <Mail className="size-4" />
              <a
                href={`mailto:${applicant.email}`}
                className="link link-primary"
              >
                {applicant.email}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4" />
              {applicant.candidate.phone}
            </p>
          </div>
        </div>

        <a
          href={`${cloudflarePublicEndpoint}/${applicant.candidate.resumeKey}`}
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
              handleStatusChange(applicant.id, event.target.value as JobApplicationStatus)
            }
            defaultValue={applicant.status}
          >
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {isUpdateStatusError && <AlertError message={updateStatusError.message} />}
      </div>
    </li>
  )
}
