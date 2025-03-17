package com.maxxenergy.Backend.Controllers.UserRepo;

import com.maxxenergy.Backend.Controllers.SecurityRepo.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/audit")
public class AuditController {
    
    @Autowired
    private AuditService auditService;

    // Only admins can access these endpoints
    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/logs")
    public List<AuditLog> getAllLogs() {
        return auditService.getAllLogs();
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/logs/user/{email}")
    public List<AuditLog> getUserLogs(@PathVariable String email) {
        return auditService.getLogsByUser(email);
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/logs/role/{role}")
    public List<AuditLog> getRoleLogs(@PathVariable Role role) {
        return auditService.getLogsByRole(role);
    }

    @PreAuthorize("hasRole('Admin')")
    @GetMapping("/logs/action/{action}")
    public List<AuditLog> getActionLogs(@PathVariable String action) {
        return auditService.getLogsByAction(action);
    }
} 