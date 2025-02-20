package com.rmtjb.api.components;

import com.rmtjb.api.domain.auth.RegisterDTO;
import com.rmtjb.api.domain.candidate.Candidate;
import com.rmtjb.api.domain.candidate.CandidateDTO;
import com.rmtjb.api.domain.company.Company;
import com.rmtjb.api.domain.company.CompanyDTO;
import com.rmtjb.api.domain.job.JobPostDTO;
import com.rmtjb.api.domain.job.JobPosting;
import com.rmtjb.api.domain.user.UserRoles;
import com.rmtjb.api.repositories.JobPostingRepository;
import com.rmtjb.api.services.AuthenticationService;
import com.rmtjb.api.services.CandidateService;
import com.rmtjb.api.services.CompanyService;
import com.rmtjb.api.services.JobApplicationService;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class DummyData implements CommandLineRunner {
  private final AuthenticationService authenticationService;
  private final CandidateService candidateService;
  private final CompanyService companyService;
  private final JobPostingRepository jobPostingRepository;
  private final JobApplicationService jobApplicationService;

  @Transactional
  private Company createCompany() {
    RegisterDTO registerDTO = RegisterDTO.genMock(UserRoles.COMPANY);
    var user = authenticationService.register(registerDTO, UserRoles.COMPANY);
    CompanyDTO dto = CompanyDTO.genMock();
    return this.companyService.save(dto, user);
  }

  @Transactional
  private Candidate createCandidate() {
    var registerDTO = RegisterDTO.genMock(UserRoles.CANDIDATE);
    var user = authenticationService.register(registerDTO, UserRoles.CANDIDATE);
    var dto = CandidateDTO.genMock();
    return this.candidateService.save(dto, user);
  }

  private JobPosting createJobPosting(Company company) {
    JobPostDTO jobPostDTO = JobPostDTO.genMock();
    JobPosting jobPosting = new JobPosting(jobPostDTO);
    jobPosting.setCompany(company);
    return this.jobPostingRepository.save(jobPosting);
  }

  @Override
  public void run(String... args) throws Exception {
    // Generate my user
    RegisterDTO registerDTO = new RegisterDTO("diego", "diego@email.com", "diegodiego");
    var user = authenticationService.register(registerDTO, UserRoles.CANDIDATE);
    var dto =
        new CandidateDTO(
            "12121212121",
            List.of("Web dev", "php", "java", "typescript"),
            Optional.of("curriculo_portfolio.pdf"),
            Optional.empty());
    var candidate = candidateService.save(dto, user);

    RegisterDTO registerDTO2 =
        new RegisterDTO("evilcompany", "evilcompany@email.com", "diegodiego");
    var user2 = authenticationService.register(registerDTO2, UserRoles.COMPANY);
    var dto2 =
        new CompanyDTO("Brazil, São Paulo", Optional.empty(), Optional.empty(), Optional.empty());
    var c = companyService.save(dto2, user2);

    var p = createJobPosting(c);
    this.jobApplicationService.apply(candidate.getId(), p.getId());

    // mock data
    int num_companies = 10;
    Company[] companies = new Company[num_companies];
    for (int i = 0; i < num_companies; i++) {
      companies[i] = createCompany();
    }

    for (Company company : companies) {
      for (int i = 0; i < 5; i++) {
        createJobPosting(company);
      }
    }
  }
}
