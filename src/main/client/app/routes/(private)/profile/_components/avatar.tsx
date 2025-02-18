import { Image } from "lucide-react";
import { useMemo, useRef, useState, type ChangeEvent } from "react";
import { AlertError } from "~/components/alert";
import type { User } from "~/features/auth/types";
import { useUpdateCandidateMutation } from "~/features/candidate/api";
import { useUpdateCompanyMutation } from "~/features/company/api";
import { uploadFile } from "~/features/storage/api";

type Props = {
  avatarKey?: string;
  user: User;
};

export function InteractiveAvatar({ avatarKey, user }: Props) {
  const { isLoading: isCandidateMutationLoading, mutateAsync: updateCandidate, isError: isCandidateMutateError, error: candidateMutationError } = useUpdateCandidateMutation();
  const { isLoading: isCompanyMutationLoading, mutateAsync: updateCompany, isError: isCompanyMutationError, error: companyMutationError } = useUpdateCompanyMutation();

  const [isLoading, setIsLoading] = useState(false);
  const [fileUploadError, setFileUploadError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const cloudflarePublicEndpoint = import.meta.env.VITE_CLOUDFLARE_PUBLIC_ENDPOINT ?? "";

  const avatarUrl = useMemo(() => {
    if (avatarKey) {
      return `${cloudflarePublicEndpoint}/${avatarKey}`;
    }
    return "/default-avatar.png";
  }, [user, avatarKey, cloudflarePublicEndpoint]);

  const onFileInputClick = () => {
    if (fileInputRef.current === null) return;
    fileInputRef.current?.click();
  };

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split('.').pop();
    const objectKey = `${user.id}/profile_picture.${ext}`;

    setIsLoading(true);

    const uploadResponse = await uploadFile(file, objectKey);

    if (uploadResponse.error) {
      setFileUploadError(uploadResponse.error)
      setIsLoading(false);
      return;
    }

    if (user.role === "CANDIDATE") {
      const { candidate } = user;
      await updateCandidate({
        jobPreferences: candidate.jobPreferences,
        phone: candidate.phone,
        resumeKey: candidate.resumeKey,
        profilePictureKey: objectKey
      });
    }
    else if (user.role === "COMPANY") {
      const { company } = user
      await updateCompany({
        ...company,
        logoKey: objectKey
      })
    }
    setIsLoading(false)
    window.location.reload()
  };

  return (
    <>
      <div className="avatar group relative cursor-pointer">
        {/* The avatar image */}
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
          <img
            src={avatarUrl}
            alt={`${user.name}'s avatar`}
            className="object-cover w-full h-full transition-all duration-300 group-hover:blur-sm"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null
              currentTarget.src = "/default-avatar.png"
            }}
          />
        </div>

        <div className={`absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isLoading ? "opacity-100" : ""}`} role="button" onClick={onFileInputClick}>
          {isLoading ? (
            <span className="loading loading-spinner loading-lg my-8 mx-8"></span>
          ) : <Image className="m-auto my-8" />}
        </div>

        <input type="file" accept="image/*" ref={fileInputRef} onChange={onImageChange} disabled={isLoading || isCandidateMutationLoading || isCompanyMutationLoading} hidden />
      </div >
      {isCandidateMutateError && <AlertError message={candidateMutationError.message} />
      }
      {isCompanyMutationError && <AlertError message={companyMutationError.message} />}

      {fileUploadError !== null && <AlertError message={fileUploadError} />}
    </>
  );
}

