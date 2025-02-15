package com.rmtjb.api.controllers;

import com.rmtjb.api.domain.auth.LoginDTO;
import com.rmtjb.api.domain.auth.RegisterCandidateDTO;
import com.rmtjb.api.domain.auth.RegisterCompanyDTO;
import com.rmtjb.api.domain.token.LoginResponseDTO;
import com.rmtjb.api.domain.token.TokenDTO;
import com.rmtjb.api.domain.user.User;
import com.rmtjb.api.domain.user.UserRoles;
import com.rmtjb.api.services.AuthenticationService;
import com.rmtjb.api.services.CandidateService;
import com.rmtjb.api.services.CompanyService;
import com.rmtjb.api.services.TokenService;
import com.rmtjb.api.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
  private final AuthenticationService authenticationService;
  private final UserService userService;
  private final CompanyService companyService;
  private final CandidateService candidateService;
  private final TokenService tokenService;
  private final AuthenticationManager authenticationManager;

  @GetMapping("/me")
  public ResponseEntity<?> me() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User authUser = (User) authentication.getPrincipal();
    var user = userService.findById(authUser.getId());
    return ResponseEntity.ok(user.toUserSafe());
  }

  @PostMapping("/register/company")
  @Transactional
  public ResponseEntity<?> registerCompany(@RequestBody RegisterCompanyDTO data) {
    User user = authenticationService.register(data.userDTO(), UserRoles.COMPANY);
    companyService.save(data.companyDTO(), user);
    return ResponseEntity.status(201).build();
  }

  @PostMapping("/register/candidate")
  @Transactional
  public ResponseEntity<?> registerCandidate(@RequestBody RegisterCandidateDTO data) {
    User user = authenticationService.register(data.userDTO(), UserRoles.CANDIDATE);
    candidateService.save(data.candidateDTO(), user);

    return ResponseEntity.status(201).build();
  }

  // I Have to do this here to avoid circular dependencies
  @PostMapping("/login")
  public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginDTO data) {
    UsernamePasswordAuthenticationToken usernameAndPassword =
        new UsernamePasswordAuthenticationToken(data.email(), data.password());
    var auth = this.authenticationManager.authenticate(usernameAndPassword);
    User user = (User) auth.getPrincipal();
    TokenDTO token = this.tokenService.genToken(user);
    LoginResponseDTO response = new LoginResponseDTO(token, user.toUserSafe());
    return ResponseEntity.ok(response);
  }
}
