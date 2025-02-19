import { useState } from "react";
import { AlertError } from "~/components/alert";
import type { User } from "~/features/auth/types";
import { useUpdateCandidateMutation } from "~/features/candidate/api";
import { uploadFile } from "~/features/storage/api";

type Props = {
  user: User
}

export function CandidateProfile({ user }: Props) {
  const cloudflarePublicEndpoint = import.meta.env.VITE_CLOUDFLARE_PUBLIC_ENDPOINT ?? "";
  const { isLoading: isCandidateMutationLoading, mutateAsync: updateCandidate, isError: isCandidateMutateError, error: candidateMutationError } = useUpdateCandidateMutation();
  const [resumeUrl, setResumeUrl] = useState<string | null>(() => {
    if (user.role !== "CANDIDATE") {
      return null
    }
    if (user.candidate.resumeKey === undefined || user.candidate.resumeKey === null || user.candidate.resumeKey === "") return null
    return `${cloudflarePublicEndpoint}/${user.candidate.resumeKey}`
  });

  const [isUploading, setIsUploading] = useState(false);

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const { candidate } = user

    if (!candidate) return

    setIsUploading(true);
    const objectKey = `${user.id}/resume.pdf`
    const response = await uploadFile(file, objectKey)
    if (response.error) {
      console.error(response.error)
      setIsUploading(false)
      return
    }

    await updateCandidate({
      ...user.candidate,
      resumeKey: objectKey
    })

    setResumeUrl(`${cloudflarePublicEndpoint}/${objectKey}`)
    setIsUploading(false)
    window.location.reload()
  };

  if (user.role !== "CANDIDATE") return null

  return (
    <>
      <div className="divider my-6" />
      <div className="w-full">
        <h3 className="font-semibold text-lg mb-2">Candidate Information</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">Phone</span>
            <span className="text-base font-semibold">{user.candidate.phone}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">Preferences</span>
            <ul className="flex flex-wrap gap-2">
              {user.candidate.jobPreferences.map((e, i) => (
                <li key={i + 1} className="badge badge-md">
                  {e}
                </li>
              ))}
            </ul>
          </div>

          {/* Resume Section */}
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-600">Resume</span>
            <div className="mt-2">
              {resumeUrl ? (
                <div className="flex items-center gap-4">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link link-primary"
                  >
                    View Resume
                  </a>

                  <label className="link link-hover">
                    <input
                      type="file"
                      className="hidden "
                      accept=".pdf"
                      onChange={handleResumeUpload}
                      disabled={isUploading || isCandidateMutationLoading}
                    />
                    Change Resume
                  </label>
                </div>
              ) : (
                <label className="link link-primary">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    disabled={isUploading || isCandidateMutationLoading}
                  />
                  Upload Resume
                </label>
              )}
              {isUploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
            </div>
          </div>

        </div>
        {isCandidateMutateError && <AlertError message={candidateMutationError.message} />}
      </div >
    </>
  )
}
