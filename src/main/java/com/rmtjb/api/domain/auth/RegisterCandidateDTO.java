package com.rmtjb.api.domain.auth;

import com.rmtjb.api.domain.candidate.CandidateDTO;

/** RegisterCompanyDTO */
public record RegisterCandidateDTO(RegisterDTO userDTO, CandidateDTO candidateDTO) {}
