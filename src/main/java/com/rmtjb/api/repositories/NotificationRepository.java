package com.rmtjb.api.repositories;

import com.rmtjb.api.domain.notifications.Notification;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, UUID> {
  List<Notification> findByUserId(UUID userId, Sort sortBy);

  List<Notification> findByUserIdAndIsReadFalse(UUID userId, Sort sortBy);
}
