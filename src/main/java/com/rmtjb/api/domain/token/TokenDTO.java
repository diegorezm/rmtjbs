package com.rmtjb.api.domain.token;

import java.time.Instant;

public record TokenDTO(String token, Instant expiresAt) {}
