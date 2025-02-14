package com.maxxenergy.Backend.Controllers.UserRepo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> getUserById(Long id);
    Optional<User> getUserByEmail(String email);
//    Optional<User> findByResetToken(String resetToken);
}
