package Controllers.UserRepo;

import java.util.ArrayList;
import java.util.List;

public class UserManager {

    private List<User> users;

    public UserManager(){
        users = new ArrayList<>();
        //adding users for testing
        users.add(new User("John Doe", "Johndoe@gmail.com", "password123"));
        users.add(new User("Jane Doe", "Janedoe1@gmail.com", "password321"));
    }

    public User getUserByEmail(String email){
        for (User user : users){
            if (user.getEmail().equals(email)){
                return user;
            }
        }
        return null;
    }
}
