package com.rmtjb.api.domain.chat;

import java.util.UUID;

public record ChatMessageRequestDTO(UUID chatId, UUID userId, String content) {}
