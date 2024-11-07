package com.example.fridget.models;

import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    private int id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = false)
    private String pwHash;

    @Column(nullable = false, unique = false)
    private boolean isAdmin = false;



    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User(String username, String pwHash, boolean isAdmin) {
        this.username = username;
        this.pwHash = encoder.encode(pwHash);
        this.isAdmin = isAdmin;
    }

    public User() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPwHash() {
        return pwHash;
    }

    public void setPwHash(String pwHash) {
        this.pwHash = pwHash;
    }

    public int getId() {
        return id;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }
}
