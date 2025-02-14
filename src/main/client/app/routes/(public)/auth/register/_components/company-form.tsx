type CompanyFormFieldsProps = {
  formData: {
    location: string
  };
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
          className="input input-primary w-full"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
    </>
  );
}
