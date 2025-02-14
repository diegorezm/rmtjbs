package com.rmtjb.api.domain.candidate;

import com.rmtjb.api.domain.user.User;
import jakarta.persistence.*;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "rmtjbs_candidates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Candidate {
  @Id @GeneratedValue private UUID id;

  @OneToOne
  @JoinColumn(name = "user_id", nullable = false, unique = true)
  private User user;

  private String profilePictureKey;
  private String resumeKey;
  private String phone;

  @ElementCollection private List<String> jobPreferences;

  public Candidate(CandidateDTO dto) {
    this.phone = dto.phone();
    this.jobPreferences = dto.preferences();
    this.profilePictureKey = dto.profilePictureKey().orElse("");
    this.resumeKey = dto.resumeKey().orElse("");
  }
}
