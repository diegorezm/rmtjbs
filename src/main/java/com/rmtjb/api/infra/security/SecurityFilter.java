package com.rmtjb.api.infra.security;

import com.rmtjb.api.domain.exception.EntityNotFoundException;
import com.rmtjb.api.repositories.UserRepository;
import com.rmtjb.api.services.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class SecurityFilter extends OncePerRequestFilter {
  @Autowired TokenService tokenService;
  @Autowired UserRepository userRepository;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    var token = this.recoverToken(request);
    if (token != null) {
      var subject = tokenService.validator(token);
      UserDetails userDetails =
          userRepository
              .findUserByEmail(subject)
              .orElseThrow(
                  () -> new EntityNotFoundException("Could not find a user with this email."));
      var auth =
          new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
      SecurityContextHolder.getContext().setAuthentication(auth);
    }
    filterChain.doFilter(request, response);
  }

  private String recoverToken(HttpServletRequest request) {
    var header = request.getHeader("Authorization");
    if (header == null) return null;
    return header.replace("Bearer ", "");
  }
}
