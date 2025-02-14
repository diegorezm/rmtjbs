package com.rmtjb.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
  @Override
  public void addViewControllers(ViewControllerRegistry registry) {
    // Forward all routes to index.html except for API routes and static files
    registry.addViewController("/{path:[^\\.]*}").setViewName("forward:/index.html");
  }

  // @Override
  // public void addCorsMappings(CorsRegistry registry) {
  //   registry
  //       .addMapping("/**")
  //       .allowedOrigins("http://localhost:5173")
  //       .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
  //       .allowedHeaders("*")
  //       .allowCredentials(true)
  //       .maxAge(3600);
  // }
}
