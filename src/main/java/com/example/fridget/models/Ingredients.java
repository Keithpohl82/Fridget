package com.example.fridget.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Ingredients {

    @Id
    @GeneratedValue
    private int id;

    @OneToMany(mappedBy = "userIngredientsList")
    private List<UserInventory> listOfIngredients = new ArrayList<>();

    @OneToMany(mappedBy = "recipeIngredientsList")
    private List<RecipeInventory> ingredientsList = new ArrayList<>();

    private String name;

    public Ingredients() {

    }

    public Ingredients(int id, List<UserInventory> listOfIngredients, List<RecipeInventory> ingredientsList, String name) {
        this.id = id;
        this.listOfIngredients = listOfIngredients;
        this.ingredientsList = ingredientsList;
        this.name = name;
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
