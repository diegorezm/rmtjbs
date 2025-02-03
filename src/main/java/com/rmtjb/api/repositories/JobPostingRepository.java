package com.rmtjb.api.repositories;

import com.rmtjb.api.domain.job.JobPosting;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/** JobPostingRepository */
public interface JobPostingRepository extends JpaRepository<JobPosting, UUID> {
    Page<JobPosting> findAll(Pageable pageable);
}
