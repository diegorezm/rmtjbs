package com.rmtjb.api.services;

import com.rmtjb.api.domain.storage.PresignURLResponseDTO;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

@Service
@RequiredArgsConstructor
public class StorageService {
  private final S3Presigner presigner;
  private final Duration expiration = Duration.ofMinutes(5);

  @Value("${CLOUDFLARE_BUCKET}")
  private String bucketName;

  public PresignURLResponseDTO generatePresignedUploadUrl(String objectKey) {
    PutObjectPresignRequest presignRequest =
        PutObjectPresignRequest.builder()
            .signatureDuration(expiration)
            .putObjectRequest(builder -> builder.bucket(bucketName).key(objectKey).build())
            .build();

    PresignedPutObjectRequest presignedRequest = presigner.presignPutObject(presignRequest);
    String url = presignedRequest.url().toString();

    return new PresignURLResponseDTO(objectKey, url);
  }
}
