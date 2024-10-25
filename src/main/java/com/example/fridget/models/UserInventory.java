package com.example.fridget.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class UserInventory {

    @Id
    @GeneratedValue
    private int id;

    @OneToOne
    private User userId;

}
