package com.maxxenergy.Backend.Controllers.UserRepo;

import com.maxxenergy.Backend.Controllers.SecurityRepo.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuditService {
    
    @Autowired
    private AuditLogRepository auditLogRepository;


    public void logAction(String action, String userEmail, Role userRole, String details) {
        AuditLog log = new AuditLog(action, userEmail, userRole, details);
        auditLogRepository.save(log);
    }

    public List<AuditLog> getAllLogs() {
        return auditLogRepository.findAll();
    }


    public List<AuditLog> getLogsByUser(String userEmail) {
        return auditLogRepository.findByUserEmail(userEmail);
    }

    public List<AuditLog> getLogsByRole(Role role) {
        return auditLogRepository.findByUserRole(role);
    }

  
    public List<AuditLog> getLogsByAction(String action) {
        return auditLogRepository.findByActionContaining(action);
    }

    public List<AuditLog> getLogsBetweenDates(LocalDateTime start, LocalDateTime end) {
        return auditLogRepository.findByTimestampBetween(start, end);
    }

    public List<AuditLog> getLogsByUserAndRole(String userEmail, Role role) {
        return auditLogRepository.findByUserEmailAndUserRole(userEmail, role);
    }
} 