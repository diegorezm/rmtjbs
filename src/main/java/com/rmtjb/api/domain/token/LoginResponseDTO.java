package com.rmtjb.api.domain.token;

import com.rmtjb.api.domain.user.UserSafe;

public record LoginResponseDTO(TokenDTO tokenDTO, UserSafe user) {}
