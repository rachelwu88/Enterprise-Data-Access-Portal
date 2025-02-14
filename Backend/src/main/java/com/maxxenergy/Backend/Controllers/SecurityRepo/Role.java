package com.maxxenergy.Backend.Controllers.SecurityRepo;

import java.util.Set;

public enum Role {
    USER(Set.of("READ_BASIC")),
    MANAGER(Set.of("READ_BASIC", "WRITE")),
    Admin(Set.of("READ_BASIC", "READ_SENSITIVE", "WRITE"));

    private final Set<String> permissions;

    Role(Set<String> permissions){
        this.permissions = permissions;
    }

    // checks if the role has a specific permission.
    public boolean hasPermission(String permission){
        return permissions.contains(permission);}

    public Set<String> getPermissions() {
        return permissions;
    }
}
