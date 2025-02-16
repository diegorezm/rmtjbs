package com.rmtjb.api.domain.storage;

import org.springframework.web.multipart.MultipartFile;

public record PresignURLRequestDTO(String objectKey, MultipartFile file) {}
