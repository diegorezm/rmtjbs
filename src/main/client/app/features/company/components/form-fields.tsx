import type { CompanyDTO } from "../types";

type Props = {
  formData: {
    companyDTO: CompanyDTO
  },
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;

}

export function CompanyFormFields({ formData, handleChange }: Props) {
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

      <div className="form-control">
        <label htmlFor="location" className="label">
          <span className="label-text">Company Description</span>
        </label>
        <textarea
          id="description"
          placeholder="Enter your description"
          rows={5}
          cols={5}
          className="w-full validator textarea textarea-primary"
          value={formData.companyDTO.description}
          onChange={handleChange}
          minLength={2}
          required
          data-section="companyDTO"
        />
        <p className="validator-hint !text-red-500">Enter a valid description</p>
      </div>
    </>
  );
}
