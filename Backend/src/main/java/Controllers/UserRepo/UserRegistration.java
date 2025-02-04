package Controllers.UserRepo;


import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/register")
@Validated
public class UserRegistration {

    @PostMapping
    public String registerUser(@Validated @RequestBody User user) {

        return "";
    }
}
