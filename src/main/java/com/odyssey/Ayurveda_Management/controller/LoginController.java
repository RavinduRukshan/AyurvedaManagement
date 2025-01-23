package com.odyssey.Ayurveda_Management.controller;

import com.odyssey.Ayurveda_Management.model.User;
import com.odyssey.Ayurveda_Management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLOutput;

@RestController
@RequestMapping
public class LoginController {

    private UserService userService;
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public LoginController(UserService userService, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User request) {
        User existingUser = userService.findByUsername(request.getUsername());

        if (existingUser != null) {
            System.out.println("Password from request: " + request.getPassword());  // Debug line

            System.out.println("Stored password hash: " + existingUser.getPassword());  // Debug line

            boolean isPasswordMatch = passwordEncoder.matches(request.getPassword(), existingUser.getPassword());
            System.out.println("Password match: " + isPasswordMatch);  // Debug line

            if (isPasswordMatch) {
                return ResponseEntity.ok("Login Successful!");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }
    }

}

