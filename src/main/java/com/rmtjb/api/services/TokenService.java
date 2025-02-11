package com.rmtjb.api.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.rmtjb.api.domain.token.TokenDTO;
import com.rmtjb.api.domain.user.User;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TokenService {
  @Value("${api.security.token.secret}")
  private String secret;

  public TokenDTO genToken(User user) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(secret);
      Instant exp = this.genExpDate();
      String token =
          JWT.create()
              .withIssuer("auth-provider")
              .withSubject(user.getEmail())
              .withExpiresAt(exp)
              .sign(algorithm);
      return new TokenDTO(token, exp);
    } catch (JWTCreationException e) {
      throw new JWTCreationException("Could not generate new token", e);
    }
  }

  private Instant genExpDate() {
    return LocalDateTime.now().plusHours(24).toInstant(ZoneOffset.of("-03:00"));
  }

  public String validator(String token) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(secret);
      return JWT.require(algorithm).withIssuer("auth-provider").build().verify(token).getSubject();
    } catch (JWTVerificationException e) {
      return null;
    }
  }
}
