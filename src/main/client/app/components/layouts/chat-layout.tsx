import { NavLink, Outlet } from "react-router";
import { useChatsQuery } from "~/features/chat/api";
import { Spinner } from "../spinner";
import { AlertError } from "../alert";
import type { ChatResponseDTO } from "~/features/chat/types";
import { Menu } from "lucide-react";

export default function ChatLayout() {
  const { isLoading, isFetching, isError, error, data: chats } = useChatsQuery()
  if (isLoading || isFetching) {
    return <Spinner />
  }

  if (isError) {
    return <AlertError message={error.message} />
  }

  if (!chats || chats.length === 0) {
    return (
      <div className="p-4">
        <p className="text-2xl font-bold text-center">You don't have any chats yet.</p>
      </div>
    );
  }

  console.log(chats)

  return (
    <div className="flex w-full h-[95hv] lg:h-[90vh] p-4">
      {/* sidebar */}
      <div className="hidden lg:block w-64 p-4 border-r border-gray-200 rounded">
        <h2 className="text-lg font-semibold mb-4">Chats</h2>
        <ul className="overflow-y-auto">
          {chats.map((chat) => (
            <ChatComponent chat={chat} key={chat.id} />
          ))}
        </ul>
      </div>

      {/* mobile sidebar */}
      <div className="drawer lg:hidden">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn btn-outline drawer-button btn-sm">
            <Menu className="size-4" />
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="menu bg-base-100 text-base-content min-h-full w-80 p-4">
            <h2 className="text-lg font-semibold mb-4">Chats</h2>
            <ul>
              {chats.map((chat) => (
                <ChatComponent chat={chat} key={chat.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow w-full h-full m-auto mt-10 lg:mt-0">
        <Outlet />
      </div>
    </div>
  );
}

const ChatComponent = ({ chat }: { chat: ChatResponseDTO }) => {
  return (
    <li className="mb-2">
      <NavLink
        to={`/chats/${chat.id}`}
        className={({ isActive }) => [
          isActive ? "bg-base-200" : "border border-neutral",
          "block p-2 hover:bg-base-200 rounded-md"
        ].join(" ")
        }
      >
        <div className="font-medium text-lg text-primary">
          {chat.chatterName}
        </div>
        <div className="text-sm text-gray-500">
          {chat.lastMessage ?? ""}
        </div>
      </NavLink>
    </li>
  )
}
