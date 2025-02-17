package com.rmtjb.api.controllers;

import com.rmtjb.api.domain.user.UpdateUserDTO;
import com.rmtjb.api.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @PutMapping
  public ResponseEntity<?> update(@RequestBody UpdateUserDTO dto) {
    userService.update(dto);
    return ResponseEntity.ok().build();
  }
}
