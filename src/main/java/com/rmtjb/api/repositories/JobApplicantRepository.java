package com.rmtjb.api.repositories;

import com.rmtjb.api.domain.job.JobApplicant;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/** JobApplicantRepository */
public interface JobApplicantRepository extends JpaRepository<JobApplicant, UUID> {}
