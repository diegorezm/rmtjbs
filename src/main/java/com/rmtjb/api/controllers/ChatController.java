package com.rmtjb.api.controllers;

import com.rmtjb.api.domain.chat.Chat;
import com.rmtjb.api.domain.chat.ChatMessageResponseDTO;
import com.rmtjb.api.domain.chat.ChatResponseDTO;
import com.rmtjb.api.domain.chat.Message;
import com.rmtjb.api.domain.user.User;
import com.rmtjb.api.domain.user.UserRoles;
import com.rmtjb.api.services.ChatService;
import com.rmtjb.api.services.MessageService;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chats")
@RequiredArgsConstructor
public class ChatController {
  private final ChatService chatService;
  private final MessageService messageService;

  @PostMapping
  public Chat createChat(@RequestParam UUID chatterTwoId) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = (User) authentication.getPrincipal();
    return chatService.createChat(user.getId(), chatterTwoId);
  }

  @GetMapping
  public List<ChatResponseDTO> getUserChats() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = (User) authentication.getPrincipal();

    List<ChatResponseDTO> response = new ArrayList<>();

    var chats = chatService.getChatsForUser(user.getId());
    chats.forEach(
        c -> {
          User chatter;

          if (c.getChatterOne().getId().equals(user.getId())) {
            chatter = c.getChatterTwo();
          } else {
            chatter = c.getChatterOne();
          }

          String profilePic;

          if (chatter.getRole().equals(UserRoles.CANDIDATE)) {
            profilePic = chatter.getCandidate().getProfilePictureKey();
          } else if (chatter.getRole().equals(UserRoles.CANDIDATE)) {
            profilePic = chatter.getCompany().getLogoKey();
          } else {
            profilePic = "";
          }
          var lastMessage = c.getMessages();
          var lastMessageContent =
              (lastMessage != null && !lastMessage.isEmpty())
                  ? lastMessage.get(lastMessage.size() - 1)
                  : null;

          var r =
              new ChatResponseDTO(
                  c.getId(),
                  chatter.getId(),
                  chatter.getName(),
                  profilePic,
                  lastMessageContent != null
                      ? Optional.ofNullable(lastMessageContent.getContent())
                      : Optional.empty(),
                  c.getCreatedAt());
          response.add(r);
        });
    return response;
  }

  @GetMapping("/{chatId}/messages")
  public List<ChatMessageResponseDTO> getMessagesForChat(@PathVariable UUID chatId) {
    List<ChatMessageResponseDTO> response = new ArrayList<>();

    var messages = messageService.getMessagesForChat(chatId);

    messages.forEach(
        e -> {
          var chatter = e.getChatter();

          String profilePic;

          if (chatter.getRole().equals(UserRoles.CANDIDATE)) {
            profilePic = chatter.getCandidate().getProfilePictureKey();
          } else if (chatter.getRole().equals(UserRoles.CANDIDATE)) {
            profilePic = chatter.getCompany().getLogoKey();
          } else {
            profilePic = "";
          }
          ChatMessageResponseDTO a =
              new ChatMessageResponseDTO(
                  e.getId(),
                  chatId,
                  chatter.getId(),
                  chatter.getName(),
                  profilePic,
                  e.getContent(),
                  e.getCreatedAt());
          response.add(a);
        });
    return response;
  }

  @PostMapping("/{chatId}/messages")
  public Message sendMessage(@PathVariable UUID chatId, @RequestParam String content) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = (User) authentication.getPrincipal();
    return messageService.sendMessage(chatId, user.getId(), content);
  }
}
