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
        .csrf(csrf -> {
            csrf.disable();
        })
        .authorizeHttpRequests(auth -> {
            auth.requestMatchers("/h2-console/**").permitAll();
            auth.requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html", "/swagger-resources/**", "/webjars/**").permitAll();
            auth.requestMatchers("/api/**").permitAll(); // Regla general para todas las rutas bajo /api
            auth.requestMatchers("/login-empresa", "/login-profesional").permitAll();
            auth.requestMatchers("/miPerfil/**").hasRole("PROFESIONAL");
            auth.requestMatchers("/miPerfilEmpresa/**", "/miEmpresa/**").hasRole("EMPRESA");
            auth.requestMatchers("/todos").authenticated();
            auth.requestMatchers("/").permitAll();
        })
        .logout(logout -> {
            logout.logoutRequestMatcher(new AntPathRequestMatcher("/logout"));
            logout.logoutSuccessUrl("/login-empresa").permitAll();
        })
        //.cors(cors -> cors.configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues()));
        .cors(cors ->
            cors.configurationSource(corsConfigurationSource()));

        http.headers(headers -> headers.frameOptions(FrameOptionsConfig::disable));
        return 
http.build
();
    }

    @Bean
    public UserDetailsService jdbcUserDetailsService(DataSource dataSource) {
        JdbcUserDetailsManager users = new JdbcUserDetailsManager(dataSource);

        // Modificar la consulta dependiendo del tipo de usuario (profesional o empresa)
        String query = "select username, password, enabled from usuarios where username = ?"; // Es un ejemplo
        // Si es un profesional, utiliza una tabla profesional
        // Si es una empresa, utiliza la tabla empresas
        users.setUsersByUsernameQuery(query);
        users.setAuthoritiesByUsernameQuery("select username, authority from authorities where username = ?");

        return users;
    };

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); // si usas cookies o sesiones

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


} 