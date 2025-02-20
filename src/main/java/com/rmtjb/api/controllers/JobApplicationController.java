package com.rmtjb.api.controllers;

import com.rmtjb.api.domain.candidate.Candidate;
import com.rmtjb.api.domain.exception.UnauthorizedException;
import com.rmtjb.api.domain.job.JobApplication;
import com.rmtjb.api.domain.job.UpdateJobApplicationStatusDTO;
import com.rmtjb.api.domain.user.User;
import com.rmtjb.api.domain.user.UserRoles;
import com.rmtjb.api.services.JobApplicationService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/job-application")
@RequiredArgsConstructor
public class JobApplicationController {
  private final JobApplicationService jobApplicationService;

  @PostMapping("/apply/{jobId}")
  public ResponseEntity<?> apply(@PathVariable UUID jobId) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = (User) authentication.getPrincipal();
    if (user.getRole().equals(UserRoles.CANDIDATE) && user.getCandidate() != null) {
      Candidate candidate = user.getCandidate();
      jobApplicationService.apply(candidate.getId(), jobId);
      return ResponseEntity.ok().build();
    }
    throw new UnauthorizedException("You are not a valid candidate.");
  }

  @GetMapping("/candidate")
  public ResponseEntity<List<JobApplication>> getApplicationsByCandidate() {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = (User) authentication.getPrincipal();

    if (user.getRole().equals(UserRoles.CANDIDATE) && user.getCandidate() != null) {
      Candidate candidate = user.getCandidate();
      List<JobApplication> applications =
          jobApplicationService.getApplicationsByCandidate(candidate.getId());
      return ResponseEntity.ok(applications);
    }
    throw new UnauthorizedException("You are not authorized to see this.");
  }

  @GetMapping("/job/{jobId}")
  public ResponseEntity<?> getApplicantsByJob(@PathVariable UUID jobId) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = (User) authentication.getPrincipal();
    if (user.getRole().equals(UserRoles.COMPANY) && user.getCompany() != null) {
      var c = user.getCompany();
      var applicants = jobApplicationService.getApplicantsByJob(c.getId(), jobId);
      return ResponseEntity.ok(applicants);
    }

    throw new UnauthorizedException("You are not authorized to see this.");
  }

  @PutMapping("/application/{applicationId}")
  public ResponseEntity<?> updateStatus(
      @PathVariable UUID applicationId, @RequestBody UpdateJobApplicationStatusDTO dto) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = (User) authentication.getPrincipal();
    if (user.getRole().equals(UserRoles.COMPANY) && user.getCompany() != null) {
      var company = user.getCompany();
      this.jobApplicationService.updateStatus(dto, applicationId, company.getId());
      return ResponseEntity.ok("Updated");
    }

    throw new UnauthorizedException("You are not authorized to see this.");
  }
}
