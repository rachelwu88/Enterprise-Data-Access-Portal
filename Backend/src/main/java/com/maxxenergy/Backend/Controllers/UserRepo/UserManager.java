package com.maxxenergy.Backend.Controllers.UserRepo;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.UUID;

@Service
public class UserManager {

    private List<User> users;

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

    /**
     * Searches for users whose names contain the given search term (case-insensitive)
     * @param searchTerm The term to search for in user names
     * @return List of users whose names contain the search term
     */
    public List<User> searchUsersByName(String searchTerm) {
        return users.stream()
                .filter(user -> user.getName().toLowerCase().contains(searchTerm.toLowerCase()))
                .collect(Collectors.toList());
    }

    /**
     * Searches for users with email domains matching the given domain
     * @param domain The email domain to search for (e.g., "gmail.com")
     * @return List of users with matching email domains
     */
    public List<User> getUsersByEmailDomain(String domain) {
        return users.stream()
                .filter(user -> user.getEmail().endsWith("@" + domain))
                .collect(Collectors.toList());
    }

    /**
     * Batch removes multiple users by their emails
     * @param emails List of email addresses to remove
     * @return Number of users successfully removed
     */
    public int removeUsers(List<String> emails) {
        int initialCount = users.size();
        users.removeIf(user -> emails.contains(user.getEmail()));
        return initialCount - users.size();
    }

    /**
     * Checks if the system has any users
     * @return true if there are no users in the system
     */
    public boolean isEmpty() {
        return users.isEmpty();
    }

    /**
     * Removes all users from the system
     * Use with caution!
     */
    public void clearAllUsers() {
        users.clear();
    }

    /**
     * Creates a backup of all current users
     * @return A deep copy of the current user list
     */
    public List<User> backupUsers() {
        List<User> backup = new ArrayList<>();
        for (User user : users) {
            backup.add(new User(user.getName(), user.getEmail(), user.getPassword()));
        }
        return backup;
    }

    /**
     * Restores users from a backup
     * @param backup The list of users to restore from
     */
    public void restoreFromBackup(List<User> backup) {
        users.clear();
        users.addAll(backup);
    }

    /**
     * Adds multiple users at once
     * @param newUsers List of users to add
     * @return Number of users successfully added (excluding duplicates)
     */
    public int addUsers(List<User> newUsers) {
        int added = 0;
        for (User user : newUsers) {
            if (!isEmailTaken(user.getEmail())) {
                users.add(user);
                added++;
            }
        }
        return added;
    }

    /**
     * Resets a user's password using their email
     * @param email The user's email
     * @param oldPassword The current password
     * @param newPassword The new password
     * @return true if password was reset, false if user not found or old password incorrect
     */
    public boolean resetPassword(String email, String oldPassword, String newPassword) {
        User user = getUserByEmail(email);
        if (user != null && user.validatePassword(oldPassword)) {
            user.setPassword(newPassword);
            return true;
        }
        return false;
    }

    /**
     * Force resets a user's password (admin function)
     * @param email The user's email
     * @param newPassword The new password
     * @return true if password was reset, false if user not found
     */
    public boolean adminResetPassword(String email, String newPassword) {
        User user = getUserByEmail(email);
        if (user != null) {
            user.setPassword(newPassword);
            return true;
        }
        return false;
    }
}
