package com.rmtjb.api.controllers;

import com.rmtjb.api.domain.company.CompanyDTO;
import com.rmtjb.api.services.CompanyService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {
  private final CompanyService companyService;

  @GetMapping("/{id}")
  public ResponseEntity<?> findById(@PathVariable UUID id) {
    var company = companyService.findById(id);
    return ResponseEntity.ok(company);
  }

  @PutMapping()
  public ResponseEntity<?> update(@RequestBody CompanyDTO dto) {
    companyService.update(dto);
    return ResponseEntity.ok().build();
  }
}
