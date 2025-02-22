import { useState, type FormEvent } from "react";
import { AlertError } from "~/components/alert";
import { useUpdateCompanyMutation } from "~/features/company/api";
import { CompanyFormFields } from "~/features/company/components/form-fields";
import type { CompanyDTO } from "~/features/company/types";
import { useUpdateUserMutation } from "~/features/user/api";
import { useAuthContext } from "~/providers/auth-provider";

type EditFormData = {
  userDTO: {
    name: string
  },
  companyDTO: CompanyDTO
}


type Props = {
  closeDialog: VoidFunction
}

export function EditCompanyDialog({ closeDialog }: Props) {
  const { user } = useAuthContext()
  const { isError: isUserError, error: userError, mutateAsync: updateUser, isLoading: isUserLoading } = useUpdateUserMutation()
  const { isError: isCompanyError, error: companyError, mutateAsync: updateCompany, isLoading: isCompanyLoading } = useUpdateCompanyMutation()

  const defaultState = {
    userDTO: {
      name: user?.name ?? ""
    },
    companyDTO: {
      description: user?.company?.description,
      location: user?.company?.location ?? "",
      bannerKey: user?.company?.bannerKey,
      logoKey: user?.company?.logoKey
    }
  }

  const [formData, setFormData] = useState<EditFormData>(defaultState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, dataset } = e.target;
    const section = dataset.section as keyof EditFormData | undefined;

    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [id]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await updateUser(formData.userDTO)
    await updateCompany(formData.companyDTO)
    closeDialog()
  }

  if (!user || user.role !== "COMPANY") return null
  return (
    <form onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="name" className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          className="input input-primary w-full validator"
          value={formData.userDTO.name}
          onChange={handleChange}
          required
          minLength={4}
          maxLength={255}
          data-section="userDTO"
        />
        <p className="validator-hint !text-red-500">Enter a valid name (5 to 255 characters)</p>
      </div>
      <CompanyFormFields formData={formData} handleChange={handleChange} />

      <div className="flex gap-2 mt-4">
        <button type="submit" className="btn btn-primary" disabled={isCompanyLoading || isUserLoading}>
          Submit
        </button>
        <button type="button" className="btn btn-outline" onClick={() => {
          setFormData(defaultState)
          closeDialog()
        }}>
          Cancel
        </button>
      </div>
      {isUserError && <AlertError message={userError.message} />}
      {isCompanyError && <AlertError message={companyError.message} />}
    </form>
  )
}
