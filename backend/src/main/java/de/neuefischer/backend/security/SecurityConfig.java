package de.neuefischer.backend.security;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;



@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${app.env}")
    private String environment;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(a -> a.anyRequest().permitAll())
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
/*                .httpBasic(c -> {
                    c.authenticationEntryPoint((request, response, authException) -> response.sendError(HttpStatus.UNAUTHORIZED.value(),
                            HttpStatus.UNAUTHORIZED.getReasonPhrase()));
                    c.init(http);
                })*/
                .logout(l -> l
                        .logoutUrl("/api/logout")
                        .logoutSuccessHandler((request, response, authentication) -> response.setStatus(200)))
                .oauth2Login(o -> {
                    try {
                        o.init(http);
                        if (environment.equals("dev")) {
                            o.defaultSuccessUrl("http://localhost:5173", true);
                        } else {
                            o.defaultSuccessUrl("https://face-farm-app.onrender.com", true);
                        }

                    } catch (Exception e) {
                        throw new OAuth2AuthenticationException(e.getMessage());
                    }
                })
                .exceptionHandling(e -> e
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)));

        return http.build();

    }


}
