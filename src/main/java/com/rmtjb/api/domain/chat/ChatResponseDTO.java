package com.rmtjb.api.domain.chat;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public record ChatResponseDTO(
    UUID id,
    UUID chatterId,
    String chatterName,
    String chatterProfilePic,
    Optional<String> lastMessage,
    LocalDateTime createdAt) {}
