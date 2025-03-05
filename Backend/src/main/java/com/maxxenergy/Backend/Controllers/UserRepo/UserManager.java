package com.maxxenergy.Backend.Controllers.UserRepo;

import com.maxxenergy.Backend.Controllers.SecurityRepo.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class
UserManager {

    private final UserRepository userRepository;

    @Autowired
    public UserManager(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.getUserByEmail(email);
    }

    public boolean isEmailTaken(String email) {
        return userRepository.getUserByEmail(email).isPresent();
    }

    public boolean updateUser(String email, String newName, String newPassword) {
        return userRepository.getUserByEmail(email)
                .map(user -> {
                    user.setFirstName(newName);
                    user.setPassword(newPassword);
                    userRepository.save(user);
                    return true;
                })
                .orElse(false);
    }

    public boolean removeUser(String email) {
        return userRepository.getUserByEmail(email)
                .map(user -> {
                    userRepository.delete(user);
                    return true;
                })
                .orElse(false);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public int getUserCount() {
        return (int) userRepository.count();
    }

    public boolean resetPassword(String email, String oldPassword, String newPassword) {
        return userRepository.getUserByEmail(email)
                .map(user -> {
                    if (user.validatePassword(oldPassword)) {
                        user.setPassword(newPassword);
                        userRepository.save(user);
                        return true;
                    }
                    return false;
                })
                .orElse(false);
    }

    public boolean adminResetPassword(String email, String newPassword) {
        return userRepository.getUserByEmail(email)
                .map(user -> {
                    user.setPassword(newPassword);
                    userRepository.save(user);
                    return true;
                })
                .orElse(false);
    }

    public boolean updateUserRole(String email, Role newRole) {
        return userRepository.getUserByEmail(email)
                .map(user -> {
                    user.setRole(newRole);
                    userRepository.save(user);
                    return true;
                })
                .orElse(false);
    }

    public boolean updateUserDetails(String email, String newFirstname, String newLastname, String newEmail) {
        return userRepository.getUserByEmail(email)
                .map(user -> {
                    user.setFirstName(newFirstname);
                    user.setLastName(newLastname);
                    user.setEmail(newEmail);
                    userRepository.save(user);
                    return true;
                })
                .orElse(false);
    }
}
