package com.example.fridget.models;
import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = false)
    private String firstName;

    @Column(nullable = false, unique = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String userEmail;

    @Column(nullable = false, unique = false)
    private String pwHash;

    @Column(nullable = false, unique = false)
    private boolean isAdmin = false;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RecipeReview> userReviews;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User(String username, String pwHash, boolean isAdmin, String firstName, String lastName, String userEmail) {
        this.username = username;
        this.pwHash = encoder.encode(pwHash);
        this.isAdmin = isAdmin;
        this.firstName = firstName;
        this.lastName = lastName;
        this.userEmail = userEmail;
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

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailAddress() {
        return userEmail;
    }

    public void setEmailAddress(String emailAddress) {
        this.userEmail = userEmail;
    }
}
