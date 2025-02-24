package com.maxxenergy.Backend.Controllers.UserRepo;

import com.maxxenergy.Backend.Controllers.SecurityRepo.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserManager userManager;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    //Create a new user
    @PostMapping
    public ResponseEntity<User> createUser (@RequestBody User user){
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    //Update information of the user
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        Optional<User> currentUser = userRepository.findById(id);
        if (currentUser.isPresent()) {
            User user = currentUser.get();
            user.setEmail(userDetails.getEmail());
            user.setName((userDetails.getFirstname()));
            user.setName(userDetails.getLastname());
            user.setPassword(userDetails.getPassword());
            userRepository.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    //Delete user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id){
        if(userRepository.existsById(id)){
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Reset password endpoint for users
     */
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestParam String email,
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {
        
        if (userManager.resetPassword(email, oldPassword, newPassword)) {
            return ResponseEntity.ok("Password reset successful");
        }
        return ResponseEntity.badRequest().body("Invalid email or password");
    }

    /**
     * Admin endpoint to force reset a user's password
     */
    @PostMapping("/admin/reset-password")
    public ResponseEntity<?> adminResetPassword(
            @RequestParam String email,
            @RequestParam String newPassword) {
        
        if (userManager.adminResetPassword(email, newPassword)) {
            return ResponseEntity.ok("Password reset successful");
        }
        return ResponseEntity.badRequest().body("User not found");
    }

    @PutMapping("/admin/update-role")
    public ResponseEntity<String> updateUserRole(
            @RequestParam String email,
            @RequestParam Role newRole) {

        boolean updated = userManager.updateUserRole(email, newRole);
        if (updated) {
            return ResponseEntity.ok("User role updated successfully!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(" User not found.");
    }

    @PutMapping("/admin/update-user")
    public ResponseEntity<String> updateUserDetails(
            @RequestParam String email,
            @RequestParam String newFirstname,
            @RequestParam String newLastname,
            @RequestParam String newEmail) {

        boolean updated = userManager.updateUserDetails(email, newFirstname, newLastname, newEmail);
        if (updated) {
            return ResponseEntity.ok("User details updated successfully!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
    }

    @PutMapping("/admin/update-user")
    public ResponseEntity<String> updateUserDetails(
            @RequestParam String adminEmail,  // Admin's email
            @RequestParam String email,
            @RequestParam String newFirstname,
            @RequestParam String newLastname,
            @RequestParam String newEmail) {

        User admin = userManager.getUserByEmail(adminEmail);

        if (admin == null || !admin.getRole().equals(Role.ADMIN)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access Denied: Admin rights required.");
        }

        boolean updated = userManager.updateUserDetails(email, newFirstname, newLastname, newEmail);
        if (updated) {
            return ResponseEntity.ok("User details updated successfully!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
    }


}


