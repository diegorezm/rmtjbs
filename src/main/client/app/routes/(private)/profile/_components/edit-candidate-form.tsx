import { useState, type FormEvent } from "react";
import { AlertError } from "~/components/alert";
import { useUpdateCandidateMutation } from "~/features/candidate/api";
import { CandidateFormFields } from "~/features/candidate/components/form-fields";
import type { CandidateDTO } from "~/features/candidate/types";
import { useUpdateUserMutation } from "~/features/user/api";
import { useAuthContext } from "~/providers/auth-provider";

type EditFormData = {
  userDTO: {
    name: string
  },
  candidateDTO: CandidateDTO
}

type Props = {
  closeDialog: VoidFunction
}

export function EditCandidateDialog({ closeDialog }: Props) {
  const { user, setUser } = useAuthContext()
  const { isError: isUserError, error: userError, mutateAsync: updateUser, isLoading: isUserLoading } = useUpdateUserMutation()
  const { isError: isCandidateError, error: candidateError, mutateAsync: updateCandidte, isLoading: isCandidateLoading } = useUpdateCandidateMutation()

  const defaultState = {
    userDTO: {
      name: user?.name ?? ""
    },
    candidateDTO: {
      jobPreferences: user?.candidate?.jobPreferences || [],
      phone: user?.candidate?.phone || "",
      profilePictureKey: user?.candidate?.profilePictureKey,
      resumeKey: user?.candidate?.resumeKey
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
    if (user?.role !== "CANDIDATE") return

    await updateUser(formData.userDTO)
    await updateCandidte(formData.candidateDTO)

    const { candidate } = user

    setUser({
      ...user,
      name: formData.userDTO.name,
      candidate: {
        ...candidate,
        ...formData.candidateDTO
      }
    })
    closeDialog()
  }

  if (!user || user.role !== "CANDIDATE") return null

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

      <CandidateFormFields formData={formData} handleChange={handleChange} />

      <div className="flex gap-2 mt-4">
        <button type="submit" className="btn btn-primary" disabled={isCandidateLoading || isUserLoading}>
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
      {isCandidateError && <AlertError message={candidateError.message} />}
    </form>
  )
}
