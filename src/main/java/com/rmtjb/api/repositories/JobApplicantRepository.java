package com.rmtjb.api.repositories;

import com.rmtjb.api.domain.job.JobApplicant;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobApplicantRepository extends JpaRepository<JobApplicant, UUID> {
  Boolean existsByCandidateId(UUID id);
}
