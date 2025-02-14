package com.rmtjb.api.domain.auth;

import com.rmtjb.api.domain.company.CompanyDTO;

/** RegisterCompanyDTO */
public record RegisterCompanyDTO(RegisterDTO userDTO, CompanyDTO companyDTO) {}
