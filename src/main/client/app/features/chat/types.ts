import type { User } from "../auth/types";
import type { WebSocketMessage } from "../types";

export type Chat = {
  id: string;
  chatterOne: User;
  chatterTwo: User;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
};

export type ChatResponseDTO = {
  id: string,
  chatterId: string,
  chatterName: string,
  chatterProfilePic: string,
  lastMessage?: string | null,
  createdAt: string
}

export type Message = {
  id: string;
  chatId: string;
  chatter: User;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type ChatMessageDTO = {
  chatId: string;
  content: string;
};

export type NewMessageEvent = WebSocketMessage<Message>;

export type ChatMessageResponseDTO = {
  id: string,
  chatId: string,
  chatterId: string,
  chatterName: string,
  chatterProfilePic: string,
  message: string,
  createdAt: string
}
