import { UserFormFields } from "~/features/auth/components/form-fields";
import type { RegisterFormData } from "..";
import { CompanyFormFields } from "~/features/company/components/form-fields";
import { CandidateFormFields } from "~/features/candidate/components/form-fields";

type RegisterFormProps = {
  step: number;
  formData: RegisterFormData;
  registerType: string;
  handleChange: (e: React.ChangeEvent<HTMLElement>) => void;
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
    <form onSubmit={step === 2 ? handleSubmit : handleNext}>
      {step === 1 && (
        <>
          <UserFormFields handleChange={handleChange} formData={formData} />
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

