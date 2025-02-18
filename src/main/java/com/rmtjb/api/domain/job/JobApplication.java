package com.rmtjb.api.domain.job;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.rmtjb.api.domain.candidate.Candidate;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "rmtjbs_job_applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobApplication {
  @Id @GeneratedValue private UUID id;

  @ManyToOne
  @JoinColumn(name = "candidate_id", nullable = false)
  @JsonBackReference
  private Candidate candidate;

  @ManyToOne
  @JoinColumn(name = "job_posting_id", nullable = false)
  private JobPosting jobPosting;

  private LocalDateTime appliedAt = LocalDateTime.now();

  @Enumerated(EnumType.STRING)
  private JobApplicationStatus status = JobApplicationStatus.PENDING;
}
