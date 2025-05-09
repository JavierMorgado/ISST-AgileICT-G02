package es.upm.dit.isst.agileapi.config;

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
            auth.requestMatchers("/api/**").permitAll();
            auth.requestMatchers("/").permitAll();
            auth.requestMatchers("/login-empresa").permitAll();
            auth.requestMatchers("/login-profesional").permitAll();
            auth.requestMatchers("/miPerfil/**").hasRole("PROFESIONAL");
            auth.requestMatchers("/miPerfilEmpresa/**").hasRole("EMPRESA");
            auth.requestMatchers("/miEmpresa/**").hasRole("EMPRESA");
            auth.requestMatchers("/todos").authenticated();
        })
        

        // Configuración de login para Profesionales
        .formLogin(form -> form
                .loginPage("/login-profesional")
                .loginProcessingUrl("/login-profesional")
                .successHandler((request, response, authentication) -> {
                    // Redirigir a la página de perfil profesional
                    response.sendRedirect("/miPerfil/" + authentication.getName());
                })
                .failureUrl("/login-profesional?error=true") // Redirigir en caso de fallo
                .permitAll())
        // Configuración de login para Empresas
        .formLogin(form -> form
                .loginPage("/login-empresa")
                .loginProcessingUrl("/login-empresa")
                .successHandler((request, response, authentication) -> {
                    // Redirigir a la página de perfil de empresa
                    response.sendRedirect("/miEmpresa/" + authentication.getName());
                })
                .failureUrl("/login-empresa?error=true") // Redirigir en caso de fallo
                .permitAll())
        .logout(logout -> {
            logout.logoutRequestMatcher(new AntPathRequestMatcher("/logout"));
            logout.logoutSuccessUrl("/login-empresa").permitAll();
        })
        .cors(cors -> cors.configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues()));

        http.headers(headers -> headers.frameOptions(FrameOptionsConfig::disable));
        return http.build();
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

}
