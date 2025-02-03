package com.rmtjb.api.domain.job;

import com.rmtjb.api.domain.candidate.Candidate;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "rmtjbs_job_applicants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobApplicant {
    @Id @GeneratedValue private UUID id;

    @ManyToOne
    @JoinColumn(name = "candidate_id", nullable = false)
    private Candidate candidate;

    @ManyToOne
    @JoinColumn(name = "job_posting_id", nullable = false)
    private JobPosting jobPosting;

    private LocalDateTime appliedAt = LocalDateTime.now();
}
