package com.rmtjb.api.domain.exception;

public class InternalServerException extends RuntimeException {
  public InternalServerException() {
    super("Something went wrong!");
  }
}
