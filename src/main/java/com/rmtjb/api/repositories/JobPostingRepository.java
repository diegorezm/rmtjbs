package com.rmtjb.api.repositories;

import com.rmtjb.api.domain.job.JobPosting;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

/** JobPostingRepository */
public interface JobPostingRepository extends JpaRepository<JobPosting, UUID> {
    @Query(
            value = "SELECT * FROM rmtjbs_job_postings j WHERE :preference = ANY (j.skills)",
            nativeQuery = true)
    Page<JobPosting> findByPreferences(@Param("preference") String preference, Pageable pageable);
}
