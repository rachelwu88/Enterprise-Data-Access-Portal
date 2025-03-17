package com.maxxenergy.Backend.Controllers.SecurityRepo.Auth;

import com.maxxenergy.Backend.Controllers.Audits.AuditService;
import com.maxxenergy.Backend.Controllers.SecurityRepo.Config.AuthService;
import com.maxxenergy.Backend.Controllers.SecurityRepo.Role;
import com.maxxenergy.Backend.Controllers.UserRepo.User;
import com.maxxenergy.Backend.Controllers.UserRepo.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final AuditService auditService; // Inject AuditService

    public AuthenticationService(
            UserRepository repository,
            PasswordEncoder passwordEncoder,
            AuthService authService,
            AuthenticationManager authenticationManager,
            AuditService auditService) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.auditService = auditService;
    }

    @Transactional
    public AuthenticationResponse register(RegisterRequest request) {
        System.out.println("Registering new user: " + request.getEmail());

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

        User savedUser = repository.save(user);
        System.out.println("User saved successfully with ID: " + savedUser.getId());

        // audit log is created when a user registers
        if (auditService != null) {
            auditService.logUser(savedUser);
            System.out.println("Audit log triggered for user: " + savedUser.getEmail());
        } else {
            System.out.println("Error: auditService is NULL, audit log not saved!");
        }

        String authToken = authService.generateToken(savedUser);
        return new AuthenticationResponse(authToken);
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
        return new AuthenticationResponse(authToken);
    }
}
