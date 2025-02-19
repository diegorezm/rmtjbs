import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AlertError } from "~/components/alert";
import { useSaveJobPostMutation } from "~/features/jobs/api";
import { JobForm } from "~/features/jobs/components/job-form";
import type { JobPostingDTO } from "~/features/jobs/types";

export function meta() {
  return [
    { title: "Create job" }
  ]
}

export default function CreateJobPage() {
  const { isLoading, isError, error, mutateAsync } = useSaveJobPostMutation()
  const navigation = useNavigate()
  const defaultValues = {
    description: "",
    title: "",
    expiresAt: "",
    salary: 0,
    skills: [],

  }
  const [formData, setFormData] = useState<JobPostingDTO>(defaultValues);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAsync(formData)
    setFormData(defaultValues)
    navigation("/jobs/my-jobs")
  };

  return (
    <div className="w-full h-full">
      <button onClick={() => navigation(-1)} className="btn btn-outline">
        <ArrowLeft className="size-4" />
      </button>

      <div className="flex items-center justify-center">
        <div className="card w-full max-w-md bg-base-100 p-6">

          <h1 className="text-2xl font-bold text-center mb-4">Create a new job opening!</h1>

          {isError && <AlertError message={error.message} />}

          <JobForm
            isLoading={isLoading}
            setFormData={setFormData}
            formData={formData}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}

