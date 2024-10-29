package com.example.fridget.models;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class RecipeInventory {

    @Id
    @GeneratedValue
    private int id;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonProperty("recipeId")
    private Recipe recipeId;

    @OneToMany(cascade = CascadeType.ALL)
    @JsonProperty("recipeIngredientsList")
    private List<Ingredients> recipeIngredientsList = new ArrayList<>();

    public RecipeInventory(@JsonProperty("id") int id, @JsonProperty("recipeIngredientsList") List<Ingredients> recipeIngredientsList, @JsonProperty("recipeId") Recipe recipeId) {
        this.id = id;
        this.recipeIngredientsList = recipeIngredientsList;
        this.recipeId = recipeId;
    }

    public RecipeInventory() {
    }

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

    @Override
    public String toString() {
        return "RecipeInventory{" +
                "id=" + id +
                ", recipeId=" + recipeId +
                ", recipeIngredientsList=" + recipeIngredientsList +
                '}';
    }
}
