package com.odyssey.Ayurveda_Management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class AyurvedaManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(AyurvedaManagementApplication.class, args);

//		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

//		// The original password
//		String rawPassword = "lakshan";
//
//		// The stored hash (e.g., from your database)
//		String storedHash = "$2a$10$WE6jjVCfHhThJTgA5c1MV.JFJWSTZhl9sW6zH/aNVTiF5fywtXtFe";
//
//		// Check if the raw password matches the stored hash
//		boolean isPasswordMatch = passwordEncoder.matches(rawPassword, storedHash);
//
//		System.out.println("Password match: " + isPasswordMatch);





	}



}
