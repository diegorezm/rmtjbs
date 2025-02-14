package com.rmtjb.api.controllers;

import com.rmtjb.api.domain.exception.EntityAlreadyExistsException;
import com.rmtjb.api.domain.exception.EntityNotFoundException;
import com.rmtjb.api.domain.exception.ExceptionResponseDTO;
import com.rmtjb.api.domain.exception.UnauthorizedException;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitterReturnValueHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseBodyEmitterReturnValueHandler {
  private final Logger LOGGER = LoggerFactory.getLogger("EXCEPTION");

  public RestResponseEntityExceptionHandler(List<HttpMessageConverter<?>> messageConverters) {
    super(messageConverters);
  }

  @ExceptionHandler(value = {EntityNotFoundException.class})
  protected ResponseEntity<ExceptionResponseDTO> handleNotFound(RuntimeException ex) {
    LOGGER.error(ex.getMessage());
    return ResponseEntity.status(404).body(new ExceptionResponseDTO(ex.getMessage()));
  }

  @ExceptionHandler(value = {UnauthorizedException.class})
  protected ResponseEntity<ExceptionResponseDTO> handleUnauthorized(RuntimeException ex) {
    LOGGER.error(ex.getMessage());
    return ResponseEntity.status(401).body(new ExceptionResponseDTO(ex.getMessage()));
  }

  @ExceptionHandler(value = {EntityAlreadyExistsException.class})
  protected ResponseEntity<ExceptionResponseDTO> handleConflict(RuntimeException ex) {
    LOGGER.error(ex.getMessage());
    return ResponseEntity.status(409).body(new ExceptionResponseDTO(ex.getMessage()));
  }

  @ExceptionHandler(value = {RuntimeException.class})
  protected ResponseEntity<ExceptionResponseDTO> handleGenericRuntimeException(
      RuntimeException ex) {
    LOGGER.error(ex.getMessage());
    return ResponseEntity.status(500)
        .body(new ExceptionResponseDTO("An unexpected error occurred"));
  }

  @ExceptionHandler(value = {Exception.class})
  protected ResponseEntity<ExceptionResponseDTO> handleGeneral(Exception ex) {
    LOGGER.error(ex.getMessage());
    return ResponseEntity.status(500)
        .body(new ExceptionResponseDTO("An unexpected error occurred"));
  }
}
