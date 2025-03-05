package com.maxxenergy.Backend.Controllers.UserRepo;

import com.maxxenergy.Backend.Controllers.Audits.AuditService;
import com.maxxenergy.Backend.Controllers.SecurityRepo.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuditService auditService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update user information
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setEmail(userDetails.getEmail());
                    user.setFirstName(userDetails.getFirstName());
                    user.setLastName(userDetails.getLastName());
                    user.setPassword(userDetails.getPassword());
                    return ResponseEntity.ok(userRepository.save(user));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Reset password
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String email,
                                                @RequestParam String oldPassword,
                                                @RequestParam String newPassword) {
        return userRepository.getUserByEmail(email)
                .map(user -> {
                    if (user.validatePassword(oldPassword)) {
                        user.setPassword(newPassword);
                        userRepository.save(user);
                        return ResponseEntity.ok("Password reset successful");
                    }
                    return ResponseEntity.badRequest().body("Invalid email or password");
                })
                .orElse(ResponseEntity.badRequest().body("User not found"));
    }

    // Admin resets user password
    @PostMapping("/admin/reset-password")
    public ResponseEntity<String> adminResetPassword(@RequestParam String email,
                                                     @RequestParam String newPassword) {
        return userRepository.getUserByEmail(email)
                .map(user -> {
                    user.setPassword(newPassword);
                    userRepository.save(user);
                    return ResponseEntity.ok("Password reset successful");
                })
                .orElse(ResponseEntity.badRequest().body("User not found"));
    }

    // Update user role
    @PutMapping("/admin/update-role")
    public ResponseEntity<String> updateUserRole(@RequestParam String email,
                                                 @RequestParam Role newRole) {
        return userRepository.getUserByEmail(email)
                .map(user -> {
                    user.setRole(newRole);
                    userRepository.save(user);
                    return ResponseEntity.ok("User role updated successfully!");
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found."));
    }

    // Update user details
    @PutMapping("/admin/update-user")
    public ResponseEntity<String> updateUserDetails(@RequestParam String email,
                                                    @RequestParam String newFirstname,
                                                    @RequestParam String newLastname,
                                                    @RequestParam String newEmail) {
        return userRepository.getUserByEmail(email)
                .map(user -> {
                    user.setFirstName(newFirstname);
                    user.setLastName(newLastname);
                    user.setEmail(newEmail);
                    userRepository.save(user);
                    return ResponseEntity.ok("User details updated successfully!");
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found."));
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        System.out.println("Creating new user: " + user.getEmail());

        User savedUser = userRepository.save(user);
        System.out.println("User saved with ID: " + savedUser.getId());

        if (auditService == null) {
            System.out.println("auditService is NULL. Spring didn't inject it!");
        } else {
            auditService.logUser(savedUser);
            System.out.println("Audit log triggered.");
        }

        return ResponseEntity.ok(savedUser);
    }



}

