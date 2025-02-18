package com.rmtjb.api.services;

import com.rmtjb.api.domain.candidate.Candidate;
import com.rmtjb.api.domain.exception.EntityAlreadyExistsException;
import com.rmtjb.api.domain.exception.EntityNotFoundException;
import com.rmtjb.api.domain.exception.UnauthorizedException;
import com.rmtjb.api.domain.job.JobApplication;
import com.rmtjb.api.domain.job.JobPosting;
import com.rmtjb.api.domain.job.UpdateJobApplicationStatusDTO;
import com.rmtjb.api.repositories.CandidateRepository;
import com.rmtjb.api.repositories.JobApplicationRepository;
import com.rmtjb.api.repositories.JobPostingRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobApplicationService {
  private final JobApplicationRepository jobApplicationRepository;
  private final JobPostingRepository jobPostingRepository;
  private final CandidateRepository candidateRepository;

  @Transactional
  public void apply(UUID candidateID, UUID jobID) {
    Candidate candidate =
        this.candidateRepository
            .findById(candidateID)
            .orElseThrow(() -> new EntityNotFoundException("Candidate not found."));
    if (candidate.getResumeKey() == null || candidate.getResumeKey().isBlank()) {
      throw new UnauthorizedException("You have to have a resume uploaded to be able to apply");
    }
    JobPosting jobPosting =
        this.jobPostingRepository
            .findById(jobID)
            .orElseThrow(() -> new EntityNotFoundException("Job not found."));

    var alreadyApplied =
        jobApplicationRepository.findByCandidateIdAndJobPostingId(
            candidate.getId(), jobPosting.getId());

    if (alreadyApplied.isPresent())
      throw new EntityAlreadyExistsException("You have already applied to this job.");

    JobApplication application = new JobApplication();
    application.setCandidate(candidate);
    application.setJobPosting(jobPosting);
    jobApplicationRepository.save(application);
  }

  public List<JobApplication> getApplicationsByCandidate(UUID candidateId) {
    Candidate candidate =
        candidateRepository
            .findById(candidateId)
            .orElseThrow(() -> new EntityNotFoundException("Candidate not found."));
    return jobApplicationRepository.findAllByCandidateId(candidate.getId());
  }

  public List<JobApplication> getApplicantsByJob(UUID jobId) {
    JobPosting job =
        jobPostingRepository
            .findById(jobId)
            .orElseThrow(() -> new IllegalArgumentException("Job not found"));
    return jobApplicationRepository.findAllByJobPostingId(job.getId());
  }

  public void updateStatus(UpdateJobApplicationStatusDTO dto, UUID applicationId, UUID companyId) {
    var application = this.findById(applicationId);
    if (!application.getJobPosting().getCompany().getId().equals(companyId))
      throw new UnauthorizedException("You are not allowed to do this.");
    application.setStatus(dto.status());
    this.jobApplicationRepository.save(application);
  }

  public JobApplication findById(UUID applicationID) {
    return this.jobApplicationRepository
        .findById(applicationID)
        .orElseThrow(() -> new EntityNotFoundException("Application not found."));
  }
}
