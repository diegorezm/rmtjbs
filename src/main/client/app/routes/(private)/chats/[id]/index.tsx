import { useEffect, useState } from "react";
import type { Route } from "./+types/index";
import { useChatMessagesQuery } from "~/features/chat/api";
import { AlertError } from "~/components/alert";
import { Spinner } from "~/components/spinner";
import { ChatMessageInput } from "./_components/message-input";
import type { ChatMessageResponseDTO } from "~/features/chat/types";
import { useAuthContext } from "~/providers/auth-provider";
import { formatDistanceToNow } from "date-fns";
import { useWebSocket } from "~/hooks/use-websocket";

export default function ChatPage({ params }: Route.MetaArgs) {
  const { isLoading: isChatMessagesLoading, isError: isChatsMessagesError, data: chatMessages, error: chatMessagesError } = useChatMessagesQuery(params.chatId);
  const [messages, setMessages] = useState<ChatMessageResponseDTO[]>([]);
  const { user } = useAuthContext()
  const { stompClient } = useWebSocket()

  useEffect(() => {
    if (!stompClient || !params.chatId) return;

    const subscription = stompClient.subscribe(`/topic/chat/${params.chatId}`, (message) => {
      const receivedMessage = JSON.parse(message.body)
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [stompClient, params.chatId]);

  useEffect(() => {
    if (!isChatMessagesLoading && !isChatsMessagesError) {
      setMessages(chatMessages);
    }
  }, [isChatMessagesLoading, isChatsMessagesError, chatMessages]);

  const handleSendMessage = (content: string) => {
    if (!stompClient || !params.chatId) return;
    if (!user) {
      console.log("User is null")
      return
    }

    stompClient.publish({
      destination: "/app/chat.sendMessage",
      body: JSON.stringify({ chatId: params.chatId, userId: user?.id, content }),
    });
  };

  if (isChatMessagesLoading) {
    return <Spinner />;
  }

  if (isChatsMessagesError) {
    return <AlertError message={chatMessagesError.message} />;
  }

  return (
    <div className="w-full m-auto h-[88vh] md:h-full flex flex-col justify-between items-center">
      {/* Chat Messages */}
      <div className="flex-grow justify-start items-start w-full lg:w-1/2">
        {messages.length === 0 ? (
          <p className="text-2xl font-bold">No messages yet.</p>
        ) : (
          messages.map((message) => (
            <ChatMessage message={message} currentUserId={user?.id || ""} key={message.id} />
          ))
        )}
      </div>

      <ChatMessageInput handleSendMessage={handleSendMessage} />
    </div>
  );
}


const ChatMessage = ({ message, currentUserId }: { message: ChatMessageResponseDTO, currentUserId: string }) => {
  const isCurrentUser = message.chatterId === currentUserId
  const date = new Date(message.createdAt)
  const formattedDate = formatDistanceToNow(date)

  return (
    <div className={`chat ${isCurrentUser ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-header">
        {message.chatterName}
        <time className="text-xs opacity-50">{formattedDate}</time>
      </div>
      <div className="chat-bubble">{message.message}</div>
    </div>
  )
}
