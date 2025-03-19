package com.maxxenergy.Backend.Controllers.Audits;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAuditRepository extends JpaRepository<UserAudit, Integer> {

}
