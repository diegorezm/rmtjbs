import { ArrowLeft, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AlertError } from "~/components/alert";
import { useSaveJobPostMutation } from "~/features/jobs/api";
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

  const [skillInput, setSkillInput] = useState<string>("");

  const addSkill = () => {

    if (formData.skills === undefined) {
      setFormData((f) => ({
        ...f,
        skills: [skillInput.trim()]
      }))
    } else if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((f) => ({
        ...f,
        // @ts-ignore
        skills: [...f.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    if (formData.skills === undefined) return
    setFormData((f) => ({
      ...f,
      // @ts-ignore
      skills: f.skills.filter((s) => s !== skill),
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAsync(formData)
    setFormData(defaultValues)
    navigation("/jobs/my-jobs")
  };

  return (
    <div className="w-full h-full">
      <NavLink to="/jobs/my-jobs" className="btn btn-outline">
        <ArrowLeft className="size-4" />
      </NavLink>

      <div className="flex items-center justify-center">
        <div className="card w-full max-w-md bg-base-100 p-6">

          <h1 className="text-2xl font-bold text-center mb-4">Create a new job opening!</h1>

          {isError && <AlertError message={error.message} />}

          <form onSubmit={onSubmit} className="w-full">
            {/* Title */}
            <div className="form-control">
              <label htmlFor="title" className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Job Title"
                className="input input-primary w-full validator"
                value={formData.title}
                onChange={(e) =>
                  setFormData((f) => ({
                    ...f,
                    title: e.target.value,
                  }))
                }
                minLength={3}
                maxLength={50}
                required
              />
              <p className="validator-hint !text-red-500">
                Enter a valid title (3 to 50 characters)
              </p>
            </div>

            {/* Description */}
            <div className="form-control">
              <label htmlFor="description" className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                id="description"
                rows={5}
                cols={20}
                placeholder="Enter a description"
                className="textarea textarea-primary w-full validator"
                value={formData.description}
                onChange={(e) =>
                  setFormData((f) => ({
                    ...f,
                    description: e.target.value,
                  }))
                }
                minLength={10}
                maxLength={1000}
                required
              />
              <p className="validator-hint !text-red-500">
                Enter a valid description (10 to 1000 characters)
              </p>
            </div>

            {/* Expiration Date */}
            <div className="form-control">
              <label htmlFor="expiresAt" className="label">
                <span className="label-text">Expiration Date</span>
              </label>
              <input
                id="expiresAt"
                type="datetime-local"
                className="input input-primary w-full validator"
                value={formData.expiresAt}
                onChange={(e) =>
                  setFormData((f) => ({
                    ...f,
                    expiresAt: e.target.value,
                  }))
                }
                required
              />
            </div>

            {/* Salary */}
            <div className="form-control">
              <label htmlFor="salary" className="label">
                <span className="label-text">Salary</span>
              </label>
              <input
                id="salary"
                type="number"
                placeholder="Enter annual salary"
                className="input input-primary w-full validator"
                value={formData.salary}
                onChange={(e) =>
                  setFormData((f) => ({
                    ...f,
                    salary: Number(e.target.value),
                  }))
                }
                min={0}
                required
              />
              <p className="validator-hint !text-red-500">
                Enter a valid salary (must be a positive number)
              </p>
            </div>

            {/* Skills */}
            <div className="form-control">
              <label htmlFor="skills" className="label">
                <span className="label-text">Skills</span>
              </label>
              <div className="flex gap-2">
                <input
                  id="skills"
                  type="text"
                  placeholder="Add a skill"
                  className="input input-primary w-full"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={addSkill}
                >
                  Add
                </button>
              </div>
              <ul className="flex flex-wrap gap-2 mt-2 mb-4">
                {formData.skills !== undefined && formData.skills.map((skill, index) => (
                  <li key={index} className="badge badge-ghost badge-lg text-sm">
                    <span className="w-full">{skill}</span>
                    <button
                      type="button"
                      className="hover:cursor-pointer"
                      onClick={() => removeSkill(skill)}
                    >
                      <X className="size-3" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
              Create Job
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

