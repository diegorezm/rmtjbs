package com.rmtjb.api.config.r2;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
@ConfigurationProperties(prefix = "cloudflare.r2")
public class CloudflareR2Config {
  private String accountId;

  @Value("${CLOUDFLARE_ACCESS_KEY_ID}")
  private String accessKey;

  @Value("${CLOUDFLARE_ACCESS_SECRET_KEY}")
  private String secretKey;

  @Value("${CLOUDFLARE_ENDPOINT}")
  private String endpoint;
}
