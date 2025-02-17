package com.rmtjb.api.services;

import com.rmtjb.api.domain.exception.InternalServerException;
import com.rmtjb.api.domain.storage.PresignURLResponseDTO;
import java.io.IOException;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

@Service
@RequiredArgsConstructor
public class StorageService {
  private final S3Client s3Client;
  private final S3Presigner presigner;
  private final Duration expiration = Duration.ofMinutes(5);

  @Value("${CLOUDFLARE_BUCKET}")
  private String bucketName;

  public String uploadFile(String objectKey, String contentType, MultipartFile multipartFile) {
    PutObjectRequest putObjectRequest =
        PutObjectRequest.builder()
            .bucket(bucketName)
            .contentType(contentType)
            .key(objectKey)
            .build();

    try {
      byte[] bytes = multipartFile.getBytes();
      RequestBody requestBody = RequestBody.fromBytes(bytes);
      s3Client.putObject(putObjectRequest, requestBody);
      return objectKey;
    } catch (IOException e) {
      System.err.println(e);
      throw new InternalServerException();
    }
  }

  public PresignURLResponseDTO generatePresignedUploadUrl(String objectKey, String contentType) {
    PutObjectPresignRequest presignRequest =
        PutObjectPresignRequest.builder()
            .signatureDuration(expiration)
            .putObjectRequest(
                builder ->
                    builder
                        .bucket(bucketName)
                        .key(objectKey)
                        .contentType(contentType)
                        .acl("public-read")
                        .build())
            .build();

    PresignedPutObjectRequest presignedRequest = presigner.presignPutObject(presignRequest);
    String url = presignedRequest.url().toString();

    return new PresignURLResponseDTO(objectKey, url);
  }

  public void deleteFileByObjectKey(String objectKey) {
    DeleteObjectRequest request =
        DeleteObjectRequest.builder().bucket(bucketName).key(objectKey).build();

    s3Client.deleteObject(request);
  }
}
