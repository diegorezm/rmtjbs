package com.rmtjb.api.services;

import com.rmtjb.api.domain.job.JobPosting;
import com.rmtjb.api.repositories.JobPostingRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JobPostingService {
    private final JobPostingRepository repository;

    public Page<JobPosting> findAll(Pageable pageable, String[] preferences) {
        return repository.findAll(pageable);
    }

    public JobPosting findById(UUID id) {
        return repository.findById(id).orElse(null);
    }

    public void save(JobPosting jobPosting) {
        repository.save(jobPosting);
    }

    public void delete(JobPosting jobPosting) {
        repository.delete(jobPosting);
    }
}
