import { Bell, Building2, UserIcon } from "lucide-react";
import { NavLink } from "react-router";
import type { User } from "~/features/auth/types";
import { useAuthContext } from "~/providers/auth-provider";
import { UserAvatar } from "./user-avatar";
import { useEffect, useState } from "react";
import { useWebSocket } from "~/hooks/use-websocket";
import type { Notification } from "~/features/notification/types";
import { NotificationCard } from "~/features/notification/components/notification-card";

const NotificationsBar = ({ userId }: { userId: string }) => {
  const { stompClient, isConnected } = useWebSocket();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [...prev, notification]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  useEffect(() => {
    if (stompClient && isConnected) {
      const subscription = stompClient.subscribe(
        `/user/queue/notifications`,
        (message) => {
          const notification: Notification = JSON.parse(message.body);
          console.log("New notification received:", notification);
          addNotification({ ...notification, isRead: false });
        }
      );

      stompClient.publish({
        destination: "/app/notifications.fetch",
        body: JSON.stringify({ userId }),
      });

      return () => subscription.unsubscribe();
    }
  }, [stompClient, isConnected, userId]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <details className="dropdown">
      <summary className="btn btn-ghost btn-sm m-1">
        <Bell className="size-4" />
        {unreadCount > 0 && (
          <span className="badge badge-error badge-xs">{unreadCount}</span>
        )}
      </summary>
      <ul className="flex flex-col menu dropdown-content bg-base-100 rounded-box z-1 w-fit p-2 shadow-sm">
        {notifications.length === 0 ? (
          <li className="text-sm text-gray-500">No notifications</li>
        ) : (
          notifications.map((notification, i) => (
            <NotificationCard key={i} notification={notification} markAsRead={markAsRead} />
          ))
        )}
      </ul>
    </details>
  );
};

function DesktopNavbar({ user }: { user: User | null }) {
  return (
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li>
          <NavLink to="/" className="text-lg">Home</NavLink>
        </li>
        {user !== null && (
          <li>
            <NavLink to={{
              pathname: user.role === "COMPANY" ? "/jobs/my-jobs" : "/jobs/recommended"
            }} className="text-lg">Jobs</NavLink>
          </li>
        )}
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
          <>
            <NotificationsBar userId={user.id} />
            <UserAvatar logoutFn={logout} user={user} />
          </>
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

