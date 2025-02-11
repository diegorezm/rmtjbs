package com.rmtjb.api.repositories;

import com.rmtjb.api.domain.user.User;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, UUID> {
  Optional<User> findUserByEmail(String email);

  Boolean existsByEmail(String email);
}
