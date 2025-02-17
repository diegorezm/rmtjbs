import type { RegisterDTO } from "../types"

type Props = {
  formData: {
    userDTO: RegisterDTO
  }
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function UserFormFields({ formData, handleChange }: Props) {
  return (
    <>
      <div className="form-control">
        <label htmlFor="name" className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          className="input input-primary w-full validator"
          value={formData.userDTO.name}
          onChange={handleChange}
          required
          minLength={4}
          maxLength={255}
          data-section="userDTO"
        />
        <p className="validator-hint !text-red-500">Enter a valid name (5 to 255 characters)</p>
      </div>

      {/* Email */}
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="input input-primary w-full validator"
          value={formData.userDTO.email}
          onChange={handleChange}
          data-section="userDTO"
          required
        />
        <p className="validator-hint !text-red-500">Enter a valid email</p>
      </div>

      {/* Password */}
      <div className="form-control">
        <label htmlFor="password" className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          className="input input-primary w-full validator"
          value={formData.userDTO.password}
          onChange={handleChange}
          required
          minLength={6}
          maxLength={255}
          data-section="userDTO"
        />
        <p className="validator-hint !text-red-500">Enter a valid password (5 to 255 characters)</p>
      </div>
    </>
  )
}
