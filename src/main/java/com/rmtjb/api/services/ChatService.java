package com.rmtjb.api.services;

import com.rmtjb.api.domain.chat.Chat;
import com.rmtjb.api.domain.exception.EntityNotFoundException;
import com.rmtjb.api.domain.user.User;
import com.rmtjb.api.repositories.ChatRepository;
import com.rmtjb.api.repositories.UserRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatService {
  private final ChatRepository chatRepository;
  private final UserRepository userRepository;

  @Transactional
  public Chat createChat(UUID chatterOneId, UUID chatterTwoId) {
    User chatterOne =
        userRepository
            .findById(chatterOneId)
            .orElseThrow(() -> new EntityNotFoundException("User not found: " + chatterOneId));
    User chatterTwo =
        userRepository
            .findById(chatterTwoId)
            .orElseThrow(() -> new EntityNotFoundException("User not found: " + chatterTwoId));

    // Check if a chat already exists between these users
    Chat existingChat =
        chatRepository
            .findByChatterOneIdAndChatterTwoId(chatterOne.getId(), chatterTwo.getId())
            .orElse(null);

    if (existingChat != null) {
      return existingChat; // Return the existing chat
    }

    // Create a new chat
    Chat chat = new Chat();
    chat.setChatterOne(chatterOne);
    chat.setChatterTwo(chatterTwo);
    chat.setCreatedAt(LocalDateTime.now());
    chat.setUpdatedAt(LocalDateTime.now());

    return chatRepository.save(chat);
  }

  // Get all chats for a user
  public List<Chat> getChatsForUser(UUID userId) {
    User user =
        userRepository
            .findById(userId)
            .orElseThrow(() -> new EntityNotFoundException("User not found: " + userId));

    return chatRepository.findByChatterOneIdOrChatterTwoId(user.getId(), user.getId());
  }

  // Get a chat by its ID
  public Chat getChatById(UUID chatId) {
    return chatRepository
        .findById(chatId)
        .orElseThrow(() -> new EntityNotFoundException("Chat not found: " + chatId));
  }

  // Update the chat's updatedAt timestamp
  @Transactional
  public Chat updateChatTimestamp(UUID chatId) {
    Chat chat =
        chatRepository
            .findById(chatId)
            .orElseThrow(() -> new EntityNotFoundException("Chat not found: " + chatId));

    chat.setUpdatedAt(LocalDateTime.now());
    return chatRepository.save(chat);
  }
}
