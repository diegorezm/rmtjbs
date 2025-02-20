import React, { createContext, useContext, useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { AUTH_TOKEN_KEY } from "~/features/auth/constants";
import { useAuthContext } from "./auth-provider";


const SocketClientContext = createContext<Client | null>(null);

type StompClientProviderProps = {
  children: React.ReactNode;
};

export const SocketClientProvider = ({ children }: StompClientProviderProps) => {
  const { user, isLoading } = useAuthContext()
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    if (!user && !isLoading) return
    let isMounted = true
    const isDev = process.env.NODE_ENV === "development";
    const SOCKET_URL = isDev ? "ws://localhost:8080/ws" : "/ws";

    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      console.error("No auth token found. Cannot connect to WebSocket.");
      return;
    }

    // Use SockJS as a fallback for WebSocket
    const stompClient = new Client({
      brokerURL: SOCKET_URL,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
    });

    // Lifecycle handlers
    stompClient.onConnect = (frame) => {
      if (!isMounted) return
      console.log("Connected to WebSocket:", frame);
      setClient(stompClient);
    };

    stompClient.onDisconnect = () => {
      console.log("Disconnected from WebSocket");
      setClient(null);
    };

    stompClient.onStompError = (frame) => {
      console.error("Broker reported error:", frame.headers["message"]);
      console.error("Additional details:", frame.body);
    };

    stompClient.activate();

    // TODO: this guy keeps closing randomly
    return () => {
      stompClient.deactivate();
      isMounted = false
    };
  }, [user, isLoading]);

  return (
    <SocketClientContext.Provider value={client}>
      {children}
    </SocketClientContext.Provider>
  );
};

export const useSocketClient = () => {
  const stompClient = useContext(SocketClientContext);
  if (!stompClient) {
    throw new Error("useSocketClient must be used within a SocketClientProvider");
  }
  return stompClient;
};

