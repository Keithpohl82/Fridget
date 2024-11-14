package com.example.fridget.models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

@Entity
public class UserProfile extends AbstractClass{

    @OneToOne
    private User user;

    public UserProfile() {

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
}
