package com.rmtjb.api.controllers;

import com.rmtjb.api.domain.exception.EntityAlreadyExistsException;
import com.rmtjb.api.domain.exception.EntityNotFoundException;
import com.rmtjb.api.domain.exception.ExceptionResponseDTO;
import com.rmtjb.api.domain.exception.UnauthorizedException;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitterReturnValueHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseBodyEmitterReturnValueHandler {

  public RestResponseEntityExceptionHandler(List<HttpMessageConverter<?>> messageConverters) {
    super(messageConverters);
  }

  @ExceptionHandler(value = {EntityNotFoundException.class})
  protected ResponseEntity<ExceptionResponseDTO> handleNotFound(RuntimeException ex) {
    return ResponseEntity.status(404).body(new ExceptionResponseDTO(ex.getMessage()));
  }

  @ExceptionHandler(value = {UnauthorizedException.class})
  protected ResponseEntity<ExceptionResponseDTO> handleUnauthorized(RuntimeException ex) {
    return ResponseEntity.status(401).body(new ExceptionResponseDTO(ex.getMessage()));
  }

  @ExceptionHandler(value = {BadCredentialsException.class})
  protected ResponseEntity<ExceptionResponseDTO> badAuthentication(BadCredentialsException ex) {
    return ResponseEntity.status(401).body(new ExceptionResponseDTO(ex.getMessage()));
  }

  @ExceptionHandler(value = {EntityAlreadyExistsException.class})
  protected ResponseEntity<ExceptionResponseDTO> handleConflict(RuntimeException ex) {
    return ResponseEntity.status(409).body(new ExceptionResponseDTO(ex.getMessage()));
  }

  @ExceptionHandler(value = {RuntimeException.class})
  protected ResponseEntity<ExceptionResponseDTO> handleGenericRuntimeException(
      RuntimeException ex) {
    System.err.println(ex);
    return ResponseEntity.status(500)
        .body(new ExceptionResponseDTO("An unexpected error occurred"));
  }

  @ExceptionHandler(value = {Exception.class})
  protected ResponseEntity<ExceptionResponseDTO> handleGeneral(Exception ex) {
    System.err.println(ex);
    return ResponseEntity.status(500)
        .body(new ExceptionResponseDTO("An unexpected error occurred"));
  }
}
