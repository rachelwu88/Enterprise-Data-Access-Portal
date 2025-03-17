package com.maxxenergy.Backend.Controllers.UserRepo;

import java.util.Optional;

public class UserLogin {

    private final UserManager userManager;

    public UserLogin(UserManager userManager) {
        this.userManager = userManager;
    }

    public boolean login(String email, String password){
        Optional<User> user = userManager.getUserByEmail(email);

        if (user == null){
            System.out.println("User not found");
            return false;
        }
        else {
            System.out.println("Incorrect password");
            return false;
        }

    }



}