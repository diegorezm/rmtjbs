package com.rmtjb.api.domain.user;

import com.rmtjb.api.domain.auth.RegisterDTO;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "rmtjbs_users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
  @Id @GeneratedValue private UUID id;

  private String name;

  @Column(unique = true, nullable = false)
  private String email;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @Column(nullable = false)
  private LocalDateTime updatedAt = LocalDateTime.now();

  public User(RegisterDTO payload) {
    this.name = payload.name();
    this.password = payload.password();
    this.email = payload.email();
  }

  public UserSafe toUserSafe() {
    return new UserSafe(this.id, this.email, this.name, this.createdAt, this.updatedAt);
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority("ROLE_USER"));
  }

  @Override
  public String getUsername() {
    return this.email;
  }
}
