package com.rmtjb.api.repositories;

import com.rmtjb.api.domain.chat.Message;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, UUID> {
  List<Message> findByChatId(UUID chatId, Sort sortBy);
}
