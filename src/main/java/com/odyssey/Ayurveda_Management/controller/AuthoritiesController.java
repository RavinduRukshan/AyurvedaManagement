package com.odyssey.Ayurveda_Management.controller;

import com.odyssey.Ayurveda_Management.model.Authorities;
import com.odyssey.Ayurveda_Management.service.AuthoritiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/role")
public class AuthoritiesController {

    private AuthoritiesService authoritiesService;

    @Autowired
    public AuthoritiesController(AuthoritiesService theAuthoritiesService) {
        this.authoritiesService = theAuthoritiesService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<Authorities>> getAllRoles() {
        List<Authorities> theAuthorities = authoritiesService.findAll();
        return ResponseEntity.ok(theAuthorities);
    }

}
