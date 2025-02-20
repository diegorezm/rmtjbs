package com.rmtjb.api.repositories;

import com.rmtjb.api.domain.chat.Chat;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, UUID> {
  Optional<Chat> findByChatterOneIdAndChatterTwoId(UUID chatterOne, UUID chatterTwo);

  List<Chat> findByChatterOneIdOrChatterTwoId(UUID chatterOne, UUID chatterTwo);
}
