import { useAuthContext } from "~/providers/auth-provider"
import { EditCandidateDialog } from "./edit-candidate-form"
import { EditCompanyDialog } from "./edit-company-form"

export function EditUserDialog() {
  const { user } = useAuthContext()
  const closeDialog = () => {
    const dialog = document.getElementById("edit-profile-modal") as HTMLDialogElement
    if (dialog.open) dialog.close()
  }
  return (
    <dialog id="edit-profile-modal" className="modal">
      <div className="modal-box">
        <h1 className="text-lg font-bold mb-2">Editing {user?.name}</h1>
        {user?.role === "CANDIDATE" && <EditCandidateDialog closeDialog={closeDialog} />}
        {user?.role === "COMPANY" && <EditCompanyDialog closeDialog={closeDialog} />}
      </div>
    </dialog>
  )
}
