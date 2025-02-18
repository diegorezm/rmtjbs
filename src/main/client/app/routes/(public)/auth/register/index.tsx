import { useNavigate, useSearchParams } from "react-router";
import { useState } from "react";

import RegisterForm from "./_components/register-form";
import { AlertError } from "~/components/alert";

import { type RegisterDTO } from "~/features/auth/types"

import { useRegisterCandidateMutation, useRegisterCompanyMutation } from "~/features/auth/api";
import type { CompanyDTO } from "~/features/company/types";
import type { CandidateDTO } from "~/features/candidate/types";

const VALID_REGISTER_TYPES = {
  candidate: true,
  company: true,
} as const;

export const meta = () => {
  return [{
    title: "Remote jobs | Register"
  }]
}

export type RegisterFormData = {
  userDTO: RegisterDTO,
  companyDTO: CompanyDTO,
  candidateDTO: CandidateDTO
}

export default function RegisterPage() {
  const [searchParams] = useSearchParams();
  const registerCompanyMutation = useRegisterCompanyMutation()
  const registerCandidateMutation = useRegisterCandidateMutation()
  const navigate = useNavigate()

  let registerType = searchParams.get("t");

  if (!registerType || !(registerType in VALID_REGISTER_TYPES)) {
    registerType = "candidate";
  }

  const [step, setStep] = useState(1);
  // this sucks, i have to find a way to change it
  const [formData, setFormData] = useState<RegisterFormData>({
    userDTO: {
      email: "",
      name: "",
      password: ""
    },
    candidateDTO: {
      phone: "",
      jobPreferences: []
    },
    companyDTO: {
      location: ""
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, dataset } = e.target;
    const section = dataset.section as keyof RegisterFormData | undefined;

    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [id]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()


    if (registerType === "candidate") {
      const { userDTO, candidateDTO } = formData
      await registerCandidateMutation.mutateAsync({
        userDTO, candidateDTO
      })
    } else if (registerType === "company") {
      const { userDTO, companyDTO } = formData
      await registerCompanyMutation.mutateAsync({
        userDTO, companyDTO
      })
    }

    if (!registerCandidateMutation.isError && !registerCompanyMutation.isError) {
      return navigate("/auth/login")
    }

  };

  return (
    <div className="flex items-center justify-center">
      <div className="card w-full max-w-md bg-base-100 p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Welcome to Remote Jobs!</h1>
        <p className="text-center text-gray-500 mb-6">
          Create an account and start {registerType === "candidate" ? "applying" : "hiring"}!
        </p>

        <div className="w-full space-y-6">
          <RegisterForm
            step={step}
            formData={formData}
            registerType={registerType}
            handleChange={handleChange}
            handleNext={handleNext}
            handleBack={handleBack}
            handleSubmit={handleSubmit}
            isPending={registerCompanyMutation.isLoading || registerCandidateMutation.isLoading}
          />
        </div>
        {registerCompanyMutation.isError && <AlertError message={registerCompanyMutation.error.message} />}
        {registerCandidateMutation.isError && <AlertError message={registerCandidateMutation.error.message} />}
      </div>
    </div>
  );
}

