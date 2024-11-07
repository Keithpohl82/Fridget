package com.example.fridget.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Ingredients {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToMany
    private List<Recipe> recipe = new ArrayList<>();

    @OneToMany(mappedBy = "userIngredientsList")
    private List<UserInventory> listOfIngredients = new ArrayList<>();



    private String name;

    public Ingredients() {

    }

    public Ingredients(int id, List<Recipe> recipe, List<UserInventory> listOfIngredients, String name) {
        this.id = id;
        this.listOfIngredients = listOfIngredients;

        this.name = name;
        this.recipe = recipe;
    }

    public Ingredients(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


}
