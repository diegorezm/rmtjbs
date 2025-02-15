package com.rmtjb.api.services;

import com.rmtjb.api.domain.company.Company;
import com.rmtjb.api.domain.company.CompanyDTO;
import com.rmtjb.api.domain.exception.EntityNotFoundException;
import com.rmtjb.api.domain.exception.UnauthorizedException;
import com.rmtjb.api.domain.user.User;
import com.rmtjb.api.repositories.CompanyRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyService {
  private final CompanyRepository companyRepository;

  public Company findByUserId(UUID id) {
    return this.companyRepository
        .findByUserId(id)
        .orElseThrow(() -> new EntityNotFoundException("Company not found."));
  }

  public Company findById(UUID id) {
    return this.companyRepository
        .findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Company not found."));
  }

  public Company save(CompanyDTO dto, User user) {
    Company company = new Company(dto);
    company.setUser(user);
    return this.companyRepository.save(company);
  }

  public void update(UUID companyId, CompanyDTO dto) {
    Company company = this.findById(companyId);

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = (User) authentication.getPrincipal();

    if (!user.getId().equals(company.getUser().getId()))
      throw new UnauthorizedException("You don't own this company account.");

    company.setLocation(dto.location());
    if (dto.bannerKey().isPresent()) {
      company.setBannerKey(dto.bannerKey().get());
    }
    if (dto.logoKey().isPresent()) {
      company.setLogoKey(dto.logoKey().get());
    }
  }
}
