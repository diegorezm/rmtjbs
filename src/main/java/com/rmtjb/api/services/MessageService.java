package com.rmtjb.api.services;

import com.rmtjb.api.domain.chat.Chat;
import com.rmtjb.api.domain.chat.Message;
import com.rmtjb.api.domain.exception.EntityNotFoundException;
import com.rmtjb.api.domain.exception.UnauthorizedException;
import com.rmtjb.api.domain.user.User;
import com.rmtjb.api.repositories.ChatRepository;
import com.rmtjb.api.repositories.MessageRepository;
import com.rmtjb.api.repositories.UserRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageService {

  private final MessageRepository messageRepository;

  private final ChatRepository chatRepository;

  private final UserRepository userRepository;

  @Transactional
  public Message sendMessage(UUID chatId, UUID chatterId, String content) {
    Chat chat =
        chatRepository
            .findById(chatId)
            .orElseThrow(() -> new EntityNotFoundException("Chat not found: " + chatId));

    User chatter =
        userRepository
            .findById(chatterId)
            .orElseThrow(() -> new EntityNotFoundException("User not found: " + chatterId));

    // Ensure the user is part of the chat
    if (!chat.getChatterOne().getId().equals(chatterId)
        && !chat.getChatterTwo().getId().equals(chatterId)) {
      throw new UnauthorizedException("User is not part of this chat");
    }

    // Create and save the message
    Message message = new Message();
    message.setChat(chat);
    message.setChatter(chatter);
    message.setContent(content);
    message.setCreatedAt(LocalDateTime.now());
    message.setUpdatedAt(LocalDateTime.now());

    return messageRepository.save(message);
  }

  public List<Message> getMessagesForChat(UUID chatId) {
    Chat chat =
        chatRepository
            .findById(chatId)
            .orElseThrow(() -> new EntityNotFoundException("Chat not found: " + chatId));

    Sort sortBy = Sort.by(Sort.Direction.ASC, "createdAt");
    return messageRepository.findByChatId(chat.getId(), sortBy);
  }

  @Transactional
  public Message updateMessage(UUID messageId, String content) {
    Message message =
        messageRepository
            .findById(messageId)
            .orElseThrow(() -> new EntityNotFoundException("Message not found: " + messageId));

    message.setContent(content);
    message.setUpdatedAt(LocalDateTime.now());
    return messageRepository.save(message);
  }

  @Transactional
  public void deleteMessage(UUID messageId, UUID chatterId) {
    Message message =
        messageRepository
            .findById(messageId)
            .orElseThrow(() -> new EntityNotFoundException("Message not found: " + messageId));
    if (message.getChatter().getId().equals(chatterId)) {
      messageRepository.delete(message);
    }
    throw new UnauthorizedException("You are not the owner of this message.");
  }
}
