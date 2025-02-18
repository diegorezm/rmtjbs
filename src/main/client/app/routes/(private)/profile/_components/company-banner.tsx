import { Image } from "lucide-react";
import { useMemo, useRef, useState, type ChangeEvent } from "react";
import { AlertError } from "~/components/alert";
import { useUpdateCompanyMutation } from "~/features/company/api";
import { uploadFile } from "~/features/storage/api";
import { useAuthContext } from "~/providers/auth-provider"

export function CompanyBanner() {
  const { user, setUser } = useAuthContext()

  const { isLoading: isCompanyMutationLoading, mutateAsync: updateCompany, isError: isCompanyMutationError, error: companyMutationError } = useUpdateCompanyMutation();
  const [isLoading, setIsLoading] = useState(false)
  const [fileUploadError, setFileUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const cloudflarePublicEndpoint = import.meta.env.VITE_CLOUDFLARE_PUBLIC_ENDPOINT ?? "";
  const defaultStockPic = "https://images.pexels.com/photos/30432517/pexels-photo-30432517/free-photo-of-pessoas-caminhando-na-plataforma-ferroviaria-historica.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

  const bannerUrl = useMemo(() => {
    if (user?.company?.bannerKey === "") return defaultStockPic
    return `${cloudflarePublicEndpoint}/${user?.company?.bannerKey}`
  }, [user, cloudflarePublicEndpoint])

  const onFileInputClick = () => {
    if (fileInputRef.current === null) return;
    fileInputRef.current?.click();
    setFileUploadError(null)
  };

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || user.role !== "COMPANY") return;

    const ext = file.name.split('.').pop();
    const objectKey = `${user.id}/banner_picture.${ext}`;

    setIsLoading(true);

    const uploadResponse = await uploadFile(file, objectKey);

    if (uploadResponse.error) {
      setFileUploadError(uploadResponse.error)
      setIsLoading(false);
      return;
    }

    const { company } = user

    await updateCompany({
      ...company,
      bannerKey: objectKey
    })

    setIsLoading(false)

    window.location.reload()
  }

  if (!user || user.role !== "COMPANY") return null

  return (
    <>
      <div className="w-full h-40 rounded-t-xl overflow-hidden group relative cursor-pointer">
        <img
          src={bannerUrl}
          alt={`${user.name} banner`}
          className="object-cover w-full h-full transition-all duration-300 group-hover:blur-sm"
        />

        <div className={`absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isLoading ? "opacity-100" : ""}`} role="button" onClick={onFileInputClick}>
          {isLoading ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : <Image />
          }
        </div>

        <input type="file" accept="image/*" ref={fileInputRef} onChange={onImageChange} disabled={isLoading || isCompanyMutationLoading} hidden />

      </div>
      <div className="w-1/2 mx-auto">
        {isCompanyMutationError && <AlertError message={companyMutationError.message} />}
        {fileUploadError !== null && <AlertError message={fileUploadError} />}
      </div>
    </>
  )

}
