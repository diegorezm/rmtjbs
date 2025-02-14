package com.rmtjb.api.domain.user;

import java.time.LocalDateTime;
import java.util.UUID;

public record UserSafe(
    UUID id, String email, String name, LocalDateTime createdAt, LocalDateTime updatedAt) {}
