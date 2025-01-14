package com.odyssey.Ayurveda_Management.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

@Configuration
public class SecurityConfig {

    // Configuring JDBC-based UserDetailsManager
    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource) {
        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);

        // Query to retrieve a user by username
        jdbcUserDetailsManager.setUsersByUsernameQuery(
                "SELECT username, password, status = 'Active' AS enabled FROM UserAccount WHERE username = ?"
        );

        // Query to retrieve authorities/roles by username
        jdbcUserDetailsManager.setAuthoritiesByUsernameQuery(
                "SELECT ua.username, a.authority " +
                        "FROM UserAccount ua " +
                        "JOIN Authorities a ON ua.role_id = a.id " +
                        "WHERE ua.username = ?"
        );

        return jdbcUserDetailsManager;
    }

    // Configuring Security Filter Chain
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        // Allow public access to the login page and static resources (CSS, JS, images)
                        .requestMatchers("/loginPage", "/css/**", "/js/**", "/images/**").permitAll()

                        // Restrict access to `/patient/**` for Receptionists
                        .requestMatchers("/patient/**").hasAnyRole("ADMIN", "DOCTOR","RECEPTIONIST") // Role names should match "ROLE_ADMIN" format
                        .requestMatchers("/user/create", "/user-account/delete/**").hasRole("ADMIN")
                        .requestMatchers("/user/list").hasAnyRole("ADMIN", "DOCTOR")

                        // Require authentication for all other requests
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/loginPage") // Custom login page
                        .loginProcessingUrl("/authenticateTheUser") // Endpoint for login form submission
                        .defaultSuccessUrl("/patient/list", true) // Redirect after successful login
                        .permitAll() // Allow all users to access the login page
                )
                .logout(logout -> logout
                        .logoutUrl("/logout") // URL to trigger logout
                        .logoutSuccessUrl("/loginPage?logout") // Redirect to login page after logout
                        .permitAll()
                )
                .exceptionHandling(exception -> exception
                        .accessDeniedPage("/access-denied") // Custom access denied page
                )
                .csrf(csrf -> csrf.disable()); // Disable CSRF for simplicity (only for development)
        return http.build();
    }

    // Password Encoder (BCrypt)
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
