import { useNavigate } from "react-router"
import { AlertError } from "~/components/alert"
import { useDeleteJobPostMutation } from "~/features/jobs/api"
import type { JobPosting } from "~/features/jobs/types"

type Props = {
  closeDialog: VoidFunction,
  job: JobPosting
}

export function DeleteJobDialog({ job, closeDialog }: Props) {
  const { isLoading, error, isError, mutateAsync } = useDeleteJobPostMutation()
  const navigation = useNavigate()

  const onConfirm = async () => {
    await mutateAsync({
      id: job.id
    })
    navigation("/jobs/my-jobs")
  }

  return (
    <dialog id="delete-job-dialog" className="modal bg-black/30">
      <div className="modal-box">
        <h1 className="text-lg font-bold mb-2">Are you sure?</h1>
        <p className="mb-4">Are you sure you want to delete the job posting for <strong>{job.title}</strong>?</p>
        <div className="flex justify-end">
          <button className="btn btn-outline mr-2" onClick={closeDialog}>Cancel</button>
          <button className="btn btn-warning" onClick={onConfirm} disabled={isLoading}>Delete</button>
        </div>
        {isError && <AlertError message={error.message} />}
      </div>
    </dialog>)
}
