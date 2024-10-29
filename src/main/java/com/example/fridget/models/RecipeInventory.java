package com.example.fridget.models;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class RecipeInventory {

    @Id
    @GeneratedValue
    private int id;

    @OneToOne()
    private Recipe recipeId;

    @OneToMany()
    private List<Ingredients> recipeIngredientsList = new ArrayList<>();

    public Recipe getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Recipe recipeId) {
        this.recipeId = recipeId;
    }

    public List<Ingredients> getRecipeIngredientsList() {
        return recipeIngredientsList;
    }

    public void setRecipeIngredientsList(List<Ingredients> recipeIngredientsList) {
        this.recipeIngredientsList = recipeIngredientsList;
    }
}
