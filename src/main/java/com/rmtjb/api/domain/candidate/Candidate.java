package com.rmtjb.api.domain.candidate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.rmtjb.api.domain.job.JobApplication;
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
  @JsonIgnore
  private User user;

  private String profilePictureKey;
  private String resumeKey;
  private String phone;

  @ElementCollection @JsonManagedReference private List<String> jobPreferences;

  @OneToMany(mappedBy = "candidate", cascade = CascadeType.ALL)
  private List<JobApplication> applications;

  public Candidate(CandidateDTO dto) {
    this.phone = dto.phone();
    this.jobPreferences = dto.jobPreferences();
    this.profilePictureKey = dto.profilePictureKey().orElse("");
    this.resumeKey = dto.resumeKey().orElse("");
  }
}
