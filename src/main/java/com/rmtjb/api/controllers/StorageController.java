package com.rmtjb.api.controllers;

import com.rmtjb.api.domain.exception.UnauthorizedException;
import com.rmtjb.api.domain.storage.DeleteObjectDTO;
import com.rmtjb.api.domain.storage.PresignURLResponseDTO;
import com.rmtjb.api.services.StorageService;
import com.rmtjb.api.utils.FileUploadUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

// WARNING: This code cannot be put in prodution under any circumstance
// anyone who has logged in can create/delete ANY object.
@RestController
@RequestMapping("/api/storage")
@RequiredArgsConstructor
public class StorageController {
  private final StorageService storageService;

  @PostMapping(value = "/upload", consumes = "multipart/form-data")
  public ResponseEntity<?> upload(
      @RequestParam("file") MultipartFile file, @RequestParam("objectKey") String objectKey) {
    boolean imageOrPdf = FileUploadUtil.isImageOrPdf(file);
    boolean sizeAcceptable = FileUploadUtil.isFileSizeAcceptable(file);
    if (!imageOrPdf) {
      throw new UnauthorizedException(
          "This is not a valid file type. Please upload a image or a pdf.");
    }

    if (!sizeAcceptable) {
      throw new RuntimeException(
          "This filesize is not acceptable. Please only send files that are less than 1mb.");
    }
    storageService.uploadFile(objectKey, file.getContentType(), file);
    return ResponseEntity.ok().build();
  }

  // TODO: find a way to make this work
  @PostMapping(value = "/presigned-url", consumes = "multipart/form-data")
  public ResponseEntity<PresignURLResponseDTO> getPresignedUrl(
      @RequestParam("file") MultipartFile file, @RequestParam("objectKey") String objectKey) {
    boolean imageOrPdf = FileUploadUtil.isImageOrPdf(file);
    boolean sizeAcceptable = FileUploadUtil.isFileSizeAcceptable(file);
    if (!imageOrPdf) {
      throw new UnauthorizedException(
          "This is not a valid file type. Please upload a image or a pdf.");
    }

    if (!sizeAcceptable) {
      throw new RuntimeException(
          "This filesize is not acceptable. Please only send files that are less than 1mb.");
    }
    var response = this.storageService.generatePresignedUploadUrl(objectKey, file.getContentType());
    return ResponseEntity.ok(response);
  }

  @PostMapping("/delete")
  public ResponseEntity<?> deleteObject(@RequestBody DeleteObjectDTO dto) {
    storageService.deleteFileByObjectKey(dto.objectKey());
    return ResponseEntity.ok().build();
  }
}
