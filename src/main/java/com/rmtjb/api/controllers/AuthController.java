package com.rmtjb.api.controllers;

import com.rmtjb.api.domain.auth.LoginDTO;
import com.rmtjb.api.domain.auth.RegisterDTO;
import com.rmtjb.api.domain.token.TokenDTO;
import com.rmtjb.api.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
  private final AuthenticationService authenticationService;

  @PostMapping("/register")
  public ResponseEntity<?> register(@RequestBody RegisterDTO data) {
    authenticationService.register(data);
    return ResponseEntity.status(201).build();
  }

  @PostMapping("/login")
  public ResponseEntity<TokenDTO> login(@RequestBody LoginDTO data) {
    TokenDTO response = authenticationService.login(data);
    return ResponseEntity.ok(response);
  }
}
