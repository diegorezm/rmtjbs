import { Search } from "lucide-react"
import { NavLink, Outlet, useSearchParams } from "react-router"

export default function JobLayout() {
  const [getSearchParams, setSearchParams] = useSearchParams()
  const q = getSearchParams.get("q") ?? ""
  return (
    <div className="w-full h-full space-y-4">
      <div className="join w-full mx-auto justify-center">
        <div className="w-full lg:w-2/3">
          <label className="input input-neutral w-full input-lg validator join-item">
            <input type="email" placeholder="Title,Key words" value={q} required onChange={e => {
              setSearchParams({ q: e.target.value })
            }} />
          </label>
        </div>
        <button className="btn btn-primary btn-lg join-item">
          <Search className="size-4" />
        </button>
      </div>
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
      <Outlet />
    </div>
  )
}
