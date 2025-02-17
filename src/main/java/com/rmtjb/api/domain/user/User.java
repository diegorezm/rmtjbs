package com.rmtjb.api.domain.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.rmtjb.api.domain.auth.RegisterDTO;
import com.rmtjb.api.domain.candidate.Candidate;
import com.rmtjb.api.domain.company.Company;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity(name = "user")
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

  @Enumerated(EnumType.STRING)
  private UserRoles role;

  @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, optional = true)
  @JsonManagedReference
  private Candidate candidate;

  @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, optional = true)
  @JsonBackReference
  private Company company;

  public User(RegisterDTO payload) {
    this.name = payload.name();
    this.password = payload.password();
    this.email = payload.email();
  }

  public UserSafe toUserSafe() {
    return new UserSafe(
        this.id,
        this.email,
        this.name,
        this.role,
        Optional.ofNullable(this.company),
        Optional.ofNullable(this.candidate),
        this.createdAt,
        this.updatedAt);
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    if (!this.role.equals(UserRoles.ADMIN)) return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"));
  }

  @Override
  public String getUsername() {
    return this.email;
  }

  @Override
  public String toString() {
    return "\nname: " + this.name + "\nemail: " + this.email + "\nrole: " + this.role.toString();
  }
}
