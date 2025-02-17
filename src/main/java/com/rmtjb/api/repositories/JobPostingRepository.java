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
      value =
          "SELECT * FROM rmtjbs_job_postings j WHERE EXISTS (    SELECT 1     FROM unnest(j.skills)"
              + " AS skill     WHERE skill ILIKE ANY (ARRAY(SELECT '%' ||"
              + " trim(unnest(string_to_array(:skills, ','))) || '%')))",
      nativeQuery = true)
  Page<JobPosting> findBySkills(@Param("skills") String skills, Pageable pageable);

  @Query(
      value =
          "SELECT * FROM rmtjbs_job_postings j  WHERE j.title ILIKE %:keyword% OR j.description"
              + " ILIKE %:keyword%",
      nativeQuery = true)
  Page<JobPosting> findByKeyword(String keyword, Pageable pageable);

  @Query(
      value =
          """
              SELECT *
              FROM rmtjbs_job_postings j
              WHERE EXISTS (
                  SELECT 1
                  FROM unnest(j.skills) AS skill
                  WHERE skill ILIKE ANY (:skills)
              )
              OR j.title ILIKE %:query%
          """,
      nativeQuery = true)
  Page<JobPosting> findByKeywordAndSkill(
      @Param("query") String query, @Param("skills") String[] skills, Pageable pageable);

  Page<JobPosting> findByCompanyId(UUID id, Pageable pageable);
}
