import { useState, type FormEvent } from "react";
import { AlertError } from "~/components/alert";
import { useUpdateJobPostMutation } from "~/features/jobs/api";
import { JobFormFields } from "~/features/jobs/components/job-form";
import type { JobPosting, JobPostingDTO } from "~/features/jobs/types";

type Props = {
  closeDialog: VoidFunction
  job: JobPosting
}

export function EditJobDialog({ job, closeDialog }: Props) {
  const { isLoading, isError, error, mutateAsync } = useUpdateJobPostMutation()
  const isoString = new Date(job.expiresAt).toISOString();
  const date = isoString.slice(0, 16);

  const [formData, setFormData] = useState<JobPostingDTO>({
    ...job,
    expiresAt: date
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await mutateAsync({
      id: job.id,
      data: formData
    })
    closeDialog()
  }

  return (
    <dialog id="edit-job-dialog" className="modal bg-black/30">
      <div className="modal-box">
        <form className="w-full" onSubmit={onSubmit}>
          <JobFormFields
            formData={formData}
            setFormData={setFormData}
          />
          <div className="flex justify-end gap-x-2">
            <button className="btn btn-outline" type="button" onClick={closeDialog}>Cancel</button>
            <button className="btn btn-primary" disabled={isLoading}>Submit</button>
          </div>
        </form>
        {isError && <AlertError message={error.message} />}
      </div>
    </dialog>
  )
}
