package com.maxxenergy.Backend.Controllers.UserRepo;

import com.maxxenergy.Backend.Controllers.SecurityRepo.Role;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "ex_users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstname;
    private String lastname;
    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public User() {
    }

    public User(Long id, String firstname, String lastname, String email, String password, Role role) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public User(String name, String email, String password) {
        this.email = email;
        this.password = password;

    }


    // Getters
    public Long getId() { return id; }

    public String getFirstname() { return firstname; }

    public String getLastname() { return lastname; }

    public String getEmail() { return email; }

    public String getPassword() { return password; }

    public Role getRole() { return role; }

    // Setters
    public void setId(Long id) { this.id = id; }

    public void setFirstname(String firstname) { this.firstname = firstname; }

    public void setLastname(String lastname) { this.lastname = lastname; }

    public void setEmail(String email) { this.email = email; }

    public void setPassword(String password) { this.password = password; }

    public void setRole(Role role) { this.role = role; }

    // Update profile information
    public void updateProfile(String newFirstname, String newLastname, String newEmail) {
        this.firstname = newFirstname;
        this.lastname = newLastname;
        this.email = newEmail;
    }

    // Validate email and password
    public boolean hasEmail(String email) { return this.email.equals(email); }

    public boolean validatePassword(String password) { return this.password.equals(password);}

    // Check permissions
    public boolean hasPermission(String permission) { return role.hasPermission(permission); }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();

        // add role as an authority
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.name()));

        authorities.addAll(role.getPermissions().stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList()));

        return authorities;
    }

    @Override
    public String getUsername() { return email; }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() {return true;}

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstname='" + firstname + '\'' +
                ", lastname='" + lastname + '\'' +
                ", email='" + email + '\'' +
                ", role=" + role +
                '}';
    }

    public String getName() {
        return setName("");
    }

    public String setName(String name) {
        String[] fullName = name.split(" ", 2);
        this.firstname = fullName[0];
        this.lastname = fullName[1];
        return name;
    }
}