package Controllers.UserRepo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;


    //Create a new user
    @PostMapping
    public ResponseEntity<User> createUser (@RequestBody User user){
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    //Update information of the user
    @PutMapping("/")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        Optional<User> currentUser = userRepository.findById(id);
        if (currentUser.isPresent()) {
            User user = currentUser.get();
            user.setEmail(userDetails.getEmail());
            user.setName((userDetails.getName()));
            user.setPassword(userDetails.getPassword());
            userRepository.save(user);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    //Delete user
    @DeleteMapping("/")
    public ResponseEntity<Void> deleteUser(@PathVariable long id){
        if(userRepository.existsById(id)){
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }else {
            return ResponseEntity.notFound().build();
        }
    }


}


