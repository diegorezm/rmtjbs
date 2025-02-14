package com.rmtjb.api.services;

import com.rmtjb.api.domain.auth.RegisterDTO;
import com.rmtjb.api.domain.exception.EntityAlreadyExistsException;
import com.rmtjb.api.domain.exception.EntityNotFoundException;
import com.rmtjb.api.domain.user.User;
import com.rmtjb.api.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements UserDetailsService {
  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepository
        .findUserByEmail(username)
        .orElseThrow(() -> new EntityNotFoundException("Could not find a user with this email."));
  }

  public User register(RegisterDTO data) {
    if (userRepository.existsByEmail(data.email()))
      throw new EntityAlreadyExistsException("This user already exists.");
    String password = new BCryptPasswordEncoder().encode(data.password());
    RegisterDTO payload = new RegisterDTO(data.name(), data.email(), password);
    User user = new User(payload);
    return this.userRepository.save(user);
  }
}
