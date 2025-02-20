import type { WebSocketMessage } from "../types";

export type Notification = {
  id: string;
  userId: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export type NotificationDTO = {
  message: string
}

export type NotificationEvent = WebSocketMessage<NotificationDTO>;
