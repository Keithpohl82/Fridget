package com.example.fridget.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Ingredients {

    @Id
    @GeneratedValue
    private int id;


    @ManyToMany(mappedBy = "ingredientsList")
    private List<Recipe> recipeList = new ArrayList<>();

    @OneToMany(mappedBy = "userIngredientsList")
    private List<UserInventory> listOfIngredients = new ArrayList<>();

    private String name;

    public Ingredients() {

    }

    public Ingredients(List<Recipe> recipeList, String name) {
        this.recipeList = recipeList;
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

    public List<Recipe> getRecipeList() {
        return recipeList;
    }

    public void setRecipeList(List<Recipe> recipeList) {
        this.recipeList = recipeList;
    }
}
