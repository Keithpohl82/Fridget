package com.example.fridget.dtos;

public class UserDTO {
    private Long id; // Add this field
    private String username;
    private String profilePicture;
    private String email;
    private String bio; // Optional field for user bio

    // Constructor
    public UserDTO(Long id, String username, String profilePicture, String email, String bio) {
        this.id = id;
        this.username = username;
        this.profilePicture = profilePicture;
        this.email = email;
        this.bio = bio;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}

