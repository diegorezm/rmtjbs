package com.rmtjb.api.domain.company;

import com.github.javafaker.Faker;
import java.util.Optional;

public record CompanyDTO(String location, Optional<String> bannerKey, Optional<String> logoKey) {
  public static CompanyDTO genMock() {
    Faker faker = new Faker();

    String location = faker.address().country() + "," + faker.address().city();

    Optional<String> bannerKey = Optional.empty();

    Optional<String> logoKey = Optional.empty();

    return new CompanyDTO(location, bannerKey, logoKey);
  }
}
