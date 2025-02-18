import { Building2, FileUser, LogOut, UserIcon } from "lucide-react";
import { useMemo } from "react";
import { NavLink, useNavigate } from "react-router";
import type { User } from "~/features/auth/types";
import { useAuthContext } from "~/providers/auth-provider";


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


export function UserAvatar({ logoutFn, user }: { user: User, logoutFn: () => void }) {

  const cloudflarePublicEndpoint = import.meta.env.VITE_CLOUDFLARE_PUBLIC_ENDPOINT ?? "";

  const getAvatarKey = () => {
    if (user.role === "COMPANY") return user.company.logoKey
    if (user.role === "CANDIDATE") return user.candidate.profilePictureKey
    return undefined
  }

  const avatarKey = getAvatarKey()

  const avatarUrl = useMemo(() => {
    if (avatarKey) {
      return `${cloudflarePublicEndpoint}/${avatarKey}`;
    }
    return "/default-avatar.png";
  }, [user, avatarKey, cloudflarePublicEndpoint]);

  const navigate = useNavigate()

  const onLogout = () => {
    logoutFn()
    navigate("/")
  }

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={avatarUrl} alt="User Avatar"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null
              currentTarget.src = "/default-avatar.png"
            }}
          />
        </div>
      </label>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-1 shadow-sm">
        <li>
          <NavLink to="/profile" className="btn btn-ghost justify-start">
            <UserIcon className="size-4" /> Profile
          </NavLink>
        </li>

        <li>
          <NavLink to="/applications" className="btn btn-ghost justify-start">
            <FileUser className="size-4" /> Applications
          </NavLink>
        </li>
        <li>
          <button className="btn btn-ghost justify-start" onClick={onLogout}>
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

      <DesktopNavbar />

      <div className="navbar-end flex items-center gap-4">
        {user ? (
          <UserAvatar logoutFn={logout} user={user} />
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
                    <UserIcon className="size-4" /> As a candidate
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
      </div>
    </nav>
  );
}

