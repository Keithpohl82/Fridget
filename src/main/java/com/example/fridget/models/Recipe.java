package com.example.fridget.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Recipe {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    
    private String description;

    private int prepTime;

    private int cookTime;

    private int totalTime;

    @ElementCollection
    private List<RecipeInventory> ingredients;

    public List<RecipeInventory> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<RecipeInventory> ingredients) {
        this.ingredients = ingredients;
    }
//Need a list of steps for preping and cooking
    //Not sure how to handle this

    //This should be a list/table
    //private String cuisine;

    //Add later
    //private String photoUrl;

    public Recipe(List<RecipeInventory> ingredients, String name, String description, int prepTime, int cookTime, int totalTime) {
        this.ingredients = ingredients;
        this.name = name;
        this.description = description;
        this.prepTime = prepTime;
        this.cookTime = cookTime;
        this.totalTime = totalTime;
    }

    public Recipe() {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPrepTime() {
        return prepTime;
    }

    public void setPrepTime(int prepTime) {
        this.prepTime = prepTime;
    }

    public int getCookTime() {
        return cookTime;
    }

    public void setCookTime(int cookTime) {
        this.cookTime = cookTime;
    }

    public int getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(int totalTime) {
        this.totalTime = totalTime;
    }

    @Override
    public String toString() {
        return "Recipe{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", prepTime=" + prepTime +
                ", cookTime=" + cookTime +
                ", totalTime=" + totalTime +
                ", ingredients=" + ingredients +
                '}';
    }
}
