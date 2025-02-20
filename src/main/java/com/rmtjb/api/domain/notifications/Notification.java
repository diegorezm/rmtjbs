package com.rmtjb.api.domain.notifications;

import com.rmtjb.api.domain.user.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "rmtjbs_notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

  @Id @GeneratedValue private UUID id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @Column(nullable = false)
  private String message;

  @Column(nullable = false)
  private boolean isRead = false;

  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt = LocalDateTime.now();
}
