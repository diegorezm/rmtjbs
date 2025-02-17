package com.rmtjb.api.services;

import com.rmtjb.api.domain.exception.EntityNotFoundException;
import com.rmtjb.api.domain.user.UpdateUserDTO;
import com.rmtjb.api.domain.user.User;
import com.rmtjb.api.repositories.UserRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;

  public User findById(UUID id) {
    return this.userRepository
        .findById(id)
        .orElseThrow(() -> new EntityNotFoundException("User not found."));
  }

  public User findByEmail(String email) {
    return this.userRepository
        .findUserByEmail(email)
        .orElseThrow(() -> new EntityNotFoundException("User not found."));
  }

  public User update(UpdateUserDTO dto) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    User user = (User) authentication.getPrincipal();

    user.setName(dto.name());
    return userRepository.save(user);
  }
}
