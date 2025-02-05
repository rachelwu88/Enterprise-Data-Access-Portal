package com.maxxenergy.Backend.Controllers.UserRepo;

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
    
    /**
     * This method checks if the given email is already taken by a user.
     * @param email The email to be checked.
     * @return True if the email is taken, false otherwise.
     */
    public boolean isEmailTaken(String email) {
        return getUserByEmail(email) != null;
    }

    /**
     * Updates the user's name and password. Email cannot be updated as it's used as an identifier.
     * @param email Current email of the user
     * @param newName New name for the user
     * @param newPassword New password for the user
     * @return True if user was updated, false if user not found
     */
    public boolean updateUser(String email, String newName, String newPassword) {
        User user = getUserByEmail(email);
        if (user != null) {
            user.setName(newName);
            user.setPassword(newPassword);
            return true;
        }
        return false;
    }

    /**
     * Removes a user from the system using their email.
     * @param email Email of the user to remove
     * @return True if user was removed, false if user not found
     */
    public boolean removeUser(String email) {
        User user = getUserByEmail(email);
        if (user != null) {
            users.remove(user);
            return true;
        }
        return false;
    }

    /**
     * Returns a list of all users in the system.
     * @return List of all users
     */
    public List<User> getAllUsers() {
        return new ArrayList<>(users); // Return a copy to prevent external modifications
    }

    /**
     * Returns the total number of registered users.
     * @return Number of users in the system
     */
    public int getUserCount() {
        return users.size();
    }
}
