package com.example.fridget.models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;

@Entity
public class UserProfile extends AbstractClass{

    @OneToOne
    private User user;
}
