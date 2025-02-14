package com.rmtjb.api.domain.company;

import com.github.javafaker.Faker;
import java.util.Optional;

public record CompanyDTO(String location, Optional<String> bannerKey, Optional<String> logoKey) {
  public static CompanyDTO genMock() {
    Faker faker = new Faker();

    String location = faker.address().fullAddress();

    Optional<String> bannerKey = Optional.of(faker.internet().image());

    Optional<String> logoKey = Optional.of(faker.internet().avatar());

    return new CompanyDTO(location, bannerKey, logoKey);
  }
}
