package com.rmtjb.api.config;

import org.springframework.context.annotation.Configuration;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.cors() // Habilita o CORS
        .and()
        .csrf()
        .disable() // Desabilita CSRF se for necessário
        .authorizeRequests()
        .antMatchers("/api/**")
        .permitAll() // Permite o acesso às APIs (ajuste conforme necessário)
        .anyRequest()
        .authenticated();
  }
}
