import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Chat, ChatMessageResponseDTO, ChatResponseDTO, Message } from "./types";
import { api } from "~/lib/axios";

export const useChatsQuery = () => {
  return useQuery<ChatResponseDTO[], Error>(
    ['chats'],
    async () => {
      const response = await api.get('/chats');
      return response.data;
    }
  );
};

export const useChatMessagesQuery = (chatId: string) => {
  return useQuery<ChatMessageResponseDTO[], Error>(
    ['chatMessages', chatId],
    async () => {
      const response = await api.get(`/chats/${chatId}/messages`);
      return response.data;
    },
    {
      enabled: !!chatId,
    }
  );
};

type SendMessageData = {
  chatId: string;
  content: string;
};

export const useSendMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Message, Error, SendMessageData>(
    async (data) => {
      const response = await api.post(`/chats/${data.chatId}/messages`, {
        content: data.content,
      });
      return response.data;
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['chatMessages', variables.chatId]);
      },
    }
  );
};

type CreateChatData = {
  chatterTwoId: string;
};

export const useCreateChatMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Chat, Error, CreateChatData>(
    async (data) => {
      const response = await api.post('/chats', null, {
        params: {
          chatterTwoId: data.chatterTwoId,
        },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['chats']);
      },
    }
  );
};
