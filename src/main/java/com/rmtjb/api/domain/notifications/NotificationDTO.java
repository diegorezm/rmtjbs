package com.rmtjb.api.domain.notifications;

import java.time.LocalDateTime;

/** NotificationDTO */
public record NotificationDTO(String message, LocalDateTime createdAt) {}
