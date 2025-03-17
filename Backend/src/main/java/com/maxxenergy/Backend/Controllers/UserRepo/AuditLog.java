package com.maxxenergy.Backend.Controllers.UserRepo;

import com.maxxenergy.Backend.Controllers.SecurityRepo.Role;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "maxaudit_logs", schema = "audit_logs")
public class AuditLog {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String action;

    @Column(nullable = false)
    private String userEmail;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role userRole;

    @Column(nullable = false)
    private String details;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    // Default constructor
    public AuditLog() {
        this.timestamp = LocalDateTime.now();
    }

    // Constructor with parameters
    public AuditLog(String action, String userEmail, Role userRole, String details) {
        this.action = action;
        this.userEmail = userEmail;
        this.userRole = userRole;
        this.details = details;
        this.timestamp = LocalDateTime.now();
    }

    // Getters
    public Long getId() { return id; }
    public String getAction() { return action; }
    public String getUserEmail() { return userEmail; }
    public Role getUserRole() { return userRole; }
    public String getDetails() { return details; }
    public LocalDateTime getTimestamp() { return timestamp; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setAction(String action) { this.action = action; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    public void setUserRole(Role userRole) { this.userRole = userRole; }
    public void setDetails(String details) { this.details = details; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
} 