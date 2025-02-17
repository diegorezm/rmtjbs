package com.rmtjb.api.services;

import com.rmtjb.api.domain.candidate.Candidate;
import com.rmtjb.api.domain.candidate.CandidateDTO;
import com.rmtjb.api.domain.exception.EntityNotFoundException;
import com.rmtjb.api.domain.exception.UnauthorizedException;
import com.rmtjb.api.domain.user.User;
import com.rmtjb.api.domain.user.UserRoles;
import com.rmtjb.api.repositories.CandidateRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

  public void update(CandidateDTO dto) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = (User) authentication.getPrincipal();
    if (user.getRole().equals(UserRoles.CANDIDATE)) {
      Candidate candidate = this.findByUserId(user.getId());
      candidate.setPhone(dto.phone());
      candidate.setJobPreferences(dto.jobPreferences());

      if (dto.profilePictureKey().isPresent()) {
        candidate.setProfilePictureKey(dto.profilePictureKey().get());
      }

      if (dto.resumeKey().isPresent()) {
        candidate.setResumeKey(dto.resumeKey().get());
      }
      this.candidateRepository.save(candidate);
    } else {
      throw new UnauthorizedException("This user is not a candidate.");
    }
  }
}
