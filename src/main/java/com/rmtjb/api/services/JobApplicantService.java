package com.rmtjb.api.services;

import com.rmtjb.api.repositories.JobApplicantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobApplicantService {
  private final JobApplicantRepository jobApplicantRepository;
}
