package com.rmtjb.api.domain.user;

import com.rmtjb.api.domain.candidate.Candidate;
import com.rmtjb.api.domain.company.Company;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

public record UserSafe(
    UUID id,
    String email,
    String name,
    UserRoles role,
    Optional<Company> company,
    Optional<Candidate> candidate,
    LocalDateTime createdAt,
    LocalDateTime updatedAt) {}
