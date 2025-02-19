package com.rmtjb.api.services;

import com.rmtjb.api.domain.company.Company;
import com.rmtjb.api.domain.exception.EntityNotFoundException;
import com.rmtjb.api.domain.exception.UnauthorizedException;
import com.rmtjb.api.domain.job.JobPostDTO;
import com.rmtjb.api.domain.job.JobPosting;
import com.rmtjb.api.domain.user.User;
import com.rmtjb.api.repositories.CompanyRepository;
import com.rmtjb.api.repositories.JobPostingRepository;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobPostingService {
  private final JobPostingRepository jobPostingRepository;
  private final CompanyRepository companyRepository;

  public Page<JobPosting> findByCompanyIdAndKeyword(
      Pageable pageable, UUID companyID, String query) {
    return jobPostingRepository.findByCompanyIdAndKeyword(companyID, query, pageable);
  }

  public Page<JobPosting> findByCompanyId(Pageable pageable, UUID companyID) {
    return jobPostingRepository.findByCompanyId(companyID, pageable);
  }

  public Page<JobPosting> findAll(Pageable pageable) {
    return jobPostingRepository.findAll(pageable);
  }

  public Page<JobPosting> findAll(Pageable pageable, String query) {
    return jobPostingRepository.findByKeyword(query, pageable);
  }

  public Page<JobPosting> findByKeyword(Pageable pageable, String query) {
    return jobPostingRepository.findByKeyword(query, pageable);
  }

  public Page<JobPosting> findByKeywordAndPreferences(
      Pageable pageable, String[] skills, String query) {
    String[] pref =
        Arrays.stream(skills).map(skill -> "%" + skill.trim() + "%").toArray(String[]::new);
    return jobPostingRepository.findByKeywordAndSkill(query, pref, pageable);
  }

  public Page<JobPosting> findByPreferences(Pageable pageable, String[] skills) {
    String skillsString = String.join(",", skills);
    return jobPostingRepository.findBySkills(skillsString, pageable);
  }

  public JobPosting findById(UUID id) {
    return jobPostingRepository
        .findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Post not found."));
  }

  public void update(UUID id, JobPostDTO dto) {
    JobPosting jobPosting = this.findById(id);
    jobPosting.setTitle(dto.title());
    if (dto.salary().isPresent()) {
      jobPosting.setSalary(dto.salary().orElse(BigDecimal.ZERO));
    }
    if (dto.skills().isPresent()) {
      jobPosting.setSkills(dto.skills().orElse(new ArrayList<>()));
    }
    jobPosting.setExpiresAt(dto.expiresAt());

    jobPostingRepository.save(jobPosting);
  }

  public void save(JobPostDTO dto) {
    JobPosting jobPosting = new JobPosting(dto);

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = (User) authentication.getPrincipal();

    Company company =
        companyRepository
            .findByUserId(user.getId())
            .orElseThrow(() -> new EntityNotFoundException("This company does not exist."));

    jobPosting.setCompany(company);
    jobPostingRepository.save(jobPosting);
  }

  public void delete(UUID id) {

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = (User) authentication.getPrincipal();

    Company company =
        companyRepository
            .findByUserId(user.getId())
            .orElseThrow(() -> new EntityNotFoundException("This company does not exist."));
    JobPosting jobPosting = this.findById(id);

    if (jobPosting.getCompany().getId().equals(company.getId())) {
      jobPostingRepository.delete(jobPosting);
    } else {
      throw new UnauthorizedException("You are not allowed to do this.");
    }
  }
}
