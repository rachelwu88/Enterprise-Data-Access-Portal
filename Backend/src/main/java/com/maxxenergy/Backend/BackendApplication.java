package com.maxxenergy.Backend;

import com.maxxenergy.Backend.Controllers.UserRepo.User;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@RestController
	@RequestMapping("/api/auth")
	public class AuthController {


		@PostMapping("/login")
		public ResponseEntity<?> login(@RequestBody User user ) {
			// Implement authentication logic
			return ResponseEntity.ok("User logged in successfully");
		}

		@PostMapping("/register")
		public ResponseEntity<?> register(@RequestBody User user) {
			// Implement user registration logic
			return ResponseEntity.ok("User registered successfully");
		}

		@PostMapping("/logout")
		public ResponseEntity<?> logout() {
			// Implement logout logic
			return ResponseEntity.ok("User logged out successfully");
		}
	}

}
