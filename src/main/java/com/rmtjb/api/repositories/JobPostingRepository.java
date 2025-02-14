package com.rmtjb.api.repositories;

import com.rmtjb.api.domain.job.JobPosting;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/** JobPostingRepository */
public interface JobPostingRepository extends JpaRepository<JobPosting, UUID> {
  @Query(
      value = "SELECT * FROM rmtjbs_job_postings j WHERE :skills = ANY (j.skills)",
      nativeQuery = true)
  Page<JobPosting> findBySkills(@Param("skills") String skills, Pageable pageable);

  @Query(
      value =
          "SELECT * FROM rmtjbs_job_postings j  WHERE j.title LIKE %:keyword% OR j.description LIKE"
              + " %:keyword%",
      nativeQuery = true)
  Page<JobPosting> findByKeyword(String query, Pageable pageable);

  @Query(
      value =
          "SELECT * FROM rmtjbs_job_postings j  WHERE :skills = ANY (j.skills) OR j.title LIKE"
              + " %:keyword% OR j.description LIKE %:keyword%",
      nativeQuery = true)
  Page<JobPosting> findByKeywordAndSkill(String query, String skills, Pageable pageable);

  Page<JobPosting> findByCompanyId(UUID id, Pageable pageable);
}
