package com.rmtjb.api.config;

import com.rmtjb.api.services.TokenService;
import com.rmtjb.api.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
  private final TokenService tokenService;
  private final UserService userService;

  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config.enableSimpleBroker("/topic", "/queue");
    config.setUserDestinationPrefix("/user");
    config.setApplicationDestinationPrefixes("/app");
  }

  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/ws").setAllowedOrigins("*");
  }

  // @PostConstruct
  // public void init() {
  //   SecurityContextHolder.setStrategyName(SecurityContextHolder.MODE_INHERITABLETHREADLOCAL);
  // }

  @Override
  public void configureClientInboundChannel(ChannelRegistration registration) {
    registration.interceptors(
        new ChannelInterceptor() {
          @Override
          public Message<?> preSend(Message<?> message, MessageChannel channel) {
            StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

            assert accessor != null;
            if (StompCommand.CONNECT.equals(accessor.getCommand())) {

              String authorizationHeader = accessor.getFirstNativeHeader("Authorization");
              assert authorizationHeader != null;

              String token = authorizationHeader.substring(7);

              String email = tokenService.validator(token);
              var user = userService.findByEmail(email);
              UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                  new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
              SecurityContextHolder.getContext()
                  .setAuthentication(usernamePasswordAuthenticationToken);
              accessor.setUser(usernamePasswordAuthenticationToken);
            }
            if (accessor != null
                && SecurityContextHolder.getContext().getAuthentication() == null) {
              Authentication user = (Authentication) accessor.getUser();
              if (user != null) {
                SecurityContextHolder.getContext().setAuthentication(user);
              }
            }

            return message;
          }
        });
  }
}
