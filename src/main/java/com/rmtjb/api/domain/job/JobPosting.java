package com.rmtjb.api.domain.job;

import com.rmtjb.api.domain.company.Company;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "rmtjbs_job_postings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobPosting {
  @Id @GeneratedValue private UUID id;

  private String title;

  @Column(nullable = false, length = 1000) // Set max length to 1000
  private String description;

  private BigDecimal salary;
  private LocalDateTime expiresAt;

  private LocalDateTime createdAt = LocalDateTime.now();
  private LocalDateTime updatedAt = LocalDateTime.now();

  @ManyToOne
  @JoinColumn(name = "company_id", nullable = false)
  private Company company;

  private List<String> skills;

  public JobPosting(JobPostDTO dto) {
    this.title = dto.title();
    this.description = dto.description();
    this.salary = dto.salary().orElse(BigDecimal.ONE);
    this.expiresAt = dto.expiresAt();
    this.skills = dto.skills().orElse(new ArrayList<String>());
  }
}
