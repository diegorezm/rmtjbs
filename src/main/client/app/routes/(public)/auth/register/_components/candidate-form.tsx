import { X } from "lucide-react";
import { useState } from "react";
import type { RegisterFormData } from "..";

type Props = {
  formData: RegisterFormData,
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export function CandidateFormFields({ formData, handleChange }: Props) {
  const [preferencesInput, setPreferencesInput] = useState("");
  const [preferences, setPreferences] = useState(formData.candidateDTO.jobPreferences);

  const handlePreferencesInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setPreferencesInput(input);

    if (input.includes(",")) {
      if (preferences.length > 20) return
      const items = input
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "");
      setPreferences((prev) => [...prev, ...items]);
      setPreferencesInput("");
      formData.candidateDTO.jobPreferences = preferences
    }
  };

  const handleRemovePreference = (index: number) => {
    const filtered = preferences.filter((_, i) => i !== index);
    formData.candidateDTO.jobPreferences = filtered
    setPreferences(filtered);
  };

  return (
    <>
      <div className="form-control">
        <label htmlFor="phone" className="label">
          <span className="label-text">Phone</span>
        </label>
        <input
          type="tel"
          id="phone"
          placeholder="Enter your phone number"
          className="input input-primary w-full validator tabular-nums"
          value={formData.candidateDTO.phone}
          onChange={handleChange}
          data-section="candidateDTO"
          required
          minLength={10}
          maxLength={11}
          pattern="[0-9]*"
        />
        <p className="validator-hint !text-red-500">Enter a valid phone number</p>
      </div>
      <div className="form-control">
        <label htmlFor="preferences" className="label">
          <span className="label-text">Preferences</span>
        </label>
        <input
          type="text"
          id="preferences"
          placeholder="Enter preferences (e.g., Web Developer, Data Analyst)"
          className="input input-primary w-full"
          value={preferencesInput}
          data-section="candidateDTO"
          onChange={handlePreferencesInput}
        />
        <div className="mt-2">
          {preferences.length > 0 && (
            <>
              <span className="text-sm font-bold">Current Preferences:</span>
              <ul className="grid grid-cols-2 lg:grid-cols-3 list-disc list-inside gap-2">
                {preferences.map((pref: string, index: number) => (
                  <li key={index} className="flex items-center justify-between badge badge-ghost badge-lg">
                    {pref}
                    <button
                      type="button"
                      className="ml-2 hover:cursor-pointer"
                      onClick={() => handleRemovePreference(index)}
                    >
                      <X className="size-3" />
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
          {preferences.length > 20 && (
            <p className="text-sm text-red-500 mt-2">Max preferences is 20</p>
          )}
        </div>
      </div>
    </>
  );
}

