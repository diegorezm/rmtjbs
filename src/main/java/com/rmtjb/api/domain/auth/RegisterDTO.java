package com.rmtjb.api.domain.auth;

import com.github.javafaker.Faker;
import com.rmtjb.api.domain.user.UserRoles;

public record RegisterDTO(String name, String email, String password) {
  public static RegisterDTO genMock(UserRoles role) {
    Faker faker = new Faker();
    String name = faker.name().fullName();
    String email = faker.internet().emailAddress(name);
    String password = faker.random().hex(12);
    return new RegisterDTO(faker.internet().emailAddress(), email, password);
  }
}
