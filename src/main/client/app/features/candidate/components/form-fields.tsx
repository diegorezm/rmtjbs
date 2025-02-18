import { useState } from "react";
import type { CandidateDTO } from "../types";
import { X } from "lucide-react";

type Props = {
  formData: {
    candidateDTO: CandidateDTO
  },
  handleChange: (e: React.ChangeEvent<HTMLElement>) => void
}

export function CandidateFormFields({ formData, handleChange }: Props) {
  const [preferencesInput, setPreferencesInput] = useState("");
  const [preferences, setPreferences] = useState(formData.candidateDTO.jobPreferences);

  const addPreference = () => {
    const newPreference = preferencesInput.trim()
    setPreferences(e => ([...e, newPreference]))
    formData.candidateDTO.jobPreferences = preferences
    setPreferencesInput("")
  };

  const removePreference = (index: number) => {
    const newPreferences = preferences.filter((_, i) => i !== index)
    setPreferences(newPreferences)
    formData.candidateDTO.jobPreferences = newPreferences
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
        <div className="flex gap-2">
          <input
            type="text"
            id="preferences"
            placeholder="Enter preferences (e.g., Web Developer, Data Analyst)"
            className="input input-primary w-full"
            value={preferencesInput}
            data-section="candidateDTO"
            onChange={(e) => setPreferencesInput(e.target.value)}
          />

          <button
            type="button"
            className="btn btn-secondary"
            onClick={addPreference}
          >
            Add
          </button>
        </div>
        <div className="mt-2">
          {preferences.length > 0 && (
            <>
              <span className="text-sm font-bold">Current Preferences:</span>
              <ul className="grid grid-cols-2 lg:grid-cols-3 list-disc list-inside gap-2">
                {preferences.map((pref: string, index: number) => (
                  <li key={index} className="badge badge-ghost badge-lg text-sm">
                    <span className="w-full">{pref}</span>
                    <button
                      type="button"
                      className="hover:cursor-pointer"
                      onClick={() => removePreference(index)}
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

