package com.example.fridget.models;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Ingredients {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToMany(mappedBy = "ingredients")
    private List<Recipe> recipe = new ArrayList<>();

    private String name;

    public Ingredients() {

    }

    public Ingredients(int id, List<Recipe> recipe, String name) {
        this.id = id;
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

    @Override
    public String toString() {
        return "Ingredient{id=" + id + ", name='" + name + "'}";
    }

}
