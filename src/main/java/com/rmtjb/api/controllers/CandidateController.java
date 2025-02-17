package com.rmtjb.api.controllers;

import com.rmtjb.api.domain.candidate.CandidateDTO;
import com.rmtjb.api.services.CandidateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/candidates")
@RequiredArgsConstructor
public class CandidateController {
  private final CandidateService candidateService;

  @PutMapping
  public ResponseEntity<?> update(@RequestBody CandidateDTO dto) {
    candidateService.update(dto);
    return ResponseEntity.ok().build();
  }
}
