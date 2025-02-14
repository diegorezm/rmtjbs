package com.rmtjb.api.services;

import com.rmtjb.api.domain.candidate.Candidate;
import com.rmtjb.api.domain.candidate.CandidateDTO;
import com.rmtjb.api.domain.user.User;
import com.rmtjb.api.repositories.CandidateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CandidateService {
  private final CandidateRepository candidateRepository;

  public void save(CandidateDTO dto, User user) {
    Candidate candidate = new Candidate(dto);
    candidate.setUser(user);
    this.candidateRepository.save(candidate);
  }
}
