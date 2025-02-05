package Controllers.UserRepo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // tells Hibernate to make a table out of this class
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;

    public User() {}

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    //getters
    public String getName() {
        return name;
    }
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }
    public Long getId() {
        return id;
    }

    //setters
    public void setName(String name) {
        this.name = name;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Updates this user's profile information
     * @param newName New name for the user
     * @param newEmail New email for the user
     */
    public void updateProfile(String newName, String newEmail) {
        this.name = newName;
        this.email = newEmail;
    }

    /**
     * Checks if this user matches the provided email
     * @param email Email to check
     * @return true if this user has the provided email
     */
    public boolean hasEmail(String email) {
        return this.email.equals(email);
    }

    /**
     * Validates if the provided password matches this user's password
     * @param password Password to check
     * @return true if passwords match
     */
    public boolean validatePassword(String password) {
        return this.password.equals(password);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
   
