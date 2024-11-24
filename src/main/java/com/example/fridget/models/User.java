package com.example.fridget.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Entity
@Table(name = "users")
public class User extends AbstractClass implements Serializable {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;

    @OneToOne(mappedBy = "user")
    private UserProfile userProfile;

    @Column()
    private String firstName;

    @Column()
    private String lastName;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(unique = true)
    private String userEmail;

    @Column(nullable = false)
    private String pwHash;

    @Column(nullable = false)
    private boolean isAdmin = false;

    @Column(name = "profile_picture_path")
    private String profilePicturePath;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<String> grocerylist;

    @OneToMany(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference //inverse
    private List<Recipe> authoredrecipe = new ArrayList<>();

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User(List<Recipe> authoredrecipe, UserProfile userProfile, String username, String firstName, String lastName, String userEmail, String pwHash, boolean isAdmin, List<String> grocerylist) {

        this.username = username;
        this.userEmail = userEmail;
        this.pwHash = encoder.encode(pwHash);
        this.isAdmin = isAdmin;
        this.userProfile = userProfile;
        this.grocerylist = grocerylist;
        this.authoredrecipe = authoredrecipe;
    }

    public User() {
    }

    public List<Recipe> getAuthoredrecipe() {
        return authoredrecipe;
    }

    public void setAuthoredrecipe(List<Recipe> authoredrecipe) {
        this.authoredrecipe = authoredrecipe;
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

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    public String getProfilePicturePath() {
        return profilePicturePath;
    }

    public void setProfilePicturePath(String profilePicturePath) {
        this.profilePicturePath = profilePicturePath;
    }

    public List<String> getGrocerylist() {
        return grocerylist;
    }

    public void setGrocerylist(List<String> grocerylist) {
        this.grocerylist = grocerylist;
    }

    @Override
    public String toString() {
        return "User{" +
                "userProfile=" + userProfile +
                ", username='" + username + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", pwHash='" + pwHash + '\'' +
                ", isAdmin=" + isAdmin +
                '}';
    }
}
