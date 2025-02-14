package com.rmtjb.api.repositories;

import com.rmtjb.api.domain.company.Company;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

/** CompanyRepository */
public interface CompanyRepository extends JpaRepository<Company, UUID> {
  Optional<Company> findByUserId(UUID id);
}
