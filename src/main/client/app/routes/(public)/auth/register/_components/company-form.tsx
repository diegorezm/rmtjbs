import type { RegisterFormData } from "..";

type CompanyFormFieldsProps = {
  formData: RegisterFormData,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function CompanyFormFields({ formData, handleChange }: CompanyFormFieldsProps) {
  return (
    <>
      <div className="form-control">
        <label htmlFor="location" className="label">
          <span className="label-text">Company Location</span>
        </label>
        <input
          type="text"
          id="location"
          placeholder="Enter your company location"
          className="input input-primary w-full validator"
          value={formData.companyDTO.location}
          onChange={handleChange}
          minLength={1}
          required
          data-section="companyDTO"
        />
        <p className="validator-hint !text-red-500">Enter a valid location</p>
      </div>
    </>
  );
}
