package com.rmtjb.api.controllers;

import com.rmtjb.api.domain.exception.UnauthorizedException;
import com.rmtjb.api.domain.storage.PresignURLRequestDTO;
import com.rmtjb.api.domain.storage.PresignURLResponseDTO;
import com.rmtjb.api.services.StorageService;
import com.rmtjb.api.utils.FileUploadUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/file-upload")
@RequiredArgsConstructor
public class StorageController {
  private final StorageService storageService;

  @PostMapping
  public ResponseEntity<PresignURLResponseDTO> getPresignedUrl(
      @RequestBody PresignURLRequestDTO dto) {
    boolean imageOrPdf = FileUploadUtil.isImageOrPdf(dto.file());
    boolean sizeAcceptable = FileUploadUtil.isFileSizeAcceptable(dto.file());
    if (!imageOrPdf) {
      throw new UnauthorizedException(
          "This is not a valid file type. Please upload a image or a pdf.");
    }

    if (!sizeAcceptable) {
      throw new RuntimeException(
          "This filesize is not acceptable. Please only send files that are less than 1mb.");
    }
    var response = this.storageService.generatePresignedUploadUrl(dto.objectKey());
    return ResponseEntity.ok(response);
  }
}
