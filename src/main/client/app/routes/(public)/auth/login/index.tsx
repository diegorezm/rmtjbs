import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AlertError } from "~/components/alert";
import { useLoginMutation } from "~/features/auth/api";
import { type LoginDTO } from "~/features/auth/types";
import { useAuthContext } from "~/providers/auth-provider";

export const meta = () => {
  return [{
    title: "Remote jobs | Login",
  }]
}

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginDTO>({
    password: "",
    email: ""
  })

  const loginMutation = useLoginMutation()
  const navigate = useNavigate()
  const { setUser } = useAuthContext()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = await loginMutation.mutateAsync(formData)
    setUser(data.user)
    navigate("/profile")
  }

  return (
    <div className="flex items-center justify-center">
      <div className="card w-full max-w-md bg-base-100 p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-6">Log in to your account</p>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="form-control">
            <label htmlFor="Email" className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={e => setFormData(f => ({
                ...f,
                email: e.target.value
              }))}
              placeholder="Enter your email"
              className="input input-primary w-full validator"
              required
            />
            <p className="validator-hint !text-red-500">Enter a valid email address</p>
          </div>

          {/* Email Input */}
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={e => setFormData(f => ({
                ...f,
                password: e.target.value
              }))}
              placeholder="Enter your password"
              className="input input-primary w-full validator"
              minLength={6}
              maxLength={255}
              required
            />
            <p className="validator-hint !text-red-500">Enter a valid password (6 to 255 characters)</p>
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4" disabled={loginMutation.isLoading}>
            {loginMutation.isLoading ? <span className="loading loading-spinner loading-md"></span> : "Log in"}
          </button>
        </form>

        {loginMutation.isError && <AlertError message={loginMutation.error.message} />}

        {/* Additional Links */}
        <div className="text-center mt-4 text-sm text-gray-500">
          <p>
            Don't have an account?{" "}
            <NavLink to="/auth/register" className="text-primary font-medium">
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

