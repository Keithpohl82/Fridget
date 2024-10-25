package com.example.fridget.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Recipe {
    
    @Id
    @GeneratedValue
    private int id;

    @ManyToMany
    List<Ingredients> ingredientsList = new ArrayList<>();
    
    private String name;
    
    private String discription;

    private int prepTime;

    private int cookTime;

    private int totalTime;

    //Need a list of steps for preping and cooking
    //Not sure how to handle this

    //This should be a list/table
    //private String cuisine;

    //Add later
    //private String photoUrl;


    public Recipe(List<Ingredients> ingredientsList, String name, String discription, int prepTime, int cookTime, int totalTime) {
        this.ingredientsList = ingredientsList;
        this.name = name;
        this.discription = discription;
        this.prepTime = prepTime;
        this.cookTime = cookTime;
        this.totalTime = totalTime;
    }

    public Recipe() {
    }

    public int getId() {
        return id;
    }

    public List<Ingredients> getIngredientsList() {
        return ingredientsList;
    }

    public void setIngredientsList(List<Ingredients> ingredientsList) {
        this.ingredientsList = ingredientsList;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDiscription() {
        return discription;
    }

    public void setDiscription(String discription) {
        this.discription = discription;
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

}
