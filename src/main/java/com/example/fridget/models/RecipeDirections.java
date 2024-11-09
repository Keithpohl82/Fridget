package com.example.fridget.models;


import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class RecipeDirections {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(mappedBy = "steps")
    private List<Recipe> recipeSteps = new ArrayList<>();

    public RecipeDirections(int id, List<Recipe> recipeSteps) {
        this.id = id;
        this.recipeSteps = recipeSteps;
    }

    public RecipeDirections() {
    }

    public List<Recipe> getRecipeSteps() {
        return recipeSteps;
    }

    public void setRecipeSteps(List<Recipe> recipeSteps) {
        this.recipeSteps = recipeSteps;
    }

    public int getId() {
        return id;
    }
}
