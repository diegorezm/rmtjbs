package com.rmtjb.api.utils;

import org.springframework.web.multipart.MultipartFile;

public class FileUploadUtil {

  private static final long MAX_FILE_SIZE = 1 * 1024 * 1024;

  public static boolean isImageOrPdf(MultipartFile file) {
    String contentType = file.getContentType();
    return contentType != null
        && (contentType.startsWith("image/") || contentType.equals("application/pdf"));
  }

  public static boolean isFileSizeAcceptable(MultipartFile file) {
    return file.getSize() <= MAX_FILE_SIZE;
  }
}
