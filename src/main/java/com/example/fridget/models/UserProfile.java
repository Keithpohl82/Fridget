package com.example.fridget.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

import java.time.LocalDate;

@Entity
public class UserProfile extends AbstractClass{

    @OneToOne
    @JsonBackReference
    private User user;

    @Column(nullable = true, unique = false)
    private String firstName;

    @Column(nullable = true, unique = false)
    private String lastName;

    @Column(nullable = true, unique = false)
    private LocalDate birthday;

    @Column(nullable = true, unique = false)
    private String profileImage;

    @Column(nullable = true, unique = false, length = 2000)
    private String userbio;

    @Column(nullable = true, unique = false)
    private String location;

    public LocalDate getBirthday() {
        return birthday;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getUserbio() {
        return userbio;
    }

    public void setUserbio(String userbio) {
        this.userbio = userbio;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public UserProfile() {
        super();
    }

    public UserProfile(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
