import { CandidateFormFields } from "./candidate-form";
import { CompanyFormFields } from "./company-form";

type RegisterFormProps = {
  step: number;
  formData: any;
  registerType: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleNext: (e: React.FormEvent) => void;
  handleBack: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  isPending: boolean
};

export default function RegisterForm({
  step,
  formData,
  registerType,
  handleChange,
  handleNext,
  handleBack,
  handleSubmit,
  isPending
}: RegisterFormProps) {
  return (
    <form onSubmit={step === 2 ? handleSubmit : handleNext} className="space-y-4">
      {step === 1 && (
        <>
          {/* Name */}
          <div className="form-control">
            <label htmlFor="name" className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="input input-primary w-full"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={4}
              maxLength={255}
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="input input-primary w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="input input-primary w-full"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              maxLength={255}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          {registerType === "company" && (
            <CompanyFormFields formData={formData} handleChange={handleChange} />
          )}
          {registerType === "candidate" && (
            <CandidateFormFields formData={formData} handleChange={handleChange} />
          )}

          <div className="flex justify-between mt-4">
            <button type="button" onClick={handleBack} className="btn btn-outline">
              Back
            </button>
            <button type="submit" className="btn btn-primary" disabled={isPending}>
              {isPending ? <span className="loading loading-spinner loading-md"></span> : "Submit"}
            </button>
          </div>
        </>
      )}
    </form>
  );
}

