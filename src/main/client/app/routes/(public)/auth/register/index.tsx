import { useNavigate, useSearchParams } from "react-router";
import { useState } from "react";

import RegisterForm from "./_components/register-form";
import { AlertError } from "~/components/alert";

import { useRegisterCandidateMutation, useRegisterCompanyMutation } from "~/features/auth/api";

const VALID_REGISTER_TYPES = {
  candidate: true,
  company: true,
} as const;

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
    phone: "",
    preferences: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
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

    const userDTO = {
      name: formData.name,
      email: formData.email,
      password: formData.password
    }

    if (registerType === "candidate") {
      await registerCandidateMutation.mutateAsync({
        userDTO,
        candidateDTO: {
          phone: formData.phone,
          preferences: formData.preferences
        }
      })
    } else if (registerType === "company") {
      await registerCompanyMutation.mutateAsync({
        userDTO,
        companyDTO: {
          location: formData.location
        }
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

