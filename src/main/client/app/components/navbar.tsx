import { Building2, LogOut, Menu, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useAuthContext } from "~/providers/auth-provider";

function MobileNavbar({ isAuth }: { isAuth: boolean }) {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <Menu className="w-6 h-6" />
      </label>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <NavLink to="/" className="text-lg">Home</NavLink>
        </li>
        <li>
          <NavLink to="/jobs/recommended" className="text-lg">Jobs</NavLink>
        </li>
        {!isAuth && (
          <>
            <li>
              <NavLink to="/auth/login" className="text-lg">Login</NavLink>
            </li>
            <li>
              <NavLink to="/auth/register" className="text-lg">Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}



function DesktopNavbar() {
  return (
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li>
          <NavLink to="/" className="text-lg">Home</NavLink>
        </li>
        <li>
          <NavLink to="/jobs/recommended" className="text-lg">Jobs</NavLink>
        </li>
      </ul>
    </div>
  );
}


export function UserAvatar({ logoutFn }: { logoutFn: () => void }) {
  const navigate = useNavigate()

  const onLogout = () => {
    logoutFn()
    navigate("/")
  }

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="/default-avatar.png" alt="User Avatar" />
        </div>
      </label>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-1 shadow-sm">
        <li>
          <NavLink to="/profile" className="btn btn-ghost">
            <User className="size-4" /> Profile
          </NavLink>
        </li>
        <li>
          <button className="btn btn-ghost" onClick={onLogout}>
            <LogOut className="size-4" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export function Navbar() {
  const { user, logout } = useAuthContext();

  return (
    <nav className="navbar shadow-sm px-6 flex justify-between items-center">
      {/* Start Section */}
      <div className="navbar-start">
        <NavLink to="/" className="text-2xl font-bold text-primary">
          RemoteJobs
        </NavLink>
      </div>

      {/* Desktop Navigation */}
      <DesktopNavbar />

      {/* End Section */}
      <div className="navbar-end flex items-center gap-4">
        {user ? (
          <UserAvatar logoutFn={logout} />
        ) : (
          <div className="gap-2 hidden lg:flex">
            <details className="dropdown">
              <summary className="btn btn-outline">Register</summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-1 shadow-sm w-44">
                <li>
                  <NavLink
                    to={{
                      pathname: "/auth/register",
                      search: "t=candidate",
                    }}
                    className="btn btn-ghost"
                  >
                    <User className="size-4" /> As a candidate
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={{
                      pathname: "/auth/register",
                      search: "t=company",
                    }}
                    className="btn btn-ghost"
                  >
                    <Building2 className="size-4" /> As a company
                  </NavLink>
                </li>
              </ul>
            </details>
            <NavLink to="/auth/login" className="btn btn-primary">
              Login
            </NavLink>
          </div>
        )}
        {/* Mobile Navbar for smaller screens */}
        <MobileNavbar isAuth={!!user} />
      </div>
    </nav>
  );
}

