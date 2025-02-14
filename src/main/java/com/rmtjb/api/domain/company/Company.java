package com.rmtjb.api.domain.company;

import com.rmtjb.api.domain.user.User;
import jakarta.persistence.*;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "rmtjbs_companies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Company {
  @Id @GeneratedValue private UUID id;

  @OneToOne
  @JoinColumn(name = "user_id", nullable = false, unique = true)
  private User user;

  private String location;
  private String logoKey;
  private String bannerKey;

  public Company(CompanyDTO dto) {
    this.location = dto.location();
    this.logoKey = dto.logoKey().orElse("");
    this.bannerKey = dto.bannerKey().orElse("");
  }
}
