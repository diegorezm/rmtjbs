import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import { AUTH_TOKEN_KEY } from "~/features/auth/constants";

type UseWebSocketReturn = {
  stompClient: Client | null;
  isConnected: boolean;
};

export const useWebSocket = (): UseWebSocketReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    const isDev = process.env.NODE_ENV === "development";
    const SOCKET_URL = isDev ? "ws://localhost:8080/ws" : "/ws";

    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      console.error("No auth token found. Cannot connect to WebSocket.");
      return;
    }

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

    // Lifecycle Handlers
    stompClient.onConnect = () => {
      console.log("Connected to WebSocket");
      setIsConnected(true);
    };

    stompClient.onDisconnect = () => {
      console.log("Disconnected from WebSocket");
      setIsConnected(false);
    };

    stompClient.onStompError = (frame) => {
      console.error("Broker reported error:", frame.headers["message"]);
      console.error("Additional details:", frame.body);
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      console.log("Deactivating WebSocket...");
      stompClient.deactivate();
      stompClientRef.current = null;
    };
  }, []);

  return {
    stompClient: stompClientRef.current,
    isConnected,
  };
};
