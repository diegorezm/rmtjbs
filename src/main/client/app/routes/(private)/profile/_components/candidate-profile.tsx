import { useState } from "react";
import type { Candidate } from "~/features/candidate/types"

type Props = {
  data: Candidate
}

export function CandidateProfile({ data }: Props) {
  const [resumeKey, setResumeKey] = useState(data.resumeKey || null);
  const [isUploading, setIsUploading] = useState(false);

  const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setTimeout(() => {
      setResumeKey(file.name);
      setIsUploading(false);
      alert("Resume uploaded successfully!");
    }, 1000);
  };

  return (
    <>
      <div className="divider my-6" />
      <div className="w-full">
        <h3 className="font-semibold text-lg mb-2">Candidate Information</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">Phone</span>
            <span className="text-base font-semibold">{data.phone}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-600">Preferences</span>
            <ul className="flex flex-wrap gap-2">
              {data.jobPreferences.map((e, i) => (
                <li key={i + 1} className="badge badge-md">
                  {e}
                </li>
              ))}
            </ul>
          </div>

          {/* Resume Section */}
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-600">Resume</span>
            <div className="mt-2">
              {resumeKey ? (
                <div className="flex items-center gap-4">
                  <a
                    href={`https://www.adobe.com/br/acrobat/pdf-reader.html`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Resume
                  </a>
                  <label className="cursor-pointer text-blue-500 hover:underline">
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      disabled={isUploading}
                    />
                    Change Resume
                  </label>
                </div>
              ) : (
                <label className="cursor-pointer text-blue-500 hover:underline">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    disabled={isUploading}
                  />
                  Upload Resume
                </label>
              )}
              {isUploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
