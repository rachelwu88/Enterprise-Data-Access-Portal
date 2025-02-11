package com.maxxenergy.Backend.Controllers.UserRepo;

public class UserLogin {

    private final UserManager userManager;

    public UserLogin(UserManager userManager) {
        this.userManager = userManager;
    }

    public boolean login(String email, String password){
        User user = userManager.getUserByEmail(email);

        if (user == null){
            System.out.println("User not found");
            return false;
        }
        if (password.equals(user.getPassword())){
            System.out.println("Login successful!");
            return true;
        }
        else {
            System.out.println("Incorrect password");
            return false;
        }

    }



}