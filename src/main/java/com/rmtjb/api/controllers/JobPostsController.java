package com.rmtjb.api.controllers;

import com.rmtjb.api.domain.job.JobPostDTO;
import com.rmtjb.api.domain.job.JobPosting;
import com.rmtjb.api.services.JobPostingService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/job-posts")
@RequiredArgsConstructor
public class JobPostsController {
  private final JobPostingService jobPostingService;

  @GetMapping
  public Page<JobPosting> findAll(
      @RequestParam(name = "page", required = false, defaultValue = "1") Integer page,
      @RequestParam(name = "q", required = false) String query) {

    Pageable paging = PageRequest.of(page - 1, 10, Sort.by("id").ascending());
    boolean hasQuery = query != null && !query.isBlank();

    if (hasQuery) {
      return this.jobPostingService.findByKeyword(paging, query);
    }
    return this.jobPostingService.findAll(paging);
  }

  @GetMapping("/recommended")
  public Page<JobPosting> findAllRecomended(
      @RequestParam(name = "page", required = false, defaultValue = "1") Integer page,
      @RequestParam(name = "q", required = false) String query,
      @RequestParam(value = "preferences") String[] preferences) {
    boolean hasQuery = query != null && !query.isBlank();
    Pageable paging = PageRequest.of(page - 1, 10, Sort.by("id").ascending());
    if (hasQuery) {
      return this.jobPostingService.findByKeywordAndPreferences(paging, preferences, query);
    }
    return this.jobPostingService.findByPreferences(paging, preferences);
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> findById(@PathVariable UUID id) {
    return ResponseEntity.ok(jobPostingService.findById(id));
  }

  @GetMapping("/company/{companyId}")
  public Page<JobPosting> findByCompanyId(
      @RequestParam(name = "page", required = false, defaultValue = "1") Integer page,
      @RequestParam(name = "q", required = false) String query,
      @PathVariable UUID companyId) {
    Pageable paging = PageRequest.of(page - 1, 10, Sort.by("id").ascending());
    boolean hasQuery = query != null && !query.isBlank();
    if (hasQuery) {
      return jobPostingService.findByCompanyIdAndKeyword(paging, companyId, query);
    }
    return jobPostingService.findByCompanyId(paging, companyId);
  }

  @PostMapping
  public ResponseEntity<?> save(@RequestBody JobPostDTO dto) {
    this.jobPostingService.save(dto);
    return ResponseEntity.status(201).build();
  }

  @PutMapping("/{id}")
  public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody JobPostDTO dto) {
    this.jobPostingService.update(id, dto);
    return ResponseEntity.ok().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> delete(@PathVariable UUID id) {
    this.jobPostingService.delete(id);
    return ResponseEntity.ok().build();
  }
}
