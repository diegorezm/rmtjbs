import React, { createContext, useContext, useEffect, useState } from "react";
import type { Notification } from "~/features/notification/types";
import { useAuthContext } from "./auth-provider";
import { GlobalSpinner } from "~/components/global-spinner";
import { useSocketClient } from "./websocket-provider";

type NotificationContextType = {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuthContext();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const stompClient = useSocketClient();

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [...prev, notification]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  useEffect(() => {
    if (isLoading || !user) {
      return;
    }

    if (stompClient) {
      stompClient.subscribe(`/user/queue/notifications`, (message) => {
        const notification: Notification = JSON.parse(message.body);
        addNotification(notification);
      });
    }

    return () => {
      if (stompClient) {
        stompClient.unsubscribe(`/user/queue/notifications`);
      }
    };
  }, [isLoading, user, stompClient]);

  if (isLoading) {
    return <GlobalSpinner />;
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
