package com.maxxenergy.Backend.Controllers.UserRepo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> getUserById(Long id);
    Optional<User> getUserByEmail(String email);
}
