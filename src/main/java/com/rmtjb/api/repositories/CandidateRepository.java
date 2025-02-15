package com.rmtjb.api.repositories;

import com.rmtjb.api.domain.candidate.Candidate;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepository extends JpaRepository<Candidate, UUID> {
  Optional<Candidate> findByUserId(UUID id);
}
