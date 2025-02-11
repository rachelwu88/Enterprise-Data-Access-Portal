package com.maxxenergy.Backend.Controllers.UserRepo;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/register")
@Validated
public class UserRegistration {
    private final UserRepository userRepository;

    public UserRegistration(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    public String registerUser(@Validated @RequestBody User user) {
        if (userRepository.getUserByEmail(user.getEmail()).isPresent()) {
            return "Email is already registered!";
        }
        userRepository.save(user);
        return "usergistered successfully";
    }
}
