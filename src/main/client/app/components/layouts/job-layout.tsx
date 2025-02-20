import { NavLink, Outlet, useSearchParams } from "react-router"
import { useAuthContext } from "~/providers/auth-provider"

export default function JobLayout() {
  const { user } = useAuthContext()
  const [getSearchParams, setSearchParams] = useSearchParams()
  const q = getSearchParams.get("q") ?? ""
  return (
    <div className="w-full h-full space-y-4 py-6 px-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-center gap-4 w-full mx-auto">
        {/* Search Input and Button */}
        <div className="flex w-full lg:w-2/3">
          <label className="input input-neutral w-full input-lg">
            <input
              type="email"
              placeholder="Search for title, keywords, etc..."
              value={q}
              required
              onChange={(e) => {
                setSearchParams({ q: e.target.value });
              }}
            />
          </label>
        </div>

        {user?.role === "COMPANY" && (
          <NavLink to="/job/create" className="btn btn-primary btn-lg">
            New job
          </NavLink>
        )}
      </div>

      {user?.role !== "COMPANY" && (
        <div role="tablist" className="tabs tabs-border w-full mx-auto justify-center">
          <NavLink to="/jobs/recommended" role="tab" className={({ isActive }) => [
            "tab",
            isActive && "tab-active"
          ].join(" ")}>
            Recommended
          </NavLink>
          <NavLink to="/jobs/general" role="tab" className={({ isActive }) => [
            "tab",
            isActive && "tab-active"
          ].join(" ")}>General</NavLink>
        </div>
      )}
      <Outlet />
    </div>
  )
}
