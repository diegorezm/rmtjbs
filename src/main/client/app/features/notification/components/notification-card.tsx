import { formatDistanceToNow } from 'date-fns';
import type { Notification } from "../types";
import { Book, BookOpenCheck } from 'lucide-react';

type Props = {
  notification: Notification;
  markAsRead: (id: string) => void
};

export function NotificationCard({ notification, markAsRead }: Props) {

  console.log(notification)
  const formattedDate = formatDistanceToNow(new Date(notification.createdAt), {
    addSuffix: true,
  });

  return (
    <div
      role="alert"
      className={`alert shadow-lg mb-4`}
    >
      <div className="flex justify-between w-full gap-6">
        <div>
          <p className="font-bold">{notification.message}</p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
        <button className="btn btn-sm btn-outline" onClick={() => { markAsRead }}>
          {notification.isRead ? <BookOpenCheck /> : <Book className="size-4" />}
        </button>
      </div>
    </div>
  );
}

