package com.odyssey.Ayurveda_Management.controller;

import com.odyssey.Ayurveda_Management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

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

    // try 01
//    @PostMapping("/login")
//    public String login(@RequestBody User user) {
//        User existingUser = userService.findByUsername(user.getUsername());
//        if (existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
//            return "login successful";
//        } else {
//            return "Invalid credentials";
//        }
//    }

    // try 02
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
//        User existingUser = userService.findByUsername(request.getUsername());
//        if (existingUser != null && passwordEncoder.matches(request.getPassword(), existingUser.getPassword())) {
//            return ResponseEntity.ok("Login Successful!");
//        } else {
//            return ResponseEntity.ok("Invalid credentials");
//        }
//    }

    // try 03
    @GetMapping("/login")
    public ResponseEntity<String> login(
            @RequestParam("username") String username,
            @RequestParam("password") String password) {

        // Example validation logic
        if ("admin".equals(username) && "password".equals(password)) {
            return ResponseEntity.ok("Login Successful!");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

}



