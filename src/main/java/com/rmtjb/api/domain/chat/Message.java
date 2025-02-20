package com.rmtjb.api.domain.chat;

import com.rmtjb.api.domain.user.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "rmtjbs_messages")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message {
  @Id @GeneratedValue private UUID id;

  @ManyToOne
  @JoinColumn(name = "chatter_id", nullable = false)
  private User chatter;

  @ManyToOne
  @JoinColumn(name = "chat_id", nullable = false)
  private Chat chat;

  private String content;

  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @Column(nullable = false)
  private LocalDateTime updatedAt = LocalDateTime.now();
}
