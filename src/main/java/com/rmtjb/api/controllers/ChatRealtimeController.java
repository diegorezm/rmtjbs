package com.rmtjb.api.controllers;

import com.rmtjb.api.domain.chat.Chat;
import com.rmtjb.api.domain.chat.ChatMessageRequestDTO;
import com.rmtjb.api.domain.chat.ChatMessageResponseDTO;
import com.rmtjb.api.domain.chat.Message;
import com.rmtjb.api.domain.notifications.Notification;
import com.rmtjb.api.domain.notifications.NotificationDTO;
import com.rmtjb.api.domain.notifications.NotificationFetchDTO;
import com.rmtjb.api.domain.user.UserRoles;
import com.rmtjb.api.services.ChatService;
import com.rmtjb.api.services.MessageService;
import com.rmtjb.api.services.NotificationService;
import com.rmtjb.api.services.UserService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

// WARNING: THIS WHOLE THING IS VERY UNSAFE
// DO NOT DEPLOY IT
@Controller
@RequiredArgsConstructor
public class ChatRealtimeController {
  private final SimpMessagingTemplate messagingTemplate;
  private final ChatService chatService;
  private final MessageService messageService;
  private final NotificationService notificationService;
  private final UserService userService;

  @MessageMapping("/chat.sendMessage")
  public void sendMessage(@Payload ChatMessageRequestDTO request) {
    var user = userService.findById(request.userId());

    Message message = messageService.sendMessage(request.chatId(), user.getId(), request.content());
    ChatMessageResponseDTO response;
    var chatter = message.getChatter();

    String profilePic;

    if (chatter.getRole().equals(UserRoles.CANDIDATE)) {
      profilePic = chatter.getCandidate().getProfilePictureKey();
    } else if (chatter.getRole().equals(UserRoles.CANDIDATE)) {
      profilePic = chatter.getCompany().getLogoKey();
    } else {
      profilePic = "";
    }

    response =
        new ChatMessageResponseDTO(
            message.getId(),
            message.getChat().getId(),
            chatter.getId(),
            chatter.getName(),
            profilePic,
            message.getContent(),
            message.getCreatedAt());

    messagingTemplate.convertAndSend("/topic/chat/" + request.chatId(), response);

    // Notify the recipient
    Chat chat = chatService.getChatById(request.chatId());

    UUID recipientId =
        chat.getChatterOne().getId().equals(user.getId())
            ? chat.getChatterTwo().getId()
            : chat.getChatterOne().getId();

    String recipientEmaiil =
        chat.getChatterOne().getId().equals(user.getId())
            ? chat.getChatterTwo().getUsername()
            : chat.getChatterOne().getUsername();

    notificationService.createNotification(
        recipientId, "You have a new message from " + user.getUsername());

    messagingTemplate.convertAndSendToUser(
        recipientEmaiil,
        "/queue/notifications",
        new NotificationDTO(
            "You have a new message from " + user.getUsername(), LocalDateTime.now()));
  }

  @MessageMapping("/notifications.fetch")
  public void fetchUnreadNotifications(@Payload NotificationFetchDTO dto) {
    var userId = dto.userId();

    List<Notification> unreadNotifications =
        notificationService.getUnreadNotificationsForUser(userId);

    unreadNotifications.forEach(
        notification -> {
          messagingTemplate.convertAndSendToUser(
              userId.toString(),
              "/queue/notifications",
              new NotificationDTO(notification.getMessage(), notification.getCreatedAt()));

          // Mark the notification as read
          notificationService.markAsRead(notification.getId());
        });
  }
}
