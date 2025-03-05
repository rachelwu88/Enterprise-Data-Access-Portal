package com.maxxenergy.Backend.Controllers.Audits;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_logs")
@EntityListeners(AuditingEntityListener.class)
public class UserAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String userID;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createDate = LocalDateTime.now();

    @CreatedBy
    @Column(nullable = false, updatable = false)
    private String createdBy;

    @LastModifiedBy
    @Column(insertable = false)
    private String lastModifiedBy;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime lastModified;

    public void setUserID(String userId) {
        this.userID = userId;
        this.createdBy = userId;
    }

    public String getUserID() {
        return userID;
    }
}
