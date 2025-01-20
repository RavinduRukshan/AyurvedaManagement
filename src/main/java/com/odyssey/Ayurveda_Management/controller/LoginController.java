package com.odyssey.Ayurveda_Management.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/api")
public class LoginController {

    @GetMapping("/loginPage")
    public ResponseEntity<Map<String, String>> showLoginPage() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Login page requested.");
        response.put("status", "success");

        // Return response with HTTP 200 (OK)
        return ResponseEntity.ok(response);
    }

    @GetMapping("/access-denied")
    public ResponseEntity<Map<String, String>> accessDenied() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Access denied.");
        response.put("status", "error");

        // Return response with HTTP 403 (Forbidden)
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
    }



}



