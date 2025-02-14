package com.maxxenergy.Backend.Controllers.SecurityRepo.Auth;

import com.maxxenergy.Backend.Controllers.SecurityRepo.Config.AuthService;
import com.maxxenergy.Backend.Controllers.SecurityRepo.Role;
import com.maxxenergy.Backend.Controllers.UserRepo.User;
import com.maxxenergy.Backend.Controllers.UserRepo.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepository repository,
            PasswordEncoder passwordEncoder,
            AuthService authService,
            AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(RegisterRequest request) {
        if (repository.getUserByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already in use");
        }
        User user = new User(
                null, // ID is auto-generated
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                Role.USER
        );

        repository.save(user);
        String authToken = authService.generateToken(user);

        return new AuthenticationResponse(authToken); // Using constructor instead of builder()
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = repository.getUserByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String authToken = authService.generateToken(user);

        return new AuthenticationResponse(authToken); // Using constructor instead of builder()
    }
}
