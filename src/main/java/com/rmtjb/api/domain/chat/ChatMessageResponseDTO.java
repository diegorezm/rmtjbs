package com.rmtjb.api.domain.chat;

import java.time.LocalDateTime;
import java.util.UUID;

public record ChatMessageResponseDTO(
    UUID id,
    UUID chatId,
    UUID chatterId,
    String chatterName,
    String chatterProfilePic,
    String message,
    LocalDateTime createdAt) {}
