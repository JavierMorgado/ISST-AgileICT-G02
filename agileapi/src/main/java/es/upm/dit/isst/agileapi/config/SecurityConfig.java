package es.upm.dit.isst.agileapi.config;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer.FrameOptionsConfig;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
@Configuration
@EnableWebSecurity
@RequestMapping("/api/agile")
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
        .csrf(csrf -> csrf.disable())
        .headers(headers -> headers.frameOptions(FrameOptionsConfig::disable))
        .authorizeHttpRequests(auth -> {
            auth.requestMatchers("/h2-console/**").permitAll();
            auth.requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html", "/swagger-resources/**", "/webjars/**").permitAll();
            auth.requestMatchers("/login-empresa", "/login-profesional", "/register-profesional", "/register-empresa").permitAll();
            auth.requestMatchers("/miPerfil/**").hasRole("PROFESIONAL");
            auth.requestMatchers("/miEmpresa/**", "/miEmpresa/**").hasRole("EMPRESA");
            auth.requestMatchers("/").permitAll();
            auth.requestMatchers("/login").permitAll();
            auth.requestMatchers("/api/agile/registrar/profesionales").permitAll();
            auth.requestMatchers("/api/agile/registrar/empresas").permitAll();
            auth.requestMatchers("/api/agile/profesionales/**").hasRole("PROFESIONAL");
            auth.requestMatchers("/api/agile/empresas/**").hasRole("EMPRESA");
            auth.requestMatchers("/api/agile/puestos/**").hasRole("EMPRESA"); // porque lo crean las empresas
            auth.requestMatchers("/api/agile/ofertas/**").hasAnyRole("EMPRESA", "PROFESIONAL"); // si aplica a una oferta
        })
        .httpBasic(Customizer.withDefaults())
        // .formLogin(form -> form
        //     .loginProcessingUrl("/login") // Spring espera POST aquí
        //     .successHandler((req, res, auth) -> res.setStatus(200))
        //     .failureHandler((req, res, ex) -> res.sendError(401, "Auth failed"))
        // )
        // .logout(logout -> {
        //     logout.logoutRequestMatcher(new AntPathRequestMatcher("/logout"));
        //     logout.logoutSuccessUrl("/").permitAll();
        // })
        //.cors(cors -> cors.configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues()));
        .cors(cors ->
            cors.configurationSource(corsConfigurationSource()));

        return 
        http.build
        ();
    }

    @Bean
    public JdbcUserDetailsManager jdbcUserDetailsManager(DataSource dataSource) {
        JdbcUserDetailsManager users = new JdbcUserDetailsManager(dataSource);
        users.setUsersByUsernameQuery("SELECT username, password, enabled FROM users WHERE username = ?");
        users.setAuthoritiesByUsernameQuery("SELECT username, authority FROM authorities WHERE username = ?");
        return users;
    }



    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // este es el que interpreta $2a$...
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); // si usas cookies o sesiones

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


} 