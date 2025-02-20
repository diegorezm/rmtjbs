import { FileUser, LogOut, MessageSquare, NotebookTabs, UserIcon, type LucideIcon } from "lucide-react";
import { useMemo } from "react";
import { NavLink, useNavigate } from "react-router";
import type { User } from "~/features/auth/types";


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
  },
  {
    href: "/chats",
    title: "Chats",
    Icon: MessageSquare
  }
];

const companyProfileLinks = [
  {
    href: "/profile",
    title: "Profile",
    Icon: UserIcon
  },
  {
    href: "/jobs/my-jobs",
    title: "My jobs",
    Icon: NotebookTabs
  },
  {
    href: "/chats",
    title: "Chats",
    Icon: MessageSquare
  }
]

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
