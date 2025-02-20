package com.rmtjb.api.domain.chat;

import com.rmtjb.api.domain.user.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "rmtjbs_chats")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Chat {
  @Id @GeneratedValue private UUID id;

  @ManyToOne
  @JoinColumn(name = "chatter_one_id", nullable = false)
  private User chatterOne;

  @ManyToOne
  @JoinColumn(name = "chatter_two_id", nullable = false)
  private User chatterTwo;

  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL)
  private List<Message> messages;

  @Column(nullable = false)
  private LocalDateTime updatedAt = LocalDateTime.now();
}
