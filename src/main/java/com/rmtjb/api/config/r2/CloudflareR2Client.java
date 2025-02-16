package com.rmtjb.api.config.r2;

import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

@Configuration
@RequiredArgsConstructor
public class CloudflareR2Client {

  private final CloudflareR2Config config;

  @Bean
  public S3Client s3Client() {
    AwsBasicCredentials credentials =
        AwsBasicCredentials.create(config.getAccessKey(), config.getSecretKey());

    S3Configuration serviceConfiguration =
        S3Configuration.builder().pathStyleAccessEnabled(true).build();

    return S3Client.builder()
        .endpointOverride(URI.create(config.getEndpoint()))
        .credentialsProvider(StaticCredentialsProvider.create(credentials))
        .region(Region.of("auto"))
        .serviceConfiguration(serviceConfiguration)
        .build();
  }

  @Bean
  public S3Presigner s3Presigner() {
    AwsBasicCredentials credentials =
        AwsBasicCredentials.create(config.getAccessKey(), config.getSecretKey());

    S3Configuration serviceConfiguration =
        S3Configuration.builder().pathStyleAccessEnabled(true).build();

    return S3Presigner.builder()
        .endpointOverride(URI.create(config.getEndpoint()))
        .credentialsProvider(StaticCredentialsProvider.create(credentials))
        .region(Region.of("auto"))
        .serviceConfiguration(serviceConfiguration)
        .build();
  }
}
