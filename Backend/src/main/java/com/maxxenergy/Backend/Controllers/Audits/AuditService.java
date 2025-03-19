package com.maxxenergy.Backend.Controllers.Audits;

import com.maxxenergy.Backend.Controllers.UserRepo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuditService {

    @Autowired
    private UserAuditRepository userAuditRepository;

    public void logUser(User user) {
        try {
            if (user == null) {
                System.out.println("No user found for auditing!");
                return;
            }

            System.out.println("Logging user action for: " + user.getEmail());

            if (userAuditRepository == null) {
                System.out.println("Error: userAuditRepository is NULL! Audit log cannot be saved.");
                return;
            }

            // Ensure UserAudit object is created and stored
            UserAudit audit = new UserAudit();
            audit.setUserID(user.getEmail()); // Store user email as user ID

            userAuditRepository.saveAndFlush(audit);
            System.out.println("Audit log saved for: " + user.getEmail());

        } catch (Exception e) {
            System.out.println("Error in logUser(): " + e.getMessage());
            e.printStackTrace();
        }
    }
}



        /*
        if (user == null) {
            System.out.println("No user found for auditing");
            return;
        }

        // Retrieve authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            System.out.println("Unauthenticated action attempted");
            return;
        }

        // Create a new audit entry
        UserAudit audit = new UserAudit();
        audit.setUserID(user.getId().toString());

        userAuditRepository.saveAndFlush(audit);//record is immediately written
        System.out.println("Audit log saved for User ID: " + user.getId());
        *

        public void testAuditEntry() {
    UserAudit audit = new UserAudit();
    audit.setUserID("test_user@example.com"); // Simulate a user
    userAuditRepository.save(audit);
}

         */




