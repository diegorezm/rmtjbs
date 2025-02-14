package com.rmtjb.api.domain.job;

import com.github.javafaker.Faker;
import com.rmtjb.api.utils.GenMock;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public record JobPostDTO(
    String title,
    String description,
    Optional<BigDecimal> salary,
    Optional<List<String>> skills,
    LocalDateTime expiresAt) {

  public static JobPostDTO genMock() {
    Faker faker = new Faker();

    String title = faker.job().title();

    String description =
        "<h1>"
            + title
            + "</h1>\n"
            + "<p>"
            + faker.lorem().paragraph()
            + "</p>\n"
            + "<ul>\n"
            + "<li>"
            + faker.lorem().word()
            + "</li>\n"
            + "<li>"
            + faker.lorem().word()
            + "</li>\n"
            + "<li>"
            + faker.lorem().word()
            + "</li>\n"
            + "</ul>\n";

    Optional<BigDecimal> salary =
        faker.random().nextBoolean()
            ? Optional.of(BigDecimal.valueOf(faker.number().randomDouble(2, 30000, 150000)))
            : Optional.empty();

    var allPreferences = GenMock.mockSkills();

    int idx_1 = faker.random().nextInt(0, allPreferences.size() - 1);
    int idx_2 = faker.random().nextInt(0, allPreferences.size() - 1);

    while (idx_2 == idx_1) {
      idx_2 = faker.random().nextInt(0, allPreferences.size() - 1);
    }

    Optional<List<String>> skills =
        Optional.of(List.of(allPreferences.get(idx_1), allPreferences.get(idx_2)));

    LocalDateTime expiresAt = LocalDateTime.now().plusDays(faker.number().numberBetween(30, 90));

    return new JobPostDTO(title, description, salary, skills, expiresAt);
  }
}
