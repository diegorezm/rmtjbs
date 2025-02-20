package com.rmtjb.api.domain.job;

import com.rmtjb.api.domain.candidate.Candidate;
import java.util.UUID;

public record JobApplicationResponseDTO(
    Candidate candidate,
    String name,
    String email,
    JobApplicationStatus status,
    UUID id,
    UUID userId) {}
