package com.example.fridget.models;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class UserInventory {

    @Id
    @GeneratedValue
    private int id;

    @OneToOne
    private User userId;

    @OneToMany()
    private List<Ingredients> userIngredientsList = new ArrayList<>();

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public List<Ingredients> getUserIngredientsList() {
        return userIngredientsList;
    }

    public void setUserIngredientsList(List<Ingredients> userIngredientsList) {
        this.userIngredientsList = userIngredientsList;
    }
}
