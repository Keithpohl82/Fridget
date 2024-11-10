package com.example.fridget.models;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Ingredients extends AbstractClass {


    @OneToMany(mappedBy = "ingredients")
    private List<Recipe> recipe = new ArrayList<>();

    private String name;

    public Ingredients() {

    }

    public Ingredients(List<Recipe> recipe, String name) {
        this.name = name;
        this.recipe = recipe;
    }

    public Long getId() {
        return super.getId();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Recipe> getRecipe() {
        return recipe;
    }

    public void setRecipe(List<Recipe> recipe) {
        this.recipe = recipe;
    }

}