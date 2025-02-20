package com.rmtjb.api.services;

import com.rmtjb.api.domain.exception.EntityNotFoundException;
import com.rmtjb.api.domain.notifications.Notification;
import com.rmtjb.api.domain.user.User;
import com.rmtjb.api.repositories.NotificationRepository;
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
public class NotificationService {
  private final NotificationRepository notificationRepository;
  private final UserRepository userRepository;

  @Transactional
  public Notification createNotification(UUID userId, String message) {
    User user =
        userRepository
            .findById(userId)
            .orElseThrow(() -> new EntityNotFoundException("User not found: " + userId));

    Notification notification = new Notification();
    notification.setUser(user);
    notification.setMessage(message);
    notification.setCreatedAt(LocalDateTime.now());

    return notificationRepository.save(notification);
  }

  public List<Notification> getNotificationsForUser(UUID userId) {
    Sort sortBy = Sort.by(Sort.Direction.DESC, "created_at");
    return notificationRepository.findByUserId(userId, sortBy);
  }

  public List<Notification> getUnreadNotificationsForUser(UUID userId) {
    Sort sortBy = Sort.by(Sort.Direction.DESC, "createdAt");
    return notificationRepository.findByUserIdAndIsReadFalse(userId, sortBy);
  }

  @Transactional
  public Notification markAsRead(UUID notificationId) {
    Notification notification =
        notificationRepository
            .findById(notificationId)
            .orElseThrow(() -> new RuntimeException("Notification not found: " + notificationId));

    notification.setRead(true);
    return notificationRepository.save(notification);
  }

  @Transactional
  public void deleteNotification(UUID notificationId) {
    Notification notification =
        notificationRepository
            .findById(notificationId)
            .orElseThrow(() -> new RuntimeException("Notification not found: " + notificationId));

    notificationRepository.delete(notification);
  }
}
