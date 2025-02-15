package com.rmtjb.api.services;

import com.rmtjb.api.domain.candidate.Candidate;
import com.rmtjb.api.domain.candidate.CandidateDTO;
import com.rmtjb.api.domain.exception.EntityNotFoundException;
import com.rmtjb.api.domain.user.User;
import com.rmtjb.api.repositories.CandidateRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CandidateService {
  private final CandidateRepository candidateRepository;

  public Candidate findByUserId(UUID userId) {
    return this.candidateRepository
        .findByUserId(userId)
        .orElseThrow(() -> new EntityNotFoundException("This candidate does not exist."));
  }

  public Candidate save(CandidateDTO dto, User user) {
    Candidate candidate = new Candidate(dto);
    candidate.setUser(user);
    return this.candidateRepository.save(candidate);
  }
}
