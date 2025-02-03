package com.rmtjb.api.repositories;

import com.rmtjb.api.domain.company.Company;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

/** CompanyRepository */
public interface CompanyRepository extends JpaRepository<Company, UUID> {}
