package com.rmtjb.api.domain.candidate;

import com.github.javafaker.Faker;
import com.rmtjb.api.utils.GenMock;
import java.util.List;
import java.util.Optional;

public record CandidateDTO(
    String phone,
    List<String> jobPreferences,
    Optional<String> resumeKey,
    Optional<String> profilePictureKey) {
  public static CandidateDTO genMock() {
    Faker faker = new Faker();

    String phone = faker.phoneNumber().cellPhone();

    var allPreferences = GenMock.mockSkills();

    int idx_1 = faker.random().nextInt(0, allPreferences.size() - 1);
    int idx_2 = faker.random().nextInt(0, allPreferences.size() - 1);

    while (idx_2 == idx_1) {
      idx_2 = faker.random().nextInt(0, allPreferences.size() - 1);
    }

    List<String> preferences = List.of(allPreferences.get(idx_1), allPreferences.get(idx_2));
    return new CandidateDTO(phone, preferences, null, null);
  }
}
