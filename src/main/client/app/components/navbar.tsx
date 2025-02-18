import { Building2, FileUser, LogOut, NotebookTabs, UserIcon, type IconNode, type LucideIcon } from "lucide-react";
import { useMemo } from "react";
import { NavLink, useNavigate } from "react-router";
import type { User } from "~/features/auth/types";
import { useAuthContext } from "~/providers/auth-provider";

type Link = {
  href: string,
  title: string
  Icon?: LucideIcon
}

const candidateProfileLiks: Link[] = [
  {
    href: "/profile",
    title: "Profile",
    Icon: UserIcon
  },
  {
    href: "/applications",
    title: "Applications",
    Icon: FileUser
  }
];

const companyProfileLinks = [
  {
    href: "/profile",
    title: "Profile",
    Icon: UserIcon
  },
  {
    href: "/my-jobs",
    title: "My jobs",
    Icon: NotebookTabs
  }
]

function DesktopNavbar({ user }: { user: User | null }) {
  return (
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li>
          <NavLink to="/" className="text-lg">Home</NavLink>
        </li>
        {user !== null && user.role !== "COMPANY" && (
          <li>
            <NavLink to="/jobs/recommended" className="text-lg">Jobs</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export function UserAvatar({ logoutFn, user }: { user: User, logoutFn: () => void }) {
  const cloudflarePublicEndpoint = import.meta.env.VITE_CLOUDFLARE_PUBLIC_ENDPOINT ?? "";

  const links = useMemo(() => {
    if (user.role === "COMPANY") return companyProfileLinks
    return candidateProfileLiks
  }, [user])

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
      <ul className="menu dropdown-content bg-base-100 rounded-box z-1 shadow-md w-44">
        {links.map((e, i) => (
          <li key={i + 1}>
            <NavLink to={e.href} className="btn btn-ghost justify-start">
              {e.Icon !== undefined && (
                <e.Icon className="size-4" />
              )}
              {e.title}
            </NavLink>
          </li>
        ))}
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

      <DesktopNavbar user={user} />

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

