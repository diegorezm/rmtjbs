import { Client } from "@stomp/stompjs";
import { AUTH_TOKEN_KEY } from "~/features/auth/constants";

export function getStompClient() {
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
    console.log("Connected to WebSocket:", frame);
  };

  stompClient.onDisconnect = () => {
    console.log("Disconnected from WebSocket");
  };

  stompClient.onStompError = (frame) => {
    console.error("Broker reported error:", frame.headers["message"]);
    console.error("Additional details:", frame.body);
  };

  stompClient.activate();
  return stompClient
}
