package com.rmtjb.api.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
  @Autowired SecurityFilter securityFilter;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
    return httpSecurity
        .csrf(AbstractHttpConfigurer::disable)
        .sessionManagement(
            session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(
            authorize ->
                authorize
                    .requestMatchers(HttpMethod.GET, "/")
                    .permitAll()
                    .requestMatchers(HttpMethod.POST, "/api/auth/register/*")
                    .permitAll()
                    .requestMatchers(HttpMethod.POST, "/api/auth/login")
                    .permitAll()
                    .anyRequest()
                    .authenticated())
        .cors(Customizer.withDefaults())
        .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
  }

  // @Bean
  // public UrlBasedCorsConfigurationSource corsConfigurationSource() {
  //   CorsConfiguration corsConfig = new CorsConfiguration();
  //   corsConfig.setAllowedOrigins(
  //       Arrays.asList("http://localhost:5173")); // Adjust the origin as needed
  //   corsConfig.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
  //   corsConfig.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
  //   corsConfig.setAllowCredentials(true); // Allow cookies to be sent with requests
  //   corsConfig.setMaxAge(3600L); // Cache pre-flight requests for 1 hour
  //
  //   UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
  //   source.registerCorsConfiguration("/**", corsConfig);
  //   return source;
  // }

  @Bean
  public AuthenticationManager authenticationManager(
      AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
