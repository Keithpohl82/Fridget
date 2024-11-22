package com.example.fridget.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "users")
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @ElementCollection
    @CollectionTable(name = "user_grocery_list", joinColumns = @JoinColumn(name = "user_id"))
    private List<String> grocerylist;

    @OneToOne(mappedBy = "author", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference //inverse
    private Recipe authoredrecipe;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public User(Recipe authoredrecipe, Long id, UserProfile userProfile, String username, String firstName, String lastName, String userEmail, String pwHash, boolean isAdmin, List<String> grocerylist) {
        this.id = id;
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

    public Recipe getAuthoredrecipe() {
        return authoredrecipe;
    }

    public void setAuthoredrecipe(Recipe authoredrecipe) {
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

    public Long getId() {
        return id;
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
