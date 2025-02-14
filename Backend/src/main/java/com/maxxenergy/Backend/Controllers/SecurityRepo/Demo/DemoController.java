package com.maxxenergy.Backend.Controllers.SecurityRepo.Demo;

import com.maxxenergy.Backend.Controllers.UserRepo.User;
import com.maxxenergy.Backend.Controllers.UserRepo.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/demo-controller")
public class DemoController {

    private final UserRepository userRepository;

    public DemoController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("hello from secured endpoint");
    }

    @GetMapping("/basic")
        public ResponseEntity<String> getBasicData(){
            User user = getAuthencatedUser();
            if (user.hasPermission("READ_BASIC")){
                return ResponseEntity.ok("Basic data accessible");
            }
            return ResponseEntity.status(403).body("Access Denied");
        }

        @GetMapping("/admin")
        public ResponseEntity<String> getSensitiveData(){
            User user = getAuthencatedUser();
            if (user.hasPermission("READ_ADMIN")){
                return ResponseEntity.ok("Admin data accessible");
            }
            return ResponseEntity.status(403).body("Access Denied");
        }

    private User getAuthencatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.getUserByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}

