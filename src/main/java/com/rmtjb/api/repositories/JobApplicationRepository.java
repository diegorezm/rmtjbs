package com.rmtjb.api.repositories;

import com.rmtjb.api.domain.job.JobApplication;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobApplicationRepository extends JpaRepository<JobApplication, UUID> {
  Boolean existsByCandidateId(UUID id);

  Optional<JobApplication> findByCandidateIdAndJobPostingId(UUID candidateId, UUID jobPostingId);

  List<JobApplication> findAllByCandidateId(UUID candidateId);

  List<JobApplication> findAllByJobPostingId(UUID jobPostingId);
}
